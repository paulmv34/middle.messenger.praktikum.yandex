import avatarUrl from './assets/images/avatar.jpg'
import imageUrl from './assets/images/image.jpg'

const DemoContacts: ContactsListItem[] = [
    {
        current: false,
        avatar: '',
        username: 'Андрей',
        online: false,
        status: '',
        date: '23.08.2023',
        label: '',
        message: `Перезвони мне`,
        count: 2,
        page: 'chat',
    },
    {
        current: false,
        avatar: avatarUrl,
        username: 'Вадим Вадимович Вадимов',
        online: false,
        status: 'read',
        date: '23.08.2023',
        label: 'Вы',
        message: `Стикер`,
        count: 0,
        page: 'chat',
    },
    {
        current: false,
        avatar: '',
        username: 'Иванов Иван Иванович',
        online: true,
        status: 'received',
        date: '23.08.2023',
        label: `Вы`,
        message: `Текст на несколько строк текст на несколько строк текст на несколько строк текст на несколько строк текст на несколько строк`,
        count: 0,
        page: 'chat',
    },
    {
        current: false,
        avatar: '',
        username: 'Антон',
        online: false,
        status: '',
        date: '23.08.2023',
        label: ``,
        message: `Текст на несколько строк текст на несколько строк текст на несколько строк текст на несколько строк текст на несколько строк`,
        count: 99,
        page: 'chat',
    },
    {
        current: false,
        avatar: '',
        username: 'Александр Александрович Александров',
        online: false,
        status: 'read',
        date: '23.08.2023',
        label: `Вы`,
        message: `Текст на несколько строк текст на несколько строк текст на несколько строк текст на несколько строк текст на несколько строк`,
        count: 0,
        page: 'chat',
    },
    {
        current: false,
        avatar: '',
        username: 'Александр Александрович Александров',
        online: false,
        status: '',
        date: '23.08.2023',
        label: ``,
        message: `Текст на несколько строк текст на несколько строк текст на несколько строк текст на несколько строк текст на несколько строк`,
        count: 99,
        page: 'chat',
    },
    {
        current: false,
        avatar: '',
        username: 'Александр Александрович Александров',
        online: false,
        status: 'read',
        date: '23.08.2023',
        label: `Вы`,
        message: `Текст на несколько строк текст на несколько строк текст на несколько строк текст на несколько строк текст на несколько строк`,
        count: 0,
        page: 'chat',
    },
    {
        current: false,
        avatar: '',
        username: 'Александр Александрович Александров',
        online: false,
        status: '',
        date: '23.08.2023',
        label: ``,
        message: `Текст на несколько строк текст на несколько строк текст на несколько строк текст на несколько строк текст на несколько строк`,
        count: 0,
        page: 'chat',
    },
    {
        current: false,
        avatar: '',
        username: 'Александр Александрович Александров',
        online: false,
        status: 'read',
        date: '23.08.2023',
        label: `Вы`,
        message: `Текст на несколько строк текст на несколько строк текст на несколько строк текст на несколько строк текст на несколько строк`,
        count: 0,
        page: 'chat',
    },
    {
        current: false,
        avatar: '',
        username: 'Александр Александрович Александров',
        online: false,
        status: '',
        date: '23.08.2023',
        label: ``,
        message: `Текст на несколько строк текст на несколько строк текст на несколько строк текст на несколько строк текст на несколько строк`,
        count: 0,
        page: 'chat',
    },
    {
        current: false,
        avatar: '',
        username: 'Александр Александрович Александров',
        online: false,
        status: 'read',
        date: '23.08.2023',
        label: `Вы`,
        message: `Текст на несколько строк текст на несколько строк текст на несколько строк текст на несколько строк текст на несколько строк`,
        count: 0,
        page: 'chat',
    },
    {
        current: false,
        avatar: '',
        username: 'Александр Александрович Александров',
        online: false,
        status: '',
        date: '23.08.2023',
        label: ``,
        message: `Текст на несколько строк текст на несколько строк текст на несколько строк текст на несколько строк текст на несколько строк`,
        count: 99,
        page: 'chat',
    },
    {
        current: false,
        avatar: '',
        username: 'Александр Александрович Александров',
        online: false,
        status: 'read',
        date: '23.08.2023',
        label: `Вы`,
        message: `Текст на несколько строк текст на несколько строк текст на несколько строк текст на несколько строк текст на несколько строк`,
        count: 0,
        page: 'chat',
    },
    {
        current: false,
        avatar: '',
        username: 'Александр Александрович Александров',
        online: false,
        status: '',
        date: '23.08.2023',
        label: ``,
        message: `Текст на несколько строк текст на несколько строк текст на несколько строк текст на несколько строк текст на несколько строк`,
        count: 0,
        page: 'chat',
    },
];

const DemoContactsActive: ContactsListItem[] = [];
DemoContacts.forEach(val => DemoContactsActive.push(Object.assign({}, val)));
DemoContactsActive[1].current = true;
DemoContactsActive[1].online = true;

const DemoMessages = [
    {
        date: '25 августа'
    },
    {
        message: {
            owner: true,
            avatar: '',
            username: 'User Name',
            message:  `
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam nec ligula ipsum. Nunc sapien lacus, luctus a tortor id, congue ultricies ligula. Vivamus porttitor elit ut turpis iaculis, eget pretium elit dapibus. Nam pulvinar dignissim posuere. Quisque vitae mi sit amet risus consequat ornare. 
                <br><br>
                Mauris pretium sapien tincidunt neque ornare ullamcorper. Sed a vulputate erat. Ut id turpis tempor, molestie enim sed, mollis dolor. Integer non sagittis lacus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. 
            `,
            image: false,
            status: 'read',
            date: '18:12'
        }
    },
    {
        message: {
            owner: true,
            avatar: '',
            username: 'User Name',
            message: '',
            image:  imageUrl,
            status: 'read',
            date: '18:12'
        }
    },
    {
        date: '26 августа'
    },
    {
        message: {
            owner: false,
            avatar: avatarUrl,
            username: 'User Name',
            message:  `
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam nec ligula ipsum. Nunc sapien lacus, luctus a tortor id, congue ultricies ligula. Vivamus porttitor elit ut turpis iaculis, eget pretium elit dapibus. Nam pulvinar dignissim posuere. Quisque vitae mi sit amet risus consequat ornare. 
                <br><br>
                Mauris pretium sapien tincidunt neque ornare ullamcorper. Sed a vulputate erat. Ut id turpis tempor, molestie enim sed, mollis dolor. Integer non sagittis lacus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. 
            `,
            image: false,
            status: '',
            date: '18:12'
        }
    },
    {
        message: {
            owner: false,
            avatar: avatarUrl,
            username: 'User Name',
            message: '',
            image:  imageUrl,
            status: '',
            date: '18:12'
        }
    },
];

const AuthorizationPageContext = {
    title: 'Вход - Чатограм',
    caption: 'Вход',
    fields: [
        {
            label: 'Логин',
            name: 'login',
            type: 'text',
            placeholder: 'Логин',
            value: '',
            error: '',
        },
        {
            label: 'Пароль',
            name: 'password',
            type: 'password',
            placeholder: 'Пароль',
            value: '',
            error: '',
        }
    ],
    buttons: [
        {
            button: true,
            page: 'empty-chat',
            label: 'Войти',
        },
        {
            page: 'registration',
            label: 'Зарегистрироваться',
        },
    ]
};

const RegistrationPageContext = {
    title: 'Регистрация - Чатограм',
    caption: 'Регистрация',
    fields: [
        {
            label: 'Почта',
            name: 'email',
            type: 'text',
            placeholder: 'Почта',
            value: 'ivanivanov@yandex',
            error: 'Некорректный формат',
        },
        {
            label: 'Логин',
            name: 'login',
            type: 'text',
            placeholder: 'Логин',
            value: '',
            error: '',
        },
        {
            label: 'Имя',
            name: 'first_name',
            type: 'text',
            placeholder: 'Имя',
            value: 'Иван',
            error: '',
        },
        {
            label: 'Фамилия',
            name: 'second_name',
            type: 'text',
            placeholder: 'Фамилия',
            value: 'Иванов',
            error: '',
        },
        {
            label: 'Телефон',
            name: 'phone',
            type: 'text',
            placeholder: 'Телефон',
            value: '',
            error: '',
        },
        {
            label: 'Пароль',
            name: 'password',
            type: 'password',
            placeholder: 'Пароль',
            value: 'неслучайныйпароль',
            error: '',
        },
        {
            label: 'Пароль (еще раз)',
            name: 'passwordRepeat',
            type: 'password',
            placeholder: 'Пароль (еще раз)',
            value: 'неслучайныйпароль',
            error: '',
        }
    ],
    buttons: [
        {
            button: true,
            page: 'empty-chat',
            label: 'Зарегистрироваться',
        },
        {
            page: 'authorization',
            label: 'Войти',
        },
    ]
};

const Error404PageContext = {
    title: 'Ошибка 404 - Чатограм',
    caption: 'Ошибка 404',
    text: 'Страница не существует или была удалена.',
    back: 'empty-chat',
    button: {
        page: 'empty-chat',
        label: 'Назад к чатам',
    }
};

const Error500PageContext = {
    title: 'Ошибка 500 - Чатограм',
    caption: 'Ошибка 500',
    text: 'Произошла ошибка. Скоро исправим.',
    back: 'empty-chat',
    button: {
        page: 'empty-chat',
        label: 'Назад к чатам',
    }
};

const EmptyChatPageContext = {
    title: 'Чатограм',
    contacts: {
        search: '',
        list: DemoContacts,
    },
};

const ChatPageContext = {
    title: 'Вадим Вадимович Вадимов - Чатограм',
    contacts: {
        search: '',
        list: DemoContactsActive,
    },
    dialog: {
        contact: {
            avatar: avatarUrl,
            username: 'Вадим Вадимович Вадимов',
            online: true,
            status: 'онлайн',
        },
        messages: DemoMessages,
    }
};

const ProfilePageContext = {
    title: 'Профиль - Чатограм',
    caption: 'Профиль',
    back: 'empty-chat',
    avatar: {
        username: 'Вадим Вадимович Вадимов',
        src: avatarUrl,
    },
    fields: [
        {
            label: 'Почта',
            name: 'email',
            type: 'text',
            placeholder: 'Почта',
            value: 'ivanivanov@yandex',
            error: '',
        },
        {
            label: 'Логин',
            name: 'login',
            type: 'text',
            placeholder: 'Логин',
            value: 'ivanivanov',
            error: '',
        },
        {
            label: 'Имя в чате',
            name: 'display_name',
            type: 'text',
            placeholder: 'Введите имя в чате',
            value: 'Иван',
            error: '',
        },
        {
            label: 'Имя',
            name: 'first_name',
            type: 'text',
            placeholder: 'Имя',
            value: 'Иван',
            error: '',
        },
        {
            label: 'Фамилия',
            name: 'second_name',
            type: 'text',
            placeholder: 'Фамилия',
            value: 'Иванов',
            error: '',
        },
        {
            label: 'Телефон',
            name: 'phone',
            type: 'text',
            placeholder: 'Телефон',
            value: '+7 (999) 123-45-67',
            error: '',
        },
    ],
    buttons: [
        {
            page: 'profileEdit',
            label: 'Изменить данные',
        },
        {
            page: 'passwordEdit',
            label: 'Изменить пароль',
        },
        {
            color: 'red',
            page: 'authorization',
            label: 'Выйти',
        },
    ]
};

const ProfileEditPageContext = {
    title: 'Профиль - Чатограм',
    caption: 'Профиль',
    back: 'profile',
    fields: [
        {
            label: 'Почта',
            name: 'email',
            type: 'text',
            placeholder: 'Почта',
            value: 'ivanivanov@yandex',
            error: 'Ошибка',
            edit: true,
        },
        {
            label: 'Логин',
            name: 'login',
            type: 'text',
            placeholder: 'Введите логин',
            value: '',
            error: '',
            edit: true,
        },
        {
            label: 'Имя в чате',
            name: 'display_name',
            type: 'text',
            placeholder: 'Введите имя в чате',
            value: 'Иван',
            error: '',
            edit: true,
        },
        {
            label: 'Имя',
            name: 'first_name',
            type: 'text',
            placeholder: 'Введите Имя',
            value: 'Иван',
            error: '',
            edit: true,
        },
        {
            label: 'Фамилия',
            name: 'second_name',
            type: 'text',
            placeholder: 'Введите фамилию',
            value: 'Иванов',
            error: '',
            edit: true,
        },
        {
            label: 'Телефон',
            name: 'phone',
            type: 'text',
            placeholder: 'Введите телефон',
            value: '+7 (999) 123-45-67',
            error: '',
            edit: true,
        },
    ],
    buttons: [
        {
            button: true,
            page: 'profile',
            label: 'Сохранить',
        },
    ]
};

const PasswordEditPageContext = {
    title: 'Изменить пароль - Чатограм',
    caption: 'Изменить пароль',
    back: 'profile',
    fields: [
        {
            label: 'Старый пароль',
            name: 'oldPassword',
            type: 'password',
            placeholder: 'Введите старый пароль',
            value: '',
            error: '',
            edit: true,
        },
        {
            label: 'Новый пароль',
            name: 'newPassword',
            type: 'password',
            placeholder: 'Введите новый пароль',
            value: '',
            error: '',
            edit: true,
        },
        {
            label: 'Новый пароль (Еще раз)',
            name: 'newPasswordRepeat',
            type: 'password',
            placeholder: 'Повторите новый пароль',
            value: '',
            error: '',
            edit: true,
        },
    ],
    buttons: [
        {
            button: true,
            page: 'profile',
            label: 'Сохранить',
        },
    ]
};

export {AuthorizationPageContext, RegistrationPageContext, Error404PageContext, Error500PageContext, EmptyChatPageContext, ChatPageContext, ProfilePageContext, ProfileEditPageContext, PasswordEditPageContext}
