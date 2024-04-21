<script setup>
import { useForm } from 'vee-validate'
import * as yup from 'yup'

import { useCoursesStore } from '@/stores/courses'

import Formatter from '@/utils/Formatter'
import Course from '@/model/Course'
const schema = yup.object({
  name: yup.string().required('Требуется имя'),
  dateStart: yup.date().required('Требуется дата начала'),
  dateEnd: yup.date().required('Требуется дата конца')
})

const { defineField, handleSubmit, resetForm, errors } = useForm({
  validationSchema: schema
})

const newCourse = new Course(0, 0, 0, 0)

const courseStore = useCoursesStore()
const [name] = defineField('name')
const [dateStart] = defineField('dateStart')
const [dateEnd] = defineField('dateEnd')

const onSubmit = handleSubmit((values, { resetForm }) => {
  newCourse.name = values.name
  newCourse.dateStart = Formatter.toUTCDate(values.dateStart).toISOString()
  newCourse.dateEnd = Formatter.toUTCDate(values.dateEnd).toISOString()

  courseStore.postCourse(newCourse)
  courseStore.newCourseDialog = false
  resetForm()
})
</script>
<template>
  <Dialog
    v-model:visible="courseStore.newCourseDialog"
    modal
    header="Добавить курс"
    :style="{ width: '25rem' }"
  >
    <form @submit="onSubmit">
      <div class="flex item-dialog justify-content-center my-3">
        <div class="w-full align-items-center gap-3 mb-0">
          <FloatLabel>
            <InputText
              id="name"
              v-model="name"
              class="w-full"
              :class="{ 'p-invalid': errors.name }"
            />
            <label for="name">Название</label>
          </FloatLabel>
          <small id="name-help" class="p-error">
            {{ errors.name }}
          </small>
        </div>
      </div>

      <div class="flex item-dialog justify-content-center my-3">
        <div class="w-full align-items-center gap-3 mb-0">
          <FloatLabel>
            <Calendar
              id="dateStart"
              v-model="dateStart"
              class="w-full"
              :class="{ 'p-invalid': errors.dateStart }"
              dateFormat="dd.mm.y"
            />
            <label for="dateStart">Дата начала</label>
          </FloatLabel>
          <small id="dateStart-help" class="p-error">
            {{ errors.dateStart }}
          </small>
        </div>
      </div>

      <div class="flex item-dialog justify-content-center my-3">
        <div class="w-full align-items-center gap-3 mb-0">
          <FloatLabel>
            <Calendar
              id="dateEnd"
              v-model="dateEnd"
              class="w-full"
              :class="{ 'p-invalid': errors.dateEnd }"
              dateFormat="dd.mm.y"
            />
            <label for="dateEnd">Дата конца</label>
          </FloatLabel>
          <small id="dateEnd-help" class="p-error">
            {{ errors.dateEnd }}
          </small>
        </div>
      </div>
      <Button
        label="Закрыть"
        text
        severity="secondary"
        @click="courseStore.newCourseDialog = false"
        autofocus
      />
      <Button label="Добавить" outlined severity="secondary" type="submit" autofocus />
    </form>
  </Dialog>
</template>
