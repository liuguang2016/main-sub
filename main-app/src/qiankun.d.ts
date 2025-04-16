declare module "qiankun" {
  export interface RegistrableApp<T = any> {
    name: string;
    entry: string;
    container: string | HTMLElement;
    activeRule: string | ((location: Location) => boolean);
    props?: object | ((props: object) => Promise<any>);
    loader?: (loading: boolean) => void;
  }

  export interface LoadableApp<T = any> {
    name: string;
    entry: string;
    container: string | HTMLElement;
    props?: object | ((props: object) => Promise<any>);
  }

  export interface MicroApp {
    mount: () => Promise<any>;
    unmount: () => Promise<any>;
    update: (customProps: any) => Promise<any>;
    getStatus: () => string;
    loadPromise: Promise<any>;
    bootstrapPromise: Promise<any>;
    mountPromise: Promise<any>;
    unmountPromise: Promise<any>;
  }

  export function registerMicroApps<T = any>(apps: Array<RegistrableApp<T>>, lifeCycles?: LifeCycles<T>): void;

  export function loadMicroApp<T = any>(app: LoadableApp<T>, configuration?: Configuration): MicroApp;

  export function start(options?: {
    prefetch?: boolean | "all" | string[];
    sandbox?:
      | boolean
      | {
          strictStyleIsolation?: boolean;
          experimentalStyleIsolation?: boolean;
          patchers?: Array<(code: string, url: string) => string>;
        };
    singular?: boolean | ((app: RegistrableApp<any>) => Promise<boolean>);
    fetch?: Function;
  }): void;

  export interface LifeCycles<T = any> {
    beforeLoad?: Array<(app: RegistrableApp<T>) => Promise<any>>;
    beforeMount?: Array<(app: RegistrableApp<T>) => Promise<any>>;
    afterMount?: Array<(app: RegistrableApp<T>) => Promise<any>>;
    beforeUnmount?: Array<(app: RegistrableApp<T>) => Promise<any>>;
    afterUnmount?: Array<(app: RegistrableApp<T>) => Promise<any>>;
  }

  export type Configuration = {
    singular?: boolean | ((app: RegistrableApp<any>) => Promise<boolean>);
    sandbox?:
      | boolean
      | {
          strictStyleIsolation?: boolean;
          experimentalStyleIsolation?: boolean;
        };
    fetch?: Function;
  };

  export interface MicroAppStateActions {
    onGlobalStateChange(callback: (state: Record<string, any>, prevState: Record<string, any>) => void, fireImmediately?: boolean): void;
    setGlobalState(state: Record<string, any>): boolean;
    offGlobalStateChange(): boolean;
  }

  export function initGlobalState(state: Record<string, any>): MicroAppStateActions;
}
