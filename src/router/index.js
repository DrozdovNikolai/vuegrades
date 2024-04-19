import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Grades from '../views/Grades.vue'
import Chart from '../views/Chart.vue'
import Students from '../views/Students.vue'
import AppLayout from '../layout/AppLayout.vue'
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
          path: '/chart',
          component: Chart
        },
      ]
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
