<template>
  <div class="home">
    <h2>欢迎使用微前端示例</h2>
    <p>这是基于 qiankun 的微前端解决方案示例，主应用使用 Vue 3 + TypeScript 构建。</p>
    <div class="cards">
      <div class="card" @click="$router.push('/vue3')">
        <h3>Vue 3 子应用</h3>
        <p>使用 Vue 3 构建的子应用示例</p>
      </div>
      <div class="card" @click="$router.push('/vue2')">
        <h3>Vue 2 子应用</h3>
        <p>使用 Vue 2 构建的子应用示例</p>
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