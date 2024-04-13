
import { defineStore } from 'pinia'
import api from '@/stores/api'

import Grade from '@/model/Grade'


export const useGradeStore = defineStore('grade', {
    state: () => {
        return {

            grades: [],
            newGradeDialog: false
        }
    },

    actions: {

        setGrades(grades) {

            this.grades = grades.map(grade => {
                return new Grade(
                    grade.code,
                    grade.courseCode,
                    grade.studentCode,
                    grade.grade,
                    grade.gradeDate,
                    grade.isDelete
                );
            });
        },

        postGradeStore(grade) {
            this.grades.push(
                new Grade(
                    grade.code,
                    grade.courseCode,
                    grade.studentCode,
                    grade.grade,
                    grade.gradeDate,
                    grade.isDelete
                )
            );
        },

        deleteGradeStore(grade) {
            const index = this.grades.indexOf(grade);
            grade.isDelete = 1;
            this.grades.splice(index, 1, grade);
        },


        async getGrades() {

            this.setGrades(await api.grade());

        },

        async postGrade(grade) {
            this.postGradeStore(await api.postGrade(grade));
        },

        async putGrade(grade) {
            return await api.putGrade(grade.code, grade);
        },

        async deleteGrade(grade) {
            if (!(await api.deleteGrade(grade.code)).resultCode) {
                deleteGradeStore(grade);
            }
        },

        async initData() {
            setGrades(await api.initData());
        }
    },
})