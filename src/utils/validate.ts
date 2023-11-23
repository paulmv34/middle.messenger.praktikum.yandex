export type stringValidatorsTypes = "login" | "password" | "email" | "phone" | "name" | "chatName";
export type fileValidatorsTypes = "image";

const stringValidators = {
    //login: (value: string): boolean => /^(?=.*[A-Za-z_-])([@.A-Za-z\d_-]){3,20}$/gi.test(value), // Логин как email
    //password: (value: string): boolean => /^[@.a-zA-Z\d]{8,40}$/g.test(value), // Пароль как email
    login: (value: string): boolean => /^(?=.*[A-Za-z_-])([A-Za-z\d_-]){3,20}$/g.test(value),
    password: (value: string): boolean => /^(?=.*[A-Z])(?=.*\d)[@.a-zA-Z\d]{8,40}$/g.test(value),
    email: (value: string): boolean => /^([a-zA-Z\d._-]+@[a-zA-Z\d._-]+\.[a-zA-Z\d_-]+)$/g.test(value),
    phone: (value: string): boolean => /^\+?\d{10,15}$/g.test(value),
    name: (value: string): boolean => /^([A-Za-z]{1,20}(?:-[A-Za-z]{1,20})?|[А-Яа-я]{1,20}(?:-[А-Яа-я]{1,20})?)$/g.test(value),
    chatName: (value: string): boolean => /^([A-Za-zА-Яа-я !,.\d]{3,40})$/g.test(value),
};
const filesValidators = {
    image: (value: File): boolean => /^.*(?:png|jpg|jpeg)$/.test(value.name.toLowerCase())
};

export function validate(value: string | File, type: stringValidatorsTypes | fileValidatorsTypes): boolean {
    if (typeof(value) == "string" && type in stringValidators) {
        return stringValidators[type as stringValidatorsTypes](value);
    }
    if (value instanceof File && type in filesValidators) {
        return filesValidators[type as fileValidatorsTypes](value);
    }
    return false;
}
