declare module "vite-plugin-qiankun/dist/helper" {
  export interface QiankunProps {
    container?: HTMLElement;
    name?: string;
    [key: string]: any;
  }

  export interface QiankunLifeCycle {
    bootstrap?: (props?: QiankunProps) => Promise<any> | void;
    mount?: (props?: QiankunProps) => Promise<any> | void;
    unmount?: (props?: QiankunProps) => Promise<any> | void;
    update?: (props?: QiankunProps) => Promise<any> | void;
  }

  export function renderWithQiankun(lifecycle: QiankunLifeCycle): void;

  export const qiankunWindow: Window & {
    __POWERED_BY_QIANKUN__?: boolean;
    __INJECTED_PUBLIC_PATH_BY_QIANKUN__?: string;
  };
}
