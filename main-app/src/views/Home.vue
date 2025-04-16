<template>
  <div class="home">
    <h2>{{ $t('home.welcome') }}</h2>
    <p>{{ $t('home.description') }}</p>
    <div class="cards">
      <div class="card" @click="$router.push('/vue3')">
        <h3>{{ $t('home.vue3Card.title') }}</h3>
        <p>{{ $t('home.vue3Card.desc') }}</p>
      </div>
      <div class="card" @click="$router.push('/vue2')">
        <h3>{{ $t('home.vue2Card.title') }}</h3>
        <p>{{ $t('home.vue2Card.desc') }}</p>
      </div>
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
  padding: 2rem 0;
}

.cards {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 2rem;
}

.card {
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 1.5rem;
  width: 200px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

h2 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

h3 {
  color: #2c3e50;
  margin-top: 0;
}
</style> 