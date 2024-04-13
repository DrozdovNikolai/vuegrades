
import { defineStore } from 'pinia'
import api from '@/stores/api'


import Course from '@/model/Course'

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
                    new Course(
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