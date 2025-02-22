import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    component: () => import('../layouts/DefaultLayout.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: Home
      },
      {
        path: 'entrance-exam',
        name: 'EntranceExam',
        component: () => import('../views/entrance-exam/EntranceExam.vue')
      },
      {
        path: 'all-routes',
        name: 'AllRoutes',
        component: () => import('../views/AllRoute.vue'),
        meta: {
          title: 'Navigation'
        }
      }
    ]
  },
  // Public routes
  {
    path: '/candidate-registration',
    component: () => import('../layouts/PublicLayout.vue'),
    children: [
      {
        path: '',
        name: 'CandidateRegistration',
        component: () => import('../views/registration/CandidateRegistration.vue'),
        meta: {
          title: 'Inscription au Concours ESSTIC'
        },
        beforeEnter: (to, from, next) => {
          if (to.query.source === 'admin') {
            to.meta.isAdmin = true;
          }
          next();
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router