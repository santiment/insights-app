<script>
  import Profile from 'webkit/ui/Profile/svelte'

  let items = [
    {
      id: 0,
      user: {
        id: 123,
        username: 'test',
      },
      content:
        'asdfa sdfj ansldkfj ansdlkf jansdlfk jansldf kasdfa sdfj ansldkfj ansdlkf jansdlfk jansldf k asdfjn aldkfj nalf',
      insight: {
        id: 0,
        title: 'insight title',
      },
    },
  ]
</script>

<h2 class="h4 mrg-l mrg--b">Conversations</h2>

<!-- <ViewportObserver {options} on:intersect={onIntersect} observeWhile={hasMore}> -->

{#each items as { id, user, content, insight } (id)}
  <div class="border btn">
    <div class="row">
      <Profile {user} />
      <div class="caption mrg-a mrg--l">Insights</div>
    </div>

    <div class="comment mrg-s mrg--t mrg--b">{content}</div>
    <div class="title c-waterloo">{insight.title}</div>
  </div>
{/each}

<!-- </ViewportObserver> -->
<style>
  h2 {
    margin-top: 28px;
  }

  .btn {
    padding: 12px 16px;
    --bg-hover: var(--athens);
    --img-size: 24px;
    --name-max-width: 200px;
  }

  .caption {
    padding: 4px 8px;
    background: var(--orange-light-1);
  }

  .title,
  .comment {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .comment {
    white-space: pre-line;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
</style>
