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

<script>
export default {
  name: 'AboutView',
}
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