import {Props} from "./types/types";

const avatarField = (fieldData: Record<string, string | boolean> = {}) => {
    const defaultField = {
        label: "Аватар",
        name: "avatar",
        type: "file",
        placeholder: "Выберите файл",
        value: "",
        error: "",
        validator: "image",
        required: true,
        edit: true,
        id: "avatar-file-field",
    };
    return Object.assign(defaultField, fieldData);
};

const loginField = (fieldData: Record<string, string | boolean> = {}) => {
    const defaultField = {
        label: "Логин",
        name: "login",
        type: "text",
        placeholder: "Логин",
        value: "",
        error: "",
        validator: "login",
        required: true,
        edit: true,
    };
    return Object.assign(defaultField, fieldData);
};

const displayNameField = (fieldData: Record<string, string | boolean> = {}) => {
    const defaultField = {
        label: "Имя в чате",
        name: "display_name",
        type: "text",
        placeholder: "Введите имя в чате",
        value: "",
        error: "",
        validator: "name",
        required: false,
        edit: true,
    };
    return Object.assign(defaultField, fieldData);
};

const oldPasswordField = (fieldData: Record<string, string | boolean> = {}) => {
    const defaultField = {
        label: "Старый пароль",
        name: "oldPassword",
        type: "password",
        placeholder: "Введите старый пароль",
        value: "",
        error: "",
        validator: "password",
        required: true,
        edit: true,
    };
    return Object.assign(defaultField, fieldData);
};

const passwordField = (fieldData: Record<string, string | boolean> = {}) => {
    const defaultField = {
        label: "Пароль",
        name: "password",
        type: "password",
        placeholder: "Пароль",
        value: "",
        error: "",
        validator: "password",
        required: true,
        edit: true,
    };
    return Object.assign(defaultField, fieldData);
};

const newPasswordField = (fieldData: Record<string, string | boolean> = {}) => {
    const defaultField = {
        label: "Новый пароль",
        name: "newPassword",
        type: "password",
        placeholder: "Введите новый пароль",
        value: "",
        error: "",
        validator: "password",
        required: true,
        edit: true,
    };
    return Object.assign(defaultField, fieldData);
};

const passwordRepeatField = (fieldData: Record<string, string | boolean> = {}) => {
    const defaultField = {
        label: "Пароль (Еще раз)",
        name: "passwordRepeat",
        type: "password",
        placeholder: "Повторите пароль",
        value: "",
        error: "",
        validator: "password",
        required: true,
        edit: true,
    };
    return Object.assign(defaultField, fieldData);
};

const newPasswordRepeatField = (fieldData: Record<string, string | boolean> = {}) => {
    const defaultField = {
        label: "Новый пароль (Еще раз)",
        name: "newPasswordRepeat",
        type: "password",
        placeholder: "Повторите новый пароль",
        value: "",
        error: "",
        validator: "password",
        required: true,
        edit: true,
    };
    return Object.assign(defaultField, fieldData);
};

const emailField = (fieldData: Record<string, string | boolean> = {}) => {
    const defaultField = {
        label: "Почта",
        name: "email",
        type: "text",
        placeholder: "Почта",
        value: "",
        error: "",
        validator: "email",
        required: true,
        edit: true,
    };
    return Object.assign(defaultField, fieldData);
};

const chatNameField = (fieldData: Record<string, string | boolean> = {}) => {
    const defaultField = {
        label: "Название чата",
        name: "title",
        type: "text",
        placeholder: "Название чата",
        value: "",
        error: "",
        validator: "chatName",
        required: true,
        edit: true,
    };
    return Object.assign(defaultField, fieldData);
};

const nameField = (fieldData: Record<string, string | boolean> = {}) => {
    const defaultField = {
        label: "Имя",
        name: "first_name",
        type: "text",
        placeholder: "Имя",
        value: "",
        error: "",
        validator: "name",
        required: true,
        edit: true,
    };
    return Object.assign(defaultField, fieldData);
};

const secondNameField = (fieldData: Record<string, string | boolean> = {}) => {
    const defaultField = {
        label: "Фамилия",
        name: "second_name",
        type: "text",
        placeholder: "Фамилия",
        value: "",
        error: "",
        validator: "name",
        required: true,
        edit: true,
    };
    return Object.assign(defaultField, fieldData);
};

const phoneField = (fieldData: Record<string, string | boolean> = {}) => {
    const defaultField = {
        label: "Телефон",
        name: "phone",
        type: "text",
        placeholder: "Телефон",
        value: "",
        error: "",
        validator: "phone",
        required: true,
        edit: true,
    };
    return Object.assign(defaultField, fieldData);
};

const AuthorizationPageContext = {
    title: "Вход - Чатограм",
    caption: "Вход",
    errorText: "",
    loginField: loginField({value: "ds34@ya.ru"}),
    passwordField: passwordField({value: "ds341@ya.ru"}),
    submitButton: {
        name: "submit",
        page: "/messenger/",
        label: "Войти",
    },
    linkButton: {
        name: "register",
        page: "/sign-up/",
        label: "Зарегистрироваться",
    },
} as Props;

const ModalUserAvatarContext = {
    caption: "Изменить аватар пользователя",
    errorText: "",
    avatarField: avatarField({id: "userAvatar"}),
    submitButton: {
        name: "submit",
        label: "Отправить",
    },
} as Props;

const ModalSendFileContext = {
    caption: "Отправить файл",
    errorText: "",
    avatarField: avatarField(),
    submitButton: {
        name: "submit",
        label: "Отправить",
    },
} as Props;

const ModalChatAvatarContext = {
    caption: "Изменить аватар чата",
    errorText: "",
    avatarField: avatarField({id: "chatAvatar"}),
    submitButton: {
        name: "submit",
        label: "Отправить",
    },
} as Props;

const ModalCreateChatContext = {
    caption: "Создать чат",
    errorText: "",
    chatName: chatNameField(),
    submitButton: {
        name: "submit",
        label: "Отправить",
    },
} as Props;

const ModalAddUserFormContext = {
    caption: "Добавить пользователя в чат",
    errorText: "",
    loginField: loginField(),
    submitButton: {
        name: "submit",
        label: "Отправить",
    },
} as Props;

const ModalRemoveUserFormContext = {
    caption: "Удалить пользователя из чата",
    errorText: "",
    loginField: loginField(),
    submitButton: {
        name: "submit",
        label: "Отправить",
    },
} as Props;

const ModalDeleteChatFormContext = {
    caption: "Вы действительно хотите удалить чат?",
    errorText: "",
    submitButton: {
        name: "submit",
        label: "Удалить чат",
    },
} as Props;

const RegistrationPageContext = {
    title: "Регистрация - Чатограм",
    caption: "Регистрация",
    errorText: "",
    emailField: emailField(),
    loginField: loginField(),
    nameField: nameField(),
    secondNameField: secondNameField(),
    phoneField: phoneField(),
    passwordField: passwordField(),
    passwordRepeatField: passwordRepeatField(),
    submitButton: {
        name: "submit",
        page: "/messenger/",
        label: "Зарегистрироваться",
    },
    linkButton: {
        name: "submit",
        page: "/",
        label: "Войти",
    },
} as Props;

const Error404Context = {
    title: "Ошибка 404 - Чатограм",
    caption: "Ошибка 404",
    text: "Страница не существует или была удалена.",
    back: "/",
    label: "Назад к авторизации",
} as Props;

const Error404AuthorizedContext = {
    title: "Ошибка 404 - Чатограм",
    caption: "Ошибка 404",
    text: "Страница не существует или была удалена.",
    back: "/messenger/",
    label: "Назад к чатам",
} as Props;

const Error500Context = {
    title: "Ошибка 500 - Чатограм",
    caption: "Ошибка 500",
    text: "Произошла ошибка. Скоро исправим.",
    back: "/",
    label: "Назад к авторизации",
} as Props;

const Error500AuthorizedContext = {
    title: "Ошибка 500 - Чатограм",
    caption: "Ошибка 500",
    text: "Произошла ошибка. Скоро исправим.",
    back: "/messenger/",
    label: "Назад к чатам",
} as Props;

const ProfilePageContext = {
    title: "Профиль - Чатограм",
    caption: "Профиль",
    back: "/messenger/",
    avatar: {
        username: "Вадим Вадимович Вадимов",
        src: "",
    },
    emailField: emailField({edit: false}),
    loginField: loginField({edit: false}),
    displayNameField: displayNameField({edit: false}),
    nameField: nameField({edit: false}),
    secondNameField: secondNameField({edit: false}),
    phoneField: phoneField({edit: false}),
    editProfileButton: {
        page: "/settings/edit/",
        label: "Изменить данные",
    },
    editPasswordButton: {
        page: "/settings/password/",
        label: "Изменить пароль",
    },
    logoutButton: {
        name: "logout",
        color: "red",
        page: "/",
        label: "Выйти",
    },
} as Props;

const ProfileEditPageContext = {
    title: "Профиль - Чатограм",
    caption: "Профиль",
    errorText: "",
    back: "/settings/",
    emailField: emailField({edit: true}),
    loginField: loginField({edit: true}),
    displayNameField: displayNameField({edit: true}),
    nameField: nameField({edit: true}),
    secondNameField: secondNameField({edit: true}),
    phoneField: phoneField({edit: true}),
    submitButton: {
        name: "submit",
        page: "/settings/",
        label: "Сохранить",
    },
} as Props;

const PasswordEditPageContext = {
    title: "Изменить пароль - Чатограм",
    caption: "Изменить пароль",
    errorText: "",
    back: "/settings/",
    oldPasswordField: oldPasswordField(),
    newPasswordField: newPasswordField(),
    newPasswordRepeatField: newPasswordRepeatField(),
    submitButton: {
        name: "submit",
        page: "/settings/",
        label: "Сохранить",
    },
} as Props;

export {
    ModalSendFileContext,
    ModalUserAvatarContext,
    ModalCreateChatContext,
    ModalDeleteChatFormContext,
    ModalChatAvatarContext,
    ModalAddUserFormContext,
    ModalRemoveUserFormContext,
    AuthorizationPageContext,
    RegistrationPageContext,
    Error404Context,
    Error404AuthorizedContext,
    Error500Context,
    Error500AuthorizedContext,
    ProfilePageContext,
    ProfileEditPageContext,
    PasswordEditPageContext
};
