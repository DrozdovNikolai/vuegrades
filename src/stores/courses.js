
import { defineStore } from 'pinia'
import api from '@/stores/api'


import { useCourse } from '@/model/Course'

export const useCoursesStore = defineStore('course', {
    state: () => {
        return {
            courses: new Map(),
        }
    },
    actions: {
        setCourses(courses) {
            this.courses.clear();
            courses.forEach(course => {
                this.courses.set(course.code,
                    useCourse(
                        course.code,
                        course.name,
                        course.dateStart,
                        course.dateEnd
                    ));
            });
            console.log(this.courses);
        },

        async getCourses() {
            this.setCourses(await api.course());
        },

    },
})