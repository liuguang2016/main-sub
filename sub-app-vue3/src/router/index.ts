import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { qiankunWindow } from "vite-plugin-qiankun/dist/helper";

// 处理在主应用下的路由
const getRouterBase = () => {
  // 判断是否运行在qiankun环境中
  if (qiankunWindow.__POWERED_BY_QIANKUN__) {
    return "/vue3";
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