import React from 'react'
import gql from 'graphql-tag'
import { compose } from 'redux'
import cx from 'classnames'
import { graphql } from 'react-apollo'
import { Link } from 'react-router-dom'
import PercentChanges from './PercentChanges'
import { getTimeIntervalFromToday, MONTH } from '@/utils/dates'
import styles from './WatchlistCard.module.scss'

const projectsListHistoryStatsGQL = gql`
  query projectsListHistoryStats(
    $from: DateTime!
    $to: DateTime!
    $slugs: [String]!
  ) {
    projectsListHistoryStats(from: $from, to: $to, slugs: $slugs) {
      marketcap
      volume
      datetime
    }
  }
`

export const totalMarketcapGQL = gql`
  query historyPrice($from: DateTime!, $to: DateTime!, $slug: String) {
    historyPrice(from: $from, to: $to, slug: $slug, interval: "1d") {
      marketcap
      volume
      datetime
    }
  }
`

const millify = (value, precision = 1) => {
  const suffixes = ['', 'K', 'M', 'B', 'T']
  value = Number(value)
  if (value === 0) return value.toString()

  let exponent = Math.floor(Math.log(Math.abs(value)) / Math.log(1000))
  if (exponent < 0) {
    exponent = 0
  } else if (exponent >= suffixes.length) {
    exponent = suffixes.length - 1
  }

  const prettifiedValue = value / Math.pow(1000, exponent)
  precision = prettifiedValue % 1 === 0 ? 0 : precision

  return `${Number(prettifiedValue.toFixed(precision))}${suffixes[exponent]}`
}

const calcPercentageChange = (originalValue, newValue) => {
  if (originalValue === 0) return 0
  return (((newValue - originalValue) / originalValue) * 100).toFixed(2)
}

const WatchlistCard = ({ name, isPublic, stats, to, isError, isLoading }) => {
  const { marketcap: latestMarketcap } = stats.slice(-1)[0] || {}
  const { marketcap } = stats.slice(0, 1)[0] || {}
  const change = marketcap
    ? calcPercentageChange(marketcap, latestMarketcap)
    : 0

  return (
    <Link to={to} className={styles.wrapper}>
      <div className={cx(styles.flexRow, styles.content)}>
        <span className={styles.name}>{name}</span>
      </div>
      {latestMarketcap ? (
        <>
          <div className={cx(styles.flexRow, styles.content)}>
            <span className={styles.marketcap}>
              $&nbsp;{millify(latestMarketcap)}
            </span>
          </div>
          <div className={styles.flexRow}>
            <PercentChanges changes={change} className={styles.change} />
            &nbsp;&nbsp;
            <span className={styles.volumeLabel}> total cap, 7d </span>
          </div>
        </>
      ) : null}
    </Link>
  )
}

WatchlistCard.defaultProps = {
  to: '#',
  stats: [],
}

export const normalizeStats = arr => {
  const { length } = arr
  const isNotEmpty = length > 0
  const lastEl = isNotEmpty ? arr[length - 1] : {}

  return lastEl.marketcap === 0 && lastEl.volume === 0 ? arr.slice(0, -1) : arr
}

const enhance = compose(
  graphql(projectsListHistoryStatsGQL, {
    options: ({ slugs = [] }) => ({
      variables: {
        slugs,
        ...getTimeIntervalFromToday(-1, MONTH),
      },
    }),
    skip: ({ slugs }) => !slugs.length,
    props: ({ data: { projectsListHistoryStats = [], loading, error } }) => ({
      stats: normalizeStats(projectsListHistoryStats),
      isLoading: loading,
      isError: error,
    }),
  }),
  graphql(totalMarketcapGQL, {
    options: ({ slug }) => ({
      variables: {
        slug,
        ...getTimeIntervalFromToday(-1, MONTH),
      },
    }),
    skip: ({ slug }) => !slug,
    props: ({ data: { historyPrice = [], loading, error } }) => ({
      stats: normalizeStats(historyPrice),
      isLoading: loading,
      isError: error,
    }),
  }),
)

export default enhance(WatchlistCard)
