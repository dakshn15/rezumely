import React from 'react';
import { Resume } from '@/data/resumeModel';
import { ModernTemplate } from './ModernTemplate';
import { ClassicTemplate } from './ClassicTemplate';
import { MinimalTemplate } from './MinimalTemplate';
import { CreativeTemplate } from './CreativeTemplate';

interface TemplateRendererProps {
  resume: Resume;
  templateId: string;
}

export const TemplateRenderer: React.FC<TemplateRendererProps> = ({ resume, templateId }) => {
  const templates: Record<string, React.FC<{ resume: Resume }>> = {
    modern: ModernTemplate,
    classic: ClassicTemplate,
    minimal: MinimalTemplate,
    creative: CreativeTemplate,
  };

  const Template = templates[templateId] || ModernTemplate;

  return <Template resume={resume} />;
};

export const templateInfo = [
  {
    id: 'modern',
    name: 'Modern',
    description: 'Two-column layout with sidebar, perfect for tech professionals',
    color: '#1e3a5f',
  },
  {
    id: 'classic',
    name: 'Classic',
    description: 'Traditional single-column design, ideal for conservative industries',
    color: '#000000',
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Ultra-clean design with maximum white space and ATS compatibility',
    color: '#6b7280',
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Bold colors and timeline design for creative professionals',
    color: '#7c3aed',
  },
];
