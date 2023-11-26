import { HTTPTransport } from "../core/HTTPTransport";
import { APIError, CreateUser, LoginRequestData, SignUpResponse, UserDTO } from "./type";
import constants from "../constants";
const authApi = new HTTPTransport("");
export default class AuthApi {

    async create(data: CreateUser): Promise<SignUpResponse> {
        return authApi.post<SignUpResponse>("/auth/signup", {data, headers: constants.JSON_HEADERS});
    }

    async login(data: LoginRequestData): Promise<void | APIError> {
        return authApi.post("/auth/signin", {data, headers: constants.JSON_HEADERS});
    }

    async me(): Promise<UserDTO | APIError> {
        return authApi.get("/auth/user");
    }

    async logout(): Promise<void | APIError> {
        return authApi.post("/auth/logout");
    }
}
