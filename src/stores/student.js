
import { defineStore } from 'pinia'
import api from '@/stores/api'


import Student from '@/model/Student'

export const useStudentStore = defineStore('student', {
    state: () => {
        return {
            students: new Map(),
            newGradeDialog: false
        }
    },

    actions: {
        setStudents(data) {
            data.forEach(student => {
                this.students.set(student.code, new Student(
                    student.code,
                    student.firstName,
                    student.lastName,
                    student.fullName,
                    student.datetime)
                );
            });
        },

        deleteStudentStore(student) {


            this.students.delete(student.code)

        },
        postStudentStore(student) {
            this.students.set(student.code,
                new Student(
                    student.code,
                    student.firstName,
                    student.lastName,
                    student.fullName,
                    student.datetime
                )
            );
        },
        async getStudents(forceUpdate) {
            this.setStudents(await api.student(undefined, forceUpdate));
        },
        async putStudent(student) {
            return await api.putStudent(student.code, student);
        },
        async deleteStudent(student) {
            console.log(student.code)
            if (!(await api.deleteStudent(student.code)).resultCode) {

                this.deleteStudentStore(student);
            }
        },
        async postStudent(student) {
            this.postStudentStore(await api.postStudent(student));
        },
    },
})