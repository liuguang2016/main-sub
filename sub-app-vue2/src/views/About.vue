<template>
  <div class="about">
    <h1>关于 Vue 2 子应用</h1>
    <p>这是基于 Vue 2 构建的微前端子应用。</p>
    <p>本子应用演示了如何通过 qiankun 微前端框架与主应用进行集成。</p>
    <div class="navigation">
      <router-link to="/" class="nav-link">返回首页</router-link>
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