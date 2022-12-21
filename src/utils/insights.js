export function getRawText(text) {
  if (!text) return ''
  const res = text.split(/<.*?>/g).join('')
  return res[0] === ' ' ? res.slice(1) : res
}

export const NFT_BATTLE_TAG = 'NFTBATTLE'

export const checkIsTrendTag = (tag) => tag.toLowerCase().endsWith('-trending-words')
export const checkIsNFTTag = (tag) => tag.toUpperCase() === NFT_BATTLE_TAG
