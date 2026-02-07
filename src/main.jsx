import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { LanguageProvider } from './components/Header.jsx'
import GlobalStyle from './styles/global.js'
import { ThemeProviderWithToggle } from './styles/theme.jsx'

// Renderiza o App dentro do ThemeProvider (para tema claro/escuro) e BrowserRouter (para rotas)
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Provedor de tema para alternância dark/light */}
    <ThemeProviderWithToggle>
      {/* Provedor de rotas SPA */}
      <BrowserRouter>
        {/* Estilos globais */}
        <GlobalStyle />
        {/* Componente principal da aplicação */}
        <LanguageProvider>
          <App />
        </LanguageProvider>
      </BrowserRouter>
    </ThemeProviderWithToggle>
  </React.StrictMode>
)
