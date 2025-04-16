<template>
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>

<script lang="ts">
import { defineComponent, inject, provide } from 'vue';
import { MicroAppStateActions } from 'qiankun';

export default defineComponent({
  name: 'App',
  setup() {
    // 这个inject是从应用实例中注入的customGlobalState
    const actions = inject<MicroAppStateActions>('qiankunGlobalActions');

    // 再次提供给组件树，让子组件能够注入它
    if (actions) {
      provide('qiankunGlobalActions', actions);
    }
  }
});
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

* {
  box-sizing: border-box;
}
</style> 