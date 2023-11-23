import {isArray, isPlainObject} from "../types/types";

export function isEqual(a: unknown, b: unknown): boolean {
    if (typeof(a) !== typeof(b))
        return false;
    if (a instanceof Date && b instanceof Date)
        return a.getTime() == b.getTime();
    if (isPlainObject(a) && isPlainObject(b)) {
        const keysA: string[] = Object.keys(a);
        const keysB: string[] = Object.keys(b);
        if (keysA.length !== keysB.length)
            return false;
        return keysA.every((key: string) => isEqual(a[key], b[key]));
    }
    if (isArray(a) && isArray(b)) {
        if (a.length !== b.length)
            return false;
        return a.every((value: unknown, key: number) => isEqual(value, b[key]));
    }
    return a === b;
}
