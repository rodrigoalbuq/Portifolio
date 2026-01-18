import { render, screen, fireEvent, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { ThemeProviderWithToggle } from '../styles/theme.jsx'
import App from '../App.jsx'

function renderApp(route = '/') {
  return render(
    <ThemeProviderWithToggle>
      <MemoryRouter initialEntries={[route]}>
        <App />
      </MemoryRouter>
    </ThemeProviderWithToggle>
  )
}

test('clicar no ícone de email navega para /contato', () => {
  renderApp('/')

  const footer = screen.getByRole('contentinfo')
  const emailIcon = within(footer).getByRole('link', { name: /email/i })
  fireEvent.click(emailIcon)

  expect(screen.getByRole('heading', { name: /contato/i })).toBeInTheDocument()
})
