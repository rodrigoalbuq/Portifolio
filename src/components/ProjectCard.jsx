import styled from 'styled-components'

const Card = styled.article`
  background: rgba(255,255,255,0.06);
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 18px 32px rgba(15, 23, 42, 0.12);
    border-color: ${({ theme }) => theme.accent};
  }
`

const Cover = styled.img`
  width: 100%;
  aspect-ratio: 16 / 10;
  height: auto;
  object-fit: cover;
`

const Body = styled.div`
  padding: 22px 20px 20px;
  color: ${({ theme }) => theme.text};
  display: flex;
  flex-direction: column;
  flex: 1;
`

const Title = styled.h3`
  margin: 0 0 10px 0;
  font-size: 1.3rem;
  letter-spacing: -0.04em;
`

const Desc = styled.p`
  margin: 0 0 14px 0;
  color: ${({ theme }) => theme.muted};
  line-height: 1.7;
`

const Tags = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 0 0 16px 0;
  padding: 0;
  list-style: none;
`

const Tag = styled.li`
  background: rgba(15, 23, 42, 0.04);
  color: ${({ theme }) => theme.text};
  border: 1px solid ${({ theme }) => theme.border};
  padding: 6px 10px;
  border-radius: 4px;
  font-size: 0.73rem;
  font-weight: 600;
`

const Actions = styled.div`
  display: flex;
  gap: 12px;
  margin-top: auto;
  margin-bottom: 4px;
  max-height: 0;
  overflow: hidden;
  opacity: 0;
  transform: translateY(8px);
  transition: max-height 0.45s ease, opacity 0.45s ease, transform 0.45s ease;
  ${Card}:hover &,
  ${Card}:focus-within & {
    max-height: 48px;
    opacity: 1;
    transform: translateY(0);
  }
`

const A = styled.a`
  text-decoration: none;
  background: ${({ theme }) => theme.accent};
  color: #fff;
  padding: 9px 14px;
  border-radius: 5px;
  font-weight: 700;
  transition: transform 0.2s ease, opacity 0.2s ease;
  &:hover {
    transform: translateY(-1px);
    opacity: 0.96;
  }
`

const Secondary = styled.a`
  text-decoration: none;
  color: ${({ theme }) => theme.text};
  padding: 9px 14px;
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.border};
  font-weight: 600;
  transition: border-color 0.2s ease;
  &:hover {
    border-color: ${({ theme }) => theme.accent};
  }
`

export default function ProjectCard({ project, lang }) {
  return (
    <Card>
      <Cover src={project.image} alt={project.name} />
      <Body>
        <Title>{project.name}</Title>
        <Desc>{lang === 'en' ? project.descriptionEn : project.descriptionPt}</Desc>
        <Tags>
          {project.techs.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </Tags>
        <Actions>
          <A href={project.demo} target="_blank" rel="noreferrer">
            Demo
          </A>
          <Secondary href={project.repo} target="_blank" rel="noreferrer">
            {lang === 'en' ? 'Code' : 'Código'}
          </Secondary>
        </Actions>
      </Body>
    </Card>
  )
}
