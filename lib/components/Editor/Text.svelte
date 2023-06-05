<script>
  import React from 'react'
  import ReactDOM from 'react-dom'
  import { onDestroy, onMount } from 'svelte'
  import InsightText from './../../components/InsightText.svelte'

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

    const text = insight.text || ''
    ReactDOM.render(React.createElement(Component, { text, contentRef, onChange }), node.firstChild)
  }
</script>

<div class="relative" bind:this={node}>
  <InsightText class="body-1" />
</div>

<style lang="scss">div {
  --text-ul-margin: 10px 0 24px;
}

div :global(.md-RichEditor-root) :global(.md-block-image-caption--empty::before) {
  content: "Add caption...";
  color: var(--casper);
  position: absolute;
  left: 0;
  cursor: text;
  width: 720px;
  text-align: center;
}
div :global(.public-DraftEditorPlaceholder-root) {
  position: absolute;
  z-index: 1;
  pointer-events: none;
}
div :global(.public-DraftEditorPlaceholder-inner) {
  color: var(--casper);
}
div :global(.md-editor-toolbar) {
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
  box-shadow: 0 2px 2px rgba(21, 24, 31, 0.04), 0 2px 6px rgba(0, 0, 0, 0.08), 0 4px 12px rgba(0, 0, 0, 0.08);
  padding: 6px 10px;
  align-items: center;
}
div :global(.md-editor-toolbar.md-editor-toolbar--isopen) {
  visibility: visible;
}
div :global(.md-editor-toolbar) :global(button:hover) {
  color: var(--green-hover);
}
div :global(.md-RichEditor-controls) {
  height: 20px;
  display: flex;
  align-items: center;
  border-right: 1px solid #7b829d;
}
div :global(.md-RichEditor-controls:last-of-type) {
  border-right: none;
}
div :global(.md-RichEditor-styleButton) {
  display: inline-flex;
  width: 32px;
  height: 20px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
div :global(.md-RichEditor-activeButton) {
  fill: var(--green);
}
div :global(.md-editor-toolbar-unlink-button),
div :global(.md-editor-toolbar-edit-button) {
  color: #e0e4ee;
}
div :global(.md-editor-toolbar-unlink-button) {
  margin: 0 8px;
}
div :global(.md-RichEditor-show-link-input) {
  width: 100%;
  padding: 0 10px;
}
div :global(.md-url-input-close) {
  position: absolute;
  right: 8px;
  top: 2.5px;
  font-size: 20px;
  cursor: pointer;
}
div :global(.md-url-input) {
  box-sizing: border-box;
  display: block;
  width: 100%;
  height: 100%;
  padding-right: 11px;
  border: none;
  outline: none;
  background: transparent;
  color: #fff;
}
div :global(.md-url-input::placeholder) {
  color: #fff;
  padding-left: 3px;
}
div :global([class*=hint--]) {
  position: relative;
}
div :global([class*=hint--][aria-label]::after) {
  background: #4c516c;
  white-space: nowrap;
  font-size: 12px;
  padding: 4px 10px;
  content: attr(aria-label);
  margin-top: -8px;
}
div :global([class*=hint--]::before) {
  content: "";
  position: absolute;
  border: 6px solid transparent;
  z-index: 1000001;
  margin-top: 11px;
}
div :global([class*=hint--]::after), div :global([class*=hint--]::before) {
  position: absolute;
  visibility: hidden;
  opacity: 0;
  left: 50%;
  transform: translate3d(-50%, -30px, 0);
  z-index: 1000000;
  pointer-events: none;
  transition: 0.3s ease;
}
div :global([class*=hint--]:hover::after), div :global([class*=hint--]:hover::before) {
  visibility: visible;
  opacity: 1;
}
div :global(.md-side-toolbar) {
  position: absolute;
  left: -36px;
}
:global(body.phone-xs) div :global(.md-side-toolbar) {
  left: -8px;
  margin-top: 25px;
}
div :global(.md-open-button) + :global(div) {
  z-index: 9;
  position: absolute;
  top: 0;
  left: 0;
  animation-fill-mode: forwards;
  animation-name: fade;
  animation-duration: 200ms;
  margin-top: 2px;
}
div :global(.md-add-button) {
  cursor: pointer;
  outline: none;
  background: transparent;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  position: relative;
  margin-top: 7px;
}
div :global(.md-add-button) :global(svg) {
  display: none;
}
div :global(.md-add-button.md-open-button::before) {
  transform: translate3d(-44%, -50%, 0) rotate(45deg);
}
div :global(.md-add-button::before) {
  color: var(--black);
  content: "+";
  display: inline-block;
  position: absolute;
  font-size: 25px;
  line-height: 0;
  transition: transform 200ms;
  font-family: "Proxima Nova", sans-serif;
  left: 52%;
  top: 45%;
  transform: translate3d(-50%, -50%, 0);
}
div :global(.md-sd-button) {
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
}</style>
