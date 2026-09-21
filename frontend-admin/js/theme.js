/**
 * 主题模块：浅色 / 深色切换，并持久化用户选择。
 * 页面 <head> 中先执行一段内联初始化，避免刷新时闪烁。
 */
(function (global) {
  'use strict';

  var STORAGE_KEY = 'knowledge_platform_theme';
  var LIGHT = 'light';
  var DARK = 'dark';

  function normalize(theme) {
    return theme === DARK ? DARK : LIGHT;
  }

  function getStoredTheme() {
    try {
      var stored = global.localStorage.getItem(STORAGE_KEY);
      return stored === DARK || stored === LIGHT ? stored : null;
    } catch (_) {
      return null;
    }
  }

  function getInitialTheme() {
    // 默认保持现有浅色风格；只有用户主动切换后才读取持久化偏好。
    return getStoredTheme() || LIGHT;
  }

  var Theme = {
    LIGHT: LIGHT,
    DARK: DARK,
    current: getStoredTheme() || LIGHT,

    get: function () {
      return document.documentElement.classList.contains('dark') ? DARK : LIGHT;
    },

    set: function (theme, options) {
      var next = normalize(theme);
      this.current = next;
      document.documentElement.classList.toggle('dark', next === DARK);
      document.documentElement.style.colorScheme = next;
      try {
        global.localStorage.setItem(STORAGE_KEY, next);
      } catch (_) {}
      this.updateButtons();
      if (!options || !options.silent) {
        document.dispatchEvent(new CustomEvent('themechange', { detail: { theme: next } }));
      }
    },

    toggle: function () {
      this.set(this.get() === DARK ? LIGHT : DARK);
    },

    updateButtons: function () {
      var current = this.get();
      document.querySelectorAll('[data-theme-toggle]').forEach(function (button) {
        button.setAttribute('aria-pressed', current === DARK ? 'true' : 'false');
        button.setAttribute('title', current === DARK ? '切换到浅色风格' : '切换到深色风格');
        button.setAttribute('aria-label', current === DARK ? '切换到浅色风格' : '切换到深色风格');
      });
    },

    createToggle: function (extraClass) {
      var button = document.createElement('button');
      button.type = 'button';
      button.className = 'theme-toggle' + (extraClass ? ' ' + extraClass : '');
      button.setAttribute('data-theme-toggle', '');
      button.innerHTML =
        '<span class="iconify theme-icon-moon" data-icon="lucide:moon" data-width="18" data-height="18"></span>' +
        '<span class="iconify theme-icon-sun" data-icon="lucide:sun" data-width="18" data-height="18"></span>';
      button.addEventListener('click', function () {
        Theme.toggle();
      });
      return button;
    },

    initToggles: function () {
      var header = document.querySelector('.app-header');
      if (header) {
        var actions = header.querySelector('.header-actions');
        if (!actions) {
          actions = document.createElement('div');
          actions.className = 'header-actions';
          header.appendChild(actions);
        }
        if (!actions.querySelector('[data-theme-toggle]')) {
          actions.insertBefore(this.createToggle(), actions.firstChild);
        }
      } else if (document.body && !document.querySelector('[data-theme-toggle]')) {
        document.body.appendChild(this.createToggle('theme-toggle-fixed'));
      }
      this.updateButtons();
    }
  };

  // 未写入偏好时首次进入仍为浅色；只有用户明确切换后才覆盖系统偏好。
  Theme.set(normalize(getInitialTheme()), { silent: true });

  global.ThemeManager = Theme;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { Theme.initToggles(); });
  } else {
    Theme.initToggles();
  }
})(window);
