import '@testing-library/jest-dom'

// Polyfills para ambiente JSDOM
// Sempre sobrescreve para evitar "Not implemented: window.scrollTo" do jsdom
window.scrollTo = () => {}

if (!global.IntersectionObserver) {
  class MockIntersectionObserver {
    constructor() {}
    observe() {}
    unobserve() {}
    disconnect() {}
  }
  global.IntersectionObserver = MockIntersectionObserver
}
