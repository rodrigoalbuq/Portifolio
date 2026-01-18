import { createGlobalStyle, keyframes } from 'styled-components'

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
`

const GlobalStyle = createGlobalStyle`
  * { box-sizing: border-box; }
  html, body, #root { height: 100%; }
  html { scroll-behavior: smooth; }
  body {
    margin: 0;
    font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Helvetica Neue, Arial, "Apple Color Emoji", "Segoe UI Emoji";
    font-size: 16px;
    line-height: 1.6;
    background: ${({ theme }) => theme.bg};
    color: ${({ theme }) => theme.text};
    /* Evitar flash ao carregar: transições só após app montar */
    transition: none;
  }

  body.theme-ready {
    transition: background 0.25s ease, color 0.25s ease;
  }

  ::selection { background: ${({ theme }) => theme.accent}; color: #000; }

  /* Seções ancoradas respeitam header fixo */
  section[id] { scroll-margin-top: 84px; }

  /* Acessibilidade: foco visível padrão */
  :focus-visible { outline: 2px solid ${({ theme }) => theme.accent}; outline-offset: 2px; border-radius: 6px; }

  /* Utilitário: animação sutil de entrada */
  .fade-in {
    animation: ${fadeIn} 320ms ease both;
  }
`

export default GlobalStyle
