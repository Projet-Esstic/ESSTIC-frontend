import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Unauthorized from '../views/error/Unauthorized.vue'
import ExamResults from '@/views/entrance-exam/ExamResults.vue'
import LoginView from '@/views/LoginView.vue';
import {authService} from '@/api/services/index';
import LandingPage from '../views/LandingPage.vue';

const routes = [
  { 
    path: '/', 
    component: LandingPage 
  },
  {
    path: '/unauthorized',
    component: Unauthorized
  },

  {
    path: '/register-student',
    component: () => import('../layouts/RegisterStudent.vue'),
    children: [
      {
        path: '',
        name: 'CandidateRegistration',
        component: () => import('@/views/registration/CandidateRegistration.vue'),
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
    path: '/dashboard',
    component: () => import('../layouts/DefaultLayout.vue'),
    // meta: { requiresAuth: true }, // Protect this route with  router.beforeEach define below
    children: [
      {
        path: '',
        name: 'Home',
        component: Home
      },
      {
        path: '/entrance-exam',
        name: 'EntranceExam',
        component: () => import('../views/entrance-exam/EntranceExam.vue')
      },
      {
        path: '/student-management',
        name: 'StudentManagement',
        component: () => import('../views/student/StudentManagement.vue')
      },
      {
        path: '/entrance-exam/results',
        name: 'exam-results',
        component: ExamResults,
        meta: {
          requiresAuth: true,
          title: 'Exam Results'
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
  },
  { 
    path: '/login', 
    component: LoginView 
  },
  {
    path: '/student',
    component: () => import('../layouts/StudentLayout.vue'),
    children: [
      {
        path: '',
        name: 'StudentHome',
        component: () => import('../views/student/StudentHome.vue')
      },
      {
        path: '/courses',
        name: 'Courses',
        component: () => import('../views/student/StudentCourses.vue')
      },
      {
        path: '/results',
        name: 'results',
        component: () => import('../views/student/StudentResult.vue')
      },
      {
        path: '/settings',
        name: 'settings',
        component: () => import('../views/student/StudentSettings.vue')
      },
     
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