
import { reactive, toRefs } from 'vue';

export function useCourse(code, name, dateStart, dateEnd) {
    const course = reactive({
        code,
        name,
        dateStart,
        dateEnd,


    });


    return toRefs(course);
}
