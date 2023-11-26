import Block from "../../core/Block";
import {Props, Chat} from "../../types/types";
import template from "./contacts-item.hbs?raw";
import {appRouter} from "../../core/Router";

interface IProps extends Chat, Props { }

export default class ContactsItem extends Block<IProps> {
    protected modifyProps(props: IProps = {} as IProps): IProps {
        const onClick = this.click.bind(this);
        props.events = {
            click: onClick
        };
        return props;
    }

    public click() {
        const chatId = this.getElement()?.dataset.chatId;
        if (chatId)
            appRouter.go(`/messenger/${chatId}/`);
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}
