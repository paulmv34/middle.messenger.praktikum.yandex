import {isArray, isPlainObject} from "../types/types";

export function queryStringify(data: unknown): string | never {
    if (!isPlainObject(data)) {
        throw new Error("input must be an object");
    }
    const result = (function _queryStringify(data: unknown, baseKey: string = ""): string {
        if (data === null) {
            return baseKey + "=" + "null&";
        }
        if (data === undefined) {
            return baseKey + "=" + "undefined&";
        }
        if (isArray(data)) {
            return data.reduce((result, value, key) => result += _queryStringify(value, `${baseKey}[${key}]`), "");
        }
        if (data instanceof Map || data instanceof Set || isPlainObject(data)) {
            return Object.entries(data).reduce((result, [key, value]) => result += _queryStringify(value, !baseKey.length ? `${key}` : `${baseKey}[${key}]`), "");
        }
        return baseKey + "=" + String(data) + "&";
    })(data);
    return result.length > 0 ? result.slice(0,-1) : result;
}