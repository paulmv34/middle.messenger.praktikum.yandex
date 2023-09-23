import Block from "../core/Block";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type PageTypes = "authorization" | "registration" | "404" | "500" | "empty-chat"  | "chat" | "profile" | "profileEdit" | "passwordEdit";

export type MessageStatuses = "send" | "received" | "read";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export interface NodeEvent<T = HTMLElement> extends Event {
    target: EventTarget & T;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export interface IContext {
    title?: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export interface IChat {
    contacts: IContacts;
    dialog?: IDialog;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type BlockProps = Record<string, unknown | Block>;

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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export interface IButton {
    button: boolean,
    page: string,
    name: string,
    label?: string,
    type?: string,
    color?: string,
    onClick?: (e: NodeEvent<HTMLFormElement>) => void,
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export interface IField {
    label: string,
    name: string,
    type: string,
    placeholder: string,
    value: string,
    error: string,
    required: boolean,
    validate?: () => void,
    disabled: boolean,
    incorrectMessage: string,
    onBlur?: (e: NodeEvent<HTMLFormElement>) => DocumentFragment | undefined,
}
