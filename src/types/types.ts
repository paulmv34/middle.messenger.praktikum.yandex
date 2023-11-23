import { HelperOptions } from "handlebars";
import Block from "../core/Block";
import { fileValidatorsTypes, stringValidatorsTypes } from "../utils/validate";

export type PageTypes = "authorization" | "registration" | "404" | "500" | "empty-chat"  | "chat" | "profile" | "profileEdit" | "passwordEdit";

export type MessageStatuses = "send" | "received" | "read";

export interface HandlebarsHelperEmbed<P extends Props, R extends RefType = RefType> {
    component: Block<P, R>,
    embed(fragment: DocumentFragment): void
}

export interface ComponentHelperOptionsDataRoot<P extends Props, R extends RefType = RefType> {
    __refs: Record<string, Block<P, R>>,
    __children: HandlebarsHelperEmbed<P, R>[],
}

export interface ComponentHelperOptions<P extends Props, R extends RefType = RefType> extends HelperOptions {
    hash: Record<string, string>,
    data: {
        root: ComponentHelperOptionsDataRoot<P, R>
    }, 
    // Не нашел способ заменить any
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fn: any
}

export interface NodeEvent<T> extends Event {
    target: EventTarget & T;
}

export interface IContext extends Props {
    title?: string;
}

export interface IChat {
    contacts: IContacts;
    dialog?: IDialog;
}

export type RefType = {
    [key: string]: Block<Props, RefType>
}

export type BlockData = {
    [key: string]: unknown
}

type EventHandler = (e: Event) => void;
type HTMLElementEventHandler = (e: NodeEvent<HTMLElement>) => void;
type HTMLButtonEventHandler = (e: NodeEvent<HTMLButtonElement>) => void;
type HTMLInputEventHandler = (e: NodeEvent<HTMLInputElement>) => void;

export type HTMLElementEvent = EventHandler | HTMLElementEventHandler | HTMLButtonEventHandler | HTMLInputEventHandler;

export type Props = {
    // Не нашел способ заменить any
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any | Block<Props, RefType>,
    events?: Record<string,  HTMLElementEvent>,
};

export type MessageFormData = {message: string};

export interface IContacts {
    search: string;
    list: IContactsListItem[];
}

export interface IContactsListItem {
    current: boolean,
    avatar: string,
    username: string,
    online: boolean,
    status: string,
    date: number,
    label: string,
    message: string,
    count: number,
    page: string,
}

export interface IDialog {
    contact: IDialogContact,
    messages: IDialogMessage[],
    form: IDialogForm,
}

export interface IDialogContact {
    avatar: string,
    username: string,
    online: boolean,
    status: string,
}

export interface IDialogForm {
    message: string,
    attachments?: unknown,
}

export interface IDialogMessage {
    owner: boolean,
    avatar: string,
    username: string,
    message: string,
    image: string,
    status: MessageStatuses,
    displayedStatus?: MessageStatuses | undefined,
    showDateLabel: boolean,
    date: number,
    dateLabel?: string,
}

export type IButton = {
    page?: string,
    name?: string,
    label?: string,
    type?: string,
    color?: string,
}

export type FileData = {
    id: number,
    userId: number,
    path: string,
    filename: string,
    contentType: string,
    contentSize: number,
    uploadDate: Date,
}

export type Message = {
    id: number,
    chatId: number,
    time: Date,
    type: string,
    userId: number,
    content: string,
    isRead: boolean,
    file?: FileData | null,
    isOwner?: boolean,
    isMessage?: boolean,
    isFile?: boolean,
    dateLabel?: string,
    showDateLabel?: boolean,
    user?: User,
};

export interface IField<ValueType> {
    label: string,
    name: string,
    type: string,
    placeholder: string,
    value: ValueType,
    error: string,
    required: boolean,
    validator: fileValidatorsTypes | stringValidatorsTypes,
    disabled?: boolean,
    incorrectMessage?: string,
    fileName?: string,
    edit: boolean,
}

export type ValueString = string;
export type ValueFile = File | string;

export type PlainObject<T = unknown> = {
    [key in string]: T;
};

export function isPlainObject(value: unknown): value is PlainObject {
    return typeof value === "object"
        && value !== null
        && value.constructor === Object
        && Object.prototype.toString.call(value) === "[object Object]";
}

export function isRegex(value: unknown): value is RegExp {
    return typeof value === "object"
        && Object.prototype.toString.call(value) === "[object RegExp]";
}

export function isArray(value: unknown): value is [] {
    return Array.isArray(value);
}

export type AppState = {
    user: User | null,
    chats: Chat[]
    chat: null | Chat,
    errorInfo: Record<string, string | number>
}

export type UpdateState = Partial<AppState>;

export type User = {
    id: number;
    login: string;
    firstName: string;
    secondName: string;
    displayName: string;
    avatar: string;
    phone: string;
    email: string;
    role?: string;
};

export type LastMessage = {
    user: User,
    time: Date,
    content: string
}

export type Chat = {
    id: number,
    title: string,
    avatar: Nullable<string>,
    unreadCount: number,
    createdBy: number,
    lastMessage: LastMessage | null
    canDelete?: boolean;
}