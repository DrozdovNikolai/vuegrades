<script setup>
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import { useStudentStore } from '@/stores/student'
import Student from '@/model/Student'

const studentStore = useStudentStore()
const schema = yup.object({
  firstName: yup.string().required('Требуется имя'),
  lastName: yup.string().required('Требуется фамилия')
})

const { defineField, handleSubmit, resetForm, errors } = useForm({
  validationSchema: schema
})

const newStudent = new Student(0, '', '')

const [firstName] = defineField('firstName')
const [lastName] = defineField('lastName')

const onSubmit = handleSubmit((values, { resetForm }) => {
  newStudent.firstName = values.firstName
  newStudent.lastName = values.lastName
  studentStore.postStudent(newStudent)
  studentStore.newStudentDialog = false
  resetForm()
})
</script>

<template>
  <Dialog
    v-model:visible="studentStore.newStudentDialog"
    modal
    header="Добавить грэйд"
    :style="{ width: '25rem' }"
  >
    <form @submit="onSubmit">
      <div class="flex item-dialog justify-content-center my-3">
        <div class="w-full align-items-center gap-3 mb-0">
          <FloatLabel>
            <InputText
              id="firstName"
              v-model="firstName"
              class="w-full"
              :class="{ 'p-invalid': errors.firstName }"
            />
            <label for="firstName">Имя</label>
          </FloatLabel>
          <small id="firstName-help" class="p-error">
            {{ errors.firstName }}
          </small>
        </div>
      </div>
      <div class="flex item-dialog justify-content-center my-3">
        <div class="w-full align-items-center gap-3 mb-0">
          <FloatLabel>
            <InputText
              id="lastName"
              v-model="lastName"
              class="w-full"
              :class="{ 'p-invalid': errors.lastName }"
            />
            <label for="lastName">Фамилия</label>
          </FloatLabel>
          <small id="lastName-help" class="p-error">
            {{ errors.lastName }}
          </small>
        </div>
      </div>

      <Button
        label="Закрыть"
        text
        severity="secondary"
        @click="studentStore.newStudentDialog = false"
        autofocus
      />
      <Button label="Добавить" outlined severity="secondary" type="submit" autofocus />
    </form>
  </Dialog>
</template>
