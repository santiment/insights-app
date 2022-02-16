<script>
  let className = ''
  export { className as class }
  export let text
</script>

<div class={className}>
  {@html text}
</div>

<style lang="scss">
  div {
    word-break: break-word;
    :global {
      h1 {
        font-size: var(--text-h1-size, 28px);
        line-height: 40px;
        font-weight: 500;
      }
      h2 {
        font-size: var(--text-h2-size, 22px);
        line-height: 30px;
        font-weight: 500;
      }
      iframe {
        border: 0;
        width: 100%;
        height: 300px;
      }
      .md-block-iframe {
        max-width: 100%;
        margin-top: 10px;
      }

      a {
        color: var(--green);
      }
      a:hover {
        color: var(--green-hover);
      }
      u a {
        background: linear-gradient(var(--green-light-3), var(--green-light-3)) bottom / 100% 1px
          no-repeat;
      }

      strong {
        font-weight: bold;
      }

      img {
        max-width: 100%;
      }

      figure {
        text-align: center;
        max-width: 600px;
        margin: 16px auto var(--text-figure-mrg-b, 32px);
      }

      figcaption {
        font-size: 14px;
        line-height: 20px;
        font-style: italic;
        color: var(--waterloo);
      }

      ul {
        padding-left: 35px;
        margin: var(--text-ul-margin, 10px 0 40px);
      }

      li {
        list-style: disc outside;
      }

      u {
        text-decoration: none;
        background-position: 100% 100%;
        background-repeat: no-repeat;
        background-size: 100% 1px;
        background-image: linear-gradient(var(--black), var(--black));
      }

      blockquote {
        font-size: var(--text-quote-size, 24px);
        line-height: 32px;
        padding: var(--text-quote-padding, 23px 32px);
        background: var(--athens);
        border-radius: 4px;
        color: var(--black);
        position: relative;
        margin: var(--text-quote-margin, 20px 0 30px);

        &::before {
          content: '“';
          position: absolute;
          display: block;
          left: 28px;
          top: 1px;
          font-size: var(--text-quotes-size, 74px);
          font-family: sans-serif;
          font-weight: bold;
          color: var(--casper);
        }
      }

      blockquote + blockquote::before {
        display: none;
      }
    }
  }
</style>
