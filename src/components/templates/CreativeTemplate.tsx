import React from 'react';
import { Resume } from '@/data/resumeModel';
import { formatDateRange } from '@/utils/helpers';
import { Mail, Phone, MapPin, Linkedin, Globe, Github } from 'lucide-react';

interface TemplateProps {
  resume: Resume;
}

export const CreativeTemplate: React.FC<TemplateProps> = ({ resume }) => {
  const { personalInfo, summary, experience, education, skills, projects, additional } = resume;

  return (
    <div className="resume-paper p-0 font-sans text-[11px] leading-relaxed print:shadow-none overflow-hidden" style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Header with diagonal accent */}
      <div className="relative bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-8 py-8 overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-20 w-24 h-24 bg-white/5 rounded-full translate-y-1/2" />
        
        <div className="relative">
          <h1 className="text-3xl font-bold mb-1">{personalInfo.name || 'Your Name'}</h1>
          {personalInfo.title && (
            <h2 className="text-lg font-light text-white/90 mb-4">{personalInfo.title}</h2>
          )}
          <div className="flex flex-wrap gap-4 text-[10px]">
            {personalInfo.email && (
              <div className="flex items-center gap-1.5">
                <Mail className="h-3 w-3" />
                <span>{personalInfo.email}</span>
              </div>
            )}
            {personalInfo.phone && (
              <div className="flex items-center gap-1.5">
                <Phone className="h-3 w-3" />
                <span>{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo.location && (
              <div className="flex items-center gap-1.5">
                <MapPin className="h-3 w-3" />
                <span>{personalInfo.location}</span>
              </div>
            )}
            {personalInfo.linkedin && (
              <div className="flex items-center gap-1.5">
                <Linkedin className="h-3 w-3" />
                <span>{personalInfo.linkedin}</span>
              </div>
            )}
            {personalInfo.github && (
              <div className="flex items-center gap-1.5">
                <Github className="h-3 w-3" />
                <span>{personalInfo.github}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="p-8">
        {/* Summary */}
        {summary && (
          <div className="mb-6">
            <p className="text-gray-600 leading-relaxed border-l-4 border-violet-500 pl-4 italic">
              {summary}
            </p>
          </div>
        )}

        <div className="grid grid-cols-3 gap-6">
          {/* Main Column */}
          <div className="col-span-2 space-y-6">
            {/* Experience Timeline */}
            {experience.length > 0 && (
              <div>
                <h3 className="text-sm font-bold text-violet-600 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <span className="w-8 h-0.5 bg-violet-500" />
                  Experience
                </h3>
                <div className="relative">
                  <div className="absolute left-[5px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-violet-500 to-indigo-500" />
                  <div className="space-y-4">
                    {experience.map((exp, index) => (
                      <div key={exp.id} className="relative pl-6">
                        <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full bg-white border-2 border-violet-500" />
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-bold text-gray-900">{exp.position}</h4>
                            <div className="text-violet-600 font-medium text-[10px]">{exp.company}</div>
                          </div>
                          <span className="text-[10px] text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                            {formatDateRange(exp.startDate, exp.endDate, exp.current)}
                          </span>
                        </div>
                        {exp.achievements.length > 0 && (
                          <ul className="mt-2 space-y-1">
                            {exp.achievements.map((achievement, i) => (
                              <li key={i} className="text-gray-600 text-[10px] flex items-start gap-2">
                                <span className="text-violet-400 mt-0.5">▸</span>
                                {achievement}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Projects */}
            {projects.length > 0 && (
              <div>
                <h3 className="text-sm font-bold text-violet-600 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <span className="w-8 h-0.5 bg-violet-500" />
                  Projects
                </h3>
                <div className="grid gap-3">
                  {projects.map((project) => (
                    <div key={project.id} className="bg-gray-50 rounded-lg p-3">
                      <div className="flex justify-between items-start">
                        <h4 className="font-bold text-gray-900">{project.name}</h4>
                        {project.url && (
                          <span className="text-[9px] text-violet-600">{project.url}</span>
                        )}
                      </div>
                      <p className="text-gray-600 text-[10px] mt-1">{project.description}</p>
                      {project.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {project.technologies.map((tech, i) => (
                            <span key={i} className="px-2 py-0.5 bg-violet-100 text-violet-700 rounded text-[9px] font-medium">
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Education */}
            {education.length > 0 && (
              <div>
                <h3 className="text-sm font-bold text-violet-600 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <span className="w-4 h-0.5 bg-violet-500" />
                  Education
                </h3>
                <div className="space-y-3">
                  {education.map((edu) => (
                    <div key={edu.id} className="bg-gradient-to-r from-violet-50 to-indigo-50 rounded-lg p-3">
                      <h4 className="font-semibold text-gray-900 text-[10px]">{edu.degree}</h4>
                      <div className="text-violet-600 text-[9px]">{edu.field}</div>
                      <div className="text-gray-500 text-[9px] mt-1">{edu.institution}</div>
                      <div className="text-gray-400 text-[9px]">
                        {formatDateRange(edu.startDate, edu.endDate, false)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Skills */}
            {(skills.technical.length > 0 || skills.softSkills.length > 0) && (
              <div>
                <h3 className="text-sm font-bold text-violet-600 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <span className="w-4 h-0.5 bg-violet-500" />
                  Skills
                </h3>
                <div className="space-y-2">
                  {skills.technical.map((skill, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="h-1.5 flex-1 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full"
                          style={{ width: `${85 - i * 5}%` }}
                        />
                      </div>
                      <span className="text-[9px] text-gray-600 w-20 text-right">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Languages */}
            {skills.languages.length > 0 && (
              <div>
                <h3 className="text-sm font-bold text-violet-600 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <span className="w-4 h-0.5 bg-violet-500" />
                  Languages
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {skills.languages.map((lang, i) => (
                    <span key={i} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-[9px]">
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Certifications */}
            {additional.certifications.length > 0 && (
              <div>
                <h3 className="text-sm font-bold text-violet-600 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <span className="w-4 h-0.5 bg-violet-500" />
                  Certifications
                </h3>
                <div className="space-y-2">
                  {additional.certifications.map((cert) => (
                    <div key={cert.id} className="text-[9px]">
                      <div className="font-medium text-gray-900">{cert.name}</div>
                      <div className="text-gray-500">{cert.issuer} • {cert.date}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
