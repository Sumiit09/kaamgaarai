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
import { useAuth } from "../../context/AuthContext";
import axios from "axios";

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

    case 4:
      return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 rounded-2xl bg-success/15 flex items-center justify-center mx-auto mb-4">
          <Check className="w-8 h-8 text-success" />
        </div>

        <h3 className="text-xl font-semibold">
          You're Almost Ready!
        </h3>

        <p className="text-text-secondary mt-2">
          Review your business details before going live.
        </p>
      </div>

      <div className="space-y-3 rounded-xl border border-border-light p-4">

        <p><strong>Business:</strong> {data.businessName}</p>

        <p><strong>Category:</strong> {data.category}</p>

        <p><strong>Address:</strong> {data.address}</p>

        <p><strong>City:</strong> {data.city}</p>

        <p><strong>State:</strong> {data.state}</p>

        <p><strong>Pincode:</strong> {data.pincode}</p>

        <p>
          <strong>WhatsApp:</strong>{" "}
          {data.whatsapp || "Skipped (Can be connected later)"}
        </p>

      </div>

      <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
        <p className="text-sm text-text-secondary">
          🚀 Your AI Employee will be activated after clicking Go Live.
        </p>
      </div>

    </div>
  );
  default:
      return null;
  }
}

const Onboarding = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [step, setStep] = useState(1);

  const [data, setData] = useState({
    businessName: '',
    category: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    whatsapp: '',
    useAPI: true,
  });

  const progress = (step / 4) * 100;

  const handleGoLive = async () => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/businesses",
      {
        ownerId: user.id,
        ownerName: user.user_metadata?.name || "Owner",
        businessName: data.businessName,
        category: data.category,
        address: data.address,
        city: data.city,
        state: data.state,
        pincode: data.pincode,
        whatsapp: data.whatsapp,
      }
    );

    console.log(response.data);

    navigate("/dashboard/overview");
  } catch (err) {
    console.error(err);

    alert("Failed to create business");
  }
};

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
          <p className="text-sm text-text-secondary">Step {step} of 4</p>
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
          {step < 4 ? (
            <Button variant="primary" onClick={() => setStep(step + 1)}>
              Continue <ArrowRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button
  variant="primary"
  onClick={handleGoLive}
>
  Go Live! <Check className="w-4 h-4" />
</Button>
          )}
        </div>
      </footer>
    </div>
  );
};

export default Onboarding;
