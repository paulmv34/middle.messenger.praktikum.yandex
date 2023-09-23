import Block from "../../core/Block";
import template from "./dialog-form.hbs?raw";

interface IProps extends IDialogForm {}

export default class DialogForm extends Block {
    protected baseInputClass: string = "dialog-form__message-field";
    protected input: HTMLInputElement | null = null;

    constructor(props: IProps) {
        super(props);
        this.props.events = {
            blur: (e) => this.onBlur(e),
            input: (e) => this.onInput(e),
        };
        const onSubmit = this.submit.bind(this);
        this.props.onSubmit = (e) => onSubmit(e);
    }

    protected onBlur(e: NodeEvent<HTMLFormElement>) {
        this.validate(e.target.value);
    }

    protected onInput(e: NodeEvent<HTMLFormElement>) {
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

    public validate(value: string = undefined):boolean {
        let errorMessage = "";
        if (typeof(value) == "undefined")
            value = this.input ? this.input.value : "";
        const valid = value.length > 0;
        if (!valid) {
            errorMessage = "Нет данных для отправки";
            console.log(errorMessage);
        }
        this.props.message = value;
        return valid;
    }

    public value(): Record<string, string> {
        const result = {};
        result["message"] = this.props.message;
        return result;
    }

    public submit(e) {
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
