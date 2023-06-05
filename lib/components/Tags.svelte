<script>
  import { onMount } from 'svelte'
  import { stores } from '@sapper/app'
  import { session } from './../stores/session'

  export let tags = []
  export let isPro = false
  export let shouldSliceTags = false
  let tagsWidth = []
  let windowWidth
  let maxTagsAmount = tags.length

  const { page } = stores()

  const checkIsTrendTag = (tag) => tag.toLowerCase().endsWith('-trending-words')
  const noTrendTagsFilter = ({ name }) => !checkIsTrendTag(name)

  function setTagWidth(node) {
    tagsWidth.push(node.getBoundingClientRect().width)
  }

  function setMaxTagsAmount() {
    let amount = 0
    let maxWidth = isPro ? windowWidth - 259 : windowWidth - 235

    for (let i = 0; i < tagsWidth.length; i++) {
      const isLast = i === tagsWidth.length - 1

      if (maxWidth - tagsWidth[i] - (isLast ? 42 : 50) < 0) {
        break
      }

      maxWidth = maxWidth - tagsWidth[i]

      if (!isLast) {
        maxWidth = maxWidth - 8
      }

      if (maxWidth >= 0) {
        amount = amount + 1
      }
    }

    maxTagsAmount = amount
  }

  $: base = $page.path === '/pulse' ? 'pulse' : ''
  $: isMobile = $session.isMobile
  $: tags = tags.filter(noTrendTagsFilter)

  onMount(() => setMaxTagsAmount())
</script>

<svelte:window bind:innerWidth={windowWidth} />

{#each shouldSliceTags ? tags.slice(0, maxTagsAmount) : tags as { name }}
  {@const tag = name.toLowerCase()}
  <a href="{base}?tags={tag}" class="tag btn-2 {isMobile ? 'body-3' : ''}" use:setTagWidth>
    {tag}
  </a>
{/each}
{#if isMobile && maxTagsAmount < tags.length && shouldSliceTags}
  <div class="tag btn-2 body-3">
    +{tags.length - maxTagsAmount}
  </div>
{/if}

<style lang="scss">.tag {
  width: fit-content;
  padding: 1px 6px;
}

:global(body:not(.desktop)) .tag {
  padding: 5px 12px;
}</style>
