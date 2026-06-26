import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '@/api';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    try {
      const res = await api.post('/auth/login', { email, password });
      if ((res.data?.success) && res.data?.data?.token) {
        localStorage.setItem('admin_token', res.data.data.token);
        navigate('/');
      } else {
        alert('Invalid credentials');
      }
    } catch (err) {
      alert(err?.response?.data?.message || err?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <div className="bg-[#0b0b0b] ring-1 ring-white/5 rounded-2xl p-8 w-full max-w-md card-elegant">
        <h1 className="text-2xl font-bold mb-6">Admin Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 bg-[#0f0f0f] rounded-xl text-white ring-1 ring-white/10 focus:outline-none focus:ring-white/20"
              placeholder="admin@example.com"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 bg-[#0f0f0f] rounded-xl text-white ring-1 ring-white/10 focus:outline-none focus:ring-white/20"
              placeholder="••••••••"
            />
          </div>
          <button type="submit" disabled={loading} className="w-full btn-hero mt-4">
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
