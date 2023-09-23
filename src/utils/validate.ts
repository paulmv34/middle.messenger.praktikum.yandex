enum validators {
    login = (value) => value.match(/^(?=.*[A-Za-z_-])([A-Za-z\d_-]){3,20}$/gi),
    password = (value) => value.match(/^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,40}$/g),
    email = (value) => value.match(/^([a-zA-Z\d._-]+@[a-zA-Z\d._-]+\.[a-zA-Z\d_-]+)$/gi),
    phone = (value) => value.match(/^\+?\d{10,15}$/gi),
    name = (value) => value.match(/^([A-Z][a-z]{1,20}(?:-[A-Z][a-z]{1,20})?|[А-Я][а-я]{1,20}(?:-[А-Я][а-я]{1,20})?)$/g),
}

function validateFieldValue(value, type) {
    if (type in validators) {
        return validators[type](value);
    }
}

export {validateFieldValue};