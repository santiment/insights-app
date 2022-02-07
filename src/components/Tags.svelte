<script>
  export let tags = []

  const checkIsTrendTag = (tag) => tag.toLowerCase().endsWith('-trending-words')
  const noTrendTagsFilter = ({ name }) => !checkIsTrendTag(name)
</script>

{#each tags.filter(noTrendTagsFilter) as { name }}
  {@const tag = name.toLowerCase()}
  <a href="/?tags={tag}" class="tag btn-2">{tag}</a>
{/each}

<style>
  .tag {
    padding: 1px 6px;
    margin-left: 4px;
  }
</style>
