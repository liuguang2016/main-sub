<template>
  <div class="about">
    <h1>{{ $t('about.title') }}</h1>
    <p>{{ $t('about.description') }}</p>
    <p>{{ $t('about.integrationInfo') }}</p>
    <div class="navigation">
      <router-link to="/" class="nav-link">{{ $t('about.backHome') }}</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AboutView',
});
</script>

<style scoped>
.about {
  text-align: center;
  padding: 2rem;
}

.navigation {
  margin-top: 2rem;
  display: flex;
  justify-content: center;
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