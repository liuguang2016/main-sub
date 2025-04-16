<template>
  <div class="about">
    <h1>关于 Vue 3 子应用</h1>
    <p>这是基于 Vue 3 和 TypeScript 构建的微前端子应用。</p>
    <p>本子应用演示了如何通过 qiankun 微前端框架与主应用进行集成。</p>
    <div class="navigation">
      <router-link to="/" class="nav-link">返回首页</router-link>
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