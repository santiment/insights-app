<script>
  import { onMount } from 'svelte'
  import { getSEOLinkFromIdAndTitle } from '@/utils/insights'
  import ViewportObserver from '@/components/ViewportObserver'
  import { queryConversations } from './api'

  let conversations = []
  let loading = false
  let hasMore = true
  let lastDate

  const getNewDate = () =>
    lastDate && new Date(new Date(lastDate) - 1000).toISOString()

  const insightsFilter = ({ insight }) => insight
  function getConversations() {
    if (loading) return
    loading = true

    queryConversations(getNewDate()).then((data) => {
      loading = false
      if (!data) return

      const { length } = data
      if (length === 0) {
        return (hasMore = false)
      }

      const newLastDate = data[length - 1].insertedAt
      if (lastDate === newLastDate) return

      lastDate = newLastDate
      conversations = conversations.concat(data.filter(insightsFilter))
    })
  }

  const normalizeComment = (comment) =>
    comment
      ? comment.length > 80
        ? comment.slice(0, 80) + '...'
        : comment
      : ''

  function onItemClick(e) {
    const { id, title } = e.currentTarget.dataset
    if (!title) return
    window.open('/read/' + getSEOLinkFromIdAndTitle(id, title), '_blank')
  }

  onMount(getConversations)

  let conversationsNode
  $: options = {
    root: conversationsNode,
    rootMargin: '50% 0px',
  }

  function onIntersect() {
    getConversations()
  }
</script>

<div class="conversations" bind:this="{conversationsNode}">
  <ViewportObserver
    {options}
    on:intersect="{onIntersect}"
    observeWhile="{hasMore}"
  >
    {#each conversations as {id, user, content, insight} (id)}
    <div
      class="conversation"
      on:click="{onItemClick}"
      data-id="{insight.id}"
      data-title="{insight.title}"
    >
      <div class="row">
        <a class="row" href="https://app.santiment.net/profile/{user.id}">
          <div class="icon">
            <img
              alt="Profile"
              src="{user.avatarUrl || 'profile-fallback.svg'}"
            />
          </div>

          {user.username || user.email}
        </a>

        <div class="insigts">
          Insights
        </div>
      </div>

      <div class="comment">
        {normalizeComment (content)}
      </div>

      <div class="source">
        {insight.title}
      </div>
    </div>
    {/each}
  </ViewportObserver>
</div>

<style lang="scss">
  .conversations {
    overflow: hidden;

    &:hover {
      overflow-y: auto;
      overflow-y: overlay;
    }
  }

  .row {
    display: flex;
    align-items: center;
  }

  .conversation {
    border: 1px solid var(--porcelain);
    border-radius: 4px;
    margin-bottom: 8px;
    padding: 12px 16px;
    cursor: pointer;

    &:hover {
      background: var(--athens);
    }
  }

  .insigts {
    font-size: 12px;
    line-height: 16px;
    font-weight: 500;
    padding: 4px 8px;
    margin-left: auto;
    background: var(--texas-rose-light);
  }
  .icon {
    width: 24px;
    height: 24px;
    min-width: 24px;
    border-radius: 50%;
    background: var(--porcelain);
    margin-right: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    fill: var(--white);
    overflow: hidden;
  }

  img {
    max-width: 100%;
    max-height: 100%;
  }

  .comment {
    margin: 8px 0;
    font-size: 16px;
    line-height: 24px;
  }

  .source {
    color: var(--waterloo);
  }
</style>
