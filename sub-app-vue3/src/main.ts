import './public-path';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { renderWithQiankun, qiankunWindow, QiankunProps } from "vite-plugin-qiankun/dist/helper";
import i18n, { setLang } from "./i18n";

let instance: any = null;

// 渲染函数
function render(props: QiankunProps = {}) {
  const { container, actions } = props;

  // 清理可能存在的旧实例
  if (instance) {
    instance.unmount();
    instance = null;
  }

  // 创建Vue应用实例
  instance = createApp(App);

  // 使用路由和i18n
  instance.use(router);
  instance.use(i18n);

  // 监听全局状态变化
  if (actions) {
    actions.onGlobalStateChange((state: Record<string, any>, prev: Record<string, any>) => {
      console.log("[Vue3子应用] 全局状态变更:", state, prev);

      // 如果语言发生变化，更新子应用语言
      if (state.language && state.language !== prev?.language) {
        console.log("[Vue3子应用] 语言变更为:", state.language);
        // 修改i18n语言
        i18n.global.locale.value = state.language;
        // 保存到本地
        setLang(state.language);
      }
    }, true);
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