'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, Save, Edit, Upload, X } from "lucide-react";
import { pageApi, uploadApi, getAssetUrl } from '@/api';
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
export function ServicesPageCMS() {
  const [heroContent, setHeroContent] = useState({
    title: 'Our Services',
    subtitle: 'Comprehensive digital solutions to help your business grow and succeed.',
    primaryCta: 'Start a Project',
    secondaryCta: 'View Work'
  });
  const [statsCounters, setStatsCounters] = useState([{
    number: '500+',
    label: 'Projects Delivered'
  }, {
    number: '98%',
    label: 'Client Satisfaction'
  }, {
    number: '50+',
    label: 'Industry Awards'
  }, {
    number: '200+',
    label: 'Expert Team'
  }]);
  const [headings, setHeadings] = useState({
    servicesGridTitlePrefix: 'Our',
    servicesGridTitleHighlight: 'Services',
    servicesGridDescription: 'Comprehensive digital solutions tailored to transform your business and drive growth',
    categoriesTitlePrefix: 'Categories of',
    categoriesTitleHighlight: 'Services',
    categoriesDescription: 'At BlackCube Solutions LLC, we are committed to delivering exceptional digital solutions that drive your business forward. Our comprehensive range of services includes web design, app development, web development, and marketing solutions tailored to meet your unique needs.',
    testimonialsTitlePrefix: 'What Our',
    testimonialsTitleHighlight: 'Clients Say',
    testimonialsDescription: 'Hear what our clients say about working with BlackCube Solutions LLC.',
    industriesTitlePrefix: 'Industries',
    industriesTitleHighlight: 'We Serve',
    industriesDescription: 'We work across various industries to deliver tailored digital solutions.',
    processTitlePrefix: 'Our',
    processTitleHighlight: 'Process',
    processDescription: 'A systematic approach to deliver exceptional results',
    faqTitlePrefix: 'Frequently',
    faqTitleHighlight: 'Asked Questions',
    faqDescription: "Got questions? We've got answers. Learn more about our process and services below.",
    ctaTitlePrefix: 'Ready to Start Your',
    ctaTitleHighlight: 'Project?',
    ctaDescription: "Let's discuss how we can help transform your business with our comprehensive digital solutions",
    ctaPrimary: 'Get Started Today',
    ctaSecondary: 'Schedule Consultation'
  });
  const updateHeading = (field, value) => setHeadings(prev => ({
    ...prev,
    [field]: value
  }));

  // Editable filter categories
  const [serviceCategories, setServiceCategories] = useState(['All', 'Development', 'Design', 'Marketing', 'Infrastructure', 'E-commerce']);
  const [services, setServices] = useState([{
    id: 1,
    icon: 'Globe',
    title: 'Web Development',
    description: 'Custom websites and web applications built with modern technologies',
    category: 'Development',
    features: ['Responsive Design', 'SEO Optimization', 'Performance Optimization', 'Cross-browser Compatibility']
  }, {
    id: 2,
    icon: 'Smartphone',
    title: 'Mobile App Development',
    description: 'Native and cross-platform mobile applications for iOS and Android',
    category: 'Development',
    features: ['iOS Development', 'Android Development', 'React Native', 'Flutter Development']
  }, {
    id: 3,
    icon: 'Palette',
    title: 'UI/UX Design',
    description: 'Beautiful and intuitive user interfaces that engage and convert',
    category: 'Design',
    features: ['User Research', 'Wireframing', 'Prototyping', 'Visual Design']
  }]);
  const [testimonials, setTestimonials] = useState([{
    id: 1,
    name: 'Moonkle LTD',
    role: 'Client of Company',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&crop=face',
    text: 'Very well thought out and articulate communication. Clear milestones, deadlines and fast work.'
  }, {
    id: 2,
    name: 'SoftTech',
    role: 'Manager of Company',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=face',
    text: 'Patience. Infinite patience. Clear and articulate communication. Great milestones and a very effective design process.'
  }]);
  const [industries, setIndustries] = useState([{
    title: 'FinTech',
    desc: 'Payments, wallets, trading dashboards and KYC onboarding.'
  }, {
    title: 'Healthcare',
    desc: 'HIPAA-conscious apps, patient portals and telemedicine.'
  }, {
    title: 'E‑commerce',
    desc: 'Headless storefronts, integrations and analytics.'
  }, {
    title: 'Education',
    desc: 'LMS, live classes and assessment tooling.'
  }]);
  const [clientsSection, setClientsSection] = useState({
    subtitle: headings.testimonialsTitlePrefix,
    title: `${headings.testimonialsTitlePrefix} ${headings.testimonialsTitleHighlight}`
  });
  const [industriesSection, setIndustriesSection] = useState({
    subtitle: headings.industriesTitlePrefix.toUpperCase(),
    title: `${headings.industriesTitlePrefix} ${headings.industriesTitleHighlight}`
  });

  // FAQ
  const [faqSection, setFaqSection] = useState({
    subtitle: headings.faqTitlePrefix,
    title: `${headings.faqTitlePrefix} ${headings.faqTitleHighlight}`
  });
  const [faqs, setFaqs] = useState([{
    q: 'How do you estimate project timelines?',
    a: 'We break work into milestones and provide a clear timeline after discovery and planning.'
  }, {
    q: 'Do you provide post‑launch support?',
    a: 'Yes, we include post‑launch support SLAs and flexible maintenance retainers.'
  }, {
    q: 'What technologies do you use?',
    a: 'We use React/Next.js, Node/Python, modern databases, cloud (AWS) and CI/CD best practices.'
  }, {
    q: 'Can you work with existing systems?',
    a: 'Absolutely. We integrate with legacy systems and plan phased modernization where needed.'
  }]);

  // Process + Tech Stack
  const [processSection, setProcessSection] = useState({
    title: 'Our Process',
    subtitle: 'We follow a proven methodology to ensure successful project delivery and client satisfaction.'
  });
  const [processSteps, setProcessSteps] = useState([{
    step: '01',
    title: 'Discovery',
    description: 'We understand your business goals, requirements, and challenges through detailed consultation.',
    icon: '🎯'
  }, {
    step: '02',
    title: 'Planning',
    description: 'We create a detailed project plan with timelines, milestones, and resource allocation.',
    icon: '📝'
  }, {
    step: '03',
    title: 'Execution',
    description: 'Our team builds your solution using cutting-edge technologies and best practices.',
    icon: '⚙️'
  }, {
    step: '04',
    title: 'Launch',
    description: 'We deploy your solution and provide ongoing support to ensure optimal performance.',
    icon: '🚀'
  }]);
  const [techStackSection, setTechStackSection] = useState({
    title: 'Technology Stack',
    subtitle: 'We use the latest technologies and frameworks to build robust, scalable, and secure solutions.'
  });
  const [technologies, setTechnologies] = useState([{
    name: 'React',
    category: 'Frontend'
  }, {
    name: 'Next.js',
    category: 'Frontend'
  }, {
    name: 'Node.js',
    category: 'Backend'
  }, {
    name: 'Python',
    category: 'Backend'
  }, {
    name: 'MongoDB',
    category: 'Database'
  }, {
    name: 'PostgreSQL',
    category: 'Database'
  }, {
    name: 'AWS',
    category: 'Cloud'
  }, {
    name: 'Docker',
    category: 'DevOps'
  }, {
    name: 'Figma',
    category: 'Design'
  }, {
    name: 'Git',
    category: 'Version Control'
  }, {
    name: 'TypeScript',
    category: 'Language'
  }, {
    name: 'Tailwind',
    category: 'Styling'
  }]);

  // Bottom CTA (page has a large CTA)
  const [ctaSection, setCtaSection] = useState({
    titlePrefix: headings.ctaTitlePrefix,
    titleHighlight: headings.ctaTitleHighlight,
    subtitle: headings.ctaDescription,
    primaryCta: headings.ctaPrimary,
    secondaryCta: headings.ctaSecondary
  });

  // Category Tabs with portfolio subsections

  const [serviceTabs, setServiceTabs] = useState([{
    id: 'Web Design',
    label: 'Web Design',
    intro: 'Web design that blends aesthetics with usability for engaging experiences.',
    keyFeatures: [{
      title: 'Customized Design',
      desc: 'Tailored to your brand and goals.'
    }, {
      title: 'Responsive Design',
      desc: 'Looks great on all devices.'
    }],
    process: [{
      title: 'Discovery & Planning',
      desc: 'Understand goals and users.'
    }, {
      title: 'Wireframing & Prototyping',
      desc: 'Visualize layout and flows.'
    }],
    portfolioTitle: 'Web Design Portfolio',
    portfolioSubtext: 'Check out some of our most recent Web Design projects in the table below',
    thumbnails: ['', ''],
    portfolioCtaText: 'View All Projects',
    tableRows: [{
      name: 'GlobalTech Solutions',
      industry: 'E-commerce',
      url: 'www.globaltechsolutions.com'
    }, {
      name: 'GreenEarth Eco Store',
      industry: 'Design Agency',
      url: 'www.greenearthecostore.com'
    }, {
      name: 'TechGuru Inc.',
      industry: 'Technology',
      url: 'www.techguruinc.com'
    }]
  }, {
    id: 'Web Development',
    label: 'Web Development',
    intro: 'Modern, scalable web apps built with best practices.',
    keyFeatures: [{
      title: 'Modern Technologies',
      desc: 'React, Next.js, Node.js and more.'
    }, {
      title: 'Scalable Architecture',
      desc: 'Built to grow with you.'
    }],
    process: [{
      title: 'Architecture & Design',
      desc: 'Solid foundations and data models.'
    }, {
      title: 'Testing & Deployment',
      desc: 'Quality and smooth launch.'
    }],
    portfolioTitle: 'Web Development Portfolio',
    portfolioSubtext: 'Check out some of our most recent Web Development projects in the table below',
    thumbnails: ['', ''],
    portfolioCtaText: 'View All Projects',
    tableRows: [{
      name: 'E-Commerce Platform',
      industry: 'Retail',
      url: 'www.ecommerceplatform.com'
    }, {
      name: 'SaaS Dashboard',
      industry: 'Technology',
      url: 'www.saasdashboard.com'
    }, {
      name: 'Healthcare Portal',
      industry: 'Healthcare',
      url: 'www.healthcareportal.com'
    }]
  }, {
    id: 'Mobile App Development',
    label: 'Mobile App Development',
    intro: 'Native and cross-platform apps focused on UX and performance.',
    keyFeatures: [{
      title: 'Native Development',
      desc: 'Swift, Kotlin and modern stacks.'
    }, {
      title: 'Cross-Platform',
      desc: 'React Native and Flutter.'
    }],
    process: [{
      title: 'UI/UX Design',
      desc: 'Prototypes for optimal UX.'
    }, {
      title: 'Testing & Launch',
      desc: 'Device testing and store release.'
    }],
    portfolioTitle: 'Mobile App Development Portfolio',
    portfolioSubtext: 'Check out some of our most recent Mobile App Development projects in the table below',
    thumbnails: ['', ''],
    portfolioCtaText: 'View All Projects',
    tableRows: [{
      name: 'Fitness Tracker App',
      industry: 'Health & Fitness',
      url: 'appstore.com/fitnesstracker'
    }, {
      name: 'Food Delivery App',
      industry: 'Food & Beverage',
      url: 'appstore.com/fooddelivery'
    }, {
      name: 'Banking App',
      industry: 'Finance',
      url: 'appstore.com/bankingapp'
    }]
  }, {
    id: 'Digital Marketing',
    label: 'Digital Marketing',
    intro: 'Data-driven strategies to reach and convert your audience.',
    keyFeatures: [{
      title: 'SEO & SEM',
      desc: 'Improve rankings and traffic.'
    }, {
      title: 'Content Marketing',
      desc: 'Create content that converts.'
    }],
    process: [{
      title: 'Discovery & Strategy',
      desc: 'Market research and planning.'
    }, {
      title: 'Analysis & Optimization',
      desc: 'Measure and improve ROI.'
    }],
    portfolioTitle: 'Digital Marketing Portfolio',
    portfolioSubtext: 'Check out some of our most recent Digital Marketing campaigns in the table below',
    thumbnails: ['', ''],
    portfolioCtaText: 'View All Campaigns',
    tableRows: [{
      name: 'E-Commerce SEO Campaign',
      industry: 'Retail',
      url: 'results: 300% Traffic Increase'
    }, {
      name: 'Social Media Marketing',
      industry: 'Technology',
      url: 'results: 500K+ Reach'
    }, {
      name: 'Content Marketing Strategy',
      industry: 'Healthcare',
      url: 'results: 200% Lead Generation'
    }]
  }]);
  const [loading, setLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState('idle');
  const {
    toast
  } = useToast();
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const response = await pageApi.get('services');
        if (response.success && response.data) {
          const fields = response.data.fields || [];
          fields.forEach(field => {
            if (field.id === 'heroContent' && field.value) setHeroContent(field.value);
            if (field.id === 'statsCounters' && field.value) setStatsCounters(field.value);
            if (field.id === 'headings' && field.value) setHeadings(field.value);
            if (field.id === 'serviceCategories' && field.value) setServiceCategories(field.value);
            if (field.id === 'services' && field.value) setServices(field.value);
            if (field.id === 'testimonials' && field.value) setTestimonials(field.value);
            if (field.id === 'industries' && field.value) setIndustries(field.value);
            if (field.id === 'clientsSection' && field.value) setClientsSection(field.value);
            if (field.id === 'industriesSection' && field.value) setIndustriesSection(field.value);
            if (field.id === 'faqSection' && field.value) setFaqSection(field.value);
            if (field.id === 'faqs' && field.value) setFaqs(field.value);
            if (field.id === 'processSection' && field.value) setProcessSection(field.value);
            if (field.id === 'processSteps' && field.value) setProcessSteps(field.value);
            if (field.id === 'techStackSection' && field.value) setTechStackSection(field.value);
            if (field.id === 'technologies' && field.value) setTechnologies(field.value);
            if (field.id === 'ctaSection' && field.value) setCtaSection(field.value);
            if (field.id === 'serviceTabs' && field.value) setServiceTabs(field.value);
          });
        }
      } catch (error) {
        console.error('Failed to load services page data:', error);
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
        id: 'services',
        title: 'Services Page',
        fields: [{
          id: 'heroContent',
          label: 'Hero Content',
          type: 'object',
          value: heroContent
        }, {
          id: 'statsCounters',
          label: 'Stats Counters',
          type: 'array',
          value: statsCounters
        }, {
          id: 'headings',
          label: 'Section Headings',
          type: 'object',
          value: headings
        }, {
          id: 'serviceCategories',
          label: 'Service Categories',
          type: 'array',
          value: serviceCategories
        }, {
          id: 'services',
          label: 'Services',
          type: 'array',
          value: services
        }, {
          id: 'industries',
          label: 'Industries',
          type: 'array',
          value: industries
        }, {
          id: 'industriesSection',
          label: 'Industries Section',
          type: 'object',
          value: industriesSection
        }, {
          id: 'faqs',
          label: 'FAQs',
          type: 'array',
          value: faqs
        }, {
          id: 'processSection',
          label: 'Process Section',
          type: 'object',
          value: processSection
        }, {
          id: 'processSteps',
          label: 'Process Steps',
          type: 'array',
          value: processSteps
        }, {
          id: 'techStackSection',
          label: 'Tech Stack Section',
          type: 'object',
          value: techStackSection
        }, {
          id: 'technologies',
          label: 'Technologies',
          type: 'array',
          value: technologies
        }, {
          id: 'ctaSection',
          label: 'CTA Section',
          type: 'object',
          value: ctaSection
        }, {
          id: 'serviceTabs',
          label: 'Service Tabs',
          type: 'array',
          value: serviceTabs
        }]
      };
      await pageApi.update('services', pageData);

      // Refresh data from server to ensure UI is in sync
      const response = await pageApi.get('services');
      if (response.success && response.data) {
        const fields = response.data.fields || [];
        fields.forEach(field => {
          if (field.id === 'heroContent' && field.value) setHeroContent(field.value);
          if (field.id === 'statsCounters' && field.value) setStatsCounters(field.value);
          if (field.id === 'headings' && field.value) setHeadings(field.value);
          if (field.id === 'serviceCategories' && field.value) setServiceCategories(field.value);
          if (field.id === 'services' && field.value) setServices(field.value);
          if (field.id === 'testimonials' && field.value) setTestimonials(field.value);
          if (field.id === 'industries' && field.value) setIndustries(field.value);
          if (field.id === 'clientsSection' && field.value) setClientsSection(field.value);
          if (field.id === 'industriesSection' && field.value) setIndustriesSection(field.value);
          if (field.id === 'faqSection' && field.value) setFaqSection(field.value);
          if (field.id === 'faqs' && field.value) setFaqs(field.value);
          if (field.id === 'processSection' && field.value) setProcessSection(field.value);
          if (field.id === 'processSteps' && field.value) setProcessSteps(field.value);
          if (field.id === 'techStackSection' && field.value) setTechStackSection(field.value);
          if (field.id === 'technologies' && field.value) setTechnologies(field.value);
          if (field.id === 'ctaSection' && field.value) setCtaSection(field.value);
          if (field.id === 'serviceTabs' && field.value) setServiceTabs(field.value);
        });
      }
      setSaveStatus('success');
      toast({
        title: "Success!",
        description: "Services page content saved successfully."
      });
      setTimeout(() => setSaveStatus('idle'), 2000);
    } catch (error) {
      console.error('Failed to save services page:', error);
      setSaveStatus('error');
      toast({
        title: "Error",
        description: error.message || "Failed to save services page content. Please try again.",
        variant: "destructive"
      });
      setTimeout(() => setSaveStatus('idle'), 2000);
    }
  };
  const addService = () => {
    const newService = {
      id: Date.now(),
      icon: 'Globe',
      title: 'New Service',
      description: 'Service description',
      category: 'Development',
      features: ['Feature 1', 'Feature 2']
    };
    setServices([...services, newService]);
  };
  const updateService = (id, field, value) => {
    setServices(services.map(s => s.id === id ? {
      ...s,
      [field]: value
    } : s));
  };
  const deleteService = id => {
    setServices(services.filter(s => s.id !== id));
  };
  const addFeature = serviceId => {
    const s = services.find(x => x.id === serviceId);
    if (s) updateService(serviceId, 'features', [...s.features, 'New Feature']);
  };
  const updateFeature = (serviceId, featureIndex, value) => {
    const s = services.find(x => x.id === serviceId);
    if (s) {
      const f = [...s.features];
      f[featureIndex] = value;
      updateService(serviceId, 'features', f);
    }
  };
  const deleteFeature = (serviceId, featureIndex) => {
    const s = services.find(x => x.id === serviceId);
    if (s) updateService(serviceId, 'features', s.features.filter((_, i) => i !== featureIndex));
  };
  const addTestimonial = () => {
    setTestimonials([...testimonials, {
      id: Date.now(),
      name: 'New Client',
      role: 'Client of Company',
      avatar: '',
      text: 'Testimonial text'
    }]);
  };
  const updateTestimonial = (id, field, value) => {
    setTestimonials(testimonials.map(t => t.id === id ? {
      ...t,
      [field]: value
    } : t));
  };
  const deleteTestimonial = id => {
    setTestimonials(testimonials.filter(t => t.id !== id));
  };
  const handleTestimonialImageUpload = async (file, testimonialId) => {
    try {
      const res = await uploadApi.uploadImage(file);
      if (res.success && res.data) {
        const imageUrl = res.data.url;
        updateTestimonial(testimonialId, 'avatar', imageUrl);
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
  const updateIndustry = (index, field, value) => {
    setIndustries(industries.map((ind, i) => i === index ? {
      ...ind,
      [field]: value
    } : ind));
  };
  const addFaq = () => {
    setFaqs([...faqs, {
      q: 'New Question',
      a: 'New Answer'
    }]);
  };
  const updateFaq = (index, field, value) => {
    setFaqs(faqs.map((f, i) => i === index ? {
      ...f,
      [field]: value
    } : f));
  };
  const deleteFaq = index => {
    setFaqs(faqs.filter((_, i) => i !== index));
  };
  const addProcessStep = () => {
    setProcessSteps([...processSteps, {
      step: String(processSteps.length + 1).padStart(2, '0'),
      title: 'New Step',
      description: 'Step description',
      icon: '⭐'
    }]);
  };
  const updateProcessStep = (index, field, value) => {
    setProcessSteps(processSteps.map((s, i) => i === index ? {
      ...s,
      [field]: value
    } : s));
  };
  const deleteProcessStep = index => {
    setProcessSteps(processSteps.filter((_, i) => i !== index));
  };
  const addTechnology = () => {
    setTechnologies([...technologies, {
      name: 'New Tech',
      category: 'Category'
    }]);
  };
  const updateTechnology = (index, field, value) => {
    setTechnologies(technologies.map((t, i) => i === index ? {
      ...t,
      [field]: value
    } : t));
  };
  const deleteTechnology = index => {
    setTechnologies(technologies.filter((_, i) => i !== index));
  };
  const updateStatCounter = (index, field, value) => {
    setStatsCounters(statsCounters.map((s, i) => i === index ? {
      ...s,
      [field]: value
    } : s));
  };

  // Categories filters handlers
  const addCategory = () => setServiceCategories([...serviceCategories, 'New Category']);
  const updateCategory = (index, value) => setServiceCategories(serviceCategories.map((c, i) => i === index ? value : c));
  const deleteCategory = index => setServiceCategories(serviceCategories.filter((_, i) => i !== index));

  // Category tabs handlers
  const addServiceTab = () => setServiceTabs(prev => [...prev, {
    id: 'New Tab',
    label: 'New Tab',
    intro: 'Intro text',
    keyFeatures: [{
      title: 'Feature',
      desc: 'Description'
    }],
    process: [{
      title: 'Step',
      desc: 'Description'
    }],
    portfolioTitle: 'Portfolio',
    portfolioSubtext: 'Subtext',
    thumbnails: ['', ''],
    portfolioCtaText: 'View All',
    tableRows: []
  }]);
  const updateServiceTab = (index, field, value) => setServiceTabs(tabs => tabs.map((t, i) => i === index ? {
    ...t,
    [field]: value
  } : t));
  const deleteServiceTab = index => setServiceTabs(tabs => tabs.filter((_, i) => i !== index));
  const addTabFeature = tabIndex => setServiceTabs(tabs => tabs.map((t, i) => i === tabIndex ? {
    ...t,
    keyFeatures: [...t.keyFeatures, {
      title: 'New Feature',
      desc: 'Description'
    }]
  } : t));
  const updateTabFeature = (tabIndex, featureIndex, field, value) => setServiceTabs(tabs => tabs.map((t, i) => i === tabIndex ? {
    ...t,
    keyFeatures: t.keyFeatures.map((f, fi) => fi === featureIndex ? {
      ...f,
      [field]: value
    } : f)
  } : t));
  const deleteTabFeature = (tabIndex, featureIndex) => setServiceTabs(tabs => tabs.map((t, i) => i === tabIndex ? {
    ...t,
    keyFeatures: t.keyFeatures.filter((_, fi) => fi !== featureIndex)
  } : t));
  const addTabProcess = tabIndex => setServiceTabs(tabs => tabs.map((t, i) => i === tabIndex ? {
    ...t,
    process: [...t.process, {
      title: 'New Step',
      desc: 'Description'
    }]
  } : t));
  const updateTabProcess = (tabIndex, procIndex, field, value) => setServiceTabs(tabs => tabs.map((t, i) => i === tabIndex ? {
    ...t,
    process: t.process.map((p, pi) => pi === procIndex ? {
      ...p,
      [field]: value
    } : p)
  } : t));
  const deleteTabProcess = (tabIndex, procIndex) => setServiceTabs(tabs => tabs.map((t, i) => i === tabIndex ? {
    ...t,
    process: t.process.filter((_, pi) => pi !== procIndex)
  } : t));
  const addTabRow = tabIndex => setServiceTabs(tabs => tabs.map((t, i) => i === tabIndex ? {
    ...t,
    tableRows: [...t.tableRows, {
      name: 'Project',
      industry: 'Industry',
      url: 'https://example.com'
    }]
  } : t));
  const updateTabRow = (tabIndex, rowIndex, field, value) => setServiceTabs(tabs => tabs.map((t, i) => i === tabIndex ? {
    ...t,
    tableRows: t.tableRows.map((r, ri) => ri === rowIndex ? {
      ...r,
      [field]: value
    } : r)
  } : t));
  const deleteTabRow = (tabIndex, rowIndex) => setServiceTabs(tabs => tabs.map((t, i) => i === tabIndex ? {
    ...t,
    tableRows: t.tableRows.filter((_, ri) => ri !== rowIndex)
  } : t));
  return <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Services Page CMS</h2>
        <Button onClick={handleSave} className="group" disabled={loading || saveStatus === 'saving'}>
          <Save className="w-4 h-4 mr-2" />
          {saveStatus === 'saving' ? 'Saving...' : saveStatus === 'success' ? 'Saved!' : saveStatus === 'error' ? 'Error' : 'Save Changes'}
        </Button>
      </div>

      <Tabs defaultValue="hero" className="w-full">
        <TabsList className="flex w-full overflow-x-auto justify-start hide-scrollbar gap-2 p-1 bg-primary-slate/30 rounded-xl mb-6">
          <TabsTrigger value="hero">Hero</TabsTrigger>
          <TabsTrigger value="stats">Stats</TabsTrigger>
          <TabsTrigger value="headings">Section Headings</TabsTrigger>
          <TabsTrigger value="filters">Categories Filter</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="categories">Categories Tabs</TabsTrigger>
          <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
          <TabsTrigger value="industries">Industries</TabsTrigger>
          <TabsTrigger value="process">Process & Tech</TabsTrigger>
          <TabsTrigger value="faq">FAQ & CTA</TabsTrigger>
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

        {/* Stats Counters */}
        <TabsContent value="stats" className="space-y-6">
          <h3 className="text-lg font-semibold">Top Statistics</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {statsCounters.map((s, index) => <Card key={index} hover className="p-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-white font-medium mb-2">Number</label>
                    <AdminInput value={s.number} onChange={e => updateStatCounter(index, 'number', e.target.value)} placeholder="e.g., 500+" />
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2">Label</label>
                    <AdminInput value={s.label} onChange={e => updateStatCounter(index, 'label', e.target.value)} placeholder="e.g., Projects Delivered" />
                  </div>
                </div>
              </Card>)}
          </div>
        </TabsContent>

        {/* Section Headings */}
        <TabsContent value="headings" className="space-y-6">
          <Card hover className="p-6">
            <CardHeader><CardTitle>Services Grid Section</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <AdminInput value={headings.servicesGridTitlePrefix} onChange={e => updateHeading('servicesGridTitlePrefix', e.target.value)} placeholder="Title prefix (e.g., Our)" />
              <AdminInput value={headings.servicesGridTitleHighlight} onChange={e => updateHeading('servicesGridTitleHighlight', e.target.value)} placeholder="Title highlight (e.g., Services)" />
              <AdminTextarea rows={3} value={headings.servicesGridDescription} onChange={e => updateHeading('servicesGridDescription', e.target.value)} placeholder="Description" />
            </CardContent>
          </Card>

          <Card hover className="p-6">
            <CardHeader><CardTitle>Categories of Services</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <AdminInput value={headings.categoriesTitlePrefix} onChange={e => updateHeading('categoriesTitlePrefix', e.target.value)} placeholder="Title prefix (e.g., Categories of)" />
              <AdminInput value={headings.categoriesTitleHighlight} onChange={e => updateHeading('categoriesTitleHighlight', e.target.value)} placeholder="Title highlight (e.g., Services)" />
              <AdminTextarea rows={3} value={headings.categoriesDescription} onChange={e => updateHeading('categoriesDescription', e.target.value)} placeholder="Description" />
            </CardContent>
          </Card>

          <Card hover className="p-6">
            <CardHeader><CardTitle>Testimonials Section</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <AdminInput value={headings.testimonialsTitlePrefix} onChange={e => updateHeading('testimonialsTitlePrefix', e.target.value)} placeholder="Title prefix (e.g., What Our)" />
              <AdminInput value={headings.testimonialsTitleHighlight} onChange={e => updateHeading('testimonialsTitleHighlight', e.target.value)} placeholder="Title highlight (e.g., Clients Say)" />
              <AdminTextarea rows={3} value={headings.testimonialsDescription} onChange={e => updateHeading('testimonialsDescription', e.target.value)} placeholder="Description" />
            </CardContent>
          </Card>

          <Card hover className="p-6">
            <CardHeader><CardTitle>Industries Section</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <AdminInput value={headings.industriesTitlePrefix} onChange={e => updateHeading('industriesTitlePrefix', e.target.value)} placeholder="Title prefix (e.g., Industries)" />
              <AdminInput value={headings.industriesTitleHighlight} onChange={e => updateHeading('industriesTitleHighlight', e.target.value)} placeholder="Title highlight (e.g., We Serve)" />
              <AdminTextarea rows={3} value={headings.industriesDescription} onChange={e => updateHeading('industriesDescription', e.target.value)} placeholder="Description" />
            </CardContent>
          </Card>

          <Card hover className="p-6">
            <CardHeader><CardTitle>Process Section</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <AdminInput value={headings.processTitlePrefix} onChange={e => updateHeading('processTitlePrefix', e.target.value)} placeholder="Title prefix (e.g., Our)" />
              <AdminInput value={headings.processTitleHighlight} onChange={e => updateHeading('processTitleHighlight', e.target.value)} placeholder="Title highlight (e.g., Process)" />
              <AdminTextarea rows={3} value={headings.processDescription} onChange={e => updateHeading('processDescription', e.target.value)} placeholder="Description" />
            </CardContent>
          </Card>

          <Card hover className="p-6">
            <CardHeader><CardTitle>FAQ Section</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <AdminInput value={headings.faqTitlePrefix} onChange={e => updateHeading('faqTitlePrefix', e.target.value)} placeholder="Title prefix (e.g., Frequently)" />
              <AdminInput value={headings.faqTitleHighlight} onChange={e => updateHeading('faqTitleHighlight', e.target.value)} placeholder="Title highlight (e.g., Asked Questions)" />
              <AdminTextarea rows={3} value={headings.faqDescription} onChange={e => updateHeading('faqDescription', e.target.value)} placeholder="Description" />
            </CardContent>
          </Card>

          <Card hover className="p-6">
            <CardHeader><CardTitle>Bottom CTA</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <AdminInput value={headings.ctaTitlePrefix} onChange={e => updateHeading('ctaTitlePrefix', e.target.value)} placeholder="Title prefix (e.g., Ready to Start Your)" />
              <AdminInput value={headings.ctaTitleHighlight} onChange={e => updateHeading('ctaTitleHighlight', e.target.value)} placeholder="Title highlight (e.g., Project?)" />
              <AdminTextarea rows={3} value={headings.ctaDescription} onChange={e => updateHeading('ctaDescription', e.target.value)} placeholder="CTA subtitle" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <AdminInput value={headings.ctaPrimary} onChange={e => updateHeading('ctaPrimary', e.target.value)} placeholder="Primary CTA" />
                <AdminInput value={headings.ctaSecondary} onChange={e => updateHeading('ctaSecondary', e.target.value)} placeholder="Secondary CTA" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Categories Filter */}
        <TabsContent value="filters" className="space-y-6">
          <h3 className="text-lg font-semibold">Filter Categories</h3>
          <div className="space-y-3">
            {serviceCategories.map((cat, index) => <div key={index} className="flex items-center gap-2">
                <AdminInput value={cat} onChange={e => updateCategory(index, e.target.value)} placeholder="Category" />
                <Button size="sm" variant="outline" onClick={() => deleteCategory(index)} className="border-red-500/30 text-red-400 hover:bg-red-500/10">
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>)}
          </div>
          <Button onClick={addCategory} size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Category
          </Button>
        </TabsContent>

        {/* Services Section */}
        <TabsContent value="services" className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Services Management</h3>
            <Button onClick={addService} size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Service
            </Button>
          </div>

          <div className="space-y-6">
            {services.map(service => <Card key={service.id} hover className="p-6">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Badge className="bg-primary-blue/20 text-primary-blue border-primary-blue/30">{service.icon}</Badge>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Edit className="w-3 h-3" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => deleteService(service.id)} className="border-red-500/30 text-red-400 hover:bg-red-500/10">
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <AdminInput value={service.title} onChange={e => updateService(service.id, 'title', e.target.value)} placeholder="Service title" />
                      <AdminInput value={service.category} onChange={e => updateService(service.id, 'category', e.target.value)} placeholder="Category" />
                    </div>

                    <AdminTextarea value={service.description} onChange={e => updateService(service.id, 'description', e.target.value)} placeholder="Service description" rows={2} />

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-sm font-medium">Features</label>
                        <Button size="sm" variant="outline" onClick={() => addFeature(service.id)}>
                          <Plus className="w-3 h-3 mr-1" />
                          Add Feature
                        </Button>
                      </div>
                      <div className="space-y-2">
                        {service.features.map((feature, index) => <div key={index} className="flex items-center space-x-2">
                            <AdminInput value={feature} onChange={e => updateFeature(service.id, index, e.target.value)} placeholder="Feature" />
                            <Button size="sm" variant="outline" onClick={() => deleteFeature(service.id, index)} className="border-red-500/30 text-red-400 hover:bg-red-500/10">
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

        {/* Categories Tabs Editor */}
        <TabsContent value="categories" className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Categories of Services Tabs</h3>
            <Button onClick={addServiceTab} size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Tab
            </Button>
          </div>
          <div className="space-y-4">
            {serviceTabs.map((tab, tabIndex) => <Card key={tabIndex} hover className="p-6">
                <CardContent className="p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge className="bg-primary-blue/20 text-primary-blue border-primary-blue/30">{tab.label}</Badge>
                    <Button size="sm" variant="outline" onClick={() => deleteServiceTab(tabIndex)} className="border-red-500/30 text-red-400 hover:bg-red-500/10">
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <AdminInput value={tab.id} onChange={e => updateServiceTab(tabIndex, 'id', e.target.value)} placeholder="Tab id (e.g., Web Design)" />
                    <AdminInput value={tab.label} onChange={e => updateServiceTab(tabIndex, 'label', e.target.value)} placeholder="Tab label" />
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">Intro</label>
                    <AdminTextarea value={tab.intro} onChange={e => updateServiceTab(tabIndex, 'intro', e.target.value)} rows={3} placeholder="Intro text" />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-medium">Key Features</label>
                      <Button size="sm" variant="outline" onClick={() => addTabFeature(tabIndex)}>
                        <Plus className="w-3 h-3 mr-1" />
                        Add Feature
                      </Button>
                    </div>
                    <div className="space-y-2">
                      {tab.keyFeatures.map((f, fi) => <div key={fi} className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          <AdminInput value={f.title} onChange={e => updateTabFeature(tabIndex, fi, 'title', e.target.value)} placeholder="Feature title" />
                          <AdminInput value={f.desc} onChange={e => updateTabFeature(tabIndex, fi, 'desc', e.target.value)} placeholder="Feature description" />
                          <div className="md:col-span-2 flex justify-end">
                            <Button size="sm" variant="outline" onClick={() => deleteTabFeature(tabIndex, fi)} className="border-red-500/30 text-red-400 hover:bg-red-500/10">
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>)}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-medium">Process Steps</label>
                      <Button size="sm" variant="outline" onClick={() => addTabProcess(tabIndex)}>
                        <Plus className="w-3 h-3 mr-1" />
                        Add Step
                      </Button>
                    </div>
                    <div className="space-y-2">
                      {tab.process.map((p, pi) => <div key={pi} className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          <AdminInput value={p.title} onChange={e => updateTabProcess(tabIndex, pi, 'title', e.target.value)} placeholder="Step title" />
                          <AdminInput value={p.desc} onChange={e => updateTabProcess(tabIndex, pi, 'desc', e.target.value)} placeholder="Step description" />
                          <div className="md:col-span-2 flex justify-end">
                            <Button size="sm" variant="outline" onClick={() => deleteTabProcess(tabIndex, pi)} className="border-red-500/30 text-red-400 hover:bg-red-500/10">
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>)}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-medium">Portfolio Section</label>
                    <AdminInput value={tab.portfolioTitle} onChange={e => updateServiceTab(tabIndex, 'portfolioTitle', e.target.value)} placeholder="Portfolio title" />
                    <AdminTextarea rows={2} value={tab.portfolioSubtext} onChange={e => updateServiceTab(tabIndex, 'portfolioSubtext', e.target.value)} placeholder="Portfolio subtext" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {(tab.thumbnails || []).map((thumb, ti) => <AdminInput key={ti} value={thumb} onChange={e => {
                    const t = [...tab.thumbnails];
                    t[ti] = e.target.value;
                    updateServiceTab(tabIndex, 'thumbnails', t);
                  }} placeholder={`Thumbnail ${ti + 1} URL`} />)}
                    </div>
                    <AdminInput value={tab.portfolioCtaText} onChange={e => updateServiceTab(tabIndex, 'portfolioCtaText', e.target.value)} placeholder="Portfolio CTA text" />
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-sm font-medium">Portfolio Table Rows</label>
                        <Button size="sm" variant="outline" onClick={() => addTabRow(tabIndex)}>
                          <Plus className="w-3 h-3 mr-1" />
                          Add Row
                        </Button>
                      </div>
                      <div className="space-y-2">
                        {tab.tableRows.map((row, ri) => <div key={ri} className="grid grid-cols-1 md:grid-cols-3 gap-2 items-center">
                            <AdminInput value={row.name} onChange={e => updateTabRow(tabIndex, ri, 'name', e.target.value)} placeholder="Project Name" />
                            <AdminInput value={row.industry} onChange={e => updateTabRow(tabIndex, ri, 'industry', e.target.value)} placeholder="Industry" />
                            <div className="flex items-center gap-2">
                              <AdminInput value={row.url} onChange={e => updateTabRow(tabIndex, ri, 'url', e.target.value)} placeholder="URL / Results" />
                              <Button size="sm" variant="outline" onClick={() => deleteTabRow(tabIndex, ri)} className="border-red-500/30 text-red-400 hover:bg-red-500/10">
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>)}
                      </div>
                    </div>
                  </div>

                </CardContent>
              </Card>)}
          </div>
        </TabsContent>

        {/* Testimonials */}
                {/* Industries */}
        <TabsContent value="industries" className="space-y-6">
          <Card hover className="p-6">
            <CardHeader>
              <CardTitle>Industries Section Header</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Section Subtitle</label>
                <AdminInput value={industriesSection.subtitle} onChange={e => setIndustriesSection({
                ...industriesSection,
                subtitle: e.target.value
              })} placeholder="Enter section subtitle" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Section Title</label>
                <AdminInput value={industriesSection.title} onChange={e => setIndustriesSection({
                ...industriesSection,
                title: e.target.value
              })} placeholder="Enter section title" />
              </div>
            </CardContent>
          </Card>

          <h3 className="text-lg font-semibold">Industries We Serve</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {industries.map((industry, index) => <Card key={index} hover className="p-6">
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <AdminInput value={industry.title} onChange={e => updateIndustry(index, 'title', e.target.value)} placeholder="Industry title" />
                    <AdminTextarea value={industry.desc} onChange={e => updateIndustry(index, 'desc', e.target.value)} placeholder="Industry description" rows={2} />
                  </div>
                </CardContent>
              </Card>)}
          </div>
        </TabsContent>

        {/* Process & Tech */}
        <TabsContent value="process" className="space-y-6">
          <Card hover className="p-6">
            <CardHeader>
              <CardTitle>Process Section</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Section Title</label>
                <AdminInput value={processSection.title} onChange={e => setProcessSection({
                ...processSection,
                title: e.target.value
              })} placeholder="Enter section title" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Section Subtitle</label>
                <AdminTextarea value={processSection.subtitle} onChange={e => setProcessSection({
                ...processSection,
                subtitle: e.target.value
              })} placeholder="Enter section subtitle" rows={3} />
              </div>
            </CardContent>
          </Card>

          <Card hover className="p-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Process Steps</CardTitle>
                <Button onClick={addProcessStep} size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Step
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {processSteps.map((step, index) => <Card key={index} hover className="p-6">
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Badge className="bg-primary-blue/20 text-primary-blue border-primary-blue/30">Step {step.step}</Badge>
                          <Button size="sm" variant="outline" onClick={() => deleteProcessStep(index)} className="border-red-500/30 text-red-400 hover:bg-red-500/10">
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <AdminInput value={step.step} onChange={e => updateProcessStep(index, 'step', e.target.value)} placeholder="Step number" />
                          <AdminInput value={step.icon} onChange={e => updateProcessStep(index, 'icon', e.target.value)} placeholder="Icon (emoji)" />
                        </div>
                        <AdminInput value={step.title} onChange={e => updateProcessStep(index, 'title', e.target.value)} placeholder="Step title" />
                        <AdminTextarea value={step.description} onChange={e => updateProcessStep(index, 'description', e.target.value)} placeholder="Step description" rows={2} />
                      </div>
                    </CardContent>
                  </Card>)}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* FAQ & CTA */}
        <TabsContent value="cta" className="space-y-6">
          <Card hover className="p-6">
            <CardHeader>
              <CardTitle>Bottom CTA</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <AdminInput value={ctaSection.titlePrefix} onChange={e => setCtaSection({
                ...ctaSection,
                titlePrefix: e.target.value
              })} placeholder="Title prefix (e.g., Ready to Start Your)" />
                <AdminInput value={ctaSection.titleHighlight} onChange={e => setCtaSection({
                ...ctaSection,
                titleHighlight: e.target.value
              })} placeholder="Title highlight (e.g., Project?)" />
              </div>
              <AdminTextarea value={ctaSection.subtitle} onChange={e => setCtaSection({
              ...ctaSection,
              subtitle: e.target.value
            })} placeholder="CTA subtitle" rows={3} />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <AdminInput value={ctaSection.primaryCta} onChange={e => setCtaSection({
                ...ctaSection,
                primaryCta: e.target.value
              })} placeholder="Primary CTA" />
                <AdminInput value={ctaSection.secondaryCta} onChange={e => setCtaSection({
                ...ctaSection,
                secondaryCta: e.target.value
              })} placeholder="Secondary CTA" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>;
}
