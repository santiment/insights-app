<script>
  import ProfileInfo from '@/components/ProfileInfo'
  import LikeBtn from '@/components/LikeBtn'
  import CommentCounter from '@/components/comments/Counter'
  import MultilineText from '@/components/MultilineText'
  import Tag from '@/components/insights/Tag'
  import Tags from './Tags.svelte'
  import { getTimeFormats, getDateFormats } from '@/utils/dates'
  import { getSEOLinkFromIdAndTitle } from '@/utils/insights'

  let klass = ''
  export { klass as class }
  export let insight

  let {
    id,
    user,
    title,
    tags,
    createdAt,
    updatedAt,
    publishedAt,
    state,
    votes,
    votedAt,
    commentsCount,
    isPaywallRequired,
    text,
  } = insight

  const date = new Date(publishedAt || updatedAt)
  const { MM, DD, YY } = getDateFormats(date)
  const { HH, mm } = getTimeFormats(date)

  const publishTime = `${DD}-${MM}-${YY}, ${HH}:${mm}`

  const seoLink = getSEOLinkFromIdAndTitle(id, title)
  const link = `/read/${seoLink}`
</script>

<template lang="pug">
include /ui/mixins

+panel().wrapper
  .top
    a.title(href="{link}") {title}
      .time {publishTime}
    .text
      +html('text')
    ProfileInfo(name="{user.username}", id="{user.id}", avatarUrl="{user.avatarUrl}", withPic, classes="{{wrapper: 'PulseCard__profile'}}")

  .bottom
    .stats
      LikeBtn({id}, liked='{!!votedAt}', likes='{votes.totalVotes}')
      CommentCounter.PulseCard__comments({link}, {commentsCount}, isSSRLink)

    div.tags
      Tags({tags})

</template>

<style lang="scss">
  @import '@/mixins';

  .wrapper {
    padding: 18px 16px 12px 56px;
    background: url('/pulse-icon.svg') no-repeat 16px 16px;
  }

  .top {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .title {
    @include text('body-1');
    display: flex;
    word-break: break-word;

    &:hover {
      color: var(--jungle-green);
    }
  }

  .time {
    @include text('caption');
    color: var(--casper);
    margin: 4px 0 0 auto;
  }

  .text {
    @include text('caption');
    color: var(--waterloo);
    margin: 10px 0 12px;

    :global(&) {
      figure {
        text-align: center;
        margin-bottom: 6px;

        & + figure {
          margin-top: 20px;
        }
      }

      img {
        max-width: 100%;
      }
      .md-inline-bold {
        font-weight: bold;
      }

      .md-inline-link {
        text-decoration: underline;
        color: var(--jungle-green);

        &:hover {
          color: var(--jungle-green-hover);
        }
      }

      .md-inline-underline {
        text-decoration: underline;
      }

      .md-block-unordered-list-item {
        padding-left: 35px;
        margin: 10px 0 25px;

        :global(li) {
          list-style: disc outside;
        }
      }

      .md-block-blockquote {
        @include text('h4');
        padding: 23px 32px;
        background: var(--athens);
        border-radius: 4px;
        color: var(--mirage);
        position: relative;
        margin: 20px 0 30px;

        &::before {
          content: '“';
          position: absolute;
          display: block;
          left: 28px;
          top: 1px;
          font-size: 74px;
          font-family: sans-serif;
          font-weight: bold;
          color: var(--casper);
        }
      }

      .md-block-blockquote + .md-block-blockquote::before {
        display: none;
      }
    }
  }

  .bottom {
    display: flex;
    align-items: center;
    border-top: 1px solid var(--porcelain);
    padding-top: 16px;
    margin-top: 16px;
  }

  .stats {
    white-space: nowrap;
    margin-right: 20px;
  }

  .tags {
    margin-left: auto;
    text-align: right;
  }

  :global(.PulseCard__comments) {
    margin-left: 22px;
  }

  :global(.PulseCard__profile) {
    max-width: 400px;
    color: var(--waterloo);
    @include text('caption');

    .icon {
      min-width: 24px !important;
      width: 24px !important;
      height: 24px !important;
    }
  }
</style>
