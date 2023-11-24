import {APIError} from "../api/type";

export class HTTPError extends Error {
    status: number;
    constructor({reason = "", status = 0}: APIError) {
        super(reason);
        this.status = status;
    }
}
