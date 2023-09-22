const M = [
    'Января',
    'Февраля',
    'Марта',
    'Апреля',
    'Мая',
    'Июня',
    'Июля',
    'Августа',
    'Сентября',
    'Октября',
    'Ноября',
    'Декабря',
]

export default function formatDate (timestamp: number, format: string) {
    let result = format;
    const date = new Date(1000 * timestamp);
    const splitDate = {
        'y': date.getFullYear().toString().slice(-2),
        'Y': date.getFullYear().toString(),
        'M': M[date.getMonth()],
        'm': (date.getMonth() + 1).toString().padStart(2, '0'),
        'd': (date.getDate() + 1).toString().padStart(2, '0'),
        'H': date.getHours().toString().padStart(2, '0'),
        'i': date.getMinutes().toString().padStart(2, '0'),
        's': date.getSeconds().toString().padStart(2, '0'),
    }
    Object.entries(splitDate).forEach(entry => {
        result = result.replace(entry[0], entry[1]);
    })
    return result;
}