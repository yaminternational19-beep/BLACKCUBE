import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Layout from '../../components/layout/Layout';

const LegalPage = () => {
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const fetchLegalData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/website/footer/`);
        if (response.ok) {
          const data = await response.json();
          
          if (location.pathname === '/privacy') {
            setTitle('Privacy Policy');
            setContent(data.privacy_policy_text || 'Privacy policy content not available.');
          } else if (location.pathname === '/terms') {
            setTitle('Terms & Conditions');
            setContent(data.terms_conditions_text || 'Terms & conditions content not available.');
          } else if (location.pathname === '/cookies') {
            setTitle('Cookie Policy');
            setContent(data.cookie_policy_text || 'Cookie policy content not available.');
          }
        }
      } catch (error) {
        console.error('Error fetching legal data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchLegalData();
  }, [location.pathname]);

  return (
    <Layout>
      <div className="pt-32 pb-20 bg-black min-h-screen text-white relative">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black z-0" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-12 text-primary-blue">{title}</h1>
          
          {loading ? (
            <div className="animate-pulse space-y-4">
              <div className="h-4 bg-gray-800 rounded w-3/4"></div>
              <div className="h-4 bg-gray-800 rounded w-full"></div>
              <div className="h-4 bg-gray-800 rounded w-5/6"></div>
              <div className="h-4 bg-gray-800 rounded w-full"></div>
            </div>
          ) : (
            <div className="prose prose-invert prose-lg max-w-none">
              {content.split('\n').map((paragraph, idx) => (
                <p key={idx} className="mb-4 text-gray-300">
                  {paragraph}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default LegalPage;
