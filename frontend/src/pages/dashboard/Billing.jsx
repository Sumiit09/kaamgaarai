import { motion } from 'framer-motion';
import { CreditCard, Download, TrendingUp, Calendar, Check, Zap } from 'lucide-react';
import { Card, CardContent } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import { businessInfo, usageMeters, invoices, pricingPlans } from '../../data/mockData';

const Billing = () => {
  return (
    <div className="space-y-6">
      {/* Trial banner */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="gradient-border rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-warning/15 flex items-center justify-center">
            <Calendar className="w-5 h-5 text-warning" />
          </div>
          <div>
            <p className="text-sm font-medium text-text-primary">Free trial ends in 7 days</p>
            <p className="text-xs text-text-secondary">Upgrade to keep your AI Employee running 24/7</p>
          </div>
        </div>
        <Button variant="primary" size="sm">Upgrade Now</Button>
      </motion.div>

      {/* Current plan */}
      <Card className="gradient-border">
        <CardContent>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-lg font-semibold text-text-primary">Growth Plan</h3>
                <Badge variant="info" size="sm">Current</Badge>
              </div>
              <p className="text-2xl font-bold text-text-primary">₹1,999<span className="text-sm text-text-secondary font-normal">/month</span></p>
              <p className="text-xs text-text-secondary mt-1">Renews on Aug 1, 2024</p>
            </div>
            <div className="flex gap-2">
              <Button variant="secondary" size="sm">Change Plan</Button>
              <Button variant="ghost" size="sm">Cancel</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Usage meters */}
      <Card>
        <CardContent>
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-primary" />
            <h3 className="text-base font-semibold text-text-primary">Usage This Month</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {usageMeters.map((meter, i) => {
              const pct = (meter.used / meter.total) * 100;
              return (
                <div key={i}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-text-secondary">{meter.label}</span>
                    <span className="text-sm text-text-primary font-medium">{meter.used.toLocaleString('en-IN')} / {meter.total.toLocaleString('en-IN')} {meter.unit}</span>
                  </div>
                  <div className="h-2 bg-surface rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 0.8, delay: i * 0.1 }}
                      className={`h-full rounded-full ${pct > 80 ? 'bg-danger' : pct > 60 ? 'bg-warning' : 'bg-primary'}`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Upgrade options */}
      <div>
        <h3 className="text-base font-semibold text-text-primary mb-4">Available Plans</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {pricingPlans.slice(1).map((plan, i) => (
            <Card key={i} className={plan.popular ? 'gradient-border' : ''}>
              <CardContent>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-semibold text-text-primary">{plan.name}</h4>
                  {plan.popular && <Badge variant="info" size="sm">Popular</Badge>}
                </div>
                <p className="text-2xl font-bold text-text-primary mb-1">{plan.price}<span className="text-sm text-text-secondary font-normal">{plan.period}</span></p>
                <ul className="space-y-1.5 my-4">
                  {plan.features.slice(0, 3).map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-xs text-text-secondary">
                      <Check className="w-3.5 h-3.5 text-success shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
                <Button variant={plan.name === 'Growth' ? 'secondary' : 'primary'} size="sm" className="w-full" disabled={plan.name === 'Growth'}>
                  {plan.name === 'Growth' ? 'Current Plan' : 'Upgrade'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Payment method */}
      <Card>
        <CardContent>
          <div className="flex items-center gap-2 mb-4">
            <CreditCard className="w-5 h-5 text-accent" />
            <h3 className="text-base font-semibold text-text-primary">Payment Method</h3>
          </div>
          <div className="flex items-center justify-between p-3 bg-surface rounded-lg border border-border-light">
            <div className="flex items-center gap-3">
              <div className="w-10 h-7 rounded bg-gradient-to-r from-primary to-accent flex items-center justify-center">
                <CreditCard className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-text-primary">•••• •••• •••• 4321</p>
                <p className="text-xs text-text-tertiary">Expires 12/26 · UPI Auto-pay</p>
              </div>
            </div>
            <Button variant="ghost" size="sm">Update</Button>
          </div>
        </CardContent>
      </Card>

      {/* Invoice history */}
      <Card>
        <CardContent>
          <h3 className="text-base font-semibold text-text-primary mb-4">Invoice History</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border-light">
                  <th className="text-left py-2 text-xs font-medium text-text-tertiary uppercase">Invoice</th>
                  <th className="text-left py-2 text-xs font-medium text-text-tertiary uppercase">Date</th>
                  <th className="text-left py-2 text-xs font-medium text-text-tertiary uppercase">Plan</th>
                  <th className="text-left py-2 text-xs font-medium text-text-tertiary uppercase">Amount</th>
                  <th className="text-left py-2 text-xs font-medium text-text-tertiary uppercase">Status</th>
                  <th className="text-right py-2 text-xs font-medium text-text-tertiary uppercase">Download</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((inv, i) => (
                  <tr key={i} className="border-b border-border-light/50 hover:bg-card-hover transition-colors">
                    <td className="py-3 text-sm text-text-primary font-mono">{inv.id}</td>
                    <td className="py-3 text-sm text-text-secondary">{inv.date}</td>
                    <td className="py-3 text-sm text-text-secondary">{inv.plan}</td>
                    <td className="py-3 text-sm text-text-primary font-medium">{inv.amount}</td>
                    <td className="py-3"><Badge variant="success" size="sm">{inv.status}</Badge></td>
                    <td className="py-3 text-right">
                      <button className="text-text-tertiary hover:text-primary transition-colors">
                        <Download className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Billing;
