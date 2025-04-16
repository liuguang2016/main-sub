import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { registerApps } from './micro-app';

// 创建Vue应用
const app = createApp(App);
// 使用路由
app.use(router);
// 挂载应用
app.mount('#app');

// 注册并启动微应用
registerApps(); 