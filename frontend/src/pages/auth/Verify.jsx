import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import AuthLayout from './AuthLayout';
import Button from '../../components/ui/Button';

const Verify = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [done, setDone] = useState(false);

  const handleChange = (i, val) => {
    if (val && !/^\d$/.test(val)) return;
    const newOtp = [...otp];
    newOtp[i] = val;
    setOtp(newOtp);
    if (val && i < 5) {
      const next = document.getElementById(`otp-${i + 1}`);
      next?.focus();
    }
  };

  return (
    <AuthLayout title="Verify your email" subtitle="Enter the 6-digit code sent to priya@dreamsalon.in">
      {done ? (
        <div className="text-center py-8">
          <div className="w-16 h-16 rounded-full bg-success/15 flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-success" />
          </div>
          <p className="text-text-primary font-medium mb-2">Email verified!</p>
          <p className="text-sm text-text-secondary mb-6">Your account is now active.</p>
          <Link to="/onboarding">
            <Button variant="primary" className="w-full">Continue to onboarding</Button>
          </Link>
        </div>
      ) : (
        <form onSubmit={(e) => { e.preventDefault(); setDone(true); }} className="space-y-6">
          <div className="flex gap-2 justify-center">
            {otp.map((digit, i) => (
              <input
                key={i}
                id={`otp-${i}`}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(i, e.target.value)}
                className="w-12 h-14 text-center text-xl font-bold bg-surface border border-border-light rounded-lg text-text-primary focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-colors"
              />
            ))}
          </div>
          <Button type="submit" variant="primary" className="w-full" size="lg">
            Verify Email
            <ArrowRight className="w-4 h-4" />
          </Button>
          <p className="text-center text-sm text-text-secondary">
            Didn't receive the code?{' '}
            <button type="button" className="text-primary hover:text-primary-400 font-medium transition-colors">
              Resend
            </button>
          </p>
        </form>
      )}
    </AuthLayout>
  );
};

export default Verify;
