
export const roundDownNDigits = (value: number, nDigits: number) => {
  return nDigits > -1 ? Math.floor(value * Math.pow(10, nDigits)) / Math.pow(10, nDigits) : value
}

export const sum1D = (arr: number[]) => {
  return arr.reduce((a, b) => a + b)
}

export const average1D = (arr: number[], nDigits: number) => {
  return roundDownNDigits(sum1D(arr) / arr.length, nDigits)
}

export const calcPercentage = (arr: number[], index: number, nDigits: number) => {
  const ratio = arr[index] / sum1D(arr)

  return roundDownNDigits(ratio, nDigits)
}

export const range = (start: number, end: number, isReverse = false) => {
  const ret = [...Array(end).keys()].slice(start, end + 1)

  if (isReverse) return ret.reverse()

  return ret
}

export const transpose2D = (arr: number[][]) => {
  return arr[0].map((col, i) => arr.map((row) => row[i]))
}

export const calcFScore = (precision: number, recall: number, nDigits: number) => {
  const F = 2 * recall * precision / (recall + precision)
  return roundDownNDigits(F, nDigits)
}

export const calcFScoreArr = (precisionArr: number[], recallArr: number[], nDigits: number) => {
  return precisionArr.map((x, i) => calcFScore(x, recallArr[i], nDigits))
}

export const precisionRecallFScore = (confusionMatrix2D: number[][], nDigits: number) => {
  const precisionArr = transpose2D(confusionMatrix2D).map((col, i) => calcPercentage(col, i, nDigits))
  const recallArr = confusionMatrix2D.map((row, i) => calcPercentage(row, i, nDigits))
  const FScoreArr = calcFScoreArr(precisionArr, recallArr, nDigits)

  return [precisionArr, recallArr, FScoreArr]
}

export const accuracyFromConfusionMatrix2D = (confusionMatrix2D: number[][], nDigits: number) => {
  const sum = sum1D(confusionMatrix2D.map(row => sum1D(row)))
  const correct = sum1D(confusionMatrix2D.map((row, i) => row[i]))

  return roundDownNDigits(correct / sum, nDigits)
}
