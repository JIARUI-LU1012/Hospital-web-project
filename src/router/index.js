import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
      children: [
        {
          path: 'doctor-management',
          name: 'doctorManagement',
          component: () => import('../views/DoctorManagementView.vue')
        },
        {
          path: 'office-management',
          name: 'officeManagement',
          component: () => import('../views/OfficeManagementView.vue')
        },
        {
          path: 'center',
          name: 'center',
          component: () => import('../views/CenterView.vue')
        },
        {
          path: 'chart',
          name: 'chart',
          component: () => import('../views/ChartView.vue')
        },
        {
          path: 'map',
          name: 'map',
          component: () => import('../views/MapView.vue')
        },
        {
          path: 'ai',
          name: 'ai',
          component: () => import('../views/AIView.vue')
        },
        {
          path: 'escort-booking',
          name: 'escortBooking',
          component: () => import('../views/EscortBookingView.vue')
        },
        {
          path: 'user-order',
          name: 'UserOrder',
          component: () => import('../views/UserOrderView.vue')
        },
        {
          path: 'escort-order',
          name: 'EscortOrder',
          component: () => import('../views/EscortOrderView.vue')
        },
      ]
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue')
    }
  ]
})

export default router
