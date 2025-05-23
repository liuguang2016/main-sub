import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Layout from '../components/Layout.vue';
import { setupMicroAppRouteGuards, setMicroActions } from "../micro-app-manager";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Layout",
    component: Layout,
    children: [
      {
        path: "",
        name: "Home",
        component: () => import("../views/Home.vue"),
      },
      {
        path: "/vue2",
        name: "vue2",
        component: () => import("../views/Subapp.vue"),
        meta: { microApp: "vue2App" },
        children: [
          {
            path: ":pathMatch(.*)*",
            name: "vue2-sub-routes",
            component: { render: () => null },
          }
        ]
      },
      // Vue3应用使用通配符匹配，不使用子路由嵌套
      {
        path: "/vue3/:pathMatch(.*)*",
        name: "vue3",
        component: () => import("../views/Subapp.vue"),
        meta: { microApp: "vue3App" },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 导出函数用于设置全局状态
export { setMicroActions };

// 设置微应用路由守卫
setupMicroAppRouteGuards(router);

export default router; 