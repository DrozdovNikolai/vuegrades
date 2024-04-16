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
    {{ courseStore.doubleCount }}
    <div class="flex item-dialog justify-content-center my-3">
      <div class="flex align-items-center gap-3 mb-0">
        <FloatLabel>
          <Dropdown
            v-model="course"
            :options="Array.from(courseStore.courses.values())"
            optionLabel="name"
            optionValue="code"
            placeholder="Select a City"
            class="w-full md:w-14rem"
          />
          <label for="course">Курс</label>
        </FloatLabel>
      </div>
      <small id="course-help" class="p-error">
        {{ errors.course }}
      </small>
    </div>
    <div class="flex item-dialog justify-content-center my-3">
      <div class="flex align-items-center gap-3 mb-0">
        <FloatLabel>
          <InputText id="student" v-model="student" :class="{ 'p-invalid': errors.student }" />
          <label for="student">Студент</label>
        </FloatLabel>
      </div>
      <small id="student-help" class="p-error">
        {{ errors.student }}
      </small>
    </div>

    <div class="flex item-dialog justify-content-center my-3">
      <div class="flex align-items-center gap-3 mb-0">
        <FloatLabel>
          <InputText id="grade" v-model="grade" :class="{ 'p-invalid': errors.grade }" />
          <label for="grade">Грэйд</label>
        </FloatLabel>
      </div>
      <small id="grade-help" class="p-error">
        {{ errors.grade }}
      </small>
    </div>
    <template #footer>
      <Button label="Cancel" text severity="secondary" @click="visible = false" autofocus />
      <Button label="Save" outlined severity="secondary" @click="test" autofocus />
    </template>
  </Dialog>
</template>
<script setup>
import { useGradeStore } from '@/stores/grade'

import { useForm } from 'vee-validate'
import * as yup from 'yup'
import { useStudentStore } from '@/stores/student'
import { useCoursesStore } from '@/stores/courses'
import { ref, onMounted, onBeforeMount, computed } from 'vue'

const schema = yup.object({
  course: yup.string().required().label('course')
})

const { defineField, handleSubmit, resetForm, errors } = useForm({
  validationSchema: schema
})

const gradeStore = useGradeStore()
const studentStore = useStudentStore()
const courseStore = useCoursesStore()
const email = ref()
const emailValidation = ref()

const [course] = defineField('course')
const courses = ref([])

const formattedCourses = computed(() => {
  console.log(...studentStore.students)
})
function test() {
  console.log(Array.from(courseStore.courses.values()))
  console.log(courseStore.courses.keys())
}
function validateEmail() {
  if (email.value /* logic to check if email is valid */) {
    emailValidation.value.class = 'valid'
    emailValidation.value.invalid = false
    emailValidation.value.message = null
  } else {
    emailValidation.value.class = invalid
    emailValidation.value.invalid = true
    emailValidation.value.message = 'Please enter a valid email.'
  }
}
</script>
