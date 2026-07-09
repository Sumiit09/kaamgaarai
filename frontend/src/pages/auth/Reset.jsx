import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Lock, ArrowRight, Check } from 'lucide-react';
import AuthLayout from './AuthLayout';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const Reset = () => {
  const [form, setForm] = useState({ password: '', confirm: '' });
  const [done, setDone] = useState(false);

  return (
    <AuthLayout title="Reset password" subtitle="Enter your new password">
      {done ? (
        <div className="text-center py-8">
          <div className="w-16 h-16 rounded-full bg-success/15 flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-success" />
          </div>
          <p className="text-text-primary font-medium mb-2">Password updated</p>
          <p className="text-sm text-text-secondary mb-6">Your password has been changed successfully.</p>
          <Link to="/login">
            <Button variant="primary" className="w-full">Login with new password</Button>
          </Link>
        </div>
      ) : (
        <form onSubmit={(e) => { e.preventDefault(); setDone(true); }} className="space-y-4">
          <Input label="New Password" type="password" placeholder="••••••••" icon={Lock}
            value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
          <Input label="Confirm Password" type="password" placeholder="••••••••" icon={Lock}
            value={form.confirm} onChange={(e) => setForm({ ...form, confirm: e.target.value })} required
            error={form.confirm && form.password !== form.confirm ? 'Passwords do not match' : ''} />
          <Button type="submit" variant="primary" className="w-full" size="lg">
            Update Password
            <ArrowRight className="w-4 h-4" />
          </Button>
        </form>
      )}
    </AuthLayout>
  );
};

export default Reset;
