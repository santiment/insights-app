import { query } from 'san-webkit/lib/api'
import { getSEOLinkFromIdAndTitle } from 'san-webkit/lib/utils/url'
import { getRawText } from '../../utils/insights'

function queryInsights() {
  return query(`{
    insights: allInsights(page:1, pageSize: 50) {
      id
      title
      user {id username}
      text
    }
  }
`)
}

function generateDescription(text) {
  const rawText = getRawText(text)

  let end = rawText.indexOf('.')
  const columnIndex = rawText.indexOf(':')

  if (end < 0) end = columnIndex
  else if (columnIndex !== -1 && columnIndex < end) end = columnIndex

  return rawText.slice(0, end)
}

export async function get(req, res) {
  const { insights } = await queryInsights()

  const rssItems = insights.map(
    ({ id, title, text }) => `<item>
    <title>${title}</title>
    <link>https://insights.santiment.net/read/${getSEOLinkFromIdAndTitle(id, title)}</link>
    <description>${generateDescription(text)}</description>
  </item>`,
  )

  res.setHeader('Content-Type', 'text/xml')

  res.end(`<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">

<channel>
  <title>Insights Santiment</title>
  <link>https://insights.santiment.net</link>
  <description>Explore our crypto insights and research, which are based on blockchain and social data. We pioneer using behavioral analytics to enhance your investment decisions.</description>
  ${rssItems.join('\n')}
</channel>

</rss>`)
}
