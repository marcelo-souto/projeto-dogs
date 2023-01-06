import React from 'react';
import { STATS_GET } from '../../api';
import Head from '../../helper/Head';
import useFetch from '../../hooks/useFetch';
import Loading from '../../helper/Loading';
import Error from '../../helper/Error';
const UserStatsGraphs = React.lazy(() => import('./UserStatsGraphs'))

function UserStats() {
  const { loading, erro, data, request } = useFetch();

  React.useEffect(() => {
    async function getData() {
      const { url, options } = STATS_GET();
      await request(url, options);
    }
    getData();
  }, [request]);

  if (loading) return <Loading />;
  if (erro) return <Error error={erro} />;
  if (data)
    return (
      <React.Suspense fallback={<div></div>}>
        <Head title="Estatísticas" />
        <UserStatsGraphs data={data} />
      </React.Suspense>
    );
  else return null;
}

export default UserStats;
