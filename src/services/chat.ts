import ChatApi from "../api/chat";
import { apiHasError } from "../utils/apiHasError";
import {transformChat, transformChats, transformUser} from "../utils/apiTransformers";
import {appStore} from "../core/Store";
import {ChangeAvatar, UserInChatSearch, UserSearchListData} from "../api/type";
import {UpdateState} from "../types/types";
import {appRouter} from "../core/Router";
import {HTTPError} from "../core/CustomError";

const chatApi = new ChatApi();

const createChat = async (title: string) => {
    const response = await chatApi.create({title});
    if(apiHasError(response)) {
        throw new HTTPError(response);
    }

    const chats = await getChats();
    if(apiHasError(chats)) {
        throw new HTTPError(chats);
    }

    appStore.set({chats});

    if (response.id)
        appRouter.go(`/messenger/${response.id}/`);
};

const getChats = async () => {
    const responseChat = await chatApi.getChats({limit: 99});
    if(apiHasError(responseChat)) {
        throw new HTTPError(responseChat);
    }

    const state = appStore.getState();

    const resultChats = transformChats(responseChat);
    resultChats.forEach(chat => chat.canDelete = !!state.user && state.user.id === chat.createdBy);

    return resultChats;
};

const getChatToken = async (chatId: number) => {
    const response = await chatApi.getChatToken(chatId);
    if(apiHasError(response)) {
        throw new HTTPError(response);
    }
    return response;
};

const deleteChat = async (chatId: number) => {
    const response = await chatApi.delete(chatId);
    if(apiHasError(response)) {
        throw new HTTPError(response);
    }

    const chats = await getChats();
    if(apiHasError(chats)) {
        throw new HTTPError(chats);
    }

    const toUpdate: UpdateState = {chats};
    const state = appStore.getState();
    if (state.chat && state.chat.id) {
        toUpdate.chat = null;
        appRouter.go("/messenger/");
    }
    appStore.set(toUpdate);
};

const addUsersToChat = async (userData: UserSearchListData, chatId: number) => {
    const addingUser = await searchUsersInChat(chatId, {name: `${userData.firstName} ${userData.secondName}`, limit: 99});
    if (apiHasError(addingUser)) {
        throw new HTTPError(addingUser);
    }
    if (Array.isArray(addingUser) && addingUser.some(user => user.id === userData.id))
        return;
    const response = await chatApi.addUsersToChat(userData.id, chatId);
    if(apiHasError(response)) {
        throw new HTTPError(response);
    }
};

const deleteUsersFromChat = async (userData: UserSearchListData, chatId: number) => {
    const response = await chatApi.deleteUsersFromChat(userData.id, chatId);
    if (apiHasError(response)) {
        throw new HTTPError(response);
    }
    if (userData.id == appStore.getState().user?.id) {
        const chats = await getChats();
        if(apiHasError(chats)) {
            throw new HTTPError(chats);
        }
        appStore.set({ chats });
    }
};

const searchUsersInChat = async (chatId: number, data: UserInChatSearch) => {
    const response = await chatApi.search(chatId, data);
    if (apiHasError(response)) {
        throw new HTTPError(response);
    }
    if (Array.isArray(response)) {
        return response.map(user => transformUser(user));
    }
    return false;
};

export const getChatUsers = async (chatId: number) => {
    const users = await searchUsersInChat(chatId, {limit: 99});
    if (apiHasError(users)) {
        throw new HTTPError(users);
    }
    const state = appStore.getState();
    if (state.chat && state.chat.id === chatId)
        return users;
    return false;
};

export const editChatAvatar = async (chatId: number, data: ChangeAvatar) => {
    data.append("chatId", chatId.toString());
    const response = await chatApi.avatar(data);
    if (apiHasError(response)) {
        throw new HTTPError(response);
    }

    const updatedChat = transformChat(response);
    const state = appStore.getState();
    updatedChat.canDelete = !!state.user && state.user.id === updatedChat.createdBy;
    const toUpdate: UpdateState = {};
    if (state.chat && state.chat.id === updatedChat.id)
        toUpdate["chat"] = updatedChat;

    if (state.chats) {
        for (const key in state.chats) {
            if (state.chats[key].id === updatedChat.id) {
                state.chats[key] = updatedChat;
                toUpdate["chats"] = state.chats;
                break;
            }
        }
    }

    if (toUpdate.chats || toUpdate.chat) {
        appStore.set(toUpdate);
    }
};

export const getChatNewMessagesCount = async (chatId: number) => {
    const response = await chatApi.getChatNewMessagesCount(chatId);
    if(apiHasError(response)) {
        throw new HTTPError(response);
    }

    return response.unread_count;
};

export {
    createChat,
    getChats,
    getChatToken,
    deleteChat,
    addUsersToChat,
    deleteUsersFromChat,
    searchUsersInChat,
};
