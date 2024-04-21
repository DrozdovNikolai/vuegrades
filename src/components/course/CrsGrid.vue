<script setup>
import { useCoursesStore } from '@/stores/courses'

import { ref, onBeforeMount, computed, reactive } from 'vue'

import Course from '@/model/Course'

import { useMainStore } from '@/stores'
import Formatter from '@/utils/Formatter'
import CrsDialog from './CrsDialog.vue'
const courseStore = useCoursesStore()

const mainStore = useMainStore()

const deleteCourseDialog = ref(false)
const isValid = ref(true)
const errorCourse = ref('')
const currentCourse = reactive(new Course())
const actualCourses = computed(() => {
  return Array.from(courseStore.courses.values())
})
const newCourse = new Course()
const onCellEditComplete = async (event) => {
  if (isValid.value) {
    let isError = 1
    let { newData, data, field, newValue, value } = event
    const updatedCourse = { ...newData }

    switch (field) {
      case 'formatCourseStartDate':
        updatedCourse.dateStart = Formatter.toUTCDate(newValue).toISOString()
        updatedCourse.dateEnd = Formatter.toUTCDate(updatedCourse.dateEnd).toISOString()
        field = 'dateStart'
        break
      case 'formatCourseEndDate':
        updatedCourse.dateStart = Formatter.toUTCDate(updatedCourse.dateStart).toISOString()
        updatedCourse.dateEnd = Formatter.toUTCDate(newValue).toISOString()
        field = 'dateEnd'
        break
      default:
        updatedCourse.dateStart = Formatter.toUTCDate(updatedCourse.dateStart).toISOString()
        updatedCourse.dateEnd = Formatter.toUTCDate(updatedCourse.dateEnd).toISOString()
    }

    try {
      isError = (await courseStore.putCourse(updatedCourse)).resultCode
    } catch (error) {
      console.error(error)
    }

    setTimeout(() => (data[field] = isError ? value : newValue))
  } else {
    isValid.value = true
    errorCourse.value = null
  }
}

const deleteCourse = (course) => {
  courseStore.deleteCourse(course)
  deleteCourseDialog.value = false
}
const refresh = () => {
  courseStore.getCourses(true)
}
const initData = () => {
  courseStore.initData()
}
const validateCourse = (val) => {
  isValid.value = true
  errorCourse.value = null
  if (!val) {
    errorCourse.value = 'Введите значение'
    isValid.value = false
  }
}
const columns = [
  { field: 'code', header: 'Код' },
  { field: 'name', header: 'Название' },
  { field: 'formatCourseStartDate', header: 'Дата начала' },
  { field: 'formatCourseEndDate', header: 'Дата конца' }
]

const confirmDeleteCourse = (prod) => {
  currentCourse.value = { ...prod }

  deleteCourseDialog.value = true
}
onBeforeMount(() => {
  courseStore.getCourses()
})
</script>
<template>
  <div v-if="actualCourses">
    <DataTable
      :value="actualCourses"
      editMode="cell"
      @cell-edit-complete="onCellEditComplete"
      tableStyle="min-width: 50rem"
    >
      <template #header>
        <Toolbar style="padding: 0">
          <template #start> Таблица курсов </template>

          <template #end>
            <Button icon="pi pi-refresh" @click="refresh" text rounded />
            <Button icon="pi pi-plus" @click="courseStore.newCourseDialog = true" text rounded
          /></template>
        </Toolbar>
      </template>
      <Column
        v-for="col of columns"
        :key="col.field"
        :field="col.field"
        :header="col.header"
        style="width: 20%"
        :class="{ 'cursor-pointer': col.field !== 'code' }"
        sortable
      >
        <template v-if="col.field === 'name'" #editor="{ data, field }">
          <InputText
            @input="validateCourse(data[field])"
            v-model="data[field]"
            class="w-full"
            :class="{ 'p-invalid': !isValid }"
            autofocus
          />
          <small id="course-help" class="p-error">
            {{ errorCourse }}
          </small>
        </template>

        <template
          v-if="col.field === 'formatCourseStartDate' || col.field === 'formatCourseEndDate'"
          #editor="{ data, field }"
        >
          <Calendar
            @input="validateCourse(data[field])"
            v-model="data[field]"
            class="w-full"
            :class="{ 'p-invalid': !isValid }"
            autofocus
            dateFormat="dd.mm.yy"
          />
          <small id="course-help" class="p-error">
            {{ errorCourse }}
          </small>
        </template>
      </Column>

      <Column :exportable="false">
        <template #body="slotProps">
          <Button icon="pi pi-trash" text rounded @click="confirmDeleteCourse(slotProps.data)" />
        </template>
      </Column>
      <template #empty>
        <div v-if="!mainStore.isLoading" class="flex flex-column align-items-center">
          <div>Данные не найдены</div>
          <Button label="ВОССТАНОВИТЬ ДАННЫЕ" @click="initData" />
        </div>
      </template>
    </DataTable>
    <Dialog
      v-model:visible="deleteCourseDialog"
      :style="{ width: '450px' }"
      header="Подверждение"
      :modal="true"
    >
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle mr-3" />
        <span v-if="currentCourse"
          >Вы точно хотите удалить курс <b>{{ currentCourse.value.name }}</b> с кодом
          <b>{{ currentCourse.value.code }}</b
          >?</span
        >
      </div>
      <template #footer>
        <Button label="Нет" icon="pi pi-times" text @click="deleteCourseDialog = false" />
        <Button label="Да" icon="pi pi-check" text @click="deleteCourse(currentCourse.value)" />
      </template>
    </Dialog>
    <CrsDialog></CrsDialog>
  </div>
</template>
