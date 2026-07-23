import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const PURPOSE_OPTIONS = [
  { id: 'PROJECT_COLLABORATION', label: '🚀 Project Collaboration', desc: 'Looking to hire us for a project' },
  { id: 'COLLABORATION_ENERGY', label: '⚡ Collaboration / Energy', desc: 'Exploring strategic partnerships' },
  { id: 'JOB_REQUIREMENT', label: '💼 Job Requirement', desc: 'Interested in career opportunities' },
  { id: 'JUST_BROWSING', label: '👀 Just Browsing / Exploring', desc: 'Checking out BlackCube products & work' },
];

export default function CookieConsentModal() {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [email, setEmail] = useState('');
  const [purpose, setPurpose] = useState('JUST_BROWSING');
  const [analytics, setAnalytics] = useState(true);
  const [marketing, setMarketing] = useState(true);
  const [loading, setLoading] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  useEffect(() => {
    const savedConsent = localStorage.getItem('blackcube_cookie_consent');
    if (!savedConsent) {
      const timer = setTimeout(() => setVisible(true), 600);
      return () => clearTimeout(timer);
    }
  }, []);

  const saveConsentAndSubmit = async (acceptedAll, analyticsState, marketingState) => {
    setLoading(true);
    const payload = {
      accepted_all: acceptedAll,
      analytics_accepted: analyticsState,
      marketing_accepted: marketingState,
      email: email.trim() ? email.trim() : null,
      purpose_of_visit: purpose,
    };

    try {
      const baseUrl = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';
      await fetch(`${baseUrl}/website/contact/cookie-consent/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    } catch (err) {
      console.warn('Cookie consent log failed:', err);
    } finally {
      localStorage.setItem('blackcube_cookie_consent', JSON.stringify({
        acceptedAll,
        analytics: analyticsState,
        marketing: marketingState,
        email: email.trim() || null,
        purpose,
        timestamp: new Date().toISOString(),
      }));

      if (email.trim()) {
        setSubmittedSuccess(true);
        setTimeout(() => {
          setVisible(false);
          setShowPreferences(false);
        }, 1600);
      } else {
        setVisible(false);
        setShowPreferences(false);
      }
      setLoading(false);
    }
  };

  if (!visible) return null;

  return (
    <>
      {/* Infosys Style Bottom Cookie Bar (Unobstructive) */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white text-slate-900 border-t border-slate-200 shadow-[0_-6px_25px_rgba(0,0,0,0.15)] py-4 px-6 md:px-12 transition-transform duration-300">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Cookie Notice Description */}
          <div className="text-xs md:text-sm text-slate-700 leading-relaxed text-center md:text-left">
            We use cookies to personalise content and ads, to provide social media features and to analyse our traffic. We also disclose information about your use of our site with our social media, advertising and analytics partners. Additional details are available in our{' '}
            <button
              type="button"
              onClick={() => navigate('/cookies')}
              className="font-semibold text-slate-900 underline hover:text-cyan-700 transition-colors"
            >
              Cookie Policy
            </button>.
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-center gap-4 shrink-0 w-full md:w-auto">
            <button
              type="button"
              onClick={() => setShowPreferences(true)}
              className="text-xs md:text-sm font-semibold text-slate-900 underline hover:text-cyan-700 transition-colors py-2 px-1"
            >
              Choose Cookies
            </button>

            <button
              type="button"
              disabled={loading}
              onClick={() => saveConsentAndSubmit(true, true, true)}
              className="bg-[#041e42] hover:bg-[#0a2e5c] text-white font-semibold text-xs md:text-sm px-6 py-2.5 rounded shadow transition-all active:scale-95 disabled:opacity-50 whitespace-nowrap"
            >
              {loading ? 'Saving...' : 'Accept All Cookies'}
            </button>
          </div>

        </div>
      </div>

      {/* Detailed Cookie Preferences Modal (Triggered by 'Choose Cookies') */}
      {showPreferences && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white text-slate-900 rounded-2xl p-6 max-w-xl w-full shadow-2xl border border-slate-200 relative overflow-hidden max-h-[90vh] overflow-y-auto">
            
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setShowPreferences(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 text-xl font-bold p-1 transition-colors"
            >
              ✕
            </button>

            {submittedSuccess ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-xl font-bold">
                  ✓
                </div>
                <h3 className="text-xl font-bold text-slate-900">Preferences Saved!</h3>
                <p className="text-slate-600 text-sm">
                  Your cookie preferences have been recorded.
                </p>
              </div>
            ) : (
              <div className="space-y-5">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                  <span className="text-2xl">🍪</span>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Cookie & Visitor Preferences</h3>
                    <p className="text-xs text-slate-500">Manage your cookie settings and customize your experience on BlackCube.</p>
                  </div>
                </div>

                {/* Purpose Selection */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                    What is the primary purpose of your visit?
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {PURPOSE_OPTIONS.map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setPurpose(opt.id)}
                        className={`text-left p-2.5 rounded-xl border text-xs transition-all ${
                          purpose === opt.id
                            ? 'bg-cyan-50 border-cyan-500 text-cyan-950 font-semibold shadow-sm'
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        <div className="font-semibold">{opt.label}</div>
                        <div className="text-[11px] text-slate-500">{opt.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Email Optional */}
                <div>
                  <label htmlFor="cookie-pref-email" className="block text-xs font-medium text-slate-700 mb-1">
                    Email Address (Optional - receive updates & quick welcome)
                  </label>
                  <input
                    id="cookie-pref-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>

                {/* Category Toggles */}
                <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-semibold text-slate-900">Essential Cookies</div>
                      <div className="text-xs text-slate-500">Required for website security & core functions.</div>
                    </div>
                    <span className="text-xs font-semibold text-cyan-700 bg-cyan-100 px-2 py-1 rounded">Always Active</span>
                  </div>

                  <hr className="border-slate-200" />

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-semibold text-slate-900">Analytics Cookies</div>
                      <div className="text-xs text-slate-500">Helps us measure traffic and improve page performance.</div>
                    </div>
                    <input
                      type="checkbox"
                      checked={analytics}
                      onChange={(e) => setAnalytics(e.target.checked)}
                      className="w-4 h-4 accent-[#041e42] cursor-pointer"
                    />
                  </div>

                  <hr className="border-slate-200" />

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-semibold text-slate-900">Marketing Cookies</div>
                      <div className="text-xs text-slate-500">Delivers tailored announcements and relevant updates.</div>
                    </div>
                    <input
                      type="checkbox"
                      checked={marketing}
                      onChange={(e) => setMarketing(e.target.checked)}
                      className="w-4 h-4 accent-[#041e42] cursor-pointer"
                    />
                  </div>
                </div>

                {/* Modal Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    disabled={loading}
                    onClick={() => saveConsentAndSubmit(false, false, false)}
                    className="w-full sm:w-auto bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium py-2.5 px-4 rounded-xl text-sm transition-all border border-slate-300"
                  >
                    Necessary Only
                  </button>

                  <button
                    type="button"
                    disabled={loading}
                    onClick={() => saveConsentAndSubmit(analytics && marketing, analytics, marketing)}
                    className="w-full sm:w-auto bg-[#041e42] hover:bg-[#0a2e5c] text-white font-semibold py-2.5 px-5 rounded-xl text-sm transition-all shadow-sm active:scale-95"
                  >
                    {loading ? 'Saving...' : 'Save My Preferences'}
                  </button>
                </div>

              </div>
            )}

          </div>
        </div>
      )}
    </>
  );
}
