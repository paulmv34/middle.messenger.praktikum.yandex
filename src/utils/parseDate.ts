export function parseDate (dateString: string): Date {
    return new Date(Date.parse(dateString));
}