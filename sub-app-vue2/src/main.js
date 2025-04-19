import './public-path';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import i18n, { setLang } from "./i18n";

Vue.config.productionTip = false;

// 定义需要暴露给主应用的资源
const appResources = {
  // 可以添加Vue2的资源
  'vue2Logo': 'img/logo.png',
};

let instance = null;

// 向主应用注册资源的函数
function registerResources() {
  if (window.__POWERED_BY_QIANKUN__ && window.registerMicroAppResources) {
    const baseUrl = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__ || '//localhost:8082';
    console.log('[Vue2子应用] 向主应用注册资源, baseUrl:', baseUrl);
    window.registerMicroAppResources('vue2App', baseUrl, appResources);
  }
}

// 渲染函数
function render(props = {}) {
  const { container, actions } = props;
  
  console.log("[Vue2子应用] 接收到props:", props);
  console.log("[Vue2子应用] actions对象:", actions);

  // 创建Vue实例
  instance = new Vue({
    router,
    i18n,
    data() {
      return {
        actions, // 将actions存储在Vue实例中
      };
    },
    render: (h) => h(App),
  }).$mount(container ? container.querySelector("#app") : "#app");

  // 监听全局状态变化
  if (actions) {
    actions.onGlobalStateChange((state, prev) => {
      console.log("[Vue2子应用] 全局状态变更:", state, prev);

      // 如果语言发生变化，更新子应用语言
      if (state.lang && state.lang !== prev?.lang) {
        console.log("[Vue2子应用] 语言变更为:", state.lang);
        // 修改i18n语言
        i18n.locale = state.lang;
        // 保存到本地
        setLang(state.lang);

        // 通知Vue实例更新 - 使用根实例作为事件总线
        instance.$emit("language-changed", state.lang);
      }
    }, true); // true表示立即触发一次回调
  }
}

// 独立运行时
if (!window.__POWERED_BY_QIANKUN__) {
  render();
}

// 导出微前端生命周期钩子
export async function bootstrap() {
  console.log('[vue2] Vue2子应用bootstraped');
}

export async function mount(props) {
  console.log("[vue2] Vue2子应用mounted", props);
  // 注册资源
  registerResources();
  render(props);
}

export async function unmount() {
  console.log('[vue2] Vue2子应用unmounted');
  instance.$destroy();
  instance.$el.innerHTML = '';
  instance = null;
}

// 增加可选的更新生命周期钩子
export async function update(props) {
  console.log('[vue2] Vue2子应用updated', props);
} 