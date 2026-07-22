import React, { useState } from 'react';

const PROJECT_TYPES = [
  { id: 'Web App', title: '💻 Custom Web Application', desc: 'React, Next.js, Django, Enterprise Web Platforms' },
  { id: 'Mobile App', title: '📱 Mobile App (iOS / Android)', desc: 'Cross-platform Flutter/React Native or Native Apps' },
  { id: 'Cloud/DevOps', title: '☁️ Cloud Architecture & DevOps', desc: 'AWS/Hostinger VPS, Docker, Kubernetes, CI/CD' },
  { id: 'AI & Data', title: '🧠 AI & Data Engineering', desc: 'Custom AI Models, LLM integrations, Analytics' },
];

const BUDGET_RANGES = [
  { id: '$5k - $15k', label: '$5k - $15k (MVP / Small Scope)', time: '3 - 5 Weeks' },
  { id: '$15k - $35k', label: '$15k - $35k (Full Production App)', time: '6 - 10 Weeks' },
  { id: '$35k+', label: '$35k+ (Enterprise Architecture)', time: '12+ Weeks' },
];

export default function ProjectEstimatorModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1);
  const [projectType, setProjectType] = useState('Web App');
  const [budgetRange, setBudgetRange] = useState('$15k - $35k');
  const [timeline, setTimeline] = useState('6 - 10 Weeks');
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [description, setDescription] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      project_type: projectType,
      budget_range: budgetRange,
      timeline,
      name,
      email,
      phone,
      company,
      description,
    };

    try {
      const baseUrl = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';
      const res = await fetch(`${baseUrl}/contact-submissions/project-estimates/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data?.success) {
        setSuccess(true);
      } else {
        alert('Failed to submit estimate request. Please try again.');
      }
    } catch (err) {
      alert('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md transition-opacity">
      <div className="w-full max-w-2xl bg-slate-900 border border-cyan-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl text-slate-100 relative overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white text-xl p-2 rounded-lg hover:bg-slate-800 transition-colors"
        >
          ✕
        </button>

        {success ? (
          <div className="py-12 text-center space-y-4">
            <div className="w-16 h-16 bg-cyan-500/20 text-cyan-400 rounded-full flex items-center justify-center mx-auto text-3xl font-bold">
              ✓
            </div>
            <h2 className="text-2xl font-bold text-white">Estimate Request Submitted!</h2>
            <p className="text-slate-300 text-sm max-w-md mx-auto">
              Thank you, <span className="text-cyan-400 font-semibold">{name}</span>. We have sent a confirmation email to <span className="text-cyan-400 font-semibold">{email}</span>. Our architecture team will contact you within 24 hours with a custom proposal.
            </p>
            <button
              onClick={onClose}
              className="mt-4 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold py-2.5 px-6 rounded-xl transition-all"
            >
              Done
            </button>
          </div>
        ) : (
          <>
            {/* Header / Steps Indicator */}
            <div className="mb-6">
              <span className="text-xs uppercase tracking-widest text-cyan-400 font-semibold">
                Step {step} of 3
              </span>
              <h2 className="text-2xl font-bold text-white mt-1">Project Cost Estimator Wizard</h2>
              <p className="text-xs text-slate-400">Get an instant project estimate and technical consultation from BlackCube.</p>
              
              {/* Progress Bar */}
              <div className="w-full bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full transition-all duration-300"
                  style={{ width: `${(step / 3) * 100}%` }}
                />
              </div>
            </div>

            {/* Step 1: Project Type */}
            {step === 1 && (
              <div className="space-y-4">
                <label className="block text-sm font-semibold text-slate-200">
                  1. Select your project type:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {PROJECT_TYPES.map((type) => (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setProjectType(type.id)}
                      className={`text-left p-3.5 rounded-xl border text-xs transition-all ${
                        projectType === type.id
                          ? 'bg-cyan-500/20 border-cyan-400 text-white shadow-lg shadow-cyan-500/10'
                          : 'bg-slate-800/50 border-slate-700/60 text-slate-300 hover:border-slate-500'
                      }`}
                    >
                      <div className="font-semibold text-sm mb-1">{type.title}</div>
                      <div className="text-slate-400">{type.desc}</div>
                    </button>
                  ))}
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold py-2.5 px-6 rounded-xl text-sm transition-all"
                  >
                    Next: Scope & Budget →
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Scope & Budget */}
            {step === 2 && (
              <div className="space-y-4">
                <label className="block text-sm font-semibold text-slate-200">
                  2. Select your expected budget & timeline:
                </label>
                <div className="space-y-2.5">
                  {BUDGET_RANGES.map((b) => (
                    <button
                      key={b.id}
                      type="button"
                      onClick={() => {
                        setBudgetRange(b.id);
                        setTimeline(b.time);
                      }}
                      className={`w-full text-left p-3.5 rounded-xl border text-xs flex items-center justify-between transition-all ${
                        budgetRange === b.id
                          ? 'bg-cyan-500/20 border-cyan-400 text-white shadow-lg shadow-cyan-500/10'
                          : 'bg-slate-800/50 border-slate-700/60 text-slate-300 hover:border-slate-500'
                      }`}
                    >
                      <div>
                        <div className="font-semibold text-sm">{b.label}</div>
                        <div className="text-slate-400 text-[11px]">Est. Delivery: {b.time}</div>
                      </div>
                      {budgetRange === b.id && <span className="text-cyan-400 font-bold">✓</span>}
                    </button>
                  ))}
                </div>

                <div className="pt-4 flex justify-between items-center">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-slate-400 hover:text-white text-xs"
                  >
                    ← Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold py-2.5 px-6 rounded-xl text-sm transition-all"
                  >
                    Next: Contact Details →
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Contact & Submit */}
            {step === 3 && (
              <form onSubmit={handleSubmit} className="space-y-3.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="John Doe"
                      className="w-full bg-slate-800/90 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Work Email *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="john@company.com"
                      className="w-full bg-slate-800/90 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 (555) 000-0000"
                      className="w-full bg-slate-800/90 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Company Name</label>
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Acme Corp"
                      className="w-full bg-slate-800/90 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Brief Description / Requirements</label>
                  <textarea
                    rows={2}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Tell us a bit about your goals, features, or timeline..."
                    className="w-full bg-slate-800/90 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div className="pt-3 flex justify-between items-center">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="text-slate-400 hover:text-white text-xs"
                  >
                    ← Back
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold py-2.5 px-6 rounded-xl text-sm transition-all shadow-lg shadow-cyan-500/25 disabled:opacity-50"
                  >
                    {loading ? 'Submitting...' : 'Submit & Get Estimate'}
                  </button>
                </div>
              </form>
            )}
          </>
        )}
      </div>
    </div>
  );
}
