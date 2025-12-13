import React from 'react';
import { cn } from '@/lib/utils';
import { GripVertical, ChevronDown, ChevronUp, Trash2, Edit2, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SectionCardProps {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  isCollapsible?: boolean;
  defaultOpen?: boolean;
  onAdd?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  dragHandleProps?: React.HTMLAttributes<HTMLDivElement>;
  className?: string;
  badge?: string | number;
  completed?: boolean;
}

export const SectionCard: React.FC<SectionCardProps> = ({
  title,
  icon,
  children,
  isCollapsible = true,
  defaultOpen = true,
  onAdd,
  onEdit,
  onDelete,
  dragHandleProps,
  className,
  badge,
  completed,
}) => {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);

  return (
    <div className={cn('section-container', className)}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          {dragHandleProps && (
            <div {...dragHandleProps} className="drag-handle p-1 -ml-2 rounded hover:bg-muted">
              <GripVertical className="h-4 w-4" />
            </div>
          )}
          {icon && <div className="text-accent">{icon}</div>}
          <h3 className="font-semibold text-foreground">{title}</h3>
          {badge !== undefined && (
            <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-accent/10 text-accent">
              {badge}
            </span>
          )}
          {completed && (
            <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-success/10 text-success">
              Complete
            </span>
          )}
        </div>
        <div className="flex items-center gap-1">
          {onAdd && (
            <button
              onClick={onAdd}
              className="p-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
              title="Add"
            >
              <Plus className="h-4 w-4" />
            </button>
          )}
          {onEdit && (
            <button
              onClick={onEdit}
              className="p-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
              title="Edit"
            >
              <Edit2 className="h-4 w-4" />
            </button>
          )}
          {onDelete && (
            <button
              onClick={onDelete}
              className="p-1.5 rounded-md hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
              title="Delete"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          )}
          {isCollapsible && (
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
              title={isOpen ? 'Collapse' : 'Expand'}
            >
              {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>
          )}
        </div>
      </div>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
