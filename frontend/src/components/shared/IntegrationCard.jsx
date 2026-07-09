import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import Badge from '../ui/Badge';
import Button from '../ui/Button';

const IntegrationCard = ({ integration, index = 0 }) => {
  const Icon = LucideIcons[integration.icon] || LucideIcons.Plug;
  const isConnected = integration.status === 'connected';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ scale: 1.02 }}
      className="card-surface p-5 group"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 rounded-xl bg-surface border border-border-light flex items-center justify-center group-hover:border-primary/30 transition-colors">
          <Icon className="w-6 h-6 text-text-primary" />
        </div>
        {isConnected ? (
          <Badge variant="success" dot>Connected</Badge>
        ) : (
          <Badge variant="neutral">Available</Badge>
        )}
      </div>
      <h3 className="text-sm font-semibold text-text-primary mb-1">{integration.name}</h3>
      <p className="text-xs text-text-secondary mb-4">{integration.desc}</p>
      <Button
        variant={isConnected ? 'ghost' : 'secondary'}
        size="sm"
        className="w-full"
      >
        {isConnected ? 'Configure' : 'Connect'}
      </Button>
    </motion.div>
  );
};

export default IntegrationCard;
