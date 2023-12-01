/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Loader from './Loader.jsx';
import Error from './Error.jsx';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import { Button, Container, TextField } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Episodes from './Episodes.jsx';

// import { Link } from 'react-router-dom'

const truncateDescription = (text, limit) => {
  const words = text.split(' ');
  if (words.length > limit) {
    return words.slice(0, limit).join(' ') + '...';
  }
  return text;
};

// eslint-disable-next-line no-unused-vars

const PodcastCard = ({ podcast, allIds }) => {
  const [selectedSeason, setSelectedSeason] = useState('');
  const [favoriteSeasons, setFavoriteSeasons] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loadingGenres, setLoadingGenres] = useState(true);
  const [errorGenres, setErrorGenres] = useState(null);
  const [showAllDescription, setShowAllDescription] = useState(false);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch(`https://podcast-api.netlify.app/genre/${podcast.genres[0]}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setGenres(data);
        setLoadingGenres(false);
      } catch (error) {
        setErrorGenres(error);
        setLoadingGenres(false);
      }
    };

    fetchGenres();
  }, [podcast.genres]);

  const handleSeasonChange = async (event) => {
    const selectedSeasonValue = event.target.value;
    setSelectedSeason(selectedSeasonValue);

    const podcastId = podcast.id;
    const apiUrl = `https://podcast-api.netlify.app/id/${podcastId}`;

    try {
      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const podcastData = await response.json();
      console.log('Podcast Data:', podcastData);
    } catch (error) {
      console.error('Error fetching podcast data:', error);
    }
  };

  const handleAddToFavorites = () => {
    if (selectedSeason) {
      if (favoriteSeasons.includes(selectedSeason)) {
        // Remove season from favorites if already present
        setFavoriteSeasons((prevSeasons) =>
          prevSeasons.filter((season) => season !== selectedSeason)
        );
      } else {
        // Add season to favorites
        setFavoriteSeasons((prevSeasons) => [...prevSeasons, selectedSeason]);
      }
    }
    console.log(favoriteSeasons);
  };

  const handleSeeMoreClick = () => {
    setShowAllDescription(true);
  };

  const handleSeeLessClick = () => {
    setShowAllDescription(false);
  };

  const truncatedDescription = truncateDescription(podcast.description, 30);
  const fullDescription = podcast.description;

  const isFavorite = favoriteSeasons.includes(selectedSeason);

  return (
    <Card style={{ padding: '10px', margin: '30px' }}>
      <Container>
        {loadingGenres && <Loader />}
        {errorGenres && <Error />}
        {!loadingGenres && !errorGenres && (
          <>
            <CardMedia
              component="img"
              alt={podcast.title}
              height="140"
              image={podcast.image}
              style={{
                width: 210,
                height: 118,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            />
            <CardContent>
              <Typography variant="h5" component="div">
                {podcast.title}
              </Typography>
              <Typography variant="h6" component="div">
                Description: {showAllDescription ? fullDescription : truncatedDescription}
                {!showAllDescription && (
                  <Button onClick={handleSeeMoreClick} color="primary">
                    See More
                  </Button>
                )}
                {showAllDescription && (
                  <Button onClick={handleSeeLessClick} color="primary">
                    See Less
                  </Button>
                )}
              </Typography>
              <FormControl>
                <Select
                  value={selectedSeason || ''}
                  onChange={handleSeasonChange}
                  displayEmpty
                  inputProps={{ 'aria-label': 'Select Season' }}
                >
                  <MenuItem value="" disabled>
                    Select Season
                  </MenuItem>
                  {Array.from({ length: podcast.seasons }).map((_, index) => (
                    <MenuItem key={index + 1} value={index + 1}>
                      Season {index + 1}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {selectedSeason && (
                <div className="season-details">
                  <Typography variant="h6" component="div">
                    Number of Seasons: {podcast.seasons}
                  </Typography>
                  <Typography variant="body2" component="div">
                    Updated: {new Date(podcast.updated).toLocaleDateString()}
                  </Typography>
                  <Button onClick={handleAddToFavorites}>
                    {isFavorite ? 'Add to favorites' : 'Remove from favorites'}
                  </Button>
                </div>
              )}
            </CardContent>
          </>
        )}
      </Container>
    
  
      {selectedSeason && <Episodes podcastId={podcast.id} selectedSeason={selectedSeason} />}
    </Card>
  );
};

PodcastCard.propTypes = {
  podcast: PropTypes.shape({
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    seasons: PropTypes.number.isRequired,
    genres: PropTypes.arrayOf(PropTypes.number).isRequired,
    updated: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  allIds: PropTypes.arrayOf(PropTypes.string).isRequired,
};
const genreMapping = {
    1: 'Personal Growth',
    2: 'Investigative Journalism',
    3: 'History',
    4: 'Comedy',
    5: 'Entertainment',
    6: 'Business',
    7: 'Fiction',
    8: 'News',
    9: 'Kids and Family',
  };
  
  const PodcastList = ({ podcastData }) => {
    const [sortBy, setSortBy] = useState('asc');
    const [searchTermTitle, setSearchTermTitle] = useState('');
    const [searchTermGenre, setSearchTermGenre] = useState('');
  
    const handleSortChange = () => {
      setSortBy((prevSortBy) => (prevSortBy === 'asc' ? 'desc' : 'asc'));
    };
  
    const handleTitleSearchChange = (event) => {
      setSearchTermTitle(event.target.value);
    };
  
    const handleGenreSearchChange = (event) => {
      setSearchTermGenre(event.target.value);
    };
  
    const sortedAndFilteredPodcasts = [...podcastData]
      .filter((podcast) =>
        podcast.title.toLowerCase().includes(searchTermTitle.toLowerCase()) &&
        (searchTermGenre === '' || podcast.genres.includes(Number(searchTermGenre)))
      )
      .sort((a, b) => {
        const titleA = a.title.toUpperCase();
        const titleB = b.title.toUpperCase();
  
        if (sortBy === 'asc') {
          return titleA.localeCompare(titleB);
        } else {
          return titleB.localeCompare(titleA);
        }
      });
  
    return (
      <div>
    
    <div className="header-content" style={{ position: 'sticky', top: 0, zIndex: 100 }}>
          <TextField
            label="Search by Title"
            value={searchTermTitle}
            onChange={handleTitleSearchChange}
            style={{padding:'5px'}}
          /><br></br>
          <FormControl>
            <Typography>Search by Genre</Typography>
          
            <Select
              labelId="genre-label"
              id="genre-select"
              value={searchTermGenre}
              onChange={handleGenreSearchChange}
            >
              <MenuItem value="">All Genres</MenuItem>
              {Object.entries(genreMapping).map(([id, title]) => (
                <MenuItem key={id} value={id}>
                  {title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button onClick={handleSortChange} color="primary">
            Sort {sortBy === 'asc' ? 'Z-A' : 'A-Z'}
          </Button>
        </div>

        {sortedAndFilteredPodcasts.map((podcast) => (
          <PodcastCard key={podcast.id} podcast={podcast} allIds={podcastData.map((p) => p.id)} />
        ))}
      </div>
    );
  };


PodcastList.propTypes = {
  podcastData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      seasons: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      genres: PropTypes.arrayOf(PropTypes.number).isRequired,
      updated: PropTypes.string.isRequired,
    })
  ).isRequired,
};

const PodcastContainer = () => {
  const apiUrl = 'https://podcast-api.netlify.app/shows';
  const [podcastData, setPodcastData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
  }, []);

  return (
    <>
      {loading && <Loader />}
      {error && <Error />}
      {podcastData && <PodcastList podcastData={podcastData} />}
      
    </>
  );
};

export default PodcastContainer;


