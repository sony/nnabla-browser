
import nnablaCore from "../../lib/js/nnablaCore";

const getAllFuncionsRecursive = (obj) => {
    let ret = [];
    if (typeof obj.snake_name !== "undefined") {
        ret.push(obj);
    } else if (typeof obj === "object") {
        for (let key in obj) {
            ret = ret.concat(getAllFuncionsRecursive(obj[key]));
        }
    }
    return ret;
};

const allFunctions = getAllFuncionsRecursive(nnablaCore);

export {allFunctions, };