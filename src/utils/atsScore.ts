import { Resume } from '@/data/resumeModel';

export interface ATSRecommendation {
  category: 'error' | 'warning' | 'success';
  message: string;
  section: string;
}

export interface ATSScoreResult {
  score: number;
  recommendations: ATSRecommendation[];
}

const actionVerbs = [
  'achieved', 'administered', 'analyzed', 'built', 'collaborated', 'completed',
  'coordinated', 'created', 'delivered', 'designed', 'developed', 'directed',
  'established', 'executed', 'generated', 'implemented', 'improved', 'increased',
  'initiated', 'launched', 'led', 'managed', 'optimized', 'organized', 'produced',
  'reduced', 'resolved', 'spearheaded', 'streamlined', 'supervised', 'transformed'
];

export const calculateATSScore = (resume: Resume): ATSScoreResult => {
  const recommendations: ATSRecommendation[] = [];
  let score = 0;
  const maxScore = 100;
  let pointsEarned = 0;

  // Contact Information (15 points)
  const contactPoints = 15;
  let contactEarned = 0;
  
  if (resume.personalInfo.name) contactEarned += 3;
  else recommendations.push({ category: 'error', message: 'Add your full name', section: 'Personal Info' });
  
  if (resume.personalInfo.email) contactEarned += 4;
  else recommendations.push({ category: 'error', message: 'Add your email address', section: 'Personal Info' });
  
  if (resume.personalInfo.phone) contactEarned += 4;
  else recommendations.push({ category: 'error', message: 'Add your phone number', section: 'Personal Info' });
  
  if (resume.personalInfo.location) contactEarned += 2;
  else recommendations.push({ category: 'warning', message: 'Consider adding your location', section: 'Personal Info' });
  
  if (resume.personalInfo.linkedin) contactEarned += 2;
  else recommendations.push({ category: 'warning', message: 'Add your LinkedIn profile', section: 'Personal Info' });

  pointsEarned += contactEarned;

  // Summary (10 points)
  const summaryPoints = 10;
  let summaryEarned = 0;
  
  if (resume.summary) {
    if (resume.summary.length >= 100) {
      summaryEarned = 10;
      recommendations.push({ category: 'success', message: 'Great professional summary!', section: 'Summary' });
    } else if (resume.summary.length >= 50) {
      summaryEarned = 6;
      recommendations.push({ category: 'warning', message: 'Consider expanding your summary to 100+ characters', section: 'Summary' });
    } else {
      summaryEarned = 3;
      recommendations.push({ category: 'warning', message: 'Your summary is too short', section: 'Summary' });
    }
  } else {
    recommendations.push({ category: 'warning', message: 'Add a professional summary', section: 'Summary' });
  }
  
  pointsEarned += summaryEarned;

  // Experience (30 points)
  const expPoints = 30;
  let expEarned = 0;
  
  if (resume.experience.length > 0) {
    expEarned += 10;
    
    // Check for achievements with action verbs
    let hasActionVerbs = false;
    let hasQuantifiableResults = false;
    
    resume.experience.forEach((exp) => {
      exp.achievements.forEach((achievement) => {
        const lowerAchievement = achievement.toLowerCase();
        if (actionVerbs.some(verb => lowerAchievement.startsWith(verb))) {
          hasActionVerbs = true;
        }
        if (/\d+%|\$\d+|\d+\+/.test(achievement)) {
          hasQuantifiableResults = true;
        }
      });
    });
    
    if (hasActionVerbs) {
      expEarned += 10;
      recommendations.push({ category: 'success', message: 'Good use of action verbs in achievements', section: 'Experience' });
    } else {
      recommendations.push({ category: 'warning', message: 'Start achievements with action verbs (e.g., "Achieved", "Led", "Developed")', section: 'Experience' });
    }
    
    if (hasQuantifiableResults) {
      expEarned += 10;
      recommendations.push({ category: 'success', message: 'Great quantifiable results in achievements', section: 'Experience' });
    } else {
      recommendations.push({ category: 'warning', message: 'Add quantifiable results (e.g., "Increased sales by 25%")', section: 'Experience' });
    }
    
    // Check achievements count
    const totalAchievements = resume.experience.reduce((sum, exp) => sum + exp.achievements.length, 0);
    if (totalAchievements < resume.experience.length * 2) {
      recommendations.push({ category: 'warning', message: 'Add more achievements to each position (at least 2-3)', section: 'Experience' });
    }
  } else {
    recommendations.push({ category: 'error', message: 'Add work experience', section: 'Experience' });
  }
  
  pointsEarned += expEarned;

  // Education (15 points)
  const eduPoints = 15;
  let eduEarned = 0;
  
  if (resume.education.length > 0) {
    eduEarned += 10;
    
    const hasDetails = resume.education.some(edu => edu.gpa || (edu.achievements && edu.achievements.length > 0));
    if (hasDetails) {
      eduEarned += 5;
      recommendations.push({ category: 'success', message: 'Good education details', section: 'Education' });
    } else {
      recommendations.push({ category: 'warning', message: 'Consider adding GPA or achievements', section: 'Education' });
    }
  } else {
    recommendations.push({ category: 'error', message: 'Add your education', section: 'Education' });
  }
  
  pointsEarned += eduEarned;

  // Skills (20 points)
  const skillsPoints = 20;
  let skillsEarned = 0;
  
  const totalSkills = resume.skills.technical.length + resume.skills.languages.length + resume.skills.softSkills.length;
  
  if (totalSkills > 0) {
    if (totalSkills >= 10) {
      skillsEarned = 20;
      recommendations.push({ category: 'success', message: 'Comprehensive skills section', section: 'Skills' });
    } else if (totalSkills >= 5) {
      skillsEarned = 14;
      recommendations.push({ category: 'warning', message: 'Consider adding more skills (aim for 10+)', section: 'Skills' });
    } else {
      skillsEarned = 8;
      recommendations.push({ category: 'warning', message: 'Add more relevant skills', section: 'Skills' });
    }
    
    if (resume.skills.technical.length === 0) {
      recommendations.push({ category: 'warning', message: 'Add technical skills', section: 'Skills' });
    }
  } else {
    recommendations.push({ category: 'error', message: 'Add your skills', section: 'Skills' });
  }
  
  pointsEarned += skillsEarned;

  // Projects (10 points - bonus)
  if (resume.projects.length > 0) {
    pointsEarned += 5;
    if (resume.projects.some(p => p.url)) {
      pointsEarned += 5;
      recommendations.push({ category: 'success', message: 'Projects with links add credibility', section: 'Projects' });
    }
  }

  score = Math.min(Math.round((pointsEarned / maxScore) * 100), 100);

  // Add overall recommendation based on score
  if (score >= 80) {
    recommendations.unshift({ category: 'success', message: 'Your resume is well-optimized for ATS systems!', section: 'Overall' });
  } else if (score >= 60) {
    recommendations.unshift({ category: 'warning', message: 'Your resume is good but could be improved', section: 'Overall' });
  } else {
    recommendations.unshift({ category: 'error', message: 'Your resume needs more work for ATS optimization', section: 'Overall' });
  }

  return { score, recommendations };
};
