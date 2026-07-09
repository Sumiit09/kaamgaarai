import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Phone, MapPin, Star, X, MessageCircle, Calendar } from 'lucide-react';
import { Card, CardContent } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Avatar from '../../components/ui/Avatar';
import DataTable from '../../components/shared/DataTable';
import { customers } from '../../data/mockData';

const tagColors = {
  VIP: 'success',
  Regular: 'info',
  New: 'accent',
};

const Customers = () => {
  const [selected, setSelected] = useState(null);

  const columns = [
    {
      key: 'name',
      header: 'Customer',
      sortable: true,
      render: (row) => (
        <div className="flex items-center gap-3">
          <Avatar name={row.name} size="sm" color="primary" />
          <div>
            <p className="text-sm font-medium text-text-primary">{row.name}</p>
            <p className="text-xs text-text-tertiary">{row.city}</p>
          </div>
        </div>
      ),
    },
    { key: 'phone', header: 'Phone', render: (row) => <span className="text-sm text-text-secondary">{row.phone}</span> },
    { key: 'lastVisit', header: 'Last Visit', sortable: true, render: (row) => <span className="text-sm text-text-secondary">{row.lastVisit}</span> },
    { key: 'totalBookings', header: 'Bookings', sortable: true, render: (row) => <span className="text-sm text-text-primary font-medium">{row.totalBookings}</span> },
    { key: 'lifetimeValue', header: 'Lifetime Value', sortable: true, render: (row) => <span className="text-sm text-success font-medium">{row.lifetimeValue}</span> },
    {
      key: 'tags',
      header: 'Tags',
      render: (row) => (
        <div className="flex gap-1">
          {row.tags.map((tag) => <Badge key={tag} variant={tagColors[tag] || 'neutral'} size="sm">{tag}</Badge>)}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-text-primary">Customers</h2>
          <p className="text-sm text-text-secondary">{customers.length} customers · ₹62,500 total lifetime value</p>
        </div>
        <Button variant="primary" size="sm">
          <Plus className="w-4 h-4" /> Add Customer
        </Button>
      </div>

      <Card>
        <CardContent>
          <DataTable
            columns={columns}
            data={customers}
            searchable
            searchKeys={['name', 'phone', 'city']}
            onRowClick={setSelected}
          />
        </CardContent>
      </Card>

      {/* Customer profile drawer */}
      <AnimatePresence>
        {selected && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed right-0 top-0 bottom-0 w-full sm:w-96 bg-card border-l border-border-light z-50 overflow-y-auto"
            >
              <div className="p-4 border-b border-border-light flex items-center justify-between">
                <h3 className="text-base font-semibold text-text-primary">Customer Profile</h3>
                <button onClick={() => setSelected(null)} className="p-1 text-text-tertiary hover:text-text-primary transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 text-center border-b border-border-light">
                <Avatar name={selected.name} size="xl" color="primary" className="mx-auto mb-3" />
                <p className="text-lg font-semibold text-text-primary">{selected.name}</p>
                <p className="text-sm text-text-secondary">{selected.phone}</p>
                <div className="flex justify-center gap-1.5 mt-2">
                  {selected.tags.map((tag) => <Badge key={tag} variant={tagColors[tag] || 'neutral'} size="sm">{tag}</Badge>)}
                </div>
              </div>
              <div className="p-4 space-y-4">
                <div>
                  <p className="text-xs text-text-tertiary uppercase tracking-wider mb-2">Overview</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between"><span className="text-text-secondary">Total Bookings</span><span className="text-text-primary font-medium">{selected.totalBookings}</span></div>
                    <div className="flex justify-between"><span className="text-text-secondary">Lifetime Value</span><span className="text-success font-medium">{selected.lifetimeValue}</span></div>
                    <div className="flex justify-between"><span className="text-text-secondary">Last Visit</span><span className="text-text-primary font-medium">{selected.lastVisit}</span></div>
                    <div className="flex items-center justify-between"><span className="text-text-secondary">City</span><span className="text-text-primary font-medium flex items-center gap-1"><MapPin className="w-3 h-3" />{selected.city}</span></div>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-text-tertiary uppercase tracking-wider mb-2">Recent Bookings</p>
                  <div className="space-y-2">
                    {['Haircut — ₹250 — 2 days ago', 'Facial — ₹500 — 1 week ago', 'Hair Color — ₹800 — 2 weeks ago'].map((b, i) => (
                      <div key={i} className="flex items-center gap-2 p-2.5 bg-surface rounded-lg border border-border-light">
                        <Calendar className="w-4 h-4 text-text-tertiary" />
                        <span className="text-sm text-text-secondary">{b}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs text-text-tertiary uppercase tracking-wider mb-2">Notes</p>
                  <textarea placeholder="Add a note about this customer..." rows={3}
                    className="w-full bg-surface border border-border-light rounded-lg px-3 py-2 text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-primary resize-none" />
                </div>
                <div className="flex gap-2">
                  <Button variant="secondary" className="flex-1"><MessageCircle className="w-4 h-4" /> Message</Button>
                  <Button variant="primary" className="flex-1"><Phone className="w-4 h-4" /> Call</Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Customers;
