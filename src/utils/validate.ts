enum validators {
    login = (value) => value.match(/^[A-Za-z]([A-Za-z\d_-]){3,20}$/gi),
    password = (value) => value.match(/^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,40}$/g),
    email = (value) => value.match(/([a-zA-Z\d._-]+@[a-zA-Z\d._-]+\.[a-zA-Z\d_-]+)/gi),
    phone = (value) => value.match(/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{10,15}$/gi),
    name = (value) => value.match(/^[A-ZА-Я-][a-zа-я-]+/g),
}

function validateFieldValue(value, type) {
    if (type in validators) {
        return validators[type](value);
    }
}

export {validateFieldValue};