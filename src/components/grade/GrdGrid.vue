<script setup>
import { useCoursesStore } from '@/stores/courses'
import { useGradeStore } from '@/stores/grade'
import { useStudentStore } from '@/stores/student'

import { ref, onBeforeMount, computed, reactive } from 'vue'

import Button from 'primevue/button'
import Grade from '@/model/Grade'
import GrdDialog from './GrdDialog.vue'
import { useMainStore } from '@/stores'
const gradeStore = useGradeStore()
const courseStore = useCoursesStore()
const mainStore = useMainStore()
const studentStore = useStudentStore()

const deleteGradeDialog = ref(false)
const isValid = ref(true)
const errorGrade = ref('')
const currentGrade = reactive(new Grade())
const actualGrades = computed(() => {
  return gradeStore.grades.filter((grade) => !grade.isDelete)
})
const newGrade = new Grade()
const onCellEditComplete = async (event) => {
  if (isValid.value) {
    let isError = 1
    let { newData, data, field, newValue, value } = event
    const updatedGrade = { ...newGrade, ...newData }

    try {
      isError = (await gradeStore.putGrade(updatedGrade)).resultCode
    } catch (error) {
      console.error(error)
    }

    setTimeout(() => (data[field] = isError ? value : newValue))
  } else {
    isValid.value = true
    errorGrade.value = null
  }
}

const deleteGrade = (grade) => {
  gradeStore.deleteGrade(grade)
  deleteGradeDialog.value = false
}
const refresh = () => {
  gradeStore.getGrades(true)
  courseStore.getCourses(true)
  studentStore.getStudents(true)
}
const initData = () => {
  gradeStore.initData()
}
const validateGrade = (val) => {
  isValid.value = true
  errorGrade.value = null
  if (!val) {
    errorGrade.value = 'Введите значение'
    isValid.value = false
  }
  if (isNaN(val)) {
    errorGrade.value = 'Грэйд должен содержать только цифры'
    isValid.value = false
  }
  if (val < 0 || val > 25) {
    errorGrade.value = 'Грэйд должен быть от 0 до 25'
    isValid.value = false
  }
}
const columns = [
  { field: 'code', header: 'Код' },
  { field: 'courseName', header: 'Курс' },
  { field: 'studentName', header: 'ФИО' },
  { field: 'grade', header: 'Грэйд' },
  { field: 'formatGradeDate', header: 'Дата' }
]

const confirmDeleteGrade = (prod) => {
  currentGrade.value = { ...prod }

  deleteGradeDialog.value = true
}
onBeforeMount(() => {
  gradeStore.getGrades()
  courseStore.getCourses()
  studentStore.getStudents()
})
</script>
<template>
  <div v-if="actualGrades">
    <DataTable
      :value="actualGrades"
      editMode="cell"
      @cell-edit-complete="onCellEditComplete"
      tableStyle="min-width: 50rem"
    >
      <template #header>
        <Toolbar style="padding: 0">
          <template #start> Таблица грэйдов </template>

          <template #end>
            <Button icon="pi pi-refresh" @click="refresh" text rounded />
            <Button icon="pi pi-plus" @click="gradeStore.newGradeDialog = true" text rounded
          /></template>
        </Toolbar>
      </template>
      <Column
        v-for="col of columns"
        :key="col.field"
        :field="col.field"
        :header="col.header"
        style="width: 20%"
        :class="{ 'cursor-pointer': col.field === 'grade' }"
        sortable
      >
        <template v-if="col.field === 'grade'" #editor="{ data, field }">
          <InputText
            @input="validateGrade(data[field])"
            v-model="data[field]"
            class="w-full"
            :class="{ 'p-invalid': !isValid }"
            autofocus
          />
          <small id="grade-help" class="p-error">
            {{ errorGrade }}
          </small>
        </template>
      </Column>

      <Column :exportable="false">
        <template #body="slotProps">
          <Button icon="pi pi-trash" text rounded @click="confirmDeleteGrade(slotProps.data)" />
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
      v-model:visible="deleteGradeDialog"
      :style="{ width: '450px' }"
      header="Подверждение"
      :modal="true"
    >
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle mr-3" />
        <span v-if="currentGrade"
          >Вы точно хотите удалить грэйд <b>{{ currentGrade.value.grade }}</b> с кодом
          <b>{{ currentGrade.value.code }}</b
          >?</span
        >
      </div>
      <template #footer>
        <Button label="Нет" icon="pi pi-times" text @click="deleteGradeDialog = false" />
        <Button label="Да" icon="pi pi-check" text @click="deleteGrade(currentGrade.value)" />
      </template>
    </Dialog>

    <GrdDialog></GrdDialog>
  </div>
</template>
