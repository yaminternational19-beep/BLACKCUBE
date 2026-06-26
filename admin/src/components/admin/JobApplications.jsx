'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/badge";
import { Eye, Download, Trash2, Mail, Phone, Calendar, User, FileText, Search, CheckCircle, Clock, X } from "lucide-react";
import { jobApplicationApi } from '@/api';

// Custom Admin Input Component
const AdminInput = ({
  className = "",
  ...props
}) => <input className={`w-full px-4 py-3 bg-primary-slate/30 border border-white/20 rounded-xl text-white placeholder-primary-gray focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-primary-blue transition-all duration-200 hover:bg-primary-slate/40 ${className}`} {...props} />;
export function JobApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedApplication, setSelectedApplication] = useState(null);
  useEffect(() => {
    loadApplications();
  }, [statusFilter]);
  const loadApplications = async () => {
    try {
      setLoading(true);
      const res = await jobApplicationApi.list({
        limit: 100,
        status: statusFilter !== 'all' ? statusFilter : undefined
      });
      if (res.success && Array.isArray(res.data)) {
        setApplications(res.data);
      }
    } catch (error) {
      console.error('Failed to load job applications:', error);
    } finally {
      setLoading(false);
    }
  };
  const filteredApplications = applications.filter(app => {
    const q = searchTerm.toLowerCase();
    const name = (app.name || '').toLowerCase();
    const email = (app.email || '').toLowerCase();
    const position = (app.position || '').toLowerCase();
    const matchesSearch = name.includes(q) || email.includes(q) || position.includes(q);
    return matchesSearch;
  });
  const getStatusBadge = status => {
    const statusConfig = {
      pending: {
        color: 'bg-yellow-500/20 text-yellow-500',
        label: 'Pending'
      },
      reviewed: {
        color: 'bg-blue-500/20 text-blue-500',
        label: 'Reviewed'
      },
      shortlisted: {
        color: 'bg-green-500/20 text-green-500',
        label: 'Shortlisted'
      },
      rejected: {
        color: 'bg-red-500/20 text-red-500',
        label: 'Rejected'
      }
    };
    const config = statusConfig[status] || statusConfig.pending;
    return <Badge className={`${config.color} border-0`}>
        {config.label}
      </Badge>;
  };
  const updateApplicationStatus = async (id, status) => {
    try {
      const res = await jobApplicationApi.update(id, {
        status
      });
      if (res.success) {
        setApplications(prev => prev.map(app => (app._id || app.id) === id ? {
          ...app,
          status
        } : app));
        if (selectedApplication && (selectedApplication._id || selectedApplication.id) === id) {
          setSelectedApplication({
            ...selectedApplication,
            status
          });
        }
      }
    } catch (error) {
      console.error('Failed to update application status:', error);
      alert('Failed to update application status');
    }
  };
  const deleteApplication = async id => {
    if (!confirm('Are you sure you want to delete this application?')) return;
    try {
      const res = await jobApplicationApi.delete(id);
      if (res.success) {
        setApplications(prev => prev.filter(app => (app._id || app.id) !== id));
        if (selectedApplication && (selectedApplication._id || selectedApplication.id) === id) {
          setSelectedApplication(null);
        }
      }
    } catch (error) {
      console.error('Failed to delete application:', error);
      alert('Failed to delete application');
    }
  };
  const getStatusCounts = () => {
    return {
      total: applications.length,
      pending: applications.filter(app => app.status === 'pending').length,
      reviewed: applications.filter(app => app.status === 'reviewed').length,
      shortlisted: applications.filter(app => app.status === 'shortlisted').length,
      rejected: applications.filter(app => app.status === 'rejected').length
    };
  };
  const statusCounts = getStatusCounts();
  if (loading) {
    return <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Job Applications</h2>
        </div>
        <div className="text-center py-8 text-primary-gray">Loading...</div>
      </div>;
  }
  return <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Job Applications</h2>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary-gray w-4 h-4" />
            <AdminInput placeholder="Search applications..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10 w-64" />
          </div>
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="px-3 py-2 bg-primary-slate/50 border border-white/10 rounded-lg text-white">
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="reviewed">Reviewed</option>
            <option value="shortlisted">Shortlisted</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card hover className="p-6">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-white">{statusCounts.total}</div>
            <div className="text-primary-gray text-sm">Total Applications</div>
          </CardContent>
        </Card>
        <Card hover className="p-6">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-500">{statusCounts.pending}</div>
            <div className="text-primary-gray text-sm">Pending</div>
          </CardContent>
        </Card>
        <Card hover className="p-6">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-500">{statusCounts.reviewed}</div>
            <div className="text-primary-gray text-sm">Reviewed</div>
          </CardContent>
        </Card>
        <Card hover className="p-6">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-500">{statusCounts.shortlisted}</div>
            <div className="text-primary-gray text-sm">Shortlisted</div>
          </CardContent>
        </Card>
        <Card hover className="p-6">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-red-500">{statusCounts.rejected}</div>
            <div className="text-primary-gray text-sm">Rejected</div>
          </CardContent>
        </Card>
      </div>

      {/* Applications List */}
      {applications.length === 0 ? <div className="text-center py-8 text-primary-gray">No job applications yet</div> : <div className="space-y-4">
          {filteredApplications.map(application => <Card key={application._id || application.id} hover className="p-6">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-primary-blue to-primary-purple rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-white">{application.name}</h3>
                        <p className="text-primary-gray">{application.position}</p>
                        <p className="text-sm text-primary-gray">{application.appliedDate}</p>
                      </div>
                      {getStatusBadge(application.status)}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center space-x-2">
                        <Mail className="w-4 h-4 text-primary-blue" />
                        <span className="text-primary-gray">{application.email}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4 text-primary-blue" />
                        <span className="text-primary-gray">{application.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-primary-blue" />
                        <span className="text-primary-gray">{application.experience} experience</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <FileText className="w-4 h-4 text-primary-blue" />
                        <a href={application.resumeUrl} target="_blank" rel="noopener noreferrer" className="text-primary-blue hover:underline">
                          View Resume
                        </a>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="text-white font-medium mb-2">Cover Letter:</h4>
                      <p className="text-primary-gray text-sm leading-relaxed">
                        {(application.coverLetter || '').length > 200 ? `${(application.coverLetter || '').substring(0, 200)}...` : application.coverLetter || ''}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col space-y-2 ml-4">
                    <Button size="sm" onClick={() => setSelectedApplication(application)} className="group">
                      <Eye className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                      View Details
                    </Button>

                    <div className="flex space-x-1">
                      <Button size="sm" variant="outline" onClick={() => updateApplicationStatus(application._id || application.id || '', 'reviewed')} className="text-blue-500 hover:bg-blue-500/10">
                        <CheckCircle className="w-3 h-3" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => updateApplicationStatus(application._id || application.id || '', 'shortlisted')} className="text-green-500 hover:bg-green-500/10">
                        <Clock className="w-3 h-3" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => updateApplicationStatus(application._id || application.id || '', 'rejected')} className="text-red-500 hover:bg-red-500/10">
                        <X className="w-3 h-3" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => deleteApplication(application._id || application.id || '')} className="border-red-500/30 text-red-400 hover:bg-red-500/10">
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>)}
        </div>}

      {/* Application Detail Modal */}
      {selectedApplication && <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50">
          <Card className="max-w-4xl w-full max-h-[90vh] overflow-y-auto" hover>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl">Application Details</CardTitle>
                <Button variant="outline" onClick={() => setSelectedApplication(null)}>
                  Close
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Personal Information</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm text-primary-gray">Full Name</label>
                      <p className="text-white">{selectedApplication.name}</p>
                    </div>
                    <div>
                      <label className="text-sm text-primary-gray">Email</label>
                      <p className="text-white">{selectedApplication.email}</p>
                    </div>
                    <div>
                      <label className="text-sm text-primary-gray">Phone</label>
                      <p className="text-white">{selectedApplication.phone}</p>
                    </div>
                    <div>
                      <label className="text-sm text-primary-gray">Experience Level</label>
                      <p className="text-white">{selectedApplication.experience}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Job Information</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm text-primary-gray">Position Applied For</label>
                      <p className="text-white">{selectedApplication.position}</p>
                    </div>
                    <div>
                      <label className="text-sm text-primary-gray">Application Date</label>
                      <p className="text-white">{selectedApplication.appliedDate}</p>
                    </div>
                    <div>
                      <label className="text-sm text-primary-gray">Status</label>
                      <div className="mt-1">
                        {getStatusBadge(selectedApplication.status)}
                      </div>
                    </div>
                    <div>
                      <label className="text-sm text-primary-gray">Resume</label>
                      <div className="mt-1">
                        <Button size="sm" variant="outline" onClick={() => {
                      const link = document.createElement('a');
                      link.href = selectedApplication.resumeUrl;
                      link.download = selectedApplication.name + "_resume";
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    }}>
                          <Download className="w-4 h-4 mr-2" />
                          Download Resume
                        </Button>

                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Cover Letter</h3>
                <div className="bg-primary-slate/30 rounded-lg p-4">
                    <p className="text-primary-gray leading-relaxed whitespace-pre-wrap">
                    {selectedApplication.coverLetter || ''}
                  </p>
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <Button variant="outline" onClick={() => updateApplicationStatus(selectedApplication._id || selectedApplication.id || '', 'reviewed')}>
                  Mark as Reviewed
                </Button>
                <Button onClick={() => updateApplicationStatus(selectedApplication._id || selectedApplication.id || '', 'shortlisted')} className="bg-green-600 hover:bg-green-700">
                  Shortlist
                </Button>
                <Button variant="outline" onClick={() => updateApplicationStatus(selectedApplication._id || selectedApplication.id || '', 'rejected')} className="border-red-500/30 text-red-400 hover:bg-red-500/10">
                  Reject
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>}
    </div>;
}
