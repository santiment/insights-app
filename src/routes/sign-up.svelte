<script context="module">
  export function preload(_, session) {
    if (session.currentUser) return this.redirect(302, '')
  }
</script>

<script>
  import SignUp from '@cmp/LoginPrompt/SignUp.svelte'
  import Layout from './login/_layout.svelte'
</script>

<Layout>
  <SignUp />
</Layout>
