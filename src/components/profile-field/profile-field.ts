import Block from "../../core/Block";
import template from "./profile-field.hbs?raw";
import {validateFieldValue} from "../../utils/validate";

interface IProps {
    field: IField
}

// попытка создать базовый класс поля и наследоваться от него привела к потере свойств
export default class ProfileField extends Block {
    protected baseInputClass: string = "profile-field__input";
    protected input: HTMLInputElement | null = null;

    constructor(props: IProps) {
        super(props);
        this.props.events = {
            blur: (e) => this.onBlur(e),
            input: (e) => this.onInput(e),
        };
    }

    protected onBlur(e: NodeEvent<HTMLFormElement>) {
        if (!this.props.field.edit)
            return;
        this.validate(e.target.value);
    }

    protected onInput(e: NodeEvent<HTMLFormElement>) {
        if (!this.props.field.edit)
            return;
        const field = e.target;
        if (!field)
            return;
        if (field.value.length > 0)
            field.classList.remove(`${this.baseInputClass}_empty`);
        else
            field.classList.add(`${this.baseInputClass}_empty`);
    }

    public componentWillMount() {
        this.eventTarget = this.element?.querySelector(`.${this.baseInputClass}`);
        this.input = this.element?.querySelector(`.${this.baseInputClass}`);
    }

    public validate(value: string):boolean {
        let errorMessage = "";
        if (typeof(value) == "undefined")
            value = this.input ? this.input.value : "";
        let valid = this.props.field.required ? value.length > 0 : true;
        if (!valid)
            errorMessage = "Заполните поле";
        if (this.props.field.validator)
            valid = valid && validateFieldValue(value, this.props.field.validator);
        if (!valid && errorMessage === "")
            errorMessage = this.props.field.incorrectMessage ?? "Поле заполнено некорректно";
        this.setProps({
            field: Object.assign(this.props.field, {
                error: valid ? "" : errorMessage,
                value: value,
            })
        });
        return valid;
    }

    public value(): Record<string, string> {
        const result = {};
        result[this.props.field.name] = this.props.field.value;
        return result;
    }

    public setError(error: string) {
        this.props.field.error = error;
    }

    public isValid():boolean {
        return this.props.field.error === "";
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}