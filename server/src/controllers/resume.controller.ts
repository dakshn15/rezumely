import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';

// Create a new resume
export const createResume = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user?.userId as string;
        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const { title, resumeJson } = req.body;

        const resume = await prisma.resume.create({
            data: {
                userId,
                title: title || 'My Resume',
                resumeJson: typeof resumeJson === 'string' ? resumeJson : JSON.stringify(resumeJson || {}),
            },
        });

        res.status(201).json({
            ...resume,
            resumeJson: typeof resume.resumeJson === 'string' ? JSON.parse(resume.resumeJson) : resume.resumeJson,
        });
    } catch (error) {
        console.error('Error creating resume:', error);
        res.status(500).json({ message: 'Error creating resume', error });
    }
};

// Helper to parse resumeJson from DB
const parseResume = (resume: any) => {
    if (!resume) return resume;
    return {
        ...resume,
        resumeJson: typeof resume.resumeJson === 'string' ? JSON.parse(resume.resumeJson) : resume.resumeJson,
    };
};

// Get all resumes for a user
export const getResumes = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user?.userId as string;
        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const resumes = await prisma.resume.findMany({
            where: { userId },
            orderBy: { updatedAt: 'desc' },
        });

        res.status(200).json(resumes.map(parseResume));
    } catch (error) {
        console.error('Error fetching resumes:', error);
        res.status(500).json({ message: 'Error fetching resumes', error });
    }
};

// Get a single resume by ID
export const getResumeById = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user?.userId as string;
        const id = req.params.id as string;

        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const resume = await prisma.resume.findFirst({
            where: { id, userId },
        });

        if (!resume) {
            return res.status(404).json({ message: 'Resume not found' });
        }

        res.status(200).json(parseResume(resume));
    } catch (error) {
        console.error('Error fetching resume:', error);
        res.status(500).json({ message: 'Error fetching resume', error });
    }
};

// Update a resume
export const updateResume = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user?.userId as string;
        const id = req.params.id as string;
        const { title, resumeJson } = req.body;

        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const existingResume = await prisma.resume.findFirst({
            where: { id, userId },
        });

        if (!existingResume) {
            return res.status(404).json({ message: 'Resume not found' });
        }

        const updatedResume = await prisma.resume.update({
            where: { id },
            data: {
                title,
                resumeJson: typeof resumeJson === 'string' ? resumeJson : JSON.stringify(resumeJson),
            },
        });

        res.status(200).json(parseResume(updatedResume));
    } catch (error) {
        console.error('Error updating resume:', error);
        res.status(500).json({ message: 'Error updating resume', error });
    }
};

// Delete a resume
export const deleteResume = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user?.userId as string;
        const id = req.params.id as string;

        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const existingResume = await prisma.resume.findFirst({
            where: { id, userId },
        });

        if (!existingResume) {
            return res.status(404).json({ message: 'Resume not found' });
        }

        await prisma.resume.delete({
            where: { id },
        });

        res.status(200).json({ message: 'Resume deleted successfully' });
    } catch (error) {
        console.error('Error deleting resume:', error);
        res.status(500).json({ message: 'Error deleting resume', error });
    }
};

// Toggle Public Status
export const togglePublic = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user?.userId as string;
        const id = req.params.id as string;
        const { isPublic } = req.body;

        if (!userId) return res.status(401).json({ message: 'Unauthorized' });

        let updateData: any = { isPublic };

        const currentResume = await prisma.resume.findUnique({ where: { id } });
        if (!currentResume) return res.status(404).json({ message: 'Resume not found' });

        if (isPublic && !currentResume.slug) {
            const { nanoid } = await import('nanoid');
            updateData.slug = nanoid(10);
        }

        const resume = await prisma.resume.update({
            where: { id, userId },
            data: updateData,
        });

        res.json(parseResume(resume));
    } catch (error) {
        console.error('Error toggling public status:', error);
        res.status(500).json({ message: 'Error updating public status', error });
    }
};

// Get Public Resume by Slug or ID
export const getPublicResume = async (req: Request, res: Response) => {
    try {
        const idOrSlug = req.params.idOrSlug as string;

        let resume = await prisma.resume.findUnique({
            where: { slug: idOrSlug },
        });

        if (!resume) {
            try {
                resume = await prisma.resume.findUnique({
                    where: { id: idOrSlug },
                });
            } catch (e) {
                // Ignore error if idOrSlug is not a valid UUID
            }
        }

        if (!resume || !resume.isPublic) {
            return res.status(404).json({ message: 'Resume not found or private' });
        }

        res.json(parseResume(resume));
    } catch (error) {
        console.error('Error fetching public resume:', error);
        res.status(500).json({ message: 'Error fetching resume', error });
    }
};
