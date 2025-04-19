<template>
  <div class="layout">
    <header class="header">
      <h1 class="logo">{{ t('home.welcome') }}</h1>
      <nav class="nav">
        <router-link to="/" class="nav-link">{{ t('nav.home') }}</router-link>
        <router-link to="/vue3" class="nav-link">{{ t('nav.vue3App') }}</router-link>
        <router-link to="/vue2" class="nav-link">{{ t('nav.vue2App') }}</router-link>
      </nav>
      <language-switcher />
    </header>
    
    <!-- Vue3 Logo展示 - 添加条件渲染 -->
    <div class="micro-app-logo-container" v-if="hasVue3Logo">
      <micro-app-resource app-name="vue3App" resource-key="vue3Logo" width="80px" height="80px" />
    </div>
    
    <main class="main">
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </main>
    <footer class="footer">
      <p>{{ t('footer.copyright', { year: new Date().getFullYear() }) }}</p>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import LanguageSwitcher from './LanguageSwitcher.vue';
import MicroAppResource from './MicroAppResource.vue';
import { hasMicroAppResource } from '../resource-registry';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'LayoutComponent',
  components: {
    LanguageSwitcher,
    MicroAppResource
  },
  setup() {
    const { t } = useI18n();
    const route = useRoute();
    const hasVue3Logo = ref(false);
    
    // 检查Vue3 Logo资源是否可用
    const checkVue3Logo = () => {
      hasVue3Logo.value = hasMicroAppResource('vue3App', 'vue3Logo');
      console.log('[主应用] 检查Vue3 Logo资源:', hasVue3Logo.value ? '可用' : '不可用');
    };
    
    // 监听路由变化，检查资源
    watch(() => route.path, (newPath) => {
      if (newPath.startsWith('/vue3')) {
        // 给Vue3子应用一点加载时间
        setTimeout(checkVue3Logo, 500);
      }
    });
    
    // 监听资源更新事件
    const handleResourcesUpdated = (event: CustomEvent) => {
      if (event.detail?.appName === 'vue3App') {
        checkVue3Logo();
      }
    };
    
    onMounted(() => {
      // 初始检查
      checkVue3Logo();
      
      // 监听资源更新事件
      window.addEventListener('micro-app-resources-updated', 
        handleResourcesUpdated as EventListener);
      
      return () => {
        window.removeEventListener('micro-app-resources-updated', 
          handleResourcesUpdated as EventListener);
      };
    });
    
    return {
      t,
      hasVue3Logo
    };
  }
});
</script>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.header {
  background-color: #2c3e50;
  color: white;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  margin: 0;
  font-size: 1.5rem;
}

.nav {
  display: flex;
  gap: 1rem;
}

.nav-link {
  color: white;
  text-decoration: none;
  padding: 0.5rem;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.nav-link:hover,
.nav-link.router-link-active {
  background-color: rgba(255, 255, 255, 0.2);
}

.micro-app-logo-container {
  position: fixed;
  top: 80px;
  right: 20px;
  z-index: 100;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  padding: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
}

.main {
  flex: 1;
  padding: 1rem;
}

.footer {
  background-color: #f5f5f5;
  padding: 1rem;
  text-align: center;
  color: #666;
}
</style>