
import { reactive, toRefs } from 'vue';

export function useCourse(code, fullName, dateTime) {
    const student = reactive({
        code,
        fullName,
        dateTime
    });

    function setCode(code) {
        student.code = code;
    }

    function setFullName(fullName) {
        student.fullName = fullName
    }

    function dateTime(dateTime) {
        student.dateTime = dateTime
    }

    return toRefs(student);
}
