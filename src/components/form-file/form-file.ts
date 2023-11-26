import Block from "../../core/Block";
import template from "./form-file.hbs?raw";
import {validate} from "../../utils/validate";
import {Props, IField, NodeEvent, ValueFile} from "../../types/types";

interface IProps extends Props {
    field: IField<ValueFile>,
    value: ValueFile,
}

const inputClass= "form-file__input";
let fileValue: string | File = "";

export default class FormFile extends Block<IProps> {
    protected modifyProps(props: IProps = {} as IProps): IProps {
        const resetValue = this.resetValue.bind(this);
        props.resetValue = () => resetValue();
        props.events = {
            click: (e: NodeEvent<HTMLElement>) => this.onClick(e),
            input: (e: NodeEvent<HTMLElement>) => this.onInput(e),
        };
        return props;
    }

    protected getField(): IField<ValueFile> {
        return this.props.field as IField<ValueFile>;
    }

    protected onClick(e: NodeEvent<HTMLElement>) {
        if (e.target instanceof HTMLInputElement)
            e.target.value = "";
    }

    protected onInput(e: NodeEvent<HTMLElement>) {
        if (!(e.target instanceof HTMLInputElement))
            return;
        const field = e.target;
        fileValue = this.input && this.input.files instanceof FileList && this.input.files[0] ? this.input.files[0] : "";
        this.validate();
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

    public validate(value: string | File | undefined = undefined, silent: boolean = false):boolean {
        let errorMessage = "";
        const field = this.getField();
        if (typeof(value) == "undefined") {
            value = fileValue;
        }
        let valid = field.required ? !!value : true;
        if (!valid)
            errorMessage = "Заполните поле";
        if (valid && value instanceof File && field.validator)
            valid = valid && validate(value, field.validator);
        if (!valid && errorMessage === "")
            errorMessage = field.incorrectMessage ?? "Поле заполнено некорректно";
        if (!silent) {
            this.setProps({
                field: Object.assign(field, {
                    error: valid ? "" : errorMessage,
                    fileName: value instanceof File ? value.name : "",
                    value: value,
                }),
                value: value,
            });
        }
        return valid;
    }

    public resetValue() {
        fileValue = "";
        const field = this.getField();
        this.setProps({
            field: Object.assign(field, {
                error: "",
                fileName: "",
                value: fileValue,
            }),
            value: fileValue,
        });
    }

    public value(): Record<string, ValueFile> {
        const result: Record<string, ValueFile> = {};
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
        const result = this.compile(template, this.props);
        return result;
    }
}
