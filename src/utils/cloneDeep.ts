import {isArray, isPlainObject, PlainObject} from "../types/types";

export function cloneDeep<T extends object = object>(obj: T) {
    if (isArray(obj)) {
        const clone: unknown[] = [];
        obj.forEach((value, key) => {
            if (isArray(value) || isPlainObject(value))
                clone[key] = cloneDeep(value);
            else
                clone[key] = value;
        });
        return clone;
    }
    if (isPlainObject(obj)) {
        const clone: PlainObject = {};
        Object.entries(obj).forEach(([key, value]) => {
            if (isArray(value) || isPlainObject(value))
                clone[key] = cloneDeep(value);
            else
                clone[key] = value;
        });
        return clone;
    }
    return obj;
}