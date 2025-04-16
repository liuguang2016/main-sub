import Vue from "vue";
import VueI18n from "vue-i18n";
import zh from "./zh";
import en from "./en";

Vue.use(VueI18n);

// 获取当前语言或使用默认语言
export const getLang = () => localStorage.getItem("qiankun-i18n-language") || "zh";

// 设置语言并保存到localStorage
export const setLang = (lang) => {
  localStorage.setItem("qiankun-i18n-language", lang);
  return lang;
};

// 创建i18n实例
const i18n = new VueI18n({
  locale: getLang(),
  fallbackLocale: "zh",
  messages: {
    zh,
    en,
  },
  silentTranslationWarn: true,
});

export default i18n;
