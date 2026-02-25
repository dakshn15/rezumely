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
  'reduced', 'resolved', 'spearheaded', 'streamlined', 'supervised', 'transformed',
  'engineered', 'programmed', 'architected', 'deployed', 'maintained', 'scaled'
];

const weakWords = [
  'responsible for', 'duties included', 'helped', 'worked on', 'assisted', 'attempted'
];

const buzzwords = [
  'synergy', 'game-changer', 'rockstar', 'guru', 'ninja', 'thought leader'
];

export const calculateATSScore = (resume: Resume): ATSScoreResult => {
  const recommendations: ATSRecommendation[] = [];
  let score = 0;

  // Scoring Criteria Weights
  const weights = {
    contact: 10,
    summary: 15,
    experience: 35,
    education: 15,
    skills: 15,
    projects: 10
  };

  // 1. Contact Information Score (Max 10)
  let contactScore = 0;
  if (resume.personalInfo.name) contactScore += 2;
  else recommendations.push({ category: 'error', message: 'Missing full name', section: 'Personal Info' });

  if (resume.personalInfo.email) contactScore += 3;
  else recommendations.push({ category: 'error', message: 'Missing email address', section: 'Personal Info' });

  if (resume.personalInfo.phone) contactScore += 3;
  else recommendations.push({ category: 'error', message: 'Missing phone number', section: 'Personal Info' });

  if (resume.personalInfo.linkedin) contactScore += 1;
  else recommendations.push({ category: 'warning', message: 'Add LinkedIn profile for better visibility', section: 'Personal Info' });

  if (resume.personalInfo.location) contactScore += 1;

  score += Math.min(contactScore, weights.contact);

  // 2. Summary Score (Max 15)
  let summaryScore = 0;
  if (resume.summary) {
    const summaryLength = resume.summary.length;
    if (summaryLength > 500) {
      summaryScore += 15;
      recommendations.push({ category: 'success', message: 'Strong summary length', section: 'Summary' });
    } else if (summaryLength > 200) {
      summaryScore += 10;
      recommendations.push({ category: 'warning', message: 'Consider expanding summary to highlight key achievements', section: 'Summary' });
    } else {
      summaryScore += 5;
      recommendations.push({ category: 'error', message: 'Summary is too short. Aim for 3-4 sentences.', section: 'Summary' });
    }

    // Check for buzzwords to avoid
    const foundBuzzwords = buzzwords.filter(word => resume.summary.toLowerCase().includes(word));
    if (foundBuzzwords.length > 0) {
      recommendations.push({ category: 'warning', message: `Avoid clichés like: ${foundBuzzwords.join(', ')}`, section: 'Summary' });
    }
  } else {
    recommendations.push({ category: 'error', message: 'Missing professional summary', section: 'Summary' });
  }
  score += Math.min(summaryScore, weights.summary);

  // 3. Experience Score (Max 35)
  let expScore = 0;
  if (resume.experience.length > 0) {
    expScore += 10; // Base points for having experience

    // Achievement Analysis
    let totalAchievements = 0;
    let actionVerbCount = 0;
    let metricCount = 0;
    let weakWordCount = 0;

    resume.experience.forEach(exp => {
      totalAchievements += exp.achievements.length;

      exp.achievements.forEach(ach => {
        const lowerAch = ach.toLowerCase();

        // Check for Action Verbs
        if (actionVerbs.some(verb => lowerAch.startsWith(verb) || lowerAch.includes(` ${verb} `))) {
          actionVerbCount++;
        }

        // Check for weak words
        if (weakWords.some(word => lowerAch.includes(word))) {
          weakWordCount++;
        }

        // Check for Metrics (%, $, numbers)
        if (/\d+%|\$\d+|\b\d+\b/.test(ach)) {
          metricCount++;
        }
      });
    });

    // Detailed Recommendations
    if (actionVerbCount >= totalAchievements * 0.7 && totalAchievements > 0) {
      expScore += 10;
      recommendations.push({ category: 'success', message: 'Excellent use of action verbs!', section: 'Experience' });
    } else {
      expScore += 5;
      recommendations.push({ category: 'warning', message: 'Start bullet points with strong action verbs (e.g., "Led", "Developed")', section: 'Experience' });
    }

    if (metricCount >= 3) {
      expScore += 15;
      recommendations.push({ category: 'success', message: 'Great use of quantifiable results!', section: 'Experience' });
    } else {
      expScore += 5;
      recommendations.push({ category: 'warning', message: 'Add more numbers/metrics (e.g., "Increased sales by 20%")', section: 'Experience' });
    }

    if (weakWordCount > 0) {
      recommendations.push({ category: 'warning', message: `Replace passive phrases like "Responsible for" with action verbs`, section: 'Experience' });
      expScore -= 2; // Penalty
    }

  } else {
    recommendations.push({ category: 'error', message: 'Missing work experience section', section: 'Experience' });
  }
  score += Math.max(0, Math.min(expScore, weights.experience)); // Ensure non-negative

  // 4. Education Score (Max 15)
  let eduScore = 0;
  if (resume.education.length > 0) {
    eduScore += 15;
    if (resume.education.some(e => !e.startDate || !e.endDate)) {
      recommendations.push({ category: 'warning', message: 'Ensure all education entries have dates', section: 'Education' });
      eduScore -= 5;
    }
  } else {
    recommendations.push({ category: 'error', message: 'Missing education section', section: 'Education' });
  }
  score += Math.min(eduScore, weights.education);

  // 5. Skills (Max 15)
  let skillScore = 0;
  const totalSkills = resume.skills.technical.length + resume.skills.softSkills.length + resume.skills.languages.length;

  if (totalSkills >= 8) {
    skillScore += 15;
    recommendations.push({ category: 'success', message: 'Good skills coverage', section: 'Skills' });
  } else if (totalSkills > 0) {
    skillScore += 8;
    recommendations.push({ category: 'warning', message: 'Add more relevant skills (aim for 8+)', section: 'Skills' });
  } else {
    recommendations.push({ category: 'error', message: 'Missing skills section', section: 'Skills' });
  }

  // Check for specific hard skills depending on job title (Basic logic for now)
  // Ideally this compares against job description
  if (resume.skills.technical.length === 0) {
    recommendations.push({ category: 'warning', message: 'Include technical/hard skills relevant to your industry', section: 'Skills' });
    skillScore -= 2;
  }
  if (resume.skills.softSkills.length > 5) {
    recommendations.push({ category: 'warning', message: 'Limit soft skills. Focus on hard skills.', section: 'Skills' });
    skillScore -= 2;
  }

  score += Math.max(0, Math.min(skillScore, weights.skills));

  // 6. Projects (Max 10)
  let projScore = 0;
  if (resume.projects.length > 0) {
    projScore += 10;
    if (resume.projects.some(p => p.url)) {
      recommendations.push({ category: 'success', message: 'Portfolio links included', section: 'Projects' });
    }
  } else {
    // Projects are optional but good
    recommendations.push({ category: 'warning', message: 'Adding projects helps demonstrate skills', section: 'Projects' });
    projScore += 5; // Give some points even if empty as it's optional, but less
  }
  score += Math.min(projScore, weights.projects);

  // Normalize final score
  score = Math.min(Math.round(score), 100);

  return { score, recommendations };
};
