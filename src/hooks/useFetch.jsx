import React from 'react';

function useFetch() {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(null);
  const [erro, setErro] = React.useState(null);

  const request = React.useCallback(async (url, options) => {
    let response;
    let json;
    try {
      setErro(null);
      setLoading(true);
      response = await fetch(url, options);
      json = await response.json();
      if (!response.ok) throw new Error(json.message);

    } catch (err) {
      json = null
      setErro(err.message);

    } finally {
      setData(json);
      setLoading(false);
      return { response, json };
    }
  }, []);

  return { request, loading, data, erro };
}

export default useFetch;
