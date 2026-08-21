# Portfólio | Rodrigo Albuquerque

Portfólio pessoal responsivo construído com React, Vite e Styled Components. A interface reúne apresentação profissional, projetos, habilidades técnicas e formulário de contato em uma experiência minimalista com animações progressivas.

**Site:** [portifolio-tan-one-73.vercel.app](https://portifolio-tan-one-73.vercel.app/)

## Recursos

- Header minimalista com menu sanduíche, marca centralizada e alternância de tema.
- Menu em tela cheia com fundo desfocado, navegação para as seções e fechamento por botão, overlay ou link.
- Animação de escrita progressiva no título principal: `Olá, eu sou o Rodrigo Albuquerque`.
- Revelação gradual do restante do conteúdo com opacidade, movimento e blur.
- Foto de perfil circular com contorno luminoso animado.
- Habilidades apresentadas com ícones, nomes e categorias responsivas.
- Cards de projetos com ações `Demo` e `Código` reveladas no hover ou foco.
- Tema claro/escuro persistido no `localStorage`.
- Formulário de contato com EmailJS e fallback para FormSubmit.
- Navegação por teclado, foco visível e atributos ARIA.

## Projetos Apresentados

- Cinelista: aplicação para explorar filmes com busca, detalhes e lista personalizada.
  - Tecnologias: Next.js, React, TypeScript, CSS Modules, Axios, TMDb API, Vercel
  - Demo: https://nextjs-cinelista-xi.vercel.app/ | Repositório: https://github.com/rodrigoalbuq/nextjs-cinelista

- Diário de Bordo: PWA simples para registrar entradas de um diário, com suporte offline e sincronização.
  - Tecnologias: HTML5, CSS3, JavaScript, Service Worker API, Web Storage, Node.js, PWA, Vercel
  - Demo: https://diario-de-bordo-tawny.vercel.app/ | Repositório: https://github.com/rodrigoalbuq/Diario-de-Bordo

- Estilo Livre: site de barbearia com design responsivo e UI moderna.
  - Tecnologias: HTML5, CSS3, JavaScript, Bootstrap 5.3, Vercel
  - Demo: https://estilo-livre.vercel.app/ | Repositório: https://github.com/rodrigoalbuq/Estilo-Livre

## Requisitos

- Node.js 18+

## Instalação e Execução

```bash
npm install
npm run dev
```

O servidor de desenvolvimento é iniciado pelo Vite. Para abrir uma versão de produção localmente:

```bash
npm run build
npm run preview
```

Scripts úteis:

```bash
# testes em modo watch
npm run test

# execução única da suíte
npm test -- --run

# testes com UI
npm run test:ui

# build e preview
npm run build
npm run preview

# lint/format
npm run lint
npm run format
```

## Ambiente (.env)

Opcional para EmailJS (usa fallback se não definir):

- `VITE_EMAILJS_SERVICE_ID`
- `VITE_EMAILJS_TEMPLATE_ID`
- `VITE_EMAILJS_PUBLIC_KEY`
- `VITE_FALLBACK_RECIPIENT` (opcional; padrão: `rodrigoalvalbq@gmail.com`)

Crie um `.env` na raiz com as variáveis. Exemplo:

```env
VITE_EMAILJS_SERVICE_ID=seu_service_id
VITE_EMAILJS_TEMPLATE_ID=seu_template_id
VITE_EMAILJS_PUBLIC_KEY=sua_public_key
VITE_FALLBACK_RECIPIENT=seu_email@exemplo.com
```

## Estrutura

- `src/components`: Header, Footer, ProjectCard, Reveal
- `src/sections`: About, Projects, Skills, Contact
- `src/data`: dados dos projetos
- `src/services`: integrações (envio de emails)
- `src/styles`: estilos globais e tema
- `Screenshot/`: pasta pública (configurada em `publicDir` no Vite)

## Navegação e Estrutura

A página inicial reúne as seções `sobre`, `projetos`, `habilidades` e `contato`. As rotas adicionais disponíveis são:

- `/projetos`
- `/habilidades`
- `/contato`

O `Header` usa `IntersectionObserver` para acompanhar a seção ativa, enquanto o componente `Reveal` controla as entradas e saídas graduais durante a rolagem.

## Qualidade de Código

- ESLint (flat config v9): configuração em [eslint.config.js](eslint.config.js)
- Prettier: configuração em [.prettierrc](.prettierrc)

## Aprendizados

Tecnologias que pratiquei durante o desenvolvimento deste projeto do meu portfólio:

- React Router: configuração de rotas e navegação SPA; uso de `Link` em componentes (ver [src/components/Footer.jsx](src/components/Footer.jsx)).
- Theming com Styled Components: alternância claro/escuro com persistência em `localStorage` e inicialização sem flicker (ver [src/styles/theme.jsx](src/styles/theme.jsx) e [src/styles/global.js](src/styles/global.js)).
- IntersectionObserver: scroll spy no `Header` e revelação progressiva de conteúdo com `Reveal` (ver [src/components/Reveal.jsx](src/components/Reveal.jsx) e [src/sections/About.jsx](src/sections/About.jsx)).
- Acessibilidade: uso de `role`, `aria-*`, foco visível e overlay com `role="presentation"` para o drawer mobile; testes garantem acessibilidade básica.
- Testes com Vitest + Testing Library: suíte cobrindo navegação, componentes e setup com polyfills (ver [vitest.setup.js](vitest.setup.js)).
- Envio de emails: integração com EmailJS via variáveis `.env` e fallback para FormSubmit (ver [src/services/email.js](src/services/email.js)).
- UX/Performance: Vite para desenvolvimento rápido, animações sutis e carregamento progressivo do conteúdo.
- Conceitos: reforço de princípios como Responsive Design, Mobile First, APIs REST, AJAX e PWA (documentados em Habilidades).

## 🤝 Contribuições

Contribuições são bem-vindas! Agradeço desde já. Sinta-se à vontade para:

1. **Fork** o projeto
2. **Crie** uma feature branch
3. **Faça commit** das mudanças
4. **Abra** um Pull Request
