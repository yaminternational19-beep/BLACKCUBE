import React, { useState, useEffect } from 'react';

const DEFAULT_LOGOS = [
  { id: 1, name: 'TechCorp Enterprise', logo_url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&auto=format&fit=crop&q=80' },
  { id: 2, name: 'Apex Global', logo_url: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&auto=format&fit=crop&q=80' },
  { id: 3, name: 'Nova Cloud Services', logo_url: 'https://images.unsplash.com/photo-1516876437184-593fda40c7ce?w=200&auto=format&fit=crop&q=80' },
  { id: 4, name: 'Quantum Digital', logo_url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=200&auto=format&fit=crop&q=80' },
  { id: 5, name: 'Vanguard Systems', logo_url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=200&auto=format&fit=crop&q=80' },
];

export default function ClientLogosMarquee() {
  const [logos, setLogos] = useState(DEFAULT_LOGOS);

  useEffect(() => {
    const fetchLogos = async () => {
      try {
        const baseUrl = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';
        const res = await fetch(`${baseUrl}/contact-submissions/client-logos/`);
        const json = await res.json();
        if (json?.data && json.data.length > 0) {
          setLogos(json.data);
        }
      } catch (err) {
        // Fallback to default enterprise logos
      }
    };
    fetchLogos();
  }, []);

  const logoItems = [...logos, ...logos];

  return (
    <section className="client-logos-section relative overflow-hidden border-y border-slate-800/80 bg-gradient-to-b from-slate-950/90 via-slate-900/40 to-slate-950/90">
      {/* Header Badge */}
      <div className="max-w-7xl mx-auto px-4 mb-4 sm:mb-6 text-center">
        <div className="inline-flex items-center space-x-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-cyan-950/40 border border-cyan-500/30 backdrop-blur-md shadow-sm shadow-cyan-500/10">
          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-cyan-400 animate-pulse shrink-0"></span>
          <span className="text-[10px] sm:text-xs md:text-sm uppercase tracking-widest text-cyan-300 font-semibold">
            Trusted by Industry Leaders & Innovators Worldwide
          </span>
        </div>
      </div>

      {/* Fade Gradients on edges */}
      <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 md:w-40 bg-gradient-to-r from-slate-950 via-slate-950/90 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 md:w-40 bg-gradient-to-l from-slate-950 via-slate-950/90 to-transparent z-10 pointer-events-none" />

      {/* Infinite Scrolling Track (Right-to-Left) */}
      <div className="marquee-container flex overflow-hidden select-none py-1">
        <div className="marquee-content flex shrink-0 items-center space-x-3 sm:space-x-5 md:space-x-8 pr-3 sm:pr-5 md:pr-8 animate-marquee-rtl">
          {logoItems.map((logo, idx) => (
            <div
              key={`a-${logo.id}-${idx}`}
              className="flex items-center space-x-2.5 sm:space-x-3 bg-slate-900/60 border border-slate-800/80 px-3.5 py-2 sm:px-5 sm:py-2.5 rounded-xl sm:rounded-2xl hover:border-cyan-500/50 hover:bg-slate-800/70 hover:shadow-lg hover:shadow-cyan-500/15 transition-all duration-300 cursor-pointer group shrink-0"
            >
              {logo.logo_url && (
                <img
                  src={logo.logo_url}
                  alt={logo.name}
                  className="w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8 object-contain rounded-lg opacity-75 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"
                />
              )}
              <span className="text-xs sm:text-sm md:text-base font-semibold text-slate-300 group-hover:text-white transition-colors whitespace-nowrap">
                {logo.name}
              </span>
            </div>
          ))}
        </div>

        <div className="marquee-content flex shrink-0 items-center space-x-3 sm:space-x-5 md:space-x-8 pr-3 sm:pr-5 md:pr-8 animate-marquee-rtl" aria-hidden="true">
          {logoItems.map((logo, idx) => (
            <div
              key={`b-${logo.id}-${idx}`}
              className="flex items-center space-x-2.5 sm:space-x-3 bg-slate-900/60 border border-slate-800/80 px-3.5 py-2 sm:px-5 sm:py-2.5 rounded-xl sm:rounded-2xl hover:border-cyan-500/50 hover:bg-slate-800/70 hover:shadow-lg hover:shadow-cyan-500/15 transition-all duration-300 cursor-pointer group shrink-0"
            >
              {logo.logo_url && (
                <img
                  src={logo.logo_url}
                  alt={logo.name}
                  className="w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8 object-contain rounded-lg opacity-75 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"
                />
              )}
              <span className="text-xs sm:text-sm md:text-base font-semibold text-slate-300 group-hover:text-white transition-colors whitespace-nowrap">
                {logo.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

