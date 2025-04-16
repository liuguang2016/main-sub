// 为 TypeScript 添加类型声明
declare global {
  interface Window {
    __POWERED_BY_QIANKUN__?: boolean;
    __INJECTED_PUBLIC_PATH_BY_QIANKUN__?: string;
  }
  
  // eslint-disable-next-line no-var
  var __webpack_public_path__: string;
}

// 动态设置 webpack public path, 用于在微前端环境下正确加载资源
if (window.__POWERED_BY_QIANKUN__) {
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__ as string;
}

export {}; 