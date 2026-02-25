import { Resume } from './resumeModel';
import { nanoid } from 'nanoid';

export interface RoleTemplate {
    slug: string;
    title: string;
    description: string;
    metaTitle: string;
    metaDescription: string;
    resume: Resume;
}

export const roleTemplates: RoleTemplate[] = [
    {
        slug: 'software-engineer',
        title: 'Software Engineer Resume Template',
        description: 'A professional resume template designed for software engineers, developers, and programmers. Highlights technical skills and project experience.',
        metaTitle: 'Software Engineer Resume Template - Free Download | Rezumely',
        metaDescription: 'Build a winning Software Engineer resume with our free, ATS-friendly template. optimized for FAANG and startups.',
        resume: {
            id: 'temp-se',
            personalInfo: {
                name: 'Alex Coder',
                email: 'alex@example.com',
                phone: '+1 (555) 010-0101',
                title: 'Senior Software Engineer',
                location: 'San Francisco, CA',
                linkedin: 'linkedin.com/in/alexcoder',
                github: 'github.com/alexcoder',
                website: 'alexcoder.dev',
            },
            summary: 'Results-driven Senior Software Engineer with 6+ years of experience in building scalable web applications. Expert in React, Node.js, and Cloud Infrastructure. Proven track record of improving system performance by 40%.',
            experience: [
                {
                    id: nanoid(),
                    company: 'Tech Giants Inc.',
                    position: 'Senior Software Engineer',
                    startDate: '2021-03',
                    endDate: '',
                    current: true,
                    description: 'Leading the frontend infrastructure team.',
                    achievements: [
                        'Architected and implemented a new micro-frontend framework, reducing build times by 50%.',
                        'Mentored 5 junior developers and conducted code reviews to ensure high-quality standards.',
                        'Optimized core application performance, improving Core Web Vitals scores by 25 points.'
                    ]
                },
                {
                    id: nanoid(),
                    company: 'StartUp Hustle',
                    position: 'Full Stack Developer',
                    startDate: '2018-06',
                    endDate: '2021-02',
                    current: false,
                    description: 'Early employee contributing to all aspects of the product.',
                    achievements: [
                        'Developed the MVP from scratch using MERN stack, securing Series A funding.',
                        'Implemented real-time collaboration features using WebSockets.',
                        'Designed and managed AWS infrastructure using Terraform.'
                    ]
                }
            ],
            education: [
                {
                    id: nanoid(),
                    institution: 'University of Technology',
                    degree: 'B.S. Computer Science',
                    field: 'Computer Science',
                    startDate: '2014-09',
                    endDate: '2018-05',
                    gpa: '3.8'
                }
            ],
            skills: {
                technical: ['JavaScript (ES6+)', 'TypeScript', 'React', 'Node.js', 'AWS', 'Docker', 'GraphQL', 'PostgreSQL'],
                softSkills: ['Leadership', 'Problem Solving', 'Communication', 'Agile Methodology'],
                languages: ['English (Native)', 'Spanish (Intermediate)']
            },
            projects: [
                {
                    id: nanoid(),
                    name: 'Open Source UI Library',
                    description: 'A lightweight React UI component library.',
                    url: 'github.com/alexcoder/ui-lib',
                    technologies: ['React', 'TypeScript', 'Storybook'],
                    highlights: ['Over 1k stars on GitHub', 'Used by 500+ developers']
                }
            ],
            additional: {
                certifications: [],
                awards: ['Hackathon Winner 2019'],
                volunteer: [],
                hobbies: ['Rock Climbing', 'Open Source Contributor']
            },
            name: 'Senior Software Engineer Resume',
            templateId: 'modern',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        }
    },
    {
        slug: 'product-manager',
        title: 'Product Manager Resume Template',
        description: 'Strategic resume template for Product Managers. Focuses on product lifecycle, metrics, and cross-functional leadership.',
        metaTitle: 'Product Manager Resume Template - Free & ATS Friendly | Rezumely',
        metaDescription: 'Create a persuasive Product Manager resume. specialized layout to showcase product launches, KPIs, and user growth strategies.',
        resume: {
            id: 'temp-pm',
            personalInfo: {
                name: 'Jordan Strategy',
                email: 'jordan@example.com',
                phone: '+1 (555) 020-0202',
                title: 'Senior Product Manager',
                location: 'New York, NY',
                linkedin: 'linkedin.com/in/jordanpm',
                website: 'jordanpm.com',
            },
            summary: 'Data-driven Product Manager with 5 years of experience in B2B SaaS. Skilled in agile development, user research, and go-to-market strategies. Successfully launched 3 products generating $2M+ ARR.',
            experience: [
                {
                    id: nanoid(),
                    company: 'SaaS Solutions',
                    position: 'Product Manager',
                    startDate: '2020-01',
                    endDate: '',
                    current: true,
                    description: 'Owning the core platform experience.',
                    achievements: [
                        'Led the redesign of the user onboarding flow, increasing activation rate by 20%.',
                        'Collaborated with engineering and design to launch a new analytics dashboard.',
                        'Conducted 50+ user interviews to identify pain points and prioritize the roadmap.'
                    ]
                },
                {
                    id: nanoid(),
                    company: 'E-commerce Corp',
                    position: 'Associate Product Manager',
                    startDate: '2017-06',
                    endDate: '2019-12',
                    current: false,
                    description: 'Supported the mobile app team.',
                    achievements: [
                        'Managed the backlog for the iOS app, shipping bi-weekly updates.',
                        'Analyzed A/B test results to optimize checkout conversion by 5%.',
                        'Coordinated with marketing for feature launch campaigns.'
                    ]
                }
            ],
            education: [
                {
                    id: nanoid(),
                    institution: 'State University',
                    degree: 'MBA',
                    field: 'Business Administration',
                    startDate: '2015-09',
                    endDate: '2017-05',
                    gpa: '3.9'
                }
            ],
            skills: {
                technical: ['JIRA', 'Figma', 'SQL', 'Google Analytics', 'Amplitude', 'Tableau'],
                softSkills: ['Strategic Planning', 'Stakeholder Management', 'User Empathy', 'Data Analysis'],
                languages: ['English (Native)']
            },
            projects: [],
            additional: {
                certifications: [{ id: nanoid(), name: 'Certified Scrum Product Owner (CSPO)', issuer: 'Scrum Alliance', date: '2019' }],
                awards: [],
                volunteer: [],
                hobbies: ['Running', 'Behavioral Economics']
            },
            name: 'Senior Product Manager Resume',
            templateId: 'modern',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        }
    },
    {
        slug: 'data-scientist',
        title: 'Data Scientist Resume Template',
        description: 'Analytical resume tailored for Data Scientists and Machine Learning Engineers. Emphasizes statistical modeling, large datasets, and predictive analytics algorithms.',
        metaTitle: 'Data Scientist Resume Template - Free & ATS Friendly | Rezumely',
        metaDescription: 'Download our comprehensive Data Scientist resume template. Perfect for highlighting your machine learning models, statistical analysis, and Python programming skills. ATS optimized.',
        resume: {
            id: 'temp-ds',
            personalInfo: {
                name: 'Elena Data',
                email: 'elena.data@example.com',
                phone: '+1 (555) 030-0303',
                title: 'Lead Data Scientist',
                location: 'Austin, TX',
                linkedin: 'linkedin.com/in/elenadata',
                github: 'github.com/elenadata',
            },
            summary: 'Result-oriented Lead Data Scientist with 7+ years of experience extracting actionable insights from complex data sets. Proven expertise in machine learning, NLP, and predictive modeling using Python and R. Dedicated to solving real-world business problems through data-driven decisions.',
            experience: [
                {
                    id: nanoid(),
                    company: 'AI Innovations Lab',
                    position: 'Lead Data Scientist',
                    startDate: '2021-05',
                    endDate: '',
                    current: true,
                    description: 'Directing the machine learning team to build predictive models for the core business.',
                    achievements: [
                        'Developed a customer churn prediction model with 92% accuracy, retaining $1.5M in annual revenue.',
                        'Led the migration of legacy data pipelines to Apache Spark, reducing data processing time by 60%.',
                        'Mentored a team of 4 junior data scientists and established best practices for MLOps.'
                    ]
                },
                {
                    id: nanoid(),
                    company: 'FinTech Solutions',
                    position: 'Data Scientist',
                    startDate: '2018-07',
                    endDate: '2021-04',
                    current: false,
                    description: 'Focusing on fraud detection and risk modeling.',
                    achievements: [
                        'Implemented an anomaly detection algorithm that reduced fraudulent transactions by 30%.',
                        'Created interactive Tableau dashboards for executive reporting, tracking key business metrics.',
                        'Automated data cleaning processes, saving 15 hours of manual work per week.'
                    ]
                }
            ],
            education: [
                {
                    id: nanoid(),
                    institution: 'Technical Institute of Science',
                    degree: 'M.S. Data Science',
                    field: 'Data Science',
                    startDate: '2016-09',
                    endDate: '2018-05',
                    gpa: '3.95'
                },
                {
                    id: nanoid(),
                    institution: 'State University',
                    degree: 'B.S. Mathematics',
                    field: 'Mathematics',
                    startDate: '2012-09',
                    endDate: '2016-05',
                    gpa: '3.8'
                }
            ],
            skills: {
                technical: ['Python', 'R', 'SQL', 'TensorFlow', 'PyTorch', 'Scikit-Learn', 'Apache Spark', 'AWS', 'Tableau'],
                softSkills: ['Analytical Thinking', 'Communication', 'Project Management', 'Problem Solving'],
                languages: ['English (Native)', 'French (Conversational)']
            },
            projects: [
                {
                    id: nanoid(),
                    name: 'Natural Language Processing sentiment analyzer',
                    description: 'Built a real-time sentiment analysis tool for Twitter data using BERT.',
                    url: 'github.com/elenadata/nlp-sentiment',
                    technologies: ['Python', 'Transformers', 'FastAPI'],
                    highlights: ['Processed 1M+ tweets per day', 'Achieved 89% F1 score']
                }
            ],
            additional: {
                certifications: [{ id: nanoid(), name: 'AWS Certified Machine Learning – Specialty', issuer: 'Amazon Web Services', date: '2022' }],
                awards: [],
                volunteer: [],
                hobbies: ['Chess', 'Blogging about AI']
            },
            name: 'Lead Data Scientist Resume',
            templateId: 'minimal',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        }
    },
    {
        slug: 'marketing-manager',
        title: 'Marketing Manager Resume Template',
        description: 'Dynamic resume template for Marketing Managers and Specialists. Designed to showcase campaign KPIs, ROI growth, and strategic marketing initiatives.',
        metaTitle: 'Marketing Manager Resume Template - Free & ATS Friendly | Rezumely',
        metaDescription: 'Draft a compelling Marketing Manager resume. Our free template is designed to highlight your campaign successes, SEO growth, and brand strategy efficiently.',
        resume: {
            id: 'temp-mm',
            personalInfo: {
                name: 'Sarah Market',
                email: 'sarah.m@example.com',
                phone: '+1 (555) 040-0404',
                title: 'Digital Marketing Manager',
                location: 'Chicago, IL',
                linkedin: 'linkedin.com/in/sarahmarket',
                website: 'sarahmarket.com',
            },
            summary: 'Innovative Digital Marketing Manager with over 8 years of experience executing successful multi-channel campaigns. Adept at SEO, SEM, content strategy, and performance analytics. Proven ability to drive brand awareness and generate a 150% increase in inbound leads year-over-year.',
            experience: [
                {
                    id: nanoid(),
                    company: 'Global Brands Corp',
                    position: 'Digital Marketing Manager',
                    startDate: '2020-03',
                    endDate: '',
                    current: true,
                    description: 'Overseeing all digital marketing efforts for the North American region.',
                    achievements: [
                        'Spearheaded a comprehensive SEO overhaul, resulting in a 200% increase in organic traffic within 6 months.',
                        'Managed a $1.2M annual ad spend across Google, paid social, and display networks, delivering a 4x ROI.',
                        'Led a team of 3 marketing specialists and 2 external agencies to coordinate global product launches.'
                    ]
                },
                {
                    id: nanoid(),
                    company: 'Creative Agency LLC',
                    position: 'Marketing Strategist',
                    startDate: '2016-08',
                    endDate: '2020-02',
                    current: false,
                    description: 'Developed and executed marketing strategies for B2B and B2C clients.',
                    achievements: [
                        'Designed an email marketing automation sequence that boosted conversion rates by 35%.',
                        'Produced and hosted a weekly industry podcast, growing the audience to 10k listeners per episode.',
                        'Conducted market research and competitor analysis to inform client positioning strategies.'
                    ]
                }
            ],
            education: [
                {
                    id: nanoid(),
                    institution: 'University of Business',
                    degree: 'B.A. Marketing',
                    field: 'Marketing',
                    startDate: '2012-09',
                    endDate: '2016-05',
                    gpa: '3.7'
                }
            ],
            skills: {
                technical: ['Google Analytics', 'Google Ads', 'HubSpot', 'Salesforce', 'SEO (Ahrefs/SEMrush)', 'Social Media Management', 'HTML/CSS Basics'],
                softSkills: ['Creative Strategy', 'Public Speaking', 'Team Leadership', 'Budget Management'],
                languages: ['English (Native)', 'Spanish (Fluent)']
            },
            projects: [],
            additional: {
                certifications: [{ id: nanoid(), name: 'HubSpot Inbound Marketing Certification', issuer: 'HubSpot Academy', date: '2021' }],
                awards: ['Marketer of the Year 2019 - Agency Awards'],
                volunteer: [],
                hobbies: ['Photography', 'Travel']
            },
            name: 'Digital Marketing Manager Resume',
            templateId: 'classic',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        }
    },
    {
        slug: 'designer',
        title: 'UX/UI Designer Resume Template',
        description: 'Visually appealing resume template tailored for UX/UI Designers, Product Designers, and Creatives. Showcases your portfolio links and design system expertise.',
        metaTitle: 'UX/UI Designer Resume Template - Free & ATS Friendly | Rezumely',
        metaDescription: 'Stand out with our UX/UI Designer resume template. Specifically crafted to highlight your design portfolio, user research, and prototyping skills. Free and ATS optimized.',
        resume: {
            id: 'temp-ux',
            personalInfo: {
                name: 'Chris Designer',
                email: 'chris.ux@example.com',
                phone: '+1 (555) 050-0505',
                title: 'Senior UX/UI Designer',
                location: 'Seattle, WA',
                linkedin: 'linkedin.com/in/chrisux',
                website: 'chrisux.design',
            },
            summary: 'Passionate Senior UX/UI Designer focused on creating intuitive, human-centered digital experiences. 6 years of expertise in end-to-end product design, from wireframing and prototyping to high-fidelity UI and design systems. Deep advocate for accessibility and inclusive design principles.',
            experience: [
                {
                    id: nanoid(),
                    company: 'Creative Tech Studios',
                    position: 'Senior UX/UI Designer',
                    startDate: '2021-02',
                    endDate: '',
                    current: true,
                    description: 'Leading design initiatives for enterprise SaaS products.',
                    achievements: [
                        'Architected and maintained a comprehensive design system in Figma, adopted by 3 major product teams and accelerating design workflows by 40%.',
                        'Redesigned the core user dashboard, improving task completion rates by 25% and reducing support tickets.',
                        'Conducted usability testing sessions with over 50 users to validate design decisions and iterate on prototypes.'
                    ]
                },
                {
                    id: nanoid(),
                    company: 'Digital Agency Co.',
                    position: 'UI Designer',
                    startDate: '2018-05',
                    endDate: '2021-01',
                    current: false,
                    description: 'Designed mobile and web applications for various clients.',
                    achievements: [
                        'Created high-fidelity mockups and interactive prototypes for 10+ mobile applications (iOS and Android).',
                        'Collaborated closely with front-end developers to ensure pixel-perfect implementation of designs.',
                        'Participated in client workshops to gather requirements and define product vision.'
                    ]
                }
            ],
            education: [
                {
                    id: nanoid(),
                    institution: 'College of Art & Design',
                    degree: 'B.F.A. Interaction Design',
                    field: 'Interaction Design',
                    startDate: '2014-09',
                    endDate: '2018-05',
                    gpa: '3.8'
                }
            ],
            skills: {
                technical: ['Figma', 'Sketch', 'Adobe Creative Suite', 'InVision', 'Prototyping', 'Wireframing', 'Basic HTML/CSS'],
                softSkills: ['User Empathy', 'Cross-functional Collaboration', 'Design Thinking', 'Visual Communication'],
                languages: ['English (Native)']
            },
            projects: [
                {
                    id: nanoid(),
                    name: 'E-commerce Mobile App Redesign',
                    description: 'A personal case study redesigning a popular e-commerce app to improve checkout flow.',
                    url: 'chrisux.design/ecommerce-case-study',
                    technologies: ['Figma', 'User Research', 'Usability Testing'],
                    highlights: ['Featured on UX Collective publication']
                }
            ],
            additional: {
                certifications: [{ id: nanoid(), name: 'Google UX Design Professional Certificate', issuer: 'Coursera', date: '2020' }],
                awards: [],
                volunteer: ['Design Mentor at DesignBuddies'],
                hobbies: ['Illustration', 'Typography']
            },
            name: 'Senior UX/UI Designer Resume',
            templateId: 'creative',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        }
    }
];
