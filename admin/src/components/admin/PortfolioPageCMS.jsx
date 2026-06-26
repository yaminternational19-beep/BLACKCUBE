'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, Save, Edit, Upload, X } from "lucide-react";
import { pageApi, portfolioApi, uploadApi, getAssetUrl } from "@/api";
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
export function PortfolioPageCMS() {
  const [heroContent, setHeroContent] = useState({
    title: 'Our Portfolio',
    subtitle: "Explore our collection of successful projects and innovative solutions we've delivered for clients worldwide",
    primaryCta: 'View Projects',
    secondaryCta: 'Start a Project'
  });

  // Key Features (6 cards on page)
  const [keyFeatures, setKeyFeatures] = useState([{
    title: 'Strategic Planning',
    desc: 'Holistic discovery and strategic planning to align with objectives and audience.'
  }, {
    title: 'Customized Solutions',
    desc: 'Tailored services precisely aligned with unique requirements and brand identity.'
  }, {
    title: 'User-Centric Approach',
    desc: 'Designed for real users with intuitive experiences and seamless interactions.'
  }, {
    title: 'Cutting-Edge Technologies',
    desc: 'Latest tech and best practices for high performance and future-proof builds.'
  }, {
    title: 'Reliable Execution',
    desc: 'Robust engineering, maintainable code, and predictable delivery.'
  }, {
    title: 'Timely Delivery',
    desc: 'Strict timelines and schedules to ensure on-time delivery without compromise.'
  }]);
  const [searchSection, setSearchSection] = useState({
    placeholder: 'Search projects...',
    noResultsTitle: 'No Projects Found',
    noResultsDescription: 'Try adjusting your search or filter criteria'
  });
  const [keyFeaturesSection, setKeyFeaturesSection] = useState({
    title: 'Why Clients Choose Us',
    subtitle: 'Core strengths that drive successful project outcomes.'
  });

  // Categories filter
  const [categories, setCategories] = useState(['All', 'Web Development', 'Mobile Apps', 'UI/UX Design', 'E-commerce', 'Branding']);

  // Portfolio items (grid + featured)

  const [portfolioItems, setPortfolioItems] = useState([{
    id: 1,
    title: 'E-Commerce Platform',
    description: 'A modern e-commerce solution with advanced features',
    category: 'E-commerce',
    technologies: ['React', 'Node.js', 'MongoDB'],
    client: 'TechCorp Inc.',
    featured: true,
    link: '#',
    image: 'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&w=1000&q=80',
    coverImage: '/freepik__it-company-project-banner-global-network-visualiza__30555.png',
    timeTaken: '4 Months',
    startDate: 'Jan 15, 2025',
    completedDate: 'May 15, 2025',
    methods: ['Agile Development', 'User Testing', 'A/B Testing'],
    team: [{
      role: 'Web Developers',
      people: ['John Smith', 'Emily Johnson']
    }, {
      role: 'UI/UX Designer',
      people: ['Jessica Lee']
    }, {
      role: 'Project Manager',
      people: ['Michael Williams']
    }]
  }, {
    id: 2,
    title: 'Mobile Banking App',
    description: 'Secure and user-friendly banking application',
    category: 'Mobile Apps',
    technologies: ['React Native', 'Firebase'],
    client: 'FinanceHub',
    featured: true,
    link: '#',
    image: 'https://images.unsplash.com/photo-1556742031-c6961e8560b0?auto=format&fit=crop&w=1000&q=80',
    coverImage: '/freepik__it-company-project-banner-global-network-visualiza__30555.png',
    timeTaken: '3 Months',
    startDate: 'Feb 01, 2025',
    completedDate: 'Apr 30, 2025',
    methods: ['Scrum', 'CI/CD'],
    team: [{
      role: 'Mobile Devs',
      people: ['Sarah Adams', 'Robert Johnson']
    }, {
      role: 'QA',
      people: ['Emma Taylor']
    }]
  }, {
    id: 3,
    title: 'Brand Identity Design',
    description: 'Complete brand identity and visual design system',
    category: 'Branding',
    technologies: ['Figma', 'Adobe Suite'],
    client: 'StartupXYZ',
    featured: false,
    link: '#',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80'
  }]);

  // Featured section heading (title + description)
  const [featuredSection, setFeaturedSection] = useState({
    title: 'Featured Projects',
    description: 'Deep dives into selected projects with timelines, tech and teams.'
  });

  // Technologies section at bottom
  const [technologiesSection, setTechnologiesSection] = useState({
    title: 'Technologies We Use',
    subtitle: 'Modern stacks and platforms powering our solutions.'
  });
  const [techList, setTechList] = useState(['React', 'Node.js', 'Python', 'MongoDB', 'AWS', 'Docker', 'TypeScript', 'Figma']);
  const [loading, setLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState('idle');
  const {
    toast
  } = useToast();
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const pageResponse = await pageApi.get('portfolio');
        if (pageResponse.success && pageResponse.data) {
          const fields = pageResponse.data.fields || [];
          fields.forEach(field => {
            if (field.id === 'heroContent' && field.value) setHeroContent(field.value);
            if (field.id === 'keyFeatures' && field.value) setKeyFeatures(field.value);
            if (field.id === 'keyFeaturesSection' && field.value) setKeyFeaturesSection(field.value);
            if (field.id === 'searchSection' && field.value) setSearchSection(field.value);
            if (field.id === 'categories' && field.value) setCategories(field.value);
            if (field.id === 'featuredSection' && field.value) setFeaturedSection(field.value);
            if (field.id === 'technologiesSection' && field.value) setTechnologiesSection(field.value);
            if (field.id === 'techList' && field.value) setTechList(field.value);
          });
        }
        const portfolioResponse = await portfolioApi.list();
        if (portfolioResponse.success && portfolioResponse.data) {
          // Normalize backend items: convert _id to id for consistent handling
          const normalizedItems = portfolioResponse.data.map(item => ({
            ...item,
            id: item._id || item.id // Use _id from backend, fallback to id
          }));
          setPortfolioItems(normalizedItems);
        }
      } catch (error) {
        console.error('Failed to load portfolio page data:', error);
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
        id: 'portfolio',
        title: 'Portfolio Page',
        fields: [{
          id: 'heroContent',
          label: 'Hero Content',
          type: 'object',
          value: heroContent
        }, {
          id: 'keyFeatures',
          label: 'Key Features',
          type: 'array',
          value: keyFeatures
        }, {
          id: 'keyFeaturesSection',
          label: 'Key Features Section',
          type: 'object',
          value: keyFeaturesSection
        }, {
          id: 'searchSection',
          label: 'Search Section',
          type: 'object',
          value: searchSection
        }, {
          id: 'categories',
          label: 'Categories',
          type: 'array',
          value: categories
        }, {
          id: 'featuredSection',
          label: 'Featured Section',
          type: 'object',
          value: featuredSection
        }, {
          id: 'technologiesSection',
          label: 'Technologies Section',
          type: 'object',
          value: technologiesSection
        }, {
          id: 'techList',
          label: 'Tech List',
          type: 'array',
          value: techList
        }]
      };
      await pageApi.update('portfolio', pageData);

      // Save portfolio items: new items (numeric id) are created, existing items (string id) are updated
      for (const item of portfolioItems) {
        if (!item.id) continue;
        const isNewItem = typeof item.id === 'number';
        try {
          if (isNewItem) {
            // New item: remove numeric id before sending, let backend generate _id
            const {
              id,
              _id,
              createdAt,
              updatedAt,
              __v,
              ...itemData
            } = item;
            await portfolioApi.create(itemData);
          } else {
            // Existing item: use string id (MongoDB ObjectId) for update
            await portfolioApi.update(String(item.id), item);
          }
        } catch (error) {
          console.error(`Error saving item ${item.id}:`, error);
        }
      }
      setSaveStatus('success');
      toast({
        title: "Success!",
        description: "Portfolio page content and items saved successfully to database."
      });
      setTimeout(() => setSaveStatus('idle'), 2000);
    } catch (error) {
      console.error('Failed to save portfolio page:', error);
      setSaveStatus('error');
      toast({
        title: "Error",
        description: error.message || "Failed to save portfolio page content. Please try again.",
        variant: "destructive"
      });
      setTimeout(() => setSaveStatus('idle'), 2000);
    }
  };

  // CRUD handlers
  const addFeature = () => setKeyFeatures([...keyFeatures, {
    title: 'New Feature',
    desc: 'Feature description'
  }]);
  const updateFeature = (index, field, value) => {
    setKeyFeatures(keyFeatures.map((f, i) => i === index ? {
      ...f,
      [field]: value
    } : f));
  };
  const deleteFeature = index => setKeyFeatures(keyFeatures.filter((_, i) => i !== index));
  const addPortfolioItem = () => {
    // Use numeric ID for new items (will be converted when saved)
    const newItem = {
      id: Date.now(),
      // Numeric ID marks this as a new unsaved item
      title: 'New Project',
      description: 'Project description',
      category: 'Web Development',
      technologies: ['React'],
      client: 'Client Name',
      link: '#',
      featured: false,
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=60',
      coverImage: '',
      timeTaken: '',
      startDate: '',
      completedDate: '',
      methods: [],
      team: []
    };
    setPortfolioItems(prevItems => [...prevItems, newItem]);
  };
  const updatePortfolioItem = (id, field, value) => {
    setPortfolioItems(prevItems => prevItems.map(item => item.id === id ? {
      ...item,
      [field]: value
    } : item));
  };
  const handleProjectImageUpload = async (itemId, field, file) => {
    try {
      const res = await uploadApi.uploadImage(file, 'portfolios');
      if (res.success && res.data) {
        const uploadedUrl = res.data?.url || '';
        setPortfolioItems(prevItems => prevItems.map(item => item.id === itemId ? {
          ...item,
          [field]: uploadedUrl
        } : item));
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
  const deletePortfolioItem = async id => {
    try {
      // If it's an existing item (string ID from MongoDB), delete from database
      if (typeof id === 'string') {
        const response = await portfolioApi.delete(id);
        if (!response.success) {
          toast({
            title: "Error",
            description: "Failed to delete from database",
            variant: "destructive"
          });
          return;
        }
      }

      // Remove from state after successful database delete (or immediately for new items)
      setPortfolioItems(prevItems => prevItems.filter(item => item.id !== id));
      toast({
        title: "Success",
        description: "Project deleted successfully"
      });
    } catch (error) {
      console.error('Error deleting portfolio item:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to delete project",
        variant: "destructive"
      });
    }
  };
  const addTechnologyToItem = itemId => {
    const item = portfolioItems.find(i => i.id === itemId);
    if (item) updatePortfolioItem(itemId, 'technologies', [...item.technologies, 'New Tech']);
  };
  const updateTechnologyInItem = (itemId, techIndex, value) => {
    const item = portfolioItems.find(i => i.id === itemId);
    if (item) {
      const updated = [...item.technologies];
      updated[techIndex] = value;
      updatePortfolioItem(itemId, 'technologies', updated);
    }
  };
  const deleteTechnologyInItem = (itemId, techIndex) => {
    const item = portfolioItems.find(i => i.id === itemId);
    if (item) updatePortfolioItem(itemId, 'technologies', item.technologies.filter((_, idx) => idx !== techIndex));
  };
  const addCategory = () => setCategories([...categories, 'New Category']);
  const updateCategory = (index, value) => {
    const updated = [...categories];
    updated[index] = value;
    setCategories(updated);
  };
  const deleteCategory = index => setCategories(categories.filter((_, i) => i !== index));
  const addMethod = itemId => {
    const item = portfolioItems.find(i => i.id === itemId);
    if (item) updatePortfolioItem(itemId, 'methods', [...(item.methods || []), 'New Method']);
  };
  const updateMethod = (itemId, methodIndex, value) => {
    const item = portfolioItems.find(i => i.id === itemId);
    if (item) {
      const updated = [...(item.methods || [])];
      updated[methodIndex] = value;
      updatePortfolioItem(itemId, 'methods', updated);
    }
  };
  const deleteMethod = (itemId, methodIndex) => {
    const item = portfolioItems.find(i => i.id === itemId);
    if (item) updatePortfolioItem(itemId, 'methods', (item.methods || []).filter((_, idx) => idx !== methodIndex));
  };
  const addTeamGroup = itemId => {
    const item = portfolioItems.find(i => i.id === itemId);
    if (item) updatePortfolioItem(itemId, 'team', [...(item.team || []), {
      role: 'Role',
      people: ['Name']
    }]);
  };
  const updateTeamGroup = (itemId, groupIndex, field, value, personIndex) => {
    const item = portfolioItems.find(i => i.id === itemId);
    if (!item) return;
    const groups = [...(item.team || [])];
    if (field === 'role') {
      groups[groupIndex] = {
        ...groups[groupIndex],
        role: value
      };
    } else {
      const people = [...groups[groupIndex].people];
      if (typeof personIndex === 'number') people[personIndex] = value;else people.push(value);
      groups[groupIndex] = {
        ...groups[groupIndex],
        people
      };
    }
    updatePortfolioItem(itemId, 'team', groups);
  };
  const deleteTeamGroup = (itemId, groupIndex) => {
    const item = portfolioItems.find(i => i.id === itemId);
    if (item) updatePortfolioItem(itemId, 'team', (item.team || []).filter((_, idx) => idx !== groupIndex));
  };
  const deleteTeamPerson = (itemId, groupIndex, personIndex) => {
    const item = portfolioItems.find(i => i.id === itemId);
    if (item) {
      const groups = [...(item.team || [])];
      groups[groupIndex] = {
        ...groups[groupIndex],
        people: groups[groupIndex].people.filter((_, idx) => idx !== personIndex)
      };
      updatePortfolioItem(itemId, 'team', groups);
    }
  };
  const addTech = () => setTechList([...techList, 'New Tech']);
  const updateTech = (index, value) => setTechList(techList.map((t, i) => i === index ? value : t));
  const deleteTech = index => setTechList(techList.filter((_, i) => i !== index));
  return <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Portfolio Page CMS</h2>
        <Button onClick={handleSave} className="group" disabled={loading || saveStatus === 'saving'}>
          <Save className="w-4 h-4 mr-2" />
          {saveStatus === 'saving' ? 'Saving...' : saveStatus === 'success' ? 'Saved!' : saveStatus === 'error' ? 'Error' : 'Save Changes'}
        </Button>
      </div>

      <Tabs defaultValue="hero" className="w-full">
        <TabsList className="flex w-full overflow-x-auto justify-start hide-scrollbar gap-2 p-1 bg-primary-slate/30 rounded-xl mb-6">
          <TabsTrigger value="hero">Hero</TabsTrigger>
          <TabsTrigger value="features">Key Features</TabsTrigger>
          <TabsTrigger value="search">Search</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="filters">Categories</TabsTrigger>
          <TabsTrigger value="featured">Featured Section</TabsTrigger>
          <TabsTrigger value="technologies">Technologies</TabsTrigger>
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

        {/* Key Features */}
        <TabsContent value="features" className="space-y-6">
          <Card hover className="p-6">
            <CardHeader>
              <CardTitle>Key Features Section</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Section Title</label>
                <AdminInput value={keyFeaturesSection.title} onChange={e => setKeyFeaturesSection({
                ...keyFeaturesSection,
                title: e.target.value
              })} placeholder="Section title" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Section Subtitle</label>
                <AdminTextarea value={keyFeaturesSection.subtitle} onChange={e => setKeyFeaturesSection({
                ...keyFeaturesSection,
                subtitle: e.target.value
              })} placeholder="Section subtitle" rows={2} />
              </div>
            </CardContent>
          </Card>

          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Key Features</h3>
            <Button onClick={addFeature} size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Feature
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {keyFeatures.map((f, i) => <Card key={i} hover className="p-6">
                <CardContent className="p-4 space-y-3">
                  <AdminInput value={f.title} onChange={e => updateFeature(i, 'title', e.target.value)} placeholder="Title" />
                  <AdminTextarea value={f.desc} onChange={e => updateFeature(i, 'desc', e.target.value)} placeholder="Description" rows={2} />
                  <div className="flex justify-end">
                    <Button size="sm" variant="outline" onClick={() => deleteFeature(i)} className="border-red-500/30 text-red-400 hover:bg-red-500/10">
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>)}
          </div>
        </TabsContent>

        {/* Search Section */}
        <TabsContent value="search" className="space-y-6">
          <Card hover className="p-6">
            <CardHeader>
              <CardTitle>Search & Filter Section</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Search Placeholder</label>
                <AdminInput value={searchSection.placeholder} onChange={e => setSearchSection({
                ...searchSection,
                placeholder: e.target.value
              })} placeholder="Search placeholder text" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">No Results Title</label>
                <AdminInput value={searchSection.noResultsTitle} onChange={e => setSearchSection({
                ...searchSection,
                noResultsTitle: e.target.value
              })} placeholder="No results title" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">No Results Description</label>
                <AdminTextarea value={searchSection.noResultsDescription} onChange={e => setSearchSection({
                ...searchSection,
                noResultsDescription: e.target.value
              })} placeholder="No results description" rows={2} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Projects */}
        <TabsContent value="projects" className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Portfolio Projects</h3>
            <Button onClick={addPortfolioItem} size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Project
            </Button>
          </div>

          <div className="space-y-6">
            {portfolioItems.map((item, idx) => <Card key={item.id} hover className="p-6">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Badge className="bg-primary-blue/20 text-primary-blue border-primary-blue/30">
                        {item.featured ? 'Featured' : 'Project'}
                      </Badge>
                      <Badge className="bg-primary-blue/20 text-primary-blue border-primary-blue/30">{item.category}</Badge>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Edit className="w-3 h-3" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => deletePortfolioItem(item.id)} className="border-red-500/30 text-red-400 hover:bg-red-500/10">
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <AdminInput value={item.title} onChange={e => updatePortfolioItem(item.id, 'title', e.target.value)} placeholder="Project title" />
                    <AdminInput value={item.category} onChange={e => updatePortfolioItem(item.id, 'category', e.target.value)} placeholder="Category" />
                  </div>

                  <AdminTextarea value={item.description} onChange={e => updatePortfolioItem(item.id, 'description', e.target.value)} placeholder="Project description" rows={2} />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <AdminInput value={item.client} onChange={e => updatePortfolioItem(item.id, 'client', e.target.value)} placeholder="Client name" />
                    <AdminInput value={item.link} onChange={e => updatePortfolioItem(item.id, 'link', e.target.value)} placeholder="Project URL" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium">Grid Image</label>
                      {item.image ? <div className="relative">
                          <img src={getAssetUrl(item.image)} alt={item.title} className="w-full h-48 object-cover rounded-lg" />
                          <button onClick={() => updatePortfolioItem(item.id, 'image', '')} className="absolute top-2 right-2 p-1 bg-red-500 rounded-full text-white hover:bg-red-600">
                            <X className="w-4 h-4" />
                          </button>
                        </div> : null}
                      <div className="flex flex-col gap-2">
                        <AdminInput value={item.image} onChange={e => updatePortfolioItem(item.id, 'image', e.target.value)} placeholder="Grid image URL" />
                        <label className="flex items-center justify-center px-4 py-2 bg-primary-slate/30 border border-white/20 rounded-xl cursor-pointer hover:bg-primary-slate/40 transition">
                          <Upload className="w-4 h-4 mr-2" />
                          <span className="text-sm">Upload Image</span>
                          <input type="file" accept="image/*" className="hidden" onChange={e => {
                        const file = e.target.files?.[0];
                        if (file) handleProjectImageUpload(item.id, 'image', file);
                      }} />
                        </label>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium">Featured Cover Image</label>
                      {item.coverImage ? <div className="relative">
                          <img src={getAssetUrl(item.coverImage)} alt={`${item.title} cover`} className="w-full h-48 object-cover rounded-lg" />
                          <button onClick={() => updatePortfolioItem(item.id, 'coverImage', '')} className="absolute top-2 right-2 p-1 bg-red-500 rounded-full text-white hover:bg-red-600">
                            <X className="w-4 h-4" />
                          </button>
                        </div> : null}
                      <div className="flex flex-col gap-2">
                        <AdminInput value={item.coverImage || ''} onChange={e => updatePortfolioItem(item.id, 'coverImage', e.target.value)} placeholder="Cover image URL" />
                        <label className="flex items-center justify-center px-4 py-2 bg-primary-slate/30 border border-white/20 rounded-xl cursor-pointer hover:bg-primary-slate/40 transition">
                          <Upload className="w-4 h-4 mr-2" />
                          <span className="text-sm">Upload Cover</span>
                          <input type="file" accept="image/*" className="hidden" onChange={e => {
                        const file = e.target.files?.[0];
                        if (file) handleProjectImageUpload(item.id, 'coverImage', file);
                      }} />
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input type="checkbox" checked={item.featured} onChange={e => updatePortfolioItem(item.id, 'featured', e.target.checked)} className="rounded" />
                    <label className="text-sm">Featured Project</label>
                  </div>

                  {/* Featured Meta */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <AdminInput value={item.timeTaken || ''} onChange={e => updatePortfolioItem(item.id, 'timeTaken', e.target.value)} placeholder="Time Taken (e.g., 4 Months)" />
                    <AdminInput value={item.startDate || ''} onChange={e => updatePortfolioItem(item.id, 'startDate', e.target.value)} placeholder="Start Date" />
                    <AdminInput value={item.completedDate || ''} onChange={e => updatePortfolioItem(item.id, 'completedDate', e.target.value)} placeholder="Completed Date" />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-medium">Technologies</label>
                      <Button size="sm" variant="outline" onClick={() => addTechnologyToItem(item.id)}>
                        <Plus className="w-3 h-3 mr-1" />
                        Add Tech
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {item.technologies.map((tech, tIndex) => <div key={tIndex} className="flex items-center space-x-1">
                          <AdminInput value={tech} onChange={e => updateTechnologyInItem(item.id, tIndex, e.target.value)} placeholder="Technology" className="w-28" />
                          <Button size="sm" variant="outline" onClick={() => deleteTechnologyInItem(item.id, tIndex)}>
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>)}
                    </div>
                  </div>

                  {/* Methods Used */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-medium">Methods Used</label>
                      <Button size="sm" variant="outline" onClick={() => addMethod(item.id)}>
                        <Plus className="w-3 h-3 mr-1" />
                        Add Method
                      </Button>
                    </div>
                    <div className="space-y-2">
                      {(item.methods || []).map((m, mi) => <div key={mi} className="flex items-center gap-2">
                          <AdminInput value={m} onChange={e => updateMethod(item.id, mi, e.target.value)} placeholder="Method" />
                          <Button size="sm" variant="outline" onClick={() => deleteMethod(item.id, mi)} className="border-red-500/30 text-red-400 hover:bg-red-500/10">
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>)}
                    </div>
                  </div>

                  {/* Team Members */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-medium">Team Members</label>
                      <Button size="sm" variant="outline" onClick={() => addTeamGroup(item.id)}>
                        <Plus className="w-3 h-3 mr-1" />
                        Add Team Group
                      </Button>
                    </div>
                    <div className="space-y-3">
                      {(item.team || []).map((g, gi) => <Card key={gi} hover className="p-4">
                          <CardContent className="p-3 space-y-2">
                            <div className="flex items-center justify-between">
                              <AdminInput value={g.role} onChange={e => updateTeamGroup(item.id, gi, 'role', e.target.value)} placeholder="Role" />
                              <Button size="sm" variant="outline" onClick={() => deleteTeamGroup(item.id, gi)} className="border-red-500/30 text-red-400 hover:bg-red-500/10">
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                            <div className="space-y-2">
                              {g.people.map((p, pi) => <div key={pi} className="flex items-center gap-2">
                                  <AdminInput value={p} onChange={e => updateTeamGroup(item.id, gi, 'people', e.target.value, pi)} placeholder="Person name" />
                                  <Button size="sm" variant="outline" onClick={() => deleteTeamPerson(item.id, gi, pi)} className="border-red-500/30 text-red-400 hover:bg-red-500/10">
                                    <Trash2 className="w-3 h-3" />
                                  </Button>
                                </div>)}
                            </div>
                          </CardContent>
                        </Card>)}
                    </div>
                  </div>
                </CardContent>
              </Card>)}
          </div>
        </TabsContent>

        {/* Categories */}
        <TabsContent value="filters" className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Project Categories</h3>
            <Button onClick={addCategory} size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Category
            </Button>
          </div>

          <div className="space-y-2">
            {categories.map((category, index) => <div key={index} className="flex items-center space-x-2">
                <AdminInput value={category} onChange={e => updateCategory(index, e.target.value)} placeholder="Category name" />
                <Button size="sm" variant="outline" onClick={() => deleteCategory(index)}>
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>)}
          </div>
        </TabsContent>

        {/* Featured Section Heading */}
        <TabsContent value="featured" className="space-y-6">
          <Card hover className="p-6">
            <CardHeader>
              <CardTitle>Featured Projects Section</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Section Title</label>
                <AdminInput value={featuredSection.title} onChange={e => setFeaturedSection({
                ...featuredSection,
                title: e.target.value
              })} placeholder="Section title" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Section Description</label>
                <AdminTextarea value={featuredSection.description} onChange={e => setFeaturedSection({
                ...featuredSection,
                description: e.target.value
              })} placeholder="Section description" rows={3} />
              </div>
              <p className="text-xs text-primary-gray">Tip: Mark projects as Featured in the Projects tab and fill their Featured Meta (cover image, dates, methods, team).</p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Technologies */}
        <TabsContent value="technologies" className="space-y-6">
          <Card hover className="p-6">
            <CardHeader>
              <CardTitle>Technologies Section</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Section Title</label>
                  <AdminInput value={technologiesSection.title} onChange={e => setTechnologiesSection({
                  ...technologiesSection,
                  title: e.target.value
                })} placeholder="Section title" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Section Subtitle</label>
                  <AdminTextarea value={technologiesSection.subtitle} onChange={e => setTechnologiesSection({
                  ...technologiesSection,
                  subtitle: e.target.value
                })} placeholder="Section subtitle" rows={2} />
                </div>
              </div>

              <div className="space-y-2">
                {techList.map((t, i) => <div key={i} className="flex items-center gap-2">
                    <AdminInput value={t} onChange={e => updateTech(i, e.target.value)} placeholder="Technology" />
                    <Button size="sm" variant="outline" onClick={() => deleteTech(i)} className="border-red-500/30 text-red-400 hover:bg-red-500/10">
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>)}
              </div>
              <Button onClick={addTech} size="sm" className="mt-3">
                <Plus className="w-4 h-4 mr-2" />
                Add Technology
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>;
}
