import { useGradeStore } from "@/stores/grade";
import { useStudentStore } from "@/stores/student";
import { useCoursesStore } from "@/stores/courses";
import Formatter from "@/utils/Formatter";
import { reactive, computed } from 'vue';

export function useGrade(code, courseCode, studentCode, grade, gradeDate, isDelete) {
    const gradeInfo = reactive({
        code,
        courseCode,
        studentCode,
        grade,
        gradeDate,
        isDelete
    });

    const courseStore = useCoursesStore();
    const studentStore = useStudentStore();


    const courseName = computed(() => {
        return courseStore.courses.get(gradeInfo.courseCode)?.name || 'Неизвестный курс';
    });

    const studentName = computed(() => {
        return studentStore.students.get(gradeInfo.studentCode)?.fullName || 'Неизвестный студент';
    });

    const formattedGradeDate = computed(() => {
        return Formatter.formatDate(gradeInfo.gradeDate);
    });


    return {
        ...gradeInfo,
        courseName,
        studentName,
        formattedGradeDate
    };
}
