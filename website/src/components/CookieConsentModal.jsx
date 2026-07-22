import React, { useState, useEffect } from 'react';

const PURPOSE_OPTIONS = [
  { id: 'PROJECT_COLLABORATION', label: '🚀 Project Collaboration', desc: 'Looking to hire us for a project' },
  { id: 'COLLABORATION_ENERGY', label: '⚡ Collaboration / Energy', desc: 'Exploring strategic partnerships' },
  { id: 'JOB_REQUIREMENT', label: '💼 Job Requirement', desc: 'Interested in career opportunities' },
  { id: 'JUST_BROWSING', label: '👀 Just Browsing / Exploring', desc: 'Checking out BlackCube products & work' },
];

export default function CookieConsentModal() {
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState('main'); // 'main' | 'custom'
  const [email, setEmail] = useState('');
  const [purpose, setPurpose] = useState('JUST_BROWSING');
  const [analytics, setAnalytics] = useState(true);
  const [marketing, setMarketing] = useState(true);
  const [loading, setLoading] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  useEffect(() => {
    const savedConsent = localStorage.getItem('blackcube_cookie_consent');
    if (!savedConsent) {
      // Delay slightly for smooth entrance animation
      const timer = setTimeout(() => setVisible(true), 800);
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
        }, 1800);
      } else {
        setVisible(false);
      }
      setLoading(false);
    }
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/60 backdrop-blur-md transition-opacity duration-300">
      <div className="w-full max-w-xl bg-slate-900/95 border border-cyan-500/30 rounded-2xl p-6 shadow-2xl text-slate-100 relative overflow-hidden backdrop-blur-xl animate-fade-in">
        
        {/* Glow Effects */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

        {submittedSuccess ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-14 h-14 bg-cyan-500/20 text-cyan-400 rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
              ✓
            </div>
            <h3 className="text-xl font-bold text-white">Thank you for connecting!</h3>
            <p className="text-slate-300 text-sm">
              We have saved your preferences and sent a welcome email to <span className="text-cyan-400 font-semibold">{email}</span>.
            </p>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">🍪</span>
              <div>
                <h3 className="text-xl font-bold text-white tracking-wide">Cookie & Visitor Preferences</h3>
                <p className="text-xs text-slate-400">Customize how we store cookies and tailor your BlackCube experience.</p>
              </div>
            </div>

            {step === 'main' ? (
              <div className="space-y-4">
                {/* Purpose of Visit Selection */}
                <div>
                  <label className="block text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-2">
                    What is the purpose of your visit today?
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {PURPOSE_OPTIONS.map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setPurpose(opt.id)}
                        className={`text-left p-2.5 rounded-xl border text-xs transition-all ${
                          purpose === opt.id
                            ? 'bg-cyan-500/20 border-cyan-400 text-white shadow-lg shadow-cyan-500/10'
                            : 'bg-slate-800/60 border-slate-700/60 text-slate-300 hover:border-slate-500'
                        }`}
                      >
                        <div className="font-semibold">{opt.label}</div>
                        <div className="text-[11px] text-slate-400">{opt.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Email Subscription Input */}
                <div>
                  <label htmlFor="cookie-email" className="block text-xs font-medium text-slate-300 mb-1">
                    Stay connected (Optional email for updates & quick welcome)
                  </label>
                  <input
                    id="cookie-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full bg-slate-800/90 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                </div>

                {/* Action Buttons */}
                <div className="pt-2 flex flex-col sm:flex-row items-center gap-2">
                  <button
                    type="button"
                    disabled={loading}
                    onClick={() => saveConsentAndSubmit(true, true, true)}
                    className="w-full sm:flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold py-2.5 px-4 rounded-xl text-sm transition-all shadow-lg shadow-cyan-500/25 active:scale-95 disabled:opacity-50"
                  >
                    {loading ? 'Saving...' : 'Accept All & Connect'}
                  </button>

                  <button
                    type="button"
                    disabled={loading}
                    onClick={() => saveConsentAndSubmit(false, false, false)}
                    className="w-full sm:w-auto bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium py-2.5 px-4 rounded-xl text-sm transition-all border border-slate-700"
                  >
                    Necessary Only
                  </button>

                  <button
                    type="button"
                    onClick={() => setStep('custom')}
                    className="text-xs text-cyan-400 hover:text-cyan-300 underline py-1 px-2"
                  >
                    Preferences
                  </button>
                </div>
              </div>
            ) : (
              /* Custom Preferences Step */
              <div className="space-y-4">
                <div className="space-y-3 bg-slate-800/40 p-3.5 rounded-xl border border-slate-800">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-semibold text-white">Essential Cookies</div>
                      <div className="text-xs text-slate-400">Required for website security & basic functions.</div>
                    </div>
                    <span className="text-xs font-semibold text-cyan-400 bg-cyan-500/10 px-2 py-1 rounded">Always Active</span>
                  </div>

                  <hr className="border-slate-800" />

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-semibold text-white">Analytics Cookies</div>
                      <div className="text-xs text-slate-400">Helps us measure traffic and page performance.</div>
                    </div>
                    <input
                      type="checkbox"
                      checked={analytics}
                      onChange={(e) => setAnalytics(e.target.checked)}
                      className="w-4 h-4 accent-cyan-500 cursor-pointer"
                    />
                  </div>

                  <hr className="border-slate-800" />

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-semibold text-white">Marketing Cookies</div>
                      <div className="text-xs text-slate-400">Used to deliver relevant updates & offers.</div>
                    </div>
                    <input
                      type="checkbox"
                      checked={marketing}
                      onChange={(e) => setMarketing(e.target.checked)}
                      className="w-4 h-4 accent-cyan-500 cursor-pointer"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    onClick={() => setStep('main')}
                    className="text-xs text-slate-400 hover:text-white transition-colors"
                  >
                    ← Back
                  </button>

                  <button
                    type="button"
                    disabled={loading}
                    onClick={() => saveConsentAndSubmit(analytics && marketing, analytics, marketing)}
                    className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold py-2 px-4 rounded-xl text-sm transition-all"
                  >
                    Save My Preferences
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
