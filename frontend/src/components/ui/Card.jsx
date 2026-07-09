import { motion } from 'framer-motion';

const Card = ({ children, className = '', hover = false, onClick, ...props }) => {
  return (
    <motion.div
      whileHover={hover ? { scale: 1.01, boxShadow: '0 10px 30px rgba(0,0,0,0.4), 0 0 20px rgba(37, 99, 235, 0.1)' } : {}}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      onClick={onClick}
      className={`
        bg-card border border-border-light rounded-xl
        ${hover ? 'cursor-pointer' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </motion.div>
  );
};

const CardHeader = ({ children, className = '' }) => (
  <div className={`p-5 border-b border-border-light ${className}`}>
    {children}
  </div>
);

const CardContent = ({ children, className = '' }) => (
  <div className={`p-5 ${className}`}>
    {children}
  </div>
);

const CardTitle = ({ children, className = '' }) => (
  <h3 className={`text-base font-semibold text-text-primary ${className}`}>
    {children}
  </h3>
);

const CardDescription = ({ children, className = '' }) => (
  <p className={`text-sm text-text-secondary mt-1 ${className}`}>
    {children}
  </p>
);

export { Card, CardHeader, CardContent, CardTitle, CardDescription };
export default Card;
