import { render, screen, fireEvent } from '@testing-library/react'
import Header from './Header.jsx'
import { MemoryRouter } from 'react-router-dom'
import { ThemeProviderWithToggle } from '../styles/theme.jsx'

function renderWithProviders(ui) {
  return render(
    <ThemeProviderWithToggle>
      <MemoryRouter initialEntries={["/"]}>{ui}</MemoryRouter>
    </ThemeProviderWithToggle>
  )
}

test('abre e fecha o menu mobile (drawer)', () => {
  renderWithProviders(<Header />)

  const menuBtn = screen.getByLabelText(/menu/i)
  fireEvent.click(menuBtn)
  expect(screen.getByRole('dialog', { name: /menu/i })).toBeInTheDocument()

  const overlay = screen.getByRole('presentation')
  fireEvent.click(overlay)
  expect(screen.queryByRole('dialog', { name: /menu/i })).not.toBeInTheDocument()
})
