<script context="module">
  export function preload(_, session) {
    const user = session.currentUser
    if (!user) return this.redirect(302, '')
    if (user.privacyPolicyAccepted) return this.redirect(302, '')
  }
</script>

<script>
  import Gdpr from '@cmp/LoginPrompt/Gdpr.svelte'
  import Layout from './login/_layout.svelte'
</script>

<Layout>
  <Gdpr />
</Layout>
