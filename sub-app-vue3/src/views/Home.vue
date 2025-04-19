<template>
  <div class="home">
    <div class="logo-container">
      <img src="../assets/logo.svg" alt="Vue 3 Logo" class="logo" />
    </div>
    <h1>{{ t('home.title') }}</h1>
    <p>{{ t('home.description') }}</p>
    <div class="navigation">
      <router-link to="/" class="nav-link">{{ t('home.nav.home') }}</router-link>
      <router-link to="/about" class="nav-link">{{ t('home.nav.about') }}</router-link>
    </div>
    <div v-if="debug" class="debug-info">
      <p>当前语言: {{ currentLang }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  name: 'HomeView',
  setup() {
    const { t, locale } = useI18n();
    const debug = ref(false); // 设置为true可以显示调试信息
    const currentLang = computed(() => locale.value);

    return {
      t,
      debug,
      currentLang
    };
  }
});
</script>

<style scoped>
.home {
  text-align: center;
  padding: 2rem;
}

.logo-container {
  margin-bottom: 2rem;
}

.logo {
  width: 180px;
  height: 180px;
  animation: logo-spin 10s infinite linear;
}

@keyframes logo-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.navigation {
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.nav-link {
  padding: 0.5rem 1rem;
  background-color: #3498db;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.nav-link:hover {
  background-color: #2980b9;
}

.debug-info {
  margin-top: 20px;
  padding: 10px;
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 4px;
  text-align: left;
}
</style> 