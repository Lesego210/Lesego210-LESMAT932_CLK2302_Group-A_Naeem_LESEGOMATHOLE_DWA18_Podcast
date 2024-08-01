import { createClient } from '@supabase/supabase-js'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useNavigate } from 'react-router-dom';
import { useCallback, useEffect } from 'react';


const  supabaseUrl = 'https://mkayoundsyjpvbejcvnh.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1rYXlvdW5kc3lqcHZiZWpjdm5oIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk1MzkwNTgsImV4cCI6MjAxNTExNTA1OH0.RVVkcFxkfycYdSwoAfkONPmaDfgzAd-9DVZUHWn13ps'; // Replace with your actual Supabase API key

const supabase = createClient(
    supabaseUrl,
    supabaseKey
);

const LoginPage = () => {
  const navigate = useNavigate();

  const handleAuthStateChange = useCallback(
    async (event) => {
      if (event == 'SIGNED_OUT') {
        navigate('/');
      } else if (event == 'SIGNED_IN') {
        navigate('/podcasts');
      }
    },
    [navigate]
  );

  useEffect(() => {
    // Set up the onAuthStateChange listener with the callback function
    supabase.auth.onAuthStateChange(handleAuthStateChange);

  

    // Cleanup when the component unmounts
    return () => {
      // Perform any necessary cleanup here
    };
  }, [handleAuthStateChange]);

  return (
    <div>


      <h2 className='topHeader'>
        Podcast
      </h2>
      <Auth
    supabaseClient={supabase}
    
    appearance={{ theme: ThemeSupa }}
  />
    </div>
  );
};

export default LoginPage;
