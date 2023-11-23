import { HTTPTransport } from "../core/HTTPTransport";
import {APIError, ChangeAvatar, ChatDTO, ChatInfo, CreateChat, UserDTO, UserInChatSearch} from "./type";
import constants from "../constants";

const chatApi = new HTTPTransport();

export default class ChatApi {
    async create(data: CreateChat): Promise<{id: number} | APIError> {
        return chatApi.post<{id: number}>("/chats", {data, headers: constants.JSON_HEADERS});
    }

    async getChats(data: ChatInfo = {}): Promise<ChatDTO[] | APIError > {
        return chatApi.get<ChatDTO[]>("/chats", {data, headers: constants.JSON_HEADERS});
    }

    async delete(chatId: number): Promise<void | APIError> {
        return chatApi.delete("/chats", { data: { chatId: chatId }, headers: constants.JSON_HEADERS });
    }

    async getChatNewMessagesCount(chatId: number): Promise<{unread_count: number} | APIError> {
        return chatApi.get(`/chats/new/${chatId}`);
    }

    async addUsersToChat(userId: number | Array<string>, chatId: number): Promise<void | APIError> {
        return chatApi.put("/chats/users", { data: { users: Array.isArray(userId) ? userId : [userId], chatId }, headers: constants.JSON_HEADERS });
    }

    async deleteUsersFromChat(userId: number | Array<string>, chatId: number): Promise<void | APIError> {
        return chatApi.delete("/chats/users", { data: { users: Array.isArray(userId) ? userId : [userId], chatId }, headers: constants.JSON_HEADERS });
    }

    async getChatToken(chatId: number): Promise<{ token: string } | APIError > {
        return chatApi.post(`/chats/token/${chatId}`);
    }

    async search(chatId: number, data: UserInChatSearch): Promise<UserDTO[] | APIError > {
        return chatApi.get(`/chats/${chatId}/users`, {data, headers: constants.JSON_HEADERS});
    }

    async avatar(data: ChangeAvatar): Promise<ChatDTO | APIError> {
        return chatApi.put<ChatDTO>("/chats/avatar", {data});
    }
}