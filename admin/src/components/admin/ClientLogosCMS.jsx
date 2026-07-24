import React, { useState, useEffect } from 'react';
import { clientLogoApi, uploadApi, getAssetUrl } from '@/api';
import { Plus, Trash2, Edit2, Upload, ExternalLink } from 'lucide-react';

export default function ClientLogosCMS() {
  const [logos, setLogos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [name, setName] = useState('');
  const [logoUrl, setLogoUrl] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');

  const fetchLogos = async () => {
    setLoading(true);
    try {
      const res = await clientLogoApi.list();
      if (res.success && Array.isArray(res.data)) {
        setLogos(res.data);
      }
    } catch (err) {
      console.error('Failed to load logos', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogos();
  }, []);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const res = await uploadApi.uploadImage(file, 'clientlogos');
      if (res.success && res.data?.url) {
        setLogoUrl(res.data.url);
      }
    } catch (err) {
      alert('Upload failed: ' + err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!name || !logoUrl) {
      alert('Name and Logo Image are required');
      return;
    }

    const payload = { name, logo_url: logoUrl, website_url: websiteUrl };
    try {
      if (editingId) {
        await clientLogoApi.update(editingId, payload);
      } else {
        await clientLogoApi.create(payload);
      }
      setModalOpen(false);
      resetForm();
      fetchLogos();
    } catch (err) {
      alert('Save failed: ' + err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this client logo?')) return;
    try {
      await clientLogoApi.delete(id);
      fetchLogos();
    } catch (err) {
      alert('Delete failed: ' + err.message);
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setName('');
    setLogoUrl('');
    setWebsiteUrl('');
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Client & Partner Logos</h1>
          <p className="text-sm text-gray-400">Manage client/partner logos displayed in the homepage infinite marquee.</p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setModalOpen(true);
          }}
          className="bg-primary-blue hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-xl flex items-center space-x-2 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add Client Logo</span>
        </button>
      </div>

      {/* Grid of Logos */}
      {loading ? (
        <div className="text-center py-12 text-gray-400">Loading logos...</div>
      ) : logos.length === 0 ? (
        <div className="text-center py-12 text-gray-500 bg-[#0f0f0f] rounded-2xl border border-white/5">
          No client logos added yet. Click "Add Client Logo" to get started!
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {logos.map((logo) => (
            <div key={logo.id} className="bg-[#0b0b0b] border border-white/5 rounded-2xl p-4 flex flex-col items-center space-y-3 relative group">
              <div className="w-full h-24 bg-black/40 rounded-xl flex items-center justify-center p-2 border border-white/5">
                <img src={logo.logo_url} alt={logo.name} className="max-h-full max-w-full object-contain" />
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-white text-sm">{logo.name}</h3>
                {logo.website_url && (
                  <a href={logo.website_url} target="_blank" rel="noreferrer" className="text-xs text-primary-blue hover:underline flex items-center justify-center space-x-1 mt-0.5">
                    <span>{logo.website_url}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
              <div className="flex items-center space-x-2 pt-2 border-t border-white/5 w-full justify-center">
                <button
                  onClick={() => {
                    setEditingId(logo.id);
                    setName(logo.name);
                    setLogoUrl(logo.logo_url);
                    setWebsiteUrl(logo.website_url || '');
                    setModalOpen(true);
                  }}
                  className="p-1.5 bg-white/5 hover:bg-white/10 text-gray-300 rounded-lg transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(logo.id)}
                  className="p-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0b0b0b] border border-white/10 rounded-2xl p-6 w-full max-w-md space-y-4">
            <h2 className="text-xl font-bold text-white">{editingId ? 'Edit Client Logo' : 'Add New Client Logo'}</h2>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">Client / Partner Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Acme Corp"
                  className="w-full bg-[#111] border border-white/10 rounded-xl px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-primary-blue"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">Website URL (Optional)</label>
                <input
                  type="url"
                  value={websiteUrl}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                  placeholder="https://clientwebsite.com"
                  className="w-full bg-[#111] border border-white/10 rounded-xl px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-primary-blue"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">Logo Image *</label>
                <div className="flex items-center space-x-3">
                  <input
                    type="text"
                    required
                    value={logoUrl}
                    onChange={(e) => setLogoUrl(e.target.value)}
                    placeholder="https://res.cloudinary.com/..."
                    className="flex-1 bg-[#111] border border-white/10 rounded-xl px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-primary-blue"
                  />
                  <label className="bg-white/10 hover:bg-white/20 text-white p-2.5 rounded-xl cursor-pointer transition-colors flex items-center justify-center">
                    <Upload className="w-4 h-4" />
                    <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                  </label>
                </div>
                {uploading && <p className="text-xs text-cyan-400 mt-1">Uploading image...</p>}
                {logoUrl && (
                  <div className="mt-2 h-16 w-full bg-black/40 rounded-xl border border-white/5 p-2 flex items-center justify-center">
                    <img src={getAssetUrl(logoUrl)} alt="Preview" className="max-h-full object-contain" />
                  </div>
                )}
              </div>

              <div className="flex justify-end space-x-2 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 bg-white/5 hover:bg-white/10 text-gray-300 rounded-xl text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary-blue hover:bg-blue-600 text-white font-medium rounded-xl text-sm"
                >
                  Save Logo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
