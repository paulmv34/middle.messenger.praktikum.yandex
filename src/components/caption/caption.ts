import Block from "../../core/Block";
import {Props} from "../../types/types";
import template from "./caption.hbs?raw";

interface IProps extends Props {
    text: string,
}

export default class Caption extends Block<IProps> {
    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}
