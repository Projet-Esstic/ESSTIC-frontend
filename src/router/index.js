import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import LandingPage from '../views/LandingPage.vue'
import Connexion from '../views/Connexion.vue'
import Apropos from '../views/About.vue'
const routes = [
  {
    path: '/',
    component: () => import('../layouts/HomePagesLayout.vue'),
    children: [
      {
        path: '',
        name: 'LandingPage',
        component: LandingPage,
        alias: '/'
      },
      { name: 'Connexion', path: '/login', component: Connexion },
      { name: 'A propos', path: '/a-propos',component: Apropos},
      // { name: 'Contact', path: '/contact' }
    ]
  },  {
    path: '/dashboard',
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
        path: 'exam-scheduler',
        name: 'ExamScheduler',
        component: () => import('../components/examination/ExamScheduler.vue')
      },
      {
        path: 'exam-calendar',
        name: 'ExamCalendar', 
        component: () => import('../components/examination/ExamCalendar.vue')
      },
      {
        path: 'grade-entry',
        name: 'GradeEntry',
        component: () => import('../components/examination/GradeEntry.vue')
      },
      {
        path: 'grade-calculator',
        name: 'GradeCalculator',
        component: () => import('../components/examination/GradeCalculator.vue')
      },
      {
        path: 'report-card',
        name: 'ReportCard',
        component: () => import('../components/examination/ReportCard.vue')
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
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router