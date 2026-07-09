const sizeMap = {
  xs: 'w-6 h-6 text-2xs',
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-12 h-12 text-base',
  xl: 'w-16 h-16 text-xl',
};

const colorMap = {
  primary: 'bg-primary/20 text-primary',
  accent: 'bg-accent/20 text-accent',
  success: 'bg-success/20 text-success',
  warning: 'bg-warning/20 text-warning',
  danger: 'bg-danger/20 text-danger',
  neutral: 'bg-border-light text-text-secondary',
};

const Avatar = ({ name = '', src, size = 'md', color = 'neutral', className = '', ring = false }) => {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <div
      className={`
        ${sizeMap[size]} ${colorMap[color]}
        rounded-full flex items-center justify-center font-semibold shrink-0
        ${ring ? 'ring-2 ring-primary/30 ring-offset-2 ring-offset-background' : ''}
        ${className}
      `}
    >
      {src ? (
        <img src={src} alt={name} className="w-full h-full rounded-full object-cover" />
      ) : (
        initials || '?'
      )}
    </div>
  );
};

export default Avatar;
