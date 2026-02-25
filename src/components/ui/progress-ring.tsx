import React from 'react';
import { cn } from '@/lib/utils';

interface ProgressRingProps {
  progress: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
  showLabel?: boolean;
  color?: 'default' | 'success' | 'warning' | 'error';
}

export const ProgressRing: React.FC<ProgressRingProps> = ({
  progress,
  size = 60,
  strokeWidth = 4,
  className,
  showLabel = true,
  color = 'default',
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  const colorClasses = {
    default: 'stroke-accent',
    success: 'stroke-success',
    warning: 'stroke-warning',
    error: 'stroke-destructive',
  };

  const getColor = () => {
    if (color !== 'default') return colorClasses[color];
    if (progress >= 80) return colorClasses.success;
    if (progress >= 50) return colorClasses.warning;
    return colorClasses.error;
  };

  return (
    <div className={cn('relative inline-flex items-center', className)}>
      <svg
        className="progress-ring"
        width={size}
        height={size}
      >
        {/* Background circle */}
        <circle
          className="stroke-muted"
          strokeWidth={strokeWidth}
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        {/* Progress circle */}
        <circle
          className={cn('transition-all duration-500 ease-out', getColor())}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: offset,
          }}
        />
      </svg>
      {showLabel && (
        <span className="absolute text-xs font-semibold text-foreground start-1/2 -translate-x-1/2">
          {Math.round(progress)}%
        </span>
      )}
    </div>
  );
};
