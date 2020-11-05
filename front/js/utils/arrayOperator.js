
export const roundDownNDigits = (value, nDigits) => {
    return nDigits > -1 ? Math.floor(value * Math.pow(10, nDigits)) / Math.pow(10, nDigits) : value;
};


export const sum1D = (arr) => {
    return arr.reduce((a, b) => a + b);
};

export const average1D = (arr, nDigits) => {
    return roundDownNDigits(sum1D(arr) / arr.length, nDigits);
};

export const calcPercentage = (arr, index, nDigits) => {
    const ratio = arr[index] / sum1D(arr);

    return roundDownNDigits(ratio, nDigits);
};

export const range = (start, end, isReverse=false) => {
    let ret = [...Array(end).keys()].slice(start, end + 1);

    if (isReverse) return ret.reverse();

    return ret;
};

export const transpose2D = (arr) => {
    return arr[0].map((col, i) => arr.map((row) => row[i]));
};

export const calcFScore = (precision, recall, nDigits) => {
    const F = 2 * recall * precision / (recall + precision);
    return roundDownNDigits(F, nDigits);
};

export const calcFScoreArr = (precisionArr, recallArr, nDigits) => {
    return precisionArr.map((x, i) => calcFScore(x, recallArr[i], nDigits));
};

export const precisionRecallFScore = (confusionMatrix2D, nDigits) => {
    const precisionArr = transpose2D(confusionMatrix2D).map((col, i) => calcPercentage(col, i, nDigits));
    const recallArr = confusionMatrix2D.map((row, i) => calcPercentage(row, i, nDigits));
    const FScoreArr = calcFScoreArr(precisionArr, recallArr, nDigits);

    return [precisionArr, recallArr, FScoreArr];
};

export const accuracyFromConfusionMatrix2D = (confusionMatrix2D, nDigits) => {
    const sum = sum1D(confusionMatrix2D.map(row => sum1D(row)));
    const correct = sum1D(confusionMatrix2D.map((row, i) => row[i]));

    return roundDownNDigits(correct / sum, nDigits);
};
