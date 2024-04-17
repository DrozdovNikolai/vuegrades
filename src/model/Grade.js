import { useGradeStore } from "@/stores/grade";
import { useStudentStore } from "@/stores/student";
import { useCoursesStore } from "@/stores/courses";
import Formatter from "@/utils/Formatter";
import { reactive, toRefs, computed } from 'vue';

export function useGrade(code, courseCode, studentCode, grade, gradeDate, isDelete) {
    const gradeInfo = reactive({
        code,
        courseCode,
        studentCode,
        grade,
        gradeDate,
        isDelete,


        get courseName() {
            return courseStore.courses.get(this.courseCode)?.name || 'Неизвестный курс';
        },
        get studentName() {
            return studentStore.students.get(this.studentCode)?.fullName || 'Неизвестный студент';
        },
        get formattedGradeDate() {
            return Formatter.formatDate(this.gradeDate);
        }
    });


    const courseStore = useCoursesStore();
    const studentStore = useStudentStore();

    return toRefs(gradeInfo);
}
