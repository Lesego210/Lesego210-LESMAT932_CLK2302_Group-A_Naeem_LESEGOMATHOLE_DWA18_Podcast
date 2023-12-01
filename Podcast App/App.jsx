
import PodcastContainer from './PodcastContainer.jsx'
import LoginPage from './Login.jsx'
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';



const App = () => {
  const isLoggedIn = true; // Set this based on your authentication state


  return (
    <Router>
      <Routes>

        <Route path="/" element={<LoginPage />} />
        <Route
          path="/podcasts"
          element={isLoggedIn ? <PodcastContainer /> : <Navigate to="/podcasts" />}
        />
      </Routes>
    </Router>
  );
};

export default App;
