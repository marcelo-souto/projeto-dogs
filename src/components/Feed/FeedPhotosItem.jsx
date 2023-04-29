import React from 'react';
import styles from './FeedPhotosItem.module.css';
import Image from '../../helper/Image';
import { openModal } from '../../store/ui/ui';
import { fetchPhoto } from '../../store/photo/photo';
import { useDispatch } from 'react-redux';

function FeedPhotosItem({ photo }) {
  
	const dispatch = useDispatch();

	function handleClick() {
		dispatch(openModal());
		dispatch(fetchPhoto(photo.id));
	}

	return (
		<li className={styles.photo} onClick={handleClick}>
			<Image src={photo.src} alt={photo.title} />
			<span className={styles.visualizacao}>{photo.acessos}</span>
		</li>
	);
}

export default FeedPhotosItem;
