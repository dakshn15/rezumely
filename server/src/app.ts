import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { prisma } from './lib/prisma';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = [
    process.env.FRONTEND_URL,
    ...(process.env.NODE_ENV !== 'production'
        ? ['http://localhost:8080', 'http://localhost:5173', 'http://localhost:3000']
        : []),
].filter(Boolean) as string[];

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (curl, mobile apps, etc.)
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
}));
app.use(express.json());

import authRoutes from './routes/auth.routes';
import resumeRoutes from './routes/resume.routes';
import aiRoutes from './routes/ai.routes';
import jobRoutes from './routes/job.routes';
import pdfRoutes from './routes/pdf.routes';
import versionRoutes from './routes/version.routes';
import publicRoutes from './routes/public.routes';

app.use('/auth', authRoutes);
app.use('/resumes', resumeRoutes);
app.use('/ai', aiRoutes);
app.use('/jobs', jobRoutes);
app.use('/pdf', pdfRoutes);
app.use('/versions', versionRoutes);
app.use('/public', publicRoutes);

// Basic health check route
app.get('/', (req, res) => {
    res.send('Rezumely API is running');
});

const startServer = async () => {
    try {
        await prisma.$connect();
        console.log('Connected to Database');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        await prisma.$disconnect();
        process.exit(1);
    }
};

startServer();
