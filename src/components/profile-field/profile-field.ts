import Block from "../../core/Block";
import template from "./profile-field.hbs?raw";
import {validate} from "../../utils/validate";
import {Props, IField, NodeEvent, ValueString} from "../../types/types";

interface IProps extends Props {
    field: IField<ValueString>,
    value?: ValueString
}

const inputClass= "profile-field__input";

export default class ProfileField extends Block<IProps> {
    constructor(props: IProps = {} as IProps) {
        super(Object.assign(props, {}));
    }

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
        if (!this.getField().edit)
            return;
        if (e.target instanceof HTMLInputElement)
            this.validate(e.target.value);
        else
            return;
    }

    protected onInput(e: NodeEvent<HTMLElement>) {
        if (!this.getField().edit)
            return;
        if (!(e.target instanceof HTMLInputElement))
            return;
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

    public validate(value: string, silent: boolean = false):boolean {
        let errorMessage = "";
        const field = this.getField();
        if (typeof(value) == "undefined")
            value = this.input ? this.input.value : "";
        let valid = field.required ? value.length > 0 : true;
        if (!valid)
            errorMessage = "Заполните поле";
        if (field.validator && value.length > 0)
            valid = valid && validate(value, field.validator);
        if (!valid && errorMessage === "")
            errorMessage = field.incorrectMessage ?? "Поле заполнено некорректно";
        if (!silent) {
            this.setProps({
                field: Object.assign(field, {
                    value: value,
                    error: valid ? "" : errorMessage,
                }),
            } as IProps);
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
        } as IProps);
    }

    public value(): Record<string, ValueString> {
        const result: Record<string, ValueString> = {};
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
