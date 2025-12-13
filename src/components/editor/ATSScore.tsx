import React from 'react';
import { useResumeStore } from '@/store/resumeStore';
import { calculateATSScore, ATSRecommendation } from '@/utils/atsScore';
import { ProgressRing } from '@/components/ui/progress-ring';
import { CheckCircle, AlertTriangle, XCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export const ATSScore: React.FC = () => {
  const { currentResume } = useResumeStore();
  const [isExpanded, setIsExpanded] = React.useState(false);
  
  const { score, recommendations } = React.useMemo(
    () => calculateATSScore(currentResume),
    [currentResume]
  );

  const getScoreColor = () => {
    if (score >= 80) return 'success';
    if (score >= 50) return 'warning';
    return 'error';
  };

  const getScoreLabel = () => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Fair';
    return 'Needs Work';
  };

  const iconMap: Record<ATSRecommendation['category'], React.ReactNode> = {
    success: <CheckCircle className="h-4 w-4 text-success" />,
    warning: <AlertTriangle className="h-4 w-4 text-warning" />,
    error: <XCircle className="h-4 w-4 text-destructive" />,
  };

  return (
    <div className="bg-card rounded-xl border border-border p-4 shadow-soft">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between"
      >
        <div className="flex items-center gap-4">
          <ProgressRing progress={score} size={48} color={getScoreColor()} />
          <div className="text-left">
            <h3 className="font-semibold text-foreground">ATS Score</h3>
            <p className={cn(
              'text-sm font-medium',
              score >= 80 ? 'text-success' : score >= 50 ? 'text-warning' : 'text-destructive'
            )}>
              {getScoreLabel()}
            </p>
          </div>
        </div>
        {isExpanded ? (
          <ChevronUp className="h-5 w-5 text-muted-foreground" />
        ) : (
          <ChevronDown className="h-5 w-5 text-muted-foreground" />
        )}
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="mt-4 pt-4 border-t border-border space-y-2">
              {recommendations.map((rec, index) => (
                <div
                  key={index}
                  className={cn(
                    'flex items-start gap-2 p-2 rounded-lg text-sm',
                    rec.category === 'success' && 'bg-success/5',
                    rec.category === 'warning' && 'bg-warning/5',
                    rec.category === 'error' && 'bg-destructive/5'
                  )}
                >
                  <div className="mt-0.5">{iconMap[rec.category]}</div>
                  <div>
                    <span className="text-foreground">{rec.message}</span>
                    <span className="text-muted-foreground text-xs ml-2">({rec.section})</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
