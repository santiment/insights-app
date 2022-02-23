import { query } from 'webkit/api'

const TAGS_QUERY = `{
  allTags {
    name
  }
}`

const noTrendingTags = (tag) => !tag.toLowerCase().includes('trending-words')
const getTag = ({ name }) => name
const precacher = ({ allTags }) => allTags.map(getTag).filter(noTrendingTags)
const options = { precacher: () => precacher }
export const queryTags = () => query(TAGS_QUERY, options)
