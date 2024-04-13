
import { reactive, toRefs } from 'vue';

export function useStudent(code, fullName, dateTime) {
    const student = reactive({
        code,
        fullName,
        dateTime
    });


    return toRefs(student);
}
