import { createI18n } from "vue-i18n";
import zh from "./zh";
import en from "./en";

// 获取当前语言或使用默认语言
export const getLang = () => localStorage.getItem("qiankun-i18n-language") || "zh";

// 设置语言并保存到localStorage
export const setLang = (lang: string) => {
  localStorage.setItem("qiankun-i18n-language", lang);
  return lang;
};

// 创建i18n实例
const i18n = createI18n({
  legacy: false, // 使用Composition API模式
  locale: getLang(),
  fallbackLocale: "zh",
  messages: {
    zh,
    en,
  },
  globalInjection: true, // 全局注入$t方法
  silentTranslationWarn: true,
  silentFallbackWarn: true,
});

export default i18n;
