import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'

const ThemeContext = createContext({ themeName: 'dark', toggleTheme: () => {} })

const themes = {
  dark: {
    bg: '#0a0f1a',
    text: '#e2e8f0',
    surface: '#0b1220',
    border: 'rgba(255,255,255,0.08)',
    navBg: '#0f172a',
    navActiveBg: '#1e293b',
    navHoverBg: '#0b1220',
    muted: '#94a3b8',
    brand: '#e2e8f0',
    accent: '#22d3ee',
    accentHover: '#0ea5b7',
    link: '#22d3ee',
    icon: '#e2e8f0',
    success: '#22c55e',
    error: '#ef4444',
    valid: '#22d3ee',
  },
  light: {
    bg: '#f8fafc',
    text: '#0f172a',
    surface: '#ffffff',
    border: 'rgba(0,0,0,0.08)',
    navBg: '#ffffff',
    navActiveBg: '#e2e8f0',
    navHoverBg: '#f1f5f9',
    muted: '#334155',
    brand: '#0f172a',
    accent: '#0ea5b7',
    accentHover: '#0891a2',
    link: '#0284c7',
    icon: '#0ea5b7',
    success: '#22c55e',
    error: '#ef4444',
    valid: '#334155',
  },
}

export function ThemeProviderWithToggle({ children }) {
  const getInitialTheme = () => {
    try {
      const stored = localStorage.getItem('theme')
      if (stored === 'light' || stored === 'dark') return stored
      if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark'
      }
    } catch { return 'dark' }
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