export const getInsightIdFromSEOLink = link =>
  +link.slice(link.lastIndexOf('-') + 1)

export const getSEOLinkFromIdAndTitle = (id, title) =>
  encodeURIComponent(
    `${title
      .toLowerCase()
      .split(' ')
      .join('-')}-${id}`,
  )

export const publishDateSorter = ({ createdAt: a }, { createdAt: b }) =>
  new Date(a) < new Date(b) ? 1 : -1

export const noTrendTagsFilter = ({ name }) => {
  return !name.endsWith('-trending-words')
}

export const onlyPublishedFilter = ({ readyState }) =>
  readyState === 'published'

export const onlyDraftsFilter = ({ readyState }) => readyState === 'draft'
