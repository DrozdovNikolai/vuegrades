/**
 * Пример класса для утилитарных методов.
 * методы: 
 * @static formatDate
 * 
 */
const dtFormatter = new Intl.DateTimeFormat("ru");

export default class Formatter {
    /**
     * Форматирует дату
     *
     * @param {string, number, Date} value дата для форматирования (Date или значение для конструктора Date) 
     * @return {string} отформатированная дата
     */
    static formatDate(value) {

        if (!value) return "";
        if (!(value instanceof Date)) value = new Date(value);
        return dtFormatter.format(value);
    }
    static toUTCDate(dateString) {
        const date = new Date(dateString)
        return new Date(
            Date.UTC(
                date.getFullYear(),
                date.getMonth(),
                date.getDate(),
                date.getHours(),
                date.getMinutes(),
                date.getSeconds()
            )
        )
    }
    /**
     * Болванка
     *
     * @param {any} value что-нибудь.
     * @return {any}
     */
    static formatSomethingElse(value) {
        return value;
    }
}