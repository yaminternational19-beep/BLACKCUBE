export const defaultHomePageData = {
  fields: [
    { id: 'hero', value: { title: 'SOFTWARE IT', titleHighlight: 'OUTSOURCING', subtitle: 'We are 100+ professional software engineers delivering superior products.', cta: 'Learn More', cta2: 'All Services' } },
    { id: 'headings', value: {
      servicesTitlePrefix: 'Our', servicesTitleHighlight: 'Services', servicesDescription: 'We provide top-notch digital solutions.',
      reasonsTitlePrefix: 'Why', reasonsTitleHighlight: 'Choose Us', reasonsTitleLine2: 'For Your Projects', reasonsDescription: 'We deliver excellence and reliability.',
      worksTitlePrefix: 'Our', worksTitleHighlight: 'Works', worksDescription: 'Explore our latest portfolio items.',
      testimonialsTitlePrefix: 'Client', testimonialsTitleHighlight: 'Testimonials', testimonialsDescription: 'What our clients say about us.',
      faqsTitlePrefix: 'Got', faqsTitleHighlight: 'Questions?', faqsDescription: 'Find answers here.',
      clientsTitlePrefix: 'Our', clientsTitleHighlight: 'Clients', clientsDescription: 'Trusted by companies worldwide.'
    }},
    { id: 'services', value: [
      { icon: 'Globe', title: 'Web Development', desc: 'Custom web apps built with modern technologies for optimal performance.' },
      { icon: 'Code', title: 'Mobile Apps', desc: 'Native and cross-platform mobile applications for iOS and Android.' },
      { icon: 'Palette', title: 'UI/UX Design', desc: 'User-centered design solutions that enhance user experience.' },
      { icon: 'Cloud', title: 'Cloud Solutions', desc: 'Scalable cloud infrastructure and migration services.' }
    ]},
    { id: 'reasons', value: [
      { icon: 'Target', title: 'Quality Assurance', desc: 'Rigorous testing ensures we deliver only top-tier quality.' },
      { icon: 'Shield', title: 'Security First', desc: 'Your data is protected with industry standard security protocols.' },
      { icon: 'Zap', title: 'Fast Delivery', desc: 'Optimized workflows mean faster time-to-market.' },
      { icon: 'Users', title: 'Dedicated Team', desc: 'Expert developers assigned exclusively to your project.' },
      { icon: 'TrendingUp', title: 'Scalable Architecture', desc: 'Built to grow with your business needs.' },
      { icon: 'Award', title: 'Award Winning', desc: 'Recognized for excellence in software development.' }
    ]},
    { id: 'works', value: [
      { title: 'E-commerce Platform', category: 'Web App', year: '2023', image: '/images/portfolio/ecommerce.jpg' },
      { title: 'Banking App', category: 'Mobile', year: '2023', image: '/images/portfolio/banking.jpg' }
    ]},
    { id: 'testimonials', value: [
      { name: 'John Doe', role: 'CEO at TechCorp', text: 'BlackCube transformed our digital presence completely. Outstanding work!', avatar: '/images/testimonials/john.jpg' },
      { name: 'Sarah Smith', role: 'Director at StartUp', text: 'Professional, reliable, and highly skilled team.', avatar: '/images/testimonials/maria.jpg' }
    ]},
    { id: 'finalCta', value: { titlePrefix: 'Ready to', titleHighlight: 'Start?', description: 'Let us build something great together.', primaryButton: 'Contact Us', secondaryButton: 'View Services' } }
  ]
};
