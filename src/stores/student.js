
import { defineStore } from 'pinia'
import api from '@/stores/api'


import Student from '@/model/Student'

export const useStudentStore = defineStore('student', {
    state: () => {
        return {
            students: new Map()
        }
    },

    actions: {
        setStudents(data) {
            data.forEach(student => {
                this.students.set(student.code, new Student(
                    student.code,
                    student.fullName,
                    student.datetime)
                );
            });
        },
        async getStudents(forceUpdate) {
            this.setStudents(await api.student(undefined, forceUpdate))
        }
    },
})