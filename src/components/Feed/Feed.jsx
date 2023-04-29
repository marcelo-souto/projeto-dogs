import React from 'react';
import FeedModal from './FeedModal';
import FeedPhotos from './FeedPhotos';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { loadNewPhotos, resetFeedState } from '../../store/feed/feed';
import Loading from '../../helper/Loading';
import Error from '../../helper/Error';

function Feed({ user }) {
	const { infinite, loading, error, list } = useSelector((state) => state.feed);
	const dispatch = useDispatch();

	React.useEffect(() => {
		dispatch(resetFeedState());
		dispatch(loadNewPhotos({ user, total: 6 }));
	}, [dispatch, user]);

	React.useEffect(() => {
		let wait = false;
		function scrollInfinite() {
			if (infinite) {
				const scroll = window.scrollY;
				const height = document.body.offsetHeight - window.innerHeight;
				if (scroll > height * 0.75 && !wait) {
					dispatch(loadNewPhotos({ user, total: 6 }));
					wait = true;
					setTimeout(() => {
						wait = false;
					}, 500);
				}
			}
		}

		window.addEventListener('scroll', scrollInfinite);
		window.addEventListener('wheel', scrollInfinite);

		return () => {
			window.removeEventListener('scroll', scrollInfinite);
			window.removeEventListener('wheel', scrollInfinite);
		};
	}, [infinite, dispatch, user]);

	return (
		<div>
			<FeedModal />

			{list.length > 0 && <FeedPhotos />}
			{loading && <Loading />}
			{error && <Error error={error} />}

			{!infinite && !user && (
				<p
					style={{
						textAlign: 'center',
						padding: '2rem 0 4rem 0',
						color: '#888'
					}}
				>
					Não existem mais postagens.
				</p>
			)}
		</div>
	);
}

Feed.defaultProps = {
	user: 0
};

Feed.propTypes = {
	user: PropTypes.oneOfType([
		PropTypes.string.isRequired,
		PropTypes.number.isRequired
	])
};

export default Feed;
