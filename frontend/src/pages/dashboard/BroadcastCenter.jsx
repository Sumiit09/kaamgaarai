import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send, Users, Calendar, Star, Tag, AlertTriangle, Sparkles,
  Clock, Wrench, Eye, BarChart3, History, Plus, CheckCircle,
  MessageCircle, ChevronRight, X, Edit3,
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import { Card, CardContent } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Input, { Textarea, Select } from '../../components/ui/Input';
import Avatar from '../../components/ui/Avatar';
import Tabs from '../../components/ui/Tabs';
import {
  broadcastTemplates, broadcastHistory, broadcastAudiences,
} from '../../data/mockData';

const iconMap = { Calendar, AlertTriangle, Tag, Sparkles, Wrench, Clock, Edit3 };

const tooltipStyle = {
  backgroundColor: '#18181B',
  border: '1px solid #27272A',
  borderRadius: '8px',
  fontSize: '12px',
  color: '#F8FAFC',
};

// ── Message Preview ───────────────────────────────────────────
const MessagePreview = ({ text, audience }) => (
  <div className="bg-surface rounded-xl border border-border-light p-4">
    <div className="flex items-center gap-2 mb-3 pb-2 border-b border-border-light">
      <div className="w-8 h-8 rounded-full bg-success/20 flex items-center justify-center">
        <MessageCircle className="w-4 h-4 text-success" />
      </div>
      <div>
        <p className="text-xs font-semibold text-text-primary">Dream Salon</p>
        <p className="text-2xs text-text-secondary">WhatsApp Broadcast</p>
      </div>
      <span className="ml-auto text-2xs text-text-tertiary">{new Date().toLocaleTimeString('en-IN',{hour:'2-digit',minute:'2-digit'})}</span>
    </div>
    <p className="text-sm text-text-primary leading-relaxed whitespace-pre-line">
      {text || 'Your message will appear here...'}
    </p>
    {audience && (
      <div className="mt-3 pt-2 border-t border-border-light flex items-center justify-between">
        <span className="text-2xs text-text-tertiary">To: {audience}</span>
        <Badge variant="info" size="sm">Preview</Badge>
      </div>
    )}
  </div>
);

// ── Tabs content ──────────────────────────────────────────────
const ComposeTab = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [selectedAudience, setSelectedAudience] = useState(null);
  const [message, setMessage] = useState('');
  const [scheduleDate, setScheduleDate] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');
  const [sendNow, setSendNow] = useState(true);
  const [sent, setSent] = useState(false);

  const handleTemplate = (t) => {
    setSelectedTemplate(t);
    setMessage(t.preview);
  };

  const handleSend = () => setSent(true);

  if (sent) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
        className="text-center py-16">
        <div className="w-16 h-16 rounded-full bg-success/15 flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-success" />
        </div>
        <p className="text-xl font-bold text-text-primary mb-2">Broadcast Sent!</p>
        <p className="text-sm text-text-secondary mb-1">Message delivered to {selectedAudience?.count || 312} customers</p>
        <p className="text-xs text-text-tertiary mb-6">WhatsApp delivery receipts will appear in 1–2 minutes</p>
        <Button variant="primary" size="sm" onClick={() => { setSent(false); setSelectedTemplate(null); setMessage(''); setSelectedAudience(null); }}>
          <Plus className="w-4 h-4" /> New Broadcast
        </Button>
      </motion.div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      {/* Left: composer */}
      <div className="lg:col-span-3 space-y-5">

        {/* Templates */}
        <Card>
          <CardContent>
            <p className="text-sm font-semibold text-text-primary mb-3">Message Templates</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {broadcastTemplates.map((t) => {
                const Icon = iconMap[t.icon] || Tag;
                return (
                  <motion.button
                    key={t.id}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => handleTemplate(t)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      selectedTemplate?.id === t.id
                        ? 'border-primary bg-primary/10'
                        : 'border-border-light hover:bg-card-hover'
                    }`}
                  >
                    <Icon className={`w-5 h-5 mb-2 ${selectedTemplate?.id === t.id ? 'text-primary' : 'text-text-secondary'}`} />
                    <p className="text-xs font-semibold text-text-primary">{t.name}</p>
                  </motion.button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Audience */}
        <Card>
          <CardContent>
            <p className="text-sm font-semibold text-text-primary mb-3">Select Audience</p>
            <div className="space-y-2">
              {broadcastAudiences.map((a) => {
                const Icon = { Users, CalendarCheck: Calendar, Calendar, Star }[a.icon] || Users;
                return (
                  <button key={a.id} onClick={() => setSelectedAudience(a)}
                    className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all ${
                      selectedAudience?.id === a.id
                        ? 'border-primary bg-primary/10'
                        : 'border-border-light hover:bg-card-hover'
                    }`}>
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${selectedAudience?.id === a.id ? 'bg-primary/20' : 'bg-surface'}`}>
                        <Icon className={`w-4 h-4 ${selectedAudience?.id === a.id ? 'text-primary' : 'text-text-secondary'}`} />
                      </div>
                      <p className="text-sm font-medium text-text-primary">{a.label}</p>
                    </div>
                    <span className="text-sm font-bold text-text-primary">{a.count}</span>
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Message */}
        <Card>
          <CardContent>
            <p className="text-sm font-semibold text-text-primary mb-3">Compose Message</p>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={5}
              placeholder="Type your message... Use {name} for customer name, {date} for date"
            />
            <div className="flex items-center gap-2 mt-2">
              {['{name}', '{date}', '{time}', '{service}'].map((v) => (
                <button key={v} onClick={() => setMessage((m) => m + v)}
                  className="px-2 py-1 rounded bg-surface border border-border-light text-2xs text-text-secondary hover:text-primary hover:border-primary/30 transition-colors">
                  {v}
                </button>
              ))}
              <span className="ml-auto text-2xs text-text-tertiary">{message.length}/500</span>
            </div>
          </CardContent>
        </Card>

        {/* Schedule */}
        <Card>
          <CardContent>
            <p className="text-sm font-semibold text-text-primary mb-3">Delivery</p>
            <div className="flex gap-2 mb-3">
              {[true, false].map((v) => (
                <button key={String(v)} onClick={() => setSendNow(v)}
                  className={`flex-1 py-2 rounded-lg border text-sm font-medium transition-colors ${
                    sendNow === v ? 'bg-primary text-white border-primary' : 'border-border-light text-text-secondary hover:text-text-primary'
                  }`}>
                  {v ? 'Send Now' : 'Schedule Later'}
                </button>
              ))}
            </div>
            {!sendNow && (
              <div className="grid grid-cols-2 gap-3">
                <Input label="Date" type="date" value={scheduleDate} onChange={(e) => setScheduleDate(e.target.value)} />
                <Input label="Time" type="time" value={scheduleTime} onChange={(e) => setScheduleTime(e.target.value)} />
              </div>
            )}
          </CardContent>
        </Card>

        <Button variant="primary" size="lg" className="w-full" onClick={handleSend}
          disabled={!message || !selectedAudience}>
          <Send className="w-4 h-4" />
          {sendNow ? `Send Now to ${selectedAudience?.count || '?'} customers` : 'Schedule Broadcast'}
        </Button>
      </div>

      {/* Right: live preview */}
      <div className="lg:col-span-2 space-y-4 lg:sticky lg:top-20">
        <div>
          <p className="text-sm font-semibold text-text-primary mb-2 flex items-center gap-1.5">
            <Eye className="w-4 h-4 text-text-tertiary" /> Live Preview
          </p>
          <MessagePreview text={message} audience={selectedAudience?.label} />
        </div>
        {selectedAudience && (
          <Card className="border-primary/20">
            <CardContent>
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-4 h-4 text-primary" />
                <p className="text-sm font-semibold text-primary">Audience Summary</p>
              </div>
              <p className="text-3xl font-bold text-text-primary">{selectedAudience.count}</p>
              <p className="text-sm text-text-secondary">{selectedAudience.label}</p>
              <div className="mt-3 space-y-1 text-xs text-text-secondary">
                <div className="flex justify-between"><span>WhatsApp</span><span className="text-text-primary font-medium">~{Math.round(selectedAudience.count * 0.89)}</span></div>
                <div className="flex justify-between"><span>Estimated read rate</span><span className="text-text-primary font-medium">~78%</span></div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

const HistoryTab = () => {
  return (
    <div className="space-y-4">
      {broadcastHistory.map((b, i) => (
        <motion.div
          key={b.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
        >
          <Card hover>
            <CardContent>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm font-semibold text-text-primary">{b.name}</p>
                    <Badge variant="success" size="sm">{b.status}</Badge>
                  </div>
                  <p className="text-xs text-text-secondary">{b.date} · {b.audience}</p>
                </div>
                <div className="flex gap-6 text-center">
                  {[
                    { label: 'Sent', value: b.sent },
                    { label: 'Delivered', value: b.delivered },
                    { label: 'Read', value: b.read },
                  ].map((s) => (
                    <div key={s.label}>
                      <p className="text-base font-bold text-text-primary">{s.value}</p>
                      <p className="text-2xs text-text-tertiary">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
              {/* Read rate bar */}
              <div className="mt-3">
                <div className="flex justify-between text-2xs text-text-tertiary mb-1">
                  <span>Read rate</span>
                  <span>{Math.round((b.read / b.sent) * 100)}%</span>
                </div>
                <div className="h-1.5 bg-surface rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(b.read / b.sent) * 100}%` }}
                    transition={{ duration: 0.8, delay: i * 0.1 }}
                    className="h-full bg-success rounded-full"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

const AnalyticsTab = () => {
  const chartData = broadcastHistory.map((b) => ({
    name: b.name.slice(0, 15) + '...',
    sent: b.sent,
    delivered: b.delivered,
    read: b.read,
  }));

  return (
    <div className="space-y-6">
      {/* Summary stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total Broadcasts', value: broadcastHistory.length, icon: Send, color: 'text-primary' },
          { label: 'Total Sent', value: broadcastHistory.reduce((s, b) => s + b.sent, 0).toLocaleString('en-IN'), icon: Users, color: 'text-accent' },
          { label: 'Avg. Delivery Rate', value: '93%', icon: CheckCircle, color: 'text-success' },
          { label: 'Avg. Read Rate', value: '78%', icon: Eye, color: 'text-warning' },
        ].map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="card-surface p-4">
            <s.icon className={`w-5 h-5 ${s.color} mb-2`} />
            <p className="text-2xl font-bold text-text-primary">{s.value}</p>
            <p className="text-xs text-text-secondary">{s.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Chart */}
      <Card>
        <CardContent>
          <h3 className="text-base font-semibold text-text-primary mb-1">Broadcast Performance</h3>
          <p className="text-xs text-text-secondary mb-4">Sent vs Delivered vs Read</p>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={chartData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" />
              <XAxis type="number" stroke="#64748B" fontSize={11} />
              <YAxis dataKey="name" type="category" stroke="#64748B" fontSize={10} width={110} />
              <Tooltip contentStyle={tooltipStyle} cursor={{ fill: '#1F293740' }} />
              <Bar dataKey="sent" fill="#27272A" radius={[0,4,4,0]} name="Sent" />
              <Bar dataKey="delivered" fill="#2563EB" radius={[0,4,4,0]} name="Delivered" />
              <Bar dataKey="read" fill="#22C55E" radius={[0,4,4,0]} name="Read" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

// ── Main ──────────────────────────────────────────────────────
const BroadcastCenter = () => {
  const [tab, setTab] = useState('compose');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-text-primary">Broadcast Center</h2>
          <p className="text-sm text-text-secondary">Send messages to your customers at scale</p>
        </div>
        <Badge variant="success" dot>WhatsApp Connected</Badge>
      </div>

      <Tabs
        tabs={[
          { value: 'compose', label: 'Compose' },
          { value: 'history', label: 'History' },
          { value: 'analytics', label: 'Analytics' },
        ]}
        activeTab={tab}
        onChange={setTab}
      />

      <AnimatePresence mode="wait">
        <motion.div key={tab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
          {tab === 'compose' && <ComposeTab />}
          {tab === 'history' && <HistoryTab />}
          {tab === 'analytics' && <AnalyticsTab />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default BroadcastCenter;
