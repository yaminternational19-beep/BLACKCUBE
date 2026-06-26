export const services = [{
  id: '1',
  title: 'Web Development',
  description: 'Custom web applications built with modern technologies for optimal performance and user experience.',
  icon: 'Globe',
  features: ['Responsive Design', 'SEO Optimized', 'Fast Loading', 'Mobile First'],
  category: 'Development'
}, {
  id: '2',
  title: 'Mobile App Development',
  description: 'Native and cross-platform mobile applications for iOS and Android platforms.',
  icon: 'Smartphone',
  features: ['Cross Platform', 'Native Performance', 'App Store Ready', 'Push Notifications'],
  category: 'Development'
}, {
  id: '3',
  title: 'UI/UX Design',
  description: 'User-centered design solutions that enhance user experience and drive engagement.',
  icon: 'Palette',
  features: ['User Research', 'Wireframing', 'Prototyping', 'Design Systems'],
  category: 'Design'
}, {
  id: '4',
  title: 'Digital Marketing',
  description: 'Comprehensive digital marketing strategies to boost your online presence and reach.',
  icon: 'TrendingUp',
  features: ['SEO/SEM', 'Social Media', 'Content Marketing', 'Analytics'],
  category: 'Marketing'
}, {
  id: '5',
  title: 'Cloud Solutions',
  description: 'Scalable cloud infrastructure and migration services for modern businesses.',
  icon: 'Cloud',
  features: ['AWS/Azure', 'Migration', 'Security', 'Monitoring'],
  category: 'Infrastructure'
}, {
  id: '6',
  title: 'E-commerce Solutions',
  description: 'Complete e-commerce platforms with payment integration and inventory management.',
  icon: 'ShoppingCart',
  features: ['Payment Gateway', 'Inventory Management', 'Order Tracking', 'Analytics'],
  category: 'E-commerce'
}];
export const portfolioItems = [{
  id: '1',
  title: 'E-commerce Platform',
  description: 'A comprehensive e-commerce solution with advanced features and modern design.',
  image: '/images/portfolio/ecommerce.jpg',
  technologies: ['Next.js', 'Node.js', 'MongoDB', 'Stripe'],
  category: 'E-commerce',
  client: 'TechStore Inc.',
  link: 'https://example.com',
  featured: true
}, {
  id: '2',
  title: 'Corporate Website',
  description: 'Professional corporate website with CMS and multilingual support.',
  image: '/images/portfolio/corporate.jpg',
  technologies: ['React', 'Contentful', 'Tailwind CSS'],
  category: 'Website',
  client: 'Global Corp',
  link: 'https://example.com',
  featured: true
}, {
  id: '3',
  title: 'Mobile Banking App',
  description: 'Secure mobile banking application with biometric authentication.',
  image: '/images/portfolio/banking.jpg',
  technologies: ['React Native', 'Node.js', 'PostgreSQL'],
  category: 'Mobile App',
  client: 'Finance Bank',
  featured: true
}, {
  id: '4',
  title: 'SaaS Dashboard',
  description: 'Analytics dashboard for SaaS platform with real-time data visualization.',
  image: '/images/portfolio/dashboard.jpg',
  technologies: ['Vue.js', 'D3.js', 'Express.js'],
  category: 'Web App',
  client: 'DataCorp',
  featured: false
}, {
  id: '5',
  title: 'Restaurant Management',
  description: 'Complete restaurant management system with POS integration.',
  image: '/images/portfolio/restaurant.jpg',
  technologies: ['React', 'Node.js', 'MySQL'],
  category: 'Web App',
  client: 'FoodChain',
  featured: false
}, {
  id: '6',
  title: 'Healthcare Portal',
  description: 'Patient management portal with appointment booking and telemedicine.',
  image: '/images/portfolio/healthcare.jpg',
  technologies: ['Angular', 'Spring Boot', 'PostgreSQL'],
  category: 'Web App',
  client: 'MediCare',
  featured: false
}];
export const teamMembers = [{
  id: '1',
  name: 'Ahmed Al-Rashid',
  position: 'CEO & Founder',
  image: '/images/team/ahmed.jpg',
  bio: 'Visionary leader with 15+ years in tech industry, passionate about digital transformation.',
  social: {
    linkedin: 'https://linkedin.com/in/ahmed-alrashid',
    twitter: 'https://twitter.com/ahmed_alrashid'
  }
}, {
  id: '2',
  name: 'Sarah Johnson',
  position: 'CTO',
  image: '/images/team/sarah.jpg',
  bio: 'Technical architect with expertise in cloud solutions and scalable systems.',
  social: {
    linkedin: 'https://linkedin.com/in/sarah-johnson',
    github: 'https://github.com/sarahjohnson'
  }
}, {
  id: '3',
  name: 'Mohammed Hassan',
  position: 'Lead Developer',
  image: '/images/team/mohammed.jpg',
  bio: 'Full-stack developer specializing in modern web technologies and mobile apps.',
  social: {
    linkedin: 'https://linkedin.com/in/mohammed-hassan',
    github: 'https://github.com/mohammedhassan'
  }
}, {
  id: '4',
  name: 'Fatima Al-Zahra',
  position: 'UI/UX Designer',
  image: '/images/team/fatima.jpg',
  bio: 'Creative designer focused on user experience and modern interface design.',
  social: {
    linkedin: 'https://linkedin.com/in/fatima-alzahra',
    twitter: 'https://twitter.com/fatima_design'
  }
}];
export const testimonials = [{
  id: '1',
  name: 'John Smith',
  company: 'TechCorp Solutions',
  position: 'CEO',
  content: 'BlackCube Solutions LLC transformed our digital presence completely. Their expertise and dedication are unmatched.',
  image: '/images/testimonials/john.jpg',
  rating: 5
}, {
  id: '2',
  name: 'Maria Garcia',
  company: 'E-commerce Plus',
  position: 'Marketing Director',
  content: 'The e-commerce platform they built increased our sales by 300%. Outstanding work!',
  image: '/images/testimonials/maria.jpg',
  rating: 5
}, {
  id: '3',
  name: 'David Chen',
  company: 'StartupHub',
  position: 'Founder',
  content: 'Professional, reliable, and innovative. They delivered exactly what we needed on time.',
  image: '/images/testimonials/david.jpg',
  rating: 5
}];
export const jobPostings = [{
  id: '1',
  title: 'Senior Full-Stack Developer',
  department: 'Development',
  location: 'Dubai, UAE',
  type: 'Full-time',
  description: 'We are looking for an experienced full-stack developer to join our growing team.',
  requirements: ['5+ years of experience in web development', 'Proficiency in React, Node.js, and MongoDB', 'Experience with cloud platforms (AWS/Azure)', 'Strong problem-solving skills'],
  benefits: ['Competitive salary', 'Health insurance', 'Flexible working hours', 'Professional development opportunities'],
  salary: 'AED 15,000 - 25,000',
  postedDate: '2024-01-15',
  deadline: '2024-02-15'
}, {
  id: '2',
  title: 'UI/UX Designer',
  department: 'Design',
  location: 'Dubai, UAE',
  type: 'Full-time',
  description: 'Join our design team to create amazing user experiences for our clients.',
  requirements: ['3+ years of UI/UX design experience', 'Proficiency in Figma, Adobe Creative Suite', 'Portfolio demonstrating design skills', 'Understanding of user research methods'],
  benefits: ['Creative work environment', 'Latest design tools and software', 'Team collaboration opportunities', 'Career growth potential'],
  salary: 'AED 12,000 - 18,000',
  postedDate: '2024-01-10',
  deadline: '2024-02-10'
}, {
  id: '3',
  title: 'Digital Marketing Specialist',
  department: 'Marketing',
  location: 'Dubai, UAE',
  type: 'Full-time',
  description: 'Help our clients grow their digital presence through strategic marketing campaigns.',
  requirements: ['2+ years of digital marketing experience', 'Knowledge of SEO, SEM, and social media', 'Experience with Google Analytics and Ads', 'Content creation skills'],
  benefits: ['Performance bonuses', 'Marketing tools and resources', 'Client interaction opportunities', 'Skill development programs'],
  salary: 'AED 8,000 - 15,000',
  postedDate: '2024-01-05',
  deadline: '2024-02-05'
}];
export const companyInfo = {
  name: 'BlackCube Solutions LLC',
  address: 'Business Bay, Dubai, UAE',
  phone: '+971 4 123 4567',
  email: 'info@blackcube.ae',
  social: {
    linkedin: 'https://linkedin.com/company/black-cube-solutions',
    twitter: 'https://twitter.com/blackcubesolutions',
    facebook: 'https://facebook.com/blackcubesolutions',
    instagram: 'https://instagram.com/blackcubesolutions'
  }
};