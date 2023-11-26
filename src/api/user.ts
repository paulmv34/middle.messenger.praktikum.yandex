import { HTTPTransport } from "../core/HTTPTransport";
import {
    APIError,
    ChangeAvatar,
    ChangePassword,
    ChangeProfile,
    UserDTO,
    UserSearch
} from "./type";
import constants from "../constants";

const userApi = new HTTPTransport();

export default class UserApi {
    async profile(data: ChangeProfile): Promise<UserDTO | APIError> {
        return userApi.put<UserDTO>("/user/profile", {data, headers: constants.JSON_HEADERS});
    }

    async avatar(data: ChangeAvatar): Promise<UserDTO | APIError> {
        return userApi.put<UserDTO>("/user/profile/avatar", {data});
    }

    async password(data: ChangePassword): Promise<void | APIError> {
        return userApi.put("/user/password", {data, headers: constants.JSON_HEADERS});
    }

    async get(userId: number): Promise<UserDTO | APIError> {
        return userApi.get<UserDTO>(`/user/${userId}`, {});
    }

    async search(data: UserSearch): Promise<UserDTO[] | APIError> {
        return userApi.post<UserDTO[]>("/user/search", {data, headers: constants.JSON_HEADERS});
    }
}
