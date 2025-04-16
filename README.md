# 微前端示例项目

## 项目介绍

这是一个基于 qiankun 的微前端示例项目，包含一个使用 Vue 3 构建的主应用和两个子应用：
- 主应用（Vue 3 + TypeScript）
- Vue 3 子应用
- Vue 2 子应用

## 技术栈

- 主应用：Vue 3 + TypeScript + Vite
- Vue 3 子应用：Vue 3 + TypeScript + Vite
- Vue 2 子应用：Vue 2 + Vue CLI
- 微前端框架：qiankun
- 包管理工具：pnpm

## 项目结构

```
.
├── main-app         # 主应用（Vue 3）
├── sub-app-vue3     # Vue 3 子应用
├── sub-app-vue2     # Vue 2 子应用
├── pnpm-workspace.yaml # pnpm 工作空间配置
└── package.json
```

## 开发环境配置

确保安装了 Node.js 14+ 和 pnpm 7+

```bash
# 安装 pnpm（如果尚未安装）
npm install -g pnpm

# 安装所有依赖
pnpm install:all

# 启动所有应用
pnpm dev
```

启动后访问：
- 主应用：http://localhost:8080
- Vue 3 子应用：http://localhost:8081
- Vue 2 子应用：http://localhost:8082

也可以只通过主应用访问所有内容：http://localhost:8080

## 构建生产环境

```bash
pnpm build
``` 