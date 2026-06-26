"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, Save, Upload, X } from "lucide-react";
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
export function HomePageCMS() {
  // Hero (matches src/app/page.tsx heroSlides[0])
  const [hero, setHero] = useState({
    title: "Digital Solutions",
    titleHighlight: "That Drive Success",
    subtitle: "We combine strategic thinking with technical excellence to deliver solutions that transform businesses and drive measurable results.",
    cta: "Get Started",
    cta2: "Learn More"
  });

  // Services (title + desc + image)
  const [services, setServices] = useState([{
    id: 1,
    title: "Web Development",
    desc: "Custom web applications built with cutting-edge technology",
    icon: "Globe",
    image: ""
  }, {
    id: 2,
    title: "Mobile App Development",
    desc: "Native and cross-platform mobile solutions",
    icon: "Code",
    image: ""
  }, {
    id: 3,
    title: "UI/UX Design",
    desc: "Beautiful, intuitive designs that users love",
    icon: "Palette",
    image: ""
  }, {
    id: 4,
    title: "Digital Marketing",
    desc: "Data-driven marketing strategies that deliver ROI",
    icon: "Cloud",
    image: ""
  }]);

  // Reasons (Why choose us)
  const [reasons, setReasons] = useState([{
    id: 1,
    title: "Expertise That Drives Results",
    desc: "Our team brings years of industry experience",
    icon: "Target"
  }, {
    id: 2,
    title: "Tailored Business Solutions",
    desc: "Custom solutions designed for your needs",
    icon: "Shield"
  }, {
    id: 3,
    title: "Cutting-Edge Web Design",
    desc: "Modern, responsive designs that convert",
    icon: "Zap"
  }, {
    id: 4,
    title: "Reliable Software Development",
    desc: "Quality code, on time delivery",
    icon: "Users"
  }, {
    id: 5,
    title: "Data-Driven Insights",
    desc: "Analytics and insights that matter",
    icon: "TrendingUp"
  }, {
    id: 6,
    title: "Transparent Project Management",
    desc: "Clear communication throughout",
    icon: "Award"
  }]);

  // Works (portfolio cards + image)
  const [works, setWorks] = useState([{
    id: 1,
    title: "Live Trade Chart vol. 01",
    category: "Website Development",
    client: "InvestPro Solutions",
    year: "2024",
    bg: "from-blue-900/20 to-purple-900/20",
    image: ""
  }, {
    id: 2,
    title: "Mobile Banking App Interface",
    category: "Mobile App Design & Development",
    client: "SecureBank Financial",
    year: "2024",
    bg: "from-purple-900/20 to-pink-900/20",
    image: ""
  }, {
    id: 3,
    title: "Modern Corporate Website",
    category: "Website Development",
    client: "TechCorp Industries",
    year: "2024",
    bg: "from-green-900/20 to-blue-900/20",
    image: ""
  }, {
    id: 4,
    title: "Digital Marketing Dashboard",
    category: "Web Application",
    client: "MarketingPro Agency",
    year: "2024",
    bg: "from-orange-900/20 to-red-900/20",
    image: ""
  }]);

  // Testimonials
  const [testimonials, setTestimonials] = useState([{
    id: 1,
    text: "Working with BlackCube Solutions LLC transformed our business. Their attention to detail and commitment to excellence is unmatched.",
    name: "Sarah Johnson",
    role: "CEO, TechStart Inc",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
  }, {
    id: 2,
    text: "The team delivered beyond our expectations. Professional, responsive, and incredibly skilled at what they do.",
    name: "Michael Chen",
    role: "Founder, Digital Ventures",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
  }, {
    id: 3,
    text: "Outstanding results! They took our vision and turned it into a reality that exceeded all our goals.",
    name: "Emily Rodriguez",
    role: "Marketing Director, Growth Co",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop"
  }]);

  // FAQs
  const [faqs, setFaqs] = useState([{
    id: 1,
    q: "What services does BlackCube Solutions LLC offer?",
    a: "We offer comprehensive digital solutions including web development, mobile app development, UI/UX design, and digital marketing services."
  }, {
    id: 2,
    q: "How long does it take to complete a web development project?",
    a: "Project timelines vary based on complexity, but typically range from 4-12 weeks for most web projects."
  }, {
    id: 3,
    q: "What is your approach to UI/UX design?",
    a: "We follow a user-centered design approach, focusing on research, prototyping, testing, and iteration."
  }, {
    id: 4,
    q: "Do you provide ongoing support after project completion?",
    a: "Yes, we offer maintenance and support packages to ensure your solution continues to perform optimally."
  }, {
    id: 5,
    q: "What technologies do you specialize in?",
    a: "We work with modern tech stacks including React, Node.js, Python, AWS, and more based on project needs."
  }, {
    id: 6,
    q: "How do you ensure project quality and timely delivery?",
    a: "We use agile methodologies, continuous testing, and clear communication to maintain quality and meet deadlines."
  }]);

  // Clients
  const [clients, setClients] = useState([{
    id: 1,
    name: "ABC Tech Solutions",
    description: "A leading technology firm that trusted BlackCube Solutions LLC to develop their responsive website, showcasing their cutting-edge products and services."
  }, {
    id: 2,
    name: "GreenEarth Eco Store",
    description: "BlackCube Solutions LLC collaborated with GreenEarth Eco Store to create an engaging e-commerce platform promoting sustainable living and eco-friendly products."
  }, {
    id: 3,
    name: "HealthTech Innovations",
    description: "BlackCube Solutions LLC developed a user-centric mobile app for HealthTech Innovations, helping them revolutionize health tracking."
  }, {
    id: 4,
    name: "GlobalTech Solutions",
    description: "GlobalTech Solutions partnered with BlackCube Solutions LLC for a website redesign, resulting in a modern interface that elevates their online presence."
  }, {
    id: 5,
    name: "TechGuru Inc.",
    description: "BlackCube Solutions LLC's digital marketing strategies boosted TechGuru Inc.'s online visibility and engagement, driving business growth."
  }, {
    id: 6,
    name: "ArtScape Gallery",
    description: "BlackCube Solutions LLC brought ArtScape Gallery's artistic vision to life with a visually stunning website showcasing talented artists."
  }]);

  // Section Headings/Subheadings matching Home page
  const [headings, setHeadings] = useState({
    servicesTitlePrefix: "Our",
    servicesTitleHighlight: "Services",
    servicesDescription: "Our comprehensive range of services includes web design, mobile app development, SEO, and more. Whether you’re a startup or an established enterprise, our experts craft solutions that drive results.",
    reasonsTitlePrefix: "Reasons to Choose",
    reasonsTitleHighlight: "BlackCube for",
    reasonsTitleLine2: "Your Digital Journey",
    reasonsDescription: "Partnering with BlackCube Solutions LLC offers a multitude of advantages — increased visibility, engagement, and ROI. Our solutions are tailored to meet your unique business needs for lasting success.",
    worksTitlePrefix: "Our",
    worksTitleHighlight: "Works",
    worksDescription: "Explore our portfolio of successful projects that showcase our expertise and creativity.",
    testimonialsTitlePrefix: "Our",
    testimonialsTitleHighlight: "Testimonials",
    testimonialsDescription: "Hear what our clients say about working with BlackCube Solutions LLC.",
    faqsTitlePrefix: "Frequently",
    faqsTitleHighlight: "Asked Questions",
    faqsDescription: "Got questions? We’ve got answers. Learn more about our process and services below.",
    clientsTitlePrefix: "Our",
    clientsTitleHighlight: "Partners and Clients",
    clientsDescription: "We are grateful for the opportunity to work with esteemed partners and clients. Our strong relationships are a testament to our dedication and expertise in the digital realm."
  });
  const updateHeading = (field, value) => {
    setHeadings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Final CTA section (bottom)
  const [finalCta, setFinalCta] = useState({
    titlePrefix: "Ready to Transform Your",
    titleHighlight: "Digital Presence?",
    description: "Take the first step towards digital success with BlackCube by your side. Our team of experts is eager to craft tailored solutions that drive growth for your business. Whether you need a stunning website, a powerful mobile app, or a data-driven marketing campaign, we've got you covered. Let's embark on this transformative journey together.",
    primaryButton: "Get Started",
    secondaryButton: "Free Consultation"
  });
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
        const response = await pageApi.get('home');
        if (response.success && response.data) {
          const fields = response.data.fields || [];
          // Transform fields back to state
          fields.forEach(field => {
            if (field.id === 'hero' && field.value) setHero(field.value);
            if (field.id === 'services' && field.value) setServices(field.value);
            if (field.id === 'reasons' && field.value) setReasons(field.value);
            if (field.id === 'works' && field.value) setWorks(field.value);
            if (field.id === 'testimonials' && field.value) setTestimonials(field.value);
            if (field.id === 'faqs' && field.value) setFaqs(field.value);
            if (field.id === 'clients' && field.value) setClients(field.value);
            if (field.id === 'headings' && field.value) setHeadings(field.value);
            if (field.id === 'finalCta' && field.value) setFinalCta(field.value);
          });
        }
      } catch (error) {
        console.error('Failed to load home page data:', error);
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
        id: 'home',
        title: 'Home Page',
        fields: [{
          id: 'hero',
          label: 'Hero Section',
          type: 'object',
          value: hero
        }, {
          id: 'services',
          label: 'Services',
          type: 'array',
          value: services
        }, {
          id: 'reasons',
          label: 'Reasons',
          type: 'array',
          value: reasons
        }, {
          id: 'works',
          label: 'Works',
          type: 'array',
          value: works
        }, {
          id: 'testimonials',
          label: 'Testimonials',
          type: 'array',
          value: testimonials
        }, {
          id: 'faqs',
          label: 'FAQs',
          type: 'array',
          value: faqs
        }, {
          id: 'clients',
          label: 'Clients',
          type: 'array',
          value: clients
        }, {
          id: 'headings',
          label: 'Section Headings',
          type: 'object',
          value: headings
        }, {
          id: 'finalCta',
          label: 'Final CTA',
          type: 'object',
          value: finalCta
        }]
      };
      const response = await pageApi.update('home', pageData);
      if (response.success) {
        setSaveStatus('success');
        toast({
          title: "Success!",
          description: "Home page content saved successfully to database."
        });
        setTimeout(() => setSaveStatus('idle'), 2000);
      } else {
        throw new Error(response.message || 'Failed to save');
      }
    } catch (error) {
      console.error('Failed to save home page:', error);
      setSaveStatus('error');
      toast({
        title: "Error",
        description: error.message || "Failed to save home page content. Please try again.",
        variant: "destructive"
      });
      setTimeout(() => setSaveStatus('idle'), 2000);
    }
  };

  // Small helpers
  const updateService = (id, field, value) => {
    setServices(prev => prev.map(s => s.id === id ? {
      ...s,
      [field]: value
    } : s));
  };
  const addService = () => setServices(prev => [...prev, {
    id: Date.now(),
    title: "New Service",
    desc: "Description",
    icon: "Code",
    image: ""
  }]);
  const deleteService = id => setServices(prev => prev.filter(s => s.id !== id));
  const updateReason = (id, field, value) => {
    setReasons(prev => prev.map(r => r.id === id ? {
      ...r,
      [field]: value
    } : r));
  };
  const addReason = () => setReasons(prev => [...prev, {
    id: Date.now(),
    title: "New Reason",
    desc: "Description",
    icon: "Target"
  }]);
  const deleteReason = id => setReasons(prev => prev.filter(r => r.id !== id));
  const updateWork = (id, field, value) => {
    setWorks(prev => prev.map(w => w.id === id ? {
      ...w,
      [field]: value
    } : w));
  };
  const addWork = () => setWorks(prev => [...prev, {
    id: Date.now(),
    title: "New Project",
    category: "Category",
    client: "Client",
    year: "2025",
    bg: "from-gray-800/20 to-gray-900/20",
    image: ""
  }]);
  const deleteWork = id => setWorks(prev => prev.filter(w => w.id !== id));
  const updateTestimonial = (id, field, value) => {
    setTestimonials(prev => prev.map(t => t.id === id ? {
      ...t,
      [field]: value
    } : t));
  };
  const addTestimonial = () => setTestimonials(prev => [...prev, {
    id: Date.now(),
    text: "Great work!",
    name: "New Client",
    role: "Role",
    avatar: ""
  }]);
  const deleteTestimonial = id => setTestimonials(prev => prev.filter(t => t.id !== id));

  // Image upload handlers
  const handleImageUpload = async (file, type, id) => {
    try {
      const res = await uploadApi.uploadImage(file);
      if (res.success && res.data) {
        const imageUrl = res.data.url;
        if (type === 'service') {
          updateService(id, 'image', imageUrl);
        } else if (type === 'work') {
          updateWork(id, 'image', imageUrl);
        } else if (type === 'testimonial') {
          updateTestimonial(id, 'avatar', imageUrl);
        }
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
  const updateFaq = (id, field, value) => {
    setFaqs(prev => prev.map(f => f.id === id ? {
      ...f,
      [field]: value
    } : f));
  };
  const addFaq = () => setFaqs(prev => [...prev, {
    id: Date.now(),
    q: "Question?",
    a: "Answer."
  }]);
  const deleteFaq = id => setFaqs(prev => prev.filter(f => f.id !== id));
  const updateClient = (id, field, value) => {
    setClients(prev => prev.map(c => c.id === id ? {
      ...c,
      [field]: value
    } : c));
  };
  const addClient = () => setClients(prev => [...prev, {
    id: Date.now(),
    name: "Client Name",
    description: "Short description"
  }]);
  const deleteClient = id => setClients(prev => prev.filter(c => c.id !== id));
  return <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Home Page CMS</h2>
        <Button onClick={handleSave} className="group" disabled={loading || saveStatus === 'saving'}>
          <Save className="w-4 h-4 mr-2" />
          {saveStatus === 'saving' ? 'Saving...' : saveStatus === 'success' ? 'Saved!' : saveStatus === 'error' ? 'Error' : 'Save Changes'}
        </Button>
      </div>

      <Tabs defaultValue="hero" className="w-full">
        <TabsList className="flex w-full overflow-x-auto justify-start hide-scrollbar gap-2 p-1 bg-primary-slate/30 rounded-xl mb-6">
          <TabsTrigger value="hero">Hero</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="reasons">Reasons</TabsTrigger>
          <TabsTrigger value="works">Works</TabsTrigger>
          <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
          <TabsTrigger value="faqs">FAQs</TabsTrigger>
          <TabsTrigger value="clients">Clients</TabsTrigger>
          <TabsTrigger value="headings">Section Headings</TabsTrigger>
          <TabsTrigger value="final-cta">Final CTA</TabsTrigger>
        </TabsList>

        {/* Hero */}
        <TabsContent value="hero" className="space-y-6">
          <Card hover className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-white font-medium mb-2">Title (prefix)</label>
                <AdminInput value={hero.title} onChange={e => setHero({
                ...hero,
                title: e.target.value
              })} placeholder="Digital Solutions" />
              </div>
              <div>
                <label className="block text-white font-medium mb-2">Title Highlight</label>
                <AdminInput value={hero.titleHighlight} onChange={e => setHero({
                ...hero,
                titleHighlight: e.target.value
              })} placeholder="That Drive Success" />
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-white font-medium mb-2">Subtitle</label>
              <AdminTextarea value={hero.subtitle} onChange={e => setHero({
              ...hero,
              subtitle: e.target.value
            })} placeholder="Hero subtitle" rows={3} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-white font-medium mb-2">Primary CTA</label>
                <AdminInput value={hero.cta} onChange={e => setHero({
                ...hero,
                cta: e.target.value
              })} placeholder="Get Started" />
              </div>
              <div>
                <label className="block text-white font-medium mb-2">Secondary CTA</label>
                <AdminInput value={hero.cta2} onChange={e => setHero({
                ...hero,
                cta2: e.target.value
              })} placeholder="Learn More" />
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Services */}
        <TabsContent value="services" className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Services</h3>
            <Button onClick={addService} size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Service
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map(service => <Card key={service.id} hover className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge className="bg-primary-blue/20 text-primary-blue border-primary-blue/30">{service.icon}</Badge>
                    <Button size="sm" variant="outline" onClick={() => deleteService(service.id)} className="border-red-500/30 text-red-400 hover:bg-red-500/10">
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2">Title</label>
                    <AdminInput value={service.title} onChange={e => updateService(service.id, "title", e.target.value)} placeholder="Service title" />
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2">Description</label>
                    <AdminTextarea value={service.desc} onChange={e => updateService(service.id, "desc", e.target.value)} placeholder="Service description" rows={2} />
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2">Image</label>
                    {service.image ? <div className="relative mb-2">
                        <img src={getAssetUrl(service.image)} alt={service.title} className="w-full h-32 object-cover rounded-lg" />
                        <button onClick={() => updateService(service.id, 'image', '')} className="absolute top-2 right-2 p-1 bg-red-500 rounded-full text-white hover:bg-red-600">
                          <X className="w-4 h-4" />
                        </button>
                      </div> : null}
                    <label className="flex items-center justify-center w-full px-4 py-2 bg-primary-slate/30 border border-white/20 rounded-xl cursor-pointer hover:bg-primary-slate/40 transition">
                      <Upload className="w-4 h-4 mr-2" />
                      <span className="text-sm">Upload Image</span>
                      <input type="file" accept="image/*" className="hidden" onChange={e => {
                    const file = e.target.files?.[0];
                    if (file) handleImageUpload(file, 'service', service.id);
                  }} />
                    </label>
                  </div>
                </div>
              </Card>)}
          </div>
        </TabsContent>

        {/* Reasons */}
        <TabsContent value="reasons" className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Reasons to Choose Us</h3>
            <Button onClick={addReason} size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Reason
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {reasons.map(r => <Card key={r.id} hover className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge className="bg-primary-blue/20 text-primary-blue border-primary-blue/30">{r.icon}</Badge>
                    <Button size="sm" variant="outline" onClick={() => deleteReason(r.id)} className="border-red-500/30 text-red-400 hover:bg-red-500/10">
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2">Title</label>
                    <AdminInput value={r.title} onChange={e => updateReason(r.id, "title", e.target.value)} placeholder="Reason title" />
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2">Description</label>
                    <AdminTextarea value={r.desc} onChange={e => updateReason(r.id, "desc", e.target.value)} placeholder="Reason description" rows={2} />
                  </div>
                </div>
              </Card>)}
          </div>
        </TabsContent>

        {/* Works */}
        <TabsContent value="works" className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Works</h3>
            <Button onClick={addWork} size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Work
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {works.map(w => <Card key={w.id} hover className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge className="bg-primary-blue/20 text-primary-blue border-primary-blue/30">Work #{w.id}</Badge>
                    <Button size="sm" variant="outline" onClick={() => deleteWork(w.id)} className="border-red-500/30 text-red-400 hover:bg-red-500/10">
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2">Title</label>
                    <AdminInput value={w.title} onChange={e => updateWork(w.id, "title", e.target.value)} placeholder="Work title" />
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2">Category</label>
                    <AdminInput value={w.category} onChange={e => updateWork(w.id, "category", e.target.value)} placeholder="Category" />
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2">Client</label>
                    <AdminInput value={w.client} onChange={e => updateWork(w.id, "client", e.target.value)} placeholder="Client" />
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2">Year</label>
                    <AdminInput value={w.year} onChange={e => updateWork(w.id, "year", e.target.value)} placeholder="Year" />
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2">Image</label>
                    {w.image ? <div className="relative mb-2">
                        <img src={getAssetUrl(w.image)} alt={w.title} className="w-full h-32 object-cover rounded-lg" />
                        <button onClick={() => updateWork(w.id, 'image', '')} className="absolute top-2 right-2 p-1 bg-red-500 rounded-full text-white hover:bg-red-600">
                          <X className="w-4 h-4" />
                        </button>
                      </div> : null}
                    <label className="flex items-center justify-center w-full px-4 py-2 bg-primary-slate/30 border border-white/20 rounded-xl cursor-pointer hover:bg-primary-slate/40 transition">
                      <Upload className="w-4 h-4 mr-2" />
                      <span className="text-sm">Upload Image</span>
                      <input type="file" accept="image/*" className="hidden" onChange={e => {
                    const file = e.target.files?.[0];
                    if (file) handleImageUpload(file, 'work', w.id);
                  }} />
                    </label>
                  </div>
                </div>
              </Card>)}
          </div>
        </TabsContent>

        {/* Testimonials */}
        <TabsContent value="testimonials" className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Testimonials</h3>
            <Button onClick={addTestimonial} size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Testimonial
            </Button>
          </div>
          <div className="space-y-4">
            {testimonials.map(t => <Card key={t.id} hover className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <Badge className="bg-primary-blue/20 text-primary-blue border-primary-blue/30">Testimonial #{t.id}</Badge>
                  <Button size="sm" variant="outline" onClick={() => deleteTestimonial(t.id)} className="border-red-500/30 text-red-400 hover:bg-red-500/10">
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-white font-medium mb-2">Text</label>
                    <AdminTextarea value={t.text} onChange={e => updateTestimonial(t.id, "text", e.target.value)} placeholder="Testimonial text" rows={3} />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-white font-medium mb-2">Name</label>
                      <AdminInput value={t.name} onChange={e => updateTestimonial(t.id, "name", e.target.value)} placeholder="Name" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-white font-medium mb-2">Role</label>
                      <AdminInput value={t.role} onChange={e => updateTestimonial(t.id, "role", e.target.value)} placeholder="Role" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2">Avatar</label>
                    {t.avatar ? <div className="relative mb-2">
                        <img src={getAssetUrl(t.avatar)} alt={t.name} className="w-24 h-24 object-cover rounded-full" />
                        <button onClick={() => updateTestimonial(t.id, 'avatar', '')} className="absolute top-0 right-0 p-1 bg-red-500 rounded-full text-white hover:bg-red-600">
                          <X className="w-4 h-4" />
                        </button>
                      </div> : null}
                    <div className="flex gap-2">
                      <label className="flex items-center justify-center flex-1 px-4 py-2 bg-primary-slate/30 border border-white/20 rounded-xl cursor-pointer hover:bg-primary-slate/40 transition">
                        <Upload className="w-4 h-4 mr-2" />
                        <span className="text-sm">Upload Avatar</span>
                        <input type="file" accept="image/*" className="hidden" onChange={e => {
                      const file = e.target.files?.[0];
                      if (file) handleImageUpload(file, 'testimonial', t.id);
                    }} />
                      </label>
                      <AdminInput value={t.avatar} onChange={e => updateTestimonial(t.id, "avatar", e.target.value)} placeholder="Or enter URL" className="flex-1" />
                    </div>
                  </div>
                </div>
              </Card>)}
          </div>
        </TabsContent>

        {/* FAQs */}
        <TabsContent value="faqs" className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">FAQs</h3>
            <Button onClick={addFaq} size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add FAQ
            </Button>
          </div>
          <div className="space-y-4">
            {faqs.map(f => <Card key={f.id} hover className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <Badge className="bg-primary-blue/20 text-primary-blue border-primary-blue/30">FAQ #{f.id}</Badge>
                  <Button size="sm" variant="outline" onClick={() => deleteFaq(f.id)} className="border-red-500/30 text-red-400 hover:bg-red-500/10">
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-white font-medium mb-2">Question</label>
                    <AdminInput value={f.q} onChange={e => updateFaq(f.id, "q", e.target.value)} placeholder="Question" />
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2">Answer</label>
                    <AdminTextarea value={f.a} onChange={e => updateFaq(f.id, "a", e.target.value)} placeholder="Answer" rows={3} />
                  </div>
                </div>
              </Card>)}
          </div>
        </TabsContent>

        {/* Clients */}
        <TabsContent value="clients" className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Clients</h3>
            <Button onClick={addClient} size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Client
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {clients.map(c => <Card key={c.id} hover className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge className="bg-primary-blue/20 text-primary-blue border-primary-blue/30">Client #{c.id}</Badge>
                    <Button size="sm" variant="outline" onClick={() => deleteClient(c.id)} className="border-red-500/30 text-red-400 hover:bg-red-500/10">
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2">Name</label>
                    <AdminInput value={c.name} onChange={e => updateClient(c.id, "name", e.target.value)} placeholder="Client name" />
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2">Description</label>
                    <AdminTextarea value={c.description} onChange={e => updateClient(c.id, "description", e.target.value)} placeholder="Description" rows={3} />
                  </div>
                </div>
              </Card>)}
          </div>
        </TabsContent>

        {/* Section Headings */}
        <TabsContent value="headings" className="space-y-6">
          <h3 className="text-lg font-semibold">Section Headings & Subheadings</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card hover className="p-6">
              <div className="mb-6"><h4 className="text-white font-semibold">Services</h4></div>
              <div className="space-y-4">
                <AdminInput value={headings.servicesTitlePrefix} onChange={e => updateHeading("servicesTitlePrefix", e.target.value)} placeholder="Title prefix (e.g., Our)" />
                <AdminInput value={headings.servicesTitleHighlight} onChange={e => updateHeading("servicesTitleHighlight", e.target.value)} placeholder="Title highlight (e.g., Services)" />
                <AdminTextarea rows={3} value={headings.servicesDescription} onChange={e => updateHeading("servicesDescription", e.target.value)} placeholder="Section description" />
              </div>
            </Card>

            <Card hover className="p-6">
              <div className="mb-6"><h4 className="text-white font-semibold">Reasons</h4></div>
              <div className="space-y-4">
                <AdminInput value={headings.reasonsTitlePrefix} onChange={e => updateHeading("reasonsTitlePrefix", e.target.value)} placeholder="Title prefix (e.g., Reasons to Choose)" />
                <AdminInput value={headings.reasonsTitleHighlight} onChange={e => updateHeading("reasonsTitleHighlight", e.target.value)} placeholder="Title highlight (e.g., BlackCube for)" />
                <AdminInput value={headings.reasonsTitleLine2} onChange={e => updateHeading("reasonsTitleLine2", e.target.value)} placeholder="Second line (e.g., Your Digital Journey)" />
                <AdminTextarea rows={3} value={headings.reasonsDescription} onChange={e => updateHeading("reasonsDescription", e.target.value)} placeholder="Section description" />
              </div>
            </Card>

            <Card hover className="p-6">
              <div className="mb-6"><h4 className="text-white font-semibold">Works</h4></div>
              <div className="space-y-4">
                <AdminInput value={headings.worksTitlePrefix} onChange={e => updateHeading("worksTitlePrefix", e.target.value)} placeholder="Title prefix (e.g., Our)" />
                <AdminInput value={headings.worksTitleHighlight} onChange={e => updateHeading("worksTitleHighlight", e.target.value)} placeholder="Title highlight (e.g., Works)" />
                <AdminTextarea rows={3} value={headings.worksDescription} onChange={e => updateHeading("worksDescription", e.target.value)} placeholder="Section description" />
              </div>
            </Card>

            <Card hover className="p-6">
              <div className="mb-6"><h4 className="text-white font-semibold">Testimonials</h4></div>
              <div className="space-y-4">
                <AdminInput value={headings.testimonialsTitlePrefix} onChange={e => updateHeading("testimonialsTitlePrefix", e.target.value)} placeholder="Title prefix (e.g., Our)" />
                <AdminInput value={headings.testimonialsTitleHighlight} onChange={e => updateHeading("testimonialsTitleHighlight", e.target.value)} placeholder="Title highlight (e.g., Testimonials)" />
                <AdminTextarea rows={3} value={headings.testimonialsDescription} onChange={e => updateHeading("testimonialsDescription", e.target.value)} placeholder="Section description" />
              </div>
            </Card>

            <Card hover className="p-6">
              <div className="mb-6"><h4 className="text-white font-semibold">FAQs</h4></div>
              <div className="space-y-4">
                <AdminInput value={headings.faqsTitlePrefix} onChange={e => updateHeading("faqsTitlePrefix", e.target.value)} placeholder="Title prefix (e.g., Frequently)" />
                <AdminInput value={headings.faqsTitleHighlight} onChange={e => updateHeading("faqsTitleHighlight", e.target.value)} placeholder="Title highlight (e.g., Asked Questions)" />
                <AdminTextarea rows={3} value={headings.faqsDescription} onChange={e => updateHeading("faqsDescription", e.target.value)} placeholder="Section description" />
              </div>
            </Card>

            <Card hover className="p-6">
              <div className="mb-6"><h4 className="text-white font-semibold">Clients</h4></div>
              <div className="space-y-4">
                <AdminInput value={headings.clientsTitlePrefix} onChange={e => updateHeading("clientsTitlePrefix", e.target.value)} placeholder="Title prefix (e.g., Our)" />
                <AdminInput value={headings.clientsTitleHighlight} onChange={e => updateHeading("clientsTitleHighlight", e.target.value)} placeholder="Title highlight (e.g., Partners and Clients)" />
                <AdminTextarea rows={3} value={headings.clientsDescription} onChange={e => updateHeading("clientsDescription", e.target.value)} placeholder="Section description" />
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* Final CTA */}
        <TabsContent value="final-cta" className="space-y-6">
          <Card hover className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-white font-medium mb-2">Title (prefix)</label>
                <AdminInput value={finalCta.titlePrefix} onChange={e => setFinalCta({
                ...finalCta,
                titlePrefix: e.target.value
              })} placeholder="Ready to Transform Your" />
              </div>
              <div>
                <label className="block text-white font-medium mb-2">Title Highlight</label>
                <AdminInput value={finalCta.titleHighlight} onChange={e => setFinalCta({
                ...finalCta,
                titleHighlight: e.target.value
              })} placeholder="Digital Presence?" />
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-white font-medium mb-2">Description</label>
              <AdminTextarea value={finalCta.description} onChange={e => setFinalCta({
              ...finalCta,
              description: e.target.value
            })} placeholder="CTA description" rows={4} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-white font-medium mb-2">Primary Button</label>
                <AdminInput value={finalCta.primaryButton} onChange={e => setFinalCta({
                ...finalCta,
                primaryButton: e.target.value
              })} placeholder="Get Started" />
              </div>
              <div>
                <label className="block text-white font-medium mb-2">Secondary Button</label>
                <AdminInput value={finalCta.secondaryButton} onChange={e => setFinalCta({
                ...finalCta,
                secondaryButton: e.target.value
              })} placeholder="Free Consultation" />
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>;
}
