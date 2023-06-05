<script>
  import Tooltip from 'san-webkit/lib/ui/Tooltip/svelte'
  import { currentUser } from './../../stores/user'
  import ProjectSelector from './ProjectSelector.svelte'
  import TagSelector from './TagSelector.svelte'
  import ProToggle from './ProToggle.svelte'

  export let insight
  export let isDraft
  export let isEnabled
  export let loading = false
  export let update, onPublishClick

  $: subscription = $currentUser && $currentUser.subscription

  let project = insight.project
  let tags = insight.tags

  function onProjectUpdate(project) {
    insight.project = project
    update()
  }

  function onTagsUpdate(tags) {
    insight.tags = tags
    update()
  }
</script>

<Tooltip
  position="top"
  align="end"
  on="click"
  {isEnabled}
  class="tooltip-M8lTSU"
  closeTimeout={500}
>
  <svelte:fragment slot="trigger">
    <slot />
  </svelte:fragment>

  <svelte:fragment slot="tooltip">
    <div>Select a coin for the price minichart and add tags to attract more readers</div>
    <div class="label caption">Price minichart to show</div>
    <ProjectSelector {project} update={onProjectUpdate} />

    <div class="label caption">Tags ({tags.length}/5)</div>
    <TagSelector bind:tags update={onTagsUpdate} />

    {#if subscription}
      <ProToggle {insight} {update} />
    {/if}

    <button class="btn-1 fluid txt-center mrg-xl mrg--t" class:loading on:click={onPublishClick}
      >{isDraft ? 'Publish' : 'Update'} insight</button
    >
  </svelte:fragment>
</Tooltip>

<style>
  :global(.tooltip-M8lTSU) {
    padding: 15px;
    width: 317px;
    overflow: visible !important;
    left: unset !important;
    top: unset !important;
    right: 0;
    bottom: 75px;
  }

  .label {
    font-weight: 500;
    color: var(--waterloo);
    margin: 16px 0 3px;
  }
</style>
