import React from 'react';
import styles from './FeedModal.module.css';
import useFetch from '../../hooks/useFetch';
import { PHOTO_GET } from '../../api';
import Error from '../../helper/Error';
import Loading from '../../helper/Loading';
import PhotoContent from '../Photo/PhotoContent';

function FeedModal({ photo, setModalPhoto }) {
  const { data, loading, erro, request } = useFetch();

  React.useEffect(() => {
    const { url, options } = PHOTO_GET(photo.id);
    request(url, options);
  }, [photo, request]);

  function handleOutsideClick(e) {
    if(e.target === e.currentTarget) setModalPhoto(null)
  }

  return (
    <div className={styles.modal} onClick={handleOutsideClick}>
      {erro && <Error error={erro} />}
      {loading && <Loading />}
      {data && <PhotoContent data={data} />}
    </div>
  );
}

export default FeedModal;
