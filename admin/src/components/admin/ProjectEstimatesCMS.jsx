import React, { useState, useEffect } from 'react';
import { projectEstimateApi } from '@/api';
import { Trash2, Mail, Phone, Building, Calendar, DollarSign, Clock } from 'lucide-react';

export default function ProjectEstimatesCMS() {
  const [estimates, setEstimates] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEstimates = async () => {
    setLoading(true);
    try {
      const res = await projectEstimateApi.list();
      if (res.success && Array.isArray(res.data)) {
        setEstimates(res.data);
      }
    } catch (err) {
      console.error('Failed to load project estimates', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEstimates();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this estimate lead?')) return;
    try {
      await projectEstimateApi.delete(id);
      fetchEstimates();
    } catch (err) {
      alert('Delete failed: ' + err.message);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Project Estimate Leads</h1>
          <p className="text-sm text-gray-400">High-intent project cost estimate requests submitted by website visitors.</p>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-400">Loading estimate leads...</div>
      ) : estimates.length === 0 ? (
        <div className="text-center py-12 text-gray-500 bg-[#0f0f0f] rounded-2xl border border-white/5">
          No project estimate leads submitted yet.
        </div>
      ) : (
        <div className="space-y-4">
          {estimates.map((item) => (
            <div key={item.id} className="bg-[#0b0b0b] border border-white/5 rounded-2xl p-5 space-y-4 relative group">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-4">
                <div>
                  <div className="flex items-center space-x-3">
                    <h3 className="text-lg font-bold text-white">{item.name}</h3>
                    <span className="bg-primary-blue/20 text-primary-blue text-xs font-semibold px-2.5 py-1 rounded-full border border-primary-blue/30">
                      {item.project_type}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400 mt-2">
                    <span className="flex items-center space-x-1">
                      <Mail className="w-3.5 h-3.5 text-cyan-400" />
                      <a href={`mailto:${item.email}`} className="hover:underline text-gray-300">{item.email}</a>
                    </span>
                    {item.phone && (
                      <span className="flex items-center space-x-1">
                        <Phone className="w-3.5 h-3.5 text-cyan-400" />
                        <span>{item.phone}</span>
                      </span>
                    )}
                    {item.company && (
                      <span className="flex items-center space-x-1">
                        <Building className="w-3.5 h-3.5 text-cyan-400" />
                        <span>{item.company}</span>
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="text-right text-xs">
                    <div className="flex items-center space-x-1 text-cyan-400 font-semibold">
                      <DollarSign className="w-3.5 h-3.5" />
                      <span>{item.budget_range || 'Custom Budget'}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-gray-400 mt-0.5">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{item.timeline || 'Flexible Timeline'}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {item.description && (
                <div className="bg-[#111] p-3 rounded-xl border border-white/5 text-xs text-gray-300">
                  <span className="font-semibold text-gray-400 block mb-1">Project Brief / Description:</span>
                  <p className="leading-relaxed">{item.description}</p>
                </div>
              )}

              <div className="text-[11px] text-gray-500 flex items-center justify-between">
                <span>Submitted: {new Date(item.created_at).toLocaleString()}</span>
                <span>Scope: {item.scope || 'N/A'}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
