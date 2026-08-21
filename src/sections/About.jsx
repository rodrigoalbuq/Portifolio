// Seção About: apresenta informações, animações e integra outras seções
import styled, { keyframes } from 'styled-components'
import Projects from './Projects.jsx'
import Skills from './Skills.jsx'
import Contact from './Contact.jsx'
import Reveal from '../components/Reveal.jsx'
import { useContext, useEffect, useState } from 'react'
import { LanguageContext } from '../components/Header.jsx'
import { translations } from '../data/translations.js'

const revealUp = keyframes`
  0% { opacity: 0; transform: translateY(8px); }
  100% { opacity: 1; transform: translateY(0); }
`

const floatY = keyframes`
  0% { transform: translateY(0); }
  100% { transform: translateY(-8px); }
`

const orbitRing = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`

const Section = styled.section`
  width: 100%;
  background: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text};
  padding-bottom: 32px;
`

const AboutCard = styled.div`
  width: 100%;
  max-width: 1500px;
  margin: 0 auto;
  padding: 0 0 32px;
  & > * {
    will-change: opacity, transform;
  }
`

const Hero = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(420px, 1fr);
  gap: 0;
  align-items: end;
  min-height: 760px;
  max-width: 1550px;
  margin: 0 auto;
  @media (max-width: 980px) {
    grid-template-columns: 1fr;
    min-height: unset;
  }
`

const HeroTextBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 760px;
  padding: 40px 0 16px 44px;
  @media (max-width: 980px) {
    min-height: unset;
    padding: 40px 24px 8px;
    justify-content: flex-start;
  }
`

const HeroText = styled.div`
  max-width: 660px;
  width: 100%;
  padding-right: 28px;
`

const Eyebrow = styled.span`
  display: inline-block;
  margin-bottom: 18px;
  color: ${({ theme }) => theme.accent};
  font-size: 0.76rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  animation: ${revealUp} 280ms ease both;
`

const Title = styled.h1`
  margin: 0;
  max-width: 700px;
  font-size: clamp(2.8rem, 4vw, 5.2rem);
  line-height: 0.92;
  letter-spacing: -0.06em;
  font-weight: 700;
  white-space: pre-line;
  animation: ${revealUp} 320ms ease both;
`

const TypingCursor = styled.span`
  display: inline-block;
  width: 0.06em;
  height: 0.82em;
  margin-left: 0.08em;
  vertical-align: -0.06em;
  background: ${({ theme }) => theme.accent};
  animation: blink 700ms step-end infinite;

  @keyframes blink {
    50% { opacity: 0; }
  }
`

const AfterIntro = styled.div`
  margin-top: 34px;
`

const Bio = styled.p`
  max-width: 620px;
  margin: 18px 0 0 0;
  color: ${({ theme }) => theme.muted};
  font-size: 1.02rem;
  line-height: 1.7;
  animation: ${revealUp} 360ms ease 120ms both;
`

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-top: 28px;
  animation: ${revealUp} 420ms ease 180ms both;
`

const PrimaryButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 18px;
  border-radius: 999px;
  background: ${({ theme }) => theme.accent};
  color: #fff;
  text-decoration: none;
  font-weight: 700;
  transition: transform 0.2s ease, opacity 0.2s ease;
  &:hover {
    transform: translateY(-1px);
    opacity: 0.96;
  }
`

const SocialLinks = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 18px;
  animation: ${revealUp} 440ms ease 220ms both;
`

const SocialLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 44px;
  height: 44px;
  padding: 0 14px;
  border-radius: 999px;
  color: ${({ theme }) => theme.text};
  text-decoration: none;
  background: rgba(15, 23, 42, 0.02);
  border: 1px solid ${({ theme }) => theme.border};
  transition: border-color 0.2s ease, transform 0.2s ease;
  &:hover {
    transform: translateY(-1px);
    border-color: ${({ theme }) => theme.accent};
  }
`

const PhotoCard = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  min-height: 760px;
  background: transparent;
  animation: ${floatY} 6s ease-in-out infinite alternate;
  padding: 18px 24px 0 0;
  @media (max-width: 980px) {
    min-height: 420px;
    padding: 0 24px 0;
  }
`

const PhotoFrame = styled.div`
  position: relative;
  width: min(100%, 640px);
  height: auto;
  aspect-ratio: 1;
  overflow: visible;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  box-shadow: none;
  margin: 0 auto;
  isolation: isolate;

  &::before {
    content: '';
    position: absolute;
    inset: -1.25%;
    z-index: 0;
    border-radius: 50%;
    background: conic-gradient(
      from 0deg,
      ${({ theme }) => theme.accent} 0deg,
      ${({ theme }) => theme.accent} 235deg,
      ${({ theme }) => theme.accent} 285deg,
      #38bdf8 320deg,
      ${({ theme }) => theme.accent} 355deg,
      ${({ theme }) => theme.accent} 360deg
    );
    filter: drop-shadow(0 0 14px ${({ theme }) => theme.accent});
    animation: ${orbitRing} 10s linear infinite;
  }

  &::after {
    content: '';
    position: absolute;
    inset: -2.2%;
    z-index: 0;
    border-radius: 50%;
    background: conic-gradient(
      from 0deg,
      transparent 0deg,
      transparent 260deg,
      #a855f7 280deg,
      #38bdf8 340deg,
      transparent 360deg
    );
    -webkit-mask: radial-gradient(farthest-side, transparent calc(100% - 1.6%), #000 calc(100% - 1.2%));
    mask: radial-gradient(farthest-side, transparent calc(100% - 1.6%), #000 calc(100% - 1.2%));
    filter: drop-shadow(0 0 18px #a855f7);
    animation: ${orbitRing} 3.2s linear infinite;
    pointer-events: none;
  }
`

const Photo = styled.img`
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 1;
  object-fit: cover;
  object-position: center 12%;
  display: block;
  border-radius: 50%;
  background: #d5d7d9;
  filter: saturate(0.9) contrast(1.04) brightness(1.02);
  transform: scale(1.04);
`

export default function About() {
  const { lang } = useContext(LanguageContext) || { lang: 'pt' }
  const t = translations[lang]
  const introText = lang === 'pt' ? `Olá, eu sou o\n${t.name}` : `Hi, I am\n${t.name}`
  const [typedIntro, setTypedIntro] = useState('')
  const [introComplete, setIntroComplete] = useState(false)
  const [contentVisible, setContentVisible] = useState(false)

  useEffect(() => {
    let position = 0
    setTypedIntro('')
    setIntroComplete(false)
    setContentVisible(false)

    const timer = window.setInterval(() => {
      position += 1
      setTypedIntro(introText.slice(0, position))
      if (position >= introText.length) {
        window.clearInterval(timer)
        setIntroComplete(true)
      }
    }, 90)

    return () => window.clearInterval(timer)
  }, [introText])

  useEffect(() => {
    if (!introComplete) return
    const timer = window.setTimeout(() => setContentVisible(true), 520)
    return () => window.clearTimeout(timer)
  }, [introComplete])

  return (
    <Section id="sobre" className="fade-in">
      <AboutCard>
        <Hero>
          <HeroTextBox>
            <HeroText>
              <Title aria-label={introText}>
                {typedIntro}
                <TypingCursor aria-hidden="true" />
              </Title>
              {contentVisible && (
                <AfterIntro>
                  <Reveal delayMs={120} threshold={0.15}>
                    <Eyebrow>{lang === 'pt' ? 'Desenvolvedor Front-end' : 'Front-end Developer'}</Eyebrow>
                  </Reveal>
                  <Reveal delayMs={180} threshold={0.15}>
                    <Bio>
                      {lang === 'pt'
                        ? 'Possuo bacharelado em Ciência da Computação e atuo como desenvolvedor Front-end, focado em criar interfaces simples, modernas e responsivas. Estou em constante aprendizado e busco evoluir minhas habilidades transformando ideias em experiências digitais funcionais e agradáveis. Tenho atenção aos detalhes, gosto de boas práticas e estou sempre aberto a novos desafios e tecnologias.'
                        : 'I have a bachelor’s degree in Computer Science and work as a Front-end Developer, focused on creating simple, modern, and responsive interfaces. I am constantly learning and seek to improve my skills by turning ideas into functional and pleasant digital experiences. I pay attention to details, enjoy best practices, and am always open to new challenges and technologies.'}
                    </Bio>
                  </Reveal>
                  <Reveal delayMs={240} threshold={0.15}>
                    <Actions>
                      <PrimaryButton href="https://wa.me/5581994236672" target="_blank" rel="noreferrer">
                        {lang === 'pt' ? 'Entre em contato' : 'Get in touch'}
                      </PrimaryButton>
                    </Actions>
                  </Reveal>
                  <Reveal delayMs={280} threshold={0.15}>
                    <SocialLinks>
                      <SocialLink href="https://github.com/rodrigoalbuq" target="_blank" rel="noreferrer" aria-label="GitHub">
                        GitHub
                      </SocialLink>
                      <SocialLink href="https://www.linkedin.com/in/rodrigoalvalbq/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                        LinkedIn
                      </SocialLink>
                      <SocialLink href="mailto:rodrigoalbuq@gmail.com" aria-label="Email">
                        Email
                      </SocialLink>
                    </SocialLinks>
                  </Reveal>
                  </AfterIntro>
              )}
            </HeroText>
          </HeroTextBox>

          {contentVisible && (
            <Reveal delayMs={220} threshold={0.2}>
              <PhotoCard>
                <PhotoFrame>
                  <Photo src="/Rodrigo_Alves2.jpeg" alt={t.name} />
                </PhotoFrame>
              </PhotoCard>
            </Reveal>
          )}
        </Hero>

        {contentVisible && (
          <>
            <Reveal id="projetos" delayMs={120} threshold={0.45} focus>
              <Projects />
            </Reveal>
            <Reveal id="habilidades" delayMs={180} threshold={0.45} focus>
              <Skills />
            </Reveal>
            <Reveal id="contato" delayMs={240} threshold={0.45} focus>
              <Contact />
            </Reveal>
          </>
        )}
      </AboutCard>
    </Section>
  )
}
