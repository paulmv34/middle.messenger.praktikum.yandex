import Block from "../../core/Block";
import template from "./dialog-message.hbs?raw";
import formatDate from "../../utils/formatDate";
import {Props, Message} from "../../types/types";

interface IProps extends Props {
    message: Message,
}

export default class DialogMessage extends Block<IProps> {
    constructor(props: IProps) {
        props.message.isMessage = props.message.type == "message";
        props.message.isFile = props.message.type == "file" || props.message.type == "sticker";
        props.message.dateLabel = formatDate(props.message.time, "d M");
        super(props);
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}
