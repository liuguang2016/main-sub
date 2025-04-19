/**
 * 微应用资源注册表类型定义
 */
interface ResourceRegistry {
  [appName: string]: {
    baseUrl: string;
    assets: { [key: string]: string };
  };
}

/**
 * 资源注册表：存储所有微应用注册的资源映射
 */
export const resourceRegistry: ResourceRegistry = {};

/**
 * 微应用资源注册函数
 * @param appName 微应用名称
 * @param baseUrl 微应用基础URL
 * @param assets 资源映射对象
 */
export function registerMicroAppResources(appName: string, baseUrl: string, assets: { [key: string]: string }) {
  console.log(`[主应用] 注册${appName}资源:`, assets);
  resourceRegistry[appName] = { baseUrl, assets };

  // 触发资源更新事件
  window.dispatchEvent(
    new CustomEvent("micro-app-resources-updated", {
      detail: { appName, resourceCount: Object.keys(assets).length },
    })
  );
}

/**
 * 获取微应用资源URL
 * @param appName 微应用名称
 * @param resourceKey 资源键名
 * @returns 完整资源URL
 */
export function getMicroAppResource(appName: string, resourceKey: string): string {
  if (!resourceRegistry[appName]) {
    console.warn(`[主应用] 微应用资源未注册: ${appName}`);
    return "";
  }

  if (!resourceRegistry[appName].assets[resourceKey]) {
    console.warn(`[主应用] 资源不存在: ${appName} - ${resourceKey}`);
    return "";
  }

  const { baseUrl, assets } = resourceRegistry[appName];
  return `${baseUrl}/${assets[resourceKey]}`;
}

/**
 * 获取微应用的所有资源列表
 * @param appName 微应用名称
 * @returns 资源键名列表
 */
export function getMicroAppResourceList(appName: string): string[] {
  if (!resourceRegistry[appName]) {
    return [];
  }

  return Object.keys(resourceRegistry[appName].assets);
}

/**
 * 判断资源是否已注册
 * @param appName 微应用名称
 * @param resourceKey 资源键名
 * @returns 是否已注册
 */
export function hasMicroAppResource(appName: string, resourceKey: string): boolean {
  return !!resourceRegistry[appName]?.assets[resourceKey];
}

// 声明全局注册函数类型
declare global {
  interface Window {
    registerMicroAppResources?: typeof registerMicroAppResources;
  }
}
