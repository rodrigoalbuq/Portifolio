import styled from 'styled-components'
import { useContext } from 'react'
import { LanguageContext } from '../components/Header.jsx'
import {
  FaBootstrap,
  FaCheckCircle,
  FaCloudUploadAlt,
  FaCode,
  FaCss3Alt,
  FaGithub,
  FaHtml5,
  FaJsSquare,
  FaMobileAlt,
  FaNodeJs,
  FaReact,
  FaRocket,
  FaSass,
  FaSearch,
} from 'react-icons/fa'
import {
  SiAxios,
  SiCssmodules,
  SiNextdotjs,
  SiPwa,
  SiStyledcomponents,
  SiTailwindcss,
  SiTypescript,
  SiVite,
} from 'react-icons/si'

const Section = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 52px 24px 0;
  color: ${({ theme }) => theme.text};
`

const Title = styled.h2`
  margin: 0 0 12px 0;
  font-size: clamp(2.1rem, 3vw, 3.4rem);
  letter-spacing: -0.06em;
  font-weight: 700;
`

const Grid = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(92px, 100%), 1fr));
  gap: 14px 10px;
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;

  @media (max-width: 420px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`

const Item = styled.li`
  position: relative;
  display: grid;
  place-items: center;
  min-width: 0;
  width: 100%;
  gap: 5px;
  min-height: 64px;
  background: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  padding: 6px 4px;
  color: ${({ theme }) => theme.text};
  transition: border-color 0.2s ease;
  &:hover {
    border-color: ${({ theme }) => theme.accent};
    box-shadow: none;
  }
`

const SkillIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.accent};
  font-size: 2rem;
  transition: color 0.2s ease, transform 0.2s ease;
  ${Item}:hover & {
    color: ${({ theme }) => theme.accentHover};
    transform: scale(1.08);
  }
`

const SkillName = styled.span`
  display: block;
  width: 100%;
  max-width: 100%;
  color: ${({ theme }) => theme.muted};
  font-size: 0.65rem;
  line-height: 1.2;
  text-align: center;
  overflow-wrap: anywhere;
`

const CatTitle = styled.h3`
  margin: 22px 0 12px 0;
  color: ${({ theme }) => theme.muted};
  font-size: 0.82rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  font-weight: 700;
`

const skillIcons = {
  'JavaScript (ES6+)': FaJsSquare,
  TypeScript: SiTypescript,
  React: FaReact,
  'Next.js': SiNextdotjs,
  Vite: SiVite,
  'Node.js': FaNodeJs,
  'HTML5/CSS3': FaHtml5,
  Sass: FaSass,
  'Styled Components': SiStyledcomponents,
  'CSS Modules': SiCssmodules,
  Bootstrap: FaBootstrap,
  'Tailwind CSS': SiTailwindcss,
  'CSS BEM': FaCss3Alt,
  'Git & GitHub': FaGithub,
  'Deploy (Vercel)': FaCloudUploadAlt,
  Fetch: FaCode,
  Axios: SiAxios,
  'REST APIs': FaCode,
  'Responsive Design': FaMobileAlt,
  'Design Responsivo': FaMobileAlt,
  'Mobile First': FaMobileAlt,
  'Boas Práticas': FaCheckCircle,
  'Best Practices': FaCheckCircle,
  PWA: SiPwa,
  AJAX: FaCode,
  'Design Patterns': FaRocket,
  SEO: FaSearch,
}

export default function Skills() {
  const { lang } = useContext(LanguageContext) || { lang: 'pt' }

  const categories =
    lang === 'pt'
      ? [
          { name: 'Linguagens', items: ['JavaScript (ES6+)', 'TypeScript'] },
          { name: 'Frameworks & Build', items: ['React', 'Next.js', 'Vite', 'Node.js'] },
          {
            name: 'Estilização',
            items: ['HTML5/CSS3', 'Sass', 'Styled Components', 'CSS Modules', 'Bootstrap', 'Tailwind CSS', 'CSS BEM'],
          },
          { name: 'Ferramentas', items: ['Git & GitHub', 'Deploy (Vercel)', 'Fetch', 'Axios'] },
          {
            name: 'Conceitos',
            items: ['REST APIs', 'Design Responsivo', 'Mobile First', 'Boas Práticas', 'PWA', 'AJAX', 'Design Patterns', 'SEO'],
          },
        ]
      : [
          { name: 'Languages', items: ['JavaScript (ES6+)', 'TypeScript'] },
          { name: 'Frameworks & Build', items: ['React', 'Next.js', 'Vite', 'Node.js'] },
          {
            name: 'Styling',
            items: ['HTML5/CSS3', 'Sass', 'Styled Components', 'CSS Modules', 'Bootstrap', 'Tailwind CSS', 'CSS BEM'],
          },
          { name: 'Tools', items: ['Git & GitHub', 'Deploy (Vercel)', 'Fetch', 'Axios'] },
          {
            name: 'Concepts',
            items: ['REST APIs', 'Responsive Design', 'Mobile First', 'Best Practices', 'PWA', 'AJAX', 'Design Patterns', 'SEO'],
          },
        ]

  return (
    <Section className="fade-in">
      <Title>{lang === 'pt' ? 'Habilidades' : 'Skills'}</Title>
      {categories.map((cat) => (
        <div key={cat.name}>
          <CatTitle>{cat.name}</CatTitle>
          <Grid>
            {cat.items.map((s) => (
              <Item key={s} title={s} aria-label={s}>
                <SkillIcon aria-hidden="true">
                  {(() => {
                    const Icon = skillIcons[s] || FaCode
                    return <Icon />
                  })()}
                </SkillIcon>
                <SkillName>{s}</SkillName>
              </Item>
            ))}
          </Grid>
        </div>
      ))}
    </Section>
  )
}
