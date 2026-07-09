import { forwardRef } from 'react';

const baseInput = `
  w-full bg-surface border border-border-light rounded-lg
  px-4 py-2.5 text-sm text-text-primary placeholder:text-text-tertiary
  focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30
  transition-colors duration-200
`;

const Input = forwardRef(({ label, error, hint, icon: Icon, className = '', ...props }, ref) => (
  <div className="w-full">
    {label && (
      <label className="block text-sm font-medium text-text-secondary mb-1.5">
        {label}
      </label>
    )}
    <div className="relative">
      {Icon && (
        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
      )}
      <input
        ref={ref}
        className={`
          ${baseInput}
          ${Icon ? 'pl-10' : ''}
          ${error ? 'border-danger focus:border-danger focus:ring-danger/30' : ''}
          ${className}
        `}
        {...props}
      />
    </div>
    {error && <p className="mt-1 text-xs text-danger">{error}</p>}
    {hint && !error && <p className="mt-1 text-xs text-text-tertiary">{hint}</p>}
  </div>
));

Input.displayName = 'Input';

const Textarea = forwardRef(({ label, error, className = '', rows = 4, ...props }, ref) => (
  <div className="w-full">
    {label && (
      <label className="block text-sm font-medium text-text-secondary mb-1.5">
        {label}
      </label>
    )}
    <textarea
      ref={ref}
      rows={rows}
      className={`${baseInput} resize-none ${error ? 'border-danger' : ''} ${className}`}
      {...props}
    />
    {error && <p className="mt-1 text-xs text-danger">{error}</p>}
  </div>
));

Textarea.displayName = 'Textarea';

const Select = forwardRef(({ label, error, children, className = '', ...props }, ref) => (
  <div className="w-full">
    {label && (
      <label className="block text-sm font-medium text-text-secondary mb-1.5">
        {label}
      </label>
    )}
    <select
      ref={ref}
      className={`${baseInput} cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2394A3B8%22%20stroke-width%3D%222%22%3E%3Cpath%20d%3D%22M6%209l6%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-[length:12px] bg-[right_1rem_center] bg-no-repeat pr-10 ${className}`}
      {...props}
    >
      {children}
    </select>
    {error && <p className="mt-1 text-xs text-danger">{error}</p>}
  </div>
));

Select.displayName = 'Select';

export { Input, Textarea, Select };
export default Input;
