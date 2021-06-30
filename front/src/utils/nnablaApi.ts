import { AnyObject } from '@/types/basic'
import { RawFunction } from '@/types/nnablaApi'

function extractRawFunctions (obj: AnyObject | RawFunction): RawFunction [] {
  let ret: RawFunction[] = []
  if (typeof obj.snake_name !== 'undefined') {
    ret.push(obj as RawFunction)
  } else if (typeof obj === 'object') {
    for (const key in obj) {
      ret = ret.concat(
        extractRawFunctions((obj as AnyObject)[key] as AnyObject)
      )
    }
  }
  return ret
}

function findFunction (
  functions: RawFunction[],
  layerType: string
): RawFunction {
  // workaround for some incorrect cases
  const target = layerType.toLowerCase()
  return functions.find(
    (functionInfo) => functionInfo.layer_name.toLowerCase() === target
  ) as RawFunction
}

export { extractRawFunctions, findFunction }
