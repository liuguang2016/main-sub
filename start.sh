#!/bin/bash

# 安装所有依赖
echo "安装所有依赖..."
pnpm install

# 安装Vue3子应用依赖
echo "安装Vue3子应用依赖..."
cd sub-app-vue3
pnpm add vite-plugin-qiankun -D
pnpm add vue-i18n -S
cd ..

# 安装Vue2子应用依赖  
echo "安装Vue2子应用依赖..."
cd sub-app-vue2
pnpm add vue-i18n@^8.27.2 -S
cd ..

# 安装主应用依赖
echo "安装主应用依赖..."
cd main-app
pnpm add vue-i18n@^9.2.2 -S
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