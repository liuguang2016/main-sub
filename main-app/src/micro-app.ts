import { start, loadMicroApp, MicroApp, RegistrableApp, MicroAppStateActions } from "qiankun";

// 微应用配置列表
export const microApps: RegistrableApp[] = [
  {
    name: "vue2App",
    entry: "//localhost:8082",
    container: "#microAppContainer",
    activeRule: "/vue2",
  },
  {
    name: "vue3App",
    entry: "//localhost:8081",
    container: "#microAppContainer",
    activeRule: "/vue3",
  },
];

// 微应用实例缓存
export const microAppInstances: Record<string, MicroApp | null> = {
  vue2App: null,
  vue3App: null,
};

// 初始化qiankun环境
export function initQiankun() {
  // 启动qiankun
  start({
    prefetch: false, // 禁用预加载
    sandbox: {
      experimentalStyleIsolation: true, // 开启实验性的样式隔离
    },
  });
}

// 加载微应用的方法
export function loadMicroAppByName(name: string): Promise<MicroApp | null> {
  const app = microApps.find((app) => app.name === name);
  if (!app) {
    console.error(`[主应用] 未找到名为 ${name} 的微应用配置`);
    return Promise.resolve(null);
  }

  try {
    // 如果已经加载过，则返回缓存的实例
    if (microAppInstances[name]) {
      return Promise.resolve(microAppInstances[name]);
    }

    // 加载微应用
    const microApp = loadMicroApp(app, {
      singular: true, // 确保同一时间只有一个微应用实例
    });

    // 缓存微应用实例
    microAppInstances[name] = microApp;

    return Promise.resolve(microApp);
  } catch (error) {
    console.error(`[主应用] 加载微应用 ${name} 失败:`, error);
    return Promise.resolve(null);
  }
}

// 卸载微应用
export function unloadMicroApp(name: string): Promise<void> {
  const instance = microAppInstances[name];
  if (instance) {
    return instance
      .unmount()
      .then(() => {
        microAppInstances[name] = null;
        console.log(`[主应用] 已卸载微应用 ${name}`);
      })
      .catch((error) => {
        console.error(`[主应用] 卸载微应用 ${name} 失败:`, error);
      });
  }
  return Promise.resolve();
}

// 为了兼容router/index.ts中的导入，添加loadApp和unloadApp函数作为loadMicroAppByName和unloadMicroApp的封装
export function loadApp(name: string, actions: MicroAppStateActions): Promise<MicroApp | null> {
  console.log(`[主应用] 正在加载微应用 ${name}，并传递全局状态`, actions);
  const app = microApps.find((app) => app.name === name);

  if (!app) {
    console.error(`[主应用] 未找到名为 ${name} 的微应用配置`);
    return Promise.resolve(null);
  }

  try {
    // 如果已经加载过，则返回缓存的实例
    if (microAppInstances[name]) {
      return Promise.resolve(microAppInstances[name]);
    }

    // 加载微应用并传入全局状态
    const microApp = loadMicroApp({
      ...app,
      props: { actions }, // 确保actions正确传递
    } as any);

    // 缓存微应用实例
    microAppInstances[name] = microApp;

    return Promise.resolve(microApp);
  } catch (error) {
    console.error(`[主应用] 加载微应用 ${name} 失败:`, error);
    return Promise.resolve(null);
  }
}

export function unloadApp(name: string): Promise<void> {
  console.log(`[主应用] 正在卸载微应用 ${name}`);
  return unloadMicroApp(name);
}
