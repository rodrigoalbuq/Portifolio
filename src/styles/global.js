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
    transition: none;
  }

  body.theme-ready {
    transition: background 0.25s ease, color 0.25s ease;
  }

  body.menu-open main,
  body.menu-open footer {
    filter: blur(14px);
    transition: filter 1200ms cubic-bezier(0.22, 1, 0.36, 1);
    pointer-events: none;
  }

  body main,
  body footer {
    filter: blur(0);
    transition: filter 1200ms cubic-bezier(0.22, 1, 0.36, 1);
  }

  ::selection { background: ${({ theme }) => theme.accent}; color: #fff; }

  section[id] { scroll-margin-top: 84px; }
  :focus-visible {
    outline: 2px solid ${({ theme }) => theme.accent};
    outline-offset: 2px;
    border-radius: 6px;
  }

  a { color: inherit; }
  img { max-width: 100%; display: block; }

  .fade-in {
    animation: ${fadeIn} 320ms ease both;
  }
`

export default GlobalStyle
