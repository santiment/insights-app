<script>
  import NavCard from './Card.svelte'

  const labs = [
    {
      title: 'Social trends',
      desc:
        'Explore the social volume of any word or phrase on crypto social media. Results gathered from 1000+ channels, groups, subreddits and more.',
      link: 'https://app.santiment.net/labs/trends',
      logo: '/labs-social.svg',
    },
    {
      title: 'Historical balance',
      desc:
        'Look up any Ethereum wallet’s historical and current holdings. Create low-latency signals to track future wallet behavior.',
      link: 'https://app.santiment.net/labs/balance',
      logo: '/labs-balance.svg',
    },
    {
      title: 'Buidl heroes',
      desc:
        'Compare the development activity of all Ethereum, EOS and DeFi projects over time.',
      link: 'https://app.santiment.net/labs/buidl-heroes',
      logo: '/labs-buidl.svg',
    },
    {
      title: 'Studio',
      desc:
        'On-chain, social, development and financial indicators for 900+ crypto assets',
      link: 'https://app.santiment.net/chart',
      logo: '/labs-studio.svg',
    },
  ]

  const classes = {
    wrapper: 'NavLabs__card',
  }
</script>

<template lang="pug">
include /ui/mixins

.labs
  +each('labs as product')
    NavCard({...product}, {classes})

</template>

<style lang="scss">
  @import '@/mixins';
  .labs {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 16px;
  }

  :global(.NavLabs__card) {
    padding-left: 73px !important;
  }
</style>
