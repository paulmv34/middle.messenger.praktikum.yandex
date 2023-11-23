import { APIError } from "../api/type";

// Не нашел способ заменить any
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function apiHasError(response: any): response is APIError {
    return response?.reason;
}