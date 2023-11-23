import {
    ChangePassword,
    ChangeProfile,
    ChangeAvatar,
    UserDTO, UserSearch
} from "../api/type";
import { apiHasError } from "../utils/apiHasError";
import { transformUser } from "../utils/apiTransformers";
import UserApi from "../api/user";
import {appStore} from "../core/Store";
import {appRouter} from "../core/Router";
import {HTTPError} from "../core/CustomError";

const userApi = new UserApi();

export const editProfile = async (data: ChangeProfile) => {
    const response = await userApi.profile(data);
    if (apiHasError(response)) {
        throw new HTTPError(response);
    }

    appStore.set({user: transformUser(response as UserDTO)});
    appRouter.go("/settings/");
};

export const editUserAvatar = async (data: ChangeAvatar) => {
    const response = await userApi.avatar(data);
    if (apiHasError(response)) {
        throw new HTTPError(response);
    }

    appStore.set({user: transformUser(response as UserDTO)});
};

export const editPassword = async (data: ChangePassword) => {
    const response = await userApi.password(data);
    if (apiHasError(response)) {
        throw new HTTPError(response);
    }

    appRouter.go("/settings/");
};

export const userSearch = async (data: UserSearch) => {
    const response = await userApi.search(data);
    if (apiHasError(response)) {
        throw new HTTPError(response);
    }
    if (Array.isArray(response)) {
        return response.map(user => transformUser(user));
    }
    return [];
};