import Block from "../../core/Block";
import template from "./form-field.hbs?raw";
import {validateFieldValue} from "../../utils/validate";
import { BlockProps, IField, NodeEvent } from "../../types/main.types";

interface IProps extends BlockProps {
    field: IField
}

const inputClass= "form-field__input";

export default class FormField extends Block {

    constructor(props: IProps) {
        super(props);
        this.props.events = {
            blur: (e: NodeEvent<HTMLFormElement>) => this.onBlur(e),
            input: (e: NodeEvent<HTMLFormElement>) => this.onInput(e),
        };
    }

    protected getField(): IField {
        return this.props.field as IField;
    }

    protected onBlur(e: NodeEvent<HTMLFormElement>) {
        this.validate(e.target.value);
    }

    protected onInput(e: NodeEvent<HTMLFormElement>) {
        const field = e.target;
        if (!field)
            return;
        if (field.value.length > 0)
            field.classList.remove(`${inputClass}_empty`);
        else
            field.classList.add(`${inputClass}_empty`);
    }

    public componentWillMount() {
        if (this.element) {
            this.eventTarget = this.element.querySelector(`.${inputClass}`);
            this.input = this.element.querySelector(`.${inputClass}`);
        }
    }

    public validate(value: string):boolean {
        let errorMessage = "";
        const field = this.getField();
        if (typeof(value) == "undefined")
            value = this.input ? this.input.value : "";
        let valid = field.required ? value.length > 0 : true;
        if (!valid)
            errorMessage = "Заполните поле";
        if (field.validator)
            valid = valid && validateFieldValue(value, field.validator);
        if (!valid && errorMessage === "")
            errorMessage = field.incorrectMessage ?? "Поле заполнено некорректно";
        this.setProps({
            field: Object.assign(field, {
                error: valid ? "" : errorMessage,
                value: value,
            })
        });
        return valid;
    }

    public value(): Record<string, string> {
        const result: Record<string, string> = {};
        const field = this.getField();
        result[field.name] = field.value;
        return result;
    }

    public setError(error: string) {
        this.getField().error = error;
    }

    public isValid():boolean {
        return this.getField().error === "";
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}
