// FavoriteEpisodes.jsx


const FavoriteEpisodes = ({ favoriteSeasons, podcastData }) => {
  return (
    <div>
      <h2>Favorite Episodes</h2>
      {favoriteSeasons.map((selectedSeason) => {
        const season = podcastData.seasons.find((s) => s.season === selectedSeason);
        if (season) {
          return (
            <div key={season.season}>
              <h3>{season.title}</h3>
              {season.episodes.map((episode) => (
                <div key={episode.episode} className="episode">
                  <h4>{episode.title}</h4>
                  <p>{episode.description}</p>
                  <p>Episode: {episode.episode}</p>
                  <audio controls>
                    <source src={episode.file} type="audio/mp3" />
                    Your browser does not support the audio tag.
                  </audio>
                </div>
              ))}
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};

export default FavoriteEpisodes;
