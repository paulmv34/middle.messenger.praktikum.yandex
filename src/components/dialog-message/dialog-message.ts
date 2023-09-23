import Block from "../../core/Block";
import template from "./dialog-message.hbs?raw";
import formatDate from "../../utils/format-date";
import { BlockProps, IDialogMessage } from "../../types/main.types";

interface IProps extends BlockProps{
    message: IDialogMessage
}

export default class DialogMessage extends Block {
    constructor(props: IProps) {
        if (props.message.date)
            props.message.dateLabel = formatDate(props.message.date, "d M");
        props.message.displayedStatus = props.message.owner ? props.message.status : undefined;
        super(props);
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}
