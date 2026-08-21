// Cabeçalho principal do site, com navegação, tema e menu mobile
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import styled, { keyframes } from 'styled-components'
import ThemeToggle from './ThemeToggle.jsx'
import { useEffect, useRef, useState, useContext, createContext } from 'react'
import { translations } from '../data/translations.js'

export const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('pt')
  return <LanguageContext.Provider value={{ lang, setLang }}>{children}</LanguageContext.Provider>
}

const Wrapper = styled.header`
  position: sticky;
  top: 0;
  z-index: 20;
  background: ${({ theme }) => theme.navBg};
  border-bottom: 1px solid ${({ theme }) => theme.border};
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
`

const Container = styled.div`
  position: relative;
  max-width: 1500px;
  margin: 0 auto;
  min-height: 76px;
  padding: 16px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
`

const BrandButton = styled.button`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: inline-flex;
  align-items: center;
  color: ${({ theme }) => theme.brand};
  font-weight: 700;
  letter-spacing: 0.01em;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  font-size: 1rem;
  white-space: nowrap;
`

const HeaderSide = styled.div`
  display: flex;
  align-items: center;
  min-width: 44px;
`

const MobileLink = styled(NavLink)`
  color: ${({ theme }) => theme.text};
  text-decoration: none;
  font-size: clamp(2.2rem, 7vw, 5.4rem);
  line-height: 1.05;
  font-weight: 700;
  letter-spacing: -0.05em;
  text-align: center;
  padding: 8px 14px;
  transition: color 0.2s ease, transform 0.2s ease;
  &:hover {
    color: ${({ theme }) => theme.accentHover};
    transform: translateY(-2px);
  }
  &.active {
    color: ${({ theme }) => theme.accent};
  }
`

const MobileList = styled.nav`
  display: grid;
  gap: 18px;
  justify-items: center;
`

const MenuContent = styled.div`
  display: grid;
  justify-items: center;
  gap: 34px;
  width: min(100%, 820px);
`

const MenuTitle = styled.h2`
  margin: 0;
  color: ${({ theme }) => theme.text};
  font-size: clamp(1.4rem, 3vw, 2.2rem);
  line-height: 1.1;
  font-weight: 600;
  letter-spacing: -0.04em;
  text-align: center;
`

const MenuButton = styled.button`
  display: inline-flex;
  border: none;
  background: transparent;
  color: ${({ theme }) => theme.icon};
  width: 42px;
  height: 42px;
  padding: 0;
  border-radius: 50%;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  transition: background 0.2s ease;
  &:hover {
    background: ${({ theme }) => theme.navHoverBg};
  }
`

const Hamburger = styled.span`
  width: 18px;
  height: 14px;
  position: relative;
  display: inline-block;
  &::before,
  &::after,
  i {
    content: '';
    position: absolute;
    left: 0;
    width: 100%;
    height: 2px;
    background: currentColor;
    border-radius: 2px;
    transition: transform 0.2s ease, opacity 0.2s ease;
  }
  &::before { top: 0; }
  i { top: 6px; }
  &::after { top: 12px; }
  &.open::before { transform: translateY(6px) rotate(45deg); }
  &.open i { opacity: 0; }
  &.open::after { transform: translateY(-6px) rotate(-45deg); }
`

const menuReveal = keyframes`
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
`

const MobileNav = styled.aside`
  position: fixed;
  top: 76px;
  right: 0;
  bottom: 0;
  left: 0;
  display: grid;
  place-items: center;
  padding: 40px 24px 64px;
  background: ${({ theme }) => theme.navBg};
  animation: ${menuReveal} 260ms ease both;
  z-index: 19;
  color: ${({ theme }) => theme.text};
  backdrop-filter: blur(18px) saturate(125%);
  -webkit-backdrop-filter: blur(18px) saturate(125%);
`

const Overlay = styled.div`
  position: fixed;
  top: 76px;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(15, 23, 42, 0.16);
  backdrop-filter: blur(18px) saturate(115%);
  -webkit-backdrop-filter: blur(18px) saturate(115%);
  z-index: 18;
`

export default function Header() {
  const { lang } = useContext(LanguageContext) || { lang: 'pt' }
  const t = translations[lang]
  const [open, setOpen] = useState(false)
  const navRef = useRef(null)
  const menuButtonRef = useRef(null)
  const location = useLocation()
  const navigate = useNavigate()
  const [activeHash, setActiveHash] = useState('')

  useEffect(() => {
    document.body.classList.toggle('menu-open', open)
    return () => document.body.classList.remove('menu-open')
  }, [open])

  useEffect(() => {
    if (!open) return
    const handleClickOutside = (e) => {
      const clickedInsideMenu = navRef.current?.contains(e.target)
      const clickedMenuButton = menuButtonRef.current?.contains(e.target)
      if (!clickedInsideMenu && !clickedMenuButton) {
        setOpen(false)
      }
    }
    window.addEventListener('pointerdown', handleClickOutside)
    return () => {
      window.removeEventListener('pointerdown', handleClickOutside)
    }
  }, [open])

  useEffect(() => {
    if (location.pathname !== '/') {
      setActiveHash('')
      return
    }
    const ids = ['sobre', 'projetos', 'habilidades', 'contato']
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean)
    if (els.length === 0) return
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActiveHash(`#${visible.target.id}`)
      },
      { root: null, threshold: [0.5] }
    )
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [location.pathname])

  const close = () => setOpen(false)
  const toggle = () => setOpen((v) => !v)

  const goToSection = (event, id) => {
    event.preventDefault()
    close()

    const scrollToSection = () => {
      const section = document.getElementById(id)
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }

    if (location.pathname !== '/') {
      navigate(`/#${id}`)
      window.setTimeout(scrollToSection, 0)
      return
    }

    window.history.replaceState(null, '', `/#${id}`)
    scrollToSection()
  }

  const goHomeTop = () => {
    if (location.pathname === '/') {
      const el = document.getElementById('sobre')
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      } else {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
      }
    } else {
      navigate('/')
    }
  }

  return (
    <Wrapper>
      <Container>
        <HeaderSide>
          <MenuButton
            ref={menuButtonRef}
            aria-label={open ? t.closeMenu : t.openMenu}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={toggle}
          >
            <Hamburger className={open ? 'open' : ''}>
              <i />
            </Hamburger>
          </MenuButton>
        </HeaderSide>

        <BrandButton type="button" onClick={goHomeTop} aria-label={t.goToTop}>
          <span>Portfólio</span>
        </BrandButton>

        <HeaderSide>
          <ThemeToggle />
        </HeaderSide>
      </Container>

      {open && (
        <>
          <Overlay role="presentation" onClick={() => setOpen(false)} />
          <MobileNav
            ref={navRef}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label={t.menu}
          >
            <MenuContent>
              <MenuTitle>{lang === 'pt' ? 'Bem-vindo ao meu Portfólio' : 'Welcome to my Portfolio'}</MenuTitle>
              <MobileList>
                <MobileLink to="/#projetos" data-spy-active={activeHash === '#projetos'} onClick={(event) => goToSection(event, 'projetos')}>
                  {t.projects}
                </MobileLink>
                <MobileLink to="/#habilidades" data-spy-active={activeHash === '#habilidades'} onClick={(event) => goToSection(event, 'habilidades')}>
                  {t.skills}
                </MobileLink>
                <MobileLink to="/#contato" data-spy-active={activeHash === '#contato'} onClick={(event) => goToSection(event, 'contato')}>
                  {t.contact}
                </MobileLink>
              </MobileList>
            </MenuContent>
          </MobileNav>
        </>
      )}
    </Wrapper>
  )
}
