
import * as Path from 'path'

const getFileType = (path: string) => {
  const ext = Path.extname(path)
  const subExt = Path.extname(Path.basename(path, ext))

  if (ext === '.nntxt' || ext === '.nnp') {
    // "XXX.nntxt"
    return 'nntxtFiles'
  } else if (subExt === '.series' && ext === '.txt') {
    // "XXX.series.txt"
    return 'monitorFiles'
  } else if ((subExt === '.result' && ext === '.csv')) {
    // " XXX.result.csv"
    return 'csvResultFiles'
  }

  // nothing is matched
  return null
}

export { getFileType }
