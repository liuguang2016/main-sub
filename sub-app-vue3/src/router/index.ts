import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

// 处理在主应用下的路由
const getRouterBase = () => {
  // 判断是否运行在qiankun环境中
  if (window.__POWERED_BY_QIANKUN__) {
    return '/vue3';
  }
  return '/';
};

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  }
];

const router = createRouter({
  history: createWebHistory(getRouterBase()),
  routes
});

export default router; 