import Block from "../../core/Block";
import template from './dialog-date.hbs?raw';

interface IProps {
    date: number,
}

export default class DialogDate extends Block {
    constructor(props: IProps) {
        super(props);
        this.props.events = {
            click: this.props.onClick || (() => {})
        }
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}
