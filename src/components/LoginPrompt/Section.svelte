<script>
  let className = ''
  export { className as class }
  export let title
  export let titleMargin = 'mrg-l'
  export let bottomLabel
  export let bottomAction
  export let bottomHref
</script>

<section class="border {className}">
  <h2 class="h3 {titleMargin} mrg--b">{title}</h2>

  <slot />

  <div class="body-2 c-waterloo mrg-xl mrg--t">
    {bottomLabel}
    <a href={bottomHref} class="btn" sapper:prefetch>{bottomAction}</a>
  </div>
</section>

<style>
  section {
    padding: 39px 99px;
    text-align: center;
    min-width: 540px;
  }

  .btn {
    --color: var(--green);
    --color-hover: var(--green-hover);
  }
</style>
