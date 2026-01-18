import styled from 'styled-components'

const Card = styled.article`
  background: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  &:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(0,0,0,0.15); }
`

const Cover = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
`

const Body = styled.div`
  padding: 16px;
  color: ${({ theme }) => theme.text};
  display: flex;
  flex-direction: column;
  flex: 1;
`

const Title = styled.h3`
  margin: 0 0 8px 0;
  font-size: 1.125rem;
`

const Desc = styled.p`
  margin: 0 0 12px 0;
  color: ${({ theme }) => theme.muted};
  line-height: 1.6;
`

const Tags = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 0 0 12px 0;
  padding: 0;
  list-style: none;
`

const Tag = styled.li`
  background: ${({ theme }) => theme.navActiveBg};
  color: ${({ theme }) => theme.muted};
  padding: 6px 10px;
  border-radius: 999px;
  font-size: 0.875rem;
`

const Actions = styled.div`
  display: flex;
  gap: 12px;
  margin-top: auto;
`

const A = styled.a`
  text-decoration: none;
  background: ${({ theme }) => theme.accent};
  color: ${({ theme }) => theme.bg};
  padding: 8px 12px;
  border-radius: 8px;
  font-weight: 600;
  transition: background 0.2s ease, transform 0.1s ease;
  &:hover { background: ${({ theme }) => theme.accentHover}; transform: translateY(-1px); }
`

export default function ProjectCard({ project }) {
  return (
    <Card>
      <Cover src={project.image} alt={project.name} />
      <Body>
        <Title>{project.name}</Title>
        <Desc>{project.description}</Desc>
        <Tags>
          {project.techs.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </Tags>
        <Actions>
          <A href={project.demo} target="_blank" rel="noreferrer">Demo</A>
          <A href={project.repo} target="_blank" rel="noreferrer">Código</A>
        </Actions>
      </Body>
    </Card>
  )
}
