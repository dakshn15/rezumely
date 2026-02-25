import { Request, Response } from 'express';
import * as aiService from '../services/ai.service';

export const generateSummary = async (req: Request, res: Response) => {
    try {
        const { jobTitle, experience, skills } = req.body;

        if (!jobTitle) {
            return res.status(400).json({ message: 'Job title is required' });
        }

        const summary = await aiService.generateSummary(jobTitle, experience || 0, skills || []);
        res.status(200).json({ summary });
    } catch (error) {
        res.status(500).json({ message: 'Error generating summary', error: (error as Error).message });
    }
};

export const improveContent = async (req: Request, res: Response) => {
    try {
        const { content } = req.body;

        if (!content) {
            return res.status(400).json({ message: 'Content is required' });
        }

        const improved = await aiService.improveExperience(content);
        res.status(200).json({ improved });
    } catch (error) {
        res.status(500).json({ message: 'Error improving content', error: (error as Error).message });
    }
};


export const generatePoints = async (req: Request, res: Response) => {
    try {
        const { role } = req.body;
        if (!role) return res.status(400).json({ message: 'Role is required' });

        const points = await aiService.generateExperiencePoints(role);
        res.status(200).json({ points });
    } catch (error) {
        res.status(500).json({ message: 'Error generating points', error: (error as Error).message });
    }
};

export const atsCheck = async (req: Request, res: Response) => {
    try {
        const { resumeData } = req.body; // Expecting the full resume object or text representation

        // Simple conversion of resume object to text for analysis
        let text = "";
        if (typeof resumeData === 'string') {
            text = resumeData;
        } else if (resumeData) {
            // Basic concatenation of fields
            text += `${resumeData.personalInfo?.name || ''} \n`;
            text += `${resumeData.summary || ''} \n`;
            (resumeData.experience || []).forEach((exp: any) => {
                text += `${exp.position} at ${exp.company} ${exp.description} ${exp.achievements?.join(' ')} \n`;
            });
            (resumeData.skills?.technical || []).forEach((s: string) => text += `${s}, `);
        }

        const result = await aiService.calculateATSScore(text);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Error calculating ATS score', error: (error as Error).message });
    }
};
export const generateCoverLetter = async (req: Request, res: Response) => {
    try {
        const { resumeText, jobDescription } = req.body;

        if (!jobDescription) {
            return res.status(400).json({ message: 'Job description is required' });
        }

        const content = await aiService.generateCoverLetter(resumeText || "Resume content placeholder", jobDescription);

        res.json({ content });

    } catch (error) {
        console.error("Cover Letter Error:", error);
        res.status(500).json({ message: 'Failed to generate cover letter' });
    }
};
