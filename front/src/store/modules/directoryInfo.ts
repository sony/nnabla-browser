import * as Path from 'path'
import * as d3 from 'd3'
import * as pathOperator from '@/utils/pathOperator'
import {
  Action,
  Module,
  Mutation,
  VuexModule,
  getModule
} from 'vuex-module-decorators'
import {
  DirectoryInfoState,
  DirectoryNode,
  MonitorFile,
  NNtxtFile
} from '@/types/store'
import { Graph } from '@/types/graph'
import { MonitorSeriesData } from '@/types/monitor'
import store from '@/store'

// monotonic incremental counter to assign unique id
let nodeCounter = 0

function findIndexByName (
  directoryNode: DirectoryNode,
  fileType: string,
  name: string
): number {
  switch (fileType) {
    case 'nntxtFiles':
      return directoryNode.nntxtFiles.findIndex(x => x.name === name)
    case 'monitorFiles':
      return directoryNode.monitorFiles.findIndex(x => x.name === name)
    default:
      throw new Error(`invalid fileType: ${fileType}`)
  }
}

function deleteByIndex (
  directoryNode: DirectoryNode,
  fileType: string,
  index: number
): void {
  switch (fileType) {
    case 'nntxtFiles':
      directoryNode.nntxtFiles.splice(index, 1)
      break
    case 'monitorFiles':
      directoryNode.monitorFiles.splice(index, 1)
      break
    default:
      throw new Error(`invalid fileType: ${fileType}`)
  }
}

function findInsertIndexByName (
  directoryNode: DirectoryNode,
  fileType: string,
  name: string
): number {
  const findInsertIndex = (
    list: Array<{ name: string }>,
    name: string
  ): number => {
    const insertIndex = list.findIndex(
      (x): boolean => x.name.toLowerCase() > name.toLowerCase()
    )
    return insertIndex > -1 ? insertIndex : list.length
  }
  switch (fileType) {
    case 'nntxtFiles':
      return findInsertIndex(directoryNode.nntxtFiles, name)
    case 'monitorFiles':
      return findInsertIndex(directoryNode.monitorFiles, name)
    default:
      throw new Error(`invalid fileType: ${fileType}`)
  }
}

function findInsertIndexByDirectoryName (
  directoryNode: DirectoryNode,
  name: string
): number {
  const insertIndex = directoryNode.children.findIndex(
    (x): boolean => x.name.toLowerCase() > name.toLowerCase()
  )
  return insertIndex > -1 ? insertIndex : directoryNode.children.length
}

function deleteDirectoryInfo (
  parent: DirectoryNode,
  fileName: string,
  fileType: string
): boolean {
  const index = findIndexByName(parent, fileType, fileName)
  if (index > -1) {
    deleteByIndex(parent, fileType, index)
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

function createNewSubTree (
  relPath: string,
  insertData: Graph[]|MonitorSeriesData|null
): DirectoryNode {
  const split = relPath.split('/')

  const subTree = createNewNode(split[0])
  let currentNode = subTree
  for (let i = 1; i < split.length - 1; i++) {
    const dir = split[i]
    const tmp = createNewNode(dir)
    currentNode.children.push(tmp)
    currentNode = tmp
  }

  const name = split[split.length - 1]
  const fileType = pathOperator.getFileType(name)
  switch (fileType) {
    case 'nntxtFiles':
      currentNode.nntxtFiles.push({ name: name, data: insertData as Graph[] })
      break
    case 'monitorFiles':
      currentNode.monitorFiles.push({
        name: name,
        data: insertData as MonitorSeriesData
      })
      break
    default:
      throw new Error(`invalid fileType: ${fileType}`)
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

function insertFile (
  parent: DirectoryNode,
  fileName: string,
  insertData: Graph[]|MonitorSeriesData|null,
  replace = false
): void {
  const fileType = pathOperator.getFileType(fileName)

  if (fileType === null) return

  const index = findIndexByName(parent, fileType, fileName)
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
    const insertIndex = findInsertIndexByName(parent, fileType, fileName)
    const newData = { name: fileName, data: insertData }
    switch (fileType) {
      case 'nntxtFiles':
        parent.nntxtFiles.splice(insertIndex, 0, newData as NNtxtFile)
        break
      case 'monitorFiles':
        parent.monitorFiles.splice(insertIndex, 0, newData as MonitorFile)
        break
      default:
        throw new Error(`invalid fileType: ${fileType}`)
    }
  }
}

function addDirectoryInfo (
  state: DirectoryInfoState,
  path: string,
  data: Graph[]|MonitorSeriesData|null,
  replace = false
): void {
  const [parent, relPath] = searchParent(path, state.data)
  if (relPath.split('/').length === 1) {
    insertFile(parent, relPath, data, replace)
  } else {
    const subTree = createNewSubTree(relPath, data)
    const insertIndex = findInsertIndexByDirectoryName(
      parent,
      relPath.split('/')[0]
    )
    parent.children.splice(insertIndex, 0, subTree)
  }
}

function deleteFileOrDirectoryPath (
  state: DirectoryInfoState,
  path: string
): void {
  const [parent, relPath] = searchParent(path, state.data)
  const fileType = pathOperator.getFileType(relPath)
  if (fileType === null) return
  // delete file
  const index = findIndexByName(parent, fileType, relPath)
  if (index === -1) return
  deleteByIndex(parent, fileType, index)
}

@Module({ dynamic: true, store, namespaced: true, name: 'directoryInfo' })
class DirectoryInfoStateModule
  extends VuexModule
  implements DirectoryInfoState {
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
  SET_ACTIVE_FILE (path: string): void {
    this.activeFile = path
  }

  @Action({})
  initDirectoryStructure (paths: string[]): void {
    for (const path of paths) {
      addDirectoryInfo(this, path, null)
    }
  }

  @Action({})
  updateDirectoryStructure (path: string): void {
    // Register file path without file content
    addDirectoryInfo(this, path, null)
  }

  @Action({})
  deleteFileOrDirectory (path: string): void {
    deleteFileOrDirectoryPath(this, path)
  }

  @Action({})
  updateFileContent ({
    path,
    data
  }: { path: string; data: Graph[]|MonitorSeriesData }): void {
    // Register file path with file content
    addDirectoryInfo(this, path, data)
  }

  @Action({})
  deleteFileContent (path: string): void {
    deleteFileOrDirectoryPath(this, path)
  }

  @Action({})
  resetActiveFile (): void {
    this.SET_ACTIVE_FILE('')
  }

  @Action({})
  activateSubscribe (path: string): void {
    if (!this.subscribedList.includes(path)) {
      this.subscribedList.push(path)
    }
  }

  @Action({})
  deactivateSubscribe (path: string): void {
    const index = this.subscribedList.indexOf(path)
    if (index > -1) {
      this.subscribedList.splice(index, 1)
    }
  }

  @Action({})
  deleteDirectoryInfo (path: string): void {
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
            this.context.dispatch(
              'graphInfo/resetGraphs',
              {},
              { root: true }
            )
            this.context.dispatch(
              'graphInfo/resetNNtxtPath',
              {},
              { root: true }
            )
          })
      }
    }
  }
}

export default getModule(DirectoryInfoStateModule)
