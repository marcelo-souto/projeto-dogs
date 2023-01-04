import React from 'react'
import styles from './Feed.module.css'
import FeedModal from './FeedModal'
import FeedPhotos from './FeedPhotos'

function Feed() {
  const [modalPhoto, setModalPhoto] = React.useState(null)

  return (
    <div>
      {modalPhoto && <FeedModal photo={modalPhoto} setModalPhoto={setModalPhoto} />}
      <FeedPhotos setModalPhoto={setModalPhoto} />
    </div>
  )
}

export default Feed