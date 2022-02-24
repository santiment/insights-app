import { createElement } from 'react'
import { Block, addNewBlock } from 'medium-draft'
import { upload } from 'webkit/api'
import { notifications } from 'webkit/ui/Notifications'
import Svg from 'webkit/ui/Svg/react'

const UPLOAD_IMAGE_MUTATION = `
  mutation($files: [Upload!]!) {
    uploadImage(images:$files) {
      contentHash
      fileName
      imageUrl
      hashAlgorithm
    }
  }`
const accessor = ({ uploadImage }) => uploadImage
export const mutateUploadImage = (files) => upload(UPLOAD_IMAGE_MUTATION, files).then(accessor)

const MAX_IMG_SIZE = 5000 // NOTE(vanguard): after uploading file with size than 5mb backend does not return imageUrl
const ChartIframe = ({ close, setEditorState, getEditorState }) => {
  function onChange(e) {
    const files = e.target.files
    const file = files[0]
    if (!file) return
    if (file.type.indexOf('image/') !== 0) return
    if (file.size / 1024 > MAX_IMG_SIZE) {
      notifications.show({
        type: 'error',
        title: 'Image size is too large',
      })
      return
    }

    mutateUploadImage([file]).then(([data]) => {
      setEditorState(addNewBlock(getEditorState(), Block.IMAGE, { src: data.imageUrl }))
    })

    close()
  }

  return createElement(
    'label',
    { className: 'md-sd-button btn' },

    createElement(Svg, { id: 'image', w: 16 }),

    createElement('input', {
      className: 'hide',
      type: 'file',
      accept: 'image/*',
      onChange,
    }),
  )
}

export default ChartIframe
