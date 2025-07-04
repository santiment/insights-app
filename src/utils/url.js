/**
 *
 * @param {string} path
 * @returns {string}
 */
export function getSanbaseHref(path) {
  const stage = process.env.IS_STAGE_BACKEND ? '-stage' : ''
  return `https://app${stage}.santiment.net${path}`
}

export function feedQueryToSanbaseSearch({ tags, onlyPro }) {
  if (onlyPro) {
    return '?tab=pro'
  }

  if (tags) {
    return `?tags=${tags}`
  }

  return ''
}
