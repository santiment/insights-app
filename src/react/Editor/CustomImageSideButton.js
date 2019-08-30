import React from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { ImageSideButton, Block, addNewBlock } from 'medium-draft'
import { notifications } from '../../stores/notifications'
import styles from './CustomImageSideButton.module.scss'

const MAX_IMG_SIZE = 5000 // NOTE(vanguard): after uploading file with size than 5mb backend does not return imageUrl

class CustomImageSideButton extends ImageSideButton {
  onChange(e) {
    const file = e.target.files[0]

    if (!file) {
      return
    }
    const {
      mutate,
      setEditorState,
      getEditorState,
      close,
      onImgLoad,
    } = this.props
    if (file.type.indexOf('image/') === 0) {
      if (file.size / 1024 > MAX_IMG_SIZE) {
        notifications.add({
          type: 'error',
          title: 'Image size is too large',
        })
        return
      }

      onImgLoad('start')

      mutate({ variables: { images: e.target.files } })
        .then(({ data: { uploadImage } }) => {
          onImgLoad('done')
          const imageData = uploadImage[0]
          const uploadImageUrl = imageData.imageUrl

          if (!uploadImageUrl) {
            notifications.add({
              type: 'error',
              title: 'Image upload error',
            })
            return
          }

          setEditorState(
            addNewBlock(getEditorState(), Block.IMAGE, {
              src: uploadImageUrl,
            }),
          )
        })
        .catch(error => {
          notifications.add({
            type: 'error',
            title: 'Image upload error',
          })
          //Raven.captureException(error)
        })
    }
    close()
  }

  render() {
    return (
      <div className='md-sd-button'>
        <label className={styles.label} htmlFor='md-sd-img-button'>
          {/* <Icon type='picture' height={17} /> */}
        </label>
        <input
          className={styles.input}
          id='md-sd-img-button'
          type='file'
          accept='image/*'
          onChange={this.onChange}
        />
      </div>
    )
  }
}

export default graphql(gql`
  mutation($images: [Upload!]!) {
    uploadImage(images: $images) {
      contentHash
      fileName
      imageUrl
      hashAlgorithm
    }
  }
`)(CustomImageSideButton)
