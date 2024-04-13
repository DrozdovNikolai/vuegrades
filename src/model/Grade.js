
import { useGradeStore } from "@/stores/grade"
import { useStudentStore } from "@/stores/student";
import Formatter from "@/utils/Formatter"

export default class Grade {
    code
    courseCode
    studentCode
    grade
    gradeDate
    isDelete

    constructor(code, courseCode, studentCode, grade, gradeDate, isDelete) {
        this.code = code;
        this.courseCode = courseCode;
        this.studentCode = studentCode;
        this.grade = grade;
        this.gradeDate = gradeDate;
        this.isDelete = isDelete;


    }

    get courseName() {
        const gradeStore = useGradeStore();
        return gradeStore.courses.get(this.courseCode).nameStudent;
    }

    get studentName() {
        const studentStore = useStudentStore();

        let student = studentStore.students.get(this.studentCode);
        console.log(student.fullName)
        //console.log(studentStore.students.get(this.studentCode).fullNameStudent)
        return this.studentCode;
    }

    get formatGradeDate() {
        return Formatter.formatDate(this.gradeDate);
    }
}