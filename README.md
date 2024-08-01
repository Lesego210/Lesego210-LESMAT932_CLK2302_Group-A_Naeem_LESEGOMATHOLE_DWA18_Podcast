This is a Podcast App

### Summary

This is a React-based podcast app that lets you browse podcasts, view episodes, and manage your favorite episodes. The app features a podcast carousel, detailed podcast views, and a list view with search and filter functions.

### Features

- **Podcast Carousel:** Displays podcast cards in a responsive carousel.
- **Podcast Details:** Shows detailed information about each podcast, including seasons and episodes.
- **Episode Management:** Allows users to play episodes, add/remove episodes to/from favorites, and track playback position.
- **Favorite Episodes:** Provides a section to view and manage favorite episodes.
- **Search and Filter:** Includes search by title and filter by genre.

### Components

1. **PodcastContainer**
   - **Purpose:** The main container for fetching and loading podcast data.
   - **Dependencies:** `Loader`, `Error`, `PodcastList`
   - **Functions:** Fetches data from `https://podcast-api.netlify.app/shows`, manages loading and error states, and passes data to `PodcastList`.

2. **PodcastList**
   - **Purpose:** Displays a list of podcasts with sorting and filtering options.
   - **Dependencies:** `PodcastCarousel`
   - **Functions:** Filters podcasts based on search terms and genre, sorts podcasts by title, and renders the `PodcastCarousel`.

3. **PodcastCarousel**
   - **Purpose:** Renders a carousel of podcast cards.
   - **Dependencies:** `PodcastCard`
   - **Functions:** Configures slider settings and displays a carousel of `PodcastCard` components.

4. **PodcastCard**
   - **Purpose:** Displays detailed information about a single podcast, including description, genres, and seasons.
   - **Dependencies:** `Episodes`, `FavoriteEpisodes`
   - **Functions:** Manages season selection, handles favorite episodes, and displays `Episodes` and `FavoriteEpisodes` components.

5. **Episodes**
   - **Purpose:** Displays episodes for a selected season of a podcast.
   - **Dependencies:** `FavoriteEpisodes`, `Error`
   - **Functions:** Fetches episode data, manages audio playback, and allows users to add/remove episodes from favorites.

6. **FavoriteEpisodes**
   - **Purpose:** Displays a list of favorite episodes.
   - **Functions:** Manages and renders a list of favorite episodes with options to remove from favorites.

7. **Loader**
   - **Purpose:** A loading spinner displayed while data is being fetched.

8. **Error**
   - **Purpose:** Displays an error message when data fetching fails.

### Usage

- **Podcast Carousel:** Navigate through podcasts using the carousel. Click on a podcast to view its details.
- **Podcast Details:** Select a season to view episodes. Play episodes and manage favorites.
- **Search and Filter:** Use the search bar and genre filter to find specific podcasts.

