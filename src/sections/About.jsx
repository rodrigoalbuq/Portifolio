// Seção About: apresenta informações, animações e integra outras seções
import styled, { keyframes } from 'styled-components'
import { Link } from 'react-router-dom'
import Projects from './Projects.jsx'
import Skills from './Skills.jsx'
import Contact from './Contact.jsx'
import Reveal from '../components/Reveal.jsx'

// Animação de sublinhado
const underlineGrow = keyframes`
  0% { transform: scaleX(0); }
  100% { transform: scaleX(1); }
`

// Animação de entrada para elementos
const revealUp = keyframes`
  0% { opacity: 0; transform: translateY(8px); }
  100% { opacity: 1; transform: translateY(0); }
`

// Animação de flutuação para foto
const floatY = keyframes`
  0% { transform: translateY(0); }
  100% { transform: translateY(-6px); }
`

// Animação de revelação da foto
const unveilPhoto = keyframes`
  0% { opacity: 0; transform: scale(1.04); filter: blur(6px); }
  100% { opacity: 1; transform: scale(1); filter: blur(0); }
`

// Container principal da seção About
const Section = styled.section`
  width: 100%;
  min-height: 100vh;
  background: none;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 40px 0;
`

// Animação de fade-in para o card principal
const aboutCardFadeIn = keyframes`
  0% { opacity: 0; transform: translateY(32px) scale(0.98); }
  100% { opacity: 1; transform: translateY(0) scale(1); }
`

// Card principal com efeito glassmorphism
const AboutCard = styled.div`
  width: 100%;
  max-width: 1400px;
  background: ${({ theme }) => theme.surface}CC;
  border-radius: clamp(12px, 3vw, 32px);
  box-shadow:
    0 8px 40px rgba(0, 0, 0, 0.1),
    0 0 0 2px ${({ theme }) => theme.accent}33,
    0 4px 48px 0 ${({ theme }) => theme.accent}22;
  padding: clamp(18px, 5vw, 48px) clamp(8px, 4vw, 32px);
  color: ${({ theme }) => theme.text};
  backdrop-filter: blur(16px) saturate(1.15);
  -webkit-backdrop-filter: blur(16px) saturate(1.15);
  border: 1.5px solid ${({ theme }) => theme.border};
  & > * {
    will-change: opacity, transform;
  }
  @media (max-width: 700px) {
    padding: 18px 4vw;
    border-radius: 14px;
  }
  animation: ${aboutCardFadeIn} 0.7s cubic-bezier(0.4, 0, 0.2, 1) 80ms both;
`

const Hero = styled.div`
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: 20px;
  align-items: center;
`

const PhotoWrap = styled.div`
  position: relative;
  display: inline-block;
  animation: ${floatY} 6s ease-in-out infinite alternate;
  margin-left: -8px;
`

const Photo = styled.img`
  width: clamp(96px, 12vw, 140px);
  height: clamp(96px, 12vw, 140px);
  border-radius: clamp(10px, 1.2vw, 14px);
  object-fit: cover;
  border: 2px solid ${({ theme }) => theme.accent};
  opacity: 0;
  transform: scale(1.04);
  filter: blur(6px);
  animation: ${unveilPhoto} 1200ms ease-out 100ms both;
`

const Title = styled.h1`
  margin: 0 0 8px 0;
  font-size: 1.75rem;
  position: relative;
  display: inline-block;
  animation: ${revealUp} 320ms ease both;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: -6px;
    height: 3px;
    background: linear-gradient(
      90deg,
      ${({ theme }) => theme.accent},
      ${({ theme }) => theme.link}
    );
    border-radius: 2px;
    transform: scaleX(0);
    transform-origin: left;
    animation: ${underlineGrow} 420ms ease 120ms both;
  }
`

const Bio = styled.p`
  margin: 8px 0 0 0;
  color: ${({ theme }) => theme.muted};
  line-height: 1.7;
  animation: ${revealUp} 360ms ease 140ms both;
`

const Contacts = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 16px;
  animation: ${revealUp} 380ms ease 180ms both;
`

const A = styled.a`
  text-decoration: none;
  color: ${({ theme }) => theme.link};
  transition: color 0.2s ease;
  &:hover {
    color: ${({ theme }) => theme.accentHover};
  }
`

export default function About() {
  const isMobile =
    typeof window !== 'undefined' && typeof window.matchMedia === 'function'
      ? window.matchMedia('(max-width: 640px)').matches
      : false
  const sectionThreshold = isMobile ? 0.15 : 0.5
  return (
    <Section id="sobre" className="fade-in">
      <AboutCard>
        <Hero>
          <PhotoWrap>
            <Photo src="/Rodrigo_portifolio.jpg" alt="Rodrigo Albuquerque" />
          </PhotoWrap>
          <div>
            <Reveal delayMs={120} threshold={0.15}>
              <Title>Olá, meu nome é Rodrigo Albuquerque</Title>
            </Reveal>
            <Reveal delayMs={220} threshold={0.15}>
              <Bio>
                Possuo bacharelado em Ciência da Computação e atuo como desenvolvedor Front-end Júnior, focado em criar interfaces simples, modernas e
                responsivas. Estou em constante aprendizado e busco evoluir minhas habilidades
                transformando ideias em experiências digitais funcionais e agradáveis. Tenho atenção
                aos detalhes, gosto de boas práticas e estou sempre aberto a novos desafios e
                tecnologias.
              </Bio>
            </Reveal>
            <Reveal delayMs={320} threshold={0.15}>
              <Contacts>
                <A href="https://github.com/rodrigoalbuq" target="_blank" rel="noreferrer">
                  GitHub
                </A>
                <Link
                  to="/contato"
                  style={{
                    textDecoration: 'none',
                    color: 'inherit',
                    transition: 'color 0.2s ease',
                  }}
                >
                  <A as="span">Email</A>
                </Link>
                <A href="https://wa.me/5581994236672" target="_blank" rel="noreferrer">
                  WhatsApp{' '}
                </A>
              </Contacts>
            </Reveal>
          </div>
        </Hero>
        <Reveal id="projetos" delayMs={120} threshold={sectionThreshold}>
          <Projects />
        </Reveal>
        <Reveal id="habilidades" delayMs={180} threshold={sectionThreshold}>
          <Skills />
        </Reveal>
        <Reveal id="contato" delayMs={240} threshold={sectionThreshold}>
          <Contact />
        </Reveal>
      </AboutCard>
    </Section>
  )
}
