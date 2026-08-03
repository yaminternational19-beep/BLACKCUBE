import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, ShieldCheck, ArrowLeft, RefreshCw, KeyRound, Clock } from 'lucide-react';
import api from '@/api';

export default function Login() {
  const navigate = useNavigate();
  const [step, setStep] = useState('credentials'); // 'credentials' | 'otp'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [infoMessage, setInfoMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // 30-Second Resend Cooldown Countdown Timer
  useEffect(() => {
    let timer;
    if (cooldown > 0) {
      timer = setInterval(() => {
        setCooldown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [cooldown]);

  const handleCredentialsSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setErrorMessage('');
    setInfoMessage('');

    try {
      const res = await api.post('/auth/login', { email: email.trim(), password });
      
      // Check if OTP is required (2FA Step 2)
      if (res.data?.data?.otp_required) {
        setStep('otp');
        setCooldown(30); // Start 30s resend cooldown timer
        setInfoMessage(res.data.data.message || `A 6-digit OTP code has been sent to ${email} (valid for 5 mins).`);
      } else if (res.data?.data?.token) {
        // Direct login token fallback
        saveSessionAndNavigate(res.data.data);
      } else {
        setErrorMessage('Failed to initiate login. Please try again.');
      }
    } catch (err) {
      const msg = err?.response?.data?.message || err?.message || 'Authentication failed. Please check your credentials.';
      setErrorMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    if (!otp || otp.trim().length !== 6) {
      setErrorMessage('Please enter the full 6-digit OTP code.');
      return;
    }
    setLoading(true);
    setErrorMessage('');

    try {
      const res = await api.post('/auth/verify-otp', { email: email.trim(), otp: otp.trim() });
      if (res.data?.success && res.data?.data?.token) {
        saveSessionAndNavigate(res.data.data);
      } else {
        setErrorMessage('Invalid OTP code. Please try again.');
      }
    } catch (err) {
      const msg = err?.response?.data?.message || err?.message || 'OTP verification failed. Please try again.';
      setErrorMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (resending || cooldown > 0) return;
    setResending(true);
    setErrorMessage('');
    try {
      const res = await api.post('/auth/login', { email: email.trim(), password });
      if (res.data?.data?.otp_required) {
        setCooldown(30); // Reset 30s cooldown timer
        setInfoMessage(`A fresh 6-digit OTP code has been sent to ${email} (valid for 5 mins).`);
      }
    } catch (err) {
      const msg = err?.response?.data?.message || err?.message || 'Failed to resend OTP. Please try again.';
      setErrorMessage(msg);
    } finally {
      setResending(false);
    }
  };

  const saveSessionAndNavigate = (data) => {
    localStorage.setItem('admin_token', data.token);
    if (data.user?.email) {
      localStorage.setItem('admin_email', data.user.email);
    }
    if (data.session?.id) {
      localStorage.setItem('admin_session_id', data.session.id);
    }
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6 relative overflow-hidden">
      {/* Dynamic Background Accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary-blue/10 rounded-full blur-3xl pointer-events-none" />

      <div className="bg-[#0b0b0b] ring-1 ring-white/10 rounded-2xl p-8 w-full max-w-md card-elegant shadow-2xl relative z-10">
        
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-white/5 ring-1 ring-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4 text-white">
            {step === 'credentials' ? <ShieldCheck className="w-8 h-8 text-primary-blue" /> : <KeyRound className="w-8 h-8 text-primary-purple" />}
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            {step === 'credentials' ? 'BlackCube Admin Login' : 'Enter 2FA OTP Code'}
          </h1>
          <p className="text-sm text-gray-400 mt-2">
            {step === 'credentials'
              ? 'Enter your credentials to receive an OTP verification code.'
              : `Enter the 6-digit code sent to ${email} (valid for 5 mins)`}
          </p>
        </div>

        {/* Notifications & Alert Banners */}
        {infoMessage && (
          <div className="mb-6 p-4 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-400 text-sm leading-relaxed flex items-start space-x-3">
            <Mail className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <span>{infoMessage}</span>
          </div>
        )}

        {errorMessage && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm leading-relaxed">
            {errorMessage}
          </div>
        )}

        {/* STEP 1: Email & Password Form */}
        {step === 'credentials' ? (
          <form onSubmit={handleCredentialsSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-5 h-5 text-gray-500 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-12 pr-4 py-3 bg-[#0f0f0f] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-blue transition"
                  placeholder="admin@blackcube.ae"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="w-5 h-5 text-gray-500 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-12 pr-4 py-3 bg-[#0f0f0f] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-blue transition"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-6 rounded-xl bg-white text-black font-bold hover:bg-gray-200 transition-colors duration-200 flex items-center justify-center space-x-2 shadow-lg disabled:opacity-50"
            >
              {loading ? 'Validating Credentials...' : 'Send OTP Code'}
            </button>
          </form>
        ) : (
          /* STEP 2: OTP Verification Form */
          <form onSubmit={handleOtpSubmit} className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400">
                  6-Digit OTP Code
                </label>
                <span className="text-xs text-gray-500 flex items-center">
                  <Clock className="w-3 h-3 mr-1" /> Expires in 5 mins
                </span>
              </div>
              <input
                type="text"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                required
                autoFocus
                className="w-full px-4 py-4 text-center text-2xl font-mono tracking-[0.5em] bg-[#0f0f0f] border border-white/20 rounded-xl text-white placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-blue transition"
                placeholder="000000"
              />
            </div>

            <button
              type="submit"
              disabled={loading || otp.length !== 6}
              className="w-full py-3.5 px-6 rounded-xl bg-white text-black font-bold hover:bg-gray-200 transition-colors duration-200 flex items-center justify-center space-x-2 shadow-lg disabled:opacity-50"
            >
              {loading ? 'Verifying OTP...' : 'Verify OTP & Sign In'}
            </button>

            <div className="flex items-center justify-between pt-2 border-t border-white/5 text-xs text-gray-400">
              <button
                type="button"
                onClick={() => {
                  setStep('credentials');
                  setOtp('');
                  setCooldown(0);
                  setErrorMessage('');
                  setInfoMessage('');
                }}
                className="flex items-center hover:text-white transition"
              >
                <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Back to Login
              </button>

              <button
                type="button"
                onClick={handleResendOtp}
                disabled={resending || cooldown > 0}
                className="flex items-center text-primary-blue hover:underline disabled:opacity-50 disabled:no-underline cursor-pointer"
              >
                <RefreshCw className={`w-3.5 h-3.5 mr-1 ${resending ? 'animate-spin' : ''}`} />
                {resending ? 'Resending...' : cooldown > 0 ? `Resend OTP in ${cooldown}s` : 'Resend OTP'}
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
}
