#!/bin/bash

# 安装所有依赖
echo "安装所有依赖..."
pnpm install

# 安装Vue3子应用依赖
echo "安装Vue3子应用依赖..."
cd sub-app-vue3
pnpm add vite-plugin-qiankun -D
cd ..

# 确保启动顺序：先启动子应用，再启动主应用
echo "启动Vue2子应用..."
cd sub-app-vue2
pnpm dev &
cd ..

echo "启动Vue3子应用..."
cd sub-app-vue3
pnpm dev &
cd ..

echo "启动主应用..."
cd main-app
pnpm dev

# 添加等待以确保所有应用都已启动
wait 