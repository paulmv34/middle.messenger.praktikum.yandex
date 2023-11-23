import Block from "../../core/Block";
import template from "./profile-edit.hbs?raw";
import {ProfileEditPageContext} from "../../main.data";
import {IField, IButton, NodeEvent, Props, User, ValueString} from "../../types/types";
import {connect} from "../../utils/connect";
import {editProfile} from "../../services/user";
import {ChangeProfile} from "../../api/type";
import {cloneDeep} from "../../utils/cloneDeep";
import {isAuthError} from "../../core/processHTTPError";
import {authLost} from "../../core/authLost";

interface IProps extends Props {
    title?: string,
    caption?: string,
    errorText?: string,
    emailField?: IField<ValueString>,
    loginField?: IField<ValueString>,
    displayNameField?: IField<ValueString>,
    nameField?: IField<ValueString>,
    secondNameField?: IField<ValueString>,
    phoneField?: IField<ValueString>,
    submitButton?: IButton,
    user?: User,
    onSubmit?: (e: NodeEvent<HTMLButtonElement>) => void
}

class ProfileEditPage extends Block<IProps> {
    static authRequired = "yes";

    constructor(props: IProps = {}) {
        super(Object.assign(props, cloneDeep(ProfileEditPageContext)));
    }

    protected modifyProps(props: IProps = {} as IProps): IProps {
        const onSubmit = this.submit.bind(this);
        props.onSubmit = (e: NodeEvent<HTMLButtonElement>) => onSubmit(e);
        return props;
    }

    public submit(e: NodeEvent<HTMLButtonElement>) {
        e.preventDefault();
        e.stopPropagation();
        if (!this.validate()) {
            this.props.errorText = "Форма заполнена с ошибками";
        }
        else {
            let errorText = "";
            let hasAuthError = false;
            editProfile(this.value() as ChangeProfile).catch(error => {
                hasAuthError = isAuthError(error);
                errorText = error;
            }).finally(() => {
                this.props.errorText = errorText;
                if (hasAuthError)
                    authLost();
            });
        }
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}

export default connect(({user}) => ({user}))(ProfileEditPage);