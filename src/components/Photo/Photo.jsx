import React from 'react';
import { useParams } from 'react-router';
import { PHOTO_GET } from '../../api';
import Error from '../../helper/Error';
import Head from '../../helper/Head';
import Loading from '../../helper/Loading';
import useFetch from '../../hooks/useFetch';
import PhotoContent from './PhotoContent';

function Photo() {
  const { id } = useParams();
  const { data, loading, erro, request } = useFetch();

  React.useEffect(() => {
    const { url, options } = PHOTO_GET(id);
    request(url, options);
  }, [request, id]);

  if (erro) return <Error error={erro} />;
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
