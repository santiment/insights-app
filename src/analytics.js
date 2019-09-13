export const sendEvent = process.browser
  ? (...args) => window.gtag('event', ...args)
  : () => {}
