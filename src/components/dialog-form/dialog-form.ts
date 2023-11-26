import Block from "../../core/Block";
import {Props, NodeEvent, MessageFormData} from "../../types/types";
import template from "./dialog-form.hbs?raw";

interface IProps extends Props {
    onSendMessage?: (messageFormData: MessageFormData) => void,
    onSubmit?: (e: NodeEvent<HTMLElement>) => void,
    message?: string
}

const inputClass = "dialog-form__field";

export default class DialogForm extends Block<IProps> {
    protected modifyProps(props: IProps = {} as IProps): IProps {
        props.events = {
            blur: (e: NodeEvent<HTMLElement>) => this.onBlur(e),
            input: (e: NodeEvent<HTMLElement>) => this.onInput(e),
        };
        const onSubmit = this.submit.bind(this);
        props.onSubmit = (e: NodeEvent<HTMLElement>) => onSubmit(e);
        return props;
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
            message: this.props.message ? this.props.message : ""
        };
        return result;
    }

    public submit(e: NodeEvent<HTMLElement>) {
        if (!this.validate()) {
            e.preventDefault();
            e.stopPropagation();
        }
        else {
            if (typeof(this.props.onSendMessage) == "function") {
                this.props.onSendMessage(this.value() as MessageFormData);
                this.validate("");
            }
        }
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}
