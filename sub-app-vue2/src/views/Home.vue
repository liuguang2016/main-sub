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

<script>
export default {
  name: 'HomeView',
}
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
  background-color: #e74c3c;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.nav-link:hover {
  background-color: #c0392b;
}
</style> 