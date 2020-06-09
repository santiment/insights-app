export const getInsightIdFromSEOLink = (link) =>
  parseInt(link.slice(link.lastIndexOf('-') + 1), 10)

export const getSEOLinkFromIdAndTitle = (id, title) =>
  encodeURIComponent(`${title.toLowerCase().split(' ').join('-')}-${id}`)

export const updateDateSorter = ({ updatedAt: a }, { updatedAt: b }) =>
  new Date(b) - new Date(a)

export const publishDateSorter = ({ publishedAt: a }, { publishedAt: b }) =>
  new Date(b) - new Date(a)

export const popularitySorter = (
  { publishedAt: aCreatedAt, votes: { totalVotes: aTotalVotes } },
  { publishedAt: bCreatedAt, votes: { totalVotes: bTotalVotes } },
) => {
  const aDate = new Date(aCreatedAt)
  const bDate = new Date(bCreatedAt)

  return (
    aDate.getDate() === bDate.getDate() &&
    aDate.getMonth() === bDate.getMonth() &&
    bTotalVotes - aTotalVotes
  )
}

export const noTrendTagsFilter = ({ name }) => !name.endsWith('-trending-words')

export const onlyPublishedFilter = ({ readyState }) =>
  readyState === 'published'

export const onlyDraftsFilter = ({ readyState }) => readyState === 'draft'

export const InsightSorter = {
  Newest: publishDateSorter,
  Popular: popularitySorter,
}

const IMG_SRC_ATTR_START = 'src="'
const IMG_SRC_ATTR_START_LENGTH = IMG_SRC_ATTR_START.length
export const grabFirstImageLink = (text) => {
  const start = text.indexOf(IMG_SRC_ATTR_START)

  if (start === -1) {
    return
  }

  const linkStart = start + IMG_SRC_ATTR_START_LENGTH

  return text.slice(linkStart, text.indexOf('"', linkStart))
}

export const getRawText = (text) => {
  const res = text.split(/<.*?>/g).join('')
  return res[0] === ' ' ? res.slice(1) : res
}
