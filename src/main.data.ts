import avatarUrl from "./assets/images/avatar.jpg";
import imageUrl from "./assets/images/image.jpg";
import { IContactsListItem, IDialogMessage } from "./types/main.types";

const DemoContacts: IContactsListItem[] = [
    {
        current: false,
        avatar: "",
        username: "Андрей",
        online: false,
        status: "",
        date: 1693062724,
        label: "",
        message: "Перезвони мне",
        count: 2,
        page: "chat",
    },
    {
        current: false,
        avatar: avatarUrl,
        username: "Вадим Вадимович Вадимов",
        online: false,
        status: "read",
        date: 1693062724,
        label: "Вы",
        message: "Стикер",
        count: 0,
        page: "chat",
    },
    {
        current: false,
        avatar: "",
        username: "Иванов Иван Иванович",
        online: true,
        status: "received",
        date: 1693062724,
        label: "Вы",
        message: "Текст на несколько строк текст на несколько строк текст на несколько строк текст на несколько строк текст на несколько строк",
        count: 0,
        page: "chat",
    },
    {
        current: false,
        avatar: "",
        username: "Антон",
        online: false,
        status: "",
        date: 1693062724,
        label: "",
        message: "Текст на несколько строк текст на несколько строк текст на несколько строк текст на несколько строк текст на несколько строк",
        count: 99,
        page: "chat",
    },
    {
        current: false,
        avatar: "",
        username: "Александр Александрович Александров",
        online: false,
        status: "read",
        date: 1693062724,
        label: "Вы",
        message: "Текст на несколько строк текст на несколько строк текст на несколько строк текст на несколько строк текст на несколько строк",
        count: 0,
        page: "chat",
    },
    {
        current: false,
        avatar: "",
        username: "Александр Александрович Александров",
        online: false,
        status: "",
        date: 1693062724,
        label: "",
        message: "Текст на несколько строк текст на несколько строк текст на несколько строк текст на несколько строк текст на несколько строк",
        count: 99,
        page: "chat",
    },
    {
        current: false,
        avatar: "",
        username: "Александр Александрович Александров",
        online: false,
        status: "read",
        date: 1693062724,
        label: "Вы",
        message: "Текст на несколько строк текст на несколько строк текст на несколько строк текст на несколько строк текст на несколько строк",
        count: 0,
        page: "chat",
    },
    {
        current: false,
        avatar: "",
        username: "Александр Александрович Александров",
        online: false,
        status: "",
        date: 1693062724,
        label: "",
        message: "Текст на несколько строк текст на несколько строк текст на несколько строк текст на несколько строк текст на несколько строк",
        count: 0,
        page: "chat",
    },
    {
        current: false,
        avatar: "",
        username: "Александр Александрович Александров",
        online: false,
        status: "read",
        date: 1693062724,
        label: "Вы",
        message: "Текст на несколько строк текст на несколько строк текст на несколько строк текст на несколько строк текст на несколько строк",
        count: 0,
        page: "chat",
    },
    {
        current: false,
        avatar: "",
        username: "Александр Александрович Александров",
        online: false,
        status: "",
        date: 1693062724,
        label: "",
        message: "Текст на несколько строк текст на несколько строк текст на несколько строк текст на несколько строк текст на несколько строк",
        count: 0,
        page: "chat",
    },
    {
        current: false,
        avatar: "",
        username: "Александр Александрович Александров",
        online: false,
        status: "read",
        date: 1693062724,
        label: "Вы",
        message: "Текст на несколько строк текст на несколько строк текст на несколько строк текст на несколько строк текст на несколько строк",
        count: 0,
        page: "chat",
    },
    {
        current: false,
        avatar: "",
        username: "Александр Александрович Александров",
        online: false,
        status: "",
        date: 1693062724,
        label: "",
        message: "Текст на несколько строк текст на несколько строк текст на несколько строк текст на несколько строк текст на несколько строк",
        count: 99,
        page: "chat",
    },
    {
        current: false,
        avatar: "",
        username: "Александр Александрович Александров",
        online: false,
        status: "read",
        date: 1693062724,
        label: "Вы",
        message: "Текст на несколько строк текст на несколько строк текст на несколько строк текст на несколько строк текст на несколько строк",
        count: 0,
        page: "chat",
    },
    {
        current: false,
        avatar: "",
        username: "Александр Александрович Александров",
        online: false,
        status: "",
        date: 1693062724,
        label: "",
        message: "Текст на несколько строк текст на несколько строк текст на несколько строк текст на несколько строк текст на несколько строк",
        count: 0,
        page: "chat",
    },
];

const DemoContactsActive: IContactsListItem[] = [];
DemoContacts.forEach(val => DemoContactsActive.push(Object.assign({}, val)));
DemoContactsActive[1].current = true;
DemoContactsActive[1].online = true;

const DemoMessages: IDialogMessage[] = [
    {
        owner: true,
        avatar: "",
        username: "User Name",
        message: `
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam nec ligula ipsum. Nunc sapien lacus, luctus a tortor id, congue ultricies ligula. Vivamus porttitor elit ut turpis iaculis, eget pretium elit dapibus. Nam pulvinar dignissim posuere. Quisque vitae mi sit amet risus consequat ornare. 
            <br><br>
            Mauris pretium sapien tincidunt neque ornare ullamcorper. Sed a vulputate erat. Ut id turpis tempor, molestie enim sed, mollis dolor. Integer non sagittis lacus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. 
        `,
        image: "",
        status: "read",
        date: 1692976324,
        showDateLabel: true,
    },
    {
        owner: true,
        avatar: "",
        username: "User Name",
        message: "",
        image: imageUrl,
        status: "read",
        date: 1692976324,
        showDateLabel: false,
    },
    {
        owner: false,
        avatar: avatarUrl,
        username: "User Name",
        message: `
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam nec ligula ipsum. Nunc sapien lacus, luctus a tortor id, congue ultricies ligula. Vivamus porttitor elit ut turpis iaculis, eget pretium elit dapibus. Nam pulvinar dignissim posuere. Quisque vitae mi sit amet risus consequat ornare. 
            <br><br>
            Mauris pretium sapien tincidunt neque ornare ullamcorper. Sed a vulputate erat. Ut id turpis tempor, molestie enim sed, mollis dolor. Integer non sagittis lacus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. 
        `,
        image: "",
        status: "read",
        date: 1693062724,
        showDateLabel: true,
    },
    {
        owner: false,
        avatar: avatarUrl,
        username: "User Name",
        message: "",
        image: imageUrl,
        status: "read",
        date: 1693062724,
        showDateLabel: false,
    },
];



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
        value: "Иван",
        error: "",
        validator: "name", // Правила валидации в требованиях не указаны
        required: true,
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
    loginField: loginField(),
    passwordField: passwordField(),
    submitButton: {
        name: "submit",
        page: "empty-chat",
        label: "Войти",
    },
    linkButton: {
        name: "register",
        page: "registration",
        label: "Зарегистрироваться",
    },
};

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
        page: "empty-chat",
        label: "Зарегистрироваться",
    },
    linkButton: {
        name: "submit",
        page: "authorization",
        label: "Войти",
    },
};

const Error404PageContext = {
    title: "Ошибка 404 - Чатограм",
    caption: "Ошибка 404",
    text: "Страница не существует или была удалена.",
    back: "empty-chat",
    button: {
        page: "empty-chat",
        label: "Назад к чатам",
    }
};

const Error500PageContext = {
    title: "Ошибка 500 - Чатограм",
    caption: "Ошибка 500",
    text: "Произошла ошибка. Скоро исправим.",
    back: "empty-chat",
    button: {
        page: "empty-chat",
        label: "Назад к чатам",
    }
};

const EmptyChatPageContext = {
    title: "Чатограм",
    contacts: {
        search: "",
        list: DemoContacts,
    },
};

const ChatPageContext = {
    title: "Вадим Вадимович Вадимов - Чатограм",
    contacts: {
        search: "",
        list: DemoContactsActive,
    },
    dialog: {
        contact: {
            avatar: avatarUrl,
            username: "Вадим Вадимович Вадимов",
            online: true,
            status: "онлайн",
        },
        messages: DemoMessages,
        form: {
            message: ""
        }
    }
};

const ProfilePageContext = {
    title: "Профиль - Чатограм",
    caption: "Профиль",
    back: "empty-chat",
    avatar: {
        username: "Вадим Вадимович Вадимов",
        src: avatarUrl,
    },
    emailField: emailField({edit: false, value: "test@mail.ru"}),
    loginField: loginField({edit: false, value: "TestLogin"}),
    displayNameField: displayNameField({edit: false, value: "Тестовое"}),
    nameField: nameField({edit: false, value: "Иван"}),
    secondNameField: secondNameField({edit: false, value: "Иванов-Сидоров"}),
    phoneField: phoneField({edit: false, value: "+7 (960) 123-34-56"}),
    editProfileButton: {
        page: "profileEdit",
        label: "Изменить данные",
    },
    editPasswordButton: {
        page: "passwordEdit",
        label: "Изменить пароль",
    },
    logoutButton: {
        name: "logout",
        color: "red",
        page: "authorization",
        label: "Выйти",
    },
};

const ProfileEditPageContext = {
    title: "Профиль - Чатограм",
    caption: "Профиль",
    errorText: "",
    back: "profile",
    emailField: emailField({edit: true, value: "test@mail.ru"}),
    loginField: loginField({edit: true, value: "TestLogin"}),
    displayNameField: displayNameField({edit: true, value: "Тестовое"}),
    nameField: nameField({edit: true, value: "Иван"}),
    secondNameField: secondNameField({edit: true, value: "Иванов-Сидоров"}),
    phoneField: phoneField({edit: true, value: "+79601233456"}),
    submitButton: {
        name: "submit",
        page: "profile",
        label: "Сохранить",
    },
};

const PasswordEditPageContext = {
    title: "Изменить пароль - Чатограм",
    caption: "Изменить пароль",
    errorText: "",
    back: "profile",
    oldPasswordField: oldPasswordField(),
    newPasswordField: newPasswordField(),
    newPasswordRepeatField: newPasswordRepeatField(),
    submitButton: {
        name: "submit",
        page: "profile",
        label: "Сохранить",
    },
};

export {
    AuthorizationPageContext,
    RegistrationPageContext,
    Error404PageContext,
    Error500PageContext,
    EmptyChatPageContext,
    ChatPageContext,
    ProfilePageContext,
    ProfileEditPageContext,
    PasswordEditPageContext
};
