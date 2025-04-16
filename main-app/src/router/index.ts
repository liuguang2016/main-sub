import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Layout from '../components/Layout.vue';
import { loadApp, unloadApp } from "../micro-app";
import { MicroAppStateActions } from "qiankun";

// 当前激活的微应用名称
let currentMicroApp: string | null = null;
// 存储全局状态
let microActions: MicroAppStateActions | null = null;

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
        path: "/vue2/:pathMatch(.*)*",
        name: "vue2",
        component: () => import("../views/Subapp.vue"),
        meta: { microApp: "vue2App" },
      },
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
export function setMicroActions(actions: MicroAppStateActions) {
  microActions = actions;
}

// 添加全局导航守卫，实现微应用的按需加载和卸载
router.beforeEach(async (to, from, next) => {
  // 获取当前路由的微应用名称
  const toMicroApp = to.meta.microApp as string | undefined;
  // 获取上一个路由的微应用名称
  const fromMicroApp = from.meta.microApp as string | undefined;

  // 如果当前有激活的微应用，需要先卸载
  if (currentMicroApp) {
    await unloadApp(currentMicroApp);
    currentMicroApp = null;
    console.log("[主应用] 已卸载当前微应用");
  }

  // 如果目标路由需要加载微应用
  if (toMicroApp) {
    // 确保组件已挂载并且容器已存在
    next();

    // 使用setTimeout确保在DOM更新后再加载微应用
    setTimeout(() => {
      const container = document.getElementById("microAppContainer");
      if (container) {
        // 加载微应用
        if (microActions) {
          loadApp(toMicroApp, microActions);
          currentMicroApp = toMicroApp;
          console.log(`[主应用] 已加载微应用 ${toMicroApp}`);
        } else {
          console.error("[主应用] 未设置全局状态，无法加载微应用");
        }
      } else {
        console.error("[主应用] 找不到微应用容器 #microAppContainer");
      }
    }, 100);
  } else {
    next();
  }
});

export default router; 