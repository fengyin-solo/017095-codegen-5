/** Tailwind 设计规范 - VOYAGE 风格（色彩、圆角、阴影均映射到设计令牌） */
(function () {
  var semanticColors = {
    canvas: 'var(--color-canvas)',
    surface: 'var(--color-surface)',
    'surface-muted': 'var(--color-surface-muted)',
    obsidian: 'var(--color-text-strong)',
    charcoal: 'var(--color-text-base)',
    subtle: 'var(--color-text-muted)',
    border: 'var(--color-border)',
    'border-light': 'var(--color-border-light)',
    accent: 'var(--color-accent)',
    primary: 'var(--color-primary)',
    'on-primary': 'var(--color-on-primary)',
    white: '#ffffff',
    slate: {
      50: 'var(--color-slate-50)',
      100: 'var(--color-slate-100)',
      200: 'var(--color-slate-200)',
      400: 'var(--color-slate-400)',
      500: 'var(--color-slate-500)',
      600: 'var(--color-slate-600)',
      700: 'var(--color-slate-700)',
      800: 'var(--color-slate-800)',
      900: 'var(--color-slate-900)',
    },
    emerald: {
      50: 'var(--color-emerald-50)',
      100: 'var(--color-emerald-100)',
      500: 'var(--color-emerald-500)',
      600: 'var(--color-emerald-600)',
      700: 'var(--color-emerald-700)',
      900: 'var(--color-emerald-900)',
    },
    amber: {
      50: 'var(--color-amber-50)',
      100: 'var(--color-amber-100)',
      700: 'var(--color-amber-700)',
    },
    rose: {
      50: 'var(--color-rose-50)',
      100: 'var(--color-rose-100)',
      500: 'var(--color-rose-500)',
      700: 'var(--color-rose-700)',
    },
    red: {
      50: 'var(--color-red-50)',
      200: 'var(--color-red-200)',
      500: 'var(--color-red-500)',
      600: 'var(--color-red-600)',
    },
  };

  var config = {
    darkMode: 'class',
    theme: {
      extend: {
        fontFamily: {
          sans: ['Inter', 'sans-serif'],
          mono: ['"JetBrains Mono"', 'monospace'],
        },
        colors: semanticColors,
        borderRadius: {
          sm: 'var(--radius-sm)',
          md: 'var(--radius-sm)',
          lg: 'var(--radius-md)',
          xl: 'var(--radius-lg)',
          '2xl': 'var(--radius-xl)',
          '3xl': 'var(--radius-2xl)',
        },
        letterSpacing: { tight: '-0.02em', tighter: '-0.04em' },
        boxShadow: {
          xs: 'var(--shadow-xs)',
          sm: 'var(--shadow-sm)',
          DEFAULT: 'var(--shadow-md)',
          md: 'var(--shadow-md)',
          lg: 'var(--shadow-lg)',
          xl: 'var(--shadow-xl)',
          '2xl': 'var(--shadow-overlay)',
          card: 'var(--shadow-card)',
          'card-hover': 'var(--shadow-card-hover)',
          voyage: 'var(--shadow-overlay)',
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
