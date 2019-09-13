export const sendEvent = process.browser && process.env.BACKEND_URL ===
'https://api.santiment.net' ? (...args) => window.gtag('event', ...args) : () =>
{}
