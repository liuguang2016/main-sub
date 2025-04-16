import './public-path';
import Vue from 'vue';
import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;

let instance = null;

// 渲染函数
function render(props = {}) {
  const { container } = props;
  
  instance = new Vue({
    router,
    render: h => h(App)
  }).$mount(container ? container.querySelector('#app') : '#app');
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