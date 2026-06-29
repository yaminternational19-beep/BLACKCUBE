'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, Calendar, Trash2, Eye } from "lucide-react";
import { contactSubmissionApi } from '@/api';
export function ContactManagement() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubmission, setSelectedSubmission] = useState(null);

  const handleViewSubmission = async (submission) => {
    setSelectedSubmission(submission);
    if (!submission.is_read) {
      try {
        await contactSubmissionApi.markAsRead(submission.id);
        setSubmissions(prev => prev.map(sub => sub.id === submission.id ? { ...sub, is_read: true } : sub));
      } catch (err) {
        console.error('Failed to mark as read', err);
      }
    }
  };
  useEffect(() => {
    loadSubmissions();
  }, []);
  const loadSubmissions = async () => {
    try {
      setLoading(true);
      const res = await contactSubmissionApi.list({
        limit: 100
      });
      if (res.success && Array.isArray(res.data)) {
        setSubmissions(res.data);
      }
    } catch (error) {
      console.error('Failed to load contact submissions:', error);
    } finally {
      setLoading(false);
    }
  };
  const deleteSubmission = async id => {
    if (!confirm('Are you sure you want to delete this submission?')) return;
    try {
      const res = await contactSubmissionApi.delete(id);
      if (res.success) {
        setSubmissions(prev => prev.filter(s => s.id !== id));
        if (selectedSubmission?.id === id) {
          setSelectedSubmission(null);
        }
      }
    } catch (error) {
      console.error('Failed to delete submission:', error);
      alert('Failed to delete submission');
    }
  };
  const formatDate = dateString => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  if (loading) {
    return <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-primary mb-2">Contact Submissions</h2>
          <p className="text-muted-foreground">Manage contact form submissions and inquiries</p>
        </div>
        <div className="text-center py-8 text-muted-foreground">Loading...</div>
      </div>;
  }
  return <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-primary mb-2">Contact Submissions</h2>
        <p className="text-muted-foreground">Manage contact form submissions and inquiries</p>
      </div>

      {submissions.length === 0 ? <div className="text-center py-8 text-muted-foreground">No contact submissions yet</div> : <div className="space-y-4">
          {submissions.map(submission => <Card key={submission.id} className="card-elegant">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{submission.name}</CardTitle>
                    <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Mail className="w-3 h-3" />
                        {submission.email}
                      </div>
                      {submission.phone && <div className="flex items-center gap-1">
                          <Phone className="w-3 h-3" />
                          {submission.phone}
                        </div>}
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatDate(submission.created_at)}
                      </div>
                    </div>
                  </div>
                  {!submission.is_read && <Badge variant="default" className="bg-red-500">New</Badge>}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">
                    {submission.subject ? `Subject: ${submission.subject}` : 'No subject'}
                  </h4>
                  {submission.service && <p className="text-xs text-muted-foreground mb-2">Service: {submission.service}</p>}
                  {submission.company && <p className="text-xs text-muted-foreground mb-2">Company: {submission.company}</p>}
                  <p className="text-sm text-muted-foreground">
                    {submission.message || 'No message provided'}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => handleViewSubmission(submission)}>
                    <Eye className="w-3 h-3 mr-1" />
                    View Details
                  </Button>
                  <Button size="sm" variant="outline" className="text-destructive" onClick={() => deleteSubmission(submission.id)}>
                    <Trash2 className="w-3 h-3 mr-1" />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>)}
        </div>}

      {/* Detail Modal */}
      {selectedSubmission && <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50">
          <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto" hover>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl">Contact Submission Details</CardTitle>
                <Button variant="outline" onClick={() => setSelectedSubmission(null)}>
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
                      <label className="text-sm text-muted-foreground">Full Name</label>
                      <p className="text-white">{selectedSubmission.name}</p>
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground">Email</label>
                      <p className="text-white">{selectedSubmission.email}</p>
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground">Phone</label>
                      <p className="text-white">{selectedSubmission.phone || 'Not provided'}</p>
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground">Company</label>
                      <p className="text-white">{selectedSubmission.company || 'Not provided'}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Inquiry Details</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm text-muted-foreground">Subject</label>
                      <p className="text-white">{selectedSubmission.subject || 'No subject'}</p>
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground">Service</label>
                      <p className="text-white">{selectedSubmission.service || 'Not specified'}</p>
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground">Submitted Date</label>
                      <p className="text-white">{formatDate(selectedSubmission.created_at)}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Message</h3>
                <div className="bg-primary-slate/30 rounded-lg p-4">
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                    {selectedSubmission.message || 'No message provided'}
                  </p>
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <Button variant="outline" onClick={() => deleteSubmission(selectedSubmission.id)} className="border-red-500/30 text-red-400 hover:bg-red-500/10">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </Button>
                <Button onClick={() => setSelectedSubmission(null)}>
                  Close
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>}
    </div>;
}
