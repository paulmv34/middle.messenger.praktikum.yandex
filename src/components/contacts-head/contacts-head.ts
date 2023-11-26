import Block from "../../core/Block";
import {Props} from "../../types/types";
import template from "./contacts-head.hbs?raw";
import {logout} from "../../services/auth";

interface IProps extends Props {
    onLogoutClick?: () => void,
    onModalShow?: () => void,
}

export default class ContactsHead extends Block<IProps> {
    protected modifyProps(props: IProps = {} as IProps): IProps {
        const onLogoutClick = this.logout.bind(this);
        const onModalShow = this.modalShow.bind(this);
        props.onLogoutClick = () => onLogoutClick();
        props.onModalShow = () => onModalShow();
        return props;
    }

    public logout() {
        logout();
    }

    public modalShow() {
        this.refs.modalCreateChatForm.show();
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}
