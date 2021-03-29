import nnablaCore from '@/utils/nnablaCore'

const getAllFuncionsRecursive = (obj: any) => {
  let ret: any[] = []
  if (typeof obj.snake_name !== 'undefined') {
    ret.push(obj)
  } else if (typeof obj === 'object') {
    for (const key in obj) {
      ret = ret.concat(getAllFuncionsRecursive(obj[key]))
    }
  }
  return ret
}

const allFunctions = getAllFuncionsRecursive(nnablaCore)

export { allFunctions }
