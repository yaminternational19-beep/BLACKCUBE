'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { Target, Eye, Heart, Calendar } from 'lucide-react';
import { FaInstagram as Instagram, FaTwitter as Twitter, FaLinkedin as Linkedin } from 'react-icons/fa';
import SEO from '@/components/SEO';
import Layout from '@/components/layout/Layout';

import { Card } from '@/components/ui/Card';
import { defaultAboutPageData } from '@/data/about';
import { pageApi, getAssetUrl } from '@/api';





const AboutClient = ({ initialData }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [aboutData, setAboutData] = useState(defaultAboutPageData);
  const milestones = aboutData.milestones;
  const values = aboutData.values.map((value) => ({
    icon: value.icon === 'Target' ? Target : value.icon === 'Eye' ? Eye : Heart,
    title: value.title,
    description: value.description
  }));

  const [awards, setAwards] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [headings, setHeadings] = useState({
    awardsTitlePrefix: '',
    awardsTitleHighlight: '',
    awardsDescription: "",
    achievementsTitlePrefix: '',
    achievementsTitleHighlight: '',
    achievementsDescription: "",
    teamTitlePrefix: '',
    teamTitleHighlight: '',
    teamDescription: ''
  });

  useEffect(() => {
    const processData = (data) => {
      const fields = data.fields || [];
      const next = { ...aboutData };
      fields.forEach((f) => {
        if (f.id === 'heroContent' && f.value) next.heroContent = f.value;
        if (f.id === 'companyStats' && f.value) next.companyStats = f.value;
        if (f.id === 'values' && f.value) next.values = f.value;
        if (f.id === 'milestones' && f.value) next.milestones = f.value;
        if (f.id === 'journeySection' && f.value) next.journeySection = f.value;
        if (f.id === 'whyChooseUsSection' && f.value) next.whyChooseUsSection = f.value;
        if (f.id === 'whyChooseUs' && f.value) next.whyChooseUs = f.value;
        if (f.id === 'awards' && Array.isArray(f.value)) setAwards(f.value);
        if (f.id === 'achievements' && Array.isArray(f.value)) setAchievements(f.value);
        if (f.id === 'teamMembers' && Array.isArray(f.value)) {
          setTeamMembers(
            f.value.map((m) => ({
              name: m.name,
              position: m.position,
              image: m.image || `https://i.pravatar.cc/200?u=${encodeURIComponent(m.name || '')}`
            }))
          );
        }
        if (f.id === 'headings' && f.value) setHeadings({ ...headings, ...f.value });
      });
      setAboutData(next);
    };

    if (initialData) {
      processData(initialData);
    } else {
      const load = async () => {
        try {
          const res = await pageApi.get('about');
          if (res.success && res.data) {
            processData(res.data);
          }
        } catch {}
      };
      load();
    }
  }, [initialData]);

  return (
    <Layout>
      <SEO title="About Us" description="Learn more about BlackCube Solutions and our journey to digital excellence." url="/about" />
      <div className="min-h-screen bg-black text-white overflow-x-hidden">
        {/* Hero Section */}
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
                  
                  {aboutData.heroContent.title}{" "}
                  <span className="text-gray-400">
                    BlackCube
                  </span>
                </motion.h1>

                <motion.p
                  className="text-base sm:text-lg md:text-xl text-gray-400 mb-6 md:mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0 text-center lg:text-left"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}>
                  
                  {aboutData.heroContent.subtitle}
                </motion.p>

                <motion.div
                  className="flex flex-wrap gap-3 md:gap-4 justify-center lg:justify-start"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}>
                  
                  <button className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-black font-semibold rounded hover:bg-gray-200 transition-colors">
                    {aboutData.heroContent.primaryCta}
                  </button>
                  <button className="px-6 sm:px-8 py-3 sm:py-4 border border-gray-700 text-white font-semibold rounded hover:bg-gray-900 transition-colors">
                    {aboutData.heroContent.secondaryCta}
                  </button>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Company Stats */}
        <section className="py-12 md:py-16 bg-[#1A1A1A] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-bl from-black via-gray-900 to-black pointer-events-none" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 text-center">
              {aboutData.companyStats.map((s, i) =>
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}>
                
                  <Card hover className="h-full bg-[#0b0b0b] rounded-2xl p-4 sm:p-6 md:p-8 text-center ring-1 ring-white/5 hover:ring-white/10 transition-all duration-300 border-0">
                    <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">{s.number}</div>
                    <div className="text-xs sm:text-sm md:text-base text-gray-400">{s.label}</div>
                  </Card>
                </motion.div>
              )}
            </div>
          </div>
        </section>

        {/* Mission, Vision, Values */}
        <section className="py-16 md:py-24 bg-black relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black pointer-events-none" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
              {values.map((value, index) =>
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}>
                
                  <Card hover className="h-full text-center group p-6 md:p-8">
                    <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-r from-primary-blue to-primary-purple rounded-xl flex items-center justify-center mx-auto mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300">
                      <value.icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-semibold text-white mb-3 md:mb-4 font-montserrat group-hover:text-primary-blue transition-colors duration-300">
                      {value.title}
                    </h3>
                    <p className="text-sm md:text-base text-gray-400 leading-relaxed group-hover:text-white transition-colors duration-300">
                      {value.description}
                    </p>
                  </Card>
                </motion.div>
              )}
            </div>
          </div>
        </section>


        {/* Journey Section */}
        <section className="py-16 md:py-24 bg-[#1A1A1A] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-bl from-black via-gray-900 to-black pointer-events-none" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mb-8 md:mb-12 lg:mb-20">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 md:mb-4 font-montserrat">
                {aboutData.journeySection.title}
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-3xl mx-auto px-4">
                {aboutData.journeySection.subtitle}
              </p>
            </motion.div>

            {/* Timeline logic kept as is... */}
            <div className="relative hidden md:block">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary-blue to-primary-purple"></div>
              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <motion.div key={index} initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: index * 0.1 }} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                    <div className={`w-1/2 ${index % 2 === 0 ? 'pr-4 md:pr-8 text-right' : 'pl-4 md:pl-8 text-left'}`}>
                      <Card hover className="group p-4 md:p-6">
                        <div className="flex items-center space-x-3 md:space-x-4">
                          <div className="w-10 h-10 md:w-12 md:h-12 bg-primary-blue rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                            <Calendar className="w-5 h-5 md:w-6 md:h-6 text-white" />
                          </div>
                          <div>
                            <div className="text-xl md:text-2xl font-bold text-primary-blue font-montserrat group-hover:text-white transition-colors duration-300">{milestone.year}</div>
                            <h3 className="text-lg md:text-xl font-semibold text-white mb-1 md:mb-2 font-montserrat group-hover:text-primary-blue transition-colors duration-300">{milestone.title}</h3>
                            <p className="text-sm md:text-base text-gray-400 group-hover:text-white transition-colors duration-300">{milestone.description}</p>
                          </div>
                        </div>
                      </Card>
                    </div>
                    <div className="w-8 h-8 bg-primary-blue rounded-full border-4 border-primary-black flex items-center justify-center z-10">
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                    </div>
                    <div className="w-1/2"></div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Awards & Achievements Section */}
        <section className="py-16 md:py-24 bg-black relative overflow-hidden">
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
            
            {/* Awards */}
            {awards && awards.length > 0 && (
              <div className="mb-20">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mb-12">
                  <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                    {headings.awardsTitlePrefix} <span className="text-primary-blue">{headings.awardsTitleHighlight}</span>
                  </h2>
                  <p className="text-gray-400 max-w-2xl mx-auto">{headings.awardsDescription}</p>
                </motion.div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {awards.map((award, idx) => (
                    <motion.div key={idx} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: idx * 0.1 }}>
                      <Card className="bg-[#111] p-6 text-center border-0 ring-1 ring-white/10 hover:ring-primary-blue transition-all">
                        <div className="text-4xl mb-4">{award.icon || '🏆'}</div>
                        <h4 className="font-bold text-white mb-2">{award.title}</h4>
                        <p className="text-sm text-primary-blue font-medium mb-2">{award.year}</p>
                        <p className="text-xs text-gray-400">{award.organization}</p>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Achievements */}
            {achievements && achievements.length > 0 && (
              <div>
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mb-12">
                  <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                    {headings.achievementsTitlePrefix} <span className="text-primary-purple">{headings.achievementsTitleHighlight}</span>
                  </h2>
                  <p className="text-gray-400 max-w-2xl mx-auto">{headings.achievementsDescription}</p>
                </motion.div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {achievements.map((achievement, idx) => (
                    <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}>
                      <Card className="bg-[#111] p-8 border-0 ring-1 ring-white/5 hover:ring-white/20 transition-all h-full">
                        <h4 className="font-bold text-xl text-white mb-4">{achievement.title}</h4>
                        <p className="text-gray-400 text-sm leading-relaxed">{achievement.description}</p>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Team Section */}
        <section ref={ref} className="py-16 md:py-24 bg-[#1A1A1A] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black pointer-events-none" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="text-center mb-8 md:mb-12 lg:mb-20">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 md:mb-4">
                {headings.teamTitlePrefix} <span className="text-gray-400">{headings.teamTitleHighlight}</span>
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-3xl mx-auto px-4">{headings.teamDescription}</p>
            </motion.div>

            <div id="team" className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
              {teamMembers.map((member, index) => (
                <motion.div key={index} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: index * 0.05 }}>
                  <Card hover className="bg-[#0b0b0b] rounded-2xl p-4 sm:p-5 md:p-6 text-center ring-1 ring-white/5 hover:ring-white/10 hover:-translate-y-1.5 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all duration-300 border-0">
                    <div className="mb-3 md:mb-4">
                      <img src={getAssetUrl(member.image)} alt={member.name} className="w-16 h-16 sm:w-20 sm:h-20 md:w-20 md:h-20 rounded-full mx-auto object-cover" loading="lazy" />
                    </div>
                    <h3 className="text-white font-bold mb-1 text-xs sm:text-sm md:text-base">{member.name}</h3>
                    <p className="text-gray-400 text-[10px] sm:text-xs md:text-sm mb-3 md:mb-4">{member.position}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );

};

export default AboutClient;
