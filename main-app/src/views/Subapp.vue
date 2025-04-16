<template>
  <div class="subapp-container">
    <div id="microAppContainer" ref="containerRef">
      <div id="app"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref, nextTick } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'SubappView',
  setup() {
    const containerRef = ref<HTMLElement | null>(null);
    const route = useRoute();
    
    // 自定义事件通知容器已准备好
    const notifyContainerReady = () => {
      window.dispatchEvent(new CustomEvent('microapp-container-ready', { 
        detail: { container: containerRef.value } 
      }));
    };
    
    onMounted(async () => {
      // 确保DOM已更新
      await nextTick();
      
      if (containerRef.value) {
        console.log('[主应用] Subapp组件已挂载，微应用容器已准备就绪', route.meta.microApp);
        // 通知容器已准备就绪
        notifyContainerReady();
      } else {
        console.error('[主应用] Subapp组件已挂载，但容器引用不存在');
      }
    });

    onUnmounted(() => {
      console.log('[主应用] Subapp组件已卸载');
    });

    return {
      containerRef
    };
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