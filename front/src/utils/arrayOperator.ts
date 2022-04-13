// Copyright 2021 Sony Corporation.
// Copyright 2021 Sony Group Corporation.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

export const roundDownNDigits = (value: number, nDigits: number): number => {
  return nDigits > -1
    ? Math.floor(value * Math.pow(10, nDigits)) / Math.pow(10, nDigits)
    : value
}

export const sum1D = (arr: number[]): number => {
  return arr.reduce((a, b) => a + b)
}

export const average1D = (arr: number[], nDigits: number): number => {
  return roundDownNDigits(sum1D(arr) / arr.length, nDigits)
}

export const calcPercentage = (
  arr: number[],
  index: number,
  nDigits: number
): number => {
  const ratio = arr[index] / sum1D(arr)

  return roundDownNDigits(ratio, nDigits)
}

export const range = (
  start: number,
  end: number,
  isReverse = false
): number[] => {
  const ret = [...Array(end).keys()].slice(start, end + 1)

  if (isReverse) return ret.reverse()

  return ret
}

export const transpose2D = (arr: number[][]): number[][] => {
  return arr[0].map((col, i) => arr.map(row => row[i]))
}

export const calcFScore = (
  precision: number,
  recall: number,
  nDigits: number
): number => {
  const F = (2 * recall * precision) / (recall + precision)
  return roundDownNDigits(F, nDigits)
}

export const calcFScoreArr = (
  precisionArr: number[],
  recallArr: number[],
  nDigits: number
): number[] => {
  return precisionArr.map((x, i) => calcFScore(x, recallArr[i], nDigits))
}

export const precisionRecallFScore = (
  confusionMatrix2D: number[][],
  nDigits: number
): number[][] => {
  const precisionArr = transpose2D(confusionMatrix2D).map((col, i) =>
    calcPercentage(col, i, nDigits)
  )
  const recallArr = confusionMatrix2D.map((row, i) =>
    calcPercentage(row, i, nDigits)
  )
  const FScoreArr = calcFScoreArr(precisionArr, recallArr, nDigits)

  return [precisionArr, recallArr, FScoreArr]
}

export const accuracyFromConfusionMatrix2D = (
  confusionMatrix2D: number[][],
  nDigits: number
): number => {
  const sum = sum1D(confusionMatrix2D.map(row => sum1D(row)))
  const correct = sum1D(confusionMatrix2D.map((row, i) => row[i]))

  return roundDownNDigits(correct / sum, nDigits)
}
