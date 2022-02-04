<script>
  import Svg from 'webkit/ui/Svg/svelte'
</script>

<div class="border row v-center mrg-a mrg--l">
  <Svg id="search" w="12" class="$style.search" />
  <input type="text" placeholder="Search for insights..." />
</div>

<style>
  div {
    position: relative;
    fill: var(--casper);
    height: 32px;
  }
  div:hover,
  div:focus-within {
    border-color: var(--green);
    fill: var(--green);
  }

  input {
    height: 100%;
    flex: 1;
    padding: 6px 6px 6px 36px;
    border-radius: 4px;
    color: var(--black);
  }

  .search {
    position: absolute;
    left: 14px;
  }
</style>
