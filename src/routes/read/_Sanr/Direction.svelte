<script>
  import Svg from 'webkit/ui/Svg/svelte'

  export let signal

  $: up = signal.direction === 'up'
</script>

<span class="direction" class:up>
  {up ? 'SanRise' : 'SanSet'}
  <Svg id="pointer" w="12" class="$style.pointer mrg-s mrg--l" />
</span>

<style>
  .direction {
    border-radius: 6px;
    fill: var(--red);
    --deg: 45deg;
    padding: var(--dir-padding, 10px 12px);
    background: var(--dir-bg, var(--red-light-1));
  }
  .up {
    background: var(--dir-bg-up, var(--green-light-1));
    fill: var(--green);
    --deg: -45deg;
  }

  .pointer {
    rotate: var(--deg);
  }
</style>
