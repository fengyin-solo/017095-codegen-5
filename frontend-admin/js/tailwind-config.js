/** Tailwind 设计规范 - VOYAGE 风格（slate/emerald，圆角、阴影与双主题） */
(function () {
  var varColor = function (name) {
    return 'var(' + name + ')';
  };

  var config = {
    darkMode: 'class',
    theme: {
      extend: {
        fontFamily: {
          sans: ['Inter', 'sans-serif'],
          mono: ['"JetBrains Mono"', 'monospace'],
        },
        colors: {
          canvas: varColor('--canvas'),
          surface: varColor('--surface'),
          obsidian: varColor('--obsidian'),
          charcoal: varColor('--slate-700'),
          subtle: varColor('--subtle'),
          border: varColor('--border'),
          accent: varColor('--accent'),
          primary: varColor('--primary'),
          slate: {
            50: varColor('--slate-50'),
            100: varColor('--slate-100'),
            200: varColor('--slate-200'),
            400: varColor('--slate-400'),
            500: varColor('--slate-500'),
            600: varColor('--slate-600'),
            700: varColor('--slate-700'),
            800: varColor('--slate-800'),
            900: varColor('--slate-900'),
          },
          white: varColor('--on-primary'),
          red: {
            50: varColor('--danger-soft'),
            200: varColor('--danger-border'),
            500: varColor('--danger'),
            600: varColor('--danger-strong'),
          },
          amber: {
            50: varColor('--warning-bg'),
            700: varColor('--warning-text'),
          },
          rose: {
            50: varColor('--error-bg'),
            700: varColor('--error-text'),
          },
          emerald: {
            500: varColor('--emerald-500'),
            600: varColor('--emerald-600'),
            700: varColor('--emerald-700'),
            900: varColor('--emerald-900'),
          },
        },
        borderRadius: {
          sm: '0.125rem',
          lg: varColor('--radius-sm'),
          xl: varColor('--radius-control'),
          '2xl': varColor('--radius-card'),
          '3xl': '1.25rem',
        },
        letterSpacing: { tight: '-0.02em', tighter: '-0.04em' },
        boxShadow: {
          sm: varColor('--shadow-sm'),
          DEFAULT: varColor('--shadow-card'),
          md: varColor('--shadow-voyage'),
          lg: varColor('--shadow-lg'),
          xl: varColor('--shadow-xl'),
          card: varColor('--shadow-card'),
          'card-hover': varColor('--shadow-card-hover'),
          voyage: varColor('--shadow-voyage'),
        },
      },
    },
  };

  function apply() {
    if (typeof window !== 'undefined' && window.tailwind != null) {
      window.tailwind.config = config;
      return true;
    }
    return false;
  }

  if (!apply()) {
    window.__tailwindConfig = config;
    var tries = 0;
    var t = setInterval(function () {
      if (apply() || tries++ > 50) clearInterval(t);
    }, 20);
  }
})();
