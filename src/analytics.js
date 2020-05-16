function canTrackBrowser() {
  const dnt =
    navigator.doNotTrack || window.doNotTrack || navigator.msDoNotTrack
  return dnt !== '1' && dnt !== 'yes'
}

const isTrackingEnabled =
  process.browser &&
  process.env.BACKEND_URL === 'https://api.santiment.net' &&
  canTrackBrowser()

export const sendEvent = isTrackingEnabled
  ? (action, { category, label, ...meta }, platforms = ['ga']) => {
      if (platforms.includes('ga')) {
        window.gtag('event', action, {
          event_category: category,
          event_label: label,
          ...meta,
        })
      }

      if (platforms.includes('intercom')) {
        window.Intercom('trackEvent', action, {
          event_category: category,
          event_label: label,
          ...meta,
        })
      }
    }
  : () => {}
