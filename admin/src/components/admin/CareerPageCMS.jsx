'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, Save, Edit, Eye } from "lucide-react";
import { pageApi, careerApi } from "@/api";
import { useToast } from "@/hooks/use-toast";

// Custom Admin Input Component
const AdminInput = ({
  className = "",
  ...props
}) => <input className={`w-full px-4 py-3 bg-primary-slate/30 border border-white/20 rounded-xl text-white placeholder-primary-gray focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-primary-blue transition-all duration-200 hover:bg-primary-slate/40 ${className}`} {...props} />;

// Custom Admin Textarea Component
const AdminTextarea = ({
  className = "",
  ...props
}) => <textarea className={`w-full px-4 py-3 bg-primary-slate/30 border border-white/20 rounded-xl text-white placeholder-primary-gray focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-primary-blue resize-none transition-all duration-200 hover:bg-primary-slate/40 ${className}`} {...props} />;
export function CareerPageCMS() {
  const [heroContent, setHeroContent] = useState({
    title: 'Join Our Team',
    subtitle: 'Be part of a dynamic team shaping the future of digital transformation.',
    primaryCta: 'View Openings',
    secondaryCta: 'Contact HR'
  });
  const [quickFacts, setQuickFacts] = useState([{
    label: 'Employment',
    value: 'Full Employment'
  }, {
    label: 'City',
    value: 'Dubai, UAE'
  }, {
    label: 'Schedule',
    value: 'Full Time'
  }]);
  const [whyWorkWithUsSection, setWhyWorkWithUsSection] = useState({
    title: 'Why Work With Us?',
    description: 'We offer a collaborative environment where innovation thrives and your career can flourish.'
  });

  // Employee Benefits used under "Why Work With Us"
  const [benefits, setBenefits] = useState([{
    id: 1,
    icon: 'Briefcase',
    title: 'Exciting Projects',
    description: 'Work on cutting-edge projects that challenge and inspire you to grow professionally.'
  }, {
    id: 2,
    icon: 'User',
    title: 'Growth Opportunities',
    description: 'Continuous learning and development opportunities to advance your career.'
  }, {
    id: 3,
    icon: 'Clock',
    title: 'Work-Life Balance',
    description: 'Flexible working hours and remote work options to maintain a healthy balance.'
  }]);

  // How to Apply (section heading + 6 steps)
  const [howToApplySection, setHowToApplySection] = useState({
    title: 'How to Apply',
    subtitle: 'We are excited to meet you. If you are interested in joining our team at BlackCube Solutions LLC and apply for our current job listings, please follow the simple steps below.'
  });
  const [howToApplySteps, setHowToApplySteps] = useState([{
    step: 'Step 01',
    title: 'Explore Job Listings',
    desc: 'Visit our website’s Careers page to explore the current job openings. Review the descriptions to evaluate your suitability and select the position that aligns with your skills, experience, and career aspirations.'
  }, {
    step: 'Step 02',
    title: 'Review Job Description',
    desc: 'Click on the relevant job title to view the details of the description. Take a few minutes to read through the responsibilities, requirements, and qualifications to ensure you have a clear understanding of the role.'
  }, {
    step: 'Step 03',
    title: 'Complete the Application Form',
    desc: 'Click the “Apply Now” button on the job listing page to access the online application form. Fill in your personal and contact information, upload your resume, and the position you are applying for.'
  }, {
    step: 'Step 04',
    title: 'Upload Your Documents',
    desc: 'Attach your resume/CV, cover letter, and portfolio (if applicable) to the application before you click submit or apply.'
  }, {
    step: 'Step 05',
    title: 'Submit Your Application',
    desc: 'Double-check that the information you’ve provided is accurate and complete. Once satisfied with your application, click the “Submit” button to send it to our HR team.'
  }, {
    step: 'Step 06',
    title: 'Interview Process',
    desc: 'If you are shortlisted for an interview, we will reach out to schedule a suitable time with you. Interviews may be conducted online or in-person as per the role requirement.'
  }]);

  // Benefits & Perks (section heading + grid)

  const [benefitsPerksSection, setBenefitsPerksSection] = useState({
    title: 'Benefits & Perks',
    subtitle: 'At BlackCube, we believe in prioritizing the well-being and growth of our team members. We offer a comprehensive range of benefits and perks to ensure our employees feel valued, motivated, and supported — both in their personal and professional lives.'
  });
  const [benefitsPerks, setBenefitsPerks] = useState([{
    title: 'Competitive Compensation',
    points: ['We offer competitive salary packages to reward your skills, experience, and dedication to the company.']
  }, {
    title: 'Health and Wellness',
    points: ['Health Insurance: Comprehensive medical insurance plans for team members and their dependents.', 'Mental Health Support: Employee Assistance Program and peer support for well-being and stress management.', 'Wellness Programs: Initiatives to promote physical and mental well-being, such as fitness challenges and mindfulness.']
  }, {
    title: 'Paid Time Off',
    points: ['Vacation Leave: Generous vacation days to relax and recharge.', 'Sick Leave: Paid sick days for when you need to take care of your health.', 'Holidays: Enjoy paid time off on recognized public holidays.']
  }, {
    title: 'Professional Development',
    points: ['Training Opportunities: Access to workshops, courses, and resources to enhance your skills and knowledge.', 'Career Growth: Opportunities for career advancement and skill development.']
  }, {
    title: 'Flexible Work Arrangements',
    points: ['Remote Work: We support flexible work arrangements, including remote work options for certain roles.', 'Flexible Hours: Adjust your work schedule to accommodate your personal commitments.']
  }, {
    title: 'Employee Recognition',
    points: ['Recognizing and celebrating employee achievements and contributions to the company’s success.']
  }, {
    title: 'Modern Workspace',
    points: ['State-of-the-art office facilities and a comfortable working environment.']
  }, {
    title: 'Team-Building Activities',
    points: ['Regular team-building events and activities to foster camaraderie and collaboration among team members.']
  }]);

  // Job Openings section heading
  const [jobOpeningsSection, setJobOpeningsSection] = useState({
    title: 'Current Openings',
    description: 'Find the perfect role that matches your skills and career aspirations.'
  });

  // Job postings list (align with page.tsx)

  const [jobPostings, setJobPostings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState('idle');
  const {
    toast
  } = useToast();

  // Load data from API on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        // Load page content
        const pageResponse = await pageApi.get('career');
        if (pageResponse.success && pageResponse.data) {
          const fields = pageResponse.data.fields || [];
          fields.forEach(field => {
            if (field.id === 'heroContent' && field.value) setHeroContent(field.value);
            if (field.id === 'quickFacts' && field.value) setQuickFacts(field.value);
            if (field.id === 'whyWorkWithUsSection' && field.value) setWhyWorkWithUsSection(field.value);
            if (field.id === 'benefits' && field.value) setBenefits(field.value);
            if (field.id === 'howToApplySection' && field.value) setHowToApplySection(field.value);
            if (field.id === 'howToApplySteps' && field.value) setHowToApplySteps(field.value);
            if (field.id === 'benefitsPerksSection' && field.value) setBenefitsPerksSection(field.value);
            if (field.id === 'benefitsPerks' && field.value) setBenefitsPerks(field.value);
            if (field.id === 'jobOpeningsSection' && field.value) setJobOpeningsSection(field.value);
          });
        }

        // Load job postings
        const jobsResponse = await careerApi.list();
        if (jobsResponse.success && jobsResponse.data) {
          setJobPostings(jobsResponse.data);
        }
      } catch (error) {
        console.error('Failed to load career page data:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleSave = async () => {
    try {
      setSaveStatus('saving');

      // Save page content
      const pageData = {
        id: 'career',
        title: 'Career Page',
        fields: [{
          id: 'heroContent',
          label: 'Hero Content',
          type: 'object',
          value: heroContent
        }, {
          id: 'quickFacts',
          label: 'Quick Facts',
          type: 'array',
          value: quickFacts
        }, {
          id: 'whyWorkWithUsSection',
          label: 'Why Work With Us Section',
          type: 'object',
          value: whyWorkWithUsSection
        }, {
          id: 'benefits',
          label: 'Benefits',
          type: 'array',
          value: benefits
        }, {
          id: 'howToApplySection',
          label: 'How to Apply Section',
          type: 'object',
          value: howToApplySection
        }, {
          id: 'howToApplySteps',
          label: 'How to Apply Steps',
          type: 'array',
          value: howToApplySteps
        }, {
          id: 'benefitsPerksSection',
          label: 'Benefits & Perks Section',
          type: 'object',
          value: benefitsPerksSection
        }, {
          id: 'benefitsPerks',
          label: 'Benefits & Perks',
          type: 'array',
          value: benefitsPerks
        }, {
          id: 'jobOpeningsSection',
          label: 'Job Openings Section',
          type: 'object',
          value: jobOpeningsSection
        }]
      };
      await pageApi.update('career', pageData);

      // Save job postings (create or update each)
      for (const job of jobPostings) {
        // If the job has a MongoDB _id, it's an existing DB record -> update
        if (!job._isNew && (job.id || job._id)) {
          try {
            await careerApi.update(String(job.id || job._id), job);
          } catch (err) {
            // If update fails, log and continue
            console.error('Failed to update job', err);
          }
        } else {
          // Create new job (ensure title exists)
          try {
            await careerApi.create(job);
          } catch (err) {
            console.error('Failed to create job', err);
          }
        }
      }
      setSaveStatus('success');
      toast({
        title: "Success!",
        description: "Career page content and job postings saved successfully to database."
      });
      setTimeout(() => setSaveStatus('idle'), 2000);
    } catch (error) {
      console.error('Failed to save career page:', error);
      setSaveStatus('error');
      toast({
        title: "Error",
        description: error.message || "Failed to save career page content. Please try again.",
        variant: "destructive"
      });
      setTimeout(() => setSaveStatus('idle'), 2000);
    }
  };

  // CRUD helpers
  const addQuickFact = () => {
    setQuickFacts([...quickFacts, {
      label: 'New Fact',
      value: 'New Value'
    }]);
  };
  const updateQuickFact = (index, field, value) => {
    const updated = [...quickFacts];
    updated[index] = {
      ...updated[index],
      [field]: value
    };
    setQuickFacts(updated);
  };
  const deleteQuickFact = index => {
    setQuickFacts(quickFacts.filter((_, i) => i !== index));
  };
  const addBenefit = () => {
    const newBenefit = {
      id: Date.now(),
      icon: 'Briefcase',
      title: 'New Benefit',
      description: 'Benefit description'
    };
    setBenefits([...benefits, newBenefit]);
  };
  const updateBenefit = (id, field, value) => {
    setBenefits(benefits.map(benefit => benefit.id === id ? {
      ...benefit,
      [field]: value
    } : benefit));
  };
  const deleteBenefit = id => {
    setBenefits(benefits.filter(benefit => benefit.id !== id));
  };
  const addHowStep = () => {
    setHowToApplySteps([...howToApplySteps, {
      step: `Step ${String(howToApplySteps.length + 1).padStart(2, '0')}`,
      title: 'New Step',
      desc: 'Step description'
    }]);
  };
  const updateHowStep = (index, field, value) => {
    const updated = [...howToApplySteps];
    updated[index][field] = value;
    setHowToApplySteps(updated);
  };
  const deleteHowStep = index => {
    setHowToApplySteps(howToApplySteps.filter((_, i) => i !== index));
  };
  const addPerkCard = () => {
    setBenefitsPerks([...benefitsPerks, {
      title: 'New Perk',
      points: ['Perk point']
    }]);
  };
  const updatePerkTitle = (index, value) => {
    const updated = [...benefitsPerks];
    updated[index] = {
      ...updated[index],
      title: value
    };
    setBenefitsPerks(updated);
  };
  const deletePerkCard = index => {
    setBenefitsPerks(benefitsPerks.filter((_, i) => i !== index));
  };
  const addPerkPoint = cardIndex => {
    const updated = [...benefitsPerks];
    updated[cardIndex] = {
      ...updated[cardIndex],
      points: [...updated[cardIndex].points, 'New point']
    };
    setBenefitsPerks(updated);
  };
  const updatePerkPoint = (cardIndex, pointIndex, value) => {
    const updated = [...benefitsPerks];
    const points = [...updated[cardIndex].points];
    points[pointIndex] = value;
    updated[cardIndex] = {
      ...updated[cardIndex],
      points
    };
    setBenefitsPerks(updated);
  };
  const deletePerkPoint = (cardIndex, pointIndex) => {
    const updated = [...benefitsPerks];
    updated[cardIndex] = {
      ...updated[cardIndex],
      points: updated[cardIndex].points.filter((_, i) => i !== pointIndex)
    };
    setBenefitsPerks(updated);
  };
  const addJobPosting = () => {
    const newJob = {
      id: Date.now(),
      _isNew: true,
      title: 'New Position',
      department: 'Engineering',
      type: 'Full-time',
      location: 'Dubai, UAE',
      salary: 'Competitive',
      postedDate: new Date().toISOString().split('T')[0],
      description: 'Job description',
      requirements: ['Requirement 1', 'Requirement 2']
    };
    setJobPostings([...jobPostings, newJob]);
  };
  const updateJobPosting = (id, field, value) => {
    setJobPostings(jobPostings.map(job => job.id === id ? {
      ...job,
      [field]: value
    } : job));
  };
  const deleteJobPosting = async id => {
    if (confirm('Are you sure you want to delete this job posting?')) {
      try {
        const job = jobPostings.find(j => j.id === id || j._id === id);
        // Only call API if it's an existing job in the backend (not newly added and unsaved)
        if (job && !job._isNew) {
          await careerApi.delete(String(id));
        }
        setJobPostings(jobPostings.filter(job => job.id !== id && job._id !== id));
        toast({
          title: "Success",
          description: "Job posting deleted successfully."
        });
      } catch (error) {
        console.error('Failed to delete job posting:', error);
        toast({
          title: "Error",
          description: "Failed to delete job posting.",
          variant: "destructive"
        });
      }
    }
  };
  const addRequirement = jobId => {
    const job = jobPostings.find(j => j.id === jobId);
    if (job) {
      const updatedRequirements = [...job.requirements, 'New Requirement'];
      updateJobPosting(jobId, 'requirements', updatedRequirements);
    }
  };
  const updateRequirement = (jobId, reqIndex, value) => {
    const job = jobPostings.find(j => j.id === jobId);
    if (job) {
      const updatedRequirements = [...job.requirements];
      updatedRequirements[reqIndex] = value;
      updateJobPosting(jobId, 'requirements', updatedRequirements);
    }
  };
  const deleteRequirement = (jobId, reqIndex) => {
    const job = jobPostings.find(j => j.id === jobId);
    if (job) {
      const updatedRequirements = job.requirements.filter((_, index) => index !== reqIndex);
      updateJobPosting(jobId, 'requirements', updatedRequirements);
    }
  };
  return <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Career Page CMS</h2>
        <Button onClick={handleSave} className="group" disabled={loading || saveStatus === 'saving'}>
          <Save className="w-4 h-4 mr-2" />
          {saveStatus === 'saving' ? 'Saving...' : saveStatus === 'success' ? 'Saved!' : saveStatus === 'error' ? 'Error' : 'Save Changes'}
        </Button>
      </div>

      <Tabs defaultValue="hero" className="w-full">
        <TabsList className="flex w-full overflow-x-auto justify-start hide-scrollbar gap-2 p-1 bg-primary-slate/30 rounded-xl mb-6">
          <TabsTrigger value="hero">Hero</TabsTrigger>
          <TabsTrigger value="quick-facts">Quick Facts</TabsTrigger>
          <TabsTrigger value="why-work">Why Work</TabsTrigger>
          <TabsTrigger value="how-to-apply">How to Apply</TabsTrigger>
          <TabsTrigger value="benefits-perks">Benefits & Perks</TabsTrigger>
          <TabsTrigger value="jobs">Jobs</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>

        {/* Hero Section */}
        <TabsContent value="hero" className="space-y-6">
          <Card hover className="p-6">
            <CardHeader>
              <CardTitle>Hero Section Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Title</label>
                <AdminInput value={heroContent.title} onChange={e => setHeroContent({
                ...heroContent,
                title: e.target.value
              })} placeholder="Enter title" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Subtitle</label>
                <AdminTextarea value={heroContent.subtitle} onChange={e => setHeroContent({
                ...heroContent,
                subtitle: e.target.value
              })} placeholder="Enter subtitle" rows={3} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Primary CTA</label>
                  <AdminInput value={heroContent.primaryCta} onChange={e => setHeroContent({
                  ...heroContent,
                  primaryCta: e.target.value
                })} placeholder="Primary CTA text" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Secondary CTA</label>
                  <AdminInput value={heroContent.secondaryCta} onChange={e => setHeroContent({
                  ...heroContent,
                  secondaryCta: e.target.value
                })} placeholder="Secondary CTA text" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Quick Facts */}
        <TabsContent value="quick-facts" className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Quick Facts</h3>
            <Button onClick={addQuickFact} size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Fact
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {quickFacts.map((fact, index) => <Card key={index} hover className="p-6">
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <AdminInput value={fact.label} onChange={e => updateQuickFact(index, 'label', e.target.value)} placeholder="Fact label" />
                    <AdminInput value={fact.value} onChange={e => updateQuickFact(index, 'value', e.target.value)} placeholder="Fact value" />
                    <Button size="sm" variant="outline" onClick={() => deleteQuickFact(index)} className="border-red-500/30 text-red-400 hover:bg-red-500/10">
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>)}
          </div>
        </TabsContent>

        {/* Why Work With Us */}
        <TabsContent value="why-work" className="space-y-6">
          <Card hover className="p-6">
            <CardHeader>
              <CardTitle>Why Work With Us Section</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Section Title</label>
                <AdminInput value={whyWorkWithUsSection.title} onChange={e => setWhyWorkWithUsSection({
                ...whyWorkWithUsSection,
                title: e.target.value
              })} placeholder="Section title" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Section Description</label>
                <AdminTextarea value={whyWorkWithUsSection.description} onChange={e => setWhyWorkWithUsSection({
                ...whyWorkWithUsSection,
                description: e.target.value
              })} placeholder="Section description" rows={3} />
              </div>
            </CardContent>
          </Card>

          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Employee Benefits</h3>
            <Button onClick={addBenefit} size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Benefit
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {benefits.map(benefit => <Card key={benefit.id} hover className="p-6">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Badge className="bg-primary-blue/20 text-primary-blue border-primary-blue/30">{benefit.icon}</Badge>
                      <Button size="sm" variant="outline" onClick={() => deleteBenefit(benefit.id)} className="border-red-500/30 text-red-400 hover:bg-red-500/10">
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                    <AdminInput value={benefit.title} onChange={e => updateBenefit(benefit.id, 'title', e.target.value)} placeholder="Benefit title" />
                    <AdminTextarea value={benefit.description} onChange={e => updateBenefit(benefit.id, 'description', e.target.value)} placeholder="Benefit description" rows={2} />
                  </div>
                </CardContent>
              </Card>)}
          </div>
        </TabsContent>

        {/* How to Apply */}
        <TabsContent value="how-to-apply" className="space-y-6">
          <Card hover className="p-6">
            <CardHeader>
              <CardTitle>How to Apply Section</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Section Title</label>
                <AdminInput value={howToApplySection.title} onChange={e => setHowToApplySection({
                ...howToApplySection,
                title: e.target.value
              })} placeholder="Section title" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Section Subtitle</label>
                <AdminTextarea value={howToApplySection.subtitle} onChange={e => setHowToApplySection({
                ...howToApplySection,
                subtitle: e.target.value
              })} placeholder="Section subtitle" rows={3} />
              </div>
            </CardContent>
          </Card>

          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">How to Apply Steps</h3>
            <Button onClick={addHowStep} size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Step
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {howToApplySteps.map((step, index) => <Card key={index} hover className="p-6">
                <CardContent className="p-4 space-y-3">
                  <AdminInput value={step.step} onChange={e => updateHowStep(index, 'step', e.target.value)} placeholder="Step (e.g., Step 01)" />
                  <AdminInput value={step.title} onChange={e => updateHowStep(index, 'title', e.target.value)} placeholder="Title" />
                  <AdminTextarea value={step.desc} onChange={e => updateHowStep(index, 'desc', e.target.value)} placeholder="Description" rows={3} />
                  <div className="flex justify-end">
                    <Button size="sm" variant="outline" onClick={() => deleteHowStep(index)} className="border-red-500/30 text-red-400 hover:bg-red-500/10">
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>)}
          </div>
        </TabsContent>

        {/* Benefits & Perks */}
        <TabsContent value="benefits-perks" className="space-y-6">
          <Card hover className="p-6">
            <CardHeader>
              <CardTitle>Benefits & Perks Section</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Section Title</label>
                <AdminInput value={benefitsPerksSection.title} onChange={e => setBenefitsPerksSection({
                ...benefitsPerksSection,
                title: e.target.value
              })} placeholder="Section title" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Section Subtitle</label>
                <AdminTextarea value={benefitsPerksSection.subtitle} onChange={e => setBenefitsPerksSection({
                ...benefitsPerksSection,
                subtitle: e.target.value
              })} placeholder="Section subtitle" rows={3} />
              </div>
            </CardContent>
          </Card>

          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Benefits & Perks Cards</h3>
            <Button onClick={addPerkCard} size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Card
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {benefitsPerks.map((card, ci) => <Card key={ci} hover className="p-6">
                <CardContent className="p-4 space-y-3">
                  <AdminInput value={card.title} onChange={e => updatePerkTitle(ci, e.target.value)} placeholder="Card title" />
                  <div className="space-y-2">
                    {card.points.map((p, pi) => <div key={pi} className="flex items-center gap-2">
                        <AdminInput value={p} onChange={e => updatePerkPoint(ci, pi, e.target.value)} placeholder="Point" />
                        <Button size="sm" variant="outline" onClick={() => deletePerkPoint(ci, pi)}>
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>)}
                  </div>
                  <div className="flex items-center justify-between">
                    <Button size="sm" variant="outline" onClick={() => addPerkPoint(ci)}>
                      <Plus className="w-3 h-3 mr-1" /> Add Point
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => deletePerkCard(ci)} className="border-red-500/30 text-red-400 hover:bg-red-500/10">
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>)}
          </div>
        </TabsContent>

        {/* Job Postings */}
        <TabsContent value="jobs" className="space-y-6">
          <Card hover className="p-6">
            <CardHeader>
              <CardTitle>Job Openings Section</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Section Title</label>
                <AdminInput value={jobOpeningsSection.title} onChange={e => setJobOpeningsSection({
                ...jobOpeningsSection,
                title: e.target.value
              })} placeholder="Section title" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Section Description</label>
                <AdminTextarea value={jobOpeningsSection.description} onChange={e => setJobOpeningsSection({
                ...jobOpeningsSection,
                description: e.target.value
              })} placeholder="Section description" rows={3} />
              </div>
            </CardContent>
          </Card>

          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Job Postings</h3>
            <Button onClick={addJobPosting} size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Job Posting
            </Button>
          </div>
          
          <div className="space-y-6">
            {jobPostings.map(job => <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Badge>{job.department}</Badge>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Edit className="w-3 h-3" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => deleteJobPosting(job.id)}>
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <AdminInput value={job.title} onChange={e => updateJobPosting(job.id, 'title', e.target.value)} placeholder="Job title" />
                      <AdminInput value={job.department} onChange={e => updateJobPosting(job.id, 'department', e.target.value)} placeholder="Department" />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <AdminInput value={job.type} onChange={e => updateJobPosting(job.id, 'type', e.target.value)} placeholder="Job type" />
                      <AdminInput value={job.location} onChange={e => updateJobPosting(job.id, 'location', e.target.value)} placeholder="Location" />
                      <AdminInput value={job.salary} onChange={e => updateJobPosting(job.id, 'salary', e.target.value)} placeholder="Salary range" />
                    </div>
                    
                    <AdminTextarea value={job.description} onChange={e => updateJobPosting(job.id, 'description', e.target.value)} placeholder="Job description" rows={3} />
                    
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-sm font-medium">Requirements</label>
                        <Button size="sm" variant="outline" onClick={() => addRequirement(job.id)}>
                          <Plus className="w-3 h-3 mr-1" />
                          Add Requirement
                        </Button>
                      </div>
                      <div className="space-y-2">
                        {job.requirements.map((requirement, reqIndex) => <div key={reqIndex} className="flex items-center space-x-2">
                            <AdminInput value={requirement} onChange={e => updateRequirement(job.id, reqIndex, e.target.value)} placeholder="Requirement" />
                            <Button size="sm" variant="outline" onClick={() => deleteRequirement(job.id, reqIndex)}>
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>)}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>)}
          </div>
        </TabsContent>

        {/* Preview Section */}
        <TabsContent value="preview" className="space-y-6">
          <Card hover className="p-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Eye className="w-5 h-5 mr-2" />
                Live Preview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-primary-black/50 rounded-lg p-6 border border-white/10">
                <div className="text-center space-y-4">
                  <h1 className="text-3xl font-bold text-white">
                    {heroContent.title}
                  </h1>
                  <p className="text-primary-gray text-lg max-w-2xl mx-auto">
                    {heroContent.subtitle}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button>
                      {heroContent.primaryCta}
                    </Button>
                    <Button variant="outline">
                      {heroContent.secondaryCta}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>;
}
