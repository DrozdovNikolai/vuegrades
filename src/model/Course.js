import Formatter from "@/utils/Formatter";
export default class Course {
    code
    name
    dateStart
    dateEnd

    constructor(code, name, dateStart, dateEnd) {
        this.code = code;
        this.name = name;
        this.dateStart = dateStart;
        this.dateEnd = dateEnd;
    }
    get formatCourseStartDate() {
        return Formatter.formatDate(this.dateStart);
    }
    get formatCourseEndDate() {
        return Formatter.formatDate(this.dateEnd);
    }

}