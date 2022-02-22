<script>
  import React from 'react'
  import ReactDOM from 'react-dom'
  import { onDestroy, onMount } from 'svelte'
  import InsightText from '@cmp/InsightText.svelte'

  export let insight
  export let onChange
  export let contentRef

  let node

  onMount(() => {
    import('./ReactText').then((data) => render(data.default))
  })
  onDestroy(() => {
    if (!node) return

    ReactDOM.unmountComponentAtNode(node)
  })

  function render(Component) {
    if (!node) return

    const { text } = insight
    ReactDOM.render(React.createElement(Component, { text, contentRef, onChange }), node.firstChild)
  }
</script>

<div class="relative" bind:this={node}>
  <InsightText class="body-1" />
</div>

<style lang="scss">
  div {
    --text-ul-margin: 10px 0 24px;
  }
  div :global {
    .md-RichEditor-root .md-block-image-caption--empty::before {
      content: 'Add caption...';
      color: var(--casper);
      position: absolute;
      left: 0;
      cursor: text;
      width: 720px;
      text-align: center;
    }

    .public-DraftEditorPlaceholder-root {
      position: absolute;
      z-index: 1;
      pointer-events: none;
    }
    .public-DraftEditorPlaceholder-inner {
      color: var(--casper);
    }

    .md-editor-toolbar {
      font-size: 12px;
      visibility: hidden;
      position: absolute;
      display: flex;
      height: 32px;
      background: #505573;
      color: #d2d6e6;
      fill: #d2d6e6;
      cursor: auto;
      z-index: 2;
      border-radius: 4px;
      transition: all 0.1s ease;
      box-shadow: 0 2px 2px rgba(21, 24, 31, 0.04), 0 2px 6px rgba(0, 0, 0, 0.08),
        0 4px 12px rgba(0, 0, 0, 0.08);
      padding: 6px 10px;
      align-items: center;

      &.md-editor-toolbar--isopen {
        visibility: visible;
      }

      button:hover {
        color: var(--green-hover);
      }
    }

    .md-RichEditor-controls {
      height: 20px;
      display: flex;
      align-items: center;
      border-right: 1px solid #7b829d;

      &:last-of-type {
        border-right: none;
      }
    }

    .md-RichEditor-styleButton {
      display: inline-flex;
      width: 32px;
      height: 20px;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }

    .md-RichEditor-activeButton {
      fill: var(--green);
    }

    .md-editor-toolbar-unlink-button,
    .md-editor-toolbar-edit-button {
      color: #e0e4ee;
    }

    .md-editor-toolbar-unlink-button {
      margin: 0 8px;
    }

    .md-RichEditor-show-link-input {
      width: 100%;
      padding: 0 10px;
    }

    .md-url-input-close {
      position: absolute;
      right: 8px;
      top: 2.5px;
      font-size: 20px;
      cursor: pointer;
    }
    .md-url-input {
      box-sizing: border-box;
      display: block;
      width: 100%;
      height: 100%;
      padding-right: 11px;
      border: none;
      outline: none;
      background: transparent;
      color: #fff;

      &::placeholder {
        color: #fff;
        padding-left: 3px;
      }
    }

    [class*='hint--'] {
      position: relative;

      &[aria-label]::after {
        background: #4c516c;
        white-space: nowrap;
        font-size: 12px;
        padding: 4px 10px;
        content: attr(aria-label);
        margin-top: -8px;
      }

      &::before {
        content: '';
        position: absolute;
        border: 6px solid transparent;
        z-index: 1000001;
        margin-top: 11px;
      }

      &::after,
      &::before {
        position: absolute;
        visibility: hidden;
        opacity: 0;
        left: 50%;
        transform: translate3d(-50%, -30px, 0);
        z-index: 1000000;
        pointer-events: none;
        transition: 0.3s ease;
      }

      &:hover::after,
      &:hover::before {
        visibility: visible;
        opacity: 1;
      }
    }

    .md-side-toolbar {
      position: absolute;
      left: -36px;

      :global(body.phone-xs) & {
        left: -8px;
        margin-top: 25px;
      }
    }

    .md-open-button + div {
      z-index: 9;
      position: absolute;
      top: 0;
      left: 0;
      animation-fill-mode: forwards;
      animation-name: fade;
      animation-duration: 200ms;
      margin-top: 2px;
    }

    .md-add-button {
      cursor: pointer;
      outline: none;
      background: transparent;
      border-radius: 50%;
      width: 18px;
      height: 18px;
      position: relative;
      margin-top: 7px;

      svg {
        display: none;
      }

      &.md-open-button::before {
        transform: translate3d(-44%, -50%, 0) rotate(45deg);
      }

      &::before {
        color: var(--black);
        content: '+';
        display: inline-block;
        position: absolute;
        font-size: 25px;
        line-height: 0;
        transition: transform 200ms;
        font-family: 'Proxima Nova', sans-serif;
        left: 52%;
        top: 45%;
        transform: translate3d(-50%, -50%, 0);
      }
    }

    .md-sd-button {
      --color-hover: var(--green);
      margin: 5px 0 0;
    }

    @keyframes fade {
      from {
        opacity: 0;
        left: 0;
      }

      to {
        opacity: 1;
        left: 36px;
      }
    }
  }
</style>
