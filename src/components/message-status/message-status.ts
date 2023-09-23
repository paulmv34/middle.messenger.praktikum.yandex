import Block from "../../core/Block";
import template from "./message-status.hbs?raw";
import formatDate from "../../utils/format-date";

interface IProps {
    date: number,
    status: MessageStatuses,
    format?: string,
    dateFormatted?: string,
}

export default class MessageStatus extends Block {
    constructor(props: IProps) {
        if (props.date && props.format)
            props.dateFormatted = formatDate(props.date, props.format);
        super(props);
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}
