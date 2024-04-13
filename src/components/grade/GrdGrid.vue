<template>
  {{ actualGrades }} BBBB

  <div v-if="actualGrades && actualGrades.length > 5">
    <DataTable :value="actualGrades" tableStyle="min-width: 50rem">
      <Column
        v-for="col of columns"
        :key="col.field"
        :field="col.field"
        :header="col.header"
      ></Column>
    </DataTable>
  </div>
</template>

<script setup>
import { useMainStore } from '@/stores'
import { useCoursesStore } from '@/stores/courses'
import { useGradeStore } from '@/stores/grade'
import { useStudentStore } from '@/stores/student'
import { ref, onMounted, onBeforeMount, computed } from 'vue'

import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import ColumnGroup from 'primevue/columngroup' // optional
import Row from 'primevue/row' // optional

const gradeStore = useGradeStore()
const courseStore = useCoursesStore()
//const mainStore = useMainStore()
const studentStore = useStudentStore()

const actualGrades = computed(() => {
  return gradeStore.grades.filter((grade) => !grade.isDelete)
})
const columns = [
  { field: 'code', header: 'Code' },
  { field: 'studentName', header: 'Name' },
  { field: 'category', header: 'Category' },
  { field: 'quantity', header: 'Quantity' }
]
onBeforeMount(async () => {
  await gradeStore.getGrades()
  await courseStore.getCourses()
  await studentStore.getStudents()
})
</script>
