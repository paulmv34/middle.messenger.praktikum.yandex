import { HelperOptions } from "handlebars";
import Block from "../core/Block";
import { validatorTypes } from "../utils/validate";

export type PageTypes = "authorization" | "registration" | "404" | "500" | "empty-chat"  | "chat" | "profile" | "profileEdit" | "passwordEdit";

export type MessageStatuses = "send" | "received" | "read";

export interface HandlebarsHelperEmbed {
    component: Block,
    embed(fragment: DocumentFragment): void
}

export interface ComponentHelperOptionsDataRoot {
    __refs: Record<string, Block>,
    __children: HandlebarsHelperEmbed[],
}

export interface ComponentHelperOptions extends HelperOptions {
    data: {
        root: ComponentHelperOptionsDataRoot
    }, 
    // Не нашел способ заменить any
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fn: any
}

export interface NodeEvent<T = HTMLElement> extends Event {
    target: EventTarget & T;
}

export interface IContext extends BlockProps {
    title?: string;
}

export interface IChat {
    contacts: IContacts;
    dialog?: IDialog;
}

export type Props = Record<string, unknown | Block>;

export interface BlockProps extends Props {
    onClick?: (e: NodeEvent<HTMLElement>) => void,
    onBlur?: (e: NodeEvent<HTMLFormElement>) => void,
    onInput?: (e: NodeEvent<HTMLFormElement>) => void,
    onSubmit?: (e: NodeEvent<HTMLButtonElement>) => void;
    events?: Events
}

// Не нашел способ заменить any
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Events = Record<string, (e: any) => void>;

export type Embed = (fragment: DocumentFragment) => void;

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

export interface IButton {
    button: boolean,
    page: string,
    name: string,
    label?: string,
    type?: string,
    color?: string,
}

export interface IField {
    label: string,
    name: string,
    type: string,
    placeholder: string,
    value: string,
    error: string,
    required: boolean,
    validator: validatorTypes,
    disabled: boolean,
    incorrectMessage: string,
    edit: boolean,
}
