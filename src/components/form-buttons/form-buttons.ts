import Block from "../../core/Block";
import {Props} from "../../types/types";
import template from "./form-buttons.hbs?raw";

interface IProps extends Props { }

export default class FormButtons extends Block<IProps> {
    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}
