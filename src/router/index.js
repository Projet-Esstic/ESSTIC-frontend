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
        path: '/settings-management',
        name: 'SettingsManagement',
        component: () => import('../views/settings/SettingsManagement.vue')
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
      },
      {
        path: '/request',
        name: 'request',
        component: () => import('../views/student/StudentRequest.vue')
      },
    ]
  },
  {
    path: '/personnel',
    component: () => import('../layouts/DefaultLayout.vue'),
    children: [
      {
        path: '',
        name: 'PersonnelManagement',
        component: () => import('../views/personnel/PersonnelManagement.vue'),
        meta: {
          title: 'Personnel Management'
        }
      },
      {
        path: 'attendance',
        name: 'PersonnelAttendance',
        component: () => import('../views/personnel/PersonnelAttendance.vue'),
        meta: {
          title: 'Personnel Attendance'
        }
      },
      {
        path: 'schedule',
        name: 'PersonnelSchedule', 
        component: () => import('../views/personnel/PersonnelSchedule.vue'),
        meta: {
          title: 'Personnel Schedule'
        }
      },
      {
        path: 'leave',
        name: 'PersonnelLeave',
        component: () => import('../views/personnel/PersonnelLeave.vue'),
        meta: {
          title: 'Personnel Leave'
        }
      },
      {
        path: 'requests',
        name: 'PersonnelRequest',
        component: () => import('../views/personnel/PersonnelRequest.vue'),
        meta: {
          title: 'Personnel Requests'
        }
      },
      {
        path: 'detail/:id',
        name: 'PersonnelDetail',
        component: () => import('../views/personnel/PersonnelDetail.vue'),
        meta: {
          title: 'Personnel Details'
        }
      }
    ]
  },  { 
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
     
      {
        path: '/student-request',
        name: 'student-request',
        component: () => import('../views/student/StudentDashRequest.vue')

      }
    ]
  },
  // Public routes
  {
    path: '/all-routes',
    component: () => import('../views/AllRoute.vue'),
    },
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
