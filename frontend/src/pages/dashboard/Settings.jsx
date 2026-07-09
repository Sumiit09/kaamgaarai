import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Building2, Shield, Bell, Key, AlertTriangle, Camera, Copy } from 'lucide-react';
import { Card, CardContent } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Input, { Textarea, Select } from '../../components/ui/Input';
import Toggle from '../../components/ui/Toggle';
import Tabs from '../../components/ui/Tabs';
import Avatar from '../../components/ui/Avatar';
import { businessInfo, businessTypes, indianCities, indianStates } from '../../data/mockData';

const Settings = () => {
  const [tab, setTab] = useState('profile');
  const [notif, setNotif] = useState({ email: true, whatsapp: true, bookings: true, aiAlerts: false });

  const tabs = [
    { value: 'profile', label: 'Profile' },
    { value: 'business', label: 'Business' },
    { value: 'security', label: 'Security' },
    { value: 'notifications', label: 'Notifications' },
    { value: 'api', label: 'API Keys' },
    { value: 'danger', label: 'Danger Zone' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-text-primary">Settings</h2>
        <p className="text-sm text-text-secondary">Manage your account and business preferences</p>
      </div>

      <Tabs tabs={tabs} activeTab={tab} onChange={setTab} />

      {tab === 'profile' && (
        <Card>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-2 mb-2">
              <User className="w-5 h-5 text-primary" />
              <h3 className="text-base font-semibold text-text-primary">Profile</h3>
            </div>
            <div className="flex items-center gap-4">
              <Avatar name={businessInfo.owner} size="xl" color="primary" />
              <div>
                <Button variant="secondary" size="sm"><Camera className="w-4 h-4" /> Change Photo</Button>
                <p className="text-xs text-text-tertiary mt-2">JPG, PNG up to 2MB</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input label="Full Name" defaultValue={businessInfo.owner} />
              <Input label="Email" defaultValue={businessInfo.email} />
              <Input label="Phone" defaultValue={businessInfo.phone} />
              <Select label="Role" defaultValue="Owner">
                <option>Owner</option>
                <option>Manager</option>
                <option>Staff</option>
              </Select>
            </div>
            <Button variant="primary" size="sm">Save Changes</Button>
          </CardContent>
        </Card>
      )}

      {tab === 'business' && (
        <Card>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-2 mb-2">
              <Building2 className="w-5 h-5 text-accent" />
              <h3 className="text-base font-semibold text-text-primary">Business Information</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input label="Business Name" defaultValue={businessInfo.name} />
              <Select label="Category" defaultValue="Salon">
                {businessTypes.map((t) => <option key={t}>{t}</option>)}
              </Select>
              <Select label="City" defaultValue="Pune">
                {indianCities.map((c) => <option key={c}>{c}</option>)}
              </Select>
              <Select label="State" defaultValue="Maharashtra">
                {indianStates.map((s) => <option key={s}>{s}</option>)}
              </Select>
              <Input label="Phone" defaultValue={businessInfo.phone} />
              <Input label="Email" defaultValue={businessInfo.email} />
              <Input label="Address" defaultValue="FC Road, Shivajinagar, Pune" className="sm:col-span-2" />
              <Input label="Working Hours" defaultValue="Mon-Sun: 9 AM - 9 PM" className="sm:col-span-2" />
            </div>
            <Button variant="primary" size="sm">Save Changes</Button>
          </CardContent>
        </Card>
      )}

      {tab === 'security' && (
        <Card>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-5 h-5 text-success" />
              <h3 className="text-base font-semibold text-text-primary">Security</h3>
            </div>
            <div className="space-y-4">
              <Input label="Current Password" type="password" placeholder="••••••••" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input label="New Password" type="password" placeholder="••••••••" />
                <Input label="Confirm Password" type="password" placeholder="••••••••" />
              </div>
              <Button variant="primary" size="sm">Update Password</Button>
            </div>
            <div className="border-t border-border-light pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-text-primary">Two-Factor Authentication</p>
                  <p className="text-xs text-text-secondary">Add an extra layer of security to your account</p>
                </div>
                <Toggle checked={false} onChange={() => {}} />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {tab === 'notifications' && (
        <Card>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <Bell className="w-5 h-5 text-warning" />
              <h3 className="text-base font-semibold text-text-primary">Notification Preferences</h3>
            </div>
            {[
              { key: 'email', label: 'Email Notifications', desc: 'Receive updates via email' },
              { key: 'whatsapp', label: 'WhatsApp Alerts', desc: 'Get alerts on your WhatsApp' },
              { key: 'bookings', label: 'Booking Confirmations', desc: 'Notify when a booking is made' },
              { key: 'aiAlerts', label: 'AI Escalation Alerts', desc: 'Alert when AI needs human help' },
            ].map((n) => (
              <div key={n.key} className="flex items-center justify-between p-3 bg-surface rounded-lg border border-border-light">
                <div>
                  <p className="text-sm font-medium text-text-primary">{n.label}</p>
                  <p className="text-xs text-text-secondary">{n.desc}</p>
                </div>
                <Toggle checked={notif[n.key]} onChange={(v) => setNotif({ ...notif, [n.key]: v })} />
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {tab === 'api' && (
        <Card>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <Key className="w-5 h-5 text-primary" />
              <h3 className="text-base font-semibold text-text-primary">API Keys</h3>
            </div>
            {[
              { name: 'Production Key', key: 'kg_live_pX4t9K2mN8qR3wY6vB1cD5eF' },
              { name: 'Test Key', key: 'kg_test_aH7bC1dE5fG2jK9lM3nO6pQ' },
            ].map((k, i) => (
              <div key={i} className="p-3 bg-surface rounded-lg border border-border-light">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-text-primary">{k.name}</p>
                  <Badge variant="success" size="sm">Active</Badge>
                </div>
                <div className="flex items-center gap-2">
                  <code className="flex-1 text-xs text-text-secondary font-mono bg-background px-3 py-2 rounded border border-border-light truncate">{k.key}</code>
                  <button className="p-2 text-text-tertiary hover:text-primary transition-colors"><Copy className="w-4 h-4" /></button>
                </div>
              </div>
            ))}
            <Button variant="secondary" size="sm">Generate New Key</Button>
          </CardContent>
        </Card>
      )}

      {tab === 'danger' && (
        <Card className="border-danger/30">
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-5 h-5 text-danger" />
              <h3 className="text-base font-semibold text-danger">Danger Zone</h3>
            </div>
            <div className="p-4 bg-danger/5 border border-danger/20 rounded-lg">
              <p className="text-sm font-medium text-text-primary mb-1">Delete Account</p>
              <p className="text-xs text-text-secondary mb-3">Once you delete your account, there is no going back. All your data, conversations, and customer history will be permanently removed.</p>
              <Button variant="danger" size="sm">Delete Account</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Settings;
