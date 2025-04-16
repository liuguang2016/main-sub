import './public-path';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import i18n, { setLang } from "./i18n";

Vue.config.productionTip = false;

let instance = null;

// 渲染函数
function render(props = {}) {
  const { container, actions } = props;

  // 创建Vue实例
  instance = new Vue({
    router,
    i18n,
    render: (h) => h(App),
  }).$mount(container ? container.querySelector("#app") : "#app");

  // 监听全局状态变化
  if (actions) {
    actions.onGlobalStateChange((state, prev) => {
      console.log("[Vue2子应用] 全局状态变更:", state, prev);

      // 如果语言发生变化，更新子应用语言
      if (state.language && state.language !== prev?.language) {
        console.log("[Vue2子应用] 语言变更为:", state.language);
        // 修改i18n语言
        i18n.locale = state.language;
        // 保存到本地
        setLang(state.language);
      }
    }, true);
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
  console.log('[vue2] Vue2子应用mounted', props);
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