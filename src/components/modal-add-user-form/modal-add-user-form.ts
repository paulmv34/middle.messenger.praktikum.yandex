import Block from "../../core/Block";
import template from "./modal-add-user-form.hbs?raw";
import {ModalAddUserFormContext} from "../../main.data";
import {Props, IButton, IField, NodeEvent, RefType, ValueFile} from "../../types/types";
import {addUsersToChat} from "../../services/chat";
import {userSearch} from "../../services/user";
import {isUserSearch, UserSearch, UserSearchListData} from "../../api/type";
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
    chatId: number,
    onSubmit?: (e: NodeEvent<HTMLButtonElement>) => void,
    onClose?: (e: NodeEvent<HTMLButtonElement>) => void,
    onSearch?: (data: UserSearch | null) => void,
    onSelect?: (data: UserSearchListData | null) => void,
    onChange?: () => void,
}

interface IRefs extends RefType {
    loginField: FormField,
    searchList: SearchList,
}

export default class ModalAddUserForm extends Block<IProps, IRefs> {
    static authRequired = "no";
    private selected: UserSearchListData | null = null;

    constructor(props: IProps | undefined = {} as IProps) {
        super(Object.assign(props, cloneDeep(ModalAddUserFormContext)) as IProps);
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
        if (isUserSearch(data)) {
            userSearch(data).then((searched) => {
                this.refs.searchList.setProps({
                    list: searched,
                    hasResult: searched.length > 0,
                    showNoResult: true,
                } as Props);
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
            let errorText = "";
            let hasAuthError = false;
            addUsersToChat(this.selected, this.props.chatId).then(() => {
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
