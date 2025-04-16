<template>
  <div class="subapp-container">
    <div id="microAppContainer">
      <div id="app"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted } from 'vue';

export default defineComponent({
  name: 'SubappView',
  setup() {
    onMounted(() => {
      console.log('[主应用] Subapp组件已挂载，微应用容器已准备就绪');
    });

    onUnmounted(() => {
      console.log('[主应用] Subapp组件已卸载');
    });

    return {};
  }
});
</script>

<style scoped>
.subapp-container {
  padding: 1rem;
  min-height: 500px;
  border: 1px solid #eee;
  border-radius: 8px;
  margin-top: 1rem;
}

#microAppContainer {
  width: 100%;
  height: 100%;
  min-height: 480px;
}

#app {
  height: 100%;
}
</style> 