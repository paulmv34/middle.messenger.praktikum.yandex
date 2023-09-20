import Block from "../../core/Block";
import template from './dialog.hbs?raw';

interface IProps extends IDialog { }

export default class Dialog extends Block {
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
