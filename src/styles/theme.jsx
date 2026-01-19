import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'

const ThemeContext = createContext({ themeName: 'dark', toggleTheme: () => {} })

const themes = {
  dark: {
    bg: '#0a0f1a',
    text: '#f1f5fa',
    surface: '#101624',
    border: 'rgba(255,255,255,0.12)',
    navBg: '#101624',
    navActiveBg: '#1e293b',
    navHoverBg: '#151b2c',
    muted: '#b6c2d1',
    brand: '#f1f5fa',
    accent: '#06b6d4',
    accentHover: '#0891b2',
    link: '#38bdf8',
    icon: '#f1f5fa',
    success: '#22c55e',
    error: '#ef4444',
    valid: '#38bdf8',
  },
  light: {
    bg: '#f8fafc',
    text: '#0a192f',
    surface: '#ffffff',
    border: 'rgba(0,0,0,0.10)',
    navBg: '#ffffff',
    navActiveBg: '#e2e8f0',
    navHoverBg: '#f1f5f9',
    muted: '#475569',
    brand: '#0a192f',
    accent: '#0284c7',
    accentHover: '#0369a1',
    link: '#0e7490',
    icon: '#0284c7',
    success: '#16a34a',
    error: '#dc2626',
    valid: '#0e7490',
  },
}

export function ThemeProviderWithToggle({ children }) {
  const getInitialTheme = () => {
    try {
      const stored = localStorage.getItem('theme')
      if (stored === 'light' || stored === 'dark') return stored
      if (
        typeof window !== 'undefined' &&
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches
      ) {
        return 'dark'
      }
    } catch {
      return 'dark'
    }
    return 'dark'
  }

  const [themeName, setThemeName] = useState(getInitialTheme)

  const toggleTheme = () => {
    setThemeName((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark'
      localStorage.setItem('theme', next)
      return next
    })
  }

  const value = useMemo(() => ({ themeName, toggleTheme }), [themeName])

  return (
    <ThemeContext.Provider value={value}>
      <StyledThemeProvider theme={themes[themeName]}>
        <BodyTransitionGuard>{children}</BodyTransitionGuard>
      </StyledThemeProvider>
    </ThemeContext.Provider>
  )
}

export function useThemeToggle() {
  return useContext(ThemeContext)
}

function BodyTransitionGuard({ children }) {
  useEffect(() => {
    document.body.classList.add('theme-ready')
  }, [])
  return children
}
