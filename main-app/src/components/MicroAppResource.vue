<template>
  <div class="micro-app-resource">
    <img 
      v-if="resourceUrl && !error" 
      :src="resourceUrl" 
      :alt="resourceKey"
      :style="imageStyle"
      class="resource-image"
      @error="handleImageError"
    />
    <div v-else-if="error" class="resource-error">
      {{ t('resources.loadError') }}
    </div>
    <div v-else-if="loading" class="resource-loading">
      {{ t('resources.loading') }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { getMicroAppResource, hasMicroAppResource } from '../resource-registry';

export default defineComponent({
  name: 'MicroAppResource',
  props: {
    appName: {
      type: String,
      required: true
    },
    resourceKey: {
      type: String,
      required: true
    },
    width: {
      type: String,
      default: 'auto'
    },
    height: {
      type: String,
      default: 'auto'
    }
  },
  setup(props) {
    const { t } = useI18n();
    const error = ref(false);
    const loading = ref(false); // 默认不显示加载状态
    const resourceUrl = ref('');
    
    // 更新资源URL
    const updateResourceUrl = () => {
      if (hasMicroAppResource(props.appName, props.resourceKey)) {
        resourceUrl.value = getMicroAppResource(props.appName, props.resourceKey);
        loading.value = false;
        error.value = false;
      } else {
        resourceUrl.value = '';
        // 不设置loading为true，因为我们使用v-if条件来控制外层组件的显示
      }
    };
    
    // 监听资源参数变化
    watch(() => [props.appName, props.resourceKey], updateResourceUrl);
    
    // 处理图片加载错误
    const handleImageError = () => {
      error.value = true;
      loading.value = false;
      console.error(`[主应用] 资源加载失败: ${props.appName} - ${props.resourceKey}`);
    };
    
    // 处理资源更新事件
    const handleResourcesUpdated = (event: CustomEvent) => {
      if (event.detail?.appName === props.appName) {
        updateResourceUrl();
      }
    };
    
    onMounted(() => {
      // 初始尝试获取资源
      updateResourceUrl();
      
      // 监听资源更新事件
      window.addEventListener('micro-app-resources-updated', 
        handleResourcesUpdated as EventListener);
      
      return () => {
        window.removeEventListener('micro-app-resources-updated', 
          handleResourcesUpdated as EventListener);
      };
    });
    
    // 计算样式
    const imageStyle = computed(() => ({
      width: props.width,
      height: props.height
    }));
    
    return {
      t,
      error,
      loading,
      resourceUrl,
      imageStyle,
      handleImageError
    };
  }
});
</script>

<style scoped>
.micro-app-resource {
  display: inline-block;
}

.resource-image {
  object-fit: contain;
  max-width: 100%;
}

.resource-error, .resource-loading {
  padding: 15px;
  background: #f5f5f5;
  border: 1px dashed #ddd;
  border-radius: 4px;
  color: #666;
  text-align: center;
}

.resource-error {
  color: #e74c3c;
}
</style> 