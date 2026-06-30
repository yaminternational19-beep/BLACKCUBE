'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Zap, ExternalLink, Filter, Search, X, Calendar, Users, CheckCircle2, ChevronRight, LayoutTemplate, Globe, Smartphone } from
'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import Layout from '@/components/layout/Layout';
import Button from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { pageApi, portfolioApi, getAssetUrl } from '@/api';






const PortfolioClient = ({ initialData, initialPortfolioItems }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedId, setExpandedId] = useState(null);
  const [featuredProjectId, setFeaturedProjectId] = useState(null);

  const [heroContent, setHeroContent] = useState({ title: '', subtitle: '', primaryCta: '', secondaryCta: '' });
  const [keyFeatures, setKeyFeatures] = useState([]);
  const [searchSection, setSearchSection] = useState({ placeholder: '', noResultsTitle: '', noResultsDescription: '' });
  const [categories, setCategories] = useState(['All']);
  const [featuredSection, setFeaturedSection] = useState({ title: '', description: '' });
  const [keyFeaturesSection, setKeyFeaturesSection] = useState({ title: '', subtitle: '' });
  const [techList, setTechList] = useState([]);
  const [portfolioItems, setPortfolioItems] = useState([]);

  useEffect(() => {
    const processPageData = (data) => {
      const fields = data.fields || [];
      fields.forEach((f) => {
        switch (f.id) {
          case 'heroContent':setHeroContent(f.value);break;
          case 'keyFeatures':setKeyFeatures(f.value);break;
          case 'searchSection':setSearchSection(f.value);break;
          case 'categories':setCategories(['All', ...f.value.filter((c) => c !== 'All')]);break;
          case 'featuredSection':setFeaturedSection(f.value);break;
          case 'techList':setTechList(f.value);break;
          case 'keyFeaturesSection':setKeyFeaturesSection(f.value);break;
        }
      });
    };

    if (initialData) processPageData(initialData);
    if (initialPortfolioItems) {
      setPortfolioItems(initialPortfolioItems);
      const firstFeatured = initialPortfolioItems.find((p) => p.featured);
      if (firstFeatured) setFeaturedProjectId(firstFeatured.id);
    }

    if (!initialData || !initialPortfolioItems) {
      const load = async () => {
        try {
          if (!initialData) {
            const pageRes = await pageApi.get('portfolio');
            if (pageRes.success) processPageData(pageRes.data);
          }
          if (!initialPortfolioItems) {
            const listRes = await portfolioApi.list();
            if (listRes.success) {
              setPortfolioItems(listRes.data);
              const firstFeatured = listRes.data.find((p) => p.featured);
              if (firstFeatured) setFeaturedProjectId(firstFeatured.id);
            }
          }
        } catch (err) {}
      };
      load();
    }
  }, [initialData, initialPortfolioItems]);

  const filteredItems = portfolioItems.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.title?.toLowerCase().includes(searchTerm.toLowerCase()) || (item.technologies || []).some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <Layout>
      <SEO title="Portfolio" description="Discover our latest successful projects and digital transformations." url="/portfolio" />
      <div className="min-h-screen bg-black text-white">
        <section className="relative min-h-screen flex items-center justify-center pt-24 md:pt-28 pb-10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
          <div className="absolute right-0 lg:right-0 xl:right-15 2xl:right-70 top-1/2 -translate-y-1/2 opacity-5 text-[14rem] sm:text-[16rem] md:text-[28rem] lg:text-[40rem] font-bold leading-none pointer-events-none">BCS</div>
          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
              <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
                <motion.h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6 leading-tight text-center lg:text-left" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>{heroContent.title}</motion.h1>
                <motion.p className="text-base sm:text-lg md:text-xl text-gray-400 mb-6 md:mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0 text-center lg:text-left" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}>{heroContent.subtitle}</motion.p>
                <div className="flex flex-wrap gap-3 md:gap-4 justify-center lg:justify-start">
                  <Link to="/contact" className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-black font-semibold rounded hover:bg-gray-200 transition-colors">{heroContent.primaryCta}</Link>
                  <Link to="/services" className="px-6 sm:px-8 py-3 sm:py-4 border border-gray-700 text-white font-semibold rounded hover:bg-gray-900 transition-colors">{heroContent.secondaryCta}</Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section id="features" className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-bl from-black via-gray-900 to-black pointer-events-none" />
          <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-3">{keyFeaturesSection.title}</h2>
              <p className="text-gray-400 max-w-3xl mx-auto leading-relaxed">{keyFeaturesSection.subtitle}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {keyFeatures.map((f, i) =>
              <Card key={i} hover className="relative bg-[#111] rounded-2xl p-8 h-full text-center border-0">
                  <div className="relative z-10 w-16 h-16 bg-[#0f0f0f] rounded-full mx-auto mb-5 flex items-center justify-center ring-1 ring-white/10"><Zap className="w-7 h-7 text-white/85" /></div>
                  <h3 className="text-lg font-semibold text-white mb-2">{f.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
                </Card>
              )}
            </div>
          </div>
        </section>

        
        {/* Featured Section */}
        {featuredSection && featuredProjectId && portfolioItems.find(p => p.id === featuredProjectId) && (
          <section className="py-20 bg-[#0a0a0a] relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-black via-gray-900 to-black pointer-events-none" />
            <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-3">{featuredSection.title || "Featured Project"}</h2>
                <p className="text-gray-400 max-w-3xl mx-auto leading-relaxed">{featuredSection.description || "Take a closer look at our most recent success story."}</p>
              </div>
              
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                {(() => {
                  const fp = portfolioItems.find(p => p.id === featuredProjectId);
                  return (
                    <Card className="bg-[#111] border-0 ring-1 ring-white/10 overflow-hidden rounded-3xl p-0">
                      <div className="grid grid-cols-1 lg:grid-cols-2">
                        <div className="h-64 lg:h-auto min-h-[400px] relative">
                          <img src={getAssetUrl(fp.coverImage) || getAssetUrl(fp.image) || '/placeholder.svg'} alt={fp.title} className="absolute inset-0 w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent lg:bg-gradient-to-r lg:from-black/80 lg:to-transparent" />
                          <div className="absolute bottom-6 left-6 right-6">
                            <span className="px-3 py-1 bg-primary-blue text-white text-xs font-bold rounded-full uppercase tracking-wider">{fp.category}</span>
                          </div>
                        </div>
                        <div className="p-8 lg:p-12 flex flex-col justify-center">
                          <h3 className="text-3xl font-bold text-white mb-4">{fp.title}</h3>
                          <p className="text-gray-300 leading-relaxed mb-8">{fp.description}</p>
                          
                          <div className="grid grid-cols-2 gap-6 mb-8">
                            {fp.client && (
                              <div>
                                <p className="text-gray-500 text-sm mb-1 uppercase tracking-wider font-semibold">Client</p>
                                <p className="text-white">{fp.client}</p>
                              </div>
                            )}
                            {fp.duration && (
                              <div>
                                <p className="text-gray-500 text-sm mb-1 uppercase tracking-wider font-semibold">Duration</p>
                                <p className="text-white flex items-center"><Calendar className="w-4 h-4 mr-2 text-primary-blue" />{fp.duration}</p>
                              </div>
                            )}
                          </div>
                          
                          <Button onClick={() => setExpandedId(fp.id)} className="w-fit">View Full Case Study <ChevronRight className="ml-2 w-4 h-4" /></Button>
                        </div>
                      </div>
                    </Card>
                  );
                })()}
              </motion.div>
            </div>
          </section>
        )}

        <section id="search" className="py-16 bg-gray-900/30 relative overflow-hidden">
          <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex flex-col md:flex-row gap-8 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input type="text" placeholder={searchSection.placeholder} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/20" />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) =>
              <button key={cat} onClick={() => setSelectedCategory(cat)} className={`px-4 py-2 rounded-xl font-medium transition-all ${selectedCategory === cat ? 'bg-neutral-800 text-white ring-1 ring-white/10' : 'bg-neutral-900 text-gray-400 hover:bg-neutral-800/60 hover:text-white ring-1 ring-white/5'}`}>{cat}</button>
              )}
            </div>
          </div>
        </section>

        <section ref={ref} className="py-20 relative overflow-hidden" id="projects">
          <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            {filteredItems.length === 0 ?
            <div className="text-center py-20"><Filter className="w-16 h-16 text-gray-400 mx-auto mb-4" /><h3 className="text-2xl font-semibold text-white mb-2">{searchSection.noResultsTitle}</h3><p className="text-gray-400">{searchSection.noResultsDescription}</p></div> :

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredItems.map((item, i) =>
              <motion.div key={item.id} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.1 }}>
                    <Card hover className="h-full group">
                      <div className="aspect-video rounded-2xl mb-6 relative overflow-hidden">
                        <img src={getAssetUrl(item.image) || '/placeholder.svg'} alt={item.title} className="w-full h-full object-cover rounded-2xl transition-transform group-hover:scale-105" loading="lazy" />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"><Button size="sm" onClick={() => setExpandedId(item.id)}>View Details <ChevronRight className="ml-2 w-4 h-4" /></Button></div>
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between"><span className="px-3 py-1 bg-[#0f0f0f] text-gray-300 text-xs rounded-full ring-1 ring-white/10">{item.category}</span>{item.featured && <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 text-xs rounded-full ring-1 ring-yellow-500/30">Featured</span>}</div>
                        <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                        <p className="text-gray-400 text-sm">{item.description}</p>
                        <div className="flex flex-wrap gap-2">{(item.technologies || []).map((tech, idx) => <span key={idx} className="px-2 py-1 bg-gray-800/50 text-gray-400 text-xs rounded">{tech}</span>)}</div>
                      </div>
                    </Card>
                  </motion.div>
              )}
              </div>
            }
          </div>
        </section>

        {/* Project Details Modal */}
        {expandedId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6" style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-[#111] w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/10 shadow-2xl relative custom-scrollbar"
            >
              {(() => {
                const project = portfolioItems.find(p => p.id === expandedId);
                if (!project) return null;
                return (
                  <div>
                    <button 
                      onClick={() => setExpandedId(null)}
                      className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-black text-white rounded-full flex items-center justify-center backdrop-blur-md transition-all"
                    >
                      <X className="w-5 h-5" />
                    </button>
                    
                    <div className="h-64 sm:h-80 md:h-96 relative w-full">
                      <img src={getAssetUrl(project.coverImage) || getAssetUrl(project.image) || '/placeholder.svg'} alt={project.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#111] to-transparent" />
                      <div className="absolute bottom-6 left-8 right-8">
                        <span className="px-3 py-1 bg-white/10 backdrop-blur-md text-white text-xs font-bold rounded-full uppercase tracking-wider mb-4 inline-block ring-1 ring-white/20">{project.category}</span>
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-2">{project.title}</h2>
                        {project.client && <p className="text-gray-300 text-lg">For {project.client}</p>}
                      </div>
                    </div>
                    
                    <div className="p-8 lg:p-12">
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        <div className="lg:col-span-2 space-y-10">
                          <div>
                            <h3 className="text-2xl font-bold text-white mb-4">About The Project</h3>
                            <p className="text-gray-400 leading-relaxed text-lg">{project.description}</p>
                          </div>
                          
                          {project.results && project.results.length > 0 && (
                            <div>
                              <h3 className="text-2xl font-bold text-white mb-6">Key Results</h3>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {project.results.map((result, idx) => (
                                  <div key={idx} className="flex items-start">
                                    <CheckCircle2 className="w-6 h-6 text-primary-blue mr-3 flex-shrink-0 mt-0.5" />
                                    <span className="text-gray-300">{result}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          {project.methods && project.methods.length > 0 && (
                            <div>
                              <h3 className="text-2xl font-bold text-white mb-6">Our Approach</h3>
                              <div className="flex flex-wrap gap-3">
                                {project.methods.map((method, idx) => (
                                  <span key={idx} className="px-4 py-2 bg-[#1a1a1a] ring-1 ring-white/5 text-gray-300 rounded-lg text-sm font-medium flex items-center">
                                    <LayoutTemplate className="w-4 h-4 mr-2 text-gray-500" />
                                    {method}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                        
                        <div className="space-y-8">
                          <Card className="bg-[#1a1a1a] border-0 ring-1 ring-white/5 p-6">
                            <h4 className="text-lg font-bold text-white mb-6">Project Details</h4>
                            
                            <div className="space-y-6">
                              {project.client && (
                                <div>
                                  <p className="text-gray-500 text-xs uppercase tracking-wider font-semibold mb-1">Client</p>
                                  <p className="text-white font-medium">{project.client}</p>
                                </div>
                              )}
                              
                              {project.duration && (
                                <div>
                                  <p className="text-gray-500 text-xs uppercase tracking-wider font-semibold mb-1">Duration</p>
                                  <p className="text-white font-medium flex items-center"><Calendar className="w-4 h-4 mr-2 text-primary-blue" /> {project.duration}</p>
                                </div>
                              )}
                              
                              {project.technologies && project.technologies.length > 0 && (
                                <div>
                                  <p className="text-gray-500 text-xs uppercase tracking-wider font-semibold mb-3">Technologies</p>
                                  <div className="flex flex-wrap gap-2">
                                    {project.technologies.map((tech, idx) => (
                                      <span key={idx} className="px-2 py-1 bg-white/5 text-gray-300 text-xs rounded">{tech}</span>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {(project.website_url || project.app_store_url || project.google_store_url) && (
                                <div className="pt-4 border-t border-white/5">
                                  <p className="text-gray-500 text-xs uppercase tracking-wider font-semibold mb-3">Project Links</p>
                                  <div className="flex flex-col gap-3">
                                    {project.website_url && (
                                      <a href={project.website_url} target="_blank" rel="noopener noreferrer" className="flex items-center text-white hover:text-primary-blue transition-colors text-sm font-medium">
                                        <Globe className="w-4 h-4 mr-3 text-primary-blue" />
                                        Visit Website
                                      </a>
                                    )}
                                    {project.app_store_url && (
                                      <a href={project.app_store_url} target="_blank" rel="noopener noreferrer" className="flex items-center text-white hover:text-primary-blue transition-colors text-sm font-medium">
                                        <Smartphone className="w-4 h-4 mr-3 text-primary-blue" />
                                        App Store
                                      </a>
                                    )}
                                    {project.google_store_url && (
                                      <a href={project.google_store_url} target="_blank" rel="noopener noreferrer" className="flex items-center text-white hover:text-primary-blue transition-colors text-sm font-medium">
                                        <Smartphone className="w-4 h-4 mr-3 text-primary-blue" />
                                        Google Play
                                      </a>
                                    )}
                                  </div>
                                </div>
                              )}
                            </div>
                          </Card>
                          
                          {project.team && project.team.length > 0 && (
                            <Card className="bg-[#1a1a1a] border-0 ring-1 ring-white/5 p-6">
                              <div className="flex items-center mb-6">
                                <Users className="w-5 h-5 mr-2 text-primary-blue" />
                                <h4 className="text-lg font-bold text-white">Project Team</h4>
                              </div>
                              <div className="space-y-4">
                                {project.team.map((member, idx) => (
                                  <div key={idx} className="flex items-center justify-between">
                                    <span className="text-white font-medium text-sm">{member.role}</span>
                                    <span className="text-gray-500 text-sm">{member.name}</span>
                                  </div>
                                ))}
                              </div>
                            </Card>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </motion.div>
            <style>{`
              .custom-scrollbar::-webkit-scrollbar { width: 8px; }
              .custom-scrollbar::-webkit-scrollbar-track { background: #0a0a0a; border-radius: 8px; }
              .custom-scrollbar::-webkit-scrollbar-thumb { background: #333; border-radius: 8px; }
              .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #555; }
            `}</style>
          </div>
        )}

      </div>
    </Layout>
  );

};

export default PortfolioClient;

