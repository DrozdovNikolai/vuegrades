
import { reactive, toRefs } from 'vue';

export function useCourse(code, name, dateStart, dateEnd) {
    const course = reactive({
        code,
        name,
        dateStart,
        dateEnd
    });

    function setCode(code) {
        course.code = code;
    }

    function setName(name) {
        course.name = name
    }

    function setDateStart(dateStart) {
        course.dateStart = dateStart
    }
    function setDateEnd(dateEnd) {
        course.dateEnd = dateEnd
    }
    return {
        ...course,
        setCode,
        setName,
        setDateStart,
        setDateEnd
    }
}
