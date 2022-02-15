<script>
  import { stores } from '@sapper/app'

  export let tags = []

  const checkIsTrendTag = (tag) => tag.toLowerCase().endsWith('-trending-words')
  const noTrendTagsFilter = ({ name }) => !checkIsTrendTag(name)

  const { page } = stores()
  $: base = $page.path === '/pulse' ? 'pulse' : ''
</script>

{#each tags.filter(noTrendTagsFilter) as { name }}
  {@const tag = name.toLowerCase()}
  <a href="{base}?tags={tag}" class="tag btn-2">{tag}</a>
{/each}

<style>
  .tag {
    padding: 1px 6px;
    margin-left: 4px;
  }
</style>
