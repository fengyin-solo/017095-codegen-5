/**
 * 主题规范：浅色 / 深色
 * 需在 Tailwind 与业务样式前加载，避免页面初始化时闪烁。
 */
(function () {
  'use strict';

  var STORAGE_KEY = 'knowledge_platform_theme';
  var LIGHT = 'light';
  var DARK = 'dark';
  var root = document.documentElement;

  function normalize(theme) {
    return theme === DARK ? DARK : LIGHT;
  }

  function getStoredTheme() {
    try {
      return normalize(localStorage.getItem(STORAGE_KEY));
    } catch (_) {
      return LIGHT;
    }
  }

  function applyTheme(theme) {
    theme = normalize(theme);
    root.setAttribute('data-theme', theme);
    root.classList.toggle(DARK, theme === DARK);
    root.style.colorScheme = theme;
    return theme;
  }

  function setTheme(theme) {
    theme = normalize(theme);
    try { localStorage.setItem(STORAGE_KEY, theme); } catch (_) {}
    var changed = root.getAttribute('data-theme') !== theme;
    applyTheme(theme);
    if (changed) {
      root.dispatchEvent(new CustomEvent('themechange', { detail: { theme: theme } }));
    }
  }

  applyTheme(getStoredTheme());

  function sunIcon() {
    return '<svg class="theme-icon theme-icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></svg>';
  }

  function moonIcon() {
    return '<svg class="theme-icon theme-icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>';
  }

  function updateToggle(button) {
    var isDark = root.getAttribute('data-theme') === DARK;
    button.setAttribute('aria-pressed', String(isDark));
    button.setAttribute('aria-label', isDark ? '切换到浅色风格' : '切换到深色风格');
    button.title = isDark ? '切换到浅色风格' : '切换到深色风格';
  }

  function createToggle() {
    var button = document.createElement('button');
    button.type = 'button';
    button.className = 'theme-toggle';
    button.innerHTML = sunIcon() + moonIcon();
    updateToggle(button);
    button.addEventListener('click', function () {
      setTheme(root.getAttribute('data-theme') === DARK ? LIGHT : DARK);
    });
    root.addEventListener('themechange', function () {
      updateToggle(button);
    });
    return button;
  }

  function mountFloatingToggle() {
    if (!document.body || document.querySelector('.app-header') || document.querySelector('.theme-toggle')) return;
    var button = createToggle();
    button.classList.add('theme-toggle-floating');
    document.body.appendChild(button);
  }

  window.AppTheme = {
    get: function () { return root.getAttribute('data-theme') || LIGHT; },
    set: setTheme,
    toggle: function () {
      setTheme(root.getAttribute('data-theme') === DARK ? LIGHT : DARK);
    },
    createToggle: createToggle
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mountFloatingToggle);
  } else {
    mountFloatingToggle();
  }
})();
