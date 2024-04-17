import { useGradeStore } from "@/stores/grade";
import { useStudentStore } from "@/stores/student";
import { useCoursesStore } from "@/stores/courses";
import Formatter from "@/utils/Formatter";
import { reactive, toRefs, computed } from 'vue';
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
        const courseStore = useCoursesStore();
        return courseStore.courses.get(this.courseCode)?.name || 'Неизвестный курс';
    }

    get studentName() {
        const studentStore = useStudentStore();
        return studentStore.students.get(this.studentCode)?.fullName || 'Неизвестный студент';
    }

    get formatGradeDate() {
        return Formatter.formatDate(this.gradeDate);
    }
}
