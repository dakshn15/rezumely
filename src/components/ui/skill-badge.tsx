import React from 'react';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';
import { motion } from 'framer-motion';

interface SkillBadgeProps {
  skill: string;
  onRemove?: () => void;
  variant?: 'default' | 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md';
}

export const SkillBadge: React.FC<SkillBadgeProps> = ({
  skill,
  onRemove,
  variant = 'default',
  size = 'md',
}) => {
  const variants = {
    default: 'bg-muted text-muted-foreground',
    primary: 'bg-primary/10 text-primary',
    secondary: 'bg-accent/10 text-accent',
    outline: 'border border-border bg-transparent text-foreground',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
  };

  return (
    <motion.span
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full font-medium transition-colors',
        variants[variant],
        sizes[size],
        onRemove && 'pr-1.5'
      )}
    >
      {skill}
      {onRemove && (
        <button
          onClick={onRemove}
          className="p-0.5 rounded-full hover:bg-foreground/10 transition-colors"
          type="button"
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </motion.span>
  );
};
