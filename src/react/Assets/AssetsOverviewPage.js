import React from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { compose } from 'redux'
import cx from 'classnames'
import WatchlistCards from '../WatchlistCards'
import {
  CATEGORIES,
  PUBLIC_WATCHLISTS,
  WATCHLISTS_BY_FUNCTION,
} from './assets-overview-constants'
import styles from './AssetsOverview.module.scss'

export const projectsByFunctionGQL = gql`
  query allProjectsByFunction($function: json!) {
    allProjectsByFunction(function: $function) {
      id
      slug
    }
  }
`

export const publicWatchlistGQL = gql`
  query fetchAllPublicUserLists {
    fetchAllPublicUserLists {
      id
      color
      isPublic
      name
      listItems {
        project {
          id
          slug
        }
      }
      insertedAt
      updatedAt
      user {
        id
      }
    }
  }
`

const tabs = [
  { content: 'Categories', index: 'categories' },
  { content: 'My Watchlists', index: 'myWatchlists' },
]

const mapItemsToKeys = (items, { keyPath, getKeyPath }) =>
  items.reduce(
    (prev, next) => ({
      ...prev,
      [getKeyPath ? getKeyPath(next) : next[keyPath]]: next,
    }),
    {},
  )

const AssetsOverview = ({ slugs, isPublicWatchlistsLoading }) => {
  const [selectedTab, selectTab] = React.useState(tabs[0].index)
  const onSelectTab = selected => selectTab(selected)

  return (
    <div className={cx(styles.overviewPage, 'page')}>
      <h1>Assets overview</h1>
      <h4 className={styles.heading}>Categories</h4>
      <div className={styles.section}>
        <WatchlistCards watchlists={CATEGORIES} slugs={slugs} />
      </div>
    </div>
  )
}

const getProjectsByFunction = () =>
  WATCHLISTS_BY_FUNCTION.map(({ assetType, byFunction }) =>
    graphql(projectsByFunctionGQL, {
      options: () => ({ variables: { function: byFunction } }),
      props: ({
        data: { loading = true, allProjectsByFunction = [] },
        ownProps: { slugs = {}, isLoading },
      }) => ({
        isLoading: loading || isLoading,
        slugs: {
          ...slugs,
          [assetType]: loading
            ? []
            : allProjectsByFunction.map(({ slug }) => slug),
        },
      }),
    }),
  )

const enhance = compose(
  ...getProjectsByFunction(),
  graphql(publicWatchlistGQL, {
    props: ({
      data: { fetchAllPublicUserLists = [], loading = true },
      ownProps: { slugs = {}, isLoading },
    }) => {
      const publicWatchlistMap = mapItemsToKeys(PUBLIC_WATCHLISTS, {
        keyPath: 'id',
      })

      const publicWatchilstSlugs = fetchAllPublicUserLists
        .filter(({ id }) => publicWatchlistMap[id])
        .reduce(
          (prev, next) => ({
            ...prev,
            [next.name.toLowerCase()]: next.listItems.map(
              ({ project: { slug } }) => slug,
            ),
          }),
          {},
        )

      return {
        slugs: {
          ...slugs,
          ...publicWatchilstSlugs,
        },
        isPublicWatchlistsLoading: loading || isLoading,
      }
    },
  }),
)

export default enhance(AssetsOverview)
