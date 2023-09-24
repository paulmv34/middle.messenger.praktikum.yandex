import Block from "../../core/Block";
import { BlockProps, IButton } from "../../types/main.types";
import template from "./error.hbs?raw";

interface IProps extends BlockProps {
    title: string,
    caption: string,
    text: string,
    back: string,
    button: IButton,
}

export default class ErrorPage extends Block {
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
