import * as React from "react";
import { cn } from "@/lib/utils";
import { AlertCircle } from "lucide-react";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
  showCount?: boolean;
  maxLength?: number;
}

const CustomTextarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, hint, showCount, maxLength, value, ...props }, ref) => {
    const id = React.useId();
    const charCount = typeof value === 'string' ? value.length : 0;

    return (
      <div className="w-full space-y-1.5">
        <div className="flex items-center justify-between">
          {label && (
            <label htmlFor={id} className="text-sm font-medium text-foreground">
              {label}
            </label>
          )}
          {showCount && maxLength && (
            <span className={cn(
              "text-xs",
              charCount > maxLength ? "text-destructive" : "text-muted-foreground"
            )}>
              {charCount}/{maxLength}
            </span>
          )}
        </div>
        <div className="relative">
          <textarea
            id={id}
            className={cn(
              "flex min-h-[100px] w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background transition-all duration-200",
              "placeholder:text-muted-foreground",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:border-accent",
              "disabled:cursor-not-allowed disabled:opacity-50",
              "resize-y",
              error && "border-destructive focus-visible:ring-destructive/50",
              className
            )}
            ref={ref}
            value={value}
            maxLength={maxLength}
            {...props}
          />
          {error && (
            <div className="absolute right-3 top-3 text-destructive">
              <AlertCircle className="h-4 w-4" />
            </div>
          )}
        </div>
        {(error || hint) && (
          <p className={cn("text-xs", error ? "text-destructive" : "text-muted-foreground")}>
            {error || hint}
          </p>
        )}
      </div>
    );
  }
);
CustomTextarea.displayName = "CustomTextarea";

export { CustomTextarea };
