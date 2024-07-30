import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import PodcastContainer from './PodcastContainer.jsx'; // Ensure the extension matches the file
import LoginPage from './Login.jsx'; // Ensure the extension matches the file

const App = () => {
  const isLoggedIn = true; // Set this based on your authentication state

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/podcasts"
          element={isLoggedIn ? <PodcastContainer /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
};

export default App;

