'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, Save, Eye, Upload, X } from "lucide-react";
import { pageApi, uploadApi, getAssetUrl } from "@/api";
import { useToast } from "@/hooks/use-toast";

// Custom styled input components for admin
const AdminInput = ({
  className = "",
  ...props
}) => <input className={`w-full px-4 py-3 bg-primary-slate/30 border border-white/20 rounded-xl text-white placeholder-primary-gray focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-primary-blue transition-all duration-200 hover:bg-primary-slate/40 ${className}`} {...props} />;
const AdminTextarea = ({
  className = "",
  ...props
}) => <textarea className={`w-full px-4 py-3 bg-primary-slate/30 border border-white/20 rounded-xl text-white placeholder-primary-gray focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-primary-blue resize-none transition-all duration-200 hover:bg-primary-slate/40 ${className}`} {...props} />;
export function AboutPageCMS() {
  const [heroContent, setHeroContent] = useState({
    title: 'About BlackCube Solutions LLC',
    subtitle: 'We are a leading IT solutions provider in Dubai, empowering businesses through innovative technology and digital transformation.',
    primaryCta: "Let's Talk",
    secondaryCta: 'View Services'
  });
  const [companyStats, setCompanyStats] = useState([{
    number: '100+',
    label: 'Projects Delivered'
  }, {
    number: '30+',
    label: 'Active Clients'
  }, {
    number: '10+',
    label: 'Industries Served'
  }, {
    number: '24/7',
    label: 'Support'
  }]);
  const [values, setValues] = useState([{
    id: 1,
    icon: 'Target',
    title: 'Mission',
    description: 'To empower businesses through innovative technology solutions that drive growth and success in the digital age.'
  }, {
    id: 2,
    icon: 'Eye',
    title: 'Vision',
    description: 'To be the leading digital transformation partner for businesses worldwide, recognized for excellence and innovation.'
  }, {
    id: 3,
    icon: 'Heart',
    title: 'Values',
    description: 'We believe in integrity, innovation, collaboration, and delivering exceptional value to our clients.'
  }]);
  const [milestones, setMilestones] = useState([{
    year: '2019',
    title: 'Company Founded',
    description: 'Started with a vision to transform businesses digitally'
  }, {
    year: '2020',
    title: 'First Major Project',
    description: 'Delivered our first enterprise-level web application'
  }, {
    year: '2021',
    title: 'Team Expansion',
    description: 'Grew our team to 15+ skilled professionals'
  }, {
    year: '2022',
    title: 'Award Recognition',
    description: 'Received Best IT Solutions Provider award'
  }, {
    year: '2023',
    title: 'Global Reach',
    description: 'Expanded services to international markets'
  }, {
    year: '2024',
    title: 'AI Integration',
    description: 'Launched AI-powered solutions for clients'
  }]);
  const [teamMembers, setTeamMembers] = useState([{
    id: 1,
    name: 'John Smith',
    position: 'CEO & Founder',
    bio: 'Visionary leader with 15+ years in tech',
    image: '',
    social: {
      linkedin: '#',
      twitter: '#',
      github: '#'
    }
  }, {
    id: 2,
    name: 'Sarah Johnson',
    position: 'CTO',
    bio: 'Technical expert specializing in cloud solutions',
    image: '',
    social: {
      linkedin: '#',
      twitter: '#',
      github: '#'
    }
  }]);
  const [whyChooseUs, setWhyChooseUs] = useState(['15+ Years of Combined Experience', '50+ Successful Projects Delivered', '24/7 Customer Support', 'Cutting-edge Technology Stack', 'Agile Development Methodology', 'Competitive Pricing']);
  const [journeySection, setJourneySection] = useState({
    title: 'Our Journey',
    subtitle: 'From humble beginnings to becoming a trusted partner for businesses worldwide.'
  });

  // Removed clients section per request

  const [teamSection, setTeamSection] = useState({
    title: 'Meet Our Team',
    subtitle: 'Our talented team of professionals is dedicated to delivering exceptional results for our clients.'
  });
  const [whyChooseUsSection, setWhyChooseUsSection] = useState({
    title: 'Why Choose BlackCube Solutions LLC?',
    subtitle: 'We combine technical expertise with business acumen to deliver solutions that drive real results.',
    stats: {
      satisfactionRate: '98%',
      satisfactionLabel: 'Client Satisfaction Rate',
      satisfactionSubtext: 'Based on 50+ completed projects',
      metrics: [{
        label: 'Project Delivery',
        percentage: 100
      }, {
        label: 'Code Quality',
        percentage: 98
      }, {
        label: 'Client Communication',
        percentage: 95
      }, {
        label: 'Support Response',
        percentage: 100
      }]
    }
  });
  const [ctaSection, setCtaSection] = useState({
    title: 'Ready to Work With Us?',
    subtitle: "Let's discuss your project and see how we can help you achieve your digital transformation goals.",
    primaryCta: 'Start Your Project',
    secondaryCta: 'View Our Services'
  });

  // Awards & Recognitions
  const [awards, setAwards] = useState([{
    date: 'July 2022',
    title: 'Best Digital Marketing Campaign',
    description: 'Awarded for an exceptional digital marketing campaign with outstanding results, showcasing our data-driven strategies and targeted marketing efforts that achieved remarkable business growth for our clients.',
    why: 'Data-driven strategies and targeted marketing efforts.'
  }, {
    date: 'January 2026',
    title: 'Innovative Tech Startup Award',
    description: 'Recognition of our pioneering efforts as a technology startup, acknowledging our commitment to exploring and implementing cutting-edge technologies to drive Innovation in the digital space.',
    why: 'Pioneering in the use of emerging technologies.'
  }]);

  // Achievements
  const [achievements, setAchievements] = useState([{
    number: '01',
    title: 'Foundation of BlackCube',
    date: 'October 2017',
    description: 'Recognition for outstanding contributions to the digital industry, celebrating our ability to deliver exceptional web design and development solutions that push the boundaries of creativity and functionality.'
  }, {
    number: '02',
    title: '100 Successful Projects',
    date: 'June 2018',
    description: 'We celebrated a significant milestone of completing 100 successful projects, marking our commitment to delivering excellence in every endeavor. Our diverse portfolio showcased our ability to cater to various industries and client requirements.'
  }, {
    number: '03',
    title: 'Expansion to International Markets',
    date: 'August 2019',
    description: 'We expanded our services to International clients, opening new avenues for growth and global collaboration. Our expansion into International markets solidified our position as a leading digital agency with a global footprint.'
  }, {
    number: '04',
    title: 'BlackCube Innovation Lab Inauguration',
    date: 'March 2021',
    description: 'To foster creativity and innovation, we inaugurated the BlackCube Innovation Lab. This state-of-the-art facility served as a hub for our team to ideate, experiment, and explore emerging technologies.'
  }]);
  const [loading, setLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState('idle');
  const {
    toast
  } = useToast();
  const [headings, setHeadings] = useState({
    awardsTitlePrefix: 'Our Awards &',
    awardsTitleHighlight: 'Recognitions',
    awardsDescription: "Witness the brilliance of our previous projects. Our portfolio showcases the successful collaborations we've had with diverse clients across various industries. Let our work speak for itself.",
    achievementsTitlePrefix: 'Our',
    achievementsTitleHighlight: 'Achievements',
    achievementsDescription: "Witness the brilliance of our previous projects. Our portfolio showcases the successful collaborations we've had with diverse clients across various industries. Let our work speak for itself.",
    teamTitlePrefix: 'Our',
    teamTitleHighlight: 'Team Members',
    teamDescription: 'Partnering with BlackCube offers a multitude of advantages. Experience increased brand visibility, improved customer engagement, and higher ROI. Our tailored solutions are designed to meet your unique business needs, ensuring lasting success.'
  });
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const response = await pageApi.get('about');
        if (response.success && response.data) {
          const fields = response.data.fields || [];
          fields.forEach(field => {
            if (field.id === 'heroContent' && field.value) setHeroContent(field.value);
            if (field.id === 'companyStats' && field.value) setCompanyStats(field.value);
            if (field.id === 'values' && field.value) setValues(field.value);
            if (field.id === 'milestones' && field.value) setMilestones(field.value);
            if (field.id === 'teamMembers' && field.value) setTeamMembers(field.value);
            if (field.id === 'whyChooseUs' && field.value) setWhyChooseUs(field.value);
            if (field.id === 'journeySection' && field.value) setJourneySection(field.value);
            if (field.id === 'teamSection' && field.value) setTeamSection(field.value);
            if (field.id === 'whyChooseUsSection' && field.value) setWhyChooseUsSection(field.value);
            if (field.id === 'ctaSection' && field.value) setCtaSection(field.value);
            if (field.id === 'awards' && field.value) setAwards(field.value);
            if (field.id === 'achievements' && field.value) setAchievements(field.value);
            if (field.id === 'headings' && field.value) setHeadings({
              ...headings,
              ...field.value
            });
          });
        }
      } catch (error) {
        console.error('Failed to load about page data:', error);
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
      const pageData = {
        id: 'about',
        title: 'About Page',
        fields: [{
          id: 'heroContent',
          label: 'Hero Content',
          type: 'object',
          value: heroContent
        }, {
          id: 'companyStats',
          label: 'Company Stats',
          type: 'array',
          value: companyStats
        }, {
          id: 'values',
          label: 'Values',
          type: 'array',
          value: values
        }, {
          id: 'milestones',
          label: 'Milestones',
          type: 'array',
          value: milestones
        }, {
          id: 'teamMembers',
          label: 'Team Members',
          type: 'array',
          value: teamMembers
        }, {
          id: 'whyChooseUs',
          label: 'Why Choose Us',
          type: 'array',
          value: whyChooseUs
        }, {
          id: 'journeySection',
          label: 'Journey Section',
          type: 'object',
          value: journeySection
        }, {
          id: 'teamSection',
          label: 'Team Section',
          type: 'object',
          value: teamSection
        }, {
          id: 'whyChooseUsSection',
          label: 'Why Choose Us Section',
          type: 'object',
          value: whyChooseUsSection
        }, {
          id: 'ctaSection',
          label: 'CTA Section',
          type: 'object',
          value: ctaSection
        }, {
          id: 'awards',
          label: 'Awards',
          type: 'array',
          value: awards
        }, {
          id: 'achievements',
          label: 'Achievements',
          type: 'array',
          value: achievements
        }, {
          id: 'headings',
          label: 'Section Headings',
          type: 'object',
          value: headings
        }]
      };
      await pageApi.update('about', pageData);
      setSaveStatus('success');
      toast({
        title: "Success!",
        description: "About page content saved successfully to database."
      });
      setTimeout(() => setSaveStatus('idle'), 2000);
    } catch (error) {
      console.error('Failed to save about page:', error);
      setSaveStatus('error');
      toast({
        title: "Error",
        description: error.message || "Failed to save about page content. Please try again.",
        variant: "destructive"
      });
      setTimeout(() => setSaveStatus('idle'), 2000);
    }
  };
  const addMilestone = () => {
    const newMilestone = {
      year: '2024',
      title: 'New Milestone',
      description: 'Milestone description'
    };
    setMilestones([...milestones, newMilestone]);
  };
  const updateMilestone = (index, field, value) => {
    const updated = [...milestones];
    updated[index] = {
      ...updated[index],
      [field]: value
    };
    setMilestones(updated);
  };
  const deleteMilestone = index => {
    setMilestones(milestones.filter((_, i) => i !== index));
  };
  const addTeamMember = () => {
    const newMember = {
      id: Date.now(),
      name: 'New Member',
      position: 'Position',
      bio: 'Bio description',
      image: '',
      social: {
        linkedin: '#',
        twitter: '#',
        github: '#'
      }
    };
    setTeamMembers([...teamMembers, newMember]);
  };
  const updateTeamMember = (id, field, value) => {
    setTeamMembers(teamMembers.map(m => m.id === id ? {
      ...m,
      [field]: value
    } : m));
  };
  const deleteTeamMember = id => {
    setTeamMembers(teamMembers.filter(m => m.id !== id));
  };

  // Image upload handler for team members
  const handleTeamMemberImageUpload = async (file, memberId) => {
    try {
      const res = await uploadApi.uploadImage(file, 'employees');
      if (res.success && res.data) {
        const imageUrl = res.data.url;
        updateTeamMember(memberId, 'image', imageUrl);
        toast({
          title: "Success",
          description: "Image uploaded successfully"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Failed to upload image",
        variant: "destructive"
      });
    }
  };
  const updateCompanyStat = (index, field, value) => {
    setCompanyStats(companyStats.map((stat, i) => i === index ? {
      ...stat,
      [field]: value
    } : stat));
  };
  const updateValue = (id, field, value) => {
    setValues(values.map(v => v.id === id ? {
      ...v,
      [field]: value
    } : v));
  };

  // Awards handlers
  const addAward = () => setAwards(prev => [...prev, {
    date: '',
    title: 'New Award',
    description: '',
    why: ''
  }]);
  const updateAward = (index, field, value) => {
    const updated = [...awards];
    updated[index] = {
      ...updated[index],
      [field]: value
    };
    setAwards(updated);
  };
  const deleteAward = index => setAwards(awards.filter((_, i) => i !== index));

  // Achievements handlers
  const addAchievement = () => setAchievements(prev => [...prev, {
    number: String(prev.length + 1).padStart(2, '0'),
    title: 'New Achievement',
    date: '',
    description: ''
  }]);
  const updateAchievement = (index, field, value) => {
    const updated = [...achievements];
    updated[index] = {
      ...updated[index],
      [field]: value
    };
    setAchievements(updated);
  };
  const deleteAchievement = index => setAchievements(achievements.filter((_, i) => i !== index));
  return <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">About Page CMS</h2>
        <Button onClick={handleSave} className="group" disabled={loading || saveStatus === 'saving'}>
          <Save className="w-4 h-4 mr-2" />
          {saveStatus === 'saving' ? 'Saving...' : saveStatus === 'success' ? 'Saved!' : saveStatus === 'error' ? 'Error' : 'Save Changes'}
        </Button>
      </div>

      <Tabs defaultValue="hero" className="w-full">
        <TabsList className="flex w-full overflow-x-auto justify-start hide-scrollbar gap-2 p-1 bg-primary-slate/30 rounded-xl mb-6">
          <TabsTrigger value="hero">Hero</TabsTrigger>
          <TabsTrigger value="stats">Stats</TabsTrigger>
          <TabsTrigger value="values">Values</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="awards">Awards</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="why-choose">Why Choose Us</TabsTrigger>
        </TabsList>

        {/* Hero Section */}
        <TabsContent value="hero" className="space-y-6">
          <Card hover className="p-6">
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-white">Hero Section Content</h4>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-white font-medium mb-2">Title</label>
                <AdminInput value={heroContent.title} onChange={e => setHeroContent({
                ...heroContent,
                title: e.target.value
              })} placeholder="Enter title" />
              </div>
              <div>
                <label className="block text-white font-medium mb-2">Subtitle</label>
                <AdminTextarea value={heroContent.subtitle} onChange={e => setHeroContent({
                ...heroContent,
                subtitle: e.target.value
              })} placeholder="Enter subtitle" rows={3} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white font-medium mb-2">Primary CTA</label>
                  <AdminInput value={heroContent.primaryCta} onChange={e => setHeroContent({
                  ...heroContent,
                  primaryCta: e.target.value
                })} placeholder="Primary CTA text" />
                </div>
                <div>
                  <label className="block text-white font-medium mb-2">Secondary CTA</label>
                  <AdminInput value={heroContent.secondaryCta} onChange={e => setHeroContent({
                  ...heroContent,
                  secondaryCta: e.target.value
                })} placeholder="Secondary CTA text" />
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Company Stats */}
        <TabsContent value="stats" className="space-y-6">
          <h3 className="text-lg font-semibold">Company Statistics</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {companyStats.map((stat, index) => <Card key={index} hover className="p-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-white font-medium mb-2">Number</label>
                    <AdminInput value={stat.number} onChange={e => updateCompanyStat(index, 'number', e.target.value)} placeholder="Number" />
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2">Label</label>
                    <AdminInput value={stat.label} onChange={e => updateCompanyStat(index, 'label', e.target.value)} placeholder="Label" />
                  </div>
                </div>
              </Card>)}
          </div>
        </TabsContent>

        {/* Values Section */}
        <TabsContent value="values" className="space-y-6">
          <h3 className="text-lg font-semibold">Mission, Vision & Values</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {values.map(value => <Card key={value.id} hover className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge className="bg-primary-blue/20 text-primary-blue border-primary-blue/30">{value.icon}</Badge>
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2">Title</label>
                    <AdminInput value={value.title} onChange={e => updateValue(value.id, 'title', e.target.value)} placeholder="Title" />
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2">Description</label>
                    <AdminTextarea value={value.description} onChange={e => updateValue(value.id, 'description', e.target.value)} placeholder="Description" rows={3} />
                  </div>
                </div>
              </Card>)}
          </div>
        </TabsContent>

        {/* Timeline Section */}
        <TabsContent value="timeline" className="space-y-6">
          <Card hover className="p-6">
            <div className="mb-4">
              <h4 className="text-lg font-semibold text-white">Journey Section Heading</h4>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-white font-medium mb-2">Title</label>
                <AdminInput value={journeySection.title} onChange={e => setJourneySection({
                ...journeySection,
                title: e.target.value
              })} placeholder="Our Journey" />
              </div>
              <div>
                <label className="block text-white font-medium mb-2">Subtitle</label>
                <AdminTextarea value={journeySection.subtitle} onChange={e => setJourneySection({
                ...journeySection,
                subtitle: e.target.value
              })} placeholder="Journey subtitle" rows={3} />
              </div>
            </div>
          </Card>

          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Company Timeline</h3>
            <Button onClick={addMilestone} size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Milestone
            </Button>
          </div>

          <div className="space-y-4">
            {milestones.map((milestone, index) => <Card key={index} hover className="p-6">
                <CardContent className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <AdminInput value={milestone.year} onChange={e => updateMilestone(index, 'year', e.target.value)} placeholder="Year" />
                    <AdminInput value={milestone.title} onChange={e => updateMilestone(index, 'title', e.target.value)} placeholder="Title" />
                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="outline" onClick={() => deleteMilestone(index)} className="border-red-500/30 text-red-400 hover:bg-red-500/10">
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                  <AdminTextarea value={milestone.description} onChange={e => updateMilestone(index, 'description', e.target.value)} placeholder="Description" rows={2} className="mt-4" />
                </CardContent>
              </Card>)}
          </div>

          {/* Section Headings (Awards, Achievements, Team) */}
          <Card hover className="p-6">
            <CardHeader>
              <CardTitle>Section Headings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Awards */}
              <div>
                <div className="mb-3 text-white font-semibold">Awards</div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <AdminInput value={headings.awardsTitlePrefix} onChange={e => setHeadings({
                  ...headings,
                  awardsTitlePrefix: e.target.value
                })} placeholder="Title prefix (e.g., Our Awards &)" />
                  <AdminInput value={headings.awardsTitleHighlight} onChange={e => setHeadings({
                  ...headings,
                  awardsTitleHighlight: e.target.value
                })} placeholder="Title highlight (e.g., Recognitions)" />
                </div>
                <div className="mt-3">
                  <AdminTextarea rows={3} value={headings.awardsDescription} onChange={e => setHeadings({
                  ...headings,
                  awardsDescription: e.target.value
                })} placeholder="Section description" />
                </div>
              </div>

              {/* Achievements */}
              <div>
                <div className="mb-3 text-white font-semibold">Achievements</div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <AdminInput value={headings.achievementsTitlePrefix} onChange={e => setHeadings({
                  ...headings,
                  achievementsTitlePrefix: e.target.value
                })} placeholder="Title prefix (e.g., Our)" />
                  <AdminInput value={headings.achievementsTitleHighlight} onChange={e => setHeadings({
                  ...headings,
                  achievementsTitleHighlight: e.target.value
                })} placeholder="Title highlight (e.g., Achievements)" />
                </div>
                <div className="mt-3">
                  <AdminTextarea rows={3} value={headings.achievementsDescription} onChange={e => setHeadings({
                  ...headings,
                  achievementsDescription: e.target.value
                })} placeholder="Section description" />
                </div>
              </div>

              {/* Team */}
              <div>
                <div className="mb-3 text-white font-semibold">Team</div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <AdminInput value={headings.teamTitlePrefix} onChange={e => setHeadings({
                  ...headings,
                  teamTitlePrefix: e.target.value
                })} placeholder="Title prefix (e.g., Our)" />
                  <AdminInput value={headings.teamTitleHighlight} onChange={e => setHeadings({
                  ...headings,
                  teamTitleHighlight: e.target.value
                })} placeholder="Title highlight (e.g., Team Members)" />
                </div>
                <div className="mt-3">
                  <AdminTextarea rows={3} value={headings.teamDescription} onChange={e => setHeadings({
                  ...headings,
                  teamDescription: e.target.value
                })} placeholder="Section description" />
                </div>
              </div>
            </CardContent>
          </Card>

        </TabsContent>

        {/* Team Section */}
        <TabsContent value="team" className="space-y-6">
          <Card hover className="p-6">
            <div className="mb-4">
              <h4 className="text-lg font-semibold text-white">Team Section Heading</h4>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-white font-medium mb-2">Title</label>
                <AdminInput value={teamSection.title} onChange={e => setTeamSection({
                ...teamSection,
                title: e.target.value
              })} placeholder="Meet Our Team" />
              </div>
              <div>
                <label className="block text-white font-medium mb-2">Subtitle</label>
                <AdminTextarea value={teamSection.subtitle} onChange={e => setTeamSection({
                ...teamSection,
                subtitle: e.target.value
              })} placeholder="Team subtitle" rows={3} />
              </div>
            </div>
          </Card>

          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Team Members</h3>
            <Button onClick={addTeamMember} size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Member
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {teamMembers.map(member => <Card key={member.id} hover className="p-6">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Badge className="bg-primary-blue/20 text-primary-blue border-primary-blue/30">Team Member</Badge>
                      <Button size="sm" variant="outline" onClick={() => deleteTeamMember(member.id)} className="border-red-500/30 text-red-400 hover:bg-red-500/10">
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                    <AdminInput value={member.name} onChange={e => updateTeamMember(member.id, 'name', e.target.value)} placeholder="Name" />
                    <AdminInput value={member.position} onChange={e => updateTeamMember(member.id, 'position', e.target.value)} placeholder="Position" />
                    <AdminTextarea value={member.bio} onChange={e => updateTeamMember(member.id, 'bio', e.target.value)} placeholder="Bio" rows={2} />
                    <div>
                      <label className="block text-white font-medium mb-2">Profile Image</label>
                      {member.image ? <div className="relative mb-2">
                          <img src={getAssetUrl(member.image)} alt={member.name} className="w-full h-48 object-cover rounded-lg" />
                          <button onClick={() => updateTeamMember(member.id, 'image', '')} className="absolute top-2 right-2 p-1 bg-red-500 rounded-full text-white hover:bg-red-600">
                            <X className="w-4 h-4" />
                          </button>
                        </div> : null}
                      <label className="flex items-center justify-center w-full px-4 py-2 bg-primary-slate/30 border border-white/20 rounded-xl cursor-pointer hover:bg-primary-slate/40 transition">
                        <Upload className="w-4 h-4 mr-2" />
                        <span className="text-sm">Upload Image</span>
                        <input type="file" accept="image/*" className="hidden" onChange={e => {
                      const file = e.target.files?.[0];
                      if (file) handleTeamMemberImageUpload(file, member.id);
                    }} />
                      </label>
                    </div>
                  </div>
                </CardContent>
              </Card>)}
          </div>
        </TabsContent>

        {/* Awards Section */}
        <TabsContent value="awards" className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Awards & Recognitions</h3>
            <Button onClick={addAward} size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Award
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {awards.map((award, index) => <Card key={index} hover className="p-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white font-medium mb-2">Date</label>
                      <AdminInput value={award.date} onChange={e => updateAward(index, 'date', e.target.value)} placeholder="e.g., July 2022" />
                    </div>
                    <div>
                      <label className="block text-white font-medium mb-2">Title</label>
                      <AdminInput value={award.title} onChange={e => updateAward(index, 'title', e.target.value)} placeholder="Award title" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2">Description</label>
                    <AdminTextarea value={award.description} onChange={e => updateAward(index, 'description', e.target.value)} rows={3} placeholder="Award description" />
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2">Why</label>
                    <AdminTextarea value={award.why} onChange={e => updateAward(index, 'why', e.target.value)} rows={2} placeholder="Reason/why" />
                  </div>
                  <div className="flex justify-end">
                    <Button size="sm" variant="outline" onClick={() => deleteAward(index)} className="border-red-500/30 text-red-400 hover:bg-red-500/10">
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </Card>)}
          </div>
        </TabsContent>

        {/* Achievements Section */}
        <TabsContent value="achievements" className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Achievements</h3>
            <Button onClick={addAchievement} size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Achievement
            </Button>
          </div>
          <div className="space-y-4">
            {achievements.map((item, index) => <Card key={index} hover className="p-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-white font-medium mb-2">Number</label>
                      <AdminInput value={item.number} onChange={e => updateAchievement(index, 'number', e.target.value)} placeholder="01" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-white font-medium mb-2">Title</label>
                      <AdminInput value={item.title} onChange={e => updateAchievement(index, 'title', e.target.value)} placeholder="Achievement title" />
                    </div>
                    <div>
                      <label className="block text-white font-medium mb-2">Date</label>
                      <AdminInput value={item.date} onChange={e => updateAchievement(index, 'date', e.target.value)} placeholder="Month Year" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2">Description</label>
                    <AdminTextarea value={item.description} onChange={e => updateAchievement(index, 'description', e.target.value)} rows={3} placeholder="Description" />
                  </div>
                  <div className="flex justify-end">
                    <Button size="sm" variant="outline" onClick={() => deleteAchievement(index)} className="border-red-500/30 text-red-400 hover:bg-red-500/10">
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </Card>)}
          </div>
        </TabsContent>

        {/* Why Choose Us Section */}
        <TabsContent value="why-choose" className="space-y-6">
          <Card hover className="p-6">
            <CardHeader>
              <CardTitle>Why Choose Us Section</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Section Title</label>
                <AdminInput value={whyChooseUsSection.title} onChange={e => setWhyChooseUsSection({
                ...whyChooseUsSection,
                title: e.target.value
              })} placeholder="Enter section title" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Section Subtitle</label>
                <AdminTextarea value={whyChooseUsSection.subtitle} onChange={e => setWhyChooseUsSection({
                ...whyChooseUsSection,
                subtitle: e.target.value
              })} placeholder="Enter section subtitle" rows={3} />
              </div>
            </CardContent>
          </Card>

          <Card hover className="p-6">
            <CardHeader>
              <CardTitle>Why Choose Us Points</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {whyChooseUs.map((point, index) => <div key={index} className="flex items-center space-x-2">
                    <AdminInput value={point} onChange={e => {
                  const updated = [...whyChooseUs];
                  updated[index] = e.target.value;
                  setWhyChooseUs(updated);
                }} placeholder="Why choose us point" />
                    <Button size="sm" variant="outline" onClick={() => setWhyChooseUs(whyChooseUs.filter((_, i) => i !== index))} className="border-red-500/30 text-red-400 hover:bg-red-500/10">
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>)}
              </div>
              <Button onClick={() => setWhyChooseUs([...whyChooseUs, ''])} size="sm" className="mt-4">
                <Plus className="w-4 h-4 mr-2" />
                Add Point
              </Button>
            </CardContent>
          </Card>

          <Card hover className="p-6">
            <CardHeader>
              <CardTitle>Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Satisfaction Rate</label>
                  <AdminInput value={whyChooseUsSection.stats.satisfactionRate} onChange={e => setWhyChooseUsSection({
                  ...whyChooseUsSection,
                  stats: {
                    ...whyChooseUsSection.stats,
                    satisfactionRate: e.target.value
                  }
                })} placeholder="98%" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Satisfaction Label</label>
                  <AdminInput value={whyChooseUsSection.stats.satisfactionLabel} onChange={e => setWhyChooseUsSection({
                  ...whyChooseUsSection,
                  stats: {
                    ...whyChooseUsSection.stats,
                    satisfactionLabel: e.target.value
                  }
                })} placeholder="Client Satisfaction Rate" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Satisfaction Subtext</label>
                  <AdminInput value={whyChooseUsSection.stats.satisfactionSubtext} onChange={e => setWhyChooseUsSection({
                  ...whyChooseUsSection,
                  stats: {
                    ...whyChooseUsSection.stats,
                    satisfactionSubtext: e.target.value
                  }
                })} placeholder="Based on 50+ completed projects" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Metrics</label>
                <div className="space-y-4">
                  {whyChooseUsSection.stats.metrics.map((metric, index) => <div key={index} className="flex items-center space-x-2">
                      <AdminInput value={metric.label} onChange={e => {
                    const updated = [...whyChooseUsSection.stats.metrics];
                    updated[index] = {
                      ...updated[index],
                      label: e.target.value
                    };
                    setWhyChooseUsSection({
                      ...whyChooseUsSection,
                      stats: {
                        ...whyChooseUsSection.stats,
                        metrics: updated
                      }
                    });
                  }} placeholder="Metric label" className="flex-1" />
                      <AdminInput value={metric.percentage} onChange={e => {
                    const updated = [...whyChooseUsSection.stats.metrics];
                    updated[index] = {
                      ...updated[index],
                      percentage: parseInt(e.target.value) || 0
                    };
                    setWhyChooseUsSection({
                      ...whyChooseUsSection,
                      stats: {
                        ...whyChooseUsSection.stats,
                        metrics: updated
                      }
                    });
                  }} placeholder="Percentage" type="number" className="w-24" />
                      <Button size="sm" variant="outline" onClick={() => {
                    const updated = whyChooseUsSection.stats.metrics.filter((_, i) => i !== index);
                    setWhyChooseUsSection({
                      ...whyChooseUsSection,
                      stats: {
                        ...whyChooseUsSection.stats,
                        metrics: updated
                      }
                    });
                  }} className="border-red-500/30 text-red-400 hover:bg-red-500/10">
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>)}
                </div>
                <Button onClick={() => setWhyChooseUsSection({
                ...whyChooseUsSection,
                stats: {
                  ...whyChooseUsSection.stats,
                  metrics: [...whyChooseUsSection.stats.metrics, {
                    label: 'New Metric',
                    percentage: 0
                  }]
                }
              })} size="sm" className="mt-4">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Metric
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card hover className="p-6">
            <CardHeader>
              <CardTitle>CTA Section</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">CTA Title</label>
                <AdminInput value={ctaSection.title} onChange={e => setCtaSection({
                ...ctaSection,
                title: e.target.value
              })} placeholder="Enter CTA title" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">CTA Subtitle</label>
                <AdminTextarea value={ctaSection.subtitle} onChange={e => setCtaSection({
                ...ctaSection,
                subtitle: e.target.value
              })} placeholder="Enter CTA subtitle" rows={3} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Primary CTA</label>
                  <AdminInput value={ctaSection.primaryCta} onChange={e => setCtaSection({
                  ...ctaSection,
                  primaryCta: e.target.value
                })} placeholder="Primary CTA text" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Secondary CTA</label>
                  <AdminInput value={ctaSection.secondaryCta} onChange={e => setCtaSection({
                  ...ctaSection,
                  secondaryCta: e.target.value
                })} placeholder="Secondary CTA text" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Preview Section */}
        <TabsContent value="preview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Eye className="w-5 h-5 mr-2" />
                Live Preview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Hero Preview */}
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

              {/* Stats Preview */}
              <div className="bg-primary-slate/30 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Company Statistics</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  {companyStats.map((stat, index) => <div key={index}>
                      <div className="text-2xl font-bold text-primary-blue mb-1">{stat.number}</div>
                      <div className="text-primary-gray text-sm">{stat.label}</div>
                    </div>)}
                </div>
              </div>

              {/* Values Preview */}
              <div className="bg-primary-black/50 rounded-lg p-6 border border-white/10">
                <h3 className="text-lg font-semibold mb-4">Mission, Vision & Values</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {values.map(value => <div key={value.id} className="text-center p-4 bg-primary-slate/20 rounded-lg">
                      <div className="w-12 h-12 bg-primary-blue rounded-lg flex items-center justify-center mx-auto mb-3">
                        <span className="text-white text-sm">{value.icon}</span>
                      </div>
                      <h4 className="text-lg font-semibold text-white mb-2">{value.title}</h4>
                      <p className="text-primary-gray text-sm">{value.description}</p>
                    </div>)}
                </div>
              </div>

              {/* Journey Preview */}
              <div className="bg-primary-slate/30 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">{journeySection.title}</h3>
                <p className="text-primary-gray mb-4">{journeySection.subtitle}</p>
                <div className="space-y-2">
                  {milestones.slice(0, 3).map((milestone, index) => <div key={index} className="flex items-center space-x-3 p-2 bg-primary-black/30 rounded">
                      <div className="w-8 h-8 bg-primary-blue rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">{milestone.year}</span>
                      </div>
                      <div>
                        <div className="text-white font-medium">{milestone.title}</div>
                        <div className="text-primary-gray text-sm">{milestone.description}</div>
                      </div>
                    </div>)}
                </div>
              </div>

              {/* Team Preview */}
              <div className="bg-primary-slate/30 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">{teamSection.title}</h3>
                <p className="text-primary-gray mb-4">{teamSection.subtitle}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {teamMembers.slice(0, 2).map(member => <div key={member.id} className="text-center p-4 bg-primary-black/30 rounded-lg">
                      <div className="w-12 h-12 bg-primary-blue rounded-full flex items-center justify-center mx-auto mb-2">
                        <span className="text-white text-sm">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <h4 className="text-white font-medium">{member.name}</h4>
                      <p className="text-primary-blue text-sm">{member.position}</p>
                      <p className="text-primary-gray text-xs mt-1">{member.bio}</p>
                    </div>)}
                </div>
              </div>

              {/* Why Choose Us Preview */}
              <div className="bg-primary-black/50 rounded-lg p-6 border border-white/10">
                <h3 className="text-lg font-semibold mb-4">{whyChooseUsSection.title}</h3>
                <p className="text-primary-gray mb-4">{whyChooseUsSection.subtitle}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="space-y-2">
                      {whyChooseUs.slice(0, 3).map((point, index) => <div key={index} className="flex items-center space-x-2">
                          <div className="w-4 h-4 bg-primary-blue rounded-full"></div>
                          <span className="text-primary-gray text-sm">{point}</span>
                        </div>)}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-2">
                      {whyChooseUsSection.stats.satisfactionRate}
                    </div>
                    <div className="text-primary-gray text-sm mb-2">
                      {whyChooseUsSection.stats.satisfactionLabel}
                    </div>
                    <div className="text-primary-gray text-xs">
                      {whyChooseUsSection.stats.satisfactionSubtext}
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA Preview */}
              <div className="bg-gradient-to-r from-primary-blue/10 to-primary-purple/10 rounded-lg p-6 text-center">
                <h3 className="text-lg font-semibold text-white mb-2">{ctaSection.title}</h3>
                <p className="text-primary-gray mb-4">{ctaSection.subtitle}</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="sm">{ctaSection.primaryCta}</Button>
                  <Button variant="outline" size="sm">{ctaSection.secondaryCta}</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>;
}
