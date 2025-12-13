import { Resume } from './resumeModel';
import { nanoid } from 'nanoid';

export const softwareDeveloperResume: Resume = {
  id: nanoid(),
  name: 'Software Developer Resume',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  templateId: 'modern',
  personalInfo: {
    name: 'Alex Chen',
    title: 'Senior Full-Stack Developer',
    email: 'alex.chen@email.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    linkedin: 'linkedin.com/in/alexchen',
    website: 'alexchen.dev',
    github: 'github.com/alexchen',
  },
  summary: 'Results-driven Full-Stack Developer with 6+ years of experience building scalable web applications. Expert in React, Node.js, and cloud technologies. Led teams of 5+ engineers and delivered projects that increased user engagement by 40%. Passionate about clean code, performance optimization, and mentoring junior developers.',
  experience: [
    {
      id: nanoid(),
      company: 'TechCorp Inc.',
      position: 'Senior Full-Stack Developer',
      startDate: '2021-03',
      endDate: '',
      current: true,
      description: 'Lead developer for flagship SaaS platform serving 100K+ users',
      achievements: [
        'Architected microservices infrastructure reducing deployment time by 60%',
        'Led migration from monolithic architecture to React/Node.js stack',
        'Mentored team of 4 junior developers, improving code quality metrics by 35%',
        'Implemented CI/CD pipeline reducing bugs in production by 50%',
      ],
    },
    {
      id: nanoid(),
      company: 'StartupXYZ',
      position: 'Full-Stack Developer',
      startDate: '2018-06',
      endDate: '2021-02',
      current: false,
      description: 'Core developer for e-commerce platform',
      achievements: [
        'Built real-time inventory management system processing 10K+ transactions daily',
        'Developed RESTful APIs consumed by mobile and web applications',
        'Optimized database queries improving page load times by 45%',
      ],
    },
  ],
  education: [
    {
      id: nanoid(),
      institution: 'University of California, Berkeley',
      degree: 'Bachelor of Science',
      field: 'Computer Science',
      startDate: '2014-09',
      endDate: '2018-05',
      gpa: '3.8',
      achievements: ['Dean\'s List', 'CS Honor Society'],
    },
  ],
  skills: {
    technical: ['React', 'TypeScript', 'Node.js', 'Python', 'PostgreSQL', 'MongoDB', 'AWS', 'Docker', 'Kubernetes', 'GraphQL'],
    languages: ['English (Native)', 'Mandarin (Fluent)', 'Spanish (Intermediate)'],
    softSkills: ['Team Leadership', 'Agile/Scrum', 'Technical Writing', 'Problem Solving'],
  },
  projects: [
    {
      id: nanoid(),
      name: 'OpenSource Analytics',
      description: 'Real-time analytics dashboard for open-source projects. 2K+ GitHub stars and used by 500+ organizations.',
      technologies: ['React', 'D3.js', 'Node.js', 'PostgreSQL'],
      url: 'github.com/alexchen/opensource-analytics',
    },
    {
      id: nanoid(),
      name: 'DevFlow CLI',
      description: 'Command-line tool for automating development workflows. Published on npm with 10K+ weekly downloads.',
      technologies: ['Node.js', 'TypeScript', 'Commander.js'],
      url: 'npmjs.com/package/devflow-cli',
    },
  ],
  additional: {
    certifications: [
      { id: nanoid(), name: 'AWS Solutions Architect', issuer: 'Amazon Web Services', date: '2023' },
      { id: nanoid(), name: 'Google Cloud Professional', issuer: 'Google', date: '2022' },
    ],
    awards: ['TechCorp Innovation Award 2023', 'Hackathon Winner - AI Category 2022'],
    volunteer: ['Code.org - Teaching Assistant', 'Local Tech Meetup Organizer'],
    hobbies: [],
  },
};

export const marketingManagerResume: Resume = {
  id: nanoid(),
  name: 'Marketing Manager Resume',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  templateId: 'classic',
  personalInfo: {
    name: 'Sarah Johnson',
    title: 'Digital Marketing Manager',
    email: 'sarah.johnson@email.com',
    phone: '+1 (555) 987-6543',
    location: 'New York, NY',
    linkedin: 'linkedin.com/in/sarahjohnson',
    website: 'sarahjohnson.marketing',
  },
  summary: 'Dynamic Digital Marketing Manager with 7+ years of experience driving brand growth and customer acquisition. Proven track record of increasing ROI by 150% through data-driven campaigns. Expert in SEO, content strategy, and marketing automation. Led cross-functional teams to deliver award-winning campaigns for Fortune 500 clients.',
  experience: [
    {
      id: nanoid(),
      company: 'Global Brands Agency',
      position: 'Digital Marketing Manager',
      startDate: '2020-01',
      endDate: '',
      current: true,
      description: 'Lead digital marketing strategy for portfolio of 15+ clients',
      achievements: [
        'Increased client organic traffic by average of 200% through SEO optimization',
        'Managed $2M+ annual advertising budget across multiple channels',
        'Launched influencer program generating $500K in attributed revenue',
        'Built and led team of 6 marketing specialists',
      ],
    },
    {
      id: nanoid(),
      company: 'E-Commerce Solutions',
      position: 'Marketing Specialist',
      startDate: '2017-03',
      endDate: '2019-12',
      current: false,
      description: 'Executed multi-channel marketing campaigns for B2B SaaS products',
      achievements: [
        'Grew email subscriber list from 5K to 50K through content marketing',
        'Reduced customer acquisition cost by 40% through A/B testing',
        'Created marketing automation workflows increasing conversion by 25%',
      ],
    },
  ],
  education: [
    {
      id: nanoid(),
      institution: 'New York University',
      degree: 'Master of Business Administration',
      field: 'Marketing',
      startDate: '2015-09',
      endDate: '2017-05',
      gpa: '3.9',
    },
    {
      id: nanoid(),
      institution: 'Boston University',
      degree: 'Bachelor of Arts',
      field: 'Communications',
      startDate: '2011-09',
      endDate: '2015-05',
    },
  ],
  skills: {
    technical: ['Google Analytics', 'HubSpot', 'Salesforce', 'SEMrush', 'Adobe Creative Suite', 'Tableau', 'SQL'],
    languages: ['English (Native)', 'French (Professional)'],
    softSkills: ['Strategic Planning', 'Team Leadership', 'Data Analysis', 'Client Relations', 'Public Speaking'],
  },
  projects: [
    {
      id: nanoid(),
      name: 'Viral Product Launch Campaign',
      description: 'Led integrated marketing campaign for product launch reaching 10M+ impressions and achieving 300% of sales target.',
      technologies: ['Social Media', 'Influencer Marketing', 'PR'],
    },
  ],
  additional: {
    certifications: [
      { id: nanoid(), name: 'Google Analytics Certified', issuer: 'Google', date: '2023' },
      { id: nanoid(), name: 'HubSpot Inbound Marketing', issuer: 'HubSpot', date: '2022' },
    ],
    awards: ['Marketing Excellence Award 2023', 'Top 40 Under 40 Marketing Professionals'],
    volunteer: ['Marketing Mentor - Women in Business', 'Non-profit Board Member - Arts Foundation'],
    hobbies: [],
  },
};

export const freshGraduateResume: Resume = {
  id: nanoid(),
  name: 'Fresh Graduate Resume',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  templateId: 'minimal',
  personalInfo: {
    name: 'Jordan Williams',
    title: 'Recent Graduate - Business Analytics',
    email: 'jordan.williams@email.com',
    phone: '+1 (555) 456-7890',
    location: 'Chicago, IL',
    linkedin: 'linkedin.com/in/jordanwilliams',
    github: 'github.com/jordanw',
  },
  summary: 'Motivated Business Analytics graduate with strong foundation in data analysis, statistical modeling, and business intelligence. Completed internships at two Fortune 500 companies. Eager to apply analytical skills and fresh perspective to drive data-informed business decisions.',
  experience: [
    {
      id: nanoid(),
      company: 'Fortune Analytics Corp',
      position: 'Data Analytics Intern',
      startDate: '2023-06',
      endDate: '2023-08',
      current: false,
      description: 'Summer internship in Business Intelligence team',
      achievements: [
        'Developed automated reporting dashboard saving 10 hours weekly',
        'Analyzed customer behavior data leading to 15% improvement in retention',
        'Presented findings to executive leadership team',
      ],
    },
    {
      id: nanoid(),
      company: 'University Research Lab',
      position: 'Research Assistant',
      startDate: '2022-09',
      endDate: '2023-05',
      current: false,
      description: 'Assisted professor with economic research projects',
      achievements: [
        'Co-authored research paper published in academic journal',
        'Collected and analyzed data from 500+ survey respondents',
        'Built predictive models using Python and R',
      ],
    },
  ],
  education: [
    {
      id: nanoid(),
      institution: 'University of Chicago',
      degree: 'Bachelor of Science',
      field: 'Business Analytics',
      startDate: '2020-09',
      endDate: '2024-05',
      gpa: '3.7',
      achievements: ['Magna Cum Laude', 'Beta Gamma Sigma Honor Society', 'Dean\'s List (All Semesters)'],
    },
  ],
  skills: {
    technical: ['Python', 'R', 'SQL', 'Tableau', 'Excel', 'Power BI', 'SPSS', 'Machine Learning'],
    languages: ['English (Native)', 'Spanish (Conversational)'],
    softSkills: ['Analytical Thinking', 'Presentation Skills', 'Team Collaboration', 'Time Management'],
  },
  projects: [
    {
      id: nanoid(),
      name: 'Capstone: Retail Demand Forecasting',
      description: 'Developed machine learning model to predict retail demand with 92% accuracy. Project selected for university showcase.',
      technologies: ['Python', 'Scikit-learn', 'Pandas', 'Tableau'],
    },
    {
      id: nanoid(),
      name: 'Stock Market Sentiment Analysis',
      description: 'Built NLP model analyzing social media sentiment to predict stock price movements.',
      technologies: ['Python', 'NLTK', 'TensorFlow'],
      url: 'github.com/jordanw/stock-sentiment',
    },
  ],
  additional: {
    certifications: [
      { id: nanoid(), name: 'Google Data Analytics Certificate', issuer: 'Google', date: '2023' },
    ],
    awards: ['University Analytics Competition Winner', 'Dean\'s Academic Excellence Award'],
    volunteer: ['Data Science Club President', 'Peer Tutor - Statistics'],
    hobbies: [],
  },
};

export const sampleResumes = [
  softwareDeveloperResume,
  marketingManagerResume,
  freshGraduateResume,
];
