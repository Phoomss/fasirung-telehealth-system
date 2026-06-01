import React, { forwardRef } from 'react';

export const FormInput = forwardRef(({
  label,
  error,
  id,
  className = '',
  ...props
}, ref) => {
  return (
    <div className="w-full mb-4">
      <label htmlFor={id} className="block text-sm font-semibold text-gray-700 mb-1 text-start">
        {label}
      </label>
      <input
        id={id}
        ref={ref}
        className={`w-full px-3 py-2 border rounded-[var(--radius-interactive)] text-gray-800 bg-white shadow-sm focus:outline-none focus:ring-1 focus:ring-[var(--color-brand-500)] focus:border-[var(--color-brand-500)] transition-all duration-150 ${
          error ? 'border-[var(--color-danger-500)] focus:ring-[var(--color-danger-500)] focus:border-[var(--color-danger-500)]' : 'border-gray-300'
        } ${className}`}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        {...props}
      />
      {error && (
        <p id={`${id}-error`} className="mt-1 text-xs font-medium text-[var(--color-danger-500)] text-start" role="alert">
          {error}
        </p>
      )}
    </div>
  );
});

FormInput.displayName = 'FormInput';
