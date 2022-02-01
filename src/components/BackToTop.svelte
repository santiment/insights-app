<script>
  import ViewportObserver from '@/components/ViewportObserver.svelte'

  let hidden = true

  const options = {
    rootMargin: '0px 0px -100px',
  }
  const onIntersect = () => (hidden = true)
  const onLeaving = () => (hidden = false)
</script>

<ViewportObserver {options} on:intersect={onIntersect} on:leaving={onLeaving}>
  <div class:hidden on:click={() => window.scrollTo(0, 0)} />
</ViewportObserver>

<style>
  div {
    background: url(/back-to-top.svg) no-repeat 50%, var(--green);
    border-radius: 50%;
    position: fixed;
    width: 48px;
    height: 48px;
    left: 48px;
    bottom: 48px;
    cursor: pointer;
    transition: opacity 200ms;
  }
  .hidden {
    opacity: 0;
  }

  div:hover {
    background-color: var(--green-hover);
  }
</style>
