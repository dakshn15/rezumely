import React from 'react';
import { Link } from 'react-router-dom';
import { useResumeStore } from '@/store/resumeStore';
import { TemplateRenderer, templateInfo } from '@/components/templates/TemplateRenderer';
import { CustomButton } from '@/components/ui/custom-button';
import { CustomInput } from '@/components/ui/custom-input';
import { CustomTextarea } from '@/components/ui/custom-textarea';
import { ATSScore } from '@/components/editor/ATSScore';
import { ProgressRing } from '@/components/ui/progress-ring';
import { calculateCompletionPercentage } from '@/utils/helpers';
import { exportToPDF } from '@/utils/pdfExport';
import { useSettingsStore } from '@/store/settingsStore';
import { sampleResumes } from '@/data/sampleResumes';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, Download, Save, User, FileText, Briefcase, 
  GraduationCap, Wrench, FolderGit2, Plus, Trash2, Eye
} from 'lucide-react';

const Editor = () => {
  const { currentResume, updatePersonalInfo, updateSummary, addExperience, updateExperience, 
    deleteExperience, addEducation, updateEducation, deleteEducation, updateSkills, 
    addProject, updateProject, deleteProject, setTemplate, setCurrentResume } = useResumeStore();
  const { exportSettings } = useSettingsStore();
  const [activeSection, setActiveSection] = React.useState('personal');
  const [isExporting, setIsExporting] = React.useState(false);
  const previewRef = React.useRef<HTMLDivElement>(null);
  
  const completion = calculateCompletionPercentage(currentResume);

  const handleExportPDF = async () => {
    if (!previewRef.current) return;
    setIsExporting(true);
    try {
      await exportToPDF(previewRef.current, `${currentResume.name || 'resume'}.pdf`, exportSettings);
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const loadSample = (index: number) => {
    setCurrentResume(sampleResumes[index]);
  };

  const sections = [
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'summary', label: 'Summary', icon: FileText },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'skills', label: 'Skills', icon: Wrench },
    { id: 'projects', label: 'Projects', icon: FolderGit2 },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="h-14 border-b bg-card flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center gap-4">
          <Link to="/" className="p-2 hover:bg-muted rounded-lg transition-colors">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="font-semibold">Resume Editor</h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <ProgressRing progress={completion} size={32} strokeWidth={3} />
            <span>{completion}% Complete</span>
          </div>
          <CustomButton variant="outline" size="sm" onClick={() => loadSample(0)}>
            Load Sample
          </CustomButton>
          <CustomButton variant="hero" size="sm" onClick={handleExportPDF} isLoading={isExporting}>
            <Download className="h-4 w-4" /> Export PDF
          </CustomButton>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <div className="w-56 border-r bg-card p-4 flex flex-col gap-2 shrink-0 overflow-y-auto">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors text-left ${
                activeSection === section.id 
                  ? 'bg-accent/10 text-accent font-medium' 
                  : 'text-muted-foreground hover:bg-muted'
              }`}
            >
              <section.icon className="h-4 w-4" />
              {section.label}
            </button>
          ))}
          
          <div className="mt-4 pt-4 border-t">
            <p className="text-xs text-muted-foreground mb-2 px-3">Template</p>
            <div className="space-y-1">
              {templateInfo.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTemplate(t.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    currentResume.templateId === t.id 
                      ? 'bg-primary/10 text-primary font-medium' 
                      : 'text-muted-foreground hover:bg-muted'
                  }`}
                >
                  {t.name}
                </button>
              ))}
            </div>
          </div>
          
          <div className="mt-auto pt-4">
            <ATSScore />
          </div>
        </div>

        {/* Editor Panel */}
        <div className="w-[400px] border-r bg-card overflow-y-auto p-6">
          <motion.div key={activeSection} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {activeSection === 'personal' && (
              <div className="space-y-4">
                <h2 className="font-semibold text-lg mb-4">Personal Information</h2>
                <CustomInput label="Full Name" value={currentResume.personalInfo.name} 
                  onChange={(e) => updatePersonalInfo({ name: e.target.value })} placeholder="John Doe" />
                <CustomInput label="Professional Title" value={currentResume.personalInfo.title}
                  onChange={(e) => updatePersonalInfo({ title: e.target.value })} placeholder="Software Engineer" />
                <CustomInput label="Email" type="email" value={currentResume.personalInfo.email}
                  onChange={(e) => updatePersonalInfo({ email: e.target.value })} placeholder="john@example.com" />
                <CustomInput label="Phone" value={currentResume.personalInfo.phone}
                  onChange={(e) => updatePersonalInfo({ phone: e.target.value })} placeholder="+1 (555) 123-4567" />
                <CustomInput label="Location" value={currentResume.personalInfo.location}
                  onChange={(e) => updatePersonalInfo({ location: e.target.value })} placeholder="San Francisco, CA" />
                <CustomInput label="LinkedIn" value={currentResume.personalInfo.linkedin || ''}
                  onChange={(e) => updatePersonalInfo({ linkedin: e.target.value })} placeholder="linkedin.com/in/johndoe" />
                <CustomInput label="GitHub" value={currentResume.personalInfo.github || ''}
                  onChange={(e) => updatePersonalInfo({ github: e.target.value })} placeholder="github.com/johndoe" />
              </div>
            )}

            {activeSection === 'summary' && (
              <div className="space-y-4">
                <h2 className="font-semibold text-lg mb-4">Professional Summary</h2>
                <CustomTextarea label="Summary" value={currentResume.summary} showCount maxLength={500}
                  onChange={(e) => updateSummary(e.target.value)} 
                  placeholder="Write 2-3 sentences about your experience and career goals..."
                  className="min-h-[200px]" />
              </div>
            )}

            {activeSection === 'experience' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-semibold text-lg">Experience</h2>
                  <CustomButton variant="outline" size="sm" onClick={() => addExperience({
                    company: '', position: '', startDate: '', endDate: '', current: false, description: '', achievements: []
                  })}>
                    <Plus className="h-4 w-4" /> Add
                  </CustomButton>
                </div>
                {currentResume.experience.map((exp, i) => (
                  <div key={exp.id} className="p-4 border rounded-lg space-y-3">
                    <div className="flex justify-between">
                      <span className="font-medium text-sm">Position {i + 1}</span>
                      <button onClick={() => deleteExperience(exp.id)} className="text-destructive hover:bg-destructive/10 p-1 rounded">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <CustomInput label="Company" value={exp.company} onChange={(e) => updateExperience(exp.id, { company: e.target.value })} />
                    <CustomInput label="Position" value={exp.position} onChange={(e) => updateExperience(exp.id, { position: e.target.value })} />
                    <div className="grid grid-cols-2 gap-3">
                      <CustomInput label="Start Date" type="month" value={exp.startDate} onChange={(e) => updateExperience(exp.id, { startDate: e.target.value })} />
                      <CustomInput label="End Date" type="month" value={exp.endDate} disabled={exp.current} onChange={(e) => updateExperience(exp.id, { endDate: e.target.value })} />
                    </div>
                    <label className="flex items-center gap-2 text-sm">
                      <input type="checkbox" checked={exp.current} onChange={(e) => updateExperience(exp.id, { current: e.target.checked })} />
                      Currently working here
                    </label>
                    <CustomTextarea label="Achievements (one per line)" value={exp.achievements.join('\n')} 
                      onChange={(e) => updateExperience(exp.id, { achievements: e.target.value.split('\n').filter(Boolean) })} />
                  </div>
                ))}
              </div>
            )}

            {activeSection === 'education' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-semibold text-lg">Education</h2>
                  <CustomButton variant="outline" size="sm" onClick={() => addEducation({
                    institution: '', degree: '', field: '', startDate: '', endDate: '', gpa: ''
                  })}>
                    <Plus className="h-4 w-4" /> Add
                  </CustomButton>
                </div>
                {currentResume.education.map((edu, i) => (
                  <div key={edu.id} className="p-4 border rounded-lg space-y-3">
                    <div className="flex justify-between">
                      <span className="font-medium text-sm">Education {i + 1}</span>
                      <button onClick={() => deleteEducation(edu.id)} className="text-destructive hover:bg-destructive/10 p-1 rounded">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <CustomInput label="Institution" value={edu.institution} onChange={(e) => updateEducation(edu.id, { institution: e.target.value })} />
                    <CustomInput label="Degree" value={edu.degree} onChange={(e) => updateEducation(edu.id, { degree: e.target.value })} />
                    <CustomInput label="Field of Study" value={edu.field} onChange={(e) => updateEducation(edu.id, { field: e.target.value })} />
                    <div className="grid grid-cols-2 gap-3">
                      <CustomInput label="Start" type="month" value={edu.startDate} onChange={(e) => updateEducation(edu.id, { startDate: e.target.value })} />
                      <CustomInput label="End" type="month" value={edu.endDate} onChange={(e) => updateEducation(edu.id, { endDate: e.target.value })} />
                    </div>
                    <CustomInput label="GPA (optional)" value={edu.gpa || ''} onChange={(e) => updateEducation(edu.id, { gpa: e.target.value })} />
                  </div>
                ))}
              </div>
            )}

            {activeSection === 'skills' && (
              <div className="space-y-4">
                <h2 className="font-semibold text-lg mb-4">Skills</h2>
                <CustomTextarea label="Technical Skills (comma-separated)" value={currentResume.skills.technical.join(', ')}
                  onChange={(e) => updateSkills({ technical: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })} 
                  placeholder="React, TypeScript, Node.js, Python..." />
                <CustomTextarea label="Languages" value={currentResume.skills.languages.join(', ')}
                  onChange={(e) => updateSkills({ languages: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })} 
                  placeholder="English (Native), Spanish (Fluent)..." />
                <CustomTextarea label="Soft Skills" value={currentResume.skills.softSkills.join(', ')}
                  onChange={(e) => updateSkills({ softSkills: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })} 
                  placeholder="Leadership, Communication, Problem Solving..." />
              </div>
            )}

            {activeSection === 'projects' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-semibold text-lg">Projects</h2>
                  <CustomButton variant="outline" size="sm" onClick={() => addProject({
                    name: '', description: '', technologies: [], url: ''
                  })}>
                    <Plus className="h-4 w-4" /> Add
                  </CustomButton>
                </div>
                {currentResume.projects.map((proj, i) => (
                  <div key={proj.id} className="p-4 border rounded-lg space-y-3">
                    <div className="flex justify-between">
                      <span className="font-medium text-sm">Project {i + 1}</span>
                      <button onClick={() => deleteProject(proj.id)} className="text-destructive hover:bg-destructive/10 p-1 rounded">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <CustomInput label="Name" value={proj.name} onChange={(e) => updateProject(proj.id, { name: e.target.value })} />
                    <CustomTextarea label="Description" value={proj.description} onChange={(e) => updateProject(proj.id, { description: e.target.value })} />
                    <CustomInput label="Technologies (comma-separated)" value={proj.technologies.join(', ')}
                      onChange={(e) => updateProject(proj.id, { technologies: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })} />
                    <CustomInput label="URL" value={proj.url || ''} onChange={(e) => updateProject(proj.id, { url: e.target.value })} />
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>

        {/* Preview Panel */}
        <div className="flex-1 preview-panel overflow-auto">
          <div className="flex justify-center py-8">
            <div ref={previewRef} className="transform scale-[0.7] origin-top">
              <TemplateRenderer resume={currentResume} templateId={currentResume.templateId} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;
