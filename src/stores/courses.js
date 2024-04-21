
import { defineStore } from 'pinia'
import api from '@/stores/api'

import Course from '@/model/Course'


export const useCoursesStore = defineStore('course', {
    state: () => {
        return {
            courses: new Map(),
            newCourseDialog: false
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
        },
        deleteCourseStore(course) {


            this.courses.delete(course.code)

        },
        postCourseStore(course) {
            console.log(course)
            this.courses.set(course.code,
                new Course(
                    course.code,
                    course.name,
                    Number(course.dateStart),
                    Number(course.dateEnd)
                )
            );
        },
        async getCourses(forceUpdate) {
            this.setCourses(await api.course(undefined, forceUpdate));
        },
        async putCourse(course) {
            return await api.putCourse(course.code, course);
        },
        async deleteCourse(course) {

            if (!(await api.deleteCourse(course.code)).resultCode) {

                this.deleteCourseStore(course);
            }
        },
        async postCourse(course) {
            this.postCourseStore(await api.postCourse(course));
        },
    },

})