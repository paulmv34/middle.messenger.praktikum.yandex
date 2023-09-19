import Block from "../../core/Block";
import template from './button-icon.hbs?raw';

interface IProps {
    type: "menu" | "more" | "attach" | "send" | "back",
    name: string,
    page: string,
    onClick: () => void
}

export default class ButtonIcon extends Block {
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
