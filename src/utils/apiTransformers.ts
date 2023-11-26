import {ChangeProfile, ChatDTO, MessageDTO, UserDTO} from "../api/type";
import constants from "../constants";
import {Chat, Message, User} from "../types/types";
import {parseDate} from "./parseDate";

const buildPathToResource = (resource: string | "") => {
    return resource ? `${constants.HOST}/resources${resource}` : "";
};

export const transformMessage = (data: MessageDTO): Message => {
    return {
        id: data.id,
        isRead: data.is_read,
        chatId: data.chat_id,
        time: parseDate(data.time),
        type: data.type,
        userId: data.user_id,
        content: data.content,
        file: data.file ?{
            id: data.file.id,
            userId: data.file.user_id,
            path: data.file.path,
            filename: data.file.filename,
            contentType: data.file.content_type,
            contentSize: data.file.content_size,
            uploadDate: parseDate(data.file.upload_date),
        } : null
    };
};

export const transformUser = (data: UserDTO): User => {
    const userData: User = {
        id: data.id,
        login: data.login,
        firstName: data.first_name,
        secondName: data.second_name,
        displayName: data.display_name,
        avatar: buildPathToResource(data.avatar),
        phone: data.phone,
        email: data.email,
    };

    if (data.role)
        userData.role = data.role;

    return userData;
};

export const transformProfile = (data: User): ChangeProfile => {
    return {
        first_name: data.firstName,
        second_name: data.secondName,
        display_name: data.displayName,
        login: data.login,
        email: data.email,
        phone: data.phone,
    };
};


export const transformChat = (data: ChatDTO): Chat => {
    return {
        avatar: buildPathToResource(data.avatar),
        id: data.id,
        title: data.title,
        unreadCount: data.unread_count,
        createdBy: data.created_by,
        lastMessage: data.last_message ? {
            content: data.last_message.content,
            time: parseDate(data.last_message.time),
            user: {
                id: data.last_message.user.id,
                login: data.last_message.user.login,
                firstName: data.last_message.user.first_name,
                secondName: data.last_message.user.second_name,
                displayName: data.last_message.user.display_name,
                avatar: data.last_message.user.avatar,
                phone: data.last_message.user.phone,
                email: data.last_message.user.email,
            }
        } : null
    };
};
export const transformChats = (data: ChatDTO[]): Chat[] => {
    return data.map(chat => (transformChat(chat)));
};

export const transformToFormData = (data: Record<string, string | Blob>) => {
    const formData = new FormData();
    for (const key in data) {
        formData.append(key, data[key]);
    }
    return formData;
};
