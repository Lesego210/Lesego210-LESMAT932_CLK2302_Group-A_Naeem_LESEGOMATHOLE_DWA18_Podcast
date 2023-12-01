import { createClient } from '@supabase/supabase-js'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
  import { useNavigate } from 'react-router-dom'


const  supabaseUrl = 'https://mkayoundsyjpvbejcvnh.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1rYXlvdW5kc3lqcHZiZWpjdm5oIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk1MzkwNTgsImV4cCI6MjAxNTExNTA1OH0.RVVkcFxkfycYdSwoAfkONPmaDfgzAd-9DVZUHWn13ps'; // Replace with your actual Supabase API key

const supabase = createClient(
    supabaseUrl,
    supabaseKey
);

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Perform login logic
    navigate('/podcasts'); // Use navigate to redirect after login
  };
  return (
    <div>
      <h2>Login Page</h2>
      <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        onSuccess={handleLogin} // Call handleSuccess on successful login
      />
    </div>
  );
};

export default LoginPage