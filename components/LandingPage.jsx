import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <header>
        <h1>My Project</h1>
        <nav>
          <Button onClick={() => navigate('/register')}>Register</Button>
          <Button onClick={() => navigate('/')}>Login</Button>
        </nav>
      </header>

      <main>
        <h2>Welcome to our Platform</h2>
        <p>Use our services and manage your requests easily.</p>
      </main>
    </div>
  );
}

export default LandingPage;
