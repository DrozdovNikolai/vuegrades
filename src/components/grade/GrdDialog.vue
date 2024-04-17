<template>
  <Dialog modal header="Edit Profile" :style="{ width: '105rem', height: '60rem' }">
    <FloatLabel>
      <InputText id="username" v-model="value" />
      <label for="username">Username</label>
    </FloatLabel>
    <label for="field-email">Email</label>
    <Input v-model="email" id="field-email" @input="validateEmail" />
    <span class="feedback">AAA</span>
  </Dialog>

  <Dialog
    v-model:visible="gradeStore.newGradeDialog"
    modal
    header="Добавить грэйд"
    :style="{ width: '25rem' }"
  >
    <form @submit="onSubmit">
      {{ courseCode }}
      <div class="flex item-dialog justify-content-center my-3">
        <div class="w-full align-items-center gap-3 mb-0">
          <FloatLabel>
            <Dropdown
              v-model="courseCode"
              :options="Array.from(courseStore.courses.values())"
              optionLabel="name"
              optionValue="code"
              class="w-full"
              :class="{ 'p-invalid': errors.courseCode }"
            />
            <label for="course">Курс</label>
          </FloatLabel>
          <small id="courseCode-help" class="p-error">
            {{ errors.courseCode }}
          </small>
        </div>
      </div>
      <div class="flex item-dialog justify-content-center my-3">
        <div class="w-full align-items-center gap-3 mb-0">
          <FloatLabel>
            <Dropdown
              v-model="studentCode"
              :options="Array.from(studentStore.students.values())"
              optionLabel="fullName"
              optionValue="code"
              class="w-full"
              :class="{ 'p-invalid': errors.studentCode }"
            />
            <label for="studentCode">Студент</label>
          </FloatLabel>
          <small id="studentCode-help" class="p-error">
            {{ errors.studentCode }}
          </small>
        </div>
      </div>

      <div class="flex item-dialog justify-content-center my-3">
        <div class="w-full align-items-center gap-3 mb-0">
          <FloatLabel>
            <InputText
              id="grade"
              v-model="grade"
              class="w-full"
              :class="{ 'p-invalid': errors.grade }"
            />
            <label for="grade">Грэйд</label>
          </FloatLabel>
          <small id="grade-help" class="p-error">
            {{ errors.grade }}
          </small>
        </div>
      </div>

      <Button
        label="Закрыть"
        text
        severity="secondary"
        @click="gradeStore.newGradeDialog = false"
        autofocus
      />
      <Button label="Добавить" outlined severity="secondary" type="submit" autofocus />
    </form>
  </Dialog>
</template>
<script setup>
import { useGradeStore } from '@/stores/grade'

import { useForm } from 'vee-validate'
import * as yup from 'yup'
import { useStudentStore } from '@/stores/student'
import { useCoursesStore } from '@/stores/courses'
import { ref, onMounted, onBeforeMount, computed } from 'vue'
import { useGrade } from '@/model/Grade'
const schema = yup.object({
  courseCode: yup.number().required().label('courseCode'),
  studentCode: yup.number().required().label('studentCode'),
  grade: yup
    .number('Грэйд должен быть числом')
    .typeError('Грэйд должен содержать только цифры')
    .required('Требуется грэйд')
    .min(0, 'Грэйд должен быть хотя бы 0')
    .max(25, 'Грэйд должен быть меньше 25')
    .label('Грэйд')
})

const { defineField, handleSubmit, resetForm, errors } = useForm({
  validationSchema: schema
})

const newGrade = useGrade(null, null, null, null, null, 0)
const gradeStore = useGradeStore()
const studentStore = useStudentStore()
const courseStore = useCoursesStore()
const email = ref()
const emailValidation = ref()

const [courseCode] = defineField('courseCode')
const [studentCode] = defineField('studentCode')
const [grade] = defineField('grade')
const onSubmit = handleSubmit((values, { resetForm }) => {
  newGrade.courseCode = values.courseCode
  newGrade.studentCode = values.studentCode
  newGrade.grade = values.grade

  gradeStore.postGrade(newGrade)
  gradeStore.newGradeDialog = false
  resetForm()
})
</script>
