import Block from "../../core/Block";
import { BlockProps, IDialogForm, NodeEvent } from "../../types/main.types";
import template from "./dialog-form.hbs?raw";

interface IProps extends IDialogForm, BlockProps {}

const inputClass = "dialog-form__message-field";

export default class DialogForm extends Block {
    constructor(props: IProps) {
        super(props);
        this.props.events = {
            blur: (e: NodeEvent<HTMLFormElement>) => this.onBlur(e),
            input: (e: NodeEvent<HTMLFormElement>) => this.onInput(e),
        };
        const onSubmit = this.submit.bind(this);
        this.props.onSubmit = (e: NodeEvent<HTMLButtonElement>) => onSubmit(e);
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

    public validate(value: string | undefined = undefined):boolean {
        if (typeof(value) == "undefined")
            value = this.input ? this.input.value : "";
        const valid = value.length > 0;
        this.props.message = value;
        return valid;
    }

    public value(): Record<string, string> {
        const result = {
            message: ""
        };
        if (typeof (this.props.message) == "string") {
            result.message = this.props.message;
        }
        return result;
    }

    public submit(e: NodeEvent<HTMLButtonElement>) {
        console.log("Событие отправки формы");
        if (!this.validate()) {
            console.log("Форма заполнена с ошибками");
            e.preventDefault();
            e.stopPropagation();
        }
        else {
            console.log("Ошибок нет, сообщение можно отправить");
        }
        console.log(this.value());
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}
