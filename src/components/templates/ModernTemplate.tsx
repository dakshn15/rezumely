import React from 'react';
import { Resume } from '@/data/resumeModel';
import { formatDateRange } from '@/utils/helpers';
import { Mail, Phone, MapPin, Linkedin, Globe, Github } from 'lucide-react';

interface TemplateProps {
  resume: Resume;
}

export const ModernTemplate: React.FC<TemplateProps> = ({ resume }) => {
  const { personalInfo, summary, experience, education, skills, projects, additional } = resume;

  return (
    <div className="resume-paper p-0 font-sans text-[11px] leading-relaxed print:shadow-none" style={{ fontFamily: 'Inter, sans-serif' }}>
      <div className="flex min-h-[297mm]">
        {/* Sidebar */}
        <div className="w-[70mm] bg-[#1e3a5f] text-white p-6 print:bg-[#1e3a5f]" style={{ backgroundColor: '#1e3a5f' }}>
          {/* Photo placeholder */}
          {personalInfo.photo ? (
            <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-2 border-white/30">
              <img src={personalInfo.photo} alt={personalInfo.name} className="w-full h-full object-cover" data-photo />
            </div>
          ) : (
            <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-white/10 flex items-center justify-center text-2xl font-bold" data-photo>
              {personalInfo.name.split(' ').map(n => n[0]).join('')}
            </div>
          )}

          {/* Contact */}
          <div className="mb-6">
            <h3 className="text-xs font-semibold uppercase tracking-wider mb-3 text-white/80">Contact</h3>
            <div className="space-y-2 text-[10px]">
              {personalInfo.email && (
                <div className="flex items-center gap-2">
                  <Mail className="h-3 w-3 shrink-0 text-white/70" />
                  <span className="break-all">{personalInfo.email}</span>
                </div>
              )}
              {personalInfo.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="h-3 w-3 shrink-0 text-white/70" />
                  <span>{personalInfo.phone}</span>
                </div>
              )}
              {personalInfo.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="h-3 w-3 shrink-0 text-white/70" />
                  <span>{personalInfo.location}</span>
                </div>
              )}
              {personalInfo.linkedin && (
                <div className="flex items-center gap-2">
                  <Linkedin className="h-3 w-3 shrink-0 text-white/70" />
                  <span className="break-all">{personalInfo.linkedin}</span>
                </div>
              )}
              {personalInfo.website && (
                <div className="flex items-center gap-2">
                  <Globe className="h-3 w-3 shrink-0 text-white/70" />
                  <span className="break-all">{personalInfo.website}</span>
                </div>
              )}
              {personalInfo.github && (
                <div className="flex items-center gap-2">
                  <Github className="h-3 w-3 shrink-0 text-white/70" />
                  <span className="break-all">{personalInfo.github}</span>
                </div>
              )}
            </div>
          </div>

          {/* Skills */}
          {(skills.technical.length > 0 || skills.languages.length > 0 || skills.softSkills.length > 0) && (
            <div className="mb-6">
              <h3 className="text-xs font-semibold uppercase tracking-wider mb-3 text-white/80">Skills</h3>
              {skills.technical.length > 0 && (
                <div className="mb-3">
                  <h4 className="text-[10px] font-medium mb-1.5 text-white/60">Technical</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {skills.technical.map((skill, i) => (
                      <span key={i} className="px-2 py-0.5 bg-white/10 rounded text-[9px]">{skill}</span>
                    ))}
                  </div>
                </div>
              )}
              {skills.languages.length > 0 && (
                <div className="mb-3">
                  <h4 className="text-[10px] font-medium mb-1.5 text-white/60">Languages</h4>
                  <div className="space-y-1">
                    {skills.languages.map((lang, i) => (
                      <div key={i} className="text-[10px]">{lang}</div>
                    ))}
                  </div>
                </div>
              )}
              {skills.softSkills.length > 0 && (
                <div>
                  <h4 className="text-[10px] font-medium mb-1.5 text-white/60">Soft Skills</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {skills.softSkills.map((skill, i) => (
                      <span key={i} className="px-2 py-0.5 bg-white/10 rounded text-[9px]">{skill}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Certifications */}
          {additional.certifications.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider mb-3 text-white/80">Certifications</h3>
              <div className="space-y-2">
                {additional.certifications.map((cert) => (
                  <div key={cert.id}>
                    <div className="font-medium text-[10px]">{cert.name}</div>
                    <div className="text-[9px] text-white/60">{cert.issuer} • {cert.date}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-[#1e3a5f] mb-1">{personalInfo.name || 'Your Name'}</h1>
            <h2 className="text-sm text-[#3b82f6] font-medium">{personalInfo.title || 'Professional Title'}</h2>
          </div>

          {/* Summary */}
          {summary && (
            <div className="mb-5">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#1e3a5f] mb-2 pb-1 border-b border-[#1e3a5f]/20">
                Professional Summary
              </h3>
              <p className="text-gray-700">{summary}</p>
            </div>
          )}

          {/* Experience */}
          {experience.length > 0 && (
            <div className="mb-5">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#1e3a5f] mb-2 pb-1 border-b border-[#1e3a5f]/20">
                Experience
              </h3>
              <div className="space-y-4">
                {experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold text-gray-900">{exp.position}</h4>
                        <div className="text-[#3b82f6] font-medium text-[10px]">{exp.company}</div>
                      </div>
                      <div className="text-[10px] text-gray-500">
                        {formatDateRange(exp.startDate, exp.endDate, exp.current)}
                      </div>
                    </div>
                    {exp.description && <p className="text-gray-600 mt-1 text-[10px]">{exp.description}</p>}
                    {exp.achievements.length > 0 && (
                      <ul className="mt-1.5 space-y-0.5">
                        {exp.achievements.map((achievement, i) => (
                          <li key={i} className="text-gray-700 text-[10px] pl-3 relative before:content-['•'] before:absolute before:left-0 before:text-[#3b82f6]">
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {education.length > 0 && (
            <div className="mb-5">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#1e3a5f] mb-2 pb-1 border-b border-[#1e3a5f]/20">
                Education
              </h3>
              <div className="space-y-3">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold text-gray-900">{edu.degree} in {edu.field}</h4>
                        <div className="text-[#3b82f6] font-medium text-[10px]">{edu.institution}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-[10px] text-gray-500">
                          {formatDateRange(edu.startDate, edu.endDate, false)}
                        </div>
                        {edu.gpa && <div className="text-[10px] text-gray-500">GPA: {edu.gpa}</div>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#1e3a5f] mb-2 pb-1 border-b border-[#1e3a5f]/20">
                Projects
              </h3>
              <div className="space-y-3">
                {projects.map((project) => (
                  <div key={project.id}>
                    <div className="flex justify-between items-start">
                      <h4 className="font-semibold text-gray-900">{project.name}</h4>
                      {project.url && (
                        <span className="text-[10px] text-[#3b82f6]">{project.url}</span>
                      )}
                    </div>
                    <p className="text-gray-600 text-[10px] mt-0.5">{project.description}</p>
                    {project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {project.technologies.map((tech, i) => (
                          <span key={i} className="px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded text-[9px]">{tech}</span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
