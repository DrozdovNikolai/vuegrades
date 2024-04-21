<script setup>
import { useStudentStore } from '@/stores/student'

import { ref, onBeforeMount, computed, reactive } from 'vue'

import Student from '@/model/Student'
import StdDialog from './StdDialog.vue'
import { useMainStore } from '@/stores'

const mainStore = useMainStore()
const studentStore = useStudentStore()

const deleteStudentDialog = ref(false)
const isValid = ref(true)
const errorStudent = ref('')
const currentStudent = reactive(new Student())
const actualStudents = computed(() => {
  return Array.from(studentStore.students.values())
})
const newStudent = new Student()
const onCellEditComplete = async (event) => {
  if (isValid.value) {
    let isError = 1
    let { newData, data, field, newValue, value } = event
    const updatedStudent = { ...newStudent, ...newData }

    try {
      isError = (await studentStore.putStudent(updatedStudent)).resultCode
    } catch (error) {
      console.error(error)
    }

    setTimeout(() => (data[field] = isError ? value : newValue))
  } else {
    isValid.value = true
    errorStudent.value = null
  }
}

const deleteStudent = (student) => {
  studentStore.deleteStudent(student)
  deleteStudentDialog.value = false
}
const refresh = () => {
  studentStore.getStudents(true)
}
const initData = () => {
  studentStore.initData()
}
const validateStudent = (val) => {
  isValid.value = true
  errorStudent.value = null
  if (!val) {
    errorStudent.value = 'Введите значение'
    isValid.value = false
  }
}
const columns = [
  { field: 'code', header: 'Код' },
  { field: 'lastName', header: 'Фамилия' },
  { field: 'firstName', header: 'Имя' },
  { field: 'formatStudentDate', header: 'Дата' }
]

const confirmDeleteStudent = (prod) => {
  currentStudent.value = { ...prod }

  deleteStudentDialog.value = true
}
onBeforeMount(() => {
  studentStore.getStudents()
})
</script>
<template>
  <div v-if="actualStudents">
    <DataTable
      :value="actualStudents"
      editMode="cell"
      @cell-edit-complete="onCellEditComplete"
      tableStyle="min-width: 50rem"
    >
      <template #header>
        <Toolbar style="padding: 0">
          <template #start> Таблица студентов </template>

          <template #end>
            <Button icon="pi pi-refresh" @click="refresh" text rounded />
            <Button icon="pi pi-plus" @click="studentStore.newStudentDialog = true" text rounded
          /></template>
        </Toolbar>
      </template>
      <Column
        v-for="col of columns"
        :key="col.field"
        :field="col.field"
        :header="col.header"
        style="width: 20%"
        sortable
        :class="{ 'cursor-pointer': (col.field === 'firstName') | (col.field === 'lastName') }"
      >
        <template
          v-if="col.field === 'firstName' || col.field === 'lastName'"
          #editor="{ data, field }"
        >
          <InputText
            @input="validateStudent(data[field])"
            v-model="data[field]"
            class="w-full"
            :class="{ 'p-invalid': !isValid }"
            autofocus
          />
          <small id="student-help" class="p-error">
            {{ errorStudent }}
          </small>
        </template>
      </Column>

      <Column :exportable="false">
        <template #body="slotProps">
          <Button icon="pi pi-trash" text rounded @click="confirmDeleteStudent(slotProps.data)" />
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
      v-model:visible="deleteStudentDialog"
      :style="{ width: '450px' }"
      header="Подверждение"
      :modal="true"
    >
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle mr-3" />
        <span v-if="currentStudent"
          >Вы точно хотите удалить студента <b>{{ currentStudent.value.fullName }}</b>

          ?</span
        >
      </div>
      <template #footer>
        <Button label="Нет" icon="pi pi-times" text @click="deleteStudentDialog = false" />
        <Button label="Да" icon="pi pi-check" text @click="deleteStudent(currentStudent.value)" />
      </template>
    </Dialog>

    <StdDialog></StdDialog>
  </div>
</template>
