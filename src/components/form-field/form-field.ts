import Block from "../../core/Block";
import template from "./form-field.hbs?raw";
import {validate} from "../../utils/validate";
import {Props, IField, NodeEvent, ValueString} from "../../types/types";
import {isUserSearch, UserSearch} from "../../api/type";

interface IProps extends Props {
    field: IField<ValueString>,
    onSearch?: (data: UserSearch | null) => void,
    onChange?: () => void,
}

const inputClass= "form-field__input";

export default class FormField extends Block<IProps> {
    private searchTimeout: false | number = false;

    protected modifyProps(props: IProps = {} as IProps): IProps {
        if (props.value && props.value !== "" && (!props.field.value || props.field.value === ""))
            props.field.value = props.value;
        else if (props.field.value && props.field.value !== "")
            props.value = props.field.value ? props.field.value : "";
        props.events = {
            blur: (e: NodeEvent<HTMLElement>) => this.onBlur(e),
            input: (e: NodeEvent<HTMLElement>) => this.onInput(e),
        };
        return props;
    }

    protected getField(): IField<ValueString> {
        return this.props.field as IField<ValueString>;
    }

    protected onBlur(e: NodeEvent<HTMLElement>) {
        if (e.target instanceof HTMLInputElement)
            this.validate(e.target.value);
    }

    protected onInput(e: NodeEvent<HTMLElement>) {
        if (!(e.target instanceof HTMLInputElement))
            return;
        const field = e.target;
        if (!field)
            return;
        if (field.value.length > 0)
            field.classList.remove(`${inputClass}_empty`);
        else
            field.classList.add(`${inputClass}_empty`);
        this.onChange();
        if (typeof this.props.onSearch == "function") {
            if (this.searchTimeout)
                clearTimeout(this.searchTimeout);
            this.searchTimeout = window.setTimeout(() => this.onSearch(), 250);
        }
    }

    protected onSearch() {
        if (this.validate(undefined, true)) {
            const value = this.value();
            if (typeof this.props.onSearch == "function" && isUserSearch(value))
                this.props.onSearch(value);
        }
        else {
            if (typeof this.props.onSearch == "function")
                this.props.onSearch(null);
        }

    }

    protected onChange() {
        if (this.props.onChange)
            this.props.onChange();
    }

    public componentWillMount() {
        if (this.element) {
            this.eventTarget = this.element.querySelector(`.${inputClass}`);
            this.input = this.element.querySelector(`.${inputClass}`);
        }
    }

    public validate(value?: string, silent?: boolean):boolean {
        let errorMessage = "";
        const field = this.getField();
        if (typeof(value) == "undefined")
            value = this.input ? this.input.value : "";
        let valid = field.required ? value.length > 2 : true;
        if (!valid)
            errorMessage = "Заполните поле";
        if (field.validator)
            valid = valid && validate(value, field.validator);
        if (!valid && errorMessage === "")
            errorMessage = field.incorrectMessage ?? "Поле заполнено некорректно";
        if (!silent) {
            this.setProps({
                field: Object.assign(field, {
                    error: valid ? "" : errorMessage,
                    value: value,
                }),
                value: value,
            } as IProps);
        }
        else {
            this.setProps({
                field: Object.assign(field, {
                    value: value,
                }),
                value: value,
            } as IProps, silent);
        }
        return valid;
    }

    public resetValue() {
        const field = this.getField();
        this.setProps({
            field: Object.assign(field, {
                error: "",
                value: "",
            }),
            value: "",
        } as IProps);
    }

    public value(): Record<string, string> {
        const result: Record<string, string> = {};
        const field = this.getField();
        result[field.name] = this.props.field.value;
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
