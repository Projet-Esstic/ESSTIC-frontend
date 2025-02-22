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
  },
  {
    path: '/candidate-registration',
    name: 'CandidateRegistration',
    component: () => import('../views/registration/CandidateRegistration.vue'),
    meta: {
      title: 'Enregistrement Candidat'
    }
  },
  {
    path: '/all-routes',
    name: 'AllRoutes',
    component: () => import('../views/AllRoute.vue'),
    meta: {
      title: 'Navigation'
    }
  }
]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router