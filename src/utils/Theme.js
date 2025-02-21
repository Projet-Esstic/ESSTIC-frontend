export class Theme {
  static THEMES = {
    LIGHT: 'light',
    DARK: 'dark'
  };

  static COLORS = {
    primary: {
      light: '#0066cc',
      DEFAULT: '#0066cc',
      dark: '#004999',
      hover: '#0052a3',
    },
    secondary: {
      light: '#64748b',
      DEFAULT: '#64748b',
      dark: '#475569',
      hover: '#526179',
    },
    accent: {
      light: '#3b82f6',
      DEFAULT: '#3b82f6',
      dark: '#2563eb',
      hover: '#1d4ed8',
    },
    background: {
      light: '#ffffff',
      DEFAULT: '#ffffff',
      dark: '#1a1a1a',
      alt: '#f8fafc',
    },
    surface: {
      light: '#f1f5f9',
      DEFAULT: '#f1f5f9',
      dark: '#334155',
    },
    text: {
      light: '#333333',
      DEFAULT: '#333333',
      dark: '#ffffff',
      muted: '#64748b',
    },
    error: {
      light: '#ef4444',
      DEFAULT: '#ef4444',
      dark: '#dc2626',
    },
    success: {
      light: '#22c55e',
      DEFAULT: '#22c55e',
      dark: '#16a34a',
    },
    warning: {
      light: '#f59e0b',
      DEFAULT: '#f59e0b',
      dark: '#d97706',
    },
  };

  static TEXT_STYLES = {
    display1: 'text-display-1 font-display font-bold',
    display2: 'text-display-2 font-display font-bold',
    heading1: 'text-heading-1 font-display font-bold',
    heading2: 'text-heading-2 font-display font-semibold',
    heading3: 'text-heading-3 font-display font-semibold',
    heading4: 'text-heading-4 font-display font-semibold',
    bodyLarge: 'text-body-large font-sans',
    body: 'text-body font-sans',
    bodySmall: 'text-body-small font-sans',
    caption: 'text-caption font-sans',
  };

  static SPACING = {
    layoutSm: 'layout-sm',
    layoutBase: 'layout-base',
    layoutLg: 'layout-lg',
    layoutXl: 'layout-xl',
    layout2xl: 'layout-2xl',
  };

  static getThemeClasses(isDark = false) {
    return {
      app: `min-h-screen bg-background-${isDark ? 'dark' : 'light'} text-text-${isDark ? 'dark' : 'light'} transition-colors duration-200`,
      nav: `bg-primary-${isDark ? 'dark' : 'light'} text-white`,
      card: `bg-surface-${isDark ? 'dark' : 'light'} rounded-lg shadow-lg`,
      button: {
        primary: `bg-primary-${isDark ? 'dark' : 'light'} text-white hover:bg-primary-hover`,
        secondary: `bg-secondary-${isDark ? 'dark' : 'light'} text-white hover:bg-secondary-hover`,
        accent: `bg-accent-${isDark ? 'dark' : 'light'} text-white hover:bg-accent-hover`,
      },
      input: `bg-background-${isDark ? 'dark' : 'light'} border border-gray-300 dark:border-gray-600 rounded-lg`,
    };
  }

  static applyTextStyle(style) {
    return this.TEXT_STYLES[style] || this.TEXT_STYLES.body;
  }

  static getSpacing(size) {
    return this.SPACING[size] || this.SPACING.layoutBase;
  }
}
