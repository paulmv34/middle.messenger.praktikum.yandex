enum HTTPTransportMethods {
    Get = 'GET',
    Put = 'PUT',
    Post = 'POST',
    Delete = 'DELETE',
}

type Data = null | Document | Record<string, string>;

interface Options {
    method?: HTTPTransportMethods,
    data?: Data,
    headers?: Record<string, string>,
    timeout?: number
}

const HTTPTransportDefaultTimeout = 5000;

function queryStringify(data: Data) {
    if (!data)
        return '';
    if (data instanceof Document)
        throw new Error('Incorrect data type. It must be a Record<string, string> for the GET method.');
    let queriedData = Object.entries(data).map(([key, value]) => `${key}=${value}`);
    return queriedData ? '?' + queriedData.join('&') : '';
}

class HTTPTransport {
    get = (url: string, options: Options = {}) => {
        return this.request(url, {...options, method: HTTPTransportMethods.Get}, options.timeout);
    };

    put = (url: string, options: Options = {}) => {
        return this.request(url, {...options, method: HTTPTransportMethods.Put}, options.timeout);
    };

    post = (url: string, options: Options = {}) => {
        return this.request(url, {...options, method: HTTPTransportMethods.Post}, options.timeout);
    };

    delete = (url: string, options: Options = {}) => {
        return this.request(url, {...options, method: HTTPTransportMethods.Delete}, options.timeout);
    };

    request = (url: string, options: Options, timeout: number = 5000) => {
        const {method = HTTPTransportMethods.Get, data = {}, headers = {}} = options;
        return new Promise((resolve, reject) => {
            if (method === HTTPTransportMethods.Get) {
                url += queryStringify(data);
            }
            const xhr = new XMLHttpRequest();
            xhr.open(method, url);
            xhr.timeout = timeout;
            for (let key in headers) {
                xhr.setRequestHeader(key, headers[key]);
            }
            xhr.onload = function() {
                resolve(xhr);
            };

            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.ontimeout = reject;

            if (method === HTTPTransportMethods.Get || !data) {
                xhr.send(null);
            } else {
                if (data instanceof Document) {
                    xhr.send(data);
                } else {
                    xhr.send(JSON.stringify(data));
                }
            }
        });
    };
}