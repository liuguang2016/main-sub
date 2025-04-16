import './public-path';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

let instance: any = null;

// 渲染函数
function render(props: any = {}) {
  const { container } = props;
  
  // 创建Vue应用实例
  instance = createApp(App);
  
  // 使用路由
  instance.use(router);
  
  // 挂载应用
  instance.mount(container ? container.querySelector('#app') : '#app');
}

// 独立运行时
if (!window.__POWERED_BY_QIANKUN__) {
  render();
}

// 导出微前端生命周期钩子
export async function bootstrap() {
  console.log('[vue3] Vue3子应用bootstraped');
}

export async function mount(props: any) {
  console.log('[vue3] Vue3子应用mounted', props);
  render(props);
}

export async function unmount() {
  console.log('[vue3] Vue3子应用unmounted');
  instance.unmount();
  instance = null;
}

// 增加可选的更新生命周期钩子
export async function update(props: any) {
  console.log('[vue3] Vue3子应用updated', props);
} 