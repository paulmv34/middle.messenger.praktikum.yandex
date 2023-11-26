import Block from "../../core/Block";
import {Chat, Props} from "../../types/types";
import template from "./contacts-list.hbs?raw";
import {connect} from "../../utils/connect";

interface IProps extends Props {
    chats: Chat[]
}

export class ContactsList extends Block<IProps> {
    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }

    protected componentPropsUpdated() {

    }
}

export default connect(({chats}) => {return ({chats});})(ContactsList);
