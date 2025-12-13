import { nanoid } from 'nanoid';
import { Resume } from '@/data/resumeModel';

export const generateId = (): string => nanoid();

export const debounce = <T extends (...args: unknown[]) => void>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  
  return (...args: Parameters<T>) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), wait);
  };
};

export const deepClone = <T>(obj: T): T => JSON.parse(JSON.stringify(obj));

export const calculateCompletionPercentage = (resume: Resume): number => {
  let completed = 0;
  let total = 0;

  // Personal Info (required fields)
  const requiredPersonalFields = ['name', 'email', 'phone'] as const;
  requiredPersonalFields.forEach((field) => {
    total++;
    if (resume.personalInfo[field]) completed++;
  });

  // Summary
  total++;
  if (resume.summary && resume.summary.length > 20) completed++;

  // Experience
  total++;
  if (resume.experience.length > 0) completed++;

  // Education
  total++;
  if (resume.education.length > 0) completed++;

  // Skills
  total++;
  const hasSkills = 
    resume.skills.technical.length > 0 || 
    resume.skills.languages.length > 0 ||
    resume.skills.softSkills.length > 0;
  if (hasSkills) completed++;

  return Math.round((completed / total) * 100);
};

export const formatDate = (dateString: string): string => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

export const formatDateRange = (start: string, end: string, current: boolean): string => {
  const startFormatted = formatDate(start);
  const endFormatted = current ? 'Present' : formatDate(end);
  return `${startFormatted} - ${endFormatted}`;
};

export const formatPhoneNumber = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }
  if (cleaned.length === 11) {
    return `+${cleaned[0]} (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
  }
  return phone;
};

export const generateFileName = (resumeName: string, extension: string): string => {
  const sanitized = resumeName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const timestamp = new Date().toISOString().split('T')[0];
  return `${sanitized}-${timestamp}.${extension}`;
};

export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
};

export const exportToJSON = (resume: Resume): string => {
  return JSON.stringify(resume, null, 2);
};

export const exportToText = (resume: Resume): string => {
  const lines: string[] = [];
  
  // Personal Info
  lines.push(resume.personalInfo.name);
  lines.push(resume.personalInfo.title);
  lines.push(`${resume.personalInfo.email} | ${resume.personalInfo.phone} | ${resume.personalInfo.location}`);
  lines.push('');
  
  // Summary
  if (resume.summary) {
    lines.push('SUMMARY');
    lines.push(resume.summary);
    lines.push('');
  }
  
  // Experience
  if (resume.experience.length > 0) {
    lines.push('EXPERIENCE');
    resume.experience.forEach((exp) => {
      lines.push(`${exp.position} at ${exp.company}`);
      lines.push(formatDateRange(exp.startDate, exp.endDate, exp.current));
      lines.push(exp.description);
      exp.achievements.forEach((a) => lines.push(`• ${a}`));
      lines.push('');
    });
  }
  
  // Education
  if (resume.education.length > 0) {
    lines.push('EDUCATION');
    resume.education.forEach((edu) => {
      lines.push(`${edu.degree} in ${edu.field}`);
      lines.push(edu.institution);
      lines.push(formatDateRange(edu.startDate, edu.endDate, false));
      lines.push('');
    });
  }
  
  // Skills
  lines.push('SKILLS');
  if (resume.skills.technical.length > 0) {
    lines.push(`Technical: ${resume.skills.technical.join(', ')}`);
  }
  if (resume.skills.languages.length > 0) {
    lines.push(`Languages: ${resume.skills.languages.join(', ')}`);
  }
  if (resume.skills.softSkills.length > 0) {
    lines.push(`Soft Skills: ${resume.skills.softSkills.join(', ')}`);
  }
  
  return lines.join('\n');
};

export const exportToMarkdown = (resume: Resume): string => {
  const lines: string[] = [];
  
  lines.push(`# ${resume.personalInfo.name}`);
  lines.push(`**${resume.personalInfo.title}**`);
  lines.push('');
  lines.push(`📧 ${resume.personalInfo.email} | 📱 ${resume.personalInfo.phone} | 📍 ${resume.personalInfo.location}`);
  lines.push('');
  
  if (resume.summary) {
    lines.push('## Summary');
    lines.push(resume.summary);
    lines.push('');
  }
  
  if (resume.experience.length > 0) {
    lines.push('## Experience');
    resume.experience.forEach((exp) => {
      lines.push(`### ${exp.position} at ${exp.company}`);
      lines.push(`*${formatDateRange(exp.startDate, exp.endDate, exp.current)}*`);
      lines.push('');
      lines.push(exp.description);
      lines.push('');
      exp.achievements.forEach((a) => lines.push(`- ${a}`));
      lines.push('');
    });
  }
  
  if (resume.education.length > 0) {
    lines.push('## Education');
    resume.education.forEach((edu) => {
      lines.push(`### ${edu.degree} in ${edu.field}`);
      lines.push(`**${edu.institution}** | *${formatDateRange(edu.startDate, edu.endDate, false)}*`);
      if (edu.gpa) lines.push(`GPA: ${edu.gpa}`);
      lines.push('');
    });
  }
  
  lines.push('## Skills');
  if (resume.skills.technical.length > 0) {
    lines.push(`**Technical:** ${resume.skills.technical.join(', ')}`);
  }
  if (resume.skills.languages.length > 0) {
    lines.push(`**Languages:** ${resume.skills.languages.join(', ')}`);
  }
  if (resume.skills.softSkills.length > 0) {
    lines.push(`**Soft Skills:** ${resume.skills.softSkills.join(', ')}`);
  }
  
  return lines.join('\n');
};
