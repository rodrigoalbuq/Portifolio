import styled from 'styled-components'
import { projects } from '../data/projects.js'
import ProjectCard from '../components/ProjectCard.jsx'

const Section = styled.section`
  max-width: 1120px;
  margin: 40px auto;
  padding: 0 24px;
  color: ${({ theme }) => theme.text};
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`

const Title = styled.h2`
  margin: 0 0 16px 0;
`

const Note = styled.p`
  color: ${({ theme }) => theme.muted};
`

export default function Projects() {
  return (
    <Section className="fade-in">
      <Title>Projetos</Title>
      <Note>Veja alguns dos meus principais projetos desenvolvidos.</Note>
      <Grid>
        {projects.map((p) => (
          <ProjectCard key={p.name} project={p} />
        ))}
      </Grid>
    </Section>
  )
}
