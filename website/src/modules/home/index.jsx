"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import {
  ArrowRight,
  Cloud,
  Code,
  Palette,
  Target,
  Zap,
  Shield,
  Globe,

  Award,
  TrendingUp,
  Users } from
"lucide-react";
import SEO from '@/components/SEO';
import Layout from "@/components/layout/Layout";
import { pageApi, getAssetUrl } from "@/api";
import { Link } from 'react-router-dom';
import { defaultHomePageData } from "@/data/home";
import { useNavigate, useLocation } from 'react-router-dom';





const HomeClient = ({ initialData }) => {
  const [openFaq, setOpenFaq] = useState(null);
  const router = useNavigate();
  const scrollRef1 = useRef(null);
  const scrollRef2 = useRef(null);

  useEffect(() => {
    const scroll = (
    ref,
    speed,
    reverse = false) =>
    {
      if (!ref) return;
      const el = ref;
      let scrollAmount = 0;

      const animate = () => {
        scrollAmount += reverse ? -speed : speed;
        if (reverse) {
          if (scrollAmount <= 0) scrollAmount = el.scrollWidth / 2;
        } else {
          if (scrollAmount >= el.scrollWidth / 2) scrollAmount = 0;
        }
        el.scrollLeft = scrollAmount;
        requestAnimationFrame(animate);
      };
      animate();
    };

    scroll(scrollRef1.current, 0.3); // right → left
    scroll(scrollRef2.current, 0.3, true); // left → right
  }, []);

  const [heroSlides, setHeroSlides] = useState([
  {
    title: "",
    titleHighlight: "",
    subtitle: "",
    cta: "",
    cta2: ""
  }]
  );

  const [services, setServices] = useState([
  { icon: Globe, title: "", desc: "" },
  { icon: Code, title: "", desc: "" },
  { icon: Palette, title: "", desc: "" },
  { icon: Cloud, title: "", desc: "" }]
  );

  const [reasons, setReasons] = useState([
  { icon: Target, title: "", desc: "" },
  { icon: Shield, title: "", desc: "" },
  { icon: Zap, title: "", desc: "" },
  { icon: Users, title: "", desc: "" },
  { icon: TrendingUp, title: "", desc: "" },
  { icon: Award, title: "", desc: "" }]
  );

  const [works, setWorks] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [clients, setClients] = useState([]);

  const [headings, setHeadings] = useState({
    servicesTitlePrefix: "",
    servicesTitleHighlight: "",
    servicesDescription: "",
    reasonsTitlePrefix: "",
    reasonsTitleHighlight: "",
    reasonsTitleLine2: "",
    reasonsDescription: "",
    worksTitlePrefix: "",
    worksTitleHighlight: "",
    worksDescription: "",
    testimonialsTitlePrefix: "",
    testimonialsTitleHighlight: "",
    testimonialsDescription: "",
    faqsTitlePrefix: "",
    faqsTitleHighlight: "",
    faqsDescription: "",
    clientsTitlePrefix: "",
    clientsTitleHighlight: "",
    clientsDescription: ""
  });

  const [finalCta, setFinalCta] = useState({
    titlePrefix: "",
    titleHighlight: "",
    description: "",
    primaryButton: "",
    secondaryButton: ""
  });

  // Map initial data if provided
  useEffect(() => {
    const processData = (data) => {
      const fields = data.fields || [];
      fields.forEach((f) => {
        if (f.id === 'hero' && f.value) {
          setHeroSlides([{ ...heroSlides[0], ...f.value }]);
        }
        if (f.id === 'services' && Array.isArray(f.value)) {
          const iconMap = { Globe, Code, Palette, Cloud };
          setServices(
            f.value.map((s) => ({
              icon: iconMap[s.icon] || Globe,
              title: s.title,
              desc: s.desc || s.description || ''
            }))
          );
        }
        if (f.id === 'reasons' && Array.isArray(f.value)) {
          const iconMap = { Target, Shield, Zap, Users, TrendingUp, Award };
          setReasons(
            f.value.map((r) => ({
              icon: iconMap[r.icon] || Target,
              title: r.title,
              desc: r.desc || r.description || ''
            }))
          );
        }
        if (f.id === 'works' && Array.isArray(f.value)) setWorks(f.value);
        if (f.id === 'testimonials' && Array.isArray(f.value)) setTestimonials(f.value);
        if (f.id === 'faqs' && Array.isArray(f.value)) setFaqs(f.value);
        if (f.id === 'clients' && Array.isArray(f.value)) setClients(f.value);
        if (f.id === 'headings' && f.value) setHeadings(f.value);
        if (f.id === 'finalCta' && f.value) setFinalCta(f.value);
      });
    };

    if (initialData) {
      processData(initialData);
    } else {
      const load = async () => {
        try {
          const res = await pageApi.get('home');
          if (res.success && res.data) {
            processData(res.data);
          } else {
            processData(defaultHomePageData);
          }
        } catch (e) {
          console.warn("API failed for home, using fallback data");
          processData(defaultHomePageData);
        }
      };
      load();
    }
  }, [initialData]);

  return (
    <Layout>
      <SEO title="" description="" url="/" />
      <div className="min-h-screen bg-black text-white overflow-x-hidden">
        <section className="relative min-h-screen flex items-center justify-center pt-20 md:pt-28 pb-10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
          <div className="absolute right-0 lg:right-0 xl:right-15 2xl:right-70 top-1/2 -translate-y-1/2 opacity-5 text-[14rem] sm:text-[16rem] md:text-[28rem] lg:text-[40rem] font-bold leading-none pointer-events-none">BCS</div>

          <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-12 w-full">
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
                  
                  {heroSlides[0].title}{" "}
                  <span className="text-gray-400">
                    {heroSlides[0].titleHighlight}
                  </span>
                </motion.h1>

                <motion.p
                  className="text-base sm:text-lg md:text-xl text-gray-400 mb-6 md:mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0 text-center lg:text-left"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}>
                  
                  {heroSlides[0].subtitle}
                </motion.p>

                <motion.div
                  className="flex flex-wrap gap-3 md:gap-4 justify-center lg:justify-start"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}>

                  <Link to='/contact' className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-black font-semibold rounded hover:bg-gray-200 transition-colors">
                    {heroSlides[0].cta}
                  </Link>
                  <Link to="/services" className="px-6 sm:px-8 py-3 sm:py-4 border border-gray-700 text-white font-semibold rounded hover:bg-gray-900 transition-colors">
                    {heroSlides[0].cta2}
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Reasons Section */}
        <section id="reasons" className="py-24 bg-[#1A1A1A] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-bl from-black via-gray-900 to-black pointer-events-none" />
          <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16">
              
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-3">
                {headings.reasonsTitlePrefix}{" "}
                <span className="text-gray-400">{headings.reasonsTitleHighlight}</span>
              </h2>
              <h3 className="text-base md:text-lg font-semibold text-gray-400 mb-6">
                {headings.reasonsTitleLine2}
              </h3>
              <p className="text-gray-400 max-w-3xl mx-auto leading-relaxed">
                {headings.reasonsDescription}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {reasons.map((reason, i) =>
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group">
                
                  <Card hover className="h-full relative bg-[#111] rounded-2xl p-8 transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.03)] hover:shadow-[0_0_25px_rgba(255,255,255,0.08)] ring-0">
                    <div className="absolute top-8 left-1/2 -translate-x-1/2 w-24 h-24 bg-[radial-gradient(circle,rgba(255,255,255,0.06),transparent_70%)] rounded-full blur-lg"></div>
                    <div className="relative z-10 w-14 h-14 bg-[#1a1a1a] rounded-full flex items-center justify-center mb-6 group-hover:bg-[#222] transition-colors">
                      <reason.icon className="w-6 h-6 text-white opacity-90" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">
                      {reason.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {reason.desc}
                    </p>
                    {/* <button className="mt-6 text-sm flex items-center text-gray-400 hover:text-white transition-all">
                      Learn More <ArrowRight className="ml-2 w-4 h-4" />
                    </button> */}
                  </Card>
                </motion.div>
              )}
            </div>
          </div>
        </section>

        <section id="services" className="bg-black text-white py-16 px-6 md:px-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black pointer-events-none" />
          <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16">
              
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {headings.servicesTitlePrefix}{" "}
                <span className="text-gray-400">{headings.servicesTitleHighlight}</span>
              </h2>
              <p className="text-gray-400 max-w-3xl mx-auto leading-relaxed">
                {headings.servicesDescription}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {services.map((service, index) =>
              <Card
                hover
                key={index}
                className="h-full relative group bg-gradient-to-br from-neutral-900 via-black to-neutral-950 rounded-2xl p-10 flex flex-col items-center justify-center text-center overflow-hidden transition-all duration-500 ring-1 ring-white/5 hover:ring-white/10 hover:-translate-y-1.5 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] border-0">
                
                  <div
                  className="absolute inset-0 opacity-[0.03] rounded-2xl pointer-events-none"
                  style={{
                    backgroundImage:
                    "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
                    backgroundSize: "40px 40px"
                  }} />
                
                  <div className="absolute inset-0 rounded-2xl shadow-[inset_0_0_30px_rgba(255,255,255,0.05)]"></div>
                  <div className="absolute top-16 h-24 w-24 rounded-full bg-gradient-to-b from-neutral-700/20 to-transparent blur-2xl"></div>
                  <div className="relative z-10 flex flex-col items-center">
                    <div className="bg-neutral-800/80 backdrop-blur-sm p-4 rounded-full mb-6 flex items-center justify-center ring-1 ring-white/10 group-hover:bg-neutral-700 transition-all duration-300">
                      {service.image ?
                    <img src={getAssetUrl(service.image)} alt={service.title} className="w-12 h-12 rounded-full object-cover" loading="lazy" /> :

                    <service.icon className="w-6 h-6 text-white opacity-90" />
                    }
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
                    <p className="text-sm text-gray-400 mb-6">{service.desc}</p>
                    <Link to='/services' className="inline-flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-white transition-all ring-1 ring-white/10 rounded-full px-4 py-2 hover:bg-neutral-800">
                      Learn More →
                    </Link>
                  </div>
                </Card>
              )}
            </div>
          </div>
        </section>

        {/* Works Section */}
        <section id="works" className="py-24 bg-[#1A1A1A] text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-bl from-black via-gray-900 to-black pointer-events-none" />
          <div className="relative z-10 max-w-6xl mx-auto px-6">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                {headings.worksTitlePrefix}{" "}
                <span className="text-gray-400">{headings.worksTitleHighlight}</span>
              </h2>
              <p className="text-gray-400 max-w-3xl mx-auto text-sm md:text-base">{headings.worksDescription}</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {works.map((work, i) =>
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }}>
                  <Card hover className="rounded-2xl bg-[#0b0b0b] overflow-hidden transition-all duration-300 ring-1 ring-white/5 hover:ring-white/10 hover:-translate-y-1.5 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] border-0">
                    <div className="relative h-56 bg-gradient-to-b from-[#0f172a] to-black flex items-center justify-center rounded-t-2xl">
                      {work.image &&
                    <img src={getAssetUrl(work.image)} alt={work.title} className="absolute inset-0 w-full h-full object-cover opacity-70" loading="lazy" />
                    }
                      <Link to={`/portfolio?projectTitle=${encodeURIComponent(work.title)}`} className="absolute bottom-5 px-5 py-2 rounded-full bg-[#101010] ring-1 ring-white/10 text-gray-300 text-sm backdrop-blur-sm hover:bg-[#161616] transition-all duration-300">
                        View Projects Details →
                      </Link>
                    </div>
                    <div className="px-6 py-5">
                      <h3 className="text-lg font-semibold mb-1">{work.title}</h3>
                      <div className="flex justify-between text-gray-400 text-sm">
                        <span>Category: {work.category}</span>
                        <span>{work.year}</span>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              )}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="py-20 bg-black text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black pointer-events-none" />
          <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-12">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
              <h2 className="text-4xl md:text-5xl font-extrabold mb-3">
                {headings.testimonialsTitlePrefix}{" "}
                <span className="text-gray-400">{headings.testimonialsTitleHighlight}</span>
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto text-base">{headings.testimonialsDescription}</p>
            </motion.div>

            <div ref={scrollRef1} className="flex overflow-x-scroll no-scrollbar gap-6 mb-8">
              {testimonials.map((t, i) =>
                <Card hover key={`top-${i}`} className="rounded-2xl p-8 flex-shrink-0 border-0">
                  <p className="text-gray-300 text-[14px] mb-4 leading-relaxed">{t.text}</p>
                  <div className="flex items-center">
                    {t.avatar ? (
                      <img src={getAssetUrl(t.avatar)} alt={t.name} className="w-10 h-10 rounded-full mr-3 object-cover" loading="lazy" />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gray-800 mr-3 flex items-center justify-center font-bold text-gray-400">
                        {t.name ? t.name.charAt(0) : 'U'}
                      </div>
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

        {/* Clients Section */}
        {clients && clients.length > 0 && (
          <section id="clients" className="py-20 bg-[#0a0a0a] text-white relative overflow-hidden">
            <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-12">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
                <h2 className="text-3xl md:text-5xl font-bold mb-3">
                  {headings.clientsTitlePrefix}{" "}
                  <span className="text-gray-400">{headings.clientsTitleHighlight}</span>
                </h2>
                <p className="text-gray-400 max-w-2xl mx-auto text-base">{headings.clientsDescription}</p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {clients.map((client, index) => (
                  <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
                    <Card hover className="bg-[#111] p-8 border-0 ring-1 ring-white/5 h-full flex flex-col justify-center text-center group transition-all hover:ring-white/20">
                      {client.logo && (
                        <div className="mb-6 mx-auto h-16 flex items-center justify-center opacity-60 group-hover:opacity-100 transition-opacity">
                          <img src={getAssetUrl(client.logo)} alt={client.name} className="max-h-full max-w-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300" />
                        </div>
                      )}
                      <h4 className="text-xl font-bold text-white mb-3 group-hover:text-primary-blue transition-colors">{client.name}</h4>
                      {client.description && (
                        <p className="text-sm text-gray-400">{client.description}</p>
                      )}
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* FAQs Section */}
        {faqs && faqs.length > 0 && (
          <section id="faqs" className="py-24 bg-black text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-black via-gray-900 to-black pointer-events-none" />
            <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-12">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold mb-4">
                  {headings.faqsTitlePrefix}{" "}
                  <span className="text-primary-blue">{headings.faqsTitleHighlight}</span>
                </h2>
                <p className="text-gray-400 text-base md:text-lg">{headings.faqsDescription}</p>
              </motion.div>

              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <motion.div key={index} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}>
                    <div 
                      className={`rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden ${openFaq === index ? 'bg-[#111] border-white/20' : 'bg-[#0a0a0a] border-white/5 hover:border-white/10'}`}
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    >
                      <div className="p-6 flex justify-between items-center">
                        <h4 className="text-lg font-semibold pr-8">{faq.q}</h4>
                        <div className={`w-8 h-8 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${openFaq === index ? 'rotate-180 bg-primary-blue text-white' : ''}`}>
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                      
                      <div className={`transition-all duration-300 ease-in-out ${openFaq === index ? 'max-h-96 opacity-100 pb-6 px-6' : 'max-h-0 opacity-0 px-6'}`}>
                        <p className="text-gray-400 leading-relaxed">{faq.a}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Final CTA */}
        <section className="py-32 bg-[#1A1A1A] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-bl from-black via-gray-900 to-black pointer-events-none" />
          <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-12 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-4xl md:text-6xl font-bold mb-6">
                {finalCta.titlePrefix}{" "}
                <span className="text-gray-400">{finalCta.titleHighlight}</span>
              </h2>
              <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">{finalCta.description}</p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link to='/contact' className="px-8 py-4 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors">
                  {finalCta.primaryButton}
                </Link>
                {/* <Link to='/services' className="px-8 py-4 border border-gray-700 text-white font-bold rounded-lg hover:bg-gray-900 transition-colors">
                  {finalCta.secondaryButton}
                </Link> */}
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default HomeClient;
