import './public-path';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { renderWithQiankun, qiankunWindow, QiankunProps } from "vite-plugin-qiankun/dist/helper";

let instance: any = null;

// 渲染函数
function render(props: QiankunProps = {}) {
  const { container } = props;

  // 创建Vue应用实例
  instance = createApp(App);

  // 使用路由
  instance.use(router);

  // 挂载应用
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