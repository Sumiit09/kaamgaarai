import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageCircle, Instagram, Facebook, Globe, Mail, Phone,
  Calendar, MapPin, CreditCard, Webhook, Key, Check, X,
  ExternalLink, Settings, ChevronRight, Zap, Shield, RefreshCw,
} from 'lucide-react';
import { Card, CardContent } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Tabs from '../../components/ui/Tabs';
import { enhancedIntegrations } from '../../data/mockData';

const iconMap = {
  MessageCircle, Instagram, Facebook, Globe, Mail, Phone,
  Calendar, MapPin, CreditCard, Webhook, Key,
};

const categoryOrder = ['Messaging', 'Website', 'Calendar', 'Location', 'Payments', 'Voice'];

// ── Integration Card ──────────────────────────────────────────
const IntegCard = ({ integration: intg, index }) => {
  const [connected, setConnected] = useState(intg.status === 'connected');
  const [loading, setLoading] = useState(false);
  const Icon = iconMap[intg.icon] || Globe;

  const handleConnect = () => {
    if (intg.status === 'coming_soon') return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setConnected(!connected); }, 1200);
  };

  const isComingSoon = intg.status === 'coming_soon';

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      whileHover={!isComingSoon ? { scale: 1.02 } : {}}
      className={`relative bg-card border rounded-2xl p-5 flex flex-col gap-4 group transition-all ${
        connected ? 'border-border-light' : isComingSoon ? 'border-border-light opacity-60' : 'border-border-light hover:border-primary/30'
      }`}
    >
      {/* Connected glow line */}
      {connected && (
        <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-success/60 to-transparent" />
      )}

      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl border border-border-light flex items-center justify-center group-hover:border-primary/30 transition-colors"
            style={{ backgroundColor: `${intg.color}15` }}>
            <Icon className="w-6 h-6" style={{ color: intg.color }} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold text-text-primary">{intg.name}</p>
              {intg.badge && <Badge variant="success" size="sm">{intg.badge}</Badge>}
            </div>
            <p className="text-xs text-text-tertiary">{intg.category}</p>
          </div>
        </div>
        {connected
          ? <Badge variant="success" dot size="sm">Connected</Badge>
          : isComingSoon
          ? <Badge variant="warning" size="sm">Soon</Badge>
          : <Badge variant="neutral" size="sm">Available</Badge>}
      </div>

      {/* Description */}
      <p className="text-xs text-text-secondary leading-relaxed flex-1">{intg.desc}</p>

      {/* Connected details */}
      {connected && intg.connectedAs && (
        <div className="flex items-center gap-2 px-3 py-2 bg-success/5 border border-success/20 rounded-lg">
          <Check className="w-3.5 h-3.5 text-success shrink-0" />
          <p className="text-xs text-text-secondary">{intg.connectedAs}</p>
        </div>
      )}

      {/* Stats */}
      {connected && intg.stats && (
        <div className="flex items-center justify-between text-xs">
          <span className="text-text-tertiary">{intg.stats.label}</span>
          <span className="font-semibold text-text-primary">{intg.stats.value}</span>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-2">
        {connected ? (
          <>
            <Button variant="ghost" size="sm" className="flex-1">
              <Settings className="w-3.5 h-3.5" /> Configure
            </Button>
            <Button variant="ghost" size="sm" onClick={handleConnect}
              className="text-danger hover:text-danger hover:bg-danger/10">
              Disconnect
            </Button>
          </>
        ) : (
          <Button variant={isComingSoon ? 'ghost' : 'secondary'} size="sm" className="w-full"
            disabled={isComingSoon || loading} onClick={handleConnect}>
            {loading
              ? <><RefreshCw className="w-3.5 h-3.5 animate-spin" /> Connecting...</>
              : isComingSoon
              ? 'Coming Soon'
              : <><Zap className="w-3.5 h-3.5" /> Connect</>}
          </Button>
        )}
      </div>
    </motion.div>
  );
};

// ── Widget code snippet ───────────────────────────────────────
const WidgetSnippetCard = () => {
  const [copied, setCopied] = useState(false);
  const snippet = `<script src="https://cdn.kaamgaarai.in/widget.js"
  data-business-id="dream_salon_pune"
  data-position="bottom-right"
  data-color="#2563EB"
  data-language="hinglish"
  async>
</script>`;
  const copy = () => { navigator.clipboard?.writeText(snippet); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  return (
    <Card>
      <CardContent>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-sm font-semibold text-text-primary">Website Chat Widget</h3>
            <p className="text-xs text-text-secondary mt-0.5">Add AI chat to your website in 30 seconds</p>
          </div>
          <Badge variant="success" dot size="sm">Connected</Badge>
        </div>
        <div className="bg-background rounded-lg border border-border-light p-4 overflow-x-auto">
          <pre className="text-xs text-text-secondary font-mono">{snippet}</pre>
        </div>
        <Button variant={copied ? 'accent' : 'secondary'} size="sm" className="mt-3" onClick={copy}>
          {copied ? <><Check className="w-4 h-4" /> Copied!</> : 'Copy Snippet'}
        </Button>
      </CardContent>
    </Card>
  );
};

// ── API Keys card ─────────────────────────────────────────────
const ApiKeysCard = () => {
  const [visible, setVisible] = useState({});
  const keys = [
    { name: 'Production Key', key: 'kg_live_pX4t9K2mN8qR3wY6vB1cD5eFgH', status: 'active' },
    { name: 'Test Key', key: 'kg_test_aH7bC1dE5fG2jK9lM3nO6pQrS', status: 'active' },
  ];
  return (
    <Card>
      <CardContent>
        <div className="flex items-center gap-2 mb-4">
          <Key className="w-5 h-5 text-primary" />
          <h3 className="text-sm font-semibold text-text-primary">API Keys</h3>
        </div>
        <div className="space-y-3">
          {keys.map((k, i) => (
            <div key={i} className="p-3 bg-surface rounded-lg border border-border-light">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-text-primary">{k.name}</p>
                <Badge variant="success" size="sm">Active</Badge>
              </div>
              <div className="flex items-center gap-2">
                <code className="flex-1 text-xs text-text-secondary font-mono bg-background px-3 py-2 rounded border border-border-light truncate">
                  {visible[i] ? k.key : k.key.slice(0, 12) + '••••••••••••••••'}
                </code>
                <button onClick={() => setVisible({ ...visible, [i]: !visible[i] })}
                  className="p-1.5 text-text-tertiary hover:text-text-primary transition-colors">
                  {visible[i] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          ))}
        </div>
        <Button variant="secondary" size="sm" className="mt-3">Generate New Key</Button>
      </CardContent>
    </Card>
  );
};

const { Eye, EyeOff } = { Eye: ({ className }) => <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>, EyeOff: ({ className }) => <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24M1 1l22 22"/></svg> };

// ── Main ──────────────────────────────────────────────────────
const Integrations = () => {
  const [tab, setTab] = useState('all');

  const categories = ['all', ...categoryOrder.filter((c) => enhancedIntegrations.some((i) => i.category === c))];
  const filtered = tab === 'all' ? enhancedIntegrations : enhancedIntegrations.filter((i) => i.category === tab);
  const connected = enhancedIntegrations.filter((i) => i.status === 'connected').length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-text-primary">Integrations</h2>
          <p className="text-sm text-text-secondary">Connect your tools and channels to KaamgaarAI</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="success" dot>{connected} Connected</Badge>
          <Badge variant="info">{enhancedIntegrations.length} Available</Badge>
        </div>
      </div>

      {/* Category filter */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
        {categories.map((c) => (
          <button key={c} onClick={() => setTab(c)}
            className={`px-4 py-2 rounded-lg text-sm font-medium capitalize whitespace-nowrap transition-colors ${
              tab === c ? 'bg-primary text-white' : 'bg-card border border-border-light text-text-secondary hover:text-text-primary'
            }`}>
            {c}
          </button>
        ))}
      </div>

      {/* Integration grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((intg, i) => (
          <IntegCard key={intg.id} integration={intg} index={i} />
        ))}
      </div>

      {/* Widget + API */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <WidgetSnippetCard />
        <ApiKeysCard />
      </div>
    </div>
  );
};

export default Integrations;
