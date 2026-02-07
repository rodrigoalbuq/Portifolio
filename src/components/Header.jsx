// Cabeçalho principal do site, com navegação, tema e menu mobile
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import styled, { keyframes } from 'styled-components'
import ThemeToggle from './ThemeToggle.jsx'
import { useEffect, useRef, useState, useContext, createContext } from 'react'
import { translations } from '../data/translations.js'

// Contexto global de idioma
export const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('pt')
  return <LanguageContext.Provider value={{ lang, setLang }}>{children}</LanguageContext.Provider>
}
const Wrapper = styled.header`
  position: sticky;
  top: 0;
  z-index: 10;
  background: ${({ theme }) => theme.navBg};
  border-bottom: 1px solid ${({ theme }) => theme.border};
  backdrop-filter: none;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.06);
`

const Container = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  padding: 16px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Brand = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  color: ${({ theme }) => theme.text};
  font-weight: 700;
  background: none;
  border: none;
  & span,
  & {
    color: ${({ theme }) => theme.text};
  }
`

const BrandButton = styled.button`
  display: flex;
  align-items: center;
  gap: 12px;
  color: ${({ theme }) => theme.brand};
  font-weight: 700;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
`

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  border: none !important;
  box-shadow: none !important;
  background: transparent !important;
  filter: saturate(1.06) contrast(1.04);
  backface-visibility: hidden;
  transform: translateZ(0);
  /* Avatar totalmente transparente, sem sobreposição visual */
`

const Nav = styled.nav`
  display: flex;
  gap: 16px;
  @media (max-width: 768px) {
    display: none;
  }
`

const Link = styled(NavLink)`
  color: ${({ theme }) => theme.muted};
  text-decoration: none;
  font-weight: 500;
  padding: 8px 12px;
  border-radius: 8px;
  position: relative;
  transition:
    background 0.2s ease,
    color 0.2s ease;
  &.active {
    background: ${({ theme }) => theme.navActiveBg};
    color: ${({ theme }) => theme.text};
  }
  /* Apenas animação do sublinhado no hover */
  &::after {
    content: '';
    position: absolute;
    left: 8px;
    right: 8px;
    bottom: 4px;
    height: 2px;
    background: ${({ theme }) => theme.text};
    border-radius: 2px;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.2s ease;
  }
  &:hover::after,
  &:focus-visible::after,
  &:active::after,
  &[data-spy-active='true']::after {
    transform: scaleX(1);
  }
`

// Links com maior contraste para o drawer mobile
const MobileLink = styled(NavLink)`
  color: ${({ theme }) => theme.text};
  text-decoration: none;
  font-weight: 600;
  padding: 10px 10px;
  border-radius: 0;
  display: block;
  opacity: 1;
  background: transparent;
  border: none;
  font-size: 1rem;
  line-height: 1.2;
  box-shadow: none;
  position: relative;
  transition:
    background 0.2s ease,
    color 0.2s ease;
  &.active {
    background: transparent;
    color: ${({ theme }) => theme.text};
  }
  /* Animação do sublinhado: hover, foco, ativo, scroll spy */
  &::after {
    content: '';
    position: absolute;
    left: 4px;
    right: 4px;
    bottom: 4px;
    height: 2px;
    background: ${({ theme }) => theme.text};
    border-radius: 2px;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.2s ease;
  }
  &:hover::after,
  &:focus-visible::after,
  &:active::after,
  &[data-spy-active='true']::after,
  &.active::after {
    transform: scaleX(1);
  }
`

const MobileList = styled.nav`
  display: grid;
  gap: 0;
`

const MenuButton = styled.button`
  display: none;
  @media (max-width: 768px) {
    display: inline-flex;
  }
  border: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.navBg};
  color: ${({ theme }) => theme.text};
  padding: 10px 12px;
  border-radius: 10px;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition:
    background 0.2s ease,
    border-color 0.2s ease;
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
    background: ${({ theme }) => theme.text};
    border-radius: 2px;
    transition:
      transform 0.2s ease,
      opacity 0.2s ease;
  }
  &::before {
    top: 0;
  }
  i {
    top: 6px;
  }
  &::after {
    top: 12px;
  }

  &.open::before {
    transform: translateY(6px) rotate(45deg);
  }
  &.open i {
    opacity: 0;
  }
  &.open::after {
    transform: translateY(-6px) rotate(-45deg);
  }
`

const slideInRight = keyframes`
  from { transform: translateX(100%) scaleY(0.5); opacity: 0; }
  to { transform: translateX(0) scaleY(1); opacity: 1; }
`

const MobileNav = styled.aside`
  position: fixed;
  top: 0;
  right: 0;
  width: min(85vw, 360px);
  height: 50vh;
  background: ${({ theme }) => theme.navBg};
  border-left: 1px solid ${({ theme }) => theme.border};
  border-bottom: 1px solid ${({ theme }) => theme.border};
  padding: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  animation: ${slideInRight} 320ms cubic-bezier(0.4, 0, 0.2, 1) both;
  z-index: 1001;
  color: ${({ theme }) => theme.text};
  opacity: 1;
  backdrop-filter: blur(2px);
  border-top-left-radius: 18px;
  border-bottom-left-radius: 18px;
  @media (max-width: 400px) {
    width: 100vw;
  }
`

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: transparent;
  z-index: 1000;
  @media (min-width: 769px) {
    display: none;
  }
`

export default function Header() {
  const { lang, setLang } = useContext(LanguageContext) || { lang: 'pt', setLang: () => {} }
  const t = translations[lang]
  // Estado do menu mobile aberto/fechado
  const [open, setOpen] = useState(false)
  // Referência para o painel do menu mobile
  const navRef = useRef(null)
  // Localização atual da rota
  const location = useLocation()
  // Navegação programática
  const navigate = useNavigate()
  // Hash da seção ativa (scroll spy)
  const [activeHash, setActiveHash] = useState('')

  // Fecha o menu ao clicar fora do painel, sem bloquear rolagem da página
  useEffect(() => {
    if (!open) return
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    window.addEventListener('pointerdown', handleClickOutside)
    return () => {
      window.removeEventListener('pointerdown', handleClickOutside)
    }
  }, [open])

  // Scroll spy: anima sublinhado ao chegar nas seções dentro de / (About)
  useEffect(() => {
    if (location.pathname !== '/') {
      setActiveHash('')
      return
    }
    // IDs das seções para scroll spy
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
      { root: null, threshold: [0.6] }
    )
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [location.pathname])

  // Fecha o menu mobile
  const close = () => setOpen(false)
  // Alterna o menu mobile
  const toggle = () => setOpen((v) => !v)

  // Vai para o topo da página About
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
        {/* Botão da marca/voltar ao topo */}
        <BrandButton type="button" onClick={goHomeTop} aria-label={t.goToTop}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ display: 'inline-block' }}>
              <Avatar
                src="/Rodrigo_portifolio.jpg"
                alt={t.name}
                loading="eager"
                decoding="async"
                fetchPriority="high"
                style={{
                  display:
                    typeof window !== 'undefined' && window.innerWidth <= 768 && open
                      ? 'none'
                      : undefined,
                }}
              />
            </span>
            {t.name}
          </span>
        </BrandButton>
        {/* Navegação desktop */}
        <Nav>
          <Link to="/" data-spy-active={activeHash === '#sobre'}>
            {t.about}
          </Link>
          <Link to="/projetos" data-spy-active={activeHash === '#projetos'}>
            {t.projects}
          </Link>
          <Link to="/habilidades" data-spy-active={activeHash === '#habilidades'}>
            {t.skills}
          </Link>
          <Link to="/contato" data-spy-active={activeHash === '#contato'}>
            {t.contact}
          </Link>
          <ThemeToggle />
          <button
            style={{
              marginLeft: 8,
              padding: '6px 12px',
              borderRadius: 8,
              border: '1px solid #ccc',
              background: '#fff',
              cursor: 'pointer',
              position: 'relative',
            }}
            onClick={() => setLang(lang === 'pt' ? 'en' : 'pt')}
            aria-label={lang === 'pt' ? 'Switch to English' : 'Mudar para Português'}
            onMouseEnter={(e) => {
              const tooltip = document.createElement('div')
              tooltip.innerText = lang === 'pt' ? 'Troca de idioma' : 'Switch language'
              tooltip.style.position = 'absolute'
              tooltip.style.top = 'calc(100% + 8px)'
              tooltip.style.left = '50%'
              tooltip.style.transform = 'translateX(-50%)'
              tooltip.style.background = '#222'
              tooltip.style.color = '#fff'
              tooltip.style.padding = '4px 12px'
              tooltip.style.borderRadius = '6px'
              tooltip.style.fontSize = '13px'
              tooltip.style.whiteSpace = 'nowrap'
              tooltip.style.zIndex = '9999'
              tooltip.className = 'lang-tooltip'
              e.currentTarget.appendChild(tooltip)
            }}
            onMouseLeave={(e) => {
              const tooltip = e.currentTarget.querySelector('.lang-tooltip')
              if (tooltip) e.currentTarget.removeChild(tooltip)
            }}
          >
            {lang === 'pt' ? 'EN' : 'PT'}
          </button>
        </Nav>
        {/* Botão do menu mobile */}
        <MenuButton
          aria-label={open ? t.closeMenu : t.openMenu}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={toggle}
        >
          <Hamburger className={open ? 'open' : ''}>
            <i />
          </Hamburger>
        </MenuButton>
      </Container>
      {/* Menu mobile (drawer) */}
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
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 16,
              }}
            >
              <Brand>
                <Avatar
                  src="/Rodrigo_portifolio.jpg"
                  alt={t.name}
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                />
                <span>{t.menu}</span>
              </Brand>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <ThemeToggle />
                <button
                  style={{
                    padding: '6px 12px',
                    borderRadius: 8,
                    border: '1px solid #ccc',
                    background: '#fff',
                    cursor: 'pointer',
                    position: 'relative',
                  }}
                  onClick={() => setLang(lang === 'pt' ? 'en' : 'pt')}
                  aria-label={lang === 'pt' ? 'Switch to English' : 'Mudar para Português'}
                  onMouseEnter={(e) => {
                    const tooltip = document.createElement('div')
                    tooltip.innerText = lang === 'pt' ? 'Troca de idioma' : 'Switch language'
                    tooltip.style.position = 'absolute'
                    tooltip.style.top = 'calc(100% + 8px)'
                    tooltip.style.left = '50%'
                    tooltip.style.transform = 'translateX(-50%)'
                    tooltip.style.background = '#222'
                    tooltip.style.color = '#fff'
                    tooltip.style.padding = '4px 12px'
                    tooltip.style.borderRadius = '6px'
                    tooltip.style.fontSize = '13px'
                    tooltip.style.whiteSpace = 'nowrap'
                    tooltip.style.zIndex = '9999'
                    tooltip.className = 'lang-tooltip'
                    e.currentTarget.appendChild(tooltip)
                  }}
                  onMouseLeave={(e) => {
                    const tooltip = e.currentTarget.querySelector('.lang-tooltip')
                    if (tooltip) e.currentTarget.removeChild(tooltip)
                  }}
                >
                  {lang === 'pt' ? 'EN' : 'PT'}
                </button>
              </div>
            </div>
            <MobileList>
              <MobileLink to="/" data-spy-active={activeHash === '#sobre'} onClick={close}>
                {t.about}
              </MobileLink>
              <MobileLink
                to="/projetos"
                data-spy-active={activeHash === '#projetos'}
                onClick={close}
              >
                {t.projects}
              </MobileLink>
              <MobileLink
                to="/habilidades"
                data-spy-active={activeHash === '#habilidades'}
                onClick={close}
              >
                {t.skills}
              </MobileLink>
              <MobileLink to="/contato" data-spy-active={activeHash === '#contato'} onClick={close}>
                {t.contact}
              </MobileLink>
            </MobileList>
          </MobileNav>
        </>
      )}
    </Wrapper>
  )
}
