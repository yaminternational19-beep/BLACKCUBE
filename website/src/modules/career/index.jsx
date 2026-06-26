'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Briefcase,
  MapPin,
  Clock,
  DollarSign,
  CheckCircle,
  ArrowRight,
  Send,
  User,
  Mail,
  Calendar,
  ChevronDown } from
'lucide-react';
import SEO from '@/components/SEO';
import Layout from '@/components/layout/Layout';
import Button from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { pageApi, careerApi, jobApplicationApi, uploadApi } from '@/api';

// Date formatter
const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return '';
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric'
  });
};

// Icon mapping
const iconMap = {
  Briefcase,
  User,
  CheckCircle,
  DollarSign,
  Calendar,
  Mail
};

const CareerPage = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const [careerData, setCareerData] = useState({
    heroContent: { title: '', subtitle: '', primaryCta: '', secondaryCta: '' },
    quickFacts: [],
    whyWorkWithUsSection: { title: '', description: '' },
    benefits: [],
    howToApplySection: { title: '', subtitle: '' },
    howToApplySteps: [],
    benefitsPerksSection: { title: '', subtitle: '' },
    benefitsPerks: [],
    jobOpeningsSection: { title: '', description: '' }
  });

  const [jobs, setJobs] = useState([]);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [expandedJobId, setExpandedJobId] = useState(null);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [applicationForm, setApplicationForm] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    experience: '',
    coverLetter: '',
    resume: null
  });

  // Load CMS + Job Listings
  useEffect(() => {
    const load = async () => {
      try {
        const pageRes = await pageApi.get('career');
        if (pageRes.success && pageRes.data?.fields) {
          const next = { ...careerData };
          pageRes.data.fields.forEach((f) => {
            if (f.id in next) next[f.id] = f.value;
          });
          setCareerData(next);
        }

        const listRes = await careerApi.list();
        if (listRes.success && Array.isArray(listRes.data)) {
          setJobs(listRes.data);
        }
      } catch (err) {
        console.error('Failed to load career data:', err);
      }
    };
    load();
  }, []);

  // Form handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setApplicationForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0] || null;
    setApplicationForm((prev) => ({ ...prev, resume: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      let resumeUrl = '';

      if (applicationForm.resume) {
        try {
          const uploadRes = await uploadApi.uploadResume(applicationForm.resume);
          if (uploadRes.success && uploadRes.data) {
            resumeUrl = uploadRes.data.url;
          } else {
            throw new Error('Failed to upload resume.');
          }
        } catch (uploadError) {
          console.error('Resume upload failed:', uploadError);
          alert('Failed to upload resume. Please try again.');
          setIsSubmitting(false);
          return;
        }
      }

      const applicationData = {
        name: applicationForm.name || '',
        email: applicationForm.email || '',
        phone: applicationForm.phone || '',
        position: applicationForm.position,
        experience: applicationForm.experience || '',
        coverLetter: applicationForm.coverLetter || '',
        resumeUrl: resumeUrl || '',
        appliedDate: new Date().toISOString().split('T')[0],
        status: 'pending',
        jobId: selectedJobId || null,
        jobTitle: applicationForm.position
      };

      const res = await jobApplicationApi.create(applicationData);
      if (res.success) {
        alert('Application submitted successfully!');
        setShowApplicationForm(false);
        setApplicationForm({
          name: '',
          email: '',
          phone: '',
          position: '',
          experience: '',
          coverLetter: '',
          resume: null
        });
        setSelectedJobId(null);
      } else {
        alert('Failed to submit application. Please try again.');
      }
    } catch (error) {
      console.error('Failed to submit application:', error);
      alert('Failed to submit application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const openApplicationForm = (jobId) => {
    const job = jobs.find((j) => j.id === jobId || j._id === jobId);
    setSelectedJobId(jobId);
    setApplicationForm((prev) => ({
      ...prev,
      position: job?.title || ''
    }));
    setShowApplicationForm(true);
  };

  const openGeneralApplication = () => {
    setSelectedJobId(null);
    setApplicationForm((prev) => ({ ...prev, position: '' }));
    setShowApplicationForm(true);
  };

  return (
    <Layout>
      <SEO title="Careers" description="Join the team of expert software engineers at BlackCube Solutions." url="/career" />
      <div className="min-h-screen bg-black text-white">

        {/* Hero */}
        <section className="relative min-h-screen flex items-center justify-center pt-24 md:pt-28 pb-10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
          <div className="absolute right-0 lg:right-0 xl:right-15 2xl:right-70 top-1/2 -translate-y-1/2 opacity-5 text-[14rem] sm:text-[16rem] md:text-[28rem] lg:text-[40rem] font-bold leading-none pointer-events-none">
            BC
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}>
                
                <motion.h1
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6 leading-tight text-center lg:text-left"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}>
                  
                  {careerData.heroContent.title}
                </motion.h1>

                <motion.p
                  className="text-base sm:text-lg md:text-xl text-gray-400 mb-6 md:mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0 text-center lg:text-left"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}>
                  
                  {careerData.heroContent.subtitle}
                </motion.p>

                <motion.div
                  className="flex flex-wrap gap-3 md:gap-4 justify-center lg:justify-start"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}>
                  
                  <a href="#openings" className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-black font-semibold rounded hover:bg-gray-200 transition-colors">
                    {careerData.heroContent.primaryCta}
                  </a>
                  <a href="/contact" className="px-6 sm:px-8 py-3 sm:py-4 border border-gray-700 text-white font-semibold rounded hover:bg-gray-900 transition-colors">
                    {careerData.heroContent.secondaryCta}
                  </a>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Quick Facts */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-bl from-black via-gray-900 to-black pointer-events-none" />
          <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {careerData.quickFacts.map((fact, i) =>
              <Card key={i} hover className="h-full group">
                  <div className="text-gray-400 mb-2 group-hover:text-blue-400 transition-colors">{fact.label}:</div>
                  <div className="text-white text-xl font-semibold ">{fact.value}</div>
                </Card>
              )}
            </div>
          </div>
        </section>

        {/* Why Work With Us */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black pointer-events-none" />
          <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-20">
              
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {careerData.whyWorkWithUsSection.title}
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                {careerData.whyWorkWithUsSection.description}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {careerData.benefits.map((benefit, index) => {
                const Icon = iconMap[benefit.icon] || Briefcase;
                return (
                  <motion.div
                    key={benefit.id || index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}>
                    
                    <Card hover className="h-full text-center group">
                      <div className="relative z-10 w-16 h-16 bg-[#0f0f0f] rounded-full mx-auto mb-5 flex items-center justify-center ring-1 ring-white/10">
                        <Icon className="w-7 h-7 text-white/85" />
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-blue-400 transition-colors">
                        {benefit.title}
                      </h3>
                      <p className="text-gray-400 group-hover:text-white transition-colors">
                        {benefit.description}
                      </p>
                    </Card>
                  </motion.div>);

              })}
            </div>
          </div>
        </section>

        {/* How to Apply */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-bl from-black via-gray-900 to-black pointer-events-none" />
          <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                {careerData.howToApplySection.title}
              </h2>
              <p className="text-gray-400 mt-3 max-w-3xl mx-auto">
                {careerData.howToApplySection.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {careerData.howToApplySteps.map((step, i) =>
              <Card key={i} hover className="p-6">
                  <div className="text-sm text-gray-400 mb-2">{step.step}</div>
                  <div className="text-white font-semibold text-lg mb-2">{step.title}</div>
                  <p className="text-gray-400">{step.desc}</p>
                </Card>
              )}
            </div>
          </div>
        </section>

        {/* Benefits & Perks */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black pointer-events-none" />
          <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="text-center mb-14">
              <h2 className="text-4xl md:text-5xl font-bold text-white">
                {careerData.benefitsPerksSection.title}
              </h2>
              <p className="text-gray-400 mt-3 max-w-3xl mx-auto">
                {careerData.benefitsPerksSection.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {careerData.benefitsPerks.map((item, i) =>
              <Card key={i} hover className="p-6">
                  <div className="text-white font-semibold text-lg mb-3">{item.title}</div>
                  <ul className="list-disc list-inside space-y-2 text-gray-400">
                    {item.points.map((p, idx) =>
                  <li key={idx}>{p}</li>
                  )}
                  </ul>
                </Card>
              )}
            </div>
          </div>
        </section>

        {/* Job Openings */}
        <section ref={ref} className="py-20 bg-gray-900/30 relative overflow-hidden" id="openings">
          <div className="absolute inset-0 bg-gradient-to-bl from-black via-gray-900 to-black pointer-events-none" />
          <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-center mb-20">
              
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {careerData.jobOpeningsSection.title}
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                {careerData.jobOpeningsSection.description}
              </p>
            </motion.div>

            <div className="space-y-6">
              {jobs.map((job, index) =>
              <motion.div
                key={job._id || job.id || index}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1 }}>
                
                  <div className="bg-[#0b0b0b] ring-1 ring-white/5 rounded-2xl overflow-hidden">
                    <div className="flex items-start justify-between p-6">
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <h3 className="text-xl font-bold text-white mr-2">{job.title}</h3>
                          <span className="px-3 py-1 bg-[#0f0f0f] text-gray-300 text-xs rounded-full ring-1 ring-white/10">
                            {job.department}
                          </span>
                          <span className="px-3 py-1 bg-[#0f0f0f] text-gray-300 text-xs rounded-full ring-1 ring-white/10">
                            {job.type}
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-6 text-gray-400">
                          <span className="inline-flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            {job.location}
                          </span>
                          <span className="inline-flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            Posted {formatDate(job.postedDate)}
                          </span>
                          {job.salary &&
                        <span className="inline-flex items-center gap-2">
                              <DollarSign className="w-4 h-4" />
                              {job.salary}
                            </span>
                        }
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Button onClick={() => openApplicationForm(job.id || job._id)} className="group">
                          Apply Now
                          <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                        <button
                        onClick={() => setExpandedJobId(expandedJobId === (job.id || job._id) ? null : job.id || job._id)}
                        className="w-9 h-9 rounded-full bg-[#111] ring-1 ring-white/10 text-gray-300 flex items-center justify-center hover:bg-[#161616]">
                        
                          <ChevronDown className={`w-4 h-4 transition-transform ${expandedJobId === (job.id || job._id) ? 'rotate-180' : ''}`} />
                        </button>
                      </div>
                    </div>

                    <div className="px-6 pb-3 flex flex-wrap gap-2">
                      {(job.requirements || []).slice(0, 3).map((tag, i) =>
                    <span key={i} className="px-3 py-1 bg-[#0f0f0f] text-gray-300 text-[11px] rounded-full ring-1 ring-white/10">
                          {tag}
                        </span>
                    )}
                    </div>

                    <motion.div
                    initial={false}
                    animate={{
                      height: expandedJobId === (job.id || job._id) ? 'auto' : 0,
                      opacity: expandedJobId === (job.id || job._id) ? 1 : 0
                    }}
                    className="overflow-hidden">
                    
                      <div className="px-6 pb-6">
                        <div className="bg-[#0f0f0f] rounded-xl p-5 ring-1 ring-white/5 mb-6">
                          <div className="text-sm text-gray-300 mb-2">Job Description</div>
                          <p className="text-gray-400 text-sm leading-relaxed">{job.description}</p>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
                            {[
                          { label: 'Category', value: job.department },
                          { label: 'Experience', value: job.experience || 'Not specified' },
                          { label: 'Start Date', value: formatDate(job.postedDate) },
                          { label: 'Location', value: job.location }].
                          map((m, idx) =>
                          <div key={idx} className="bg-[#0b0b0b] rounded-lg p-3 ring-1 ring-white/5">
                                <div className="text-[11px] text-gray-500 mb-1">{m.label}</div>
                                <div className="text-sm text-gray-300">{m.value}</div>
                              </div>
                          )}
                          </div>
                        </div>

                        <div className="bg-[#0f0f0f] rounded-xl p-5 ring-1 ring-white/5 mb-6">
                          <div className="text-sm text-gray-300 mb-3">Skills Required</div>
                          <div className="flex flex-wrap gap-2">
                            {(job.requirements || []).map((s, idx) =>
                          <span key={idx} className="px-3 py-1 bg-[#0b0b0b] text-gray-300 text-xs rounded-lg ring-1 ring-white/5">
                                {s}
                              </span>
                          )}
                          </div>
                        </div>

                        {job.responsibilities?.length > 0 &&
                      <div className="bg-[#0f0f0f] rounded-xl p-5 ring-1 ring-white/5">
                            <div className="text-sm text-gray-300 mb-3">Responsibilities</div>
                            <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
                              {job.responsibilities.slice(0, 5).map((r, idx) =>
                          <li key={idx}>{r}</li>
                          )}
                            </ul>
                          </div>
                      }
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* General Apply Button */}
            {jobs.length > 0 &&
            <div className="text-center mt-12">
                <Button onClick={openGeneralApplication} size="lg">
                  Apply for Unlisted Roles
                </Button>
              </div>
            }
          </div>
        </section>

        {/* Application Form Modal */}
        {showApplicationForm &&
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-6 z-50 overflow-y-auto">
            <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#0b0b0b] border border-gray-800 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-white">Job Application</h3>
                <button
                onClick={() => setShowApplicationForm(false)}
                className="w-8 h-8 rounded-full bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white transition">
                
                  ×
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white font-medium mb-2">Full Name *</label>
                    <input
                    type="text"
                    name="name"
                    value={applicationForm.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="John Doe" />
                  
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2">Email *</label>
                    <input
                    type="email"
                    name="email"
                    value={applicationForm.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="john@example.com" />
                  
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2">Phone *</label>
                    <input
                    type="tel"
                    name="phone"
                    value={applicationForm.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="+1234567890" />
                  
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2">Position *</label>
                    <input
                    type="text"
                    name="position"
                    value={applicationForm.position}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Senior React Developer" />
                  
                  </div>
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Experience *</label>
                  <select
                  name="experience"
                  value={applicationForm.experience}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                  
                    <option value="">Select experience</option>
                    <option value="0-1">0-1 years</option>
                    <option value="1-3">1-3 years</option>
                    <option value="3-5">3-5 years</option>
                    <option value="5-10">5-10 years</option>
                    <option value="10+">10+ years</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Resume/CV *</label>
                  <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  required
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-blue-500 file:text-white" />
                
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Cover Letter *</label>
                  <textarea
                  name="coverLetter"
                  value={applicationForm.coverLetter}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Why are you a great fit?" />
                
                </div>

                <div className="flex gap-4 pt-4">
                  <Button type="submit" size="lg" className="flex-1 group" disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting...' : 'Submit Application'}
                    {!isSubmitting && <Send className="ml-2 w-4 h-4 group-hover:translate-x-1 transition" />}
                  </Button>
                  <Button type="button" variant="outline" size="lg" onClick={() => setShowApplicationForm(false)} disabled={isSubmitting}>
                    Cancel
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        }
      </div>
    </Layout>);

};

export default CareerPage;

