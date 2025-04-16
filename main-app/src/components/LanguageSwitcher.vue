<template>
  <div class="language-switcher">
    <button 
      v-for="lang in availableLanguages" 
      :key="lang.code" 
      @click="changeLanguage(lang.code)"
      :class="{ active: currentLang === lang.code }"
    >
      {{ lang.name }}
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, inject } from 'vue';
import { useI18n } from 'vue-i18n';
import { MicroAppStateActions } from 'qiankun';

export default defineComponent({
  name: 'LanguageSwitcher',
  setup() {
    const { locale } = useI18n();
    const currentLang = computed(() => locale.value);
    
    // 注入全局状态操作对象
    const actions = inject<MicroAppStateActions>('qiankunGlobalActions');
    
    // 可用语言列表
    const availableLanguages = [
      { code: 'zh', name: '中文' },
      { code: 'en', name: 'English' }
    ];
    
    // 切换语言方法
    const changeLanguage = (lang: string) => {
      // 更新当前应用语言
      locale.value = lang;
      
      // 更新全局状态
      if (actions) {
        actions.setGlobalState({ lang });
        console.log(`[主应用] 已设置全局语言为: ${lang}`);
      }
    };
    
    return {
      currentLang,
      availableLanguages,
      changeLanguage
    };
  }
});
</script>

<style scoped>
.language-switcher {
  display: flex;
  gap: 8px;
}

button {
  padding: 5px 10px;
  border: 1px solid #ddd;
  background-color: #f4f4f4;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.3s;
}

button:hover {
  background-color: #e0e0e0;
}

button.active {
  background-color: #4b8bf4;
  color: white;
  border-color: #3a7ce0;
}
</style> 