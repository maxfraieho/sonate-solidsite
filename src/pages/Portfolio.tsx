import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Portfolio redirect page
 * Redirects to the homepage portfolio section to maintain SEO
 * and provide a unified portfolio experience
 */
const Portfolio = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect to homepage with portfolio hash
    navigate('/#portfolio', { replace: true });
  }, [navigate]);

  // Return null while redirecting
  return null;
};

export default Portfolio;
