import styled from 'styled-components'
import { projects } from '../data/projects.js'
import ProjectCard from '../components/ProjectCard.jsx'
import { useContext } from 'react'
import { LanguageContext } from '../components/Header.jsx'
import { translations } from '../data/translations.js'

const Section = styled.section`
  max-width: 1280px;
  margin: 0 auto;
  padding: 104px 24px 0;
  color: ${({ theme }) => theme.text};
`

const Header = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 16px;
  margin-bottom: 34px;
  @media (max-width: 640px) {
    flex-direction: column;
    align-items: flex-start;
  }
`

const Title = styled.h2`
  margin: 0;
  font-size: clamp(2.2rem, 3vw, 3.6rem);
  letter-spacing: -0.06em;
  font-weight: 700;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`

export default function Projects() {
  const { lang } = useContext(LanguageContext) || { lang: 'pt' }
  const t = translations[lang]

  return (
    <Section className="fade-in">
      <Header>
        <Title>{t.projects}</Title>
      </Header>
      <Grid>
        {projects.map((p) => (
          <ProjectCard key={p.name} project={p} lang={lang} />
        ))}
      </Grid>
    </Section>
  )
}
