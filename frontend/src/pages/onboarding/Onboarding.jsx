import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import { ArrowRight, ArrowLeft, Check, Plus, X, Clock, MessageCircle } from 'lucide-react';
import Logo from '../../components/ui/Logo';
import Button from '../../components/ui/Button';
import Input, { Textarea, Select } from '../../components/ui/Input';
import Toggle from '../../components/ui/Toggle';
import { onboardingSteps, businessTypes, indianCities, indianStates } from '../../data/mockData';

const StepContent = ({ step, data, setData }) => {
  switch (step) {
    case 1:
      return (
        <div className="space-y-4">
          <Input label="Business Name" placeholder="Dream Salon" value={data.businessName}
            onChange={(e) => setData({ ...data, businessName: e.target.value })} />
          <Select label="Business Category" value={data.category}
            onChange={(e) => setData({ ...data, category: e.target.value })}>
            <option value="">Select category</option>
            {businessTypes.map((t) => <option key={t} value={t}>{t}</option>)}
          </Select>
        </div>
      );
    case 2:
      return (
        <div className="space-y-4">
          <Input label="Address" placeholder="FC Road, Shivajinagar" value={data.address}
            onChange={(e) => setData({ ...data, address: e.target.value })} />
          <div className="grid grid-cols-2 gap-3">
            <Select label="City" value={data.city} onChange={(e) => setData({ ...data, city: e.target.value })}>
              <option value="">Select city</option>
              {indianCities.map((c) => <option key={c} value={c}>{c}</option>)}
            </Select>
            <Select label="State" value={data.state} onChange={(e) => setData({ ...data, state: e.target.value })}>
              <option value="">Select state</option>
              {indianStates.map((s) => <option key={s} value={s}>{s}</option>)}
            </Select>
          </div>
          <Input label="Pincode" placeholder="411005" value={data.pincode}
            onChange={(e) => setData({ ...data, pincode: e.target.value })} />
        </div>
      );
    case 3:
      return (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <Input label="Opening Time" type="time" value={data.openTime}
              onChange={(e) => setData({ ...data, openTime: e.target.value })} />
            <Input label="Closing Time" type="time" value={data.closeTime}
              onChange={(e) => setData({ ...data, closeTime: e.target.value })} />
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium text-text-secondary">Working Days</p>
            <div className="flex flex-wrap gap-2">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                <button key={day} type="button"
                  onClick={() => setData({
                    ...data,
                    workingDays: data.workingDays.includes(day)
                      ? data.workingDays.filter((d) => d !== day)
                      : [...data.workingDays, day],
                  })}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    data.workingDays.includes(day)
                      ? 'bg-primary text-white'
                      : 'bg-surface border border-border-light text-text-secondary hover:text-text-primary'
                  }`}>
                  {day}
                </button>
              ))}
            </div>
          </div>
          <Textarea label="Holiday Dates (optional)" placeholder="e.g., 26 Jan, 15 Aug, 25 Dec..." rows={2}
            value={data.holidays} onChange={(e) => setData({ ...data, holidays: e.target.value })} />
        </div>
      );
    case 4:
      return (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-text-secondary">Services & Pricing</p>
            <Button variant="ghost" size="sm" type="button"
              onClick={() => setData({ ...data, services: [...data.services, { name: '', price: '' }] })}>
              <Plus className="w-4 h-4" /> Add
            </Button>
          </div>
          {data.services.map((svc, i) => (
            <div key={i} className="flex gap-2">
              <Input placeholder="Service name" value={svc.name}
                onChange={(e) => {
                  const services = [...data.services];
                  services[i] = { ...services[i], name: e.target.value };
                  setData({ ...data, services });
                }} />
              <Input placeholder="₹ Price" className="w-32" value={svc.price}
                onChange={(e) => {
                  const services = [...data.services];
                  services[i] = { ...services[i], price: e.target.value };
                  setData({ ...data, services });
                }} />
              <button type="button" onClick={() => setData({ ...data, services: data.services.filter((_, j) => j !== i) })}
                className="p-2 text-text-tertiary hover:text-danger transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
          {data.services.length === 0 && (
            <p className="text-sm text-text-tertiary text-center py-4">No services added yet</p>
          )}
        </div>
      );
    case 5:
      return (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-text-secondary">Common FAQs</p>
            <Button variant="ghost" size="sm" type="button"
              onClick={() => setData({ ...data, faqs: [...data.faqs, { q: '', a: '' }] })}>
              <Plus className="w-4 h-4" /> Add
            </Button>
          </div>
          {data.faqs.map((faq, i) => (
            <div key={i} className="space-y-2 p-3 bg-surface rounded-lg border border-border-light">
              <Input placeholder="Question" value={faq.q}
                onChange={(e) => {
                  const faqs = [...data.faqs];
                  faqs[i] = { ...faqs[i], q: e.target.value };
                  setData({ ...data, faqs });
                }} />
              <Textarea placeholder="Answer" rows={2} value={faq.a}
                onChange={(e) => {
                  const faqs = [...data.faqs];
                  faqs[i] = { ...faqs[i], a: e.target.value };
                  setData({ ...data, faqs });
                }} />
              <button type="button" onClick={() => setData({ ...data, faqs: data.faqs.filter((_, j) => j !== i) })}
                className="text-xs text-danger hover:text-danger/80 transition-colors">
                Remove
              </button>
            </div>
          ))}
          {data.faqs.length === 0 && (
            <p className="text-sm text-text-tertiary text-center py-4">No FAQs added yet</p>
          )}
        </div>
      );
    case 6:
      return (
        <div className="space-y-4">
          <Select label="AI Language" value={data.language}
            onChange={(e) => setData({ ...data, language: e.target.value })}>
            <option value="hinglish">Hinglish (Hindi + English)</option>
            <option value="hindi">Hindi</option>
            <option value="english">English</option>
            <option value="marathi">Marathi</option>
          </Select>
          <div>
            <p className="text-sm font-medium text-text-secondary mb-2">AI Tone</p>
            <div className="grid grid-cols-3 gap-2">
              {['Professional', 'Friendly', 'Casual'].map((tone) => (
                <button key={tone} type="button"
                  onClick={() => setData({ ...data, tone: tone.toLowerCase() })}
                  className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    data.tone === tone.toLowerCase()
                      ? 'bg-primary text-white'
                      : 'bg-surface border border-border-light text-text-secondary hover:text-text-primary'
                  }`}>
                  {tone}
                </button>
              ))}
            </div>
          </div>
          <Textarea label="Greeting Message" rows={3}
            placeholder="Namaste! Dream Salon mein aapka swagat hai..."
            value={data.greeting}
            onChange={(e) => setData({ ...data, greeting: e.target.value })} />
        </div>
      );
    case 7:
      return (
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium text-text-secondary mb-2">AI Should Do</p>
            <div className="space-y-2">
              {['Always greet customers with Namaste', 'Confirm booking before finalizing', 'Offer premium services when relevant'].map((rule, i) => (
                <div key={i} className="flex items-center gap-2 p-2.5 bg-surface rounded-lg border border-border-light">
                  <Check className="w-4 h-4 text-success shrink-0" />
                  <span className="text-sm text-text-primary">{rule}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-text-secondary mb-2">AI Should NOT Do</p>
            <div className="space-y-2">
              {['Share pricing of competitors', 'Promise discounts without approval', 'Handle refund requests alone'].map((rule, i) => (
                <div key={i} className="flex items-center gap-2 p-2.5 bg-surface rounded-lg border border-border-light">
                  <X className="w-4 h-4 text-danger shrink-0" />
                  <span className="text-sm text-text-primary">{rule}</span>
                </div>
              ))}
            </div>
          </div>
          <Textarea label="Custom Rules (optional)" rows={2}
            placeholder="Add any specific rules for your business..."
            value={data.customRules}
            onChange={(e) => setData({ ...data, customRules: e.target.value })} />
        </div>
      );
    case 8:
      return (
        <div className="space-y-6">
          <div className="text-center">
            <div className="w-16 h-16 rounded-2xl bg-success/15 flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-8 h-8 text-success" />
            </div>
            <h3 className="text-lg font-semibold text-text-primary mb-2">Connect WhatsApp</h3>
            <p className="text-sm text-text-secondary max-w-sm mx-auto">
              Link your WhatsApp Business number. Your AI Employee will handle all conversations from here.
            </p>
          </div>
          <div className="space-y-3">
            <Input label="WhatsApp Number" placeholder="+91 98765 43210" value={data.whatsapp}
              onChange={(e) => setData({ ...data, whatsapp: e.target.value })} />
            <div className="flex items-center justify-between p-3 bg-surface rounded-lg border border-border-light">
              <div>
                <p className="text-sm font-medium text-text-primary">Use WhatsApp Business API</p>
                <p className="text-xs text-text-secondary">Recommended for businesses</p>
              </div>
              <Toggle checked={data.useAPI} onChange={(v) => setData({ ...data, useAPI: v })} />
            </div>
          </div>
          <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
            <p className="text-xs text-text-secondary">
              🔒 Your WhatsApp number is end-to-end encrypted and never shared. We use Meta's official WhatsApp Business API.
            </p>
          </div>
        </div>
      );
    default:
      return null;
  }
};

const Onboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [data, setData] = useState({
    businessName: '', category: '', address: '', city: '', state: '', pincode: '',
    openTime: '09:00', closeTime: '21:00', workingDays: ['Mon','Tue','Wed','Thu','Fri','Sat'], holidays: '',
    services: [{ name: '', price: '' }], faqs: [],
    language: 'hinglish', tone: 'friendly', greeting: '',
    customRules: '', whatsapp: '', useAPI: true,
  });

  const progress = (step / 8) * 100;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border-light bg-surface/30">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <Logo />
          <button onClick={() => navigate('/dashboard/overview')} className="text-sm text-text-secondary hover:text-text-primary transition-colors">
            Skip for now
          </button>
        </div>
      </header>

      {/* Progress */}
      <div className="max-w-3xl mx-auto w-full px-6 pt-8">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm text-text-secondary">Step {step} of 8</p>
          <p className="text-sm font-medium text-text-primary">{onboardingSteps[step - 1].title}</p>
        </div>
        <div className="h-2 bg-surface rounded-full overflow-hidden">
          <motion.div
            animate={{ width: `${progress}%` }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
          />
        </div>
        <div className="flex justify-between mt-3">
          {onboardingSteps.map((s) => (
            <div key={s.step} className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-colors ${
              s.step < step ? 'bg-success text-white' : s.step === step ? 'bg-primary text-white' : 'bg-surface text-text-tertiary border border-border-light'
            }`}>
              {s.step < step ? <Check className="w-4 h-4" /> : s.step}
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 max-w-3xl mx-auto w-full px-6 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <StepContent step={step} data={data} setData={setData} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer */}
      <footer className="border-t border-border-light bg-surface/30">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <Button variant="ghost" onClick={() => setStep(Math.max(1, step - 1))} disabled={step === 1}>
            <ArrowLeft className="w-4 h-4" /> Back
          </Button>
          {step < 8 ? (
            <Button variant="primary" onClick={() => setStep(step + 1)}>
              Continue <ArrowRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button variant="primary" onClick={() => navigate('/dashboard/overview')}>
              Go Live! <Check className="w-4 h-4" />
            </Button>
          )}
        </div>
      </footer>
    </div>
  );
};

export default Onboarding;
