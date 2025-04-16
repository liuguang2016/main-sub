<template>
  <div class="layout">
    <header class="header">
      <h1 class="logo">{{ t('home.welcome') }}</h1>
      <nav class="nav">
        <router-link to="/" class="nav-link">{{ t('nav.home') }}</router-link>
        <router-link to="/vue3" class="nav-link">{{ t('nav.vue3App') }}</router-link>
        <router-link to="/vue2" class="nav-link">{{ t('nav.vue2App') }}</router-link>
      </nav>
      <div class="lang-switch">
        <button 
          @click="changeLang('zh')" 
          :class="{ active: currentLang === 'zh' }"
        >
          {{ t('language.zh') }}
        </button>
        <button 
          @click="changeLang('en')" 
          :class="{ active: currentLang === 'en' }"
        >
          {{ t('language.en') }}
        </button>
      </div>
    </header>
    <main class="main">
      <router-view />
    </main>
    <footer class="footer">
      <p>{{ t('footer.copyright', { year: new Date().getFullYear() }) }}</p>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, inject } from 'vue';
import { useI18n } from 'vue-i18n';
import { getLang, setLang } from '../i18n';
import { MicroAppStateActions } from 'qiankun';

export default defineComponent({
  name: 'LayoutComponent',
  setup() {
    const { locale, t } = useI18n();
    const currentLang = ref(getLang());
    
    // 获取全局状态管理实例，添加默认值避免警告
    const actions = inject<MicroAppStateActions | null>('qiankunGlobalActions', null);
    
    const changeLang = (lang: string) => {
      // 修改i18n当前语言
      locale.value = lang;
      // 保存语言设置
      setLang(lang);
      currentLang.value = lang;
      
      // 设置全局状态，通知子应用
      if (actions) {
        actions.setGlobalState({ language: lang });
      }
    };
    
    return {
      currentLang,
      changeLang,
      t
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

.lang-switch {
  display: flex;
  gap: 0.5rem;
}

.lang-switch button {
  background: transparent;
  color: white;
  border: 1px solid white;
  border-radius: 4px;
  padding: 0.25rem 0.5rem;
  cursor: pointer;
  transition: all 0.3s;
}

.lang-switch button.active {
  background-color: white;
  color: #2c3e50;
}
</style>