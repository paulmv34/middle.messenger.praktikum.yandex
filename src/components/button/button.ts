import Block from "../../core/Block";
import { BlockProps, IButton } from "../../types/main.types";
import template from "./button.hbs?raw";

interface IProps extends IButton, BlockProps {}

export default class Button extends Block {

    constructor(props: IProps) {
        super(props);
        this.props.events = {
            click: this.props.onClick || (() => {})
        };
    }

    public componentWillMount() {

    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}
