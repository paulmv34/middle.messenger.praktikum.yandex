import Block from "../../core/Block";
import template from "./button-icon.hbs?raw";

interface IProps extends IButton {}

export default class ButtonIcon extends Block {
    constructor(props: IProps) {
        super(props);
        this.props.events = {
            click: this.props.onClick || (() => {})
        };
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}
