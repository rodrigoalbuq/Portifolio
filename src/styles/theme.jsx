import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'

const ThemeContext = createContext({ themeName: 'dark', toggleTheme: () => {} })

const themes = {
  dark: {
    bg: '#0b1020',
    text: '#f8fafc',
    surface: '#121a2b',
    border: 'rgba(226, 232, 240, 0.16)',
    navBg: 'rgba(11, 16, 32, 0.94)',
    navActiveBg: '#1e293b',
    navHoverBg: '#273449',
    muted: '#b7c1d1',
    brand: '#f8fafc',
    accent: '#a855f7',
    accentHover: '#c084fc',
    link: '#f8fafc',
    icon: '#f8fafc',
    success: '#22c55e',
    error: '#ef4444',
    valid: '#0f172a',
  },
  light: {
    bg: '#eef1f5',
    text: '#0f172a',
    surface: '#ffffff',
    border: 'rgba(15, 23, 42, 0.12)',
    navBg: 'rgba(255, 255, 255, 0.96)',
    navActiveBg: '#ede9fe',
    navHoverBg: '#f3f4f6',
    muted: '#475569',
    brand: '#0f172a',
    accent: '#7c3aed',
    accentHover: '#6d28d9',
    link: '#0f172a',
    icon: '#0f172a',
    success: '#22c55e',
    error: '#ef4444',
    valid: '#0f172a',
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
