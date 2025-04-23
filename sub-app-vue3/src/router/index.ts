import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { qiankunWindow } from "vite-plugin-qiankun/dist/helper";
import type { Component } from "vue";

// 处理在主应用下的路由
const getRouterBase = () => {
  // 判断是否运行在qiankun环境中
  if (qiankunWindow.__POWERED_BY_QIANKUN__) {
    return "/vue3";
  }
  return "/";
};

// 初始路由配置为空
const routes: Array<RouteRecordRaw> = [];

// 创建路由实例
const router = createRouter({
  history: createWebHistory(getRouterBase()),
  routes,
});

// 路由配置项接口
interface RouteConfigItem {
  path: string;
  name: string;
  componentName: string;
  children?: RouteConfigItem[];
  meta?: Record<string, any>;
}

// 根据路由配置描述生成实际路由对象
export function generateRoutes(routeConfig: Array<RouteConfigItem>): Array<RouteRecordRaw> {
  // 组件映射表
  const componentMap: Record<string, () => Promise<Component>> = {
    Home: () => import("../views/Home.vue"),
    About: () => import("../views/About.vue"),
  };

  return routeConfig.map((item) => {
    let component;

    // 根据componentName从映射表中获取组件
    if (item.componentName && componentMap[item.componentName]) {
      component = componentMap[item.componentName];
    } else {
      console.warn(`[Vue3子应用] 未找到组件: ${item.componentName}`);
      // 提供一个默认组件避免错误
      component = () => import("../views/Home.vue");
    }

    // 创建符合RouteRecordRaw类型的路由配置
    const route: RouteRecordRaw = {
      path: item.path,
      name: item.name,
      component,
      ...(item.meta ? { meta: item.meta } : {}),
    };

    return route;
  });
}

// 注册动态路由方法
export function registerRoutes(routeConfig: Array<RouteConfigItem>) {
  console.log("[Vue3子应用] 注册动态路由:", routeConfig);

  // 生成路由配置
  const generatedRoutes = generateRoutes(routeConfig);

  // 清除所有现有路由
  router.getRoutes().forEach((route) => {
    if (route.name) {
      router.removeRoute(route.name);
    }
  });

  // 添加新路由
  generatedRoutes.forEach((route) => {
    router.addRoute(route);
  });

  console.log("[Vue3子应用] 路由注册完成，当前路由:", router.getRoutes());
}

// 独立运行时，添加默认路由
if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  const defaultRoutes: RouteConfigItem[] = [
    {
      path: "/",
      name: "Home",
      componentName: "Home",
    },
    {
      path: "/about",
      name: "About",
      componentName: "About",
    },
  ];

  registerRoutes(defaultRoutes);
}

export default router; 