<template>
  <div class="home">
    <h1>{{ $t('home.title') }}</h1>
    <p>{{ $t('home.description') }}</p>
    <div class="navigation">
      <router-link to="/" class="nav-link">{{ $t('home.nav.home') }}</router-link>
      <router-link to="/about" class="nav-link">{{ $t('home.nav.about') }}</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HomeView',
});
</script>

<style scoped>
.home {
  text-align: center;
  padding: 2rem;
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
</style> 