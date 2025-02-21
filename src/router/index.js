import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // Lazy loading the about page
    component: () => import('../views/About.vue')
  },
  {
    path: '/entrance-exam',
    name: 'EntranceExam',
    component: () => import('../views/entrance-exam/EntranceExam.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
