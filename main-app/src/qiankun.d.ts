declare module "qiankun" {
  export interface RegistrableApp<T = any> {
    name: string;
    entry: string;
    container: string | HTMLElement;
    activeRule: string | ((location: Location) => boolean);
    props?: object | ((props: object) => Promise<any>);
    loader?: (loading: boolean) => void;
  }

  export function registerMicroApps<T = any>(apps: Array<RegistrableApp<T>>, lifeCycles?: LifeCycles<T>): void;

  export function loadMicroApp<T = any>(app: RegistrableApp<T>, configuration?: Configuration): any;

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
}
