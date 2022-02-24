<script context="module">
  export function preload(_, session) {
    const user = session.currentUser
    if (!user || user.privacyPolicyAccepted) return this.redirect(302, '')
  }
</script>

<script>
  import { goto } from '@sapper/app'
  import Gdpr from 'webkit/ui/LoginPrompt/Gdpr.svelte'
  import { currentUser } from '@/stores/user'
  import Layout from './login/_layout.svelte'
</script>

<svelte:head>
  <title>GDPR - Santiment Insights</title>
</svelte:head>

<Layout>
  <Gdpr onAccept={() => goto('/')} currentUser={$currentUser} />
</Layout>
