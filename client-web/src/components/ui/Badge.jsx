import React, { memo } from 'react';

export const Badge = memo(({
  variant = 'slate',
  dot = false,
  pulsing = false,
  icon,
  children,
  className = '',
  ...props
}) => {
  const baseStyle = "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold border transition-all duration-200 hover:shadow-xs cursor-default select-none";

  const variants = {
    sky: "bg-sky-50/75 text-sky-700 border-sky-200/60 shadow-2xs hover:bg-sky-100/70",
    emerald: "bg-emerald-50/75 text-emerald-700 border-emerald-200/60 shadow-2xs hover:bg-emerald-100/70",
    violet: "bg-violet-50/75 text-violet-700 border-violet-200/60 shadow-2xs hover:bg-violet-100/70",
    amber: "bg-amber-50/75 text-amber-700 border-amber-200/60 shadow-2xs hover:bg-amber-100/70",
    rose: "bg-rose-50/75 text-rose-700 border-rose-200/60 shadow-2xs hover:bg-rose-100/70",
    slate: "bg-slate-50/75 text-slate-700 border-slate-200/60 shadow-2xs hover:bg-slate-100/70"
  };

  const dotColors = {
    sky: "bg-sky-500",
    emerald: "bg-emerald-500",
    violet: "bg-violet-500",
    amber: "bg-amber-500",
    rose: "bg-rose-500",
    slate: "bg-slate-400"
  };

  return (
    <span
      className={`${baseStyle} ${variants[variant] || variants.slate} ${className}`}
      {...props}
    >
      {/* Icon rendering if provided */}
      {icon && <span className="inline-flex shrink-0">{icon}</span>}
      
      {/* Status dot rendering */}
      {dot && (
        <span className="relative flex h-1.5 w-1.5 shrink-0">
          {pulsing && (
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${dotColors[variant] || dotColors.slate}`}></span>
          )}
          <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${dotColors[variant] || dotColors.slate}`}></span>
        </span>
      )}
      
      <span className="leading-none">{children}</span>
    </span>
  );
});

Badge.displayName = 'Badge';
