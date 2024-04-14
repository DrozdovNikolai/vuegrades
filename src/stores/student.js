
import { defineStore } from 'pinia'
import api from '@/stores/api'


import { useStudent } from '@/model/Student'

export const useStudentStore = defineStore('student', {
    state: () => {
        return {
            students: new Map()
        }
    },

    actions: {
        setStudents(data) {
            data.forEach(student => {
                this.students.set(student.code, {
                    code: student.code,
                    fullName: student.fullName,
                    dateTime: student.datetime
                });
            });
        },
        async getStudents() {
            this.setStudents(await api.student())
        }
    },
})