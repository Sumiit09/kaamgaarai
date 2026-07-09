import { motion } from 'framer-motion';
import { Check, MessageCircle, CalendarCheck, Brain, Zap } from 'lucide-react';
import Logo from '../../components/ui/Logo';

const AuthLayout = ({ children, title, subtitle }) => {
  const highlights = [
    { icon: MessageCircle, title: 'WhatsApp Automation', desc: 'AI handles every message 24/7' },
    { icon: CalendarCheck, title: 'Auto Bookings', desc: 'Appointments booked automatically' },
    { icon: Brain, title: 'Customer Memory', desc: 'Remembers every customer interaction' },
    { icon: Zap, title: '10-Minute Setup', desc: 'Go live without any coding' },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left — Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-surface border-r border-border-light">
        <div className="absolute inset-0 hero-glow" />
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="relative flex flex-col justify-between p-12 w-full">
          <Logo size="lg" />

          <div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl font-bold text-text-primary leading-tight mb-4"
            >
              Hire your first <span className="gradient-text">AI Employee.</span>
            </motion.h1>
            <p className="text-lg text-text-secondary mb-8 max-w-md">
              Your business deserves an employee that never sleeps.
            </p>
            <div className="space-y-4">
              {highlights.map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <h.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-text-primary">{h.title}</p>
                    <p className="text-xs text-text-secondary">{h.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-6 text-sm text-text-tertiary">
            <div className="flex items-center gap-2"><Check className="w-4 h-4 text-success" /> 500+ businesses</div>
            <div className="flex items-center gap-2"><Check className="w-4 h-4 text-success" /> 2M+ messages</div>
            <div className="flex items-center gap-2"><Check className="w-4 h-4 text-success" /> 98% satisfaction</div>
          </div>
        </div>
      </div>

      {/* Right — Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="lg:hidden mb-8">
            <Logo size="lg" />
          </div>
          <h2 className="text-2xl font-bold text-text-primary mb-2">{title}</h2>
          {subtitle && <p className="text-sm text-text-secondary mb-8">{subtitle}</p>}
          {children}
        </motion.div>
      </div>
    </div>
  );
};

export default AuthLayout;
