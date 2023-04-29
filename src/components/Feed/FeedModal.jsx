import React from 'react';
import styles from './FeedModal.module.css';
import Error from '../../helper/Error';
import Loading from '../../helper/Loading';
import PhotoContent from '../Photo/PhotoContent';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../store/ui/ui';

function FeedModal({ photo }) {

	const dispatch = useDispatch();
	const { data, loading, error } = useSelector((state) => state.photo);
	const { modal } = useSelector((state) => state.ui);

	function handleOutsideClick(e) {
		if (e.target === e.currentTarget) dispatch(closeModal());
	}

	React.useEffect(() => {
		dispatch(closeModal())
	}, [])

	if (!modal) return null;
	return (
		<div className={styles.modal} onClick={handleOutsideClick}>
			{error && <Error error={error} />}
			{loading && <Loading />}
			{data && <PhotoContent />}
		</div>
	);
}

export default FeedModal;
