import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
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
      path: '/cylinder',
      name: 'cylinder',
      component: () => import('../views/CylinderView.vue')
    },
    {
      path: '/line',
      name: 'line',
      component: () => import('../views/LineView.vue')
    }
  ]
})

export default router
