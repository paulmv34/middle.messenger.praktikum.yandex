import Block from "../../core/Block";
import template from './button.hbs?raw';

interface IProps extends IButton {}

export default class Button extends Block {
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
