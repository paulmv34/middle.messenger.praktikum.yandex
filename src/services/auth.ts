import AuthApi from "../api/auth";
import { CreateUser, LoginRequestData, UserDTO } from "../api/type";
import { apiHasError } from "../utils/apiHasError";
import { transformUser } from "../utils/apiTransformers";
import {appStore} from "../core/Store";
import {getChats} from "./chat";
import {appRouter} from "../core/Router";
import {HTTPError} from "../core/CustomError";

const authApi = new AuthApi();

const getUser = async() => {
    const responseUser = await authApi.me();
    if (apiHasError(responseUser)) {
        throw new HTTPError(responseUser);
    }

    return transformUser(responseUser as UserDTO);
};

const signin = async (data: LoginRequestData) => {
    const response = await authApi.login(data);
    if (apiHasError(response)) {
        throw new HTTPError(response);
    }

    const me = await getUser();
    if(apiHasError(me)) {
        throw new HTTPError(me);
    }
    appStore.set({user: me});

    const chats = await getChats();
    if(apiHasError(chats)) {
        throw new HTTPError(chats);
    }
    appStore.set({chats});

    appRouter.go("/messenger/");
};

const signup = async (data: CreateUser) => {
    const response = await authApi.create(data);
    if (apiHasError(response)) {
        throw new HTTPError(response);
    }

    const me = await getUser();
    if(apiHasError(me)) {
        throw new HTTPError(me);
    }
    appStore.set({user: me});
    appRouter.go("/messenger/");
};

const logout = async () => {
    await authApi.logout();
    appStore.set({user: null, chats: [], chat: null});
    appRouter.go("/");
};

export {
    signin,
    signup,
    logout,
    getUser
};
