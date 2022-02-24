<script>
  export let status
  export let error

  const dev = process.env.NODE_ENV === 'development'
</script>

{#if dev}
  <p>{status}</p>
  <p>{error.message}</p>
  <pre>{error.stack}</pre>
{/if}

<div class="fluid" />

<style>
  div {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    background: url(webkit/illus/404.svg) no-repeat 50% 50% / 40%;
  }
</style>
