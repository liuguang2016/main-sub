<template>
  <div class="app-container">
    <router-view v-slot="{ Component, route }">
      <keep-alive>
        <component
          :is="Component"
          :key="route.path"
          v-if="Component && route.meta.keepAlive !== false"
        />
      </keep-alive>
      <component
        :is="Component"
        :key="route.path + refreshKey"
        v-if="Component && route.meta.keepAlive === false"
      />
    </router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, onMounted, onUnmounted, watch, provide } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter, useRoute } from 'vue-router';

export default defineComponent({
  name: 'App',
  setup() {
    const { locale } = useI18n();
    const router = useRouter();
    const route = useRoute();
    const currentLang = computed(() => locale.value);
    const refreshKey = ref(0);
    
    // 提供路由实例给子组件
    provide('appRouter', router);
    provide('appRoute', route);

    // 监听子应用内部的语言变化事件
    const handleLanguageChange = (event: CustomEvent) => {
      console.log('[Vue3子应用App] 接收到语言变化事件:', event.detail);
      refreshKey.value++; // 触发视图刷新
    };

    // 监听qiankun全局状态变化导致的语言变化
    const handleQiankunLangChange = () => {
      console.log('[Vue3子应用App] qiankun语言变化更新, 当前语言:', currentLang.value);
      refreshKey.value++; // 触发视图刷新
    };

    onMounted(() => {
      window.addEventListener('vue3-language-changed', handleLanguageChange as EventListener);
      console.log('[Vue3子应用App] 已挂载语言变化监听器, 当前语言:', currentLang.value);
      
      // 添加对locale变化的监听
      watch(locale, (newValue) => {
        console.log('[Vue3子应用App] i18n locale变化:', newValue);
        handleQiankunLangChange();
      });
      
      // 监听路由错误
      router.onError((error) => {
        console.error('[Vue3子应用App] 路由错误:', error);
      });
    });

    onUnmounted(() => {
      window.removeEventListener('vue3-language-changed', handleLanguageChange as EventListener);
      console.log('[Vue3子应用App] 已移除语言变化监听器');
    });

    return {
      currentLang,
      refreshKey
    };
  }
});
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
  border: 2px solid #3498db;
  border-radius: 8px;
}

h1, h2 {
  color: #3498db;
}
</style> 