import { createApp } from 'vue';
import App from './App.vue';
import router, { setMicroActions } from "./router";
import i18n from "./i18n";
// 移除已被弃用的initGlobalState
import { MicroAppStateActions } from "qiankun";
import { initQiankun } from "./micro-app";
import { getLang } from "./i18n";

// 创建Vue应用实例
const app = createApp(App);

// 初始化全局状态 - 不再使用qiankun的initGlobalState
const initialState = { lang: getLang() };

// 定义全局状态和回调
let globalState = initialState;
const callbacks: Array<(state: Record<string, any>, prevState: Record<string, any>) => void> = [];

// 创建一个自定义的MicroAppStateActions对象
const customGlobalState: MicroAppStateActions = {
  onGlobalStateChange(callback, fireImmediately) {
    callbacks.push(callback);
    if (fireImmediately) {
      callback(globalState, globalState);
    }
  },

  setGlobalState(state) {
    const prevState = { ...globalState };
    globalState = { ...globalState, ...state };
    callbacks.forEach((callback) => callback(globalState, prevState));
    return true;
  },

  offGlobalStateChange() {
    callbacks.length = 0;
    return true;
  },
};

// 监听全局状态变更
customGlobalState.onGlobalStateChange((state, prev) => {
  console.log("[主应用] 全局状态变更:");
  console.log("变更前:", prev);
  console.log("变更后:", state);
});

// 将全局状态操作对象传递给路由模块
setMicroActions(customGlobalState);

// 为整个应用提供全局状态管理对象
app.provide("qiankunGlobalActions", customGlobalState);

// 使用router和i18n
app.use(router);
app.use(i18n);

// 挂载应用
app.mount("#app");

// 初始化qiankun环境
initQiankun(); 