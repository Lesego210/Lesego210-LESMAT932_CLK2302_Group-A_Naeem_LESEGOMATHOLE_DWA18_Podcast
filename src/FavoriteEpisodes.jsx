import React, { useState } from 'react';

const FavoriteEpisodes = ({ favoriteEpisodes, podcastData, onRemoveFavorite }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' or 'desc'

  // Filter and sort episodes based on the search query and sort order
  const filteredAndSortedEpisodes = favoriteEpisodes.flatMap((episode) => {
    const season = podcastData.seasons.find((s) =>
      s.episodes.some((e) => e === episode)
    );
    if (season) {
      const ep = season.episodes.find((e) => e === episode);
      return ep
        ? [ep]
        : [];
    }
    return [];
  }).filter((episode) =>
    episode.title.toLowerCase().includes(searchQuery.toLowerCase())
  ).sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.title.localeCompare(b.title);
    } else {
      return b.title.localeCompare(a.title);
    }
  });

  return (
    <div>
      <h2>Favorite Episodes</h2>
      <input
        type="text"
        placeholder="Search episodes..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div>
        <button onClick={() => setSortOrder('asc')}>Sort A-Z</button>
        <button onClick={() => setSortOrder('desc')}>Sort Z-A</button>
      </div>
      {filteredAndSortedEpisodes.length > 0 ? (
        filteredAndSortedEpisodes.map((episode) => (
          <div key={episode.episode} className="episode">
            <h4>{episode.title}</h4>
            <p>{episode.description}</p>
            <p>Episode: {episode.episode}</p>
            <p>Updated Date: {new Date(episode.updatedDate).toLocaleDateString()}</p>
            <audio controls>
              <source src={episode.file} type="audio/mp3" />
              Your browser does not support the audio tag.
            </audio>
            <button onClick={() => onRemoveFavorite(episode)}>Remove from favorites</button>
          </div>
        ))
      ) : (
        <p>No favorite episodes found.</p>
      )}
    </div>
  );
};

export default FavoriteEpisodes;
