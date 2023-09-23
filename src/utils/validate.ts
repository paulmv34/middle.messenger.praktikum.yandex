export type validatorTypes = "login" | "password" | "email" | "phone" | "name";

const validators = {
    login: (value: string): boolean => /^(?=.*[A-Za-z_-])([A-Za-z\d_-]){3,20}$/gi.test(value),
    password: (value: string): boolean => /^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,40}$/g.test(value),
    email: (value: string): boolean => /^([a-zA-Z\d._-]+@[a-zA-Z\d._-]+\.[a-zA-Z\d_-]+)$/gi.test(value),
    phone: (value: string): boolean => /^\+?\d{10,15}$/gi.test(value),
    name: (value: string): boolean => /^([A-Z][a-z]{1,20}(?:-[A-Z][a-z]{1,20})?|[А-Я][а-я]{1,20}(?:-[А-Я][а-я]{1,20})?)$/g.test(value),
};

function validateFieldValue(value: string, type: validatorTypes): boolean {
    if (type in validators) {
        return validators[type](value);
    }
    return false;
}

export {validateFieldValue};