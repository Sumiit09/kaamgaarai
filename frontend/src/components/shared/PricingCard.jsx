import { motion } from 'framer-motion';
import { Check, Star } from 'lucide-react';
import Button from '../ui/Button';

const PricingCard = ({ plan, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
      className={`
        relative rounded-2xl p-6 flex flex-col
        ${plan.popular
          ? 'gradient-border shadow-float'
          : 'bg-card border border-border-light'}
      `}
    >
      {plan.popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="bg-primary text-white text-xs font-semibold px-4 py-1 rounded-full shadow-glow">
            Most Popular
          </span>
        </div>
      )}

      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold text-text-primary">{plan.name}</h3>
        {plan.badge && <span className="text-lg">{plan.badge}</span>}
      </div>
      <p className="text-sm text-text-secondary mb-4">{plan.desc}</p>

      <div className="mb-6">
        <span className="text-4xl font-bold text-text-primary">{plan.price}</span>
        {plan.period && <span className="text-text-secondary text-sm">{plan.period}</span>}
      </div>

      <ul className="space-y-3 mb-6 flex-1">
        {plan.features.map((feature, i) => (
          <li key={i} className="flex items-start gap-2.5 text-sm text-text-secondary">
            <div className="w-5 h-5 rounded-full bg-success/15 flex items-center justify-center shrink-0 mt-0.5">
              <Check className="w-3 h-3 text-success" />
            </div>
            {feature}
          </li>
        ))}
      </ul>

      <Button
        variant={plan.popular ? 'primary' : 'secondary'}
        className="w-full"
      >
        {plan.cta}
      </Button>
    </motion.div>
  );
};

export default PricingCard;
