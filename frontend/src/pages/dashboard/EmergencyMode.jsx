import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AlertTriangle, XCircle, Clock, LogOut, CloudRain, Zap, Wrench,
  PartyPopper, UserMinus, Edit3, Send, Eye, Calendar, CheckCircle,
  RefreshCw, ChevronRight,
} from 'lucide-react';
import { Card, CardContent } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Input, { Textarea, Select } from '../../components/ui/Input';
import { emergencyTypes } from '../../data/mockData';

const iconMap = {
  XCircle, Clock, LogOut, CloudRain, Zap, Wrench, PartyPopper, UserMinus, Edit3,
};

// ── Announcement Preview Card ─────────────────────────────────
const AnnouncementPreview = ({ type, message, date, time, duration }) => {
  if (!type) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-2xl border"
      style={{ borderColor: `${type.color}40` }}
    >
      <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${type.color}15, transparent)` }} />
      <div className="relative p-5">
        {/* WhatsApp-style header */}
        <div className="flex items-center gap-3 mb-4 pb-3 border-b" style={{ borderColor: `${type.color}30` }}>
          <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${type.color}20` }}>
            <AlertTriangle className="w-5 h-5" style={{ color: type.color }} />
          </div>
          <div>
            <p className="text-sm font-semibold text-text-primary">Dream Salon — Important Update</p>
            <p className="text-xs text-text-secondary">WhatsApp Broadcast</p>
          </div>
          <Badge variant="warning" size="sm" className="ml-auto">Preview</Badge>
        </div>
        <div className="space-y-2">
          <p className="text-sm text-text-primary leading-relaxed whitespace-pre-line">{message || type.msg}</p>
          <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t" style={{ borderColor: `${type.color}20` }}>
            {date && (
              <span className="flex items-center gap-1 text-xs text-text-secondary">
                <Calendar className="w-3.5 h-3.5" /> {date}
              </span>
            )}
            {time && (
              <span className="flex items-center gap-1 text-xs text-text-secondary">
                <Clock className="w-3.5 h-3.5" /> {time}
              </span>
            )}
            {duration && (
              <span className="flex items-center gap-1 text-xs text-text-secondary">
                <RefreshCw className="w-3.5 h-3.5" /> For {duration}
              </span>
            )}
          </div>
        </div>
        <p className="text-2xs text-text-tertiary mt-3">— Dream Salon, Pune | {new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</p>
      </div>
    </motion.div>
  );
};

// ── History item ──────────────────────────────────────────────
const historyItems = [
  { id: 1, type: 'rain', label: 'Heavy Rain Closure', date: 'Jul 1, 2024', duration: '4 hours', notified: 23, color: '#06B6D4' },
  { id: 2, type: 'festival', label: 'Eid Celebration', date: 'Jun 17, 2024', duration: 'Full day', notified: 312, color: '#22C55E' },
  { id: 3, type: 'maintenance', label: 'AC Maintenance', date: 'Jun 10, 2024', duration: '3 hours', notified: 8, color: '#6366F1' },
];

const EmergencyMode = () => {
  const [selected, setSelected] = useState(null);
  const [message, setMessage] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [duration, setDuration] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [step, setStep] = useState(1); // 1=select, 2=configure, 3=preview

  const handleSelect = (t) => {
    setSelected(t);
    setMessage(t.msg);
    setStep(2);
  };

  const handleActivate = () => {
    setIsActive(true);
    setConfirmOpen(false);
    setStep(3);
  };

  const handleDeactivate = () => {
    setIsActive(false);
    setSelected(null);
    setMessage('');
    setStep(1);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-text-primary">Emergency Mode</h2>
          <p className="text-sm text-text-secondary">Instantly notify customers about closures or changes</p>
        </div>
        {isActive && (
          <Badge variant="danger" size="lg" dot className="animate-pulse">
            Emergency Active
          </Badge>
        )}
      </div>

      {/* Active emergency banner */}
      <AnimatePresence>
        {isActive && selected && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="relative overflow-hidden rounded-2xl border border-danger/50 bg-danger/5 p-5"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-danger to-orange-500 animate-pulse" />
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-danger/20 flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-danger" />
                </div>
                <div>
                  <p className="text-base font-bold text-danger">Emergency Active: {selected.label}</p>
                  <p className="text-sm text-text-secondary">{message.slice(0, 80)}...</p>
                  <p className="text-xs text-text-tertiary mt-1">312 customers notified · Started {time || '10:30 AM'}</p>
                </div>
              </div>
              <Button variant="secondary" size="sm" onClick={handleDeactivate}>
                <CheckCircle className="w-4 h-4 text-success" /> Deactivate
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Step flow */}
        <div className="lg:col-span-2 space-y-5">

          {/* Step 1 — Select type */}
          <Card className={step >= 1 ? '' : 'opacity-50 pointer-events-none'}>
            <CardContent>
              <div className="flex items-center gap-2 mb-4">
                <span className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold ${step >= 1 ? 'bg-primary text-white' : 'bg-surface text-text-tertiary'}`}>1</span>
                <p className="text-base font-semibold text-text-primary">Select Emergency Type</p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {emergencyTypes.map((t) => {
                  const Icon = iconMap[t.icon] || AlertTriangle;
                  return (
                    <motion.button
                      key={t.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleSelect(t)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        selected?.id === t.id
                          ? 'border-primary bg-primary/10'
                          : 'border-border-light hover:border-border-light hover:bg-card-hover'
                      }`}
                    >
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-2" style={{ backgroundColor: `${t.color}20` }}>
                        <Icon className="w-5 h-5" style={{ color: t.color }} />
                      </div>
                      <p className="text-sm font-medium text-text-primary leading-snug">{t.label}</p>
                    </motion.button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Step 2 — Configure */}
          <AnimatePresence>
            {step >= 2 && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <Card>
                  <CardContent>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">2</span>
                      <p className="text-base font-semibold text-text-primary">Configure Details</p>
                    </div>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <Input label="Date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                        <Input label="Time" type="time" value={time} onChange={(e) => setTime(e.target.value)} />
                        <Select label="Duration" value={duration} onChange={(e) => setDuration(e.target.value)}>
                          <option value="">Select duration</option>
                          <option value="1 hour">1 hour</option>
                          <option value="2 hours">2 hours</option>
                          <option value="4 hours">4 hours</option>
                          <option value="Half day">Half day</option>
                          <option value="Full day">Full day</option>
                          <option value="2 days">2 days</option>
                          <option value="Until further notice">Until further notice</option>
                        </Select>
                      </div>
                      <Textarea
                        label="Custom Message (sent to customers via WhatsApp)"
                        rows={4}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Write your message to customers..."
                      />
                      <div className="flex gap-2">
                        <Button variant="secondary" className="flex-1" onClick={() => setPreviewOpen(true)}>
                          <Eye className="w-4 h-4" /> Preview
                        </Button>
                        <Button variant="danger" className="flex-1" onClick={() => setConfirmOpen(true)}>
                          <Send className="w-4 h-4" /> Activate & Notify
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Step 3 — Confirmation */}
          <AnimatePresence>
            {step === 3 && isActive && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <Card className="border-success/30">
                  <CardContent>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="w-7 h-7 rounded-full bg-success text-white flex items-center justify-center text-sm font-bold">3</span>
                      <p className="text-base font-semibold text-success">Emergency Activated</p>
                    </div>
                    <div className="grid grid-cols-3 gap-3 text-center">
                      {[
                        { label: 'Notified', value: '312' },
                        { label: 'Delivered', value: '298' },
                        { label: 'Read', value: '241' },
                      ].map((s, i) => (
                        <div key={i} className="p-3 bg-surface rounded-lg border border-border-light">
                          <p className="text-2xl font-bold text-text-primary">{s.value}</p>
                          <p className="text-xs text-text-secondary">{s.label}</p>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-text-tertiary mt-3 text-center">
                      AI Employee has been notified and will use this status in all conversations.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right: Preview + History */}
        <div className="space-y-4">
          {/* Live preview */}
          {selected && (
            <div>
              <p className="text-sm font-semibold text-text-primary mb-2 flex items-center gap-1.5">
                <Eye className="w-4 h-4 text-text-tertiary" /> Message Preview
              </p>
              <AnnouncementPreview type={selected} message={message} date={date} time={time} duration={duration} />
            </div>
          )}

          {/* History */}
          <Card>
            <CardContent>
              <p className="text-sm font-semibold text-text-primary mb-3">Recent Emergency History</p>
              <div className="space-y-2">
                {historyItems.map((h, i) => (
                  <motion.div key={h.id} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                    className="p-3 bg-surface rounded-lg border border-border-light">
                    <div className="flex items-start gap-2.5">
                      <span className="w-2.5 h-2.5 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: h.color }} />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-text-primary">{h.label}</p>
                        <p className="text-xs text-text-secondary">{h.date} · {h.duration}</p>
                        <p className="text-2xs text-text-tertiary">{h.notified} customers notified</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Confirm modal */}
      <AnimatePresence>
        {confirmOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setConfirmOpen(false)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative w-full max-w-sm bg-card border border-danger/40 rounded-2xl p-6 shadow-float"
            >
              <div className="w-14 h-14 rounded-2xl bg-danger/15 flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-7 h-7 text-danger" />
              </div>
              <h3 className="text-base font-bold text-text-primary text-center mb-1">Confirm Emergency Activation</h3>
              <p className="text-sm text-text-secondary text-center mb-5">
                This will send an immediate WhatsApp message to <span className="text-text-primary font-medium">312 customers</span> and update your AI Employee's status.
              </p>
              <div className="flex gap-2">
                <Button variant="ghost" className="flex-1" onClick={() => setConfirmOpen(false)}>Cancel</Button>
                <Button variant="danger" className="flex-1" onClick={handleActivate}>
                  Yes, Activate
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EmergencyMode;
