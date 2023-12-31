## Описание

Проект чата 1 модуля курса Яндекс.Практикум. 

## Спринт №3.
- Добавлено контекстное меню: основное (кнопка "гамбурер" в шапке списка чатов) и меню чата (кнопка "три точки" при выборе чата в шапке чата).
- Добавлены модальные окна: изменение аватара пользователя, изменение аватара чата, добавление пользователя в чат, удаление пользователя из чата, создание чата, удаление чата, отправка файла в чат.
- Реализован роутинг. В базовую версию с практики добавлены события onRoute, onLeave. Добавлена возможность использования регулярных выражений для получения данных с url (например, при навигации на страницу чата в событии onRoute получается id чата и подставляются данные активного чата). При помощи события onRoute можно вывести страницу ошибки.
- Использован HTTP API чатов. Создание чата, изменение аватара, добавление и удаление пользователя, удаление чата.
- Использован WebSocket API для работы с real-time сообщениями. Отправка сообщения. Получение сообщения. Получение старых сообщений при прокрутке.
- Добавлена упрощенная темная версия (ее нет в макете, для личного удобства, т.к. использую темную тему).
- Убран лишний рендеринг при инициализации или при изменении свойств.

## Спринт №4.
- Добавлены юнит-тесты: роутер, компонент, модуль отправки запросов.
- Настроен precommit
- Проведен аудит пакетов
- Добавлена проверка кода во время сборки (TypeScript, ESlint, Stylelint)

## Страницы и функционал
- При получении новых сообщений позиция списка сообщений может прыгать (недостаточно отлажен алгоритм сохранения текущей прокрутки)
- Мобильная версия не доработана.
- Не реализована работа с прочитанными сообщениями в режиме реального времени. Сообщения будут отмечены прочитанными после обновления страницы чата, так же как и счетчик прочитанных.
- Не реализовано обновление списка чатов (если пользователь добавлен в новый чат или аватар чата был изменен другим пользователем).
- Список чатов загружается в упрощенном формате (99 чатов).
- Информация о пользователях в чате получается в упрощенном формате (при получении чата запрашивается инфа о 99 пользователях для отображения логина и аватара в сообщениях, соответственно при добавлении нового пользователя в чат инфа подтянется только после повторного открытия чата с ним, инфа об удаленных пользователях не подгружается)
- Ситуация, что создатель чата потерял роль админа, не проверяется - будет выведена кнопка удалить чат, нажатие на которую приведет к ошибке
- Отправка сообщений только по нажатию на кнопку "отправить"

## Технологии
- Vite
- TypeScript
- Express
- SCSS
- Handlebars
- ESLint
- StyleLint

## Установка и проверка

- `npm i` — установка
- `npm run dev` — запуск версии для разработчика без сборки
- `npm run start` — запуск версии для разработчика со сборкой
- `npm run build` — сборка проекта
- `npm run eslint` — запуск линтера ESLint
- `npm run stylelint` — запуск линтера stylelint
- `npm run prepare` — прекоммит хуки
- `npm run test` — запуск unit тестов

## Стенд

https://shimmering-tanuki-f14bd9.netlify.app/

## Макет

https://www.figma.com/file/yJlPzsDpVxUrkQxCSwfqaf/Messenger?type=design&node-id=18-1068&mode=design

#### 1. Вход. Стартовая страница. 
Требуется авторизация под существующим пользователем или регистрация нового пользователя.
На стартовую страницу можно вернуться со страницы "Профиль", нажав на кнопку "Выход", либо из контекстного меню в шапке списка чатов.

#### 2. Регистрация. 
Переход по кнопке "Зарегистрироваться" со страницы "Вход".

#### 3. Мессенджер. 
Переход по кнопке "Войти" со страницы "Вход" или по кнопке "Зарегистрироваться" со страницы "Регистрация" (после успешной регистрации).

#### 4. Чат.
Переход при клике по любому из чатов.

#### 5. Ошибка 404.
Ввести несуществующий адрес (чат, страница, другое)

#### 6. Ошибка 500. 
Проверяется ответ сервера - в случае получения статуса 500 будет выведена данная страница.

#### 7. Профиль. 
Переход по клику на кнопку "Профиль" из контекстного меню в шапке списка чатов.

#### 8. Редактирование профиля. 
Переход по клику на кнопку "Изменить данные" со страницы "Профиль".
В полях имя и фамилия допустимы двойные имена (через дефис). 
Имя, написанное и кириллицей, и латиницей, будет считаться некорректным.

#### 9. Изменение пароля. 
Переход по клику на кнопку "Изменить пароль" со страницы "Профиль".

#### 10. Модальное окно "Создать чат".
Доступно в основном контекстном меню по нажатию на кнопку "Создать чат".

#### 11. Модальное окно "Удалить чат".
Доступно только создателю чата в контекстном меню чата по нажатию на кнопку "Удалить чат".

#### 12. Модальное окно "Добавить пользователя в чат". 
Доступно в контекстном меню чата по нажатию на кнопку "Добавить пользователя". Выполняется поиск существующих пользователей по введенному логину.

#### 13. Модальное окно "Удалить пользователя из чата".
Доступно в контекстном меню чата по нажатию на кнопку "Удалить пользователя". Выполняется поиск среди пользователей чата по веденному логину.

#### 14. Модальное окно "Изменить аватар пользователя".
Доступно со страницы профиля по нажатию на изображение аватара.

#### 15. Модальное окно "Изменить аватар чата".
Доступно в контекстном меню чата по нажатию на кнопку "Изменить аватар".

#### 16. Модальное окно "Отправить файл".
Доступно в контекстном меню формы отправки сообщения по нажатию на иконку вложения.
