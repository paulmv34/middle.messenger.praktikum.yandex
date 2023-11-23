import Block from "../../core/Block";
import {Props, IButton, IField, NodeEvent, User, RefType, ValueString, isPlainObject} from "../../types/types";
import template from "./profile.hbs?raw";
import {connect} from "../../utils/connect";
import {ProfilePageContext} from "../../main.data";
import {logout} from "../../services/auth";
import ModalUserAvatarForm from "../../components/modal-user-avatar-form/modal-user-avatar-form";
import {cloneDeep} from "../../utils/cloneDeep";

interface IProps extends Props  {
    title: string,
    caption: string,
    back: string,
    avatar: {src: string, username: string},
    emailField?: IField<ValueString>,
    loginField?: IField<ValueString>,
    displayNameField?: IField<ValueString>,
    nameField?: IField<ValueString>,
    secondNameField?: IField<ValueString>,
    phoneField?: IField<ValueString>,
    editProfileButton?: IButton,
    editPasswordButton?: IButton,
    logoutButton?: IButton,
    onClick?: (e: NodeEvent<HTMLElement>) => void,
    onLogoutClick?: (e: NodeEvent<HTMLElement>) => void,
    onModalShow?: () => void,
    user: User,
}

interface IRefs extends RefType {
    AvatarForm: ModalUserAvatarForm,
}

export class ProfilePage extends Block<IProps, IRefs> {
    static authRequired = "yes";

    constructor(props: IProps) {
        super(Object.assign(props, cloneDeep(ProfilePageContext)) as IProps);
    }

    protected componentPropsUpdated() {
        if (!isPlainObject(this.props.user))
            return;
        Object.entries(this.props.user).forEach(([key, value]) => {
            if (key + "Field" in this.props) {
                this.props[key + "Field"].value = value;
            }
        });
    }

    protected modifyProps(props: IProps = {} as IProps): IProps {
        props.events = {
            click: props.onClick || (() => {})
        };

        const onModalShow = this.onModalShow.bind(this);
        const onLogoutClick = this.onLogoutClick.bind(this);
        props.onLogoutClick = (e: NodeEvent<HTMLElement>) => onLogoutClick(e);
        props.onModalShow = () => onModalShow();
        return props;
    }

    public onModalShow() {
        this.refs.AvatarForm.show();
    }

    public onLogoutClick(e: NodeEvent<HTMLElement>) {
        e.preventDefault();
        e.stopPropagation();
        logout();
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}

export default connect(({user}) => ({user}))(ProfilePage);