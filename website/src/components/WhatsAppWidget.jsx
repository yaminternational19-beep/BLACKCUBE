import React, { useState, useEffect } from 'react';

export default function WhatsAppWidget() {
  const [open, setOpen] = useState(false);
  const [whatsappNumber, setWhatsappNumber] = useState(); 

  useEffect(() => {
    const fetchFooter = async () => {
      try {
        const baseUrl = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';
        const res = await fetch(`${baseUrl}/website/footer/`);
        const json = await res.json();
        if (json?.social_links?.whatsapp) {
          const digits = json.social_links.whatsapp.replace(/\D/g, '').slice(-10);
          if (digits) setWhatsappNumber(digits);
        } else if (json?.phone) {
          const digits = json.phone.replace(/\D/g, '').slice(-10);
          if (digits) setWhatsappNumber(digits);
        }
      } catch (err) {
        // Fallback to default number
      }
    };
    fetchFooter();
  }, []);

  const handleWhatsAppClick = () => {
    // Pre-defined text prompt asking for Name & Purpose of texting
    const defaultMsg = 'Hi! My name is [ Name ], Purpose of texting: [ Project Inquiry / Services ]';
    const encodedText = encodeURIComponent(defaultMsg);

    const cleanDigits = whatsappNumber.replace(/\D/g, '');
    const targetNumber = cleanDigits.length === 10 ? `91${cleanDigits}` : cleanDigits;

    window.open(`https://wa.me/${targetNumber}?text=${encodedText}`, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end space-y-3">
      {/* WhatsApp Popover Card */}
      {open && (
        <div className="bg-slate-900/95 border border-emerald-500/30 rounded-2xl p-4 shadow-2xl w-64 text-slate-100 backdrop-blur-xl animate-fade-in space-y-3.5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-xs font-semibold text-white">BlackCube Support</span>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-slate-400 hover:text-white text-xs p-1 transition-colors"
              aria-label="Close menu"
            >
              ✕
            </button>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            Need an instant response or have a project inquiry? Click below to chat with us on WhatsApp.
          </p>

          <button
            onClick={() => {
              setOpen(false);
              handleWhatsAppClick();
            }}
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold py-2.5 px-3 rounded-xl transition-all flex items-center justify-center space-x-2 shadow-lg shadow-emerald-600/25 cursor-pointer active:scale-95"
          >
            <span>💬 Chat on WhatsApp</span>
          </button>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        aria-label="Contact Support on WhatsApp"
        title="WhatsApp Support"
        className="relative group bg-emerald-500 hover:bg-emerald-400 text-slate-950 p-3.5 rounded-full shadow-2xl shadow-emerald-500/30 transition-all active:scale-95 flex items-center justify-center cursor-pointer"
      >
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-400" />
        </span>

        {/* WhatsApp Icon */}
        <svg className="w-6 h-6 fill-current text-slate-950" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l.999 1.6-1.056 3.854 3.799-.993z"/>
        </svg>
      </button>
    </div>
  );
}
