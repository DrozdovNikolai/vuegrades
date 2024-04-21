import Formatter from "@/utils/Formatter";
export default class Student {
    code
    firstName
    lastName
    fullName
    dateTime

    constructor(code, firstName, lastName, fullName, dateTime) {
        this.code = code;
        this.firstName = firstName;
        this.lastName = lastName;
        this.fullName = fullName;
        this.dateTime = dateTime;
    }

    get formatStudentDate() {
        return Formatter.formatDate(this.dateTime);
    }
}