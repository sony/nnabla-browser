import { Module, MutationTree, ActionTree } from 'vuex'
import { RootState, DirectoryNode, DirectoryInfoState } from '@/store/types'

import * as pathOperator from '@/utils/pathOperator'
import * as d3 from 'd3'
import * as Path from 'path'

// monotonic incremental counter to assign unique id
let nodeCounter = 0

const deleteDirectoryInfo = (
  parent: DirectoryNode,
  fileName: string,
  fileType: string
) => {
  if (
    fileType !== 'nntxtFiles' &&
    fileType !== 'monitorFiles' &&
    fileType !== 'csvResultFiles'
  ) {
    return false
  }

  const index = parent[fileType].findIndex(x => x.name === fileName)
  if (index > -1) {
    parent[fileType].splice(index, 1)

    return true
  }

  return false
}

const state: DirectoryInfoState = {
  data: {
    id: 0,
    children: [],
    name: '',
    nntxtFiles: [],
    monitorFiles: [],
    csvResultFiles: []
  },
  activeFile: ''
}

function createNewNode (name: string): DirectoryNode {
  return {
    id: nodeCounter++,
    name: name,
    children: [],
    monitorFiles: [],
    nntxtFiles: [],
    csvResultFiles: []
  }
}

function createNewSubTree (relPath: string, insertData: any) {
  const split = relPath.split('/')

  const subTree = createNewNode(split[0])
  let currentNode = subTree
  let i
  for (i = 1; i < split.length - 1; i++) {
    const dir = split[i]

    const tmp = createNewNode(dir)
    currentNode.children.push(tmp)
    currentNode = tmp
  }

  const fileType = pathOperator.getFileType(split[i])
  if (fileType) {
    currentNode[fileType].push({ name: split[i], data: insertData })
  }

  return subTree
}

function searchParent (path: string, graph: DirectoryNode): [DirectoryNode, string] {
  const split = path.split('/')

  let currentNode = graph
  let i
  for (i = 0; i < split.length - 1; i++) {
    const dir = split[i]

    const nextNode = currentNode.children.find(x => x.name === dir)

    if (typeof nextNode === 'undefined') {
      break
    }

    currentNode = nextNode
  }

  return [currentNode, split.slice(i, split.length).join('/')]
}
function findInsertIndex (list: { [key: string]: any }, name: string) {
  let insertIndex = list.findIndex(
    (x: any) => x.name.toLowerCase() > name.toLowerCase()
  )
  insertIndex = insertIndex > -1 ? insertIndex : list.length

  return insertIndex
}

function insertFile (parent: DirectoryNode, fileName: string, insertData: object) {
  const fileType = pathOperator.getFileType(fileName)

  if (fileType) {
    const index = parent[fileType].findIndex(x => x.name === fileName)
    if (index > -1) {
      // Found. Update file contents.
      parent[fileType][index].data = Object.assign(
        {},
        parent[fileType][index].data,
        insertData
      )
    } else {
      // Not found. Insert new file.
      const insertIndex = findInsertIndex(parent[fileType], fileName)
      parent[fileType].splice(insertIndex, 0, {
        name: fileName,
        data: insertData
      })
    }
  }
}

function addDirectoryInfo (state: DirectoryInfoState, path: string, data: object) {
  const [parent, relPath] = searchParent(path, state.data)

  if (relPath.split('/').length === 1) {
    insertFile(parent, relPath, data)
  } else {
    const subTree = createNewSubTree(relPath, data)
    const insertIndex = findInsertIndex(
      parent.children,
      relPath.split('/')[0]
    )
    parent.children.splice(insertIndex, 0, subTree)
  }
}

const mutations: MutationTree<DirectoryInfoState> = {
  updateDirectoryStructure: function (state, { path }) {
    // Register file path without file content
    addDirectoryInfo(state, path, {})
  },
  updateFileContent: function (state, { path, data }) {
    // Register file path with file content
    addDirectoryInfo(state, path, data)
  },
  updateActiveFile: function (state, path) {
    state.activeFile = path
  },
  resetActiveFile: function (state) {
    state.activeFile = ''
  }
}

const actions: ActionTree<DirectoryInfoState, RootState> = {
  deleteDirectoryInfo: function ({ commit, state }, { path }) {
    const [parent, dirName] = searchParent(path, state.data)

    let fileType = pathOperator.getFileType(dirName)
    if (!fileType) fileType = 'children'

    if (deleteDirectoryInfo(parent, dirName, fileType)) {
      if (
        Path.relative(path, state.activeFile).length < state.activeFile.length
      ) {
        // active file is under deleted folder.
        // reset current display.

        d3.select('#network-editor')
          .transition()
          .duration(500)
          .attr('opacity', 0)
          .on('end', () => {
            commit('resetActiveFile')
            commit('resetGraphs')
            commit('resetNNtxtPath')
          })
      }
    }
  }
}

export const directoryInfo: Module<DirectoryInfoState, RootState> = {
  state,
  mutations,
  actions
}
