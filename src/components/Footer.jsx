import styled from 'styled-components'
import { FaWhatsapp } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { LanguageContext } from './Header.jsx'
import { translations } from '../data/translations.js'

const Wrapper = styled.footer`
  background: ${({ theme }) => theme.navBg};
  border-top: 1px solid ${({ theme }) => theme.border};
`

const Container = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  padding: 24px;
  color: ${({ theme }) => theme.muted};
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0;
  }
`

const Links = styled.div`
  display: flex;
  gap: 16px;
  @media (max-width: 600px) {
    margin-top: 18px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
  }
`

const IconLink = styled.a`
  color: ${({ theme }) => theme.text};
  text-decoration: none;
  transition: color 0.2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 6px;
  &:hover {
    color: ${({ theme }) => theme.accent};
  }
  svg {
    width: 20px;
    height: 20px;
  }
`

// Rodapé do site com links sociais e copyright
export default function Footer() {
  const { lang } = useContext(LanguageContext) || { lang: 'pt' }
  const t = translations[lang]
  return (
    <Wrapper>
      <Container>
        {/* Desktop: nome e ano à esquerda, ícones à direita */}
        <span className="footer-copy">
          © {new Date().getFullYear()} {t.name}
        </span>
        <Links className="footer-links">
          {/* GitHub */}
          <IconLink
            href="https://github.com/rodrigoalbuq"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            title="GitHub"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.071 1.531 1.032 1.531 1.032.892 1.527 2.341 1.087 2.91.832.091-.647.35-1.087.636-1.338-2.22-.252-4.555-1.11-4.555-4.944 0-1.091.39-1.984 1.029-2.682-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.026A9.577 9.577 0 0 1 12 6.844c.85.004 1.705.115 2.503.337 1.909-1.295 2.748-1.026 2.748-1.026.546 1.377.202 2.394.1 2.647.64.698 1.027 1.591 1.027 2.682 0 3.842-2.338 4.688-4.566 4.936.36.31.68.921.68 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.579.688.48A10.013 10.013 0 0 0 22 12c0-5.523-4.477-10-10-10Z" />
            </svg>
          </IconLink>
          {/* Email interno */}
          <IconLink
            as={Link}
            to="/contato"
            aria-label={lang === 'pt' ? 'Email' : 'Email'}
            title={lang === 'pt' ? 'Email' : 'Email'}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="M3 7l9 6 9-6" />
            </svg>
          </IconLink>
          {/* WhatsApp */}
          <IconLink
            href="https://wa.me/5581994236672"
            target="_blank"
            rel="noreferrer"
            aria-label={lang === 'pt' ? 'WhatsApp' : 'WhatsApp'}
            title={lang === 'pt' ? 'WhatsApp' : 'WhatsApp'}
          >
            <FaWhatsapp />
          </IconLink>
          {/* LinkedIn */}
          <IconLink
            href="https://www.linkedin.com/in/rodrigoalvalbq/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            title="LinkedIn"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11.75 20h-2.5v-10h2.5v10zm-1.25-11.25c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13 11.25h-2.5v-5.5c0-1.1-.9-2-2-2s-2 .9-2 2v5.5h-2.5v-10h2.5v1.25c.41-.77 1.23-1.25 2.25-1.25 1.66 0 3 1.34 3 3v7z" />
            </svg>
          </IconLink>
        </Links>
      </Container>
      {/* Mobile: nome e ano centralizados, ícones abaixo */}
      <style>{`
        @media (max-width: 600px) {
          .footer-copy {
            width: 100%;
            text-align: center;
            font-weight: 600;
            font-size: 1rem;
            margin-bottom: 0;
          }
          .footer-links {
            margin-top: 18px;
            display: flex;
            flex-direction: row;
            justify-content: center;
            width: 100%;
          }
        }
      `}</style>
    </Wrapper>
  )
}
