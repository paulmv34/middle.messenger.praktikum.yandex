import Block from "../../core/Block";
import { Props } from "../../types/types";
import template from "./text.hbs?raw";

interface IProps extends Props {
    text: string,
    align: "center",
}

export default class Text extends Block <IProps> {
    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}
