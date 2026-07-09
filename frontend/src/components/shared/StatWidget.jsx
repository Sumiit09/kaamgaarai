import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

const colorClasses = {
  primary: { bg: 'bg-primary/10', text: 'text-primary', glow: 'shadow-glow' },
  accent: { bg: 'bg-accent/10', text: 'text-accent', glow: 'shadow-glow-accent' },
  success: { bg: 'bg-success/10', text: 'text-success', glow: '' },
  warning: { bg: 'bg-warning/10', text: 'text-warning', glow: '' },
  danger: { bg: 'bg-danger/10', text: 'text-danger', glow: '' },
};

const StatWidget = ({ label, value, trend, icon, color = 'primary', index = 0 }) => {
  const c = colorClasses[color] || colorClasses.primary;
  const Icon = LucideIcons[icon] || LucideIcons.Activity;
  const isPositive = trend > 0;
  const isNeutral = trend === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      whileHover={{ scale: 1.02 }}
      className="card-surface p-5 relative overflow-hidden group"
    >
      <div className={`absolute -right-4 -top-4 w-24 h-24 ${c.bg} rounded-full blur-2xl opacity-50 group-hover:opacity-80 transition-opacity`} />
      <div className="relative flex items-start justify-between mb-3">
        <div className={`w-10 h-10 rounded-lg ${c.bg} ${c.text} flex items-center justify-center`}>
          <Icon className="w-5 h-5" />
        </div>
        {!isNeutral && (
          <div className={`flex items-center gap-1 text-xs font-medium ${isPositive ? 'text-success' : 'text-danger'}`}>
            {isPositive ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
            {Math.abs(trend)}%
          </div>
        )}
      </div>
      <div className="relative">
        <p className="text-2xl font-bold text-text-primary mb-1">{value}</p>
        <p className="text-sm text-text-secondary">{label}</p>
      </div>
    </motion.div>
  );
};

export default StatWidget;
