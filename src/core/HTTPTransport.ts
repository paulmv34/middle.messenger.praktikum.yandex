import {queryStringify} from "../utils/queryStringify";
import constants from "../constants";

enum HTTPTransportMethods {
    Get = "GET",
    Put = "PUT",
    Post = "POST",
    Delete = "DELETE",
}

type HTTPTransportData = null | FormData | Document | Record<string, Array<string | number> | string | number | File>;

type HTTPTransportOptions = {
    method?: HTTPTransportMethods,
    data?: HTTPTransportData,
    headers?: Record<string, string>,
    timeout?: number
}

const HTTPTransportDefaultTimeout = 5000;

class HTTPTransport {
    private apiUrl: string = "";

    constructor(apiPath: string = "") {
        this.apiUrl = `${constants.HOST}${apiPath}`;
    }

    get<TResponse> (url: string, options: HTTPTransportOptions = {}): Promise<TResponse> {
        return this.request<TResponse>(`${this.apiUrl}${url}`, {...options, method: HTTPTransportMethods.Get}, options.timeout);
    }

    put<TResponse> (url: string, options: HTTPTransportOptions = {}): Promise<TResponse> {
        return this.request<TResponse>(`${this.apiUrl}${url}`, {...options, method: HTTPTransportMethods.Put}, options.timeout);
    }

    post<TResponse> (url: string, options: HTTPTransportOptions = {}): Promise<TResponse> {
        return this.request<TResponse>(`${this.apiUrl}${url}`, {...options, method: HTTPTransportMethods.Post}, options.timeout);
    }

    delete<TResponse> (url: string, options: HTTPTransportOptions = {}): Promise<TResponse> {
        return this.request<TResponse>(`${this.apiUrl}${url}`, {...options, method: HTTPTransportMethods.Delete}, options.timeout);
    }

    request<TResponse> (url: string, options: HTTPTransportOptions, timeout: number = HTTPTransportDefaultTimeout): Promise<TResponse> {
        const {method = HTTPTransportMethods.Get, data = {}, headers = {}} = options;
        return new Promise((resolve, reject) => {
            if (method === HTTPTransportMethods.Get) {
                url += "?" + queryStringify(data);
            }
            const xhr = new XMLHttpRequest();
            xhr.responseType = "json";
            xhr.open(method, url);
            xhr.withCredentials = true;
            xhr.timeout = timeout;
            for (const key in headers) {
                xhr.setRequestHeader(key, headers[key]);
            }
            xhr.onload = () => {resolve(xhr.response && xhr.response.reason ? {reason: xhr.response.reason, status: xhr.status} : xhr.response);};

            const onReject = () => {reject({reason: xhr.response && xhr.response.reason ?  xhr.response.reason : xhr.response, status: xhr.status});};

            xhr.onabort = onReject;
            xhr.onerror = onReject;
            xhr.ontimeout = onReject;

            if (method === HTTPTransportMethods.Get || !data) {
                xhr.send(null);
            } else {
                if (data instanceof Document) {
                    xhr.send(data);
                } else if (data instanceof FormData) {
                    xhr.send(data);
                } else {
                    xhr.send(JSON.stringify(data));
                }
            }
        });
    }
}

export { HTTPTransport, HTTPTransportMethods };