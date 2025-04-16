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

    // 创建一个函数来尝试加载微应用，支持重试机制
    const tryLoadMicroApp = (retryCount = 0, maxRetries = 5) => {
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
        if (retryCount < maxRetries) {
          console.log(`[主应用] 找不到微应用容器，${retryCount + 1}/${maxRetries}次尝试，300ms后重试...`);
          setTimeout(() => tryLoadMicroApp(retryCount + 1, maxRetries), 300);
        } else {
          console.error("[主应用] 找不到微应用容器 #microAppContainer，已达到最大重试次数");
        }
      }
    };

    // 设置一次性事件监听器，当容器准备好时立即加载微应用
    const containerReadyHandler = () => {
      console.log(`[主应用] 接收到容器准备就绪事件，立即加载微应用 ${toMicroApp}`);
      tryLoadMicroApp();
      // 移除事件监听器
      window.removeEventListener("microapp-container-ready", containerReadyHandler);
    };

    // 监听容器准备事件
    window.addEventListener("microapp-container-ready", containerReadyHandler);

    // 同时设置延时加载作为备份机制
    setTimeout(() => tryLoadMicroApp(), 500);
  } else {
    next();
  }
});

// 路由后置守卫，用于清理资源
router.afterEach((to, from) => {
  // 路由离开微应用页面时，清理可能存在的事件监听器
  if (from.meta.microApp && !to.meta.microApp) {
    // 移除所有潜在的容器就绪事件监听器
    window.removeEventListener("microapp-container-ready", (event: Event) => {
      console.log("[主应用] 路由离开微应用，清理容器就绪事件监听器");
    });
  }
});

export default router; 