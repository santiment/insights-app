import { query, newSSRQuery } from 'webkit/api'
import { ONE_DAY_IN_MS } from 'webkit/utils/dates'

function optimizePublicationPriceDate(publishedAt) {
  const date = new Date(publishedAt)
  const minutes = date.getMinutes()
  date.setMinutes(minutes < 30 ? 30 : 59)
  return date.toISOString()
}

const PRICE_QUERY = (slug, from, publishedAt, interval = '1d') => `{
  getMetric(metric:"price_usd") {
    publicationPrice:aggregatedTimeseriesData(slug:"${slug}",from:"${publishedAt}",to:"${optimizePublicationPriceDate(
  publishedAt,
)}",aggregation:FIRST)
    data:timeseriesData(slug:"${slug}",from:"${from}",to:"utc_now",interval:"${interval}") {
      d: datetime,
      v: value
    }
  }
}`

function normalizeInterval(from) {
  const fromDate = new Date(from)
  const diff = (Date.now() - fromDate) / ONE_DAY_IN_MS

  if (diff < 1) return '30m'
  if (diff < 30) return '4h'
  if (diff < 63) return '8h'
  if (diff < 100) return '12h'
  if (diff < 160) return '1d'
  if (diff < 220) return '2d'
  if (diff < 290) return '3d'
  return '7d'
}

const accessor = ({ getMetric }) => getMetric
export function queryPriceData(slug, from, publishedAt) {
  return query(PRICE_QUERY(slug, from, publishedAt, normalizeInterval(from))).then(accessor)
}
export const queryPriceDataSSR = newSSRQuery(queryPriceData)

// ----------------------------------------------------

export const PROJECT_FRAGMENT = `
  project: priceChartProject {
    slug
    ticker
    priceUsd
  }`

const INSIGHT_PROJECT = (id) => `{
  insight(id:${id}) {
    ${PROJECT_FRAGMENT}
  }
}`
const projectAccessor = ({ insight }) => insight.project
export const queryInsightProject = (id) => query(INSIGHT_PROJECT(id)).then(projectAccessor)

// ----------------------------------------------------

export const RELATED_PROJECT_FRAGMENT =
  PROJECT_FRAGMENT.slice(0, -1) +
  `name
  change:percentChange7d
}`

const RELATED_PROJECTS_QUERY = (id) => `{
  insight(id:${id}) {
    relatedProjects {
      slug
      name
      ticker
      priceUsd
      change:percentChange7d
    }
  }
}`
const relatedProjectsAccessor = ({ insight }) => insight.relatedProjects
export const queryInsightRelatedProjects = (id) =>
  query(RELATED_PROJECTS_QUERY(id)).then(relatedProjectsAccessor)

// ----------------------------------------------------

const RELATED_PROJECT_PRICE_QUERY = (slug) => `{
  getMetric(metric:"price_usd") {
    data:timeseriesData(slug:"${slug}",from:"utc_now-7d",to:"utc_now",interval:"6h") {
      d: datetime,
      v: value
    }
  }
}`
const relatedProjectPriceAccessor = ({ getMetric }) => getMetric.data
export const queryInsightRelatedProjectPrice = (slug) =>
  query(RELATED_PROJECT_PRICE_QUERY(slug)).then(relatedProjectPriceAccessor)
