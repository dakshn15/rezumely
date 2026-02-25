
import { Request, Response } from 'express';
import * as aiService from '../services/ai.service';
const pdf = require('pdf-parse');

export const analyzeMatch = async (req: Request, res: Response) => {
    try {
        const { resumeText, jobDescription } = req.body;

        if (!resumeText || !jobDescription) {
            return res.status(400).json({ message: 'Resume text and Job Description are required' });
        }

        const result = await aiService.analyzeJobMatch(resumeText, jobDescription);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Error analyzing job match', error: (error as Error).message });
    }
};

export const uploadResume = async (req: Request, res: Response) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        let text = "";

        if (req.file.mimetype === 'application/pdf') {
            try {
                const data = await pdf(req.file.buffer);
                text = data.text || '';
            } catch (pdfError) {
                console.error('PDF Parse Error:', pdfError);
                return res.status(400).json({
                    message: 'Could not read this PDF. Please ensure the PDF contains selectable text (not a scanned image) and try again.'
                });
            }
        } else {
            text = req.file.buffer.toString('utf-8');
        }

        // Guard: if text starts with %PDF, pdf-parse returned raw binary
        if (!text.trim() || text.trim().startsWith('%PDF')) {
            return res.status(400).json({
                message: 'Could not extract text from this PDF. The file may be image-based or encrypted. Try a different PDF.'
            });
        }

        const parsedData = await aiService.parseResume(text);
        res.status(200).json(parsedData);

    } catch (error) {
        console.error('Resume Upload Error:', error);
        res.status(500).json({ message: 'Failed to parse resume. Please try again.', error: (error as Error).message });
    }
};

