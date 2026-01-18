import styled, { keyframes } from 'styled-components'
import { useState } from 'react'
import { useThemeToggle } from '../styles/theme.jsx'

const Button = styled.button`
  position: relative;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.surface};
  color: ${({ theme }) => theme.text};
  padding: 8px;
  border-radius: 10px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease;
  &:hover { background: ${({ theme }) => theme.navHoverBg}; }
`

const spinScale = keyframes`
  0% { transform: rotate(0deg) scale(1); }
  60% { transform: rotate(180deg) scale(1.15); }
  100% { transform: rotate(180deg) scale(1); }
`

const IconWrap = styled.span`
  width: 22px;
  height: 22px;
  display: inline-flex;
  color: ${({ theme }) => theme.icon};
  &.animate svg { animation: ${spinScale} 360ms ease forwards; }
  svg { width: 100%; height: 100%; display: block; }
`

const ripple = keyframes`
  0% { transform: translate(-50%, -50%) scale(0); opacity: 0.35; }
  100% { transform: translate(-50%, -50%) scale(8); opacity: 0; }
`

const Ripple = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${({ theme }) => theme.accent};
  animation: ${ripple} 420ms ease-out forwards;
  pointer-events: none;
`

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="5" fill="currentColor" />
      <g stroke="currentColor" strokeWidth="2">
        <line x1="12" y1="1" x2="12" y2="4" />
        <line x1="12" y1="20" x2="12" y2="23" />
        <line x1="1" y1="12" x2="4" y2="12" />
        <line x1="20" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="4.22" x2="6.34" y2="6.34" />
        <line x1="17.66" y1="17.66" x2="19.78" y2="19.78" />
        <line x1="4.22" y1="19.78" x2="6.34" y2="17.66" />
        <line x1="17.66" y1="6.34" x2="19.78" y2="4.22" />
      </g>
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z"
        fill="currentColor"
      />
    </svg>
  )
}

export default function ThemeToggle() {
  const { themeName, toggleTheme } = useThemeToggle()
  const [animate, setAnimate] = useState(false)
  const [showRipple, setShowRipple] = useState(false)

  const handleClick = () => {
    setAnimate(true)
    setShowRipple(true)
    toggleTheme()
    setTimeout(() => setAnimate(false), 380)
    setTimeout(() => setShowRipple(false), 420)
  }

  const label = themeName === 'dark' ? 'Alternar para tema claro' : 'Alternar para tema escuro'

  return (
    <Button onClick={handleClick} aria-label={label} title={label}>
      {showRipple && <Ripple />}
      <IconWrap className={animate ? 'animate' : ''}>
        {themeName === 'dark' ? <SunIcon /> : <MoonIcon />}
      </IconWrap>
    </Button>
  )
}
