import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';
import { FaLinkedin as Linkedin, FaTwitter as Twitter, FaFacebook as Facebook, FaInstagram as Instagram } from 'react-icons/fa';

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const goTo = (path, hash) => (e) => {
    e.preventDefault();
    const targetPath = path || '/';
    const targetHash = hash ? `#${hash}` : '';
    
    if (location.pathname === targetPath && hash) {
      const el = document.getElementById(hash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
    }
    navigate(`${targetPath}${targetHash}`);
  };

  const currentYear = new Date().getFullYear();

  const [footerData, setFooterData] = useState({});

  useEffect(() => {
    const fetchFooter = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/website/footer/`);
        if (response.ok) {
          const data = await response.json();
          setFooterData(data);
        }
      } catch (error) {
        console.error('Error fetching footer data:', error);
      }
    };
    fetchFooter();
  }, []);

  return (
    <footer className="bg-black text-white py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black z-0" />
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 lg:pr-28">
        {/* Top Section - Logo and Social Media */}
        <div className="flex flex-col md:flex-row items-center md:items-center justify-between gap-6 text-center md:text-left mb-16 pb-8 border-b border-gray-800">
          {/* Logo & Contact Info */}
          <div className="flex flex-col items-center md:items-start gap-4 md:mb-0">
            <div className="relative overflow-hidden h-[88px] sm:h-[96px] lg:h-[112px] w-[250px] sm:w-[280px] lg:w-[400px]">
              <img src="logo.png" alt="BLACK CUBE SOLUTIONS LLC" className="h-20 sm:h-20 lg:h-32 w-auto object-contain mix-blend-screen grayscale invert contrast-200 scale-160 origin-left" />
            </div>
            {/* <div className="text-2xl md:text-3xl font-bold">
              {footerData.company_name || 'BLACK CUBE SOLUTIONS LLC'}
            </div> */}
            
            {(footerData.email || footerData.phone || footerData.address) && (
              <div className="flex flex-col items-center md:items-start gap-2 mt-1 text-gray-400 text-sm">
                {footerData.email && (
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" /> 
                    <a href={`mailto:${footerData.email}`} className="hover:text-white transition-colors">{footerData.email}</a>
                  </div>
                )}
                {footerData.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4" /> 
                    <a href={`tel:${footerData.phone}`} className="hover:text-white transition-colors">{footerData.phone}</a>
                  </div>
                )}
                {footerData.address && (
                  <div className="flex items-start gap-2 max-w-xs text-center md:text-left mt-1">
                    <MapPin className="w-4 h-4 mt-1 shrink-0" /> 
                    <span>{footerData.address}</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Social Media */}
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-3">
            <span className="text-white text-xs sm:text-sm md:text-base whitespace-nowrap">
              Follow Us On Social Media
            </span>
            <div className="flex gap-2 sm:gap-3">
              {(!footerData.social_links || Object.keys(footerData.social_links).length === 0) ? (
                // Fallback links
                <>
                  <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors">
                    <Linkedin className="w-5 h-5 text-white" />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors">
                    <Instagram className="w-5 h-5 text-white" />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors">
                    <Twitter className="w-5 h-5 text-white" />
                  </a>
                </>
              ) : (
                <>
                  {footerData.social_links.linkedin && (
                    <a href={footerData.social_links.linkedin} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors">
                      <Linkedin className="w-5 h-5 text-white" />
                    </a>
                  )}
                  {footerData.social_links.instagram && (
                    <a href={footerData.social_links.instagram} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors">
                      <Instagram className="w-5 h-5 text-white" />
                    </a>
                  )}
                  {footerData.social_links.twitter && (
                    <a href={footerData.social_links.twitter} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors">
                      <Twitter className="w-5 h-5 text-white" />
                    </a>
                  )}
                  {footerData.social_links.facebook && (
                    <a href={footerData.social_links.facebook} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors">
                      <Facebook className="w-5 h-5 text-white" />
                    </a>
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        {/* Middle Section - Navigation Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-12 mb-12">
          {/* Home Column */}
          <div>
            <h3 className="font-bold text-white mb-4">Home</h3>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li>
                <a href="/#reasons" onClick={goTo('/', 'reasons')} className="hover:text-white transition-colors">
                  Benefits
                </a>
              </li>
              <li>
                <a href="/#testimonials" onClick={goTo('/', 'testimonials')} className="hover:text-white transition-colors">
                  Our Testimonials
                </a>
              </li>
              <li>
                <a href="/#partners" onClick={goTo('/', 'partners')} className="hover:text-white transition-colors">
                  Partners
                </a>
              </li>
            </ul>
          </div>

          {/* Services Column */}
          <div>
            <h3 className="font-bold text-white mb-4">Services</h3>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li>
                <a href="/services" onClick={goTo('/services')} className="hover:text-white transition-colors">
                  Web Design
                </a>
              </li>
              <li>
                <a href="/services" onClick={goTo('/services')} className="hover:text-white transition-colors">
                  Website Development
                </a>
              </li>
              <li>
                <a href="/services" onClick={goTo('/services')} className="hover:text-white transition-colors">
                  App Development
                </a>
              </li>
              <li>
                <a href="/services" onClick={goTo('/services')} className="hover:text-white transition-colors">
                  Digital Marketing
                </a>
              </li>
            </ul>
          </div>

          {/* Portfolio Column */}
          <div>
            <h3 className="font-bold text-white mb-4">Portfolio</h3>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li>
                <a href="/portfolio#projects" onClick={goTo('/portfolio', 'projects')} className="hover:text-white transition-colors">
                  All Projects
                </a>
              </li>
              <li>
                <a href="/portfolio#featured" onClick={goTo('/portfolio', 'featured')} className="hover:text-white transition-colors">
                  Featured Projects
                </a>
              </li>
              <li>
                <a href="/portfolio#search" onClick={goTo('/portfolio', 'search')} className="hover:text-white transition-colors">
                  Search & Filter
                </a>
              </li>
              <li>
                <a href="/portfolio#features" onClick={goTo('/portfolio', 'features')} className="hover:text-white transition-colors">
                  Key Features
                </a>
              </li>
              <li>
                <a href="/portfolio#technologies" onClick={goTo('/portfolio', 'technologies')} className="hover:text-white transition-colors">
                  Technologies
                </a>
              </li>
            </ul>
          </div>

          {/* About Us Column */}
          <div>
            <h3 className="font-bold text-white mb-4">About Us</h3>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li>
                <a href="/about#team" onClick={goTo('/about', 'team')} className="hover:text-white transition-colors">
                  Our Team
                </a>
              </li>
              <li>
                <a href="/about" onClick={goTo('/about')} className="hover:text-white transition-colors">
                  Achievements
                </a>
              </li>
              <li>
                <a href="/about" onClick={goTo('/about')} className="hover:text-white transition-colors">
                  Awards
                </a>
              </li>
            </ul>
          </div>

          {/* Careers Column */}
          <div>
            <h3 className="font-bold text-white mb-4">Careers</h3>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li>
                <a href="/career#openings" onClick={goTo('/career', 'openings')} className="hover:text-white transition-colors">
                  Job Openings
                </a>
              </li>
              <li>
                <a href="/career" onClick={goTo('/career')} className="hover:text-white transition-colors">
                  Benefits & Perks
                </a>
              </li>
              <li>
                <a href="/career" onClick={goTo('/career')} className="hover:text-white transition-colors">
                  Employee Referral
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-2 md:gap-4 text-xs sm:text-sm text-gray-400">
          {/* Copyright (Left) */}
          <p>{footerData.copyright_text || `@${currentYear} BLACK CUBE SOLUTIONS LLC. All Rights Reserved`}</p>

          {/* Legal & Custom Links (Right) */}
          <div className="flex flex-wrap justify-center md:justify-end gap-3 md:gap-6">
            <a href="/privacy" onClick={goTo('/privacy')} className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="/terms" onClick={goTo('/terms')} className="hover:text-white transition-colors">
              Terms & Conditions
            </a>
            {/* <a href="/cookies" onClick={goTo('/cookies')} className="hover:text-white transition-colors">
              Cookie Policy
            </a> */}
            
            {/* Custom Links */}
            {footerData.custom_links && footerData.custom_links.map((link, idx) => (
              <a 
                key={idx} 
                href={link.url} 
                className="hover:text-white transition-colors"
                target={link.url.startsWith('http') ? '_blank' : '_self'}
                rel={link.url.startsWith('http') ? 'noreferrer' : ''}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

