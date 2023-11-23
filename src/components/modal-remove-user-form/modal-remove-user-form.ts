import Block from "../../core/Block";
import template from "./modal-remove-user-form.hbs?raw";
import {ModalRemoveUserFormContext} from "../../main.data";
import {Props, IButton, IField, NodeEvent, RefType, ValueFile} from "../../types/types";
import {deleteUsersFromChat, searchUsersInChat} from "../../services/chat";
import {UserSearch, UserSearchListData} from "../../api/type";
import {appStore} from "../../core/Store";
import FormField from "../form-field/form-field";
import SearchList from "../search-list/search-list";
import {cloneDeep} from "../../utils/cloneDeep";
import {isAuthError} from "../../core/processHTTPError";
import {authLost} from "../../core/authLost";

interface IProps extends Props {
    caption?: string,
    errorText?: string,
    avatarField?: IField<ValueFile>,
    submitButton?: IButton,
    onSearch?: (data: UserSearch | null) => void,
    onSelect?: (data: UserSearchListData | null) => void,
    onChange?: () => void,
    chatId: number,
}

interface IRefs extends RefType {
    loginField: FormField,
    searchList: SearchList,
}

export default class ModalRemoveUserForm extends Block<IProps, IRefs> {
    static authRequired = "no";
    private selected: UserSearchListData | null = null;

    constructor(props: IProps | undefined = {} as IProps) {
        super(Object.assign(props, cloneDeep(ModalRemoveUserFormContext)) as IProps);
    }

    protected modifyProps(props: IProps = {} as IProps): IProps {
        props.hidden = true;
        const onSubmit = this.submit.bind(this);
        const onClose = this.close.bind(this);
        const onSearch = this.search.bind(this);
        const onSelect = this.select.bind(this);
        const onChange = this.change.bind(this);
        props.onSubmit = (e: NodeEvent<HTMLButtonElement>) => onSubmit(e);
        props.onClose = (e: NodeEvent<HTMLButtonElement>) => onClose(e);
        props.onSearch = (data: UserSearch | null) => onSearch(data);
        props.onSelect = (data: UserSearchListData | null) => onSelect(data);
        props.onChange = () => onChange();
        return props;
    }

    public show() {
        this.refs.loginField.resetValue();
        this.refs.searchList.setProps({
            list: [],
            hasResult: false
        } as Props);
        this.getElement()?.classList.add("_no-send");
        super.show();
    }

    public close(e: NodeEvent<HTMLButtonElement>) {
        e.stopPropagation();
        if (e.target.matches(".close-button_modal-close,.fullscreen-form__scroll"))
            this.hide();
    }

    public search(data: UserSearch | null) {
        // нет адекватной ручки для поиска по логину, есть только поиск по ФИО, но изначальный макет намекает на поиск по логину, а в ТЗ ни слова...
        // раз уж добавили по логину, то и удалим по логину, в рамках обучения сойдет
        // теперь представим, что далее используется ручка для поиска по логину среди пользователей чата...
        if (data && data.login) {
            searchUsersInChat(this.props.chatId, {limit: 99}).then((usersInChat) => {
                const storeStateUser = appStore.getState().user;
                if (storeStateUser && Array.isArray(usersInChat)) {
                    usersInChat = usersInChat.filter(item => item.login.includes(data.login) && (storeStateUser.id !== item.id && item.role !== "admin" || item.role !== "admin"));
                    this.refs.searchList.setProps({
                        list: usersInChat,
                        hasResult: usersInChat.length > 0,
                        showNoResult: true,
                    } as Props);
                }
            }).catch((error) => {
                if (isAuthError(error))
                    authLost();
                else {
                    this.refs.searchList.setProps({
                        list: [],
                        hasResult: false,
                        showNoResult: false,
                    } as Props);
                }
            });
        }
        else {
            this.refs.searchList.setProps({
                list: [],
                hasResult: false,
                showNoResult: false,
            } as Props);
        }

    }

    public select(data: UserSearchListData | null) {
        this.selected = data;
        if (data && data.id) {
            this.refs.loginField.validate(data.login);
            this.getElement()?.classList.remove("_no-send");
        }
        else
            this.getElement()?.classList.add("_no-send");
    }

    public change() {
        this.getElement()?.classList.add("_no-send");
    }

    public submit(e: NodeEvent<HTMLButtonElement>) {
        e.preventDefault();
        e.stopPropagation();
        if (!this.selected) {
            this.props.errorText = "Выберите пользователя";
            return;
        }
        else {
            let hasAuthError = false;
            let errorText = "";
            deleteUsersFromChat(this.selected, this.props.chatId).then(() => {
                this.hide();
            }).catch(error => {
                hasAuthError = isAuthError(error);
                errorText = error.message;
            }).finally(() => {
                this.props.errorText = errorText;
                if (hasAuthError)
                    authLost();
            });
        }
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}
