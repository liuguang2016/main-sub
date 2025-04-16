<template>
  <div id="app" class="app-container">
    <router-view :key="refreshKey"/>
  </div>
</template>

<script>
import { getLang } from './i18n';

export default {
  name: 'App',
  data() {
    return {
      refreshKey: 0,
      currentLang: getLang()
    }
  },
  created() {
    // 监听语言变化事件
    this.$root.$on('language-changed', this.handleLanguageChange);
    console.log("[Vue2子应用App] 已创建语言变化监听器, 当前语言:", this.currentLang);
  },
  beforeDestroy() {
    // 移除事件监听
    this.$root.$off('language-changed', this.handleLanguageChange);
    console.log("[Vue2子应用App] 已移除语言变化监听器");
  },
  methods: {
    handleLanguageChange(lang) {
      console.log("[Vue2子应用App] 接收到语言变化:", lang);
      this.currentLang = lang;
      this.refreshKey++; // 触发视图刷新
    }
  }
}
</script>

<style>
.app-container {
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 0;
  padding: 20px;
  box-sizing: border-box;
  border: 2px solid #e74c3c;
  border-radius: 8px;
}

h1, h2 {
  color: #e74c3c;
}
</style> 