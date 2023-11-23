import {isPlainObject, PlainObject} from "../types/types";

export function merge(lhs: PlainObject, rhs: PlainObject): PlainObject {
    const lk: string[] = Object.keys(lhs);
    const rk: string[] = Object.keys(rhs);
    const resultObjEntries = [];
    for (let i = 0; i < Math.max(lk.length, rk.length); i++) {
        if (i in lk) {
            const lIsObject = isPlainObject(lhs[lk[i]]);
            const rIsObject = lk[i] in rhs && isPlainObject(rhs[lk[i]]);
            if (Object.prototype.hasOwnProperty.call(rhs, lk[i]) && lIsObject && rIsObject) {
                resultObjEntries.push([lk[i], merge(lhs[lk[i]] as PlainObject, rhs[lk[i]] as PlainObject)]);
            } else {
                resultObjEntries.push([lk[i], lhs[lk[i]]]);
            }
        }
        if (i in rk && !Object.prototype.hasOwnProperty.call(lhs, rk[i])) {
            resultObjEntries.push([rk[i], rhs[rk[i]]]);
        }
    }
    return Object.fromEntries(resultObjEntries);
}
