import Block from "../../core/Block";
import { Props } from "../../types/types";
import template from "./form-fieldset.hbs?raw";

interface IProps extends Props {}

export default class FormFieldset extends Block<IProps> {
    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}
