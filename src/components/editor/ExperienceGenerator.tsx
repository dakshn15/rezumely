import React, { useState } from 'react';
import { Sparkles, Loader2, Wand2, Plus } from 'lucide-react';
import { CustomButton } from '@/components/ui/custom-button';
import { generateExperiencePoints, improveContent } from '@/services/aiService';
import { Card, CardContent } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';

interface ExperienceGeneratorProps {
    role: string;
    onAddPoints: (points: string[]) => void;
}

export const ExperienceGenerator: React.FC<ExperienceGeneratorProps> = ({ role, onAddPoints }) => {
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedPoints, setGeneratedPoints] = useState<string[]>([]);
    const [error, setError] = useState<string>('');

    const handleGenerate = async () => {
        if (!role) {
            setError('Please enter a Position/Role first.');
            return;
        }

        setIsGenerating(true);
        setError('');

        try {
            const points = await generateExperiencePoints(role);
            setGeneratedPoints(points);
        } catch (err) {
            setError('Failed to generate points. Please try again.');
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="space-y-3 mt-2">
            <div className="flex items-center justify-between">
                <CustomButton
                    variant="outline"
                    size="sm"
                    onClick={handleGenerate}
                    disabled={isGenerating}
                    className="text-xs text-purple-600 hover:text-purple-700 hover:bg-purple-50 h-8"
                >
                    {isGenerating ? (
                        <>
                            <Loader2 className="h-3 w-3 animate-spin mr-2" />
                            Generating ideas...
                        </>
                    ) : (
                        <>
                            <Sparkles className="h-3 w-3 mr-2" />
                            Generate Achievements
                        </>
                    )}
                </CustomButton>
            </div>

            {error && (
                <p className="text-xs text-destructive px-2">{error}</p>
            )}

            <AnimatePresence>
                {generatedPoints.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="grid gap-2"
                    >
                        <p className="text-xs text-muted-foreground px-2">Click to add:</p>
                        {generatedPoints.map((point, i) => (
                            <div
                                key={i}
                                className="flex items-center justify-between p-2 rounded-md border bg-card hover:bg-accent/50 cursor-pointer text-sm group"
                                onClick={() => {
                                    onAddPoints([point]);
                                    setGeneratedPoints(prev => prev.filter((_, idx) => idx !== i));
                                }}
                            >
                                <span>{point}</span>
                                <Plus className="h-3 w-3 text-muted-foreground group-hover:text-primary" />
                            </div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
