import { createApp } from 'vue';
import App from './App.vue';
import router from "./router";
import i18n from "./i18n";
// 导入initGlobalState
import { initGlobalState } from "qiankun";
import { initQiankun } from "./micro-app";
import { getLang } from "./i18n";
import { setMicroActions } from "./micro-app-manager";
import { registerMicroAppResources } from "./resource-registry";

// 将资源注册函数挂载到全局，供微应用调用
window.registerMicroAppResources = registerMicroAppResources;

// 创建Vue应用实例
const app = createApp(App);

// 初始化全局状态 - 使用qiankun的initGlobalState
const initialState = { lang: getLang() };
const actions = initGlobalState(initialState);

// 监听全局状态变更
actions.onGlobalStateChange((state, prev) => {
  console.log("[主应用] 全局状态变更:");
  console.log("变更前:", prev);
  console.log("变更后:", state);
});

// 将全局状态操作对象传递给微应用管理模块
setMicroActions(actions);

// 为整个应用提供全局状态管理对象
app.provide("qiankunGlobalActions", actions);

// 使用router和i18n
app.use(router);
app.use(i18n);

// 挂载应用
app.mount("#app");

// 初始化qiankun环境
initQiankun(); 