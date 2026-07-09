import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Store, Phone, ArrowRight } from 'lucide-react';
import AuthLayout from './AuthLayout';
import Button from '../../components/ui/Button';
import Input, { Select } from '../../components/ui/Input';
import { businessTypes } from '../../data/mockData';
import { supabase } from '../../lib/supabase';

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    businessName: '',
    businessType: '',
    phone: '',
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: {
          full_name: form.name,
          business_name: form.businessName,
          business_type: form.businessType,
          phone: form.phone,
        },
      },
    });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Account created successfully! Please verify your email.");

    navigate('/verify');
  };

  return (
    <AuthLayout
      title="Start your free trial"
      subtitle="14 days free · No credit card required"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Full Name"
          placeholder="Priya Sharma"
          icon={User}
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />

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

        <Input
          label="Business Name"
          placeholder="Dream Salon"
          icon={Store}
          value={form.businessName}
          onChange={(e) =>
            setForm({ ...form, businessName: e.target.value })
          }
          required
        />

        <div className="grid grid-cols-2 gap-3">
          <Select
            label="Business Type"
            value={form.businessType}
            onChange={(e) =>
              setForm({ ...form, businessType: e.target.value })
            }
            required
          >
            <option value="">Select type</option>

            {businessTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </Select>

          <Input
            label="Phone"
            placeholder="+91 98765 43210"
            icon={Phone}
            value={form.phone}
            onChange={(e) =>
              setForm({ ...form, phone: e.target.value })
            }
            required
          />
        </div>

        <label className="flex items-start gap-2 text-sm text-text-secondary cursor-pointer">
          <input
            type="checkbox"
            required
            className="mt-0.5 rounded border-border-light bg-surface text-primary focus:ring-primary"
          />
          I agree to the Terms of Service and Privacy Policy
        </label>

        <Button
          type="submit"
          variant="primary"
          className="w-full"
          size="lg"
          disabled={loading}
        >
          {loading ? "Creating Account..." : "Create Account"}

          <ArrowRight className="w-4 h-4" />
        </Button>
      </form>

      <p className="text-center text-sm text-text-secondary mt-6">
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-primary hover:text-primary-400 font-medium transition-colors"
        >
          Login
        </Link>
      </p>
    </AuthLayout>
  );
};

export default Register;