import Block from "../../core/Block";
import { BlockProps, IButton, IField } from "../../types/main.types";
import template from "./fullscreen-form.hbs?raw";

interface IProps extends BlockProps {
    back: string,
    narrow: boolean,
    caption?: string,
    fields?: IField[],
    buttons?: IButton[],
}

export default class FullscreenForm extends Block {
    constructor(props: IProps) {
        super(props);
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}
