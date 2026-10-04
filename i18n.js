/**
 * i18n.js — 星球小捕手 国际化框架
 * 支持中英文切换，基于 data-i18n / data-i18n-html / data-i18n-placeholder 属性
 * 使用 localStorage 持久化语言偏好，自动注入导航栏语言切换按钮
 */
(function () {
  'use strict';

  var I18N = {
    lang: localStorage.getItem('pc_lang') || 'zh',

    /* ===== 共享翻译（导航栏 + 页脚，全站通用）===== */
    translations: {
      zh: {
        'nav.home': '首页',
        'nav.pdf_to_word': 'PDF转Word',
        'nav.pdf_to_image': 'PDF转图片',
        'nav.pdf_merge': 'PDF合并',
        'nav.pdf_split': 'PDF拆分',
        'nav.pdf_delete': 'PDF删除页面',
        'nav.pdf_watermark': 'PDF加水印',
        'nav.caj_to_pdf': 'CAJ转PDF',
        'nav.more': '更多工具',
        'nav.blog': '博客教程',
        'nav.changelog': '更新日志',
        'nav.about': '关于我们',
        'footer.tagline': '让每一个文档，都能自由转换',
        'footer.privacy': '隐私政策',
        'footer.terms': '服务条款',
        'footer.contact': '联系我们',
        'footer.copyright_l1': '© 2026 星球小捕手 · 版权所有 · PDF工具箱 永久免费',
        'footer.copyright_l2': '本站所有转换服务均在本地浏览器完成，不收集任何用户数据',
        'footer.home': '首页',
        'footer.website_label': '主网站',
        'footer.website_url': 'planetgis.cn'
      },
      en: {
        'nav.home': 'Home',
        'nav.pdf_to_word': 'PDF to Word',
        'nav.pdf_to_image': 'PDF to Image',
        'nav.pdf_merge': 'Merge PDF',
        'nav.pdf_split': 'Split PDF',
        'nav.pdf_delete': 'Delete Pages',
        'nav.pdf_watermark': 'Watermark',
        'nav.caj_to_pdf': 'CAJ to PDF',
        'nav.more': 'More Tools',
        'nav.blog': 'Blog',
        'nav.changelog': 'Changelog',
        'nav.about': 'About',
        'footer.tagline': 'Every document, freely converted',
        'footer.privacy': 'Privacy Policy',
        'footer.terms': 'Terms of Service',
        'footer.contact': 'Contact Us',
        'footer.copyright_l1': '© 2026 Planet Catcher · All Rights Reserved · Free PDF Toolkit',
        'footer.copyright_l2': 'All conversions run locally in your browser. No user data is collected.',
        'footer.home': 'Home',
        'footer.website_label': 'Website',
        'footer.website_url': 'planetgis.cn'
      }
    },

    /* ===== 注册页面级翻译 ===== */
    register: function (pageTranslations) {
      for (var lang in pageTranslations) {
        if (!this.translations[lang]) this.translations[lang] = {};
        for (var key in pageTranslations[lang]) {
          this.translations[lang][key] = pageTranslations[lang][key];
        }
      }
    },

    /* ===== 获取翻译文本 ===== */
    t: function (key) {
      return (this.translations[this.lang] && this.translations[this.lang][key]) || key;
    },

    /* ===== 应用所有翻译到 DOM ===== */
    apply: function () {
      var self = this;

      // data-i18n → textContent
      document.querySelectorAll('[data-i18n]').forEach(function (el) {
        var key = el.getAttribute('data-i18n');
        var text = self.t(key);
        if (text && text !== key) el.textContent = text;
      });

      // data-i18n-html → innerHTML（用于包含嵌套标签的文本）
      document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
        var key = el.getAttribute('data-i18n-html');
        var text = self.t(key);
        if (text && text !== key) el.innerHTML = text;
      });

      // data-i18n-placeholder → placeholder 属性
      document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
        var key = el.getAttribute('data-i18n-placeholder');
        var text = self.t(key);
        if (text && text !== key) el.setAttribute('placeholder', text);
      });

      // 更新 <html lang>
      document.documentElement.lang = self.lang === 'zh' ? 'zh-CN' : 'en';

      // 更新切换按钮文字
      document.querySelectorAll('.lang-toggle').forEach(function (btn) {
        btn.textContent = self.lang === 'zh' ? 'EN' : '中';
        btn.setAttribute('aria-label', self.lang === 'zh' ? 'Switch to English' : '切换到中文');
      });
    },

    /* ===== 切换语言 ===== */
    toggle: function () {
      this.lang = this.lang === 'zh' ? 'en' : 'zh';
      localStorage.setItem('pc_lang', this.lang);
      this.apply();
    },

    /* ===== 注入语言切换按钮样式 ===== */
    injectStyles: function () {
      if (document.getElementById('i18n-styles')) return;
      var style = document.createElement('style');
      style.id = 'i18n-styles';
      style.textContent = [
        '.lang-toggle{',
          'padding:6px 14px;',
          'border-radius:50px;',
          'background:rgba(37,99,235,0.15);',
          'border:1px solid rgba(37,99,235,0.35);',
          'color:#2563eb;',
          'font-size:13px;',
          'font-weight:600;',
          'cursor:pointer;',
          'transition:all 0.2s;',
          'font-family:inherit;',
          'white-space:nowrap;',
          'flex-shrink:0;',
        '}',
        '.lang-toggle:hover{',
          'background:rgba(37,99,235,0.28);',
          'border-color:rgba(37,99,235,0.6);',
          'color:#1d4ed8;',
        '}',
        '@media(max-width:768px){',
          '.nav-links .lang-toggle{display:none}',
          '.nav-inner .lang-toggle-mobile{display:flex}',
        '}',
        '@media(min-width:769px){',
          '.nav-inner .lang-toggle-mobile{display:none}',
        '}'
      ].join('');
      document.head.appendChild(style);
    },

    /* ===== 注入语言切换按钮到导航栏 ===== */
    injectToggle: function () {
      var self = this;
      var navInner = document.querySelector('.nav-inner');
      if (!navInner) return;

      // 桌面端按钮（放在 nav-links 内）
      var navLinks = navInner.querySelector('.nav-links');
      if (navLinks && !navLinks.querySelector('.lang-toggle')) {
        var btn = document.createElement('button');
        btn.className = 'lang-toggle';
        btn.type = 'button';
        btn.textContent = self.lang === 'zh' ? 'EN' : '中';
        btn.setAttribute('aria-label', self.lang === 'zh' ? 'Switch to English' : '切换到中文');
        btn.addEventListener('click', function () { self.toggle(); });
        navLinks.appendChild(btn);
      }

      // 移动端按钮（放在 nav-inner 末尾，始终可见）
      if (!navInner.querySelector('.lang-toggle-mobile')) {
        var btnM = document.createElement('button');
        btnM.className = 'lang-toggle lang-toggle-mobile';
        btnM.type = 'button';
        btnM.textContent = self.lang === 'zh' ? 'EN' : '中';
        btnM.setAttribute('aria-label', self.lang === 'zh' ? 'Switch to English' : '切换到中文');
        btnM.style.display = 'none';
        btnM.addEventListener('click', function () { self.toggle(); });
        navInner.appendChild(btnM);
      }
    },

    /* ===== 初始化 ===== */
    init: function () {
      this.injectStyles();
      this.injectToggle();
      this.apply();
    }
  };

  window.I18N = I18N;

  // DOM 就绪后自动初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { I18N.init(); });
  } else {
    I18N.init();
  }
})();
