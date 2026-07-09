import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Play, Sparkles, MessageCircle, CalendarCheck, TrendingUp, Check } from 'lucide-react';
import Button from '../../components/ui/Button';
import { recentConversations } from '../../data/mockData';

const previewChats = [
  { name: 'Priya Sharma', msg: 'Kal 3 baje facial ke liye slot hai kya?', reply: 'Haan Priya ji! Kal 3 baje available hai ✅', avatar: 'PS', color: 'primary' },
  { name: 'Rahul Mehta', msg: 'Admission form bhej do bhaiya', reply: 'Bhej diya! Demo class Saturday 10 AM 📚', avatar: 'RM', color: 'accent' },
  { name: 'Anjali Singh', msg: 'Spa package ka price?', reply: 'Premium ₹2,500 (15% off this month!) 🎉', avatar: 'AS', color: 'success' },
];

// State machine: 'customer' -> 'typing' -> 'reply' -> (next chat) 'customer' ...
const HeroDashboardPreview = () => {
  const [activeChat, setActiveChat] = useState(0);
  const [phase, setPhase] = useState('customer'); // 'customer' | 'typing' | 'reply'

  useEffect(() => {
    let timers = [];
    if (phase === 'customer') {
      timers.push(setTimeout(() => setPhase('typing'), 1500));
    } else if (phase === 'typing') {
      timers.push(setTimeout(() => setPhase('reply'), 1800));
    } else if (phase === 'reply') {
      timers.push(setTimeout(() => {
        setActiveChat((prev) => (prev + 1) % previewChats.length);
        setPhase('customer');
      }, 2500));
    }
    return () => timers.forEach(clearTimeout);
  }, [phase]);

  const chat = previewChats[activeChat];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, rotateY: 15 }}
      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="relative w-full perspective-1000"
    >
      <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl blur-3xl opacity-50" />

      <div className="relative glass rounded-2xl shadow-float overflow-hidden">
        {/* Window bar */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-border-light bg-surface/50">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-danger/60" />
            <div className="w-3 h-3 rounded-full bg-warning/60" />
            <div className="w-3 h-3 rounded-full bg-success/60" />
          </div>
          <div className="flex-1 text-center text-xs text-text-tertiary">Dream Salon — Dashboard</div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-2 p-4 border-b border-border-light">
          {[
            { icon: MessageCircle, label: 'Conversations', value: '47', color: 'text-primary' },
            { icon: CalendarCheck, label: 'Bookings', value: '14', color: 'text-accent' },
            { icon: TrendingUp, label: 'Revenue', value: '₹45k', color: 'text-success' },
          ].map((stat, i) => (
            <div key={i} className="bg-surface/50 rounded-lg p-2.5 border border-border-light">
              <stat.icon className={`w-4 h-4 ${stat.color} mb-1`} />
              <p className="text-lg font-bold text-text-primary">{stat.value}</p>
              <p className="text-2xs text-text-tertiary">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Chat preview */}
        <div className="p-4 space-y-3 min-h-[200px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeChat}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-semibold">
                  {chat.avatar}
                </div>
                <div>
                  <p className="text-sm font-medium text-text-primary">{chat.name}</p>
                  <p className="text-2xs text-success flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" /> AI Handling
                  </p>
                </div>
              </div>

              {/* Customer message — always shown */}
              <div className="bg-surface rounded-2xl rounded-bl-sm px-3 py-2 text-sm text-text-secondary max-w-[80%]">
                {chat.msg}
              </div>

              {/* Typing indicator */}
              {phase === 'typing' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-1 mt-2 px-3"
                >
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      animate={{ y: [0, -4, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                      className="w-1.5 h-1.5 bg-primary rounded-full"
                    />
                  ))}
                </motion.div>
              )}

              {/* AI reply — only after typing completes */}
              {phase === 'reply' && (
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex justify-end mt-2"
                >
                  <div className="bg-primary text-white rounded-2xl rounded-br-sm px-3 py-2 text-sm max-w-[80%]">
                    {chat.reply}
                  </div>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Booking confirmation */}
        <div className="px-4 pb-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="flex items-center gap-2 bg-success/10 border border-success/30 rounded-lg p-2.5"
          >
            <div className="w-6 h-6 rounded-full bg-success/20 flex items-center justify-center">
              <Check className="w-3.5 h-3.5 text-success" />
            </div>
            <p className="text-xs text-text-secondary">
              Booking confirmed — <span className="text-success">Rahul Mehta, 2:00 PM</span>
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      <div className="absolute inset-0 hero-glow" />
      <div className="absolute inset-0 grid-bg opacity-30" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/30 mb-6">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs font-medium text-primary">AI Employee Platform for Indian Businesses</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary leading-[1.1] tracking-tight mb-6 text-balance">
              Hire your first{' '}
              <span className="gradient-text">AI Employee.</span>
            </h1>

            <p className="text-lg text-text-secondary mb-8 max-w-xl leading-relaxed">
              Automate WhatsApp conversations, bookings, and follow-ups across WhatsApp, Instagram, and more — at the cost of a chai.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <Button variant="primary" size="lg" onClick={() => navigate('/register')}>
                Start Free Trial — No credit card
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button variant="secondary" size="lg" onClick={() => navigate('/dashboard/overview')}>
                <Play className="w-4 h-4" />
                Watch Demo
              </Button>
            </div>

            <div className="flex items-center gap-6 text-sm text-text-tertiary">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-success" /> 14-day free trial
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-success" /> No coding required
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-success" /> Setup in 10 min
              </div>
            </div>
          </motion.div>

          {/* Right */}
          <div className="relative">
            <HeroDashboardPreview />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
