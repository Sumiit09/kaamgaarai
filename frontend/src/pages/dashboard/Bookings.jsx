import { useEffect, useState } from "react";
import { motion } from 'framer-motion';
import { Plus, Calendar, List, Clock, Check, X, Phone } from 'lucide-react';
import { Card, CardContent } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Avatar from '../../components/ui/Avatar';

import axios from "axios";
import { useBusiness } from "../../context/BusinessContext";



const Bookings = () => {
  const [view, setView] = useState('list');
  const [filter, setFilter] = useState('all');
  const { business } = useBusiness();

const [bookings, setBookings] = useState([]);

  const filtered = bookings.filter((b) => {
    if (filter === 'today') return b.time.includes('Today');
    if (filter === 'upcoming') return b.time.includes('Tomorrow') || b.time.includes('Jul');
    if (filter === 'cancelled') return b.status === 'cancelled';
    if (filter === 'completed') return b.status === 'completed';
    return true;
  });
const fetchBookings = async () => {
  if (!business) return;

  try {
    const res = await axios.get(
      `http://localhost:3000/api/bookings/${business.id}`
    );

    console.log("Bookings API Response:", res.data);

    setBookings(res.data.bookings);
    console.log(res.data.bookings[0]);
  } catch (err) {
    console.error(err);
  }
};
useEffect(() => {
  fetchBookings();
}, [business]);
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
                      <Avatar name={booking.customer_name} size="md" color="primary" />
                      <div>
                        <p className="text-sm font-semibold text-text-primary">{booking.customer_name}</p>
                        <p className="text-xs text-text-secondary">{booking.service}</p>
                      </div>
                    </div>
                   <Badge
    variant={statusVariant[booking.status.toLowerCase()]}
    size="sm"
>
    {booking.status}
</Badge>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-text-secondary">
                      <Clock className="w-4 h-4 text-text-tertiary" /> {booking.appointment_date} | {booking.appointment_time}
                    </div>
                    <div className="flex items-center gap-2 text-text-secondary">
                      <Phone className="w-4 h-4 text-text-tertiary" /> {booking.phone}
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-border-light">
                    <span className="text-lg font-bold text-text-primary">₹ N/A</span>
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
