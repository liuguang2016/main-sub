import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  server: {
    port: 8080,
    cors: true,
    origin: "http://localhost:8080",
    hmr: true,
  },
  // 解决空白页面问题
  optimizeDeps: {
    include: ["vue", "vue-router"],
  },
  build: {
    minify: "terser",
    sourcemap: true,
  },
}); 