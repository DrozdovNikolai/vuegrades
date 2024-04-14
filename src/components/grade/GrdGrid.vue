<template>
  <div class="card">
    <div v-if="actualGrades && actualGrades.length > 5">
      <DataTable :value="actualGrades" tableStyle="min-width: 50rem">
        <Column
          v-for="col of columns"
          :key="col.field"
          :field="col.field"
          :header="col.header"
        ></Column>

        <Column :exportable="false" style="min-width: 8rem">
          <template #body="slotProps">
            <Button
              icon="pi pi-trash"
              outlined
              rounded
              severity="danger"
              @click="confirmDeleteProduct(slotProps.data)"
            />
          </template>
        </Column>
      </DataTable>
      <Dialog
        v-model:visible="deleteProductDialog"
        :style="{ width: '450px' }"
        header="Confirm"
        :modal="true"
      >
        <div class="confirmation-content">
          <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
          <span v-if="product"
            >Are you sure you want to delete <b>{{ product.name }}</b
            >?</span
          >
        </div>
        <template #footer>
          <Button label="No" icon="pi pi-times" text @click="deleteProductDialog = false" />
          <Button label="Yes" icon="pi pi-check" text @click="deleteProduct" />
        </template>
      </Dialog>
    </div>

    <Button @click="test()">HAHA</Button>
  </div>
</template>

<script setup>
import { useMainStore } from '@/stores'
import { useCoursesStore } from '@/stores/courses'
import { useGradeStore } from '@/stores/grade'
import { useStudentStore } from '@/stores/student'
import { ref, onMounted, onBeforeMount, computed } from 'vue'
import { useToast } from 'primevue/usetoast'
import Dialog from 'primevue/dialog'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import ColumnGroup from 'primevue/columngroup' // optional
import Row from 'primevue/row' // optional
import Button from 'primevue/button'
const gradeStore = useGradeStore()
const courseStore = useCoursesStore()
//const mainStore = useMainStore()
const studentStore = useStudentStore()

const deleteProductDialog = ref(false)
let currentGradeValue = null

const actualGrades = computed(() => {
  return gradeStore.grades.filter((grade) => !grade.isDelete)
})

function test() {
  console.log(courseStore.courses.get(48).name)
}
const columns = [
  { field: 'code', header: 'Код' },
  { field: 'courseName', header: 'Курс' },
  { field: 'studentName', header: 'ФИО' },
  { field: 'grade', header: 'Грэйд' },
  { field: 'formattedGradeDate', header: 'Дата' }
]

const confirmDeleteProduct = (prod) => {
  currentGradeValue = prod
  deleteProductDialog.value = true
}
onBeforeMount(async () => {
  await gradeStore.getGrades()
  await courseStore.getCourses()
  await studentStore.getStudents()
})
</script>
