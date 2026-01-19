import styled from 'styled-components'

const Card = styled.article`
  background: ${({ theme }) => theme.surface}CC;
  border: 1.5px solid ${({ theme }) => theme.border};
  border-radius: clamp(10px, 2vw, 18px);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    background 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(12px) saturate(1.12);
  -webkit-backdrop-filter: blur(12px) saturate(1.12);
  &:hover {
    transform: translateY(-2px);
    box-shadow:
      0 8px 28px rgba(0, 0, 0, 0.18),
      0 0 0 2px ${({ theme }) => theme.accent}33,
      0 4px 32px 0 ${({ theme }) => theme.accent}22;
    background: ${({ theme }) => theme.surface}F2;
  }
`

const Cover = styled.img`
  width: 100%;
  height: clamp(120px, 24vw, 200px);
  object-fit: cover;
`

const Body = styled.div`
  padding: clamp(12px, 4vw, 28px) clamp(10px, 3vw, 24px) clamp(10px, 3vw, 20px)
    clamp(10px, 3vw, 24px);
  color: ${({ theme }) => theme.text};
  display: flex;
  flex-direction: column;
  flex: 1;
`

const Title = styled.h3`
  margin: 0 0 clamp(6px, 1vw, 14px) 0;
  font-size: clamp(1.05rem, 2vw, 1.25rem);
`

const Desc = styled.p`
  margin: 0 0 clamp(8px, 1vw, 16px) 0;
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
  padding: clamp(4px, 0.7vw, 8px) clamp(8px, 2vw, 16px);
  border-radius: 999px;
  font-size: clamp(0.82rem, 1.5vw, 1rem);
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
  transition:
    background 0.2s ease,
    transform 0.1s ease;
  &:hover {
    background: ${({ theme }) => theme.accentHover};
    transform: translateY(-1px);
  }
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
          <A href={project.demo} target="_blank" rel="noreferrer">
            Demo
          </A>
          <A href={project.repo} target="_blank" rel="noreferrer">
            Código
          </A>
        </Actions>
      </Body>
    </Card>
  )
}
