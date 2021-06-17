import * as Path from 'path'
import * as d3 from 'd3'
import * as pathOperator from '@/utils/pathOperator'
import { DirectoryInfoState, DirectoryNode, MonitorFile, NNtxtFile } from '@/types/store'
import { AnyObject } from '@/types/basic'
import { Mutation, Action, VuexModule, Module } from 'vuex-module-decorators'

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

@Module({ namespaced: true })
export default class DirectoryInfoStateModule extends VuexModule implements DirectoryInfoState {
  data: DirectoryNode = {
    id: 0,
    children: [],
    name: '',
    nntxtFiles: [],
    monitorFiles: []
  }

  activeFile = ''

  subscribedList: string[] = []

  @Mutation
  initDirectoryStructure (paths: string[]) {
    for (const path of paths) {
      addDirectoryInfo(this, path, {})
    }
  }

  @Mutation
  updateDirectoryStructure (path: string) {
    // Register file path without file content
    addDirectoryInfo(this, path, {})
  }

  @Mutation
  deleteFileOrDirectory (path: string) {
    deleteFileOrDirectoryPath(this, path)
  }

  @Mutation
  updateFileContent ({ path, data }: { path: string; data: AnyObject }) {
    // Register file path with file content
    addDirectoryInfo(this, path, data)
  }

  @Mutation
  deleteFileContent (path: string) {
    addDirectoryInfo(this, path, {}, true)
  }

  @Mutation
  updateActiveFile (path: string) {
    this.activeFile = path
  }

  @Mutation
  resetActiveFile () {
    this.activeFile = ''
  }

  @Mutation
  activateSubscribe (path: string) {
    if (!this.subscribedList.includes(path)) {
      this.subscribedList.push(path)
    }
  }

  @Mutation
  deactivateSubscribe (path: string) {
    const index = this.subscribedList.indexOf(path)
    if (index > -1) {
      this.subscribedList.splice(index, 1)
    }
  }

  @Action({})
  deleteDirectoryInfo (path: string) {
    const [parent, dirName] = searchParent(path, this.data)

    type extendFileType = 'nntxtFiles' | 'monitorFiles' | 'children' | null
    let fileType: extendFileType = pathOperator.getFileType(dirName)
    if (!fileType) fileType = 'children'

    if (deleteDirectoryInfo(parent, dirName, fileType)) {
      if (
        Path.relative(path, this.activeFile).length < this.activeFile.length
      ) {
        // active file is under deleted folder.
        // reset current display.

        d3.select('#network-editor')
          .transition()
          .duration(500)
          .attr('opacity', 0)
          .on('end', () => {
            this.resetActiveFile()
            this.context.dispatch('graphInfo/resetGraphs', {}, { root: true })
            this.context.dispatch('graphInfo/resetNNtxtPath', {}, { root: true })
          })
      }
    }
  }
}
