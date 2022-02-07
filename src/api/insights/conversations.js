import { query } from 'webkit/api/index.js'

const CONVERSATIONS_QUERY = (datetime = 'utc_now') => `
  query {
    commentsFeed(
      limit: 15
      cursor: { type: BEFORE, datetime: "${datetime}", order: DESC }
    ) {
      id
      content
      insertedAt
      insight {
        id
        title
      }
      timelineEvent {
        id
      }
      shortUrl {
        shortUrl
      }
      blockchainAddress {
        id
        address
        labels {
          metadata
          name
          origin
        }
      }
      user {
        id
        username
        avatarUrl
        email
      }
    }
  }
`

const accessor = ({ commentsFeed }) => commentsFeed
export function queryConversations(date) {
  return query(CONVERSATIONS_QUERY(date)).then(accessor)
}
