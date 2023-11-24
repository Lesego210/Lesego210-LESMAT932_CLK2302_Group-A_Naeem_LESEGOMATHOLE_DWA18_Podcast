const apiUrl = 'https://podcast-api.netlify.app/id/10716';
let podcastData = null;
let loading = true;
let error = null;
const favorites = new Set(); // Use a Set to efficiently manage favorites
const favoritesData = {}; // Object to store favorites data

async function fetchData() {
  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    podcastData = await response.json();
    loading = false;
  } catch (err) {
    error = err;
    loading = false;
  }
}

function toggleFavorite(episodeId) {
  if (favorites.has(episodeId)) {
    favorites.delete(episodeId);
  } else {
    favorites.add(episodeId);
  }

  // Update favorites data
  updateFavoritesData();
  // Re-render to reflect changes
  renderTemplate();
}

function updateFavoritesData() {
  // Clear existing favorites data
  Object.keys(favoritesData).forEach((season) => {
    favoritesData[season].forEach((episode) => {
      episode.favorite = false;
    });
  });

  // Update favorites data with current favorites
  favorites.forEach((episodeId) => {
    // Add a check to ensure episodeId is a string before attempting to split
    if (typeof episodeId === 'string') {
      const [season, episodeNumber] = episodeId.split('-');
      const episode = favoritesData[season].find((e) => e.episode === episodeNumber);
      if (episode) {
        episode.favorite = true;
      }
    }
  });
}

function handleClickEpisode(episode) {
  console.log('Clicked Episode:', episode);
  if (favorites.has(episode.episode)) {
    console.log('Already in favorites!');
  } else {
    console.log('Added to Favorites!');
  }
  toggleFavorite(episode.episode);
}

function renderTemplate() {
  if (!podcastData || !podcastData.seasons) {
    alert('Invalid podcast data.');
    return;
  }

  podcastData.seasons.forEach((season) => {
    favoritesData[season.season] = season.episodes.map((episode) => ({
      ...episode,
      favorite: false,
    }));

    const seasonDiv = document.createElement('div');
    seasonDiv.classList.add('swiper-slide'); // Add Swiper slide class

    const h2 = document.createElement('h2');
    h2.textContent = season.title;
    seasonDiv.appendChild(h2);

    const img = document.createElement('img');
    img.src = season.image;
    img.alt = season.title;
    seasonDiv.appendChild(img);

    const episodesContainer = document.createElement('div');
    episodesContainer.classList.add('episodes-container');

    if (season.episodes && season.episodes.length > 0) {
      season.episodes.forEach((episode) => {
        const episodeDiv = document.createElement('div');
        episodeDiv.setAttribute('key', episode.episode);
        episodeDiv.classList.add('episode');

        const h3 = document.createElement('h3');
        h3.textContent = episode.title;
        episodeDiv.appendChild(h3);

        const p1 = document.createElement('p');
        p1.textContent = episode.description;
        episodeDiv.appendChild(p1);

        const p2 = document.createElement('p');
        p2.textContent = `Episode: ${episode.episode}`;
        episodeDiv.appendChild(p2);

        const audio = document.createElement('audio');
        audio.setAttribute('controls', true);

        const source = document.createElement('source');
        source.src = episode.file;
        source.type = 'audio/mp3';

        audio.appendChild(source);
        audio.textContent = 'Your browser does not support the audio tag.';
        episodeDiv.appendChild(audio);

        const favoriteButton = document.createElement('button');
        favoriteButton.textContent = episode.favorite ? 'Remove from Favorites' : 'Add to Favorites';
        favoriteButton.addEventListener('click', () => toggleFavorite(episode.episode));
        episodeDiv.appendChild(favoriteButton);

        // Add click event listener to each episode
        episodeDiv.addEventListener('click', () => handleClickEpisode(episode));

        episodesContainer.appendChild(episodeDiv);
      });
    } else {
      alert('No episodes found for the season.');
    }

    seasonDiv.appendChild(episodesContainer);
    document.querySelector('.swiper-wrapper').appendChild(seasonDiv);
  });

  // Initialize Swiper
  new Swiper('.swiper-container', {
    slidesPerView: 1,
    spaceBetween: 10,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });
}

async function init() {
  await fetchData();

  if (loading) {
    alert('Loading...');
  } else if (error) {
    alert('Error fetching data. Please try again later.');
  } else {
    renderTemplate();
  }
}

init();
