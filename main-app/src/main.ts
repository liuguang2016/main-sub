import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { registerApps } from './micro-app';
import i18n from "./i18n";
import { initGlobalState } from "qiankun";
import { getLang } from "./i18n";

// 创建微应用间通信的全局状态
const actions = initGlobalState({
  language: getLang(), // 初始语言状态
});

// 监听全局状态变化
actions.onGlobalStateChange((state: Record<string, any>, prev: Record<string, any>) => {
  console.log("[主应用] 全局状态变更:", state, prev);
});

// 创建Vue应用
const app = createApp(App);
// 提供全局状态给子组件使用
app.provide('qiankunGlobalActions', actions);
// 使用路由和i18n
app.use(router);
app.use(i18n);
// 挂载应用
app.mount('#app');

// 注册并启动微应用
registerApps(actions); 