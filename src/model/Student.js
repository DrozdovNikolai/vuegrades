
import { reactive, toRefs } from 'vue';

export function useStudent(code, fullName, dateTime) {
    const student = reactive({
        code,
        fullName,
        dateTime
    });


    function setCode(code) {
        student.code = code;
    }

    function setFullName(fullName) {
        student.fullName = fullName;
    }

    function setDateTime(dateTime) {
        student.dateTime = dateTime;
    }

    return {
        ...student,
        setCode,
        setFullName,
        setDateTime
    }
}
