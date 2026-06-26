'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Globe,
  Smartphone,
  Palette,
  TrendingUp,
  Cloud,
  ShoppingCart,
  CheckCircle,


  Target,
  Pencil,
  Cog,
  Rocket } from

'lucide-react';
import SEO from '@/components/SEO';
import Layout from '@/components/layout/Layout';
import { Card } from '@/components/ui/Card';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Link } from 'react-router-dom';
import { pageApi, getAssetUrl } from '@/api';





const ServicesClient = ({ initialData }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedServiceTab, setSelectedServiceTab] = useState('');

  const [heroContent, setHeroContent] = useState({
    title: '',
    subtitle: '',
    primaryCta: '',
    secondaryCta: ''
  });

  const [statsCounters, setStatsCounters] = useState([]);
  const [headings, setHeadings] = useState({
    servicesGridTitlePrefix: '',
    servicesGridTitleHighlight: '',
    servicesGridDescription: '',
    categoriesTitlePrefix: '',
    categoriesTitleHighlight: '',
    categoriesDescription: '',
    testimonialsTitlePrefix: '',
    testimonialsTitleHighlight: '',
    testimonialsDescription: '',
    industriesTitlePrefix: '',
    industriesTitleHighlight: '',
    industriesDescription: '',
    processTitlePrefix: '',
    processTitleHighlight: '',
    processDescription: '',
    faqTitlePrefix: '',
    faqTitleHighlight: '',
    faqDescription: '',
    ctaTitlePrefix: '',
    ctaTitleHighlight: '',
    ctaDescription: '',
    ctaPrimary: '',
    ctaSecondary: ''
  });

  const [serviceCategories, setServiceCategories] = useState(['All']);
  const [services, setServices] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [industries, setIndustries] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [processSteps, setProcessSteps] = useState([]);
  const [serviceTabs, setServiceTabs] = useState([]);
  const [techStackSection, setTechStackSection] = useState({ title: '', subtitle: '' });
  const [technologies, setTechnologies] = useState([]);

  const iconMap = {
    Globe, Smartphone, Palette, TrendingUp, Cloud, ShoppingCart, Target, Pencil, Cog, Rocket
  };

  useEffect(() => {
    const processData = (data) => {
      const fields = data.fields || [];
      fields.forEach((f) => {
        switch (f.id) {
          case 'heroContent':setHeroContent(f.value);break;
          case 'statsCounters':setStatsCounters(f.value);break;
          case 'headings':setHeadings((prev) => ({ ...prev, ...f.value }));break;
          case 'serviceCategories':setServiceCategories(f.value);break;
          case 'services':setServices(f.value);break;
          
          case 'industries':setIndustries(f.value);break;
          
          case 'processSteps':setProcessSteps(f.value);break;
          case 'serviceTabs':
            setServiceTabs(f.value);
            if (f.value?.[0]?.id) setSelectedServiceTab(f.value[0].id);
            break;
          case 'techStackSection':setTechStackSection(f.value);break;
          case 'technologies':setTechnologies(f.value);break;
        }
      });
    };

    if (initialData) {
      processData(initialData);
    } else {
      const load = async () => {
        try {
          const res = await pageApi.get('services');
          if (res.success && res.data) processData(res.data);
          
          const homeRes = await pageApi.get('home');
          if (homeRes.success && homeRes.data?.fields) {
            homeRes.data.fields.forEach(f => {
              if (f.id === 'faqs') setFaqs(f.value);
              if (f.id === 'testimonials') setTestimonials(f.value);
            });
          }
        } catch (err) {}
      };
      load();
    }
  }, [initialData]);

  const filteredServices = selectedCategory === 'All' ?
  services :
  services.filter((s) => s.category === selectedCategory);

  return (
    <Layout>
      <SEO title="Our Services" description="Explore our expert digital solutions including web development, mobile apps, and UI/UX design." url="/services" />
      <div className="min-h-screen bg-black text-white">
        <section className="relative min-h-screen flex items-center justify-center pt-24 md:pt-28 pb-10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
          <div className="absolute right-0 lg:right-0 xl:right-15 2xl:right-70 top-1/2 -translate-y-1/2 opacity-5 text-[14rem] sm:text-[16rem] md:text-[28rem] lg:text-[40rem] font-bold leading-none pointer-events-none">BC</div>
          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
              <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
                <motion.h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6 leading-tight text-center lg:text-left" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>{heroContent.title}</motion.h1>
                <motion.p className="text-base sm:text-lg md:text-xl text-gray-400 mb-6 md:mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0 text-center lg:text-left" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}>{heroContent.subtitle}</motion.p>
                <motion.div className="flex flex-wrap gap-3 md:gap-4 justify-center lg:justify-start" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }}>
                  <button className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-black font-semibold rounded hover:bg-gray-200 transition-colors">{heroContent.primaryCta}</button>
                  <button className="px-6 sm:px-8 py-3 sm:py-4 border border-gray-700 text-white font-semibold rounded hover:bg-gray-900 transition-colors">{heroContent.secondaryCta}</button>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-bl from-black via-gray-900 to-black pointer-events-none" />
          <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {statsCounters.map((stat, i) =>
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} viewport={{ once: true }}>
                  <Card hover className="relative bg-[#111] rounded-2xl p-8 transition-all duration-300 h-full text-center border-0">
                    <div className="text-3xl md:text-4xl font-bold text-white mb-1 opacity-95">{stat.number}</div>
                    <div className="text-gray-400 text-sm">{stat.label}</div>
                  </Card>
                </motion.div>
              )}
            </div>
          </div>
        </section>

        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black pointer-events-none" />
          <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">{headings.servicesGridTitlePrefix} <span className="text-gray-400">{headings.servicesGridTitleHighlight}</span></h2>
              <p className="text-gray-400 max-w-3xl mx-auto leading-relaxed">{headings.servicesGridDescription}</p>
            </motion.div>
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {serviceCategories.map((cat) =>
              <button key={cat} onClick={() => setSelectedCategory(cat)} className={`px-6 py-2 rounded-full font-medium transition-all ${selectedCategory === cat ? 'bg-white text-black' : 'bg-neutral-800 text-gray-400 hover:bg-neutral-700 hover:text-white'}`}>{cat}</button>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredServices.map((service, i) => {
                const Icon = iconMap[service.icon] || Globe;
                return (
                  <motion.div key={service.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="group">
                    <Card hover className="bg-[#111] rounded-2xl p-8 h-full border-0">
                      <div className="w-16 h-16 bg-[#0f0f0f] rounded-full mb-6 flex items-center justify-center ring-1 ring-white/10 group-hover:ring-white/20 transition-all"><Icon className="w-8 h-8 text-white/85" /></div>
                      <h3 className="text-xl font-semibold text-white mb-3">{service.title}</h3>
                      <p className="text-gray-400 text-sm mb-6 leading-relaxed">{service.description}</p>
                      {service.features &&
                      <ul className="space-y-2">
                          {service.features.map((f, idx) =>
                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-400"><CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" /><span>{f}</span></li>
                        )}
                        </ul>
                      }
                    </Card>
                  </motion.div>);

              })}
            </div>
          </div>
        </section>
        {/* Process Section */}
        <section className="py-20 bg-black text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black pointer-events-none" />
          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-extrabold mb-3">
                {headings.processTitlePrefix}{" "}
                <span className="text-gray-400">{headings.processTitleHighlight}</span>
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto text-base">{headings.processDescription}</p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {processSteps.map((step, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                  <Card hover className="bg-[#111] rounded-2xl p-8 h-full border-0 relative overflow-hidden group">
                    <div className="text-6xl font-black text-white/5 absolute -right-4 -bottom-4 group-hover:scale-110 transition-transform">{step.step}</div>
                    <div className="text-3xl mb-4">{step.icon}</div>
                    <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                    <p className="text-gray-400 text-sm">{step.description}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="py-20 bg-[#0a0a0a] text-white relative overflow-hidden">
          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-extrabold mb-3">{techStackSection.title}</h2>
              <p className="text-gray-400 max-w-2xl mx-auto text-base">{techStackSection.subtitle}</p>
            </motion.div>
            <div className="flex flex-wrap justify-center gap-4">
              {technologies.map((tech, i) => (
                <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                  <span className="px-6 py-3 bg-[#111] text-gray-300 rounded-xl border border-white/10 hover:border-white/30 transition-colors block">
                    {tech.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="py-20 bg-black text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black pointer-events-none" />
          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
              <h2 className="text-4xl md:text-5xl font-extrabold mb-3">
                {headings.testimonialsTitlePrefix}{" "}
                <span className="text-gray-400">{headings.testimonialsTitleHighlight}</span>
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto text-base">{headings.testimonialsDescription}</p>
            </motion.div>

            <div className="flex overflow-x-scroll no-scrollbar gap-6 mb-8">
              {testimonials.map((t, i) =>
                <Card hover key={`top-${i}`} className="rounded-2xl p-8 flex-shrink-0 w-80 md:w-96 border-0 bg-[#111]">
                  <p className="text-gray-300 text-[14px] mb-6 leading-relaxed">"{t.text || t.content}"</p>
                  <div className="flex items-center">
                    {t.avatar ? (
                      <img src={getAssetUrl(t.avatar)} alt={t.name} className="w-10 h-10 rounded-full mr-3 object-cover" loading="lazy" />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gray-800 mr-3 flex items-center justify-center font-bold text-gray-400">{t.name.charAt(0)}</div>
                    )}
                    <div>
                      <h4 className="font-semibold text-white text-[14px]">{t.name}</h4>
                      <p className="text-xs text-gray-400">{t.role}</p>
                    </div>
                  </div>
                </Card>
              )}
            </div>
          </div>
          <style>{`
            .no-scrollbar::-webkit-scrollbar { display: none; }
            .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
          `}</style>
        </section>

        {/* FAQs */}
        <section className="py-20 bg-[#0a0a0a] text-white relative">
          <div className="max-w-3xl mx-auto px-6 lg:px-12">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-extrabold mb-3">
                {headings.faqTitlePrefix}{" "}
                <span className="text-gray-400">{headings.faqTitleHighlight}</span>
              </h2>
              <p className="text-gray-400 text-base">{headings.faqDescription}</p>
            </motion.div>
            
            <Accordion type="single" collapsible className="w-full space-y-4">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-0 bg-[#111] rounded-xl px-6">
                  <AccordionTrigger className="text-left font-semibold text-lg hover:no-underline py-6">
                    {faq.q || faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-400 leading-relaxed pb-6">
                    {faq.a || faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* CTA */}
        <section className="py-32 bg-black relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-black pointer-events-none" />
          <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-12 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-4xl md:text-6xl font-bold mb-6">
                {headings.ctaTitlePrefix}{" "}
                <span className="text-gray-400">{headings.ctaTitleHighlight}</span>
              </h2>
              <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">{headings.ctaDescription}</p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link to='/contact' className="px-8 py-4 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors">
                  {headings.ctaPrimary}
                </Link>
                <button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="px-8 py-4 border border-gray-700 text-white font-bold rounded-lg hover:bg-gray-900 transition-colors">
                  {headings.ctaSecondary}
                </button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </Layout>);

};

export default ServicesClient;


