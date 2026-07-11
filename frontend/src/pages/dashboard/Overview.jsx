import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBusiness } from "../../context/BusinessContext";
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import {
  MessageCircle, Instagram, Facebook, Globe, ArrowRight, Activity,
  AlertTriangle, CalendarOff, Bot, Clock, ShieldCheck, TrendingUp,
  Bell, X, Eye,
} from 'lucide-react';
import StatWidget from '../../components/shared/StatWidget';
import { Card, CardContent } from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Avatar from '../../components/ui/Avatar';
import { useNavigate } from 'react-router-dom';
import {
  dashboardStats, conversationTrend, bookingTrend, leadSources,
  recentConversations, todayBookings, healthScore, calendarEvents,
} from '../../data/mockData';

const channelIcons = {
  whatsapp: { icon: MessageCircle, color: 'text-success' },
  instagram: { icon: Instagram, color: 'text-pink-500' },
  facebook: { icon: Facebook, color: 'text-blue-500' },
  website: { icon: Globe, color: 'text-accent' },
};

const chartTooltipStyle = {
  backgroundColor: '#18181B',
  border: '1px solid #27272A',
  borderRadius: '8px',
  fontSize: '12px',
  color: '#F8FAFC',
};

// ── Business Status Widget ────────────────────────────────────
const BusinessStatusWidget = () => {
  const [isOpen] = useState(true);
  const now = new Date();
  const hour = now.getHours();
  const closingSoon = hour >= 20;

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
      className="card-surface p-5 relative overflow-hidden">
      <div className={`absolute -right-4 -top-4 w-24 h-24 rounded-full blur-2xl opacity-40 ${isOpen ? 'bg-success/30' : 'bg-danger/30'}`} />
      <div className="relative flex items-center justify-between mb-3">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isOpen ? 'bg-success/10' : 'bg-danger/10'}`}>
          <ShieldCheck className={`w-5 h-5 ${isOpen ? 'text-success' : 'text-danger'}`} />
        </div>
        <span className={`w-2.5 h-2.5 rounded-full animate-pulse ${isOpen ? 'bg-success' : 'bg-danger'}`} />
      </div>
      <p className={`text-2xl font-bold ${isOpen ? 'text-success' : 'text-danger'}`}>
        {isOpen ? 'Open' : 'Closed'}
      </p>
      <p className="text-sm text-text-secondary">Business Status</p>
      {isOpen && closingSoon && (
        <p className="text-2xs text-warning mt-1 flex items-center gap-1">
          <Clock className="w-3 h-3" /> Closing in ~1 hour
        </p>
      )}
    </motion.div>
  );
};

// ── AI Health Widget ──────────────────────────────────────────
const AIHealthWidget = () => (
  <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
    className="card-surface p-5 relative overflow-hidden">
    <div className="absolute -right-4 -top-4 w-24 h-24 rounded-full bg-primary/10 blur-2xl opacity-50" />
    <div className="relative flex items-center justify-between mb-3">
      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
        <Bot className="w-5 h-5 text-primary" />
      </div>
      <Badge variant="success" dot size="sm">Online</Badge>
    </div>
    <p className="text-2xl font-bold text-text-primary">96.8%</p>
    <p className="text-sm text-text-secondary">AI Health Score</p>
    <p className="text-2xs text-text-tertiary mt-1">47 chats handled today</p>
  </motion.div>
);

// ── Upcoming Holidays Widget ──────────────────────────────────
const HolidayWidget = () => {
  const next = calendarEvents.find((e) => e.type === 'holiday' || e.type === 'festival');
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
      className="card-surface p-5 relative overflow-hidden">
      <div className="absolute -right-4 -top-4 w-24 h-24 rounded-full bg-warning/10 blur-2xl opacity-40" />
      <div className="relative flex items-center justify-between mb-3">
        <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
          <CalendarOff className="w-5 h-5 text-warning" />
        </div>
      </div>
      {next ? (
        <>
          <p className="text-base font-bold text-text-primary leading-snug">{next.label}</p>
          <p className="text-sm text-text-secondary">Next Holiday</p>
          <p className="text-2xs text-warning mt-1">{next.date}</p>
        </>
      ) : (
        <>
          <p className="text-2xl font-bold text-text-primary">—</p>
          <p className="text-sm text-text-secondary">No Upcoming Holidays</p>
        </>
      )}
    </motion.div>
  );
};

// ── Emergency Alert Widget ────────────────────────────────────
const EmergencyWidget = ({ navigate }) => {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;
  return (
    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="card-surface p-4 border border-warning/30 relative overflow-hidden col-span-full">
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-warning to-danger" />
      <div className="flex items-start sm:items-center gap-3 justify-between">
        <div className="flex items-start sm:items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-warning/15 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-5 h-5 text-warning" />
          </div>
          <div>
            <p className="text-sm font-semibold text-text-primary">No active emergency</p>
            <p className="text-xs text-text-secondary">Use Emergency Mode to instantly notify customers of closures or changes</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" onClick={() => navigate('/dashboard/emergency')}>
            <Eye className="w-3.5 h-3.5" /> View
          </Button>
          <button onClick={() => setDismissed(true)} className="p-1.5 text-text-tertiary hover:text-text-primary transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// ── Main ──────────────────────────────────────────────────────
const Overview = () => {
  const navigate = useNavigate();
const { business } = useBusiness();

  return (
    <div className="space-y-6">
      <Card>
  <CardContent>
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-text-primary">
          Welcome back 👋
        </h1>

        <p className="text-lg font-semibold text-primary mt-1">
          {business?.name || "Your Business"}
        </p>

        <p className="text-sm text-text-secondary mt-1">
          {business?.city}, {business?.state}
        </p>
      </div>

      <Badge variant="success">
        {business?.industry || "Business"}
      </Badge>
    </div>
  </CardContent>
</Card>
      {/* Emergency alert banner */}
      <AnimatePresence>
        <EmergencyWidget navigate={navigate} />
      </AnimatePresence>

      {/* Top status row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <BusinessStatusWidget />
        <AIHealthWidget />
        <HolidayWidget />
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
          className="card-surface p-5 relative overflow-hidden">
          <div className="absolute -right-4 -top-4 w-24 h-24 rounded-full bg-danger/10 blur-2xl opacity-40" />
          <div className="relative flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-lg bg-danger/10 flex items-center justify-center">
              <Bell className="w-5 h-5 text-danger" />
            </div>
            <Badge variant="danger" size="sm">3</Badge>
          </div>
          <p className="text-2xl font-bold text-text-primary">3</p>
          <p className="text-sm text-text-secondary">Unread Messages</p>
        </motion.div>
      </div>

      {/* Stats row 1 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {dashboardStats.row1.map((stat, i) => (
          <StatWidget key={i} {...stat} index={i} />
        ))}
      </div>

      {/* Stats row 2 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {dashboardStats.row2.map((stat, i) => (
          <StatWidget key={i} {...stat} index={i + 4} />
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-semibold text-text-primary">Conversation Trend</h3>
                <p className="text-xs text-text-secondary">Last 7 days</p>
              </div>
              <Badge variant="success" dot>Live</Badge>
            </div>
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={conversationTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" />
                <XAxis dataKey="day" stroke="#64748B" fontSize={12} />
                <YAxis stroke="#64748B" fontSize={12} />
                <Tooltip contentStyle={chartTooltipStyle} />
                <Line type="monotone" dataKey="conversations" stroke="#2563EB" strokeWidth={2} dot={{ fill: '#2563EB', r: 4 }} name="Conversations" />
                <Line type="monotone" dataKey="bookings" stroke="#06B6D4" strokeWidth={2} dot={{ fill: '#06B6D4', r: 4 }} name="Bookings" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <h3 className="text-base font-semibold text-text-primary mb-1">Lead Sources</h3>
            <p className="text-xs text-text-secondary mb-4">Where customers come from</p>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={leadSources} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={45} outerRadius={75} paddingAngle={3}>
                  {leadSources.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Tooltip contentStyle={chartTooltipStyle} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-2">
              {leadSources.map((source, i) => (
                <div key={i} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: source.color }} />
                    <span className="text-text-secondary">{source.name}</span>
                  </div>
                  <span className="text-text-primary font-medium">{source.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Booking trend + Health score */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <CardContent>
            <h3 className="text-base font-semibold text-text-primary mb-1">Booking Trend</h3>
            <p className="text-xs text-text-secondary mb-4">Last 7 days</p>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={bookingTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" />
                <XAxis dataKey="day" stroke="#64748B" fontSize={12} />
                <YAxis stroke="#64748B" fontSize={12} />
                <Tooltip contentStyle={chartTooltipStyle} cursor={{ fill: '#1F293740' }} />
                <Bar dataKey="bookings" fill="#2563EB" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-text-primary">Business Health</h3>
              <Activity className="w-5 h-5 text-success" />
            </div>
            <div className="text-center mb-4">
              <div className="relative inline-flex items-center justify-center">
                <svg className="w-24 h-24 -rotate-90">
                  <circle cx="48" cy="48" r="40" stroke="#1F2937" strokeWidth="6" fill="none" />
                  <motion.circle cx="48" cy="48" r="40" stroke="#22C55E" strokeWidth="6" fill="none"
                    strokeLinecap="round"
                    initial={{ strokeDasharray: '0 251' }}
                    animate={{ strokeDasharray: `${(healthScore.overall / 100) * 251} 251` }}
                    transition={{ duration: 1, delay: 0.3 }} />
                </svg>
                <span className="absolute text-2xl font-bold text-text-primary">{healthScore.overall}</span>
              </div>
              <p className="text-xs text-text-secondary mt-2">Overall Score</p>
            </div>
            <div className="space-y-2">
              {healthScore.metrics.map((m, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-text-secondary">{m.label}</span>
                    <span className="text-text-primary font-medium">{m.value}%</span>
                  </div>
                  <div className="h-1.5 bg-surface rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${m.value}%` }}
                      transition={{ duration: 0.8, delay: i * 0.1 }}
                      className={`h-full rounded-full ${m.color === 'success' ? 'bg-success' : m.color === 'primary' ? 'bg-primary' : 'bg-accent'}`} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent conversations + Today's bookings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-text-primary">Recent Conversations</h3>
              <button onClick={() => navigate('/dashboard/inbox')}
                className="text-xs text-primary hover:text-primary-400 flex items-center gap-1 transition-colors">
                View all <ArrowRight className="w-3 h-3" />
              </button>
            </div>
            <div className="space-y-1">
              {recentConversations.slice(0, 5).map((conv, i) => {
                const ChannelIcon = channelIcons[conv.channel];
                return (
                  <motion.div key={conv.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => navigate('/dashboard/inbox')}
                    className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-card-hover transition-colors cursor-pointer">
                    <Avatar name={conv.name} size="sm" color="primary" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <p className="text-sm font-medium text-text-primary truncate">{conv.name}</p>
                        {ChannelIcon && <ChannelIcon.icon className={`w-3.5 h-3.5 ${ChannelIcon.color} shrink-0`} />}
                      </div>
                      <p className="text-xs text-text-secondary truncate">{conv.preview}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-2xs text-text-tertiary">{conv.time}</p>
                      {conv.unread > 0 && <Badge variant="danger" size="sm" className="mt-1">{conv.unread}</Badge>}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-text-primary">Today's Bookings</h3>
              <button onClick={() => navigate('/dashboard/bookings')}
                className="text-xs text-primary hover:text-primary-400 flex items-center gap-1 transition-colors">
                View all <ArrowRight className="w-3 h-3" />
              </button>
            </div>
            <div className="space-y-1">
              {todayBookings.slice(0, 5).map((booking, i) => (
                <motion.div key={booking.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-card-hover transition-colors cursor-pointer">
                  <Avatar name={booking.customer} size="sm" color="accent" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-text-primary">{booking.customer}</p>
                    <p className="text-xs text-text-secondary">{booking.service} · {booking.time}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-medium text-text-primary">{booking.price}</p>
                    <Badge variant={booking.status === 'confirmed' ? 'success' : booking.status === 'completed' ? 'accent' : 'warning'} size="sm" className="mt-0.5">
                      {booking.status}
                    </Badge>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick actions row */}
      <Card>
        <CardContent>
          <h3 className="text-sm font-semibold text-text-primary mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: 'Business Calendar', icon: CalendarOff, path: '/dashboard/calendar', color: 'text-primary', bg: 'bg-primary/10' },
              { label: 'Emergency Mode', icon: AlertTriangle, path: '/dashboard/emergency', color: 'text-danger', bg: 'bg-danger/10' },
              { label: 'Broadcast Message', icon: Bell, path: '/dashboard/broadcast', color: 'text-accent', bg: 'bg-accent/10' },
              { label: 'Business Profile', icon: TrendingUp, path: '/dashboard/business-profile', color: 'text-success', bg: 'bg-success/10' },
            ].map((action, i) => (
              <motion.button key={i} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                onClick={() => navigate(action.path)}
                className="flex flex-col items-center gap-2 p-4 rounded-xl border border-border-light hover:bg-card-hover transition-colors text-center">
                <div className={`w-10 h-10 rounded-xl ${action.bg} flex items-center justify-center`}>
                  <action.icon className={`w-5 h-5 ${action.color}`} />
                </div>
                <span className="text-xs font-medium text-text-secondary">{action.label}</span>
              </motion.button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Overview;
