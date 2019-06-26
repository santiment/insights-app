<script context="module">
  import { client } from '@/apollo'
  import { TRENDING_WORDS_QUERY } from '@/gql/trends'
  import { FEATURED_INSIGHTS_QUERY } from '@/gql/insights'

  export async function preload() {
    let res
    try {
      res = await Promise.all([
        client.query({
          query: TRENDING_WORDS_QUERY,
        }),
        client.query({ query: FEATURED_INSIGHTS_QUERY }),
      ])
    } catch (e) {
      console.error(e)
      return {}
    }

    return {
      trendingWords: res[0].data.trendingWords,
      insights: res[1].data.insights,
    }
  }
</script>

<script>
  import Tooltip from '@/components/Tooltip'
  import { getSEOLinkFromIdAndTitle } from '@/utils/insights'

  export let trendingWords = []
  export let insights = []

  let words
  $: {
    const { length } = trendingWords
    words =
      length > 0 &&
      trendingWords[length - 1].topWords.map(word => ({
        ...word,
        score: parseInt(word.score, 10),
      }))
  }
</script>

<template lang="pug">
include /ui/mixins

svelte:head
  title Today’s Top Social Gainers in Crypto - SANbase
  meta(name="Description", property='og:description',content="Top 10 words with the biggest spike on crypto social media (compared to their previous 2-week average). These are the biggest developing stories in crypto.")

.top
  .trends
    h2.title
      | Emerging trends
      a.more(href='/') More
    table.table
      thead
        tr
          th.number #
          th Word
          th Hype Score
          th Social Volume
          th.action
          th.action
          th.action
      tbody
        +each('words as {word, score}, i (word)')
          tr.tbody__tr
            td {i + 1}
            td
              a(href='/').word {word}
            td {score}
            td -
            td
              Tooltip.table__tooltip
                +icon('connection-big').icon-connection(slot='trigger' )
                p(slot='content') Conected Words
            td b
            td c
  .insights
    h2.title
      | Featured insights
      a.more(href='/') More
    .insights__list
      .insights__visible
        +each('insights as {id, title, user} (id)')
          .insight
            a.insight__title(href='/insights/read/{getSEOLinkFromIdAndTitle(id, title)}') {title}
            .insight__bottom
              a.insight__author(href='/insights/user/{user.id}') {user.username}
        

.bottom


</template>

<style lang="scss">
  @import '@/variables';
  @import '@/mixins';

  .icon- {
    &connection {
      @include size(18px, 15px);

      &:hover {
        fill: var(--jungle-green);
      }
    }
  }

  $side-padding: 23px;

  :global(.table__tooltip) {
    padding: 2px 12px;
    background: $fiord;
    border: none;

    * {
      font-size: 12px;
      line-height: 18px;
      color: $white;
    }
  }

  .insight {
    padding: 16px 23px;
    border-bottom: 1px solid var(--porcelain);

    &__title {
      display: block;
      font-size: 16px;
      line-height: 24px;
      margin-bottom: 6px;
    }

    &__author {
      color: var(--waterloo);
      overflow-x: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin-right: 21px;
      &:hover {
        color: var(--jungle-green);
      }
    }
  }

  .top {
    display: flex;
  }

  .trends {
    flex: 2 1;
  }

  .insights {
    flex: 1 1;
    margin-left: 30px;
    display: flex;
    flex-direction: column;

    &__list {
      border-radius: 4px;
      border: 1px solid var(--porcelain);
      flex: 1;
      position: relative;
      overflow-y: hidden;
      &:hover {
        overflow-y: overlay;
      }
    }

    &__visible {
      position: absolute;
    }
  }

  .title {
    font-size: 22px;
    line-height: 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 0 26px;
  }

  .more {
    line-height: 22px;
    font-size: 14px;
    color: var(--jungle-green);
    &:hover {
      color: var(--jungle-green-hover);
    }
  }

  .action {
    width: 35px;
  }

  .number {
    width: 55px;
  }

  .table {
    border-spacing: 0;
    width: 100%;
    border-radius: 4px;
    border: 1px solid var(--porcelain);
    box-shadow: 0 6px 32px rgba(21, 24, 31, 0.03);
  }

  thead {
    background: var(--athens);
  }

  th {
    text-align: left;
    color: var(--casper);
    font-size: 12px;
    line-height: 18px;
    padding: 7px 0;
    border-bottom: 1px solid var(--porcelain);

    &:first-child {
      padding-left: $side-padding;
      color: var(--waterloo);
    }

    &:last-child {
      padding-right: $side-padding;
    }
  }

  td {
    border-bottom: 1px solid var(--porcelain);

    &:first-child {
      color: var(--waterloo);
      padding-left: $side-padding;
    }

    &:last-child {
      padding-right: $side-padding;
    }
  }

  .tbody__tr {
    height: 60px;
    cursor: pointer;

    &:hover {
      background: var(--athens);

      .word {
        color: var(--jungle-green);
      }
    }

    &:last-child td {
      border-bottom: none;
    }
  }
</style>
