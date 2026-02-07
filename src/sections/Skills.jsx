// Parágrafo informativo com cor do tema (muted)
const InfoText = styled.p`
  color: ${({ theme }) => theme.muted};
`
// Importa styled-components para estilização e useState para controle de seleção
import styled from 'styled-components'
import { useState, useContext } from 'react'
import { LanguageContext } from '../components/Header.jsx'

// Container principal da seção de habilidades
const Section = styled.section`
  max-width: 1120px;
  margin: 40px auto;
  padding: 0 24px;
  color: ${({ theme }) => theme.text};
`

// Título da seção
const Title = styled.h2`
  margin: 0 0 12px 0;
`

// Grid responsivo para listar habilidades
const Grid = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
  list-style: none;
  padding: 0;
`

// Cada item/habilidade individual
const Item = styled.li`
  background: ${({ theme }) => theme.surface};
  border: ${({ theme, $selected }) =>
    $selected ? `2px solid ${theme.accent}` : `1px solid ${theme.border}`};
  border-radius: 14px;
  padding: 12px 16px;
  color: ${({ theme }) => theme.muted};
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.06);
  transition:
    transform 0.15s ease,
    box-shadow 0.2s ease,
    border-color 0.2s ease,
    border-width 0.2s ease;
  cursor: pointer;
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 10px 24px rgba(0, 0, 0, 0.08);
  }
  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.accent};
    outline-offset: 2px;
  }
`

// Título de cada categoria de habilidades
const CatTitle = styled.h3`
  margin: 24px 0 8px 0;
  color: ${({ theme }) => theme.muted};
  font-weight: 600;
`

export default function Skills() {
  const { lang } = useContext(LanguageContext) || { lang: 'pt' }

  const [selected, setSelected] = useState('')
  const categories =
    lang === 'pt'
      ? [
          {
            name: 'Linguagens',
            items: ['JavaScript (ES6+)', 'TypeScript'],
          },
          {
            name: 'Frameworks & Build',
            items: ['React', 'Next.js', 'Vite', 'Node.js'],
          },
          {
            name: 'Estilização',
            items: [
              'HTML5/CSS3',
              'Sass',
              'Styled Components',
              'CSS Modules',
              'Bootstrap',
              'Tailwind CSS',
              'CSS BEM',
            ],
          },
          {
            name: 'Ferramentas',
            items: ['Git & GitHub', 'Deploy (Vercel)', 'Fetch', 'Axios'],
          },
          {
            name: 'Conceitos',
            items: [
              'REST APIs',
              'Design Responsivo',
              'Mobile First',
              'Boas Práticas',
              'PWA',
              'AJAX',
              'Design Patterns',
              'SEO',
            ],
          },
        ]
      : [
          {
            name: 'Languages',
            items: ['JavaScript (ES6+)', 'TypeScript'],
          },
          {
            name: 'Frameworks & Build',
            items: ['React', 'Next.js', 'Vite', 'Node.js'],
          },
          {
            name: 'Styling',
            items: [
              'HTML5/CSS3',
              'Sass',
              'Styled Components',
              'CSS Modules',
              'Bootstrap',
              'Tailwind CSS',
              'CSS BEM',
            ],
          },
          {
            name: 'Tools',
            items: ['Git & GitHub', 'Deploy (Vercel)', 'Fetch', 'Axios'],
          },
          {
            name: 'Concepts',
            items: [
              'REST APIs',
              'Responsive Design',
              'Mobile First',
              'Best Practices',
              'PWA',
              'AJAX',
              'Design Patterns',
              'SEO',
            ],
          },
        ]

  return (
    <Section className="fade-in">
      <Title>{lang === 'pt' ? 'Habilidades' : 'Skills'}</Title>
      {/* Descrição introdutória */}
      <InfoText>
        {lang === 'pt'
          ? 'A seguir estão algumas das minhas principais habilidades técnicas.'
          : 'Here are some of my main technical skills.'}
      </InfoText>
      {/* Renderiza cada categoria de habilidades */}
      {categories.map((cat) => (
        <div key={cat.name}>
          <CatTitle>{cat.name}</CatTitle>
          <Grid>
            {/* Renderiza cada habilidade da categoria */}
            {cat.items.map((s) => (
              <Item
                key={s}
                role="button"
                tabIndex={0}
                aria-label={lang === 'pt' ? `Selecionar habilidade: ${s}` : `Select skill: ${s}`}
                aria-pressed={selected === s}
                $selected={selected === s}
                // Alterna seleção ao clicar
                onClick={() => setSelected((prev) => (prev === s ? '' : s))}
                // Permite seleção via teclado
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setSelected((prev) => (prev === s ? '' : s))
                  }
                }}
              >
                {s}
              </Item>
            ))}
          </Grid>
        </div>
      ))}
    </Section>
  )
}
