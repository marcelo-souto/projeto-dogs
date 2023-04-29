import React from 'react';
import { useParams } from 'react-router';
import Error from '../../helper/Error';
import Head from '../../helper/Head';
import Loading from '../../helper/Loading';
import PhotoContent from './PhotoContent';

import { useSelector, useDispatch } from 'react-redux';
import { fetchPhoto } from '../../store/photo/photo';

function Photo() {
	const { id } = useParams();

	const dispatch = useDispatch();
	const { loading, error, data } = useSelector((state) => state.photo);

	React.useEffect(() => {
		dispatch(fetchPhoto(id));
	}, [dispatch, id]);

	if (error) return <Error error={error} />;
	if (loading) return <Loading />;
	if (data)
		return (
			<section className='container mainContainer'>
				<Head title={data.photo.title} />
				<PhotoContent single={true} data={data} />
			</section>
		);
	else return null;
}

export default Photo;
