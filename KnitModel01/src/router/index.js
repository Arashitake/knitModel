import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/square',
      name: 'square',
      component: () => import('../views/SquareView.vue')
    },
    {
      path: '/line',
      name: 'line',
      component: () => import('../views/LineView.vue')
    },
    {
      path: '/cylinder',
      name: 'cylinder',
      component: () => import('../views/CylinderView.vue')
    }
  ]
})

export default router
