import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import styled from 'styled-components'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import About from './sections/About.jsx'
import Projects from './sections/Projects.jsx'
import Skills from './sections/Skills.jsx'
import Contact from './sections/Contact.jsx'

const Layout = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`

const Main = styled.main`
  flex: 1;
  display: block;
  padding-bottom: 24px;
`

// Componente principal da aplicação
export default function App() {
  const location = useLocation()
  // Garante que a rolagem sempre volta ao topo ao navegar
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [])
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [location.pathname])
  return (
    <Layout>
      {/* Cabeçalho fixo com navegação e tema */}
      <Header />
      <Main>
        {/* Rotas SPA para cada seção */}
        <Routes>
          <Route path="/" element={<About />} />
          <Route path="/projetos" element={<Projects />} />
          <Route path="/habilidades" element={<Skills />} />
          <Route path="/contato" element={<Contact />} />
        </Routes>
      </Main>
      {/* Rodapé com links e informações */}
      <Footer />
    </Layout>
  )
}
