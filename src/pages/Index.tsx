import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileText, Palette, Download, Sparkles, ArrowRight, CheckCircle } from 'lucide-react';
import { CustomButton } from '@/components/ui/custom-button';
import { templateInfo } from '@/components/templates/TemplateRenderer';

const Index = () => {
  const features = [
    { icon: FileText, title: 'ATS-Optimized', description: 'Templates designed to pass applicant tracking systems' },
    { icon: Palette, title: '4 Pro Templates', description: 'Modern, Classic, Minimal, and Creative designs' },
    { icon: Download, title: 'PDF Export', description: 'High-quality PDF downloads ready for applications' },
    { icon: Sparkles, title: 'Real-time Preview', description: 'See changes instantly as you type' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass border-b">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
              <FileText className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-semibold text-foreground">ResumeBuilder Pro</span>
          </Link>
          <nav className="flex items-center gap-4">
            <Link to="/templates" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Templates
            </Link>
            <Link to="/editor">
              <CustomButton variant="hero" size="sm">
                Build Resume <ArrowRight className="h-4 w-4" />
              </CustomButton>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto text-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6">
              Free Professional Resume Builder
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 tracking-tight">
              Build Your Perfect Resume in{' '}
              <span className="gradient-text">Minutes</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Create ATS-friendly resumes with our professional templates. Real-time preview, 
              smart suggestions, and instant PDF export.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/editor">
                <CustomButton variant="hero" size="xl">
                  Start Building <ArrowRight className="h-5 w-5" />
                </CustomButton>
              </Link>
              <Link to="/templates">
                <CustomButton variant="outline" size="xl">
                  View Templates
                </CustomButton>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 bg-muted/50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Everything You Need</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="section-container card-hover"
              >
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Templates Preview */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Professional Templates</h2>
          <p className="text-muted-foreground text-center mb-12 max-w-xl mx-auto">
            Choose from 4 ATS-optimized templates designed for different industries
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {templateInfo.map((template) => (
              <Link key={template.id} to="/editor" className="group">
                <div className="template-card bg-card p-4">
                  <div 
                    className="aspect-[3/4] rounded-lg mb-3 flex items-center justify-center"
                    style={{ backgroundColor: `${template.color}15` }}
                  >
                    <FileText className="h-12 w-12" style={{ color: template.color }} />
                  </div>
                  <h3 className="font-semibold text-foreground">{template.name}</h3>
                  <p className="text-xs text-muted-foreground">{template.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-gradient-hero text-primary-foreground">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Land Your Dream Job?</h2>
          <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
            Join thousands of professionals who've built winning resumes with our builder.
          </p>
          <Link to="/editor">
            <CustomButton variant="secondary" size="xl">
              Create Your Resume Now <ArrowRight className="h-5 w-5" />
            </CustomButton>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          <p>© 2024 ResumeBuilder Pro. Built with ❤️ for job seekers.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
