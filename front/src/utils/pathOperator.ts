import * as Path from 'path'

const getFileType = (path: string): 'nntxtFiles' | 'monitorFiles' => {
  const ext = Path.extname(path)
  const subExt = Path.extname(Path.basename(path, ext))

  if (ext === '.nntxt' || ext === '.nnp') {
    // "*.nntxt"
    return 'nntxtFiles'
  } else if (subExt === '.series' && ext === '.txt') {
    // "*.series.txt"
    return 'monitorFiles'
  }

  throw new Error(`invlaid file: ${path}`)
}

export { getFileType }
