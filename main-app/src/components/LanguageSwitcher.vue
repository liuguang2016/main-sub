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
import { setLang } from '../i18n';

export default defineComponent({
  name: 'LanguageSwitcher',
  setup() {
    const { locale, t } = useI18n();
    const currentLang = computed(() => locale.value);
    
    // 注入全局状态操作对象
    const actions = inject<MicroAppStateActions | null>('qiankunGlobalActions', null);
    
    // 可用语言列表
    const availableLanguages = [
      { code: 'zh', name: t('language.zh') },
      { code: 'en', name: t('language.en') }
    ];
    
    // 切换语言方法
    const changeLanguage = (lang: string) => {
      // 更新当前应用语言
      locale.value = lang;
      
      // 保存语言设置
      setLang(lang);
      
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
  gap: 0.5rem;
}

button {
  background: transparent;
  color: white;
  border: 1px solid white;
  border-radius: 4px;
  padding: 0.25rem 0.5rem;
  cursor: pointer;
  transition: all 0.3s;
}

button:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

button.active {
  background-color: white;
  color: #2c3e50;
}
</style> 