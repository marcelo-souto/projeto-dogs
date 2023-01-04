import React from 'react';

function useMedia(media) {
  const [match, setMatch] = React.useState(null);
  media = `(max-width: ${media})`

  React.useEffect(() => {
    const changeMatch = () => {
      const { matches } = window.matchMedia(media);
      setMatch(matches);
    };

    changeMatch()
    window.addEventListener('resize', changeMatch);
    window.addEventListener('wheel', changeMatch);

    return () => {
      window.removeEventListener('resize', changeMatch);
      window.removeEventListener('wheel', changeMatch);
    }

  }, [media]);

  return match
}

export default useMedia;
