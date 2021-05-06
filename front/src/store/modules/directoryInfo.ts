import * as Path from 'path'
import * as d3 from 'd3'
import * as pathOperator from '@/utils/pathOperator'
import { ActionTree, GetterTree, Module, MutationTree } from 'vuex'
import { DirectoryInfoState, DirectoryNode, MonitorFile, NNtxtFile, RootState } from '@/types/store'
import { AnyObject } from '@/types/basic'

// monotonic incremental counter to assign unique id
let nodeCounter = 0

const deleteDirectoryInfo = (
  parent: DirectoryNode,
  fileName: string,
  fileType: string
): boolean => {
  if (fileType !== 'nntxtFiles' && fileType !== 'monitorFiles') {
    return false
  }

  const index = parent[fileType].findIndex((x: NNtxtFile | MonitorFile) => x.name === fileName)
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
    monitorFiles: []
  },
  activeFile: '',
  subscribedList: []
}

function createNewNode (name: string): DirectoryNode {
  return {
    id: nodeCounter++,
    name: name,
    children: [],
    monitorFiles: [],
    nntxtFiles: []
  }
}

function createNewSubTree (relPath: string, insertData: AnyObject): DirectoryNode {
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

function searchParent (
  path: string,
  graph: DirectoryNode
): [DirectoryNode, string] {
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
function findInsertIndex (list: Array<{ name: string }>, name: string): number {
  let insertIndex = list.findIndex(
    (x): boolean => x.name.toLowerCase() > name.toLowerCase()
  )
  insertIndex = insertIndex > -1 ? insertIndex : list.length

  return insertIndex
}

function insertFile (
  parent: DirectoryNode,
  fileName: string,
  insertData: AnyObject,
  replace = false
): void {
  const fileType = pathOperator.getFileType(fileName)

  if (fileType) {
    const index = parent[fileType].findIndex((x: NNtxtFile | MonitorFile) => x.name === fileName)
    if (index > -1) {
      // Found. Update file contents.
      if (replace) {
        parent[fileType][index].data = insertData
      } else {
        parent[fileType][index].data = Object.assign(
          {},
          parent[fileType][index].data,
          insertData
        )
      }
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

function addDirectoryInfo (
  state: DirectoryInfoState,
  path: string,
  data: AnyObject,
  replace = false
): void {
  const [parent, relPath] = searchParent(path, state.data)

  if (relPath.split('/').length === 1) {
    insertFile(parent, relPath, data, replace)
  } else {
    const subTree = createNewSubTree(relPath, data)
    const insertIndex = findInsertIndex(parent.children, relPath.split('/')[0])
    parent.children.splice(insertIndex, 0, subTree)
  }
}

function deleteFileOrDirectoryPath (state: DirectoryInfoState, path: string): void {
  const [parent, relPath] = searchParent(path, state.data)

  const fileType = pathOperator.getFileType(relPath)
  if (fileType) {
    // delete file
    const index = parent[fileType].findIndex((x: NNtxtFile | MonitorFile) => x.name === relPath)
    if (index === -1) return

    parent[fileType].splice(index, index + 1)
  } else {
    // delete directory
    const index = parent.children.findIndex(x => x.name === relPath)
    if (index === -1) return

    parent.children.splice(index, index + 1)
  }
}

const mutations: MutationTree<DirectoryInfoState> = {
  initDirectoryStructure: function (state, { paths }) {
    for (const path of paths) {
      addDirectoryInfo(state, path, {})
    }
  },
  updateDirectoryStructure: function (state, { path }) {
    // Register file path without file content
    addDirectoryInfo(state, path, {})
  },
  deleteFileOrDirectory: function (state, { path }) {
    deleteFileOrDirectoryPath(state, path)
  },
  updateFileContent: function (state, { path, data }) {
    // Register file path with file content
    addDirectoryInfo(state, path, data)
  },
  deleteFileContent: function (state, { path }) {
    addDirectoryInfo(state, path, {}, true)
  },
  updateActiveFile: function (state, path) {
    state.activeFile = path
  },
  resetActiveFile: function (state) {
    state.activeFile = ''
  },
  activateSubscribe: function (state, { path }) {
    if (!state.subscribedList.includes(path)) {
      state.subscribedList.push(path)
    }
  },
  deactivateSubscribe: function (state, { path }) {
    const index = state.subscribedList.indexOf(path)
    if (index > -1) {
      state.subscribedList.splice(index, 1)
    }
  }
}

const actions: ActionTree<DirectoryInfoState, RootState> = {
  deleteDirectoryInfo: function ({ commit, state }, { path }) {
    const [parent, dirName] = searchParent(path, state.data)

    type extendFileType = 'nntxtFiles' | 'monitorFiles' | 'children' | null
    let fileType: extendFileType = pathOperator.getFileType(dirName)
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

const getters: GetterTree<DirectoryInfoState, RootState> = {
  isSubscribe: (state) => (path: string): boolean => {
    return state.subscribedList.includes(path)
  }
}

export const directoryInfo: Module<DirectoryInfoState, RootState> = {
  state,
  mutations,
  actions,
  getters
}