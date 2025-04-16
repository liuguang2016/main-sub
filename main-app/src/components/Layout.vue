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
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';
import LanguageSwitcher from './LanguageSwitcher.vue';

export default defineComponent({
  name: 'LayoutComponent',
  components: {
    LanguageSwitcher
  },
  setup() {
    const { t } = useI18n();
    
    return {
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
</style>