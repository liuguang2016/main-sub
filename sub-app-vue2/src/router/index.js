import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

// 处理在主应用下的路由
const getRouterBase = () => {
  // 判断是否运行在qiankun环境中
  if (window.__POWERED_BY_QIANKUN__) {
    return '/vue2';
  }
  return '/';
};

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  }
];

const router = new VueRouter({
  mode: 'history',
  base: getRouterBase(),
  routes
});

export default router; 