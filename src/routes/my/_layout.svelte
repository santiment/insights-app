<script>
  export let segment
</script>

<h2 class="h4 txt-m mrg-xxl mrg--b">My Insights</h2>

<div class="tabs row fluid mrg-xxl mrg--b">
  <a href="/my/drafts" class="btn" class:active={segment === 'drafts'}>Drafts</a>
  <a href="/my" class="btn" class:active={!segment}>Published</a>
</div>

<slot />

<style lang="scss">
  .tabs {
    border-bottom: 1px solid var(--porcelain);
  }

  .btn {
    position: relative;
    padding: 0 0 16px;
    margin-right: 32px;
    --color: var(--waterloo);
    --color-hover: var(--green);
  }

  .active {
    color: var(--green);
    &::after {
      content: '';
      display: block;
      position: absolute;
      bottom: -1px;
      height: 2px;
      width: 100%;
      background: var(--green);
      border-radius: 1px;
    }
  }
</style>
