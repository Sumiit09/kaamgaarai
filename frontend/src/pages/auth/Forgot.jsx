import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowRight } from 'lucide-react';
import AuthLayout from './AuthLayout';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const Forgot = () => {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  return (
    <AuthLayout title="Forgot password" subtitle="We'll send a reset link to your email">
      {sent ? (
        <div className="text-center py-8">
          <div className="w-16 h-16 rounded-full bg-success/15 flex items-center justify-center mx-auto mb-4">
            <Mail className="w-8 h-8 text-success" />
          </div>
          <p className="text-text-primary font-medium mb-2">Check your email</p>
          <p className="text-sm text-text-secondary mb-6">We've sent a password reset link to {email}</p>
          <Link to="/reset">
            <Button variant="secondary" className="w-full">Open reset page</Button>
          </Link>
        </div>
      ) : (
        <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-4">
          <Input label="Email" type="email" placeholder="priya@dreamsalon.in" icon={Mail}
            value={email} onChange={(e) => setEmail(e.target.value)} required />
          <Button type="submit" variant="primary" className="w-full" size="lg">
            Send Reset Link
            <ArrowRight className="w-4 h-4" />
          </Button>
        </form>
      )}
      <p className="text-center text-sm text-text-secondary mt-6">
        <Link to="/login" className="text-primary hover:text-primary-400 font-medium transition-colors">
          Back to login
        </Link>
      </p>
    </AuthLayout>
  );
};

export default Forgot;
