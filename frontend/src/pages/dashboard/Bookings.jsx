import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Calendar, List, Clock, Check, X, Phone } from 'lucide-react';
import { Card, CardContent } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Avatar from '../../components/ui/Avatar';
import { todayBookings } from '../../data/mockData';

const allBookings = [
  ...todayBookings,
  { id: 7, customer: 'Arjun Yadav', service: 'Haircut + Beard', time: 'Tomorrow 10:00 AM', price: '₹400', status: 'confirmed', avatar: 'AY', phone: '+91 95678 90123' },
  { id: 8, customer: 'Sunita Devi', service: 'Hair Spa', time: 'Tomorrow 2:00 PM', price: '₹600', status: 'confirmed', avatar: 'SD', phone: '+91 91234 56789' },
  { id: 9, customer: 'Rohan Kulkarni', service: 'Facial Premium', time: 'Jul 10, 5:00 PM', price: '₹900', status: 'pending', avatar: 'RK', phone: '+91 93456 78901' },
  { id: 10, customer: 'Meena Joshi', service: 'Manicure + Pedicure', time: 'Jul 10, 11:00 AM', price: '₹700', status: 'cancelled', avatar: 'MJ', phone: '+91 94567 89012' },
  { id: 11, customer: 'Vikram Patel', service: 'Hair Color', time: 'Jul 11, 11:00 AM', price: '₹800', status: 'completed', avatar: 'VP', phone: '+91 90123 45678' },
];

const Bookings = () => {
  const [view, setView] = useState('list');
  const [filter, setFilter] = useState('all');

  const filtered = allBookings.filter((b) => {
    if (filter === 'today') return b.time.includes('Today');
    if (filter === 'upcoming') return b.time.includes('Tomorrow') || b.time.includes('Jul');
    if (filter === 'cancelled') return b.status === 'cancelled';
    if (filter === 'completed') return b.status === 'completed';
    return true;
  });

  const statusVariant = {
    confirmed: 'success',
    pending: 'warning',
    completed: 'accent',
    cancelled: 'danger',
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-text-primary">Bookings</h2>
          <p className="text-sm text-text-secondary">Manage all your appointments in one place</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex gap-1 bg-card border border-border-light rounded-lg p-1">
            {['list', 'calendar'].map((v) => (
              <button key={v} onClick={() => setView(v)}
                className={`px-3 py-1.5 rounded-md text-sm font-medium capitalize transition-colors flex items-center gap-1.5 ${
                  view === v ? 'bg-primary text-white' : 'text-text-secondary hover:text-text-primary'
                }`}>
                {v === 'list' ? <List className="w-4 h-4" /> : <Calendar className="w-4 h-4" />}
                {v}
              </button>
            ))}
          </div>
          <Button variant="primary" size="sm">
            <Plus className="w-4 h-4" /> Add Booking
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar">
        {['all', 'today', 'upcoming', 'cancelled', 'completed'].map((f) => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg text-sm font-medium capitalize whitespace-nowrap transition-colors ${
              filter === f ? 'bg-primary text-white' : 'bg-card border border-border-light text-text-secondary hover:text-text-primary'
            }`}>
            {f}
          </button>
        ))}
      </div>

      {view === 'list' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((booking, i) => (
            <motion.div
              key={booking.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card hover>
                <CardContent>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Avatar name={booking.customer} size="md" color="primary" />
                      <div>
                        <p className="text-sm font-semibold text-text-primary">{booking.customer}</p>
                        <p className="text-xs text-text-secondary">{booking.service}</p>
                      </div>
                    </div>
                    <Badge variant={statusVariant[booking.status]} size="sm">{booking.status}</Badge>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-text-secondary">
                      <Clock className="w-4 h-4 text-text-tertiary" /> {booking.time}
                    </div>
                    <div className="flex items-center gap-2 text-text-secondary">
                      <Phone className="w-4 h-4 text-text-tertiary" /> {booking.phone}
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-border-light">
                    <span className="text-lg font-bold text-text-primary">{booking.price}</span>
                    <div className="flex gap-1">
                      <button className="p-1.5 rounded-lg text-success hover:bg-success/10 transition-colors">
                        <Check className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 rounded-lg text-danger hover:bg-danger/10 transition-colors">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent>
            <div className="grid grid-cols-7 gap-1 mb-4">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
                <div key={d} className="text-center text-xs font-medium text-text-tertiary py-2">{d}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: 35 }).map((_, i) => {
                const day = i - 2;
                const isToday = day === 8;
                const hasBooking = [3, 8, 10, 15, 22].includes(day);
                return (
                  <div key={i} className={`aspect-square rounded-lg p-1.5 border transition-colors cursor-pointer ${
                    day < 1 || day > 31 ? 'border-transparent' : 'border-border-light hover:bg-card-hover'
                  } ${isToday ? 'bg-primary/10 border-primary/30' : ''}`}>
                    {day >= 1 && day <= 31 && (
                      <>
                        <p className={`text-xs ${isToday ? 'text-primary font-bold' : 'text-text-secondary'}`}>{day}</p>
                        {hasBooking && <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1" />}
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Bookings;
