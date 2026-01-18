import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import styled, { keyframes } from 'styled-components'
import ThemeToggle from './ThemeToggle.jsx'
import { useEffect, useRef, useState } from 'react'

const Wrapper = styled.header`
  position: sticky;
  top: 0;
  z-index: 10;
  background: ${({ theme }) => theme.navBg};
  border-bottom: 1px solid ${({ theme }) => theme.border};
  backdrop-filter: none;
  box-shadow: 0 6px 16px rgba(0,0,0,0.06);
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
  color: ${({ theme }) => theme.brand};
  font-weight: 700;
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
  border: none;
  filter: saturate(1.06) contrast(1.04);
  backface-visibility: hidden;
  transform: translateZ(0);
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
  transition: background 0.2s ease, color 0.2s ease;
  &.active { background: ${({ theme }) => theme.navActiveBg}; color: ${({ theme }) => theme.text}; }
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
  &[data-spy-active="true"]::after { transform: scaleX(1); }
`

// Links com maior contraste para o drawer mobile
const MobileLink = styled(NavLink)`
  color: ${({ theme }) => theme.text};
  text-decoration: none;
  font-weight: 600;
  padding: 16px 14px;
  border-radius: 0;
  display: block;
  opacity: 1;
  background: transparent;
  border: none;
  font-size: 1rem;
  line-height: 1.2;
  box-shadow: none;
  position: relative;
  transition: background 0.2s ease, color 0.2s ease;
  &.active { background: transparent; color: ${({ theme }) => theme.text}; }
   /* Apenas animação do sublinhado no hover */
  &::after {
    content: '';
    position: absolute;
    left: 12px;
    right: 12px;
    bottom: 6px;
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
  &[data-spy-active="true"]::after { transform: scaleX(1); }
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
  transition: background 0.2s ease, border-color 0.2s ease;
  &:hover { background: ${({ theme }) => theme.navHoverBg}; }
`

const Hamburger = styled.span`
  width: 18px;
  height: 14px;
  position: relative;
  display: inline-block;
  &::before, &::after, i {
    content: '';
    position: absolute;
    left: 0;
    width: 100%;
    height: 2px;
    background: ${({ theme }) => theme.text};
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

const slideInRight = keyframes`
  from { transform: translateX(16px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`

const MobileNav = styled.aside`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  width: min(85vw, 360px);
  background: ${({ theme }) => theme.navBg};
  border-left: 1px solid ${({ theme }) => theme.border};
  padding: 16px;
  box-shadow: none;
  animation: ${slideInRight} 280ms ease both;
  z-index: 1001;
  color: ${({ theme }) => theme.text};
  opacity: 1;
  backdrop-filter: none;
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
  const [open, setOpen] = useState(false)
  const navRef = useRef(null)
  const location = useLocation()
  const navigate = useNavigate()
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
    const ids = ['sobre', 'projetos', 'habilidades', 'contato']
    const els = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean)
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

  const close = () => setOpen(false)
  const toggle = () => setOpen((v) => !v)

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
        <BrandButton type="button" onClick={goHomeTop} aria-label="Ir ao topo da About">
          {/* Avatar só aparece no mobile se o menu não estiver aberto */}
          <span style={{display: 'flex', alignItems: 'center', gap: 12}}>
            <span style={{display: 'inline-block'}}>
              <Avatar
                src="/Rodrigo_portifolio.jpg"
                alt="Rodrigo Albuquerque"
                loading="eager"
                decoding="async"
                fetchPriority="high"
                style={{
                  display: (typeof window !== 'undefined' && window.innerWidth <= 768 && open) ? 'none' : undefined
                }}
              />
            </span>
            Rodrigo Albuquerque
          </span>
        </BrandButton>
        <Nav>
          <Link to="/" data-spy-active={activeHash === '#sobre'}>Sobre</Link>
          <Link to="/projetos" data-spy-active={activeHash === '#projetos'}>Projetos</Link>
          <Link to="/habilidades" data-spy-active={activeHash === '#habilidades'}>Habilidades</Link>
          <Link to="/contato" data-spy-active={activeHash === '#contato'}>Contato</Link>
          <ThemeToggle />
        </Nav>
        <MenuButton aria-label={open ? 'Fechar menu' : 'Abrir menu'} aria-expanded={open} aria-controls="mobile-menu" onClick={toggle}>
          <Hamburger className={open ? 'open' : ''}><i /></Hamburger>
        </MenuButton>
      </Container>
      {open && (
        <>
          <Overlay role="presentation" onClick={() => setOpen(false)} />
          <MobileNav ref={navRef} id="mobile-menu" role="dialog" aria-modal="true" aria-label="Menu">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <Brand>
                <Avatar src="/Rodrigo_portifolio.jpg" alt="Rodrigo Albuquerque" loading="eager" decoding="async" fetchPriority="high" />
                <span>Menu</span>
              </Brand>
              <ThemeToggle />
            </div>
            <MobileList>
              <MobileLink to="/" data-spy-active={activeHash === '#sobre'} onClick={close}>Sobre</MobileLink>
              <MobileLink to="/projetos" data-spy-active={activeHash === '#projetos'} onClick={close}>Projetos</MobileLink>
              <MobileLink to="/habilidades" data-spy-active={activeHash === '#habilidades'} onClick={close}>Habilidades</MobileLink>
              <MobileLink to="/contato" data-spy-active={activeHash === '#contato'} onClick={close}>Contato</MobileLink>
            </MobileList>
          </MobileNav>
        </>
      )}
    </Wrapper>
  )
}
