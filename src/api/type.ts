import {isPlainObject} from "../types/types";

export type APIError = {
    status: number;
    reason: string;
};

export type SignUpResponse = {
    id: number
}

export type UserSearch = {
    login: string;
};

export function isUserSearch(data: unknown): data is UserSearch {
    return typeof data === "object" && data !== null && "login" in data;
}

export type UserDTO = {
    id: number;
    login: string;
    first_name: string;
    second_name: string;
    display_name: string;
    avatar: string;
    phone: string;
    email: string;
    role?: string;
};

export function isMessageDTO (data: unknown): data is MessageDTO {
    return isPlainObject(data) && typeof data.type == "string" && ["file", "sticker", "message"].includes(data.type);
}

export type MessageDTO = {
    id: number,
    is_read: boolean,
    chat_id: number,
    time: string,
    type: string,
    user_id: number,
    content: string,
    file?: FileDataDTO
};

export type FileDataDTO = {
    id: number,
    user_id: number,
    path: string,
    filename: string,
    content_type: string,
    content_size: number,
    upload_date: string,
}

export type CreateUser = {
    login: string;
    first_name: string;
    second_name: string;
    phone: string;
    email: string;
    password: string
}

export type ChangeProfile = {
    first_name: string,
    second_name: string,
    display_name: string,
    login: string,
    email: string,
    phone: string
}

export type ChangeAvatar = FormData

export type ChangePassword = {
    oldPassword: string,
    newPassword: string
}

export type CreateChat = {
    title: string
}

export type UserInChatSearch = {
    offset?: number,
    limit?: number,
    name?: string,
    email?: string,
}

export type UserSearchListData = {
    id: number,
    login?: string,
    firstName?: string,
    secondName?: string,
}

export type LoginRequestData = {
    login: string,
    password: string
}

export type ChatInfo = {
    offset?: number,
    limit?: number,
    title?: string,
}

type LastMessageDTO = {
    user: UserDTO,
    time: string,
    content: string
}

export type ChatDTO = {
    id: number,
    title: string,
    avatar: string | "",
    unread_count: number,
    created_by: number,
    last_message: LastMessageDTO | null
}

