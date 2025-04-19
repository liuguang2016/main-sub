import './public-path';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { renderWithQiankun, qiankunWindow, QiankunProps } from "vite-plugin-qiankun/dist/helper";
import i18n, { setLang } from "./i18n";

// 定义需要暴露给主应用的资源
const appResources = {
  vue3Logo: "src/assets/logo.svg",
  // 可以添加更多资源...
};

let instance: any = null;

// 向主应用注册资源的函数
function registerResources() {
  if (window.registerMicroAppResources) {
    const baseUrl = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__ || '//localhost:8081';
    console.log('[Vue3子应用] 向主应用注册资源, baseUrl:', baseUrl);
    window.registerMicroAppResources('vue3App', baseUrl, appResources);
  }
}

// 渲染函数
function render(props: QiankunProps = {}) {
  const { container, actions } = props;
  
  console.log("[Vue3子应用] 接收到props:", props);
  console.log("[Vue3子应用] actions对象:", actions);

  // 清理可能存在的旧实例
  if (instance) {
    instance.unmount();
    instance = null;
  }

  // 创建Vue应用实例
  instance = createApp(App);

  // 提供qiankun actions给整个应用
  if (actions) {
    instance.provide("qiankunActions", actions);
  }

  // 使用路由和i18n
  instance.use(router);
  instance.use(i18n);

  // 监听全局状态变化
  if (actions) {
    // 立即检查当前全局状态
    actions.onGlobalStateChange((state: Record<string, any>, prev: Record<string, any>) => {
      console.log("[Vue3子应用] 全局状态变更:", state, prev);

      // 如果语言发生变化，更新子应用语言
      if (state.lang && state.lang !== prev?.lang) {
        console.log("[Vue3子应用] 语言变更为:", state.lang);
        // 修改i18n语言
        i18n.global.locale.value = state.lang;
        // 保存到本地
        setLang(state.lang);

        // 触发自定义事件通知整个应用
        window.dispatchEvent(
          new CustomEvent("vue3-language-changed", {
            detail: { lang: state.lang },
          })
        );
      }
    }, true); // true表示立即触发一次回调
  }

  // 确定挂载点
  const mountElement = container ? container.querySelector("#app") : document.querySelector("#app");

  if (!mountElement) {
    console.error("[Vue3子应用] 找不到挂载点，创建临时挂载点");
    // 如果不存在挂载点，创建一个
    const el = document.createElement("div");
    el.id = "app";
    if (container) {
      container.appendChild(el);
    } else {
      document.body.appendChild(el);
    }
  }

  // 挂载应用
  console.log("[Vue3子应用] 正在挂载到", container ? "qiankun容器" : "独立运行模式");
  instance.mount(container ? container.querySelector("#app") : "#app");
}

// 导出微前端生命周期钩子
renderWithQiankun({
  mount(props?: QiankunProps) {
    console.log("[vue3] Vue3子应用mounted", props);
    // 注册资源
    registerResources();
    render(props || {});
  },
  bootstrap() {
    console.log("[vue3] Vue3子应用bootstraped");
  },
  unmount() {
    console.log("[vue3] Vue3子应用unmounted");
    if (instance) {
      instance.unmount();
      instance = null;
    }
  },
  update(props?: QiankunProps) {
    console.log("[vue3] Vue3子应用updated", props);
  },
});

// 独立运行时
if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  render({});
}

// 为了TypeScript类型定义
declare global {
  interface Window {
    __POWERED_BY_QIANKUN__?: boolean;
    __INJECTED_PUBLIC_PATH_BY_QIANKUN__?: string;
    registerMicroAppResources?: (appName: string, baseUrl: string, assets: Record<string, string>) => void;
  }
} 