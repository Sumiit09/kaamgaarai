import { useState, useEffect, useRef } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  features, howItWorks, platforms, businessCategories, comparisonData,
  testimonials, pricingPlans, faqs, recentConversations,
} from '../../data/mockData';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Accordion from '../../components/ui/Accordion';
import PricingCard from '../../components/shared/PricingCard';
import { Check, X, Minus, ArrowRight, Star, Scissors, Stethoscope, GraduationCap, Sparkles } from 'lucide-react';

// ── Announcement Bar — removed per request ────────────────────
export const AnnouncementBar = () => null;

// ── Trusted By ───────────────────────────────────────────────
export const TrustedBy = () => {
  const trusted = [
    { icon: Scissors, name: 'Dream Salon' },
    { icon: Stethoscope, name: 'Sharma Clinic' },
    { icon: GraduationCap, name: 'Patel Coaching' },
    { icon: Scissors, name: 'Wellness Spa' },
    { icon: Stethoscope, name: 'Mehta Dental' },
    { icon: GraduationCap, name: 'Arjun Academy' },
  ];
  return (
    <section className="py-12 border-y border-border-light bg-surface/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm text-text-tertiary mb-8 uppercase tracking-wider">
          Trusted by 500+ businesses across India
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {trusted.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors"
            >
              <t.icon className="w-5 h-5" />
              <span className="text-sm font-medium">{t.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ── Animated Counter ──────────────────────────────────────────
const Counter = ({ value, suffix = '', duration = 2 }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [display, setDisplay] = useState('0');

  useEffect(() => {
    if (!inView) return;
    const isString = typeof value === 'string';
    const num = isString ? parseInt(value) : value;
    const controls = animate(0, num, {
      duration,
      onUpdate: (v) => setDisplay(Math.floor(v).toLocaleString('en-IN') + suffix),
    });
    return () => controls.stop();
  }, [inView, value, suffix, duration]);

  return <span ref={ref}>{display}</span>;
};

// ── Statistics ────────────────────────────────────────────────
export const Statistics = () => {
  const stats = [
    { value: 500, suffix: '+', label: 'Businesses' },
    { value: 2, suffix: 'M+', label: 'Messages Handled' },
    { value: 50000, suffix: '+', label: 'Appointments Booked' },
    { value: 98, suffix: '%', label: 'Customer Satisfaction' },
  ];
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <p className="text-4xl lg:text-5xl font-bold gradient-text mb-2">
                <Counter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="text-sm text-text-secondary">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ── Features ─────────────────────────────────────────────────
export const Features = () => (
  <section id="features" className="py-20 relative">
    <div className="absolute inset-0 dot-bg opacity-30" />
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <Badge variant="info" className="mb-4">Features</Badge>
        <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
          Everything your business needs
        </h2>
        <p className="text-text-secondary max-w-2xl mx-auto">
          13 powerful features that make your AI Employee smarter than any chatbot.
        </p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {features.map((feature, i) => {
          const Icon = LucideIcons[feature.icon] || LucideIcons.Sparkles;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 3) * 0.1 }}
              whileHover={{ scale: 1.02, y: -2 }}
              className="card-surface p-5 group"
            >
              <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-text-primary mb-1.5">{feature.title}</h3>
              <p className="text-sm text-text-secondary leading-relaxed">{feature.desc}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);

// ── How It Works ──────────────────────────────────────────────
export const HowItWorks = () => (
  <section id="how-it-works" className="py-20">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <Badge variant="accent" className="mb-4">How It Works</Badge>
        <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
          Go live in 10 minutes
        </h2>
        <p className="text-text-secondary">6 simple steps — no coding, no technical knowledge needed.</p>
      </div>
      <div className="relative">
        <div className="hidden lg:block absolute top-12 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border-light to-transparent" />
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
          {howItWorks.map((step, i) => {
            const Icon = LucideIcons[step.icon] || LucideIcons.Circle;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative text-center"
              >
                <div className="relative inline-flex w-12 h-12 rounded-full bg-card border border-border-light items-center justify-center mb-3 group hover:border-primary/50 transition-colors">
                  <Icon className="w-5 h-5 text-primary" />
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary text-white text-2xs font-bold flex items-center justify-center">
                    {step.step}
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-text-primary mb-1">{step.title}</h3>
                <p className="text-xs text-text-secondary">{step.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  </section>
);

// ── Platforms ─────────────────────────────────────────────────
export const Platforms = () => (
  <section className="py-20 bg-surface/30 border-y border-border-light">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <Badge variant="info" className="mb-4">Channels</Badge>
        <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
          All your channels, one inbox
        </h2>
        <p className="text-text-secondary">Connect every channel your customers use.</p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {platforms.map((platform, i) => {
          const Icon = LucideIcons[platform.icon] || LucideIcons.Globe;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ scale: 1.03 }}
              className={`
                card-surface p-5 text-center relative
                ${platform.highlight ? 'gradient-border shadow-glow' : ''}
              `}
            >
              {platform.highlight && (
                <span className="absolute -top-2 right-3 bg-success text-white text-2xs px-2 py-0.5 rounded-full">
                  Primary
                </span>
              )}
              <div className={`w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center ${platform.highlight ? 'bg-success/15 text-success' : 'bg-surface text-text-primary'}`}>
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-semibold text-text-primary">{platform.name}</h3>
              <p className="text-xs text-text-secondary mt-0.5">{platform.desc}</p>
              {platform.status === 'coming-soon' && (
                <Badge variant="warning" size="sm" className="mt-2">Coming Soon</Badge>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);

// ── Business Categories ──────────────────────────────────────
export const BusinessCategories = () => (
  <section className="py-20">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <Badge variant="accent" className="mb-4">For Every Business</Badge>
        <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
          Built for Indian businesses
        </h2>
        <p className="text-text-secondary">From salons to clinics — KaamgaarAI works for everyone.</p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {businessCategories.map((cat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: (i % 5) * 0.05 }}
            whileHover={{ scale: 1.05, y: -2 }}
            className="card-surface p-5 text-center cursor-pointer"
          >
            <div className="text-3xl mb-2">{cat.emoji}</div>
            <p className="text-sm font-medium text-text-primary">{cat.name}</p>
          </motion.div>
        ))}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.05, y: -2 }}
          className="gradient-border p-5 text-center cursor-pointer flex flex-col items-center justify-center"
        >
          <div className="text-3xl mb-2">+</div>
          <p className="text-sm font-medium text-primary">100 More</p>
        </motion.div>
      </div>
    </div>
  </section>
);

// ── Why KaamgaarAI (Comparison) ───────────────────────────────
export const WhyKaamgaarAI = () => (
  <section className="py-20 bg-surface/30 border-y border-border-light">
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <Badge variant="info" className="mb-4">Why KaamgaarAI</Badge>
        <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
          The smart choice for Indian businesses
        </h2>
      </div>
      <div className="card-surface overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border-light">
              <th className="text-left p-4 text-sm font-medium text-text-tertiary">Feature</th>
              <th className="text-center p-4">
                <span className="text-sm font-bold text-primary">KaamgaarAI</span>
              </th>
              <th className="text-center p-4 text-sm font-medium text-text-secondary">Traditional Staff</th>
              <th className="text-center p-4 text-sm font-medium text-text-secondary">Other Chatbots</th>
            </tr>
          </thead>
          <tbody>
            {comparisonData.map((row, i) => (
              <motion.tr
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="border-b border-border-light/50"
              >
                <td className="p-4 text-sm text-text-secondary">{row.feature}</td>
                <td className="p-4 text-center">
                  {row.kaamgaar ? <Check className="w-5 h-5 text-success mx-auto" /> : <X className="w-5 h-5 text-danger mx-auto" />}
                </td>
                <td className="p-4 text-center">
                  {row.staff ? <Check className="w-5 h-5 text-success mx-auto" /> : <X className="w-5 h-5 text-danger mx-auto" />}
                </td>
                <td className="p-4 text-center">
                  {row.chatbot ? <Check className="w-5 h-5 text-success mx-auto" /> : <X className="w-5 h-5 text-danger mx-auto" />}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </section>
);

// ── Testimonials ──────────────────────────────────────────────
export const Testimonials = () => (
  <section className="py-20">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <Badge variant="accent" className="mb-4">Testimonials</Badge>
        <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
          Loved by Indian business owners
        </h2>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="card-surface p-6"
          >
            <div className="flex gap-1 mb-4">
              {Array.from({ length: t.rating }).map((_, j) => (
                <Star key={j} className="w-4 h-4 fill-warning text-warning" />
              ))}
            </div>
            <p className="text-text-primary text-sm leading-relaxed mb-6 italic">"{t.text}"</p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm font-semibold">
                {t.avatar}
              </div>
              <div>
                <p className="text-sm font-semibold text-text-primary">{t.name}</p>
                <p className="text-xs text-text-secondary">{t.business}, {t.city}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

// ── Pricing ───────────────────────────────────────────────────
export const Pricing = () => (
  <section id="pricing" className="py-20 bg-surface/30 border-y border-border-light">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <Badge variant="info" className="mb-4">Pricing</Badge>
        <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
          Simple, transparent pricing
        </h2>
        <p className="text-text-secondary">Start free. Upgrade when you grow. Cancel anytime.</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {pricingPlans.map((plan, i) => (
          <PricingCard key={i} plan={plan} index={i} />
        ))}
      </div>
    </div>
  </section>
);

// ── FAQ ───────────────────────────────────────────────────────
export const FAQ = () => (
  <section id="faq" className="py-20">
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <Badge variant="accent" className="mb-4">FAQ</Badge>
        <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
          Aapke sawaal, hamare jawaab
        </h2>
      </div>
      <Accordion items={faqs} />
    </div>
  </section>
);

// ── Final CTA ─────────────────────────────────────────────────
export const FinalCTA = () => (
  <section className="py-20">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="relative gradient-border rounded-3xl p-12 text-center overflow-hidden"
      >
        <div className="absolute inset-0 hero-glow opacity-50" />
        <div className="relative">
          <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
            Ready to hire your AI Employee?
          </h2>
          <p className="text-text-secondary mb-8 max-w-xl mx-auto">
            Join 500+ Indian businesses already using KaamgaarAI to automate their customer conversations.
          </p>
          <Link to="/register">
            <Button variant="primary" size="lg">
              Start Free Trial
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <p className="text-xs text-text-tertiary mt-4">14-day free trial · No credit card required</p>
        </div>
      </motion.div>
    </div>
  </section>
);

// ── Footer ────────────────────────────────────────────────────
export const Footer = () => {
  const columns = [
    { title: 'Product', links: ['Features', 'Pricing', 'Integrations', 'API Docs', 'Changelog'] },
    { title: 'Company', links: ['About', 'Blog', 'Careers', 'Press', 'Contact'] },
    { title: 'Legal', links: ['Privacy', 'Terms', 'Security', 'DPA', 'Cookies'] },
    { title: 'Support', links: ['Help Center', 'Status', 'Community', 'WhatsApp Support', 'Onboarding'] },
  ];
  return (
    <footer className="border-t border-border-light bg-surface/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <svg viewBox="0 0 32 32" className="w-8 h-8">
                <rect width="32" height="32" rx="8" fill="#2563EB" />
                <path d="M10 24V8h2.5v6.5L19 8h3l-7 7.5L22.5 24h-3l-5-7-2 2.2V24H10z" fill="#fff" />
                <circle cx="24" cy="8" r="2" fill="#06B6D4" />
              </svg>
              <span className="font-bold text-lg text-text-primary">Kaamgaar<span className="text-primary">AI</span></span>
            </div>
            <p className="text-sm text-text-secondary mb-4">Hire your first AI Employee.</p>
            <div className="flex gap-3">
              {['Twitter', 'LinkedIn', 'Instagram', 'YouTube'].map((s) => (
                <div key={s} className="w-8 h-8 rounded-lg bg-card border border-border-light flex items-center justify-center text-text-tertiary hover:text-text-primary hover:border-primary/30 cursor-pointer transition-colors text-xs">
                  {s[0]}
                </div>
              ))}
            </div>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold text-text-primary mb-3">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-text-secondary hover:text-text-primary transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 pt-8 border-t border-border-light flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-tertiary">© 2024 KaamgaarAI. Made in India, for India.</p>
          <p className="text-xs text-text-tertiary">🇮🇳 Proudly serving 500+ Indian businesses</p>
        </div>
      </div>
    </footer>
  );
};
