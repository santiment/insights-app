<script>
  import ProfileInfo from '@/components/ProfileInfo'
  import RocketMoonBtn from '@/components/RocketMoonBtn'
  import CommentCounter from '@/components/comments/Counter'
  import Tag from '@/components/insights/Tag'
  import Tags from './Tags.svelte'
  import { getTimeFormats, getDateFormats } from '@/utils/dates'
  import { getSEOLinkFromIdAndTitle } from '@/utils/insights'

  let className = ''
  export { className as class }
  export let insight,
    transformLink = (link) => link

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
  const link = transformLink(`/read/${seoLink}`)
</script>

<template lang="pug">
include /ui/mixins

mixin rawHtml(variables)
  | {@html !{variables}}

+panel().wrapper(class="{className}")
  .top
    a.title(href="{link}") {title}
      .time {publishTime}
    .text.PulseCard__text
      +rawHtml('text')
    ProfileInfo(name="{user.username}", id="{user.id}", avatarUrl="{user.avatarUrl}", withPic, classes="{{wrapper: 'PulseCard__profile'}}")

  .bottom
    .stats
      RocketMoonBtn({id}, votes='{votes.totalVotes}', userVotes='{votes.currentUserVotes}')
      CommentCounter.PulseCard__comments({link}, {commentsCount}, isSSRLink)

    div.tags
      Tags({tags})

</template>

<style lang="scss">
  @import '@/mixins';

  .wrapper {
    padding: 0;
    word-break: break-word;
  }

  .top {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 18px 16px 16px 24px;
  }

  .title {
    @include text('body-1');
    display: flex;
    color: var(--rhino);
    justify-content: space-between;

    &:hover {
      color: var(--jungle-green);
    }
  }

  .time {
    @include text('caption');
    color: var(--casper);
    margin: 4px 0 0 16px;
    white-space: nowrap;
  }

  .text {
    @include text('caption');
    color: var(--waterloo);
    margin: 10px 0 12px;
  }

  .bottom {
    display: flex;
    align-items: center;
    border-top: 1px solid var(--porcelain);
    padding: 12px 16px 12px 24px;
  }

  .stats {
    display: flex;
    align-items: center;
    white-space: nowrap;
    margin-right: 20px;
  }

  .tags {
    margin-left: auto;
    text-align: right;
  }

  :global(.PulseCard__comments) {
    margin-left: 10px;
    border: 1px solid var(--porcelain);
    border-radius: 100px;
    padding: 6px 12px;
    display: flex;
    align-items: center;
  }

  :global(.PulseCard__profile) {
    max-width: 400px;
    @include text('caption');

    :global(.icon) {
      min-width: 24px !important;
      width: 24px !important;
      height: 24px !important;
    }

    :global(.name) {
      color: var(--waterloo);

      &:hover {
        color: var(--jungle-green);
      }
    }
  }

  :global(.PulseCard__text) {
    :global(figure) {
      text-align: center;
      max-width: 600px;
      margin: 0 auto;
      margin-bottom: 6px;

      & + :global(figure) {
        margin-top: 20px;
      }
    }

    :global(img) {
      max-width: 100%;
    }

    :global(strong),
    :global(b) {
      font-weight: bold;
    }

    :global(a) {
      text-decoration: underline;
      color: var(--jungle-green);

      &:hover {
        color: var(--jungle-green-hover);
      }
    }

    :global(u) {
      text-decoration: underline;
    }

    :global(ul) {
      padding-left: 35px;
      margin: 10px 0 25px;

      :global(li) {
        list-style: disc outside;
      }
    }

    :global(blockquote) {
      padding: 12px 20px;
      background: var(--athens);
      border-radius: 4px;
      color: var(--mirage);
      position: relative;
      margin: 12px 0 16px;

      &::before {
        content: '“';
        position: absolute;
        display: block;
        left: 28px;
        top: 4px;
        font-size: 50px;
        font-family: sans-serif;
        font-weight: bold;
        color: var(--casper);
      }
    }

    :global(h1) {
      font-size: 16px;
    }

    :global(h2) {
      font-size: 14px;
    }
  }
</style>
