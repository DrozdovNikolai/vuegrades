import { createRouter, createWebHistory } from 'vue-router'

import Grades from '../views/Grades.vue'
import Chart from '../views/Chart.vue'
import Students from '../views/Students.vue'
import AppLayout from '../layout/AppLayout.vue'
import Courses from '../views/Courses.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: AppLayout,
      children: [
        {
          path: '/',
          component: Grades
        },
        {
          path: '/student',
          component: Students
        },
        {
          path: '/course',
          component: Courses
        },
        {
          path: '/chart',
          component: Chart
        },
      ]
    },

  ]
})

export default router
