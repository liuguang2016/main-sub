import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Layout from '../components/Layout.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('../views/Home.vue'),
      },
      {
        path: '/vue2/:pathMatch(.*)*',
        name: 'vue2',
        component: () => import('../views/Subapp.vue'),
      },
      {
        path: '/vue3/:pathMatch(.*)*',
        name: 'vue3',
        component: () => import('../views/Subapp.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router; 