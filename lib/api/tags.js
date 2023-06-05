import { query } from 'san-webkit/lib/api'
import { checkIsTrendTag } from './../utils/insights'

const TAGS_QUERY = `{
  allTags {
    name
  }
}`

const noTrendingTags = (tag) => !checkIsTrendTag(tag)
const getTag = ({ name }) => name

const precacher = ({ allTags }) => allTags.map(getTag).filter(noTrendingTags)

const options = { precacher: () => precacher }
export const queryTags = () => query(TAGS_QUERY, options)
