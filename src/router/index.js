import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import ExamResults from '@/views/entrance-exam/ExamResults.vue'
import LoginView from '@/views/LoginView.vue';
import {authService} from '@/api/services/index';

const routes = [
  {
    path: '/',
    component: () => import('../layouts/DefaultLayout.vue'),
    meta: { requiresAuth: true }, // Protect this route with  router.beforeEach define below
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
        path: 'entrance-exam/results',
        name: 'exam-results',
        component: ExamResults,
        meta: {
          requiresAuth: true,
          title: 'Exam Results'
        }
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
  { 
    path: '/login', 
    component: LoginView 
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
  },
  {
    path: '/personnel-registration',
    component: () => import('../layouts/PublicLayout.vue'),
    children: [
      {
        path: '',
        name: 'PersonnelRegistration',
        component: () => import('../views/personnel/PersonnelRegistration.vue'),
        meta: {
          title: 'Register Personnel'
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

// protect routes from unauthenticated users
router.beforeEach((to, from, next) => {
  const isAuthenticated = authService.isAuthenticated(); // Check if token exists
  console.log("isAuthenticated",isAuthenticated)
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login'); // Redirect to login if not authenticated
  } else {
    next(); // Allow navigation
  }
});

export default router