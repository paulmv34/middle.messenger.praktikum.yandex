import Block from "../../core/Block";
import {Props} from "../../types/types";
import template from "./chat.hbs?raw";

interface IProps extends Props {
    title: string,
}

export default class ChatPage extends Block <IProps> {
    static authRequired = "yes";

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}