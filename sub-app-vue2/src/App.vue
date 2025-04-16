<template>
  <div id="app" class="app-container">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
.app-container {
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 0;
  padding: 20px;
  box-sizing: border-box;
  border: 2px solid #e74c3c;
  border-radius: 8px;
}

h1, h2 {
  color: #e74c3c;
}
</style> 