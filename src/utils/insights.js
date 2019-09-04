export const getInsightIdFromSEOLink = link =>
  +link.slice(link.lastIndexOf('-') + 1)

export const getSEOLinkFromIdAndTitle = (id, title) =>
  encodeURIComponent(
    `${title
      .toLowerCase()
      .split(' ')
      .join('-')}-${id}`,
  )

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

export const noTrendTagsFilter = ({ name }) => {
  return !name.endsWith('-trending-words')
}

export const onlyPublishedFilter = ({ readyState }) =>
  readyState === 'published'

export const onlyDraftsFilter = ({ readyState }) => readyState === 'draft'

export const InsightSorter = {
  Newest: publishDateSorter,
  Popular: popularitySorter,
}
