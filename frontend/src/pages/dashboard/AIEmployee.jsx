import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bot, Send, Sparkles, Brain, Shield, AlertTriangle, Plus, Trash2,
  MessageCircle, Check, Zap, BookOpen, Target, Languages, Sliders,
  ChevronDown, ChevronUp, Info, Eye, EyeOff, RefreshCw,
} from 'lucide-react';
import { Card, CardContent } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Toggle from '../../components/ui/Toggle';
import Input, { Textarea, Select } from '../../components/ui/Input';
import Tabs from '../../components/ui/Tabs';
import ConversationBubble, { TypingIndicator } from '../../components/shared/ConversationBubble';
import { aiSettings, aiMemory, aiConfidenceThresholds, businessPromptTemplate } from '../../data/mockData';

// ─────────────────────────────────────────────────────────────
// Status card
// ─────────────────────────────────────────────────────────────
const StatusCard = ({ status, setStatus }) => {
  const configs = {
    online:   { color: 'success', label: 'Online — AI is responding',    dot: 'bg-success' },
    offline:  { color: 'danger',  label: 'Offline — AI is paused',       dot: 'bg-danger' },
    training: { color: 'warning', label: 'Training — Learning new data', dot: 'bg-warning' },
  };
  const cfg = configs[status];

  return (
    <Card>
      <CardContent>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Bot className="w-7 h-7 text-primary" />
              <span className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-card ${cfg.dot} animate-pulse`} />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-text-primary">AI Employee</h2>
              <p className={`text-sm text-${cfg.color} flex items-center gap-1.5 mt-0.5`}>
                <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} /> {cfg.label}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            {['online', 'offline', 'training'].map((s) => (
              <button key={s} onClick={() => setStatus(s)}
                className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
                  status === s ? 'bg-primary text-white' : 'bg-surface border border-border-light text-text-secondary hover:text-text-primary'
                }`}>
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Metrics row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-4 border-t border-border-light">
          {[
            { label: 'Accuracy', value: '96.8%', color: 'text-success' },
            { label: 'Avg Response', value: '1.2s', color: 'text-accent' },
            { label: 'Today Handled', value: '47', color: 'text-primary' },
            { label: 'Escalated', value: '2', color: 'text-warning' },
          ].map((m, i) => (
            <div key={i} className="text-center p-3 bg-surface rounded-lg border border-border-light">
              <p className={`text-xl font-bold ${m.color}`}>{m.value}</p>
              <p className="text-xs text-text-tertiary mt-0.5">{m.label}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

// ─────────────────────────────────────────────────────────────
// Tab: Personality
// ─────────────────────────────────────────────────────────────
const PersonalityTab = ({ greeting, setGreeting, language, setLanguage, tone, setTone, fallback, setFallback }) => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
    <Card>
      <CardContent>
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-primary" />
          <h3 className="text-base font-semibold text-text-primary">Greeting Message</h3>
        </div>
        <Textarea value={greeting} onChange={(e) => setGreeting(e.target.value)} rows={4}
          placeholder="Namaste! Dream Salon mein aapka swagat hai..." />
        <p className="text-xs text-text-tertiary mt-2">Sent when a customer starts a new conversation.</p>
      </CardContent>
    </Card>
    <Card>
      <CardContent>
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle className="w-5 h-5 text-warning" />
          <h3 className="text-base font-semibold text-text-primary">Fallback Message</h3>
        </div>
        <Textarea value={fallback} onChange={(e) => setFallback(e.target.value)} rows={4}
          placeholder="Main abhi check karke aapko bataati hoon — 1 minute please!" />
        <p className="text-xs text-text-tertiary mt-2">Sent when AI is unsure or confidence is low.</p>
      </CardContent>
    </Card>
    <Card>
      <CardContent>
        <div className="flex items-center gap-2 mb-4">
          <Languages className="w-5 h-5 text-accent" />
          <h3 className="text-base font-semibold text-text-primary">Language</h3>
        </div>
        <Select value={language} onChange={(e) => setLanguage(e.target.value)}>
          {aiSettings.languages.map((l) => <option key={l.value} value={l.value}>{l.label}</option>)}
        </Select>
        <div className="mt-3 p-3 bg-primary/5 border border-primary/20 rounded-lg">
          <p className="text-xs text-text-secondary">
            <span className="text-primary font-medium">Hinglish</span> recommended for Indian small businesses — customers feel more comfortable.
          </p>
        </div>
      </CardContent>
    </Card>
    <Card>
      <CardContent>
        <div className="flex items-center gap-2 mb-4">
          <Sliders className="w-5 h-5 text-success" />
          <h3 className="text-base font-semibold text-text-primary">Conversation Tone</h3>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {aiSettings.tones.map((t) => (
            <button key={t.value} onClick={() => setTone(t.value)}
              className={`py-2.5 rounded-lg text-sm font-medium border transition-colors ${
                tone === t.value ? 'bg-primary text-white border-primary' : 'border-border-light text-text-secondary hover:text-text-primary hover:border-primary/30'
              }`}>
              {t.label}
            </button>
          ))}
        </div>
        <p className="text-xs text-text-tertiary mt-3">
          {tone === 'professional' && 'Formal language, respectful tone, business-like communication.'}
          {tone === 'friendly' && 'Warm, approachable — like talking to a helpful staff member.'}
          {tone === 'casual' && 'Relaxed, informal — great for youth-oriented businesses.'}
        </p>
      </CardContent>
    </Card>
  </div>
);

// ─────────────────────────────────────────────────────────────
// Tab: Rules & Memory
// ─────────────────────────────────────────────────────────────
const RulesMemoryTab = ({ rules, setRules, escalations }) => {
  const [newRule, setNewRule] = useState('');
  const [newEsc, setNewEsc] = useState('');
  const [localEsc, setLocalEsc] = useState(escalations);
  const [memory, setMemory] = useState(aiMemory);

  const addRule = () => { if (!newRule.trim()) return; setRules([...rules, newRule]); setNewRule(''); };
  const addEsc = () => { if (!newEsc.trim()) return; setLocalEsc([...localEsc, newEsc]); setNewEsc(''); };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      {/* Business Rules */}
      <Card>
        <CardContent>
          <div className="flex items-center gap-2 mb-4">
            <Shield className="w-5 h-5 text-success" />
            <h3 className="text-base font-semibold text-text-primary">Business Rules</h3>
            <Badge variant="success" size="sm" className="ml-auto">{rules.length}</Badge>
          </div>
          <div className="space-y-2 mb-3 max-h-56 overflow-y-auto">
            {rules.map((rule, i) => (
              <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="flex items-center gap-2.5 p-2.5 bg-surface rounded-lg border border-border-light group">
                <Check className="w-4 h-4 text-success shrink-0" />
                <span className="text-sm text-text-primary flex-1">{rule}</span>
                <button onClick={() => setRules(rules.filter((_, j) => j !== i))}
                  className="opacity-0 group-hover:opacity-100 text-text-tertiary hover:text-danger transition-all">
                  <Trash2 className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </div>
          <div className="flex gap-2">
            <Input placeholder="Add a business rule..." value={newRule}
              onChange={(e) => setNewRule(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addRule()} />
            <Button variant="secondary" size="icon" onClick={addRule}><Plus className="w-4 h-4" /></Button>
          </div>
        </CardContent>
      </Card>

      {/* Escalation Rules */}
      <Card>
        <CardContent>
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-5 h-5 text-warning" />
            <h3 className="text-base font-semibold text-text-primary">Escalation Rules</h3>
            <Badge variant="warning" size="sm" className="ml-auto">{localEsc.length}</Badge>
          </div>
          <div className="space-y-2 mb-3 max-h-56 overflow-y-auto">
            {localEsc.map((rule, i) => (
              <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="flex items-center gap-2.5 p-2.5 bg-warning/5 rounded-lg border border-warning/20 group">
                <AlertTriangle className="w-4 h-4 text-warning shrink-0" />
                <span className="text-sm text-text-primary flex-1">{rule}</span>
                <button onClick={() => setLocalEsc(localEsc.filter((_, j) => j !== i))}
                  className="opacity-0 group-hover:opacity-100 text-text-tertiary hover:text-danger transition-all">
                  <Trash2 className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </div>
          <div className="flex gap-2">
            <Input placeholder="Add an escalation rule..." value={newEsc}
              onChange={(e) => setNewEsc(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addEsc()} />
            <Button variant="secondary" size="icon" onClick={addEsc}><Plus className="w-4 h-4" /></Button>
          </div>
        </CardContent>
      </Card>

      {/* AI Memory */}
      <Card className="lg:col-span-2">
        <CardContent>
          <div className="flex items-center gap-2 mb-4">
            <Brain className="w-5 h-5 text-accent" />
            <h3 className="text-base font-semibold text-text-primary">AI Memory</h3>
            <p className="text-xs text-text-secondary ml-2">What your AI remembers about each customer</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {memory.map((m, i) => (
              <div key={m.key} className={`p-3 rounded-xl border transition-colors ${m.enabled ? 'border-primary/30 bg-primary/5' : 'border-border-light bg-surface'}`}>
                <div className="flex items-center justify-between mb-1.5">
                  <p className="text-sm font-medium text-text-primary">{m.label}</p>
                  <Toggle checked={m.enabled} onChange={(v) => setMemory(memory.map((x, j) => j === i ? { ...x, enabled: v } : x))} size="sm" />
                </div>
                <p className="text-xs text-text-secondary">{m.desc}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// Tab: AI Confidence
// ─────────────────────────────────────────────────────────────
const ConfidenceTab = () => {
  const [thresholds, setThresholds] = useState({ high: 90, medium: 70 });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <Card>
        <CardContent>
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-5 h-5 text-primary" />
            <h3 className="text-base font-semibold text-text-primary">Confidence Thresholds</h3>
          </div>
          <div className="space-y-4">
            {[
              { key: 'high', label: 'High Confidence — Auto Reply', desc: 'AI replies automatically without review', color: 'success', value: thresholds.high },
              { key: 'medium', label: 'Medium Confidence — Flag for Review', desc: 'AI replies but marks for human review', color: 'warning', value: thresholds.medium },
            ].map((t) => (
              <div key={t.key}>
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="text-sm font-medium text-text-primary">{t.label}</p>
                    <p className="text-xs text-text-secondary">{t.desc}</p>
                  </div>
                  <span className={`text-lg font-bold text-${t.color}`}>≥{t.value}%</span>
                </div>
                <input type="range" min="50" max="99" value={t.value}
                  onChange={(e) => setThresholds({ ...thresholds, [t.key]: Number(e.target.value) })}
                  className="w-full h-2 bg-surface rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
                />
              </div>
            ))}
            <div className="p-3 bg-danger/5 border border-danger/20 rounded-lg flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-danger shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-danger">Low Confidence — Escalate to Human</p>
                <p className="text-xs text-text-secondary">Below {thresholds.medium}% · Always escalates to you</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <div className="flex items-center gap-2 mb-4">
            <BarChart className="w-5 h-5 text-accent" />
            <h3 className="text-base font-semibold text-text-primary">Confidence Distribution (Today)</h3>
          </div>
          <div className="space-y-3">
            {[
              { label: 'High (≥90%)', count: 38, total: 47, color: 'bg-success' },
              { label: 'Medium (70–90%)', count: 7, total: 47, color: 'bg-warning' },
              { label: 'Low (<70%)', count: 2, total: 47, color: 'bg-danger' },
            ].map((b, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-text-secondary">{b.label}</span>
                  <span className="text-text-primary font-medium">{b.count} messages</span>
                </div>
                <div className="h-2 bg-surface rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${(b.count / b.total) * 100}%` }}
                    transition={{ duration: 0.8, delay: i * 0.1 }}
                    className={`h-full rounded-full ${b.color}`} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 bg-success/5 border border-success/20 rounded-lg">
            <p className="text-sm font-medium text-success">96.8% AI Accuracy</p>
            <p className="text-xs text-text-secondary mt-0.5">Only 2 conversations escalated to human today</p>
          </div>
        </CardContent>
      </Card>

      <Card className="lg:col-span-2">
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-warning" />
              <h3 className="text-base font-semibold text-text-primary">Business Prompt</h3>
            </div>
            <Badge variant="warning" size="sm">Advanced</Badge>
          </div>
          <Textarea value={businessPromptTemplate} rows={12} className="font-mono text-xs"
            onChange={() => {}} />
          <p className="text-xs text-text-tertiary mt-2">Variables like {'{businessName}'} are auto-filled from your Business Profile.</p>
        </CardContent>
      </Card>
    </div>
  );
};

const BarChart = ({ className }) => <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20V10M18 20V4M6 20v-4" /></svg>;

// ─────────────────────────────────────────────────────────────
// Tab: Training Playground / Simulator
// ─────────────────────────────────────────────────────────────
const PlaygroundTab = () => {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'ai', text: aiSettings.greeting, time: 'Now' },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);

  const aiReplies = [
    'Haan bilkul! Kal 3 baje slot available hai. Kaunsi service chahiye?',
    'Humare paas Facial Basic (₹500) aur Premium (₹900) hai. Kaunsa prefer karenge?',
    'Booking confirm ho gayi! Aapko reminder bhi milega 1 ghante pehle. 🎉',
    'Hmare working hours hain: Monday se Saturday, 9 AM se 9 PM tak.',
    'Main abhi check karke aapko bataati hoon — 1 minute please! 🙏',
  ];

  const sendMsg = () => {
    if (!input.trim()) return;
    const msg = { id: Date.now(), sender: 'customer', text: input, time: 'Now' };
    setMessages((prev) => [...prev, msg]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      const reply = aiReplies[Math.floor(Math.random() * aiReplies.length)];
      setMessages((prev) => [...prev, { id: Date.now()+1, sender: 'ai', text: reply, time: 'Now' }]);
    }, 1500);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
      <div className="lg:col-span-2">
        <Card>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-primary" />
                <h3 className="text-base font-semibold text-text-primary">Training Playground</h3>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="success" dot>Live Simulation</Badge>
                <button onClick={() => setMessages([{ id: 1, sender: 'ai', text: aiSettings.greeting, time: 'Now' }])}
                  className="p-1.5 text-text-tertiary hover:text-text-primary transition-colors">
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="bg-surface rounded-xl border border-border-light p-4 h-[400px] overflow-y-auto space-y-3">
              {messages.map((msg, i) => (
                <ConversationBubble key={msg.id} message={msg} index={i} />
              ))}
              {typing && <TypingIndicator />}
            </div>
            <div className="flex gap-2 mt-3">
              <input value={input} onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMsg()}
                placeholder="Test your AI — type as a customer..."
                className="flex-1 bg-surface border border-border-light rounded-lg px-4 py-2.5 text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-primary" />
              <Button variant="primary" onClick={sendMsg}><Send className="w-4 h-4" /></Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <Card>
          <CardContent>
            <p className="text-sm font-semibold text-text-primary mb-3">Quick Test Scenarios</p>
            <div className="space-y-1.5">
              {[
                'Kal 3 baje slot hai kya?',
                'Hair color kitne ka hai?',
                'Kya Sunday ko open ho?',
                'Booking cancel karna hai',
                'Address kya hai aapka?',
                'Staff kaun kaun hai?',
                'Discount milega kya?',
              ].map((q) => (
                <button key={q} onClick={() => setInput(q)}
                  className="w-full text-left px-3 py-2 rounded-lg bg-surface border border-border-light text-sm text-text-secondary hover:text-primary hover:border-primary/30 transition-colors flex items-center justify-between group">
                  {q}
                  <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-primary/20">
          <CardContent>
            <div className="flex items-center gap-2 mb-3">
              <Target className="w-4 h-4 text-primary" />
              <p className="text-sm font-semibold text-text-primary">AI Performance</p>
            </div>
            <div className="space-y-2">
              {[
                { label: 'Booking queries', score: 98 },
                { label: 'Pricing questions', score: 95 },
                { label: 'Hours/Location', score: 99 },
                { label: 'Complaints', score: 82 },
              ].map((s, i) => (
                <div key={i}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-text-secondary">{s.label}</span>
                    <span className="text-text-primary font-medium">{s.score}%</span>
                  </div>
                  <div className="h-1.5 bg-surface rounded-full overflow-hidden">
                    <div className="h-full rounded-full bg-primary" style={{ width: `${s.score}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────────────────────
const AIEmployee = () => {
  const [status, setStatus] = useState('online');
  const [tab, setTab] = useState('personality');
  const [greeting, setGreeting] = useState(aiSettings.greeting);
  const [fallback, setFallback] = useState('Main abhi check karke aapko bataati hoon — 1 minute please!');
  const [language, setLanguage] = useState(aiSettings.language);
  const [tone, setTone] = useState(aiSettings.tone);
  const [rules, setRules] = useState(aiSettings.businessRules);
  const escalations = aiSettings.escalationRules;

  return (
    <div className="space-y-6">
      <StatusCard status={status} setStatus={setStatus} />

      <Tabs
        tabs={[
          { value: 'personality', label: 'Personality' },
          { value: 'rules', label: 'Rules & Memory' },
          { value: 'confidence', label: 'AI Confidence' },
          { value: 'playground', label: 'Playground' },
        ]}
        activeTab={tab}
        onChange={setTab}
      />

      <AnimatePresence mode="wait">
        <motion.div key={tab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
          {tab === 'personality' && (
            <PersonalityTab greeting={greeting} setGreeting={setGreeting}
              language={language} setLanguage={setLanguage}
              tone={tone} setTone={setTone}
              fallback={fallback} setFallback={setFallback} />
          )}
          {tab === 'rules' && (
            <RulesMemoryTab rules={rules} setRules={setRules} escalations={escalations} />
          )}
          {tab === 'confidence' && <ConfidenceTab />}
          {tab === 'playground' && <PlaygroundTab />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default AIEmployee;
