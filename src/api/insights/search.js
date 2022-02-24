import { query } from 'webkit/api'
import { INSIGHT_FRAGMENT } from './index'

const INSIGHTS_QUERY = `{
  insights:allInsights(pageSize:5){
    id
    title
  }
}`

const accessor = ({ insights }) => insights
export const querySearchInsights = () => query(INSIGHTS_QUERY).then(accessor)

// --------------

const INSIGHTS_BY_SEARCH_TERM_QUERY = (searchTerm) => `{
  insights:allInsightsBySearchTerm(searchTerm:"${searchTerm}") {
    id
    title
    publishedAt
  }
}`

const sorter = (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
const precacher = (data) => (data.insights.sort(sorter), data)
const options = { precacher: () => precacher }
export const querySearchTermInsights = (searchTerm) =>
  query(INSIGHTS_BY_SEARCH_TERM_QUERY(searchTerm), options).then(accessor)

// ----------

const INSIGHTS_SEARCH_PAGE_QUERY = (searchTerm) => `{
  insights:allInsightsBySearchTerm(searchTerm:"${searchTerm}") {
    ${INSIGHT_FRAGMENT}
  }
}`

export const querySearchPageInsights = (searchTerm) =>
  query(INSIGHTS_SEARCH_PAGE_QUERY(searchTerm), options).then(accessor)
