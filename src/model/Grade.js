
import { useGradeStore } from "@/stores/grade"
import { useStudentStore } from "@/stores/student";
import { useCoursesStore } from "@/stores/courses"
import Formatter from "@/utils/Formatter"
import { reactive, computed, toRefs } from 'vue';


//const gradeStore = useGradeStore();

export function useGrade(code, courseCode, studentCode, grade, gradeDate, isDelete) {
    const gradeInfo = reactive({
        code: code,
        courseCode: courseCode,
        studentCode: studentCode,
        grade: grade,
        gradeDate: gradeDate,
        isDelete: isDelete,
        get courseName() {
            const courseStore = useCoursesStore();
            return courseStore.courses.get(gradeInfo.courseCode)?.name || 'Неизвестный курс';
        },
        get studentName() {
            const studentStore = useStudentStore();
            return studentStore.students.get(gradeInfo.studentCode)?.fullName || 'Неизвестный студент';
        },
        get formattedGradeDate() {
            return Formatter.formatDate(gradeInfo.gradeDate);
        }
    });

    return {
        ...gradeInfo
    };
}