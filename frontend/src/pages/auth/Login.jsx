import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import AuthLayout from './AuthLayout';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { supabase } from '../../lib/supabase';

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    navigate('/dashboard/overview');
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Login to your KaamgaarAI dashboard"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Email"
          type="email"
          placeholder="priya@dreamsalon.in"
          icon={Mail}
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />

        <Input
          label="Password"
          type="password"
          placeholder="••••••••"
          icon={Lock}
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm text-text-secondary cursor-pointer">
            <input
              type="checkbox"
              className="rounded border-border-light bg-surface text-primary focus:ring-primary"
            />
            Remember me
          </label>

          <Link
            to="/forgot"
            className="text-sm text-primary hover:text-primary-400 transition-colors"
          >
            Forgot password?
          </Link>
        </div>

        <Button
          type="submit"
          variant="primary"
          className="w-full"
          size="lg"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
          <ArrowRight className="w-4 h-4" />
        </Button>
      </form>

      <div className="my-6 flex items-center gap-3">
        <div className="flex-1 h-px bg-border-light" />
        <span className="text-xs text-text-tertiary">OR</span>
        <div className="flex-1 h-px bg-border-light" />
      </div>

      <Button
        variant="secondary"
        className="w-full"
        size="lg"
        onClick={() => alert('Google Login coming soon')}
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>

        Continue with Google
      </Button>

      <p className="text-center text-sm text-text-secondary mt-6">
        Don't have an account?{' '}
        <Link
          to="/register"
          className="text-primary hover:text-primary-400 font-medium transition-colors"
        >
          Start free trial
        </Link>
      </p>
    </AuthLayout>
  );
};

export default Login;