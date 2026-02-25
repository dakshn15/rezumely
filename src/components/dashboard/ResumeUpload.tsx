import React, { useState, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CustomButton } from '@/components/ui/custom-button';
import { Upload, FileText, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import api from '@/services/api';
import { useResumeStore } from '@/store/resumeStore';
import { useNavigate } from 'react-router-dom';
import { nanoid } from 'nanoid';
import { defaultResume } from '@/data/resumeModel';

export const ResumeUpload: React.FC = () => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { setCurrentResume } = useResumeStore();
    const navigate = useNavigate();

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Basic validation
        if (file.type !== 'application/pdf') {
            setError('Only PDF files are supported currently.');
            return;
        }

        setIsUploading(true);
        setError(null);

        const formData = new FormData();
        formData.append('resume', file);

        try {
            const response = await api.post('/jobs/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            const parsedData = response.data;

            // Transform parsed data into our Resume model structure if needed
            // The AI service tries to match it, but we should ensure ID and defaults
            const newResume = {
                ...defaultResume,
                ...parsedData,
                personalInfo: {
                    ...defaultResume.personalInfo,
                    ...(parsedData.personalInfo || {}),
                },
                skills: {
                    ...defaultResume.skills,
                    ...(parsedData.skills || {}),
                },
                experience: parsedData.experience || [],
                education: parsedData.education || [],
                projects: parsedData.projects || [],
                additional: {
                    ...defaultResume.additional,
                    ...(parsedData.additional || {}),
                },
                id: nanoid(),
                createdAt: new Date(),
                updatedAt: new Date(),
                title: parsedData.personalInfo?.name ? `${parsedData.personalInfo.name}'s Resume` : 'Imported Resume',
            };

            setCurrentResume(newResume);
            navigate('/editor');

        } catch (err) {
            console.error(err);
            setError('Failed to parse resume. Please try again.');
        } finally {
            setIsUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    return (
        <Card className="border-dashed border-2 hover:border-primary/50 transition-colors">
            <CardContent className="flex flex-col items-center justify-center p-6 text-center space-y-4">
                <div className="p-4 bg-primary/10 rounded-full">
                    {isUploading ? (
                        <Loader2 className="h-8 w-8 text-primary animate-spin" />
                    ) : (
                        <Upload className="h-8 w-8 text-primary" />
                    )}
                </div>
                <div>
                    <h3 className="font-semibold text-lg">Import Resume</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                        Upload your existing PDF resume to auto-fill the builder
                    </p>
                </div>

                {error && (
                    <div className="flex items-center gap-2 text-destructive text-sm bg-destructive/10 px-3 py-2 rounded-md">
                        <AlertCircle className="h-4 w-4" />
                        {error}
                    </div>
                )}

                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept=".pdf"
                    className="hidden"
                />

                <CustomButton
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                    variant="outline"
                >
                    {isUploading ? 'Parsing...' : 'Select PDF'}
                </CustomButton>
            </CardContent>
        </Card>
    );
};
