import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Career', href: '/career' },
    { name: 'Contact', href: '/contact' },
  ];

  // Function to check if a navigation item is active
  const isActive = (href) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
          isScrolled
            ? 'bg-black/90 backdrop-blur-xl border-b border-gray-800/50'
            : 'bg-black/70 backdrop-blur-xl border-b border-gray-800/50'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex justify-between items-center h-20 lg:h-24">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center space-x-3 group relative z-50 overflow-hidden h-[80px] lg:h-[96px] w-[250px] sm:w-[280px] lg:w-[400px]"
            >
              <img src="logo.png" alt="BLACK CUBE SOLUTIONS LLC" className="h-20 sm:h-20 lg:h-32 w-auto object-contain mix-blend-screen grayscale invert contrast-200 scale-160 origin-left" />
              {/* <div className="text-xl md:text-2xl font-bold tracking-tighter text-white hidden sm:block">
                BLACKCUBE SOLUTIONS LLC
              </div> */}
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center absolute left-1/2 -translate-x-1/2">
              <div className="flex items-center rounded-full bg-white/5 border border-white/10 p-1 space-x-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                      isActive(item.href)
                        ? 'bg-white/10 text-white'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </nav>

            {/* CTA Button - Desktop */}
            <div className="hidden lg:flex items-center">
              <Link
                to="/contact"
                className="px-6 py-2 rounded-full bg-white text-black font-semibold hover:bg-gray-200 transition-colors"
              >
                Get in touch
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden relative z-50 p-2 text-white hover:text-gray-300 transition-colors duration-300 focus:outline-none"
              aria-label="Toggle menu"
            >
              <div className="w-6 h-6 relative">
                <span
                  className={`absolute top-1/2 left-0 w-full h-0.5 bg-current transform transition-all duration-300 ${
                    isMenuOpen ? 'rotate-45 translate-y-0' : '-translate-y-2'
                  }`}
                />
                <span
                  className={`absolute top-1/2 left-0 w-full h-0.5 bg-current transition-all duration-300 ${
                    isMenuOpen ? 'opacity-0' : 'opacity-100'
                  }`}
                />
                <span
                  className={`absolute top-1/2 left-0 w-full h-0.5 bg-current transform transition-all duration-300 ${
                    isMenuOpen ? '-rotate-45 translate-y-0' : 'translate-y-2'
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Overlay */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${
          isMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          onClick={() => setIsMenuOpen(false)}
        />

        {/* Menu Content */}
        <div
          className={`absolute top-16 left-0 right-0 bottom-0 overflow-y-auto transition-all duration-500 ${
            isMenuOpen ? 'translate-y-0' : '-translate-y-full'
          }`}
        >
          <div className="min-h-full bg-black px-4 pt-6 pb-20">
            <div className="max-w-lg mx-auto space-y-2">
              {navigation.map((item, index) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-6 py-4 text-lg font-semibold rounded-xl transition-all duration-300 transform ${
                    isActive(item.href)
                      ? 'rounded-full bg-white/5 border border-white/10 text-white'
                      : 'text-gray-300 hover:text-white hover:bg-[#1A1A1A]'
                  }`}
                  style={{
                    transitionDelay: isMenuOpen ? `${index * 50}ms` : '0ms',
                  }}
                >
                  {item.name}
                </Link>
              ))}

              {/* Mobile CTA */}
              <div className="pt-6">
                <Link
                  to="/contact"
                  className="block w-full px-6 py-4 bg-white text-black text-lg font-bold text-center rounded-xl hover:bg-gray-200 transition-all duration-300"
                >
                  Get in touch
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
