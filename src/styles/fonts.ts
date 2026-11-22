import localFont from 'next/font/local'

export const caslon = localFont({
  src: [
    { path: '../fonts/libre-caslon-text-latin-400-normal.woff2', weight: '400', style: 'normal' },
    { path: '../fonts/libre-caslon-text-latin-400-italic.woff2', weight: '400', style: 'italic' },
    { path: '../fonts/libre-caslon-text-latin-700-normal.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-caslon',
  display: 'swap',
  fallback: ['Georgia', 'Times New Roman', 'serif'],
})

export const jost = localFont({
  src: [
    { path: '../fonts/jost-latin-wght-normal.woff2', weight: '300 700', style: 'normal' },
    { path: '../fonts/jost-latin-wght-italic.woff2', weight: '300 700', style: 'italic' },
  ],
  variable: '--font-jost',
  display: 'swap',
  fallback: ['Helvetica Neue', 'Arial', 'sans-serif'],
})

export const naskh = localFont({
  src: [
    { path: '../fonts/noto-naskh-arabic-arabic-400-normal.woff2', weight: '400', style: 'normal' },
    { path: '../fonts/noto-naskh-arabic-arabic-600-normal.woff2', weight: '600', style: 'normal' },
  ],
  variable: '--font-naskh',
  display: 'swap',
  fallback: ['Geeza Pro', 'Tahoma', 'serif'],
})

export const notoArabic = localFont({
  src: [{ path: '../fonts/noto-sans-arabic-arabic-wght-normal.woff2', weight: '100 900', style: 'normal' }],
  variable: '--font-noto-arabic',
  display: 'swap',
  fallback: ['Tahoma', 'Arial', 'sans-serif'],
})

export const fontVariables = [caslon.variable, jost.variable, naskh.variable, notoArabic.variable].join(' ')
