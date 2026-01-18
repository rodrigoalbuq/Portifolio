import { render, screen } from '@testing-library/react'
import ProjectCard from './ProjectCard.jsx'
import { ThemeProvider } from 'styled-components'

const theme = {
  bg: '#0a0f1a',
  text: '#e2e8f0',
  surface: '#0b1220',
  border: 'rgba(255,255,255,0.08)',
  navActiveBg: '#1e293b',
  muted: '#94a3b8',
  accent: '#22d3ee',
  accentHover: '#0ea5b7',
}

function renderWithTheme(ui) {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>)
}

const project = {
  name: 'Cinelista',
  description: 'Aplicação para explorar filmes',
  techs: ['Next.js', 'React'],
  repo: 'https://github.com/rodrigoalbuq/nextjs-cinelista',
  demo: 'https://nextjs-cinelista-xi.vercel.app/',
  image: '/cinelista_print.png',
}

test('renderiza nome, descrição e links do projeto', () => {
  renderWithTheme(<ProjectCard project={project} />)
  expect(screen.getByText('Cinelista')).toBeInTheDocument()
  expect(screen.getByText(/Aplicação para explorar/)).toBeInTheDocument()
  expect(screen.getByRole('link', { name: /Demo/i })).toHaveAttribute('href', project.demo)
  expect(screen.getByRole('link', { name: /Código/i })).toHaveAttribute('href', project.repo)
})
