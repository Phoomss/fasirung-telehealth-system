export const colors = {
  light: {
    primary: '#0066CC',       // Premium Medical Blue
    primaryLight: '#E6F0FA',  // Soft background accents
    secondary: '#00A896',     // Healthcare Teal
    secondaryLight: '#E0F2FE',// Soft teal/light-blue background
    background: '#F8FAFC',    // Page base
    surface: '#FFFFFF',       // Card background
    textPrimary: '#0F172A',   // Dark slate for readability
    textSecondary: '#64748B', // Muted text for captions
    border: '#E2E8F0',
    success: '#10B981',
    successLight: '#ECFDF5',
    warning: '#F59E0B',
    warningLight: '#FEF3C7',
    error: '#EF4444',
    errorLight: '#FEE2E2',
    muted: '#94A3B8',
  },
  dark: {
    primary: '#3B82F6',
    primaryLight: '#1E293B',
    secondary: '#0D9488',
    secondaryLight: '#115E59',
    background: '#0F172A',    // Dark theme base
    surface: '#1E293B',       // Card background
    textPrimary: '#F8FAFC',
    textSecondary: '#94A3B8',
    border: '#334155',
    success: '#34D399',
    successLight: '#064E3B',
    warning: '#FBBF24',
    warningLight: '#78350F',
    error: '#F87171',
    errorLight: '#7F1D1D',
    muted: '#475569',
  }
};

export const spacing = {
  xs: 4,
  s: 8,
  sm: 12,
  m: 16,
  l: 24,
  xl: 32,
  xxl: 48,
};

export const radius = {
  xs: 4,
  s: 8,
  m: 12,
  l: 16,
  xl: 20,
  xxl: 24,
  full: 9999,
};

export const shadows = {
  sm: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  lg: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 6,
  },
};

export const typography = {
  sizes: {
    xs: 12,
    sm: 13,
    base: 15,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 32,
  },
  weights: {
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  lineHeights: {
    xs: 16,
    sm: 18,
    base: 22,
    md: 24,
    lg: 28,
    xl: 32,
    xxl: 40,
  }
};
