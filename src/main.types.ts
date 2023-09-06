type PageTypes = "authorization" | "registration" | "404" | "500" | "empty-chat"  | "chat" | "profile" | "profileEdit" | "passwordEdit";

interface Context {
    title?: string
}

interface ContactsListItem {
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