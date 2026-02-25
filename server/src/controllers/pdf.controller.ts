import { Request, Response } from 'express';
import { generatePDF } from '../services/pdf.service';

export const downloadPDF = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;
        const authHeader = req.headers['authorization'];

        // Extract token from "Bearer <token>"
        let token = '';
        if (typeof authHeader === 'string') {
            token = authHeader.split(' ')[1] || '';
        }

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const pdfBuffer = await generatePDF(id, token);

        res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': `attachment; filename="resume-${id}.pdf"`,
            'Content-Length': pdfBuffer.length,
        });

        res.send(pdfBuffer);

    } catch (error) {
        console.error("PDF Download Error:", error);
        res.status(500).json({ message: 'Failed to generate PDF', error: (error as Error).message });
    }
};
