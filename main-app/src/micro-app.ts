import { registerMicroApps, start, RegistrableApp } from 'qiankun';

// 微应用列表
const microApps: RegistrableApp<any>[] = [
  {
    name: 'vue3App',
    entry: '//localhost:8081',
    container: '#subapp-container',
    activeRule: '/vue3',
  },
  {
    name: 'vue2App',
    entry: '//localhost:8082',
    container: '#subapp-container',
    activeRule: '/vue2',
  },
];

// 注册微应用
export const registerApps = () => {
  registerMicroApps(microApps, {
    beforeLoad: [
      (app: RegistrableApp<any>) => {
        console.log('[主应用] 加载前', app.name);
        return Promise.resolve();
      },
    ],
    beforeMount: [
      (app: RegistrableApp<any>) => {
        console.log('[主应用] 挂载前', app.name);
        return Promise.resolve();
      },
    ],
    afterMount: [
      (app: RegistrableApp<any>) => {
        console.log('[主应用] 挂载后', app.name);
        return Promise.resolve();
      },
    ],
    beforeUnmount: [
      (app: RegistrableApp<any>) => {
        console.log('[主应用] 卸载前', app.name);
        return Promise.resolve();
      },
    ],
    afterUnmount: [
      (app: RegistrableApp<any>) => {
        console.log('[主应用] 卸载后', app.name);
        return Promise.resolve();
      },
    ],
  });

  // 启动 qiankun
  start({
    sandbox: {
      experimentalStyleIsolation: true, // 开启样式隔离
    },
  });
}; 