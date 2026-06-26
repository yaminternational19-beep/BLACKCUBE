'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  MapPin,
  Phone,
  Mail,
  Clock,


  ArrowRight,
  Shield } from
'lucide-react';
import SEO from '@/components/SEO';
import Layout from '@/components/layout/Layout';
import Button from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { pageApi, contactSubmissionApi } from '@/api';

const ContactPage = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    company: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Dynamic States
  const [hero, setHero] = useState({
    title: 'Get In Touch',
    subtitle: "Have a question or ready to start your next project? We're here to help and would love to hear from you",
    primaryCta: 'Send Message',
    secondaryCta: 'View Services'
  });
  const [channelsIntro, setChannelsIntro] = useState({
    title: 'Get in Touch with Us Today!',
    description: 'Whether you’re interested in our services, have questions about a project, or want to explore partnerships, reach out to our team through any of the channels below.',
    badgeText: 'Feel free to contact us through any of the following channels'
  });
  const [emailSectionTitle, setEmailSectionTitle] = useState('Contact Us Via Email');
  const [emailContacts, setEmailContacts] = useState([{
    label: 'For General Inquiries',
    value: 'info@blackcube.ae'
  }, {
    label: 'For Business Collaborations',
    value: 'partnerships@blackcube.ae'
  }, {
    label: 'For Job Opportunities',
    value: 'careers@blackcube.ae'
  }]);
  const [phoneSectionTitle, setPhoneSectionTitle] = useState('Contact Us By Phone');
  const [phoneContacts, setPhoneContacts] = useState([{
    label: 'General Enquiries',
    value: '+1-XXX-XXX-XXXX'
  }, {
    label: 'Business Collaborations',
    value: '+1-XXX-XXX-XXXX'
  }, {
    label: 'Free Consultation',
    value: '+1-XXX-XXX-XXXX'
  }]);
  const [contactFormSection, setContactFormSection] = useState({
    title: 'Online Inquiry Form',
    description: "Please fill in the following details, and we'll get back to you within 24 hours.",
    formLabels: {
      name: 'Name',
      email: 'Email',
      phone: 'Phone Number',
      service: 'Select Service',
      company: 'Company / Organization Name',
      subject: 'Subject',
      message: 'Message'
    },
    placeholders: {
      name: 'Enter your Name',
      email: 'Enter your Email',
      phone: 'Enter your Phone Number',
      service: 'Choose a service',
      company: 'Enter Name',
      subject: 'Select your Subject',
      message: 'Enter your Message'
    },
    submitButton: 'Send your Inquiry',
    submittingButton: 'Sending...'
  });
  const [serviceOptions, setServiceOptions] = useState(['Web Development', 'Mobile App Development', 'UI/UX Design', 'Digital Marketing']);
  const [subjectOptions, setSubjectOptions] = useState([{
    value: 'general',
    label: 'General Inquiry'
  }, {
    value: 'project',
    label: 'New Project'
  }, {
    value: 'support',
    label: 'Support'
  }]);
  const [responseCard, setResponseCard] = useState({ title: '24 Hour Response', description: 'We aim to respond to all inquiries within 24 hours during business days.' });
  const [privacyCard, setPrivacyCard] = useState({ title: 'Privacy Guaranteed', description: 'Your information is secure and will never be shared with third parties.' });
  const [officeLocationsSection, setOfficeLocationsSection] = useState({ title: 'Our Offices', subtitle: 'Visit us at one of our global locations' });
  const [officeLocations, setOfficeLocations] = useState([{
    city: 'Dubai',
    address: 'Business Bay, Dubai, UAE',
    ctaText: 'View on Map'
  }]);

  // Load from CMS
  useEffect(() => {
    const load = async () => {
      try {
        const res = await pageApi.get('contact');
        if (res.success && res.data?.fields) {
          res.data.fields.forEach((f) => {
            switch (f.id) {
              case 'heroContent':
                setHero(f.value);
                break;
              case 'channelsIntro':
                setChannelsIntro(f.value);
                break;
              case 'emailSectionTitle':
                setEmailSectionTitle(f.value);
                break;
              case 'emailContacts':
                setEmailContacts(f.value);
                break;
              case 'phoneSectionTitle':
                setPhoneSectionTitle(f.value);
                break;
              case 'phoneContacts':
                setPhoneContacts(f.value);
                break;
              case 'contactFormSection':
                setContactFormSection(f.value);
                break;
              case 'serviceOptions':
                setServiceOptions(f.value);
                break;
              case 'subjectOptions':
                setSubjectOptions(f.value);
                break;
              case 'responseCard':
                setResponseCard(f.value);
                break;
              case 'privacyCard':
                setPrivacyCard(f.value);
                break;
              case 'officeLocationsSection':
                setOfficeLocationsSection(f.value);
                break;
              case 'officeLocations':
                setOfficeLocations(f.value);
                break;
            }
          });
        }
      } catch (err) {
        console.error('Failed to load contact page:', err);
      }
    };
    load();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContactForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await contactSubmissionApi.create(contactForm);
      if (res.success) {
        alert('Thank you! We will get back to you within 24 hours.');
        setContactForm({
          name: '',
          email: '',
          phone: '',
          service: '',
          company: '',
          subject: '',
          message: ''
        });
      } else {
        alert('Failed to submit. Please try again.');
      }
    } catch (error) {
      console.error('Failed to submit contact form:', error);
      alert('Failed to submit. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <SEO title="Contact Us" description="Get in touch with BlackCube Solutions to start your next big project." url="/contact" />
      <div className="min-h-screen bg-black text-white">

        {/* Hero */}
        <section className="relative min-h-screen flex items-center justify-center pt-24 md:pt-28 pb-10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
          <div className="absolute right-0 lg:right-0 xl:right-15 2xl:right-70 top-1/2 -translate-y-1/2 opacity-5 text-[14rem] sm:text-[16rem] md:text-[28rem] lg:text-[40rem] font-bold leading-none pointer-events-none">
            BC
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
              <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
                <motion.h1
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6 leading-tight text-center lg:text-left"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}>
                  
                  {hero.title}
                </motion.h1>

                <motion.p
                  className="text-base sm:text-lg md:text-xl text-gray-400 mb-6 md:mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0 text-center lg:text-left"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}>
                  
                  {hero.subtitle}
                </motion.p>

                <motion.div
                  className="flex flex-wrap gap-3 md:gap-4 justify-center lg:justify-start"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}>
                  
                  <a href="#contact-form" className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-black font-semibold rounded hover:bg-gray-200 transition-colors">
                    {hero.primaryCta}
                  </a>
                  <a href="/services" className="px-6 sm:px-8 py-3 sm:py-4 border border-gray-700 text-white font-semibold rounded hover:bg-gray-900 transition-colors">
                    {hero.secondaryCta}
                  </a>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Channels Intro */}
        <section className="py-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-bl from-black via-gray-900 to-black pointer-events-none" />
          <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <Card hover className="bg-[#0b0b0b] ring-1 ring-white/5 rounded-2xl p-8 md:p-10">
              <div className="text-center">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-3">
                  {channelsIntro.title}
                </h2>
                <p className="text-gray-400 max-w-3xl mx-auto">{channelsIntro.description}</p>
                <div className="mt-5 inline-flex items-center px-4 py-2 rounded-full bg-[#111] text-gray-400 ring-1 ring-white/10">
                  {channelsIntro.badgeText}
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Email Contacts */}
        <section className="py-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black pointer-events-none" />
          <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <h3 className="text-center text-white text-xl mb-8">{emailSectionTitle}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {emailContacts.map((row, i) =>
              <Card hover key={i} className="bg-[#0b0b0b] ring-1 ring-white/5 rounded-2xl p-8 md:p-10 flex items-center justify-between">
                  <div>
                    <div className="text-xs text-gray-500 mb-2">{row.label}</div>
                    <a href={`mailto:${row.value}`} className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-[#0f0f0f] text-gray-300 ring-1 ring-white/10 hover:bg-[#111] transition-colors">
                      <Mail className="w-4 h-4" /> {row.value}
                    </a>
                  </div>
                  <a href={`mailto:${row.value}`} className="w-9 h-9 rounded-full bg-[#111] ring-1 ring-white/10 text-gray-300 flex items-center justify-center hover:bg-[#161616]">
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </Card>
              )}
            </div>
          </div>
        </section>

        {/* Phone Contacts */}
        <section className="py-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-bl from-black via-gray-900 to-black pointer-events-none" />
          <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <h3 className="text-center text-white text-xl mb-8">{phoneSectionTitle}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {phoneContacts.map((row, i) =>
              <Card hover key={i} className="bg-[#0b0b0b] ring-1 ring-white/5 rounded-2xl p-8 md:p-10 flex items-center justify-between">
                  <div>
                    <div className="text-xs text-gray-500 mb-2">{row.label}</div>
                    <a href={`tel:${(row.value || '').replace(/[^0-9+]/g, '')}`} className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-[#0f0f0f] text-gray-300 ring-1 ring-white/10 hover:bg-[#111] transition-colors">
                      <Phone className="w-4 h-4" /> {row.value}
                    </a>
                  </div>
                  <a href={`tel:${(row.value || '').replace(/[^0-9+]/g, '')}`} className="w-9 h-9 rounded-full bg-[#111] ring-1 ring-white/10 text-gray-300 flex items-center justify-center hover:bg-[#161616]">
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </Card>
              )}
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section ref={ref} className="py-20 relative overflow-hidden" id="contact-form">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black pointer-events-none" />
          <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <Card hover className="bg-[#0b0b0b] ring-1 ring-white/5 rounded-2xl p-8 md:p-10">
              <div className="text-center mb-8">
                <div className="text-white font-semibold text-2xl">{contactFormSection.title}</div>
                <p className="text-gray-500 text-sm">{contactFormSection.description}</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">{contactFormSection.formLabels?.name}</label>
                    <input
                      name="name"
                      value={contactForm.name}
                      onChange={handleInputChange}
                      placeholder={contactFormSection.placeholders?.name}
                      required
                      className="w-full px-4 py-3 bg-[#0f0f0f] rounded-xl text-white ring-1 ring-white/10 focus:outline-none focus:ring-white/20" />
                    
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">{contactFormSection.formLabels?.email}</label>
                    <input
                      name="email"
                      type="email"
                      value={contactForm.email}
                      onChange={handleInputChange}
                      placeholder={contactFormSection.placeholders?.email}
                      required
                      className="w-full px-4 py-3 bg-[#0f0f0f] rounded-xl text-white ring-1 ring-white/10 focus:outline-none focus:ring-white/20" />
                    
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">{contactFormSection.formLabels?.phone}</label>
                    <input
                      name="phone"
                      value={contactForm.phone}
                      onChange={handleInputChange}
                      placeholder={contactFormSection.placeholders?.phone}
                      required
                      className="w-full px-4 py-3 bg-[#0f0f0f] rounded-xl text-white ring-1 ring-white/10 focus:outline-none focus:ring-white/20" />
                    
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">{contactFormSection.formLabels?.service}</label>
                    <select
                      name="service"
                      value={contactForm.service}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-[#0f0f0f] rounded-xl text-white ring-1 ring-white/10 focus:outline-none focus:ring-white/20">
                      
                      <option value="">{contactFormSection.placeholders?.service}</option>
                      {serviceOptions.map((opt) =>
                      <option key={opt} value={opt}>{opt}</option>
                      )}
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">{contactFormSection.formLabels?.company}</label>
                    <input
                      name="company"
                      value={contactForm.company}
                      onChange={handleInputChange}
                      placeholder={contactFormSection.placeholders?.company}
                      className="w-full px-4 py-3 bg-[#0f0f0f] rounded-xl text-white ring-1 ring-white/10 focus:outline-none focus:ring-white/20" />
                    
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">{contactFormSection.formLabels?.subject}</label>
                    <select
                      name="subject"
                      value={contactForm.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-[#0f0f0f] rounded-xl text-white ring-1 ring-white/10 focus:outline-none focus:ring-white/20">
                      
                      <option value="">{contactFormSection.placeholders?.subject}</option>
                      {subjectOptions.map((opt) =>
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                      )}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-2">{contactFormSection.formLabels?.message}</label>
                  <textarea
                    name="message"
                    value={contactForm.message}
                    onChange={handleInputChange}
                    placeholder={contactFormSection.placeholders?.message}
                    rows={5}
                    required
                    className="w-full px-4 py-3 bg-[#0f0f0f] rounded-xl text-white ring-1 ring-white/10 focus:outline-none focus:ring-white/20" />
                  
                </div>

                <div className="text-center">
                  <Button type="submit" disabled={isSubmitting} className="px-6 group">
                    {isSubmitting ? contactFormSection.submittingButton : contactFormSection.submitButton}
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </form>
            </Card>

            {/* Response & Privacy Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <Card hover className="bg-[#0b0b0b] ring-1 ring-white/5 rounded-2xl p-6 flex items-start gap-3">
                <Clock className="w-5 h-5 text-white/80 mt-1" />
                <div>
                  <div className="text-white font-semibold mb-1">{responseCard.title}</div>
                  <p className="text-gray-400 text-sm">{responseCard.description}</p>
                </div>
              </Card>
              <Card hover className="bg-[#0b0b0b] ring-1 ring-white/5 rounded-2xl p-6 flex items-start gap-3">
                <Shield className="w-5 h-5 text-white/80 mt-1" />
                <div>
                  <div className="text-white font-semibold mb-1">{privacyCard.title}</div>
                  <p className="text-gray-400 text-sm">{privacyCard.description}</p>
                </div>
              </Card>
            </div>

          </div>
        </section>

        {/* Office Locations */}
        <section className="py-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-bl from-black via-gray-900 to-black pointer-events-none" />
          <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="text-center mb-6">
              <h3 className="text-white font-semibold text-2xl">{officeLocationsSection.title}</h3>
              <p className="text-gray-400 text-sm">{officeLocationsSection.subtitle}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {officeLocations.map((off, i) =>
              <Card key={i} hover className="bg-[#0b0b0b] ring-1 ring-white/5 rounded-2xl p-8 group">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#0f0f0f] ring-1 ring-white/10 flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-white/80" />
                    </div>
                    <div className="text-white font-semibold">{off.city}</div>
                    <div className="text-gray-400 text-sm mb-6">{off.address}</div>
                    <a 
                      href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(off.address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#111] text-gray-300 ring-1 ring-white/10 hover:bg-[#161616]"
                    >
                      {off.ctaText} <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </Card>
              )}
            </div>
          </div>
        </section>
      </div>
    </Layout>);

};

export default ContactPage;
