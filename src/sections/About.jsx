import styled, { keyframes } from 'styled-components'
import Projects from './Projects.jsx'
import Skills from './Skills.jsx'
import Contact from './Contact.jsx'
import Reveal from '../components/Reveal.jsx'


const underlineGrow = keyframes`
  0% { transform: scaleX(0); }
  100% { transform: scaleX(1); }
`

const revealUp = keyframes`
  0% { opacity: 0; transform: translateY(8px); }
  100% { opacity: 1; transform: translateY(0); }
`

const floatY = keyframes`
  0% { transform: translateY(0); }
  100% { transform: translateY(-6px); }
`

const unveilPhoto = keyframes`
  0% { opacity: 0; transform: scale(1.04); filter: blur(6px); }
  100% { opacity: 1; transform: scale(1); filter: blur(0); }
`

const Section = styled.section`
  max-width: 1120px;
  margin: 40px auto;
  padding: 0 24px;
  color: ${({ theme }) => theme.text};
  & > * { will-change: opacity, transform; }
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
    background: linear-gradient(90deg, ${({ theme }) => theme.accent}, ${({ theme }) => theme.link});
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
  &:hover { color: ${({ theme }) => theme.accentHover}; }
`

export default function About() {
  const isMobile = (typeof window !== 'undefined' && typeof window.matchMedia === 'function')
    ? window.matchMedia('(max-width: 640px)').matches
    : false
  const sectionThreshold = isMobile ? 0.15 : 0.5
  return (
    <Section id="sobre" className="fade-in">
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
              Sou desenvolvedor Front-end Júnior, focado em criar interfaces simples, modernas e responsivas. Estou em constante aprendizado e busco evoluir minhas habilidades transformando ideias em experiências digitais funcionais e agradáveis. Tenho atenção aos detalhes, gosto de boas práticas e estou sempre aberto a novos desafios e tecnologias.
              </Bio>
            </Reveal>
            <Reveal delayMs={320} threshold={0.15}>
              <Contacts>
                <A href="https://github.com/rodrigoalbuq" target="_blank" rel="noreferrer">GitHub</A>
                <A href="/contato">Email</A>
                <A href="https://wa.me/5581994236672" target="_blank" rel="noreferrer">WhatsApp </A>
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
    </Section>
  )
}
