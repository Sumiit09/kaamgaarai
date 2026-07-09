import { motion } from 'framer-motion';

const Logo = ({ size = 'md', showText = true, className = '' }) => {
  const sizes = {
    sm: { box: 'w-7 h-7', text: 'text-base', spark: 'r=1.5', cx: '22', cy: '7' },
    md: { box: 'w-9 h-9', text: 'text-lg', spark: 'r=2', cx: '24', cy: '8' },
    lg: { box: 'w-12 h-12', text: 'text-2xl', spark: 'r=2.5', cx: '26', cy: '9' },
  };
  const s = sizes[size];

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <motion.div
        whileHover={{ rotate: 5, scale: 1.05 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className={`${s.box} relative shrink-0`}
      >
        <svg viewBox="0 0 32 32" className="w-full h-full">
          <defs>
            <linearGradient id="logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2563EB" />
              <stop offset="100%" stopColor="#1D4ED8" />
            </linearGradient>
          </defs>
          <rect width="32" height="32" rx="8" fill="url(#logo-grad)" />
          <path
            d="M10 24V8h2.5v6.5L19 8h3l-7 7.5L22.5 24h-3l-5-7-2 2.2V24H10z"
            fill="#fff"
          />
          <circle cx={s.cx} cy={s.cy} r={s.spark.r} fill="#06B6D4" />
          <circle cx={s.cx} cy={s.cy} r={s.spark.r} fill="#06B6D4" opacity="0.4">
            <animate attributeName="r" values={`${s.spark.r};${parseFloat(s.spark.r) + 1.5};${s.spark.r}`} dur="2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.4;0;0.4" dur="2s" repeatCount="indefinite" />
          </circle>
        </svg>
      </motion.div>
      {showText && (
        <span className={`font-bold ${s.text} text-text-primary tracking-tight`}>
          Kaamgaar<span className="text-primary">AI</span>
        </span>
      )}
    </div>
  );
};

export default Logo;
