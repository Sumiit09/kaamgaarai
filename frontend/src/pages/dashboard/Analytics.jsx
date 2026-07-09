import { motion } from 'framer-motion';
import {
  LineChart, Line, BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadialBarChart, RadialBar,
} from 'recharts';
import { Card, CardContent } from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import { conversationTrend, bookingTrend, revenueTrend, leadSources, responseTimeDist, peakHours } from '../../data/mockData';

const tooltipStyle = {
  backgroundColor: '#18181B',
  border: '1px solid #27272A',
  borderRadius: '8px',
  fontSize: '12px',
  color: '#F8FAFC',
};

const aiPerformance = [
  { name: 'Accuracy', value: 97, fill: '#22C55E' },
  { name: 'Speed', value: 92, fill: '#2563EB' },
  { name: 'Satisfaction', value: 96, fill: '#06B6D4' },
  { name: 'Resolution', value: 89, fill: '#F59E0B' },
];

const Analytics = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-text-primary">Analytics</h2>
        <p className="text-sm text-text-secondary">Deep insights into your business performance</p>
      </div>

      {/* Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardContent>
            <h3 className="text-base font-semibold text-text-primary mb-1">Conversations Over Time</h3>
            <p className="text-xs text-text-secondary mb-4">Last 7 days</p>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={conversationTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" />
                <XAxis dataKey="day" stroke="#64748B" fontSize={12} />
                <YAxis stroke="#64748B" fontSize={12} />
                <Tooltip contentStyle={tooltipStyle} />
                <Line type="monotone" dataKey="conversations" stroke="#2563EB" strokeWidth={2} dot={{ fill: '#2563EB', r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <h3 className="text-base font-semibold text-text-primary mb-1">Bookings Over Time</h3>
            <p className="text-xs text-text-secondary mb-4">Last 7 days</p>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={bookingTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" />
                <XAxis dataKey="day" stroke="#64748B" fontSize={12} />
                <YAxis stroke="#64748B" fontSize={12} />
                <Tooltip contentStyle={tooltipStyle} cursor={{ fill: '#1F293740' }} />
                <Bar dataKey="bookings" fill="#06B6D4" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <CardContent>
            <h3 className="text-base font-semibold text-text-primary mb-1">Revenue Trend</h3>
            <p className="text-xs text-text-secondary mb-4">Last 7 months</p>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={revenueTrend}>
                <defs>
                  <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#22C55E" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#22C55E" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" />
                <XAxis dataKey="month" stroke="#64748B" fontSize={12} />
                <YAxis stroke="#64748B" fontSize={12} />
                <Tooltip contentStyle={tooltipStyle} />
                <Area type="monotone" dataKey="revenue" stroke="#22C55E" strokeWidth={2} fill="url(#revGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <h3 className="text-base font-semibold text-text-primary mb-1">Lead Sources</h3>
            <p className="text-xs text-text-secondary mb-4">Channel distribution</p>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={leadSources} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3}>
                  {leadSources.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-1.5 mt-2">
              {leadSources.map((s, i) => (
                <div key={i} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: s.color }} />
                    <span className="text-text-secondary">{s.name}</span>
                  </div>
                  <span className="text-text-primary font-medium">{s.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Row 3 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardContent>
            <h3 className="text-base font-semibold text-text-primary mb-1">Response Time Distribution</h3>
            <p className="text-xs text-text-secondary mb-4">How fast AI responds</p>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={responseTimeDist} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" />
                <XAxis type="number" stroke="#64748B" fontSize={12} />
                <YAxis dataKey="range" type="category" stroke="#64748B" fontSize={12} width={50} />
                <Tooltip contentStyle={tooltipStyle} cursor={{ fill: '#1F293740' }} />
                <Bar dataKey="count" fill="#2563EB" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <h3 className="text-base font-semibold text-text-primary mb-1">AI Performance Score</h3>
            <p className="text-xs text-text-secondary mb-4">Overall AI metrics</p>
            <ResponsiveContainer width="100%" height={220}>
              <RadialBarChart data={aiPerformance} innerRadius="20%" outerRadius="90%" startAngle={90} endAngle={-270}>
                <RadialBar dataKey="value" cornerRadius={6} />
                <Tooltip contentStyle={tooltipStyle} />
              </RadialBarChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {aiPerformance.map((m, i) => (
                <div key={i} className="flex items-center gap-2 text-sm">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: m.fill }} />
                  <span className="text-text-secondary">{m.name}</span>
                  <span className="text-text-primary font-medium ml-auto">{m.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Peak hours heatmap */}
      <Card>
        <CardContent>
          <h3 className="text-base font-semibold text-text-primary mb-1">Peak Hours</h3>
          <p className="text-xs text-text-secondary mb-4">When your customers are most active</p>
          <div className="flex items-end justify-between gap-2 h-48">
            {peakHours.map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(h.value / 67) * 100}%` }}
                  transition={{ delay: i * 0.05, duration: 0.5 }}
                  className="w-full bg-gradient-to-t from-primary to-accent rounded-t-lg min-h-[4px]"
                  style={{ opacity: 0.3 + (h.value / 67) * 0.7 }}
                />
                <span className="text-2xs text-text-tertiary">{h.hour}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;
