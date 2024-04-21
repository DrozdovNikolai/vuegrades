import ReqExec from '@/services/RequestExecutor'
ReqExec.baseUrl = "api/rest/kubsu_study/web_data_api3/"; //подставьте свои значения в сегменты пути

const endpoints = {
    init_grade: "init_grade_data",
    course: "course",
    student: "student",
    grade: "grade"
};

export default {
    course: (code = undefined, forceUpdate = false) => ReqExec.get(endpoints.course, code, forceUpdate),
    deleteCourse: code => ReqExec.delete(endpoints.course, code),
    postCourse: course => ReqExec.post(endpoints.course, course),
    putCourse: (code, course) => ReqExec.put(endpoints.course, code, course),


    student: (code = undefined, forceUpdate = false) => ReqExec.get(endpoints.student, code, forceUpdate),
    deleteStudent: code => ReqExec.delete(endpoints.student, code),
    postStudent: student => ReqExec.post(endpoints.student, student),
    putStudent: (code, student) => ReqExec.put(endpoints.student, code, student),


    grade: (code = undefined, forceUpdate = false) => ReqExec.get(endpoints.grade, code, forceUpdate)
    ,
    postGrade: grade => ReqExec.post(endpoints.grade, grade),
    putGrade: (code, grade) => ReqExec.put(endpoints.grade, code, grade),
    deleteGrade: code => ReqExec.delete(endpoints.grade, code),
    initGradeData: () => ReqExec.get(endpoints.init_grade),


    //аутентификация, не изменять
    auth: {
        getSession: () => ReqExec.execute("api/auth/getSession", true),
        getUser: () => ReqExec.execute("api/auth/getUser", true)
    }
}