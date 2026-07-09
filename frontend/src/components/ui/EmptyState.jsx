import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import Button from '../ui/Button';

const EmptyState = ({ icon = 'Inbox', title, description, actionLabel, onAction }) => {
  const Icon = LucideIcons[icon] || LucideIcons.Inbox;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 px-4 text-center"
    >
      <div className="w-16 h-16 rounded-2xl bg-surface border border-border-light flex items-center justify-center mb-4">
        <Icon className="w-8 h-8 text-text-tertiary" />
      </div>
      <h3 className="text-lg font-semibold text-text-primary mb-1">{title}</h3>
      <p className="text-sm text-text-secondary max-w-sm mb-6">{description}</p>
      {actionLabel && (
        <Button onClick={onAction} variant="primary" size="sm">
          {actionLabel}
        </Button>
      )}
    </motion.div>
  );
};

export default EmptyState;
