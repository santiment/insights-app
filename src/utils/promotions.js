const HIDDEN_WIDGET_URLS = 'HIDDEN_WIDGET_URLS'

export const extractYoutubeVideoID = (link) => link.slice(link.indexOf('=') + 1)

export function getHiddenPromotions() {
  const urls = localStorage.getItem(HIDDEN_WIDGET_URLS)
  return urls && urls.split(',')
}

export function wasPromotionHidden(url) {
  const urls = getHiddenPromotions()
  return !!urls && urls.includes(url)
}

export function prepareThumbnail({ imageLink, videoLink }) {
  if (imageLink) return imageLink

  return `https://i.ytimg.com/vi/${extractYoutubeVideoID(
    videoLink,
  )}/maxresdefault.jpg`
}

export function hidePromotion(url) {
  let urls = getHiddenPromotions()

  if (urls) {
    urls.push(url)
  } else {
    urls = [url]
  }

  localStorage.setItem(HIDDEN_WIDGET_URLS, urls.toString())
}
