import React, { memo } from 'react';

export const Button = memo(({
  variant = 'primary',
  isLoading,
  leftIcon,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyle = "inline-flex items-center justify-center font-medium rounded-[var(--radius-interactive)] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 px-4 py-2 text-sm select-none cursor-pointer";
  
  const variants = {
    primary: "bg-[var(--color-brand-500)] hover:bg-[var(--color-brand-600)] text-white focus:ring-[var(--color-brand-500)] shadow-sm",
    secondary: "bg-gray-100 hover:bg-gray-200 text-gray-700 focus:ring-gray-300",
    danger: "bg-[var(--color-danger-500)] hover:bg-[var(--color-danger-600)] text-white focus:ring-[var(--color-danger-500)] shadow-sm",
    ghost: "bg-transparent hover:bg-gray-50 text-gray-600 focus:ring-gray-150"
  };

  return (
    <button
      disabled={disabled || isLoading}
      className={`${baseStyle} ${variants[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      aria-busy={isLoading}
      {...props}
    >
      {isLoading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      )}
      {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
      {children}
    </button>
  );
});

Button.displayName = 'Button';
