import { Loader2 } from 'lucide-react';

const Spinner = ({ size = 'md', className = '' }) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };
  return <Loader2 className={`animate-spin text-primary ${sizes[size]} ${className}`} />;
};

const Skeleton = ({ className = '', lines = 1 }) => {
  if (lines > 1) {
    return (
      <div className="space-y-2">
        {Array.from({ length: lines }).map((_, i) => (
          <div key={i} className={`skeleton h-4 ${className}`} />
        ))}
      </div>
    );
  }
  return <div className={`skeleton ${className}`} />;
};

export { Spinner, Skeleton };
export default Spinner;
