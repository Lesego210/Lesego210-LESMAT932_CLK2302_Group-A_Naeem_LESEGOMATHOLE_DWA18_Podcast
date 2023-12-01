// Episodes.jsx

import { useEffect, useState } from 'react';
import Loader from './Loader.jsx';
import Error from './Error.jsx';
import { Container } from '@mui/system';
import { Button } from '@mui/material';
import FavoriteEpisodes from './FavoriteEpisodes.jsx';
// eslint-disable-next-line react/prop-types
const Episodes = ({ podcastId }) => {
  const apiUrl = `https://podcast-api.netlify.app/id/${podcastId}`;
  const [podcastData, setPodcastData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favoriteEpisodes, setFavoriteEpisodes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setPodcastData(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [apiUrl]);

  const handleAddToFavorites = (episode) => {
    if (episode) {
      if (favoriteEpisodes.includes(episode)) {
        setFavoriteEpisodes((prevEpisodes) =>
          prevEpisodes.filter((e) => e !== episode)
        );
      } else {
        setFavoriteEpisodes((prevEpisodes) => [...prevEpisodes, episode]);
      }
    }
  };

  function Template() {
    return (
      <Container>
        <div>
          {podcastData.seasons.map((season) => (
            <div key={season.season}>
              <h2>{season.title}</h2>
            

              {season.episodes.map((episode) => (
                <div key={episode.episode} className="episode">
                  <h3>{episode.title}</h3>
                  <p>{episode.description}</p>
                  <p>Episode: {episode.episode}</p>
                  <audio controls>
                    <source src={episode.file} type="audio/mp3" />
                    Your browser does not support the audio tag.
                  </audio>
                  <Button onClick={() => handleAddToFavorites(episode)}>
                    {favoriteEpisodes.includes(episode)
                      ? 'Remove from favorites'
                      : 'Add to favorites'}
                  </Button>
                </div>
              ))}
            </div>
          ))}
        </div>
      </Container>
    );
  }

  return (
    <>
      {loading && <Loader />}
      {error && <Error />}
      {podcastData && <Template />}
    </>
  );
};

export default Episodes;
