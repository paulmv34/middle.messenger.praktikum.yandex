import Block from "../../core/Block";
import template from "./dialog-empty.hbs?raw";
import {Props} from "../../types/types";

interface IProps extends Props { }

export default class DialogEmpty extends Block<IProps> {
    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}
