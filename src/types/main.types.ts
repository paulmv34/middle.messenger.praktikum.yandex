type PageTypes = "authorization" | "registration" | "404" | "500" | "empty-chat"  | "chat" | "profile" | "profileEdit" | "passwordEdit";

type MessageStatuses = "send" | "received" | "read";

interface IContext {
    title?: string;
}

interface IChat {
    contacts: IContacts;
    dialog?: IDialog;
}

interface IContacts {
    search: string;
    list: IContactsListItem[];
}

interface IContactsListItem {
    current: boolean,
    avatar: string,
    username: string,
    online: boolean,
    status: string,
    date: string,
    label: string,
    message: string,
    count: number,
    page: string,
}

interface IDialog {
    contact: IDialogContact,
    messages: IDialogMessage[],
    form: IDialogForm,
}

interface IDialogContact {
    avatar: string,
    username: string,
    online: boolean,
    status: string,
}

interface IDialogForm {
    message: string,
    attachments?: unknown,
}

interface IDialogMessage {
    owner: boolean,
    avatar: string,
    username: string,
    message: string,
    image: string,
    status: MessageStatuses,
    showDateLabel: boolean,
    date: number,
}

interface IButton {
    button: boolean,
    page: string,
    name: string,
    label?: string,
    type?: string,
    color?: string,
    onClick?: () => void,
}

interface IField {
    label: string,
    name: string,
    type: string,
    placeholder: string,
    value: string,
    error: string,
    validate?: () => void,
    disabled: boolean,
    onBlur?: () => void,
}