import React from 'react';
import { ReactComponent as Enviar } from '../../Assets/enviar.svg';
import useFetch from '../../hooks/useFetch';
import { COMMENT_POST } from '../../api';
import Error from '../../helper/Error';
import styles from './PhotoCommentsForm.module.css';

function PhotoCommentsForm({ id, setComments, single }) {
  const { request, erro } = useFetch();
  const [comment, setComment] = React.useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    const { url, options } = COMMENT_POST(id, { comment });
    const { response, json } = await request(url, options);
    if (response.ok) {
      setComment('');
      setComments((comments) => [...comments, json]);
    }
  }

  return (
    <form className={`${styles.form} ${single ? styles.single : ''}`} onSubmit={handleSubmit}>
      <textarea
        className={styles.textarea}
        value={comment}
        id="comment"
        name="comment"
        placeholder="Comente..."
        onChange={({ target }) => setComment(target.value)}
      ></textarea>
      <button className={styles.button}>
        <Enviar />
      </button>
      <Error error={erro} />
    </form>
  );
}

export default PhotoCommentsForm;
