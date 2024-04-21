<script setup>
import { useCoursesStore } from '@/stores/courses'
import { useGradeStore } from '@/stores/grade'
import { useStudentStore } from '@/stores/student'

import { ref, watch, onBeforeMount, computed } from 'vue'
import { useLayout } from '@/layout/composables/layout'

const gradeStore = useGradeStore()
const courseStore = useCoursesStore()
const studentStore = useStudentStore()

const sumGrade = computed(() => {
  const surnameGrade = {}
  gradeStore.grades.forEach((el) => {
    if (!el.isDelete) {
      const key = el.studentCode + ' ' + el.studentName
      surnameGrade[key] = 0
    }
  })
  gradeStore.grades.forEach((el) => {
    if (!el.isDelete) {
      const key = el.studentCode + ' ' + el.studentName
      surnameGrade[key] += el.grade
    }
  })

  const sortedSurnameGrade = Object.entries(surnameGrade).sort((a, b) => a[0].localeCompare(b[0]))

  const sortedSurnameGradeObject = {}
  sortedSurnameGrade.forEach(([key, value]) => {
    sortedSurnameGradeObject[key] = value
  })

  return sortedSurnameGradeObject
})

const { layoutConfig } = useLayout()
let documentStyle = getComputedStyle(document.documentElement)
let textColor = documentStyle.getPropertyValue('--text-color')
let textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary')
let surfaceBorder = documentStyle.getPropertyValue('--surface-border')

const pieData = ref(null)

const barData = ref(null)

const pieOptions = ref(null)

const barOptions = ref(null)

const setColorOptions = () => {
  documentStyle = getComputedStyle(document.documentElement)
  textColor = documentStyle.getPropertyValue('--text-color')
  textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary')
  surfaceBorder = documentStyle.getPropertyValue('--surface-border')
}

const setChart = () => {
  barData.value = {
    labels: Object.keys(sumGrade.value),
    datasets: [
      {
        label: 'Баллы',

        data: Object.values(sumGrade.value)
      }
    ]
  }
  barOptions.value = {
    plugins: {
      legend: {
        labels: {
          fontColor: textColor
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: textColorSecondary,
          font: {
            weight: 500
          }
        },
        grid: {
          display: false,
          drawBorder: false
        }
      },
      y: {
        ticks: {
          color: textColorSecondary
        },
        grid: {
          color: surfaceBorder,
          drawBorder: false
        }
      }
    }
  }

  pieData.value = {
    labels: Object.keys(sumGrade.value),
    datasets: [
      {
        data: Object.values(sumGrade.value)
      }
    ]
  }

  pieOptions.value = {
    plugins: {
      legend: {
        labels: {
          usePointStyle: true,
          color: textColor
        }
      }
    }
  }
}

watch(
  layoutConfig.theme,
  () => {
    setColorOptions()
    setChart()
  },
  { immediate: true }
)
watch(sumGrade, (newGrades, oldGrades) => {
  setChart()
})
onBeforeMount(() => {
  gradeStore.getGrades()
  courseStore.getCourses()
  studentStore.getStudents()
})
</script>

<template>
  <div class="grid p-fluid">
    <div class="col-12">
      <div class="card">
        <h5>Гистограмма оценок</h5>
        <Chart type="bar" :data="barData" :options="barOptions"></Chart>
      </div>
    </div>
    <div class="col-12">
      <div class="card flex flex-column align-items-center">
        <h5 class="text-left w-full">Круговая диаграмма</h5>
        <Chart type="pie" :data="pieData" :options="pieOptions" class="w-full md:w-30rem"></Chart>
      </div>
    </div>

    <div class="col-12">
      <div class="card flex flex-column align-items-center">
        <h5 class="text-left w-full">Пончиковая диаграмма</h5>
        <Chart
          type="doughnut"
          :data="pieData"
          :options="pieOptions"
          class="w-full md:w-30rem"
        ></Chart>
      </div>
    </div>
  </div>
</template>
