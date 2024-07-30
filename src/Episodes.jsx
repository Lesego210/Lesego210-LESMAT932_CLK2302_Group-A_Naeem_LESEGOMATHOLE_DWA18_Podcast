import { useEffect, useState } from 'react';
import Loader from './Loader.jsx';
import Error from './Error.jsx';
import { Container } from '@mui/system';
import { Button } from '@mui/material';
import FavoriteEpisodes from './FavoriteEpisodes.jsx';

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
      setFavoriteEpisodes((prevEpisodes) =>
        prevEpisodes.includes(episode)
          ? prevEpisodes.filter((e) => e !== episode)
          : [...prevEpisodes, episode]
      );
    }
  };

  const handleRemoveFromFavorites = (episode) => {
    setFavoriteEpisodes((prevEpisodes) =>
      prevEpisodes.filter((e) => e !== episode)
    );
  };

  const Template = () => (
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
                <p>Updated Date: {new Date(episode.updatedDate).toLocaleDateString()}</p>
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

  return (
    <>
      {loading && <Loader />}
      {error && <Error />}
      {podcastData && <Template />}
      {favoriteEpisodes.length > 0 && (
        <FavoriteEpisodes
          favoriteEpisodes={favoriteEpisodes}
          podcastData={podcastData}
          onRemoveFavorite={handleRemoveFromFavorites}
        />
      )}
    </>
  );
};

export default Episodes;
