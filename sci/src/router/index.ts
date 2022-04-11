import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue';


const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    name: 'index',
    component: Layout,
    redirect: 'newlist',
  },
  {
    path: '/newlist',
    name: 'newlist',
    component: Layout,
    children:[{
      path: '',
      name: '',
      component: () => import('@/views/NewList.vue'),
    }]
  },
  {
    path: '/presale',
    name: 'presale',
    component: Layout,
    children:[{
      path: '',
      name: '',
      component: () => import('@/views/Presale.vue'),
    }]
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
