import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft, ChevronRight, Plus, X, Clock, Coffee,
  CalendarOff, Umbrella, Wrench, Star, Edit3, Check,
  Calendar, Users, AlertTriangle,
} from 'lucide-react';
import { Card, CardContent } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Input, { Textarea, Select } from '../../components/ui/Input';
import Toggle from '../../components/ui/Toggle';
import Avatar from '../../components/ui/Avatar';
import { calendarEvents, defaultSchedule, staffAvailability } from '../../data/mockData';

// ── Helpers ───────────────────────────────────────────────────
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];

const typeConfig = {
  open:      { color: 'bg-success',  text: 'text-success',  border: 'border-success/40',  label: 'Open',           dot: '#22C55E' },
  special:   { color: 'bg-warning',  text: 'text-warning',  border: 'border-warning/40',  label: 'Special Hours',  dot: '#F59E0B' },
  holiday:   { color: 'bg-danger',   text: 'text-danger',   border: 'border-danger/40',   label: 'Holiday',        dot: '#EF4444' },
  festival:  { color: 'bg-warning',  text: 'text-warning',  border: 'border-warning/40',  label: 'Festival',       dot: '#F59E0B' },
  vacation:  { color: 'bg-[#6366F1]', text: 'text-[#6366F1]', border: 'border-[#6366F1]/40', label: 'Vacation',    dot: '#6366F1' },
  emergency: { color: 'bg-danger',   text: 'text-danger',   border: 'border-danger/40',   label: 'Emergency',      dot: '#EF4444' },
  off:       { color: 'bg-[#27272A]', text: 'text-text-tertiary', border: 'border-border-light', label: 'Closed', dot: '#27272A' },
};

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}
function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 1).getDay();
}
function toDateKey(y, m, d) {
  return `${y}-${String(m + 1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
}

// ── Day Editor Modal ──────────────────────────────────────────
const DayEditorModal = ({ date, event, schedule, onSave, onClose }) => {
  const [type, setType] = useState(event?.type || 'open');
  const [openTime, setOpenTime] = useState(event?.open || schedule.openTime);
  const [closeTime, setCloseTime] = useState(event?.close || schedule.closeTime);
  const [lunchStart, setLunchStart] = useState(schedule.lunchStart);
  const [lunchEnd, setLunchEnd] = useState(schedule.lunchEnd);
  const [note, setNote] = useState(event?.note || '');
  const [label, setLabel] = useState(event?.label || '');
  const [recurring, setRecurring] = useState(false);

  const types = [
    { id: 'open',      label: 'Open (Normal)',   dot: '#22C55E' },
    { id: 'special',   label: 'Special Hours',   dot: '#F59E0B' },
    { id: 'holiday',   label: 'Public Holiday',  dot: '#EF4444' },
    { id: 'festival',  label: 'Festival',        dot: '#F59E0B' },
    { id: 'vacation',  label: 'Vacation',        dot: '#6366F1' },
    { id: 'emergency', label: 'Emergency',       dot: '#EF4444' },
    { id: 'off',       label: 'Weekly Off',      dot: '#27272A' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="relative w-full max-w-lg bg-card border border-border-light rounded-2xl shadow-float overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border-light">
          <div>
            <h3 className="text-base font-semibold text-text-primary">Edit Day</h3>
            <p className="text-xs text-text-secondary mt-0.5">{date}</p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-text-tertiary hover:text-text-primary hover:bg-card-hover transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-5 max-h-[70vh] overflow-y-auto">
          {/* Status type */}
          <div>
            <p className="text-sm font-medium text-text-secondary mb-2">Day Status</p>
            <div className="grid grid-cols-2 gap-2">
              {types.map((t) => (
                <button key={t.id} onClick={() => setType(t.id)}
                  className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg border text-sm font-medium transition-all ${
                    type === t.id
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-border-light text-text-secondary hover:border-primary/30 hover:text-text-primary'
                  }`}>
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: t.dot }} />
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Hours — only if open/special */}
          {(type === 'open' || type === 'special') && (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <Input label="Opening Time" type="time" value={openTime}
                  onChange={(e) => setOpenTime(e.target.value)} />
                <Input label="Closing Time" type="time" value={closeTime}
                  onChange={(e) => setCloseTime(e.target.value)} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Input label="Lunch Start" type="time" value={lunchStart}
                  onChange={(e) => setLunchStart(e.target.value)} />
                <Input label="Lunch End" type="time" value={lunchEnd}
                  onChange={(e) => setLunchEnd(e.target.value)} />
              </div>
            </div>
          )}

          {/* Label */}
          {type !== 'open' && (
            <Input label="Label / Event Name" placeholder="e.g. Ganesh Chaturthi"
              value={label} onChange={(e) => setLabel(e.target.value)} />
          )}

          {/* Notes */}
          <Textarea label="Notes (visible to AI)" rows={3}
            placeholder="Add any notes for this day — e.g. 'Only Kavita working today'"
            value={note} onChange={(e) => setNote(e.target.value)} />

          {/* Recurring */}
          <div className="flex items-center justify-between p-3 bg-surface rounded-lg border border-border-light">
            <div>
              <p className="text-sm font-medium text-text-primary">Recurring Every Year</p>
              <p className="text-xs text-text-secondary">Apply this setting every year on this date</p>
            </div>
            <Toggle checked={recurring} onChange={setRecurring} />
          </div>
        </div>

        <div className="flex gap-2 px-5 py-4 border-t border-border-light">
          <Button variant="ghost" className="flex-1" onClick={onClose}>Cancel</Button>
          <Button variant="primary" className="flex-1" onClick={() => onSave({ type, open: openTime, close: closeTime, note, label, recurring })}>
            <Check className="w-4 h-4" /> Save Changes
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

// ── Month View ────────────────────────────────────────────────
const MonthView = ({ year, month, eventMap, schedule, onDayClick }) => {
  const firstDay = getFirstDayOfMonth(year, month);
  const daysInMonth = getDaysInMonth(year, month);
  const today = new Date();

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <div>
      {/* Day headers */}
      <div className="grid grid-cols-7 mb-1">
        {DAYS.map((d) => (
          <div key={d} className="text-center py-2 text-xs font-medium text-text-tertiary">{d}</div>
        ))}
      </div>
      {/* Cells */}
      <div className="grid grid-cols-7 gap-1">
        {cells.map((day, i) => {
          if (!day) return <div key={`empty-${i}`} />;
          const key = toDateKey(year, month, day);
          const event = eventMap[key];
          const isWeeklyOff = schedule.weeklyOff.includes(DAYS[new Date(year, month, day).getDay()]);
          const isToday = year === today.getFullYear() && month === today.getMonth() && day === today.getDate();
          const cfg = event ? (typeConfig[event.type] || typeConfig.open) : isWeeklyOff ? typeConfig.off : typeConfig.open;

          return (
            <motion.button
              key={key}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onDayClick(day, key, event)}
              className={`
                relative aspect-square rounded-xl flex flex-col items-center justify-center gap-1
                border transition-all group
                ${cfg.border}
                ${isToday ? 'ring-2 ring-primary ring-offset-1 ring-offset-background' : ''}
                hover:bg-card-hover
              `}
            >
              <span className={`text-sm font-semibold ${isToday ? 'text-primary' : 'text-text-primary'}`}>{day}</span>
              <span className={`w-2 h-2 rounded-full ${cfg.color}`} style={event ? { backgroundColor: event.color } : {}} />
              {event?.label && (
                <span className="absolute bottom-1 left-0 right-0 text-center text-2xs text-text-tertiary truncate px-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  {event.label}
                </span>
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

// ── Week View ─────────────────────────────────────────────────
const WeekView = ({ year, month, weekStart, eventMap, schedule, onDayClick }) => {
  const slots = ['9 AM','10 AM','11 AM','12 PM','1 PM','2 PM','3 PM','4 PM','5 PM','6 PM','7 PM','8 PM','9 PM'];
  const days = [];
  const d = new Date(weekStart);
  for (let i = 0; i < 7; i++) {
    const dd = new Date(d);
    dd.setDate(d.getDate() + i);
    days.push(dd);
  }
  const today = new Date();

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[700px]">
        {/* Header row */}
        <div className="grid grid-cols-8 gap-1 mb-1">
          <div className="text-xs text-text-tertiary pt-2 pr-2 text-right">Time</div>
          {days.map((d2) => {
            const key = `${d2.getFullYear()}-${String(d2.getMonth()+1).padStart(2,'0')}-${String(d2.getDate()).padStart(2,'0')}`;
            const ev = eventMap[key];
            const isToday = d2.toDateString() === today.toDateString();
            const isOff = schedule.weeklyOff.includes(DAYS[d2.getDay()]);
            const cfg = ev ? (typeConfig[ev.type] || typeConfig.open) : isOff ? typeConfig.off : typeConfig.open;
            return (
              <button key={key} onClick={() => onDayClick(d2.getDate(), key, ev)}
                className={`rounded-xl p-2 text-center border transition-colors hover:bg-card-hover ${cfg.border} ${isToday ? 'ring-2 ring-primary ring-offset-1 ring-offset-background' : ''}`}>
                <p className="text-xs text-text-tertiary">{DAYS[d2.getDay()]}</p>
                <p className={`text-lg font-bold ${isToday ? 'text-primary' : 'text-text-primary'}`}>{d2.getDate()}</p>
                <span className={`w-2 h-2 rounded-full mx-auto block mt-1 ${cfg.color}`} />
              </button>
            );
          })}
        </div>
        {/* Time slots */}
        {slots.map((slot, si) => (
          <div key={slot} className="grid grid-cols-8 gap-1 mb-0.5">
            <div className="text-xs text-text-tertiary pt-2 pr-2 text-right whitespace-nowrap">{slot}</div>
            {days.map((d2) => {
              const isLunch = si >= 4 && si <= 4;
              const isOff = schedule.weeklyOff.includes(DAYS[d2.getDay()]);
              return (
                <div key={d2.getDate()+'-'+si}
                  className={`h-10 rounded border transition-colors ${
                    isOff ? 'bg-card border-border-light/30 opacity-40' :
                    isLunch ? 'bg-warning/5 border-warning/20' :
                    'border-border-light/30 hover:bg-card-hover cursor-pointer'
                  }`}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

// ── Day View ──────────────────────────────────────────────────
const DayView = ({ dateObj, eventMap, schedule, onDayClick }) => {
  const key = `${dateObj.getFullYear()}-${String(dateObj.getMonth()+1).padStart(2,'0')}-${String(dateObj.getDate()).padStart(2,'0')}`;
  const ev = eventMap[key];
  const isOff = schedule.weeklyOff.includes(DAYS[dateObj.getDay()]);
  const cfg = ev ? (typeConfig[ev.type] || typeConfig.open) : isOff ? typeConfig.off : typeConfig.open;
  const slots = ['9:00','9:30','10:00','10:30','11:00','11:30','12:00','12:30','1:00','1:30','2:00','2:30','3:00','3:30','4:00','4:30','5:00','5:30','6:00','6:30','7:00','7:30','8:00','8:30','9:00'];

  return (
    <div className="space-y-4">
      <div className={`p-4 rounded-xl border ${cfg.border} flex items-center justify-between`}>
        <div>
          <p className="text-lg font-bold text-text-primary">
            {DAYS[dateObj.getDay()]}, {dateObj.getDate()} {MONTHS[dateObj.getMonth()]} {dateObj.getFullYear()}
          </p>
          <div className="flex items-center gap-2 mt-1">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: ev?.color || (isOff ? '#27272A' : '#22C55E') }} />
            <span className={`text-sm ${cfg.text}`}>{cfg.label}</span>
            {ev?.label && <span className="text-sm text-text-secondary">— {ev.label}</span>}
          </div>
          {ev?.note && <p className="text-xs text-text-secondary mt-1">{ev.note}</p>}
        </div>
        <Button variant="secondary" size="sm" onClick={() => onDayClick(dateObj.getDate(), key, ev)}>
          <Edit3 className="w-4 h-4" /> Edit
        </Button>
      </div>
      {!isOff && !ev && (
        <div className="space-y-1 max-h-96 overflow-y-auto">
          {slots.map((slot, i) => {
            const isLunch = i >= 8 && i <= 9;
            return (
              <div key={slot} className={`flex items-center gap-3 p-2.5 rounded-lg border ${isLunch ? 'bg-warning/5 border-warning/20' : 'border-border-light/40 hover:bg-card-hover'} transition-colors`}>
                <span className="text-xs text-text-tertiary w-12 shrink-0">{slot}</span>
                <div className="flex-1 h-px bg-border-light/50" />
                {isLunch && <span className="text-xs text-warning flex items-center gap-1"><Coffee className="w-3 h-3" /> Lunch</span>}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

// ── Main Page ─────────────────────────────────────────────────
const BusinessCalendar = () => {
  const today = new Date();
  const [view, setView] = useState('month');
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedKey, setSelectedKey] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [editorOpen, setEditorOpen] = useState(false);
  const [events, setEvents] = useState(() => {
    const map = {};
    calendarEvents.forEach((e) => { map[e.date] = e; });
    return map;
  });
  const [schedule, setSchedule] = useState(defaultSchedule);
  const [weekStart, setWeekStart] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() - d.getDay());
    return new Date(d);
  });
  const [dayView, setDayView] = useState(today);

  const handleDayClick = (day, key, event) => {
    setSelectedDay(day);
    setSelectedKey(key);
    setSelectedEvent(event || null);
    setEditorOpen(true);
  };

  const handleSave = (data) => {
    setEvents((prev) => ({ ...prev, [selectedKey]: { date: selectedKey, ...data } }));
    setEditorOpen(false);
  };

  const navigate = (dir) => {
    if (view === 'month') {
      const d = new Date(year, month + dir, 1);
      setYear(d.getFullYear());
      setMonth(d.getMonth());
    } else if (view === 'week') {
      const d = new Date(weekStart);
      d.setDate(d.getDate() + dir * 7);
      setWeekStart(new Date(d));
    } else {
      const d = new Date(dayView);
      d.setDate(d.getDate() + dir);
      setDayView(new Date(d));
    }
  };

  const titleLabel = view === 'month'
    ? `${MONTHS[month]} ${year}`
    : view === 'week'
    ? `${weekStart.getDate()} ${MONTHS[weekStart.getMonth()]} – ${new Date(weekStart.getTime() + 6*86400000).getDate()} ${MONTHS[new Date(weekStart.getTime() + 6*86400000).getMonth()]} ${year}`
    : `${DAYS[dayView.getDay()]}, ${dayView.getDate()} ${MONTHS[dayView.getMonth()]} ${dayView.getFullYear()}`;

  const legend = Object.entries(typeConfig).map(([k, v]) => ({ type: k, ...v }));

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-text-primary">Business Calendar</h2>
          <p className="text-sm text-text-secondary">Manage working hours, holidays, and schedule</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" onClick={() => setEditorOpen(true)}>
            <Plus className="w-4 h-4" /> Add Event
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Calendar panel */}
        <div className="xl:col-span-3 space-y-4">
          {/* Toolbar */}
          <Card>
            <CardContent className="py-3">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                {/* View switcher */}
                <div className="flex gap-1 bg-surface rounded-lg border border-border-light p-1">
                  {['month', 'week', 'day'].map((v) => (
                    <button key={v} onClick={() => setView(v)}
                      className={`px-3 py-1.5 rounded-md text-sm font-medium capitalize transition-colors ${
                        view === v ? 'bg-primary text-white' : 'text-text-secondary hover:text-text-primary'
                      }`}>
                      {v}
                    </button>
                  ))}
                </div>
                {/* Nav */}
                <div className="flex items-center gap-2 flex-1">
                  <button onClick={() => navigate(-1)} className="p-1.5 rounded-lg border border-border-light text-text-secondary hover:text-text-primary hover:bg-card-hover transition-colors">
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="text-sm font-semibold text-text-primary min-w-[200px] text-center">{titleLabel}</span>
                  <button onClick={() => navigate(1)} className="p-1.5 rounded-lg border border-border-light text-text-secondary hover:text-text-primary hover:bg-card-hover transition-colors">
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <button onClick={() => { setYear(today.getFullYear()); setMonth(today.getMonth()); setDayView(today); }}
                    className="ml-2 px-3 py-1.5 rounded-lg border border-border-light text-xs font-medium text-text-secondary hover:text-text-primary hover:bg-card-hover transition-colors">
                    Today
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Calendar view */}
          <Card>
            <CardContent>
              {view === 'month' && (
                <MonthView year={year} month={month} eventMap={events} schedule={schedule} onDayClick={handleDayClick} />
              )}
              {view === 'week' && (
                <WeekView year={year} month={month} weekStart={weekStart} eventMap={events} schedule={schedule} onDayClick={handleDayClick} />
              )}
              {view === 'day' && (
                <DayView dateObj={dayView} eventMap={events} schedule={schedule} onDayClick={handleDayClick} />
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right sidebar */}
        <div className="space-y-4">
          {/* Legend */}
          <Card>
            <CardContent>
              <p className="text-sm font-semibold text-text-primary mb-3">Status Legend</p>
              <div className="space-y-2">
                {[
                  { dot: '#22C55E', label: 'Open (Normal)' },
                  { dot: '#F59E0B', label: 'Special Hours / Festival' },
                  { dot: '#EF4444', label: 'Holiday / Emergency' },
                  { dot: '#6366F1', label: 'Vacation' },
                  { dot: '#27272A', label: 'Weekly Off' },
                ].map((l, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-sm text-text-secondary">
                    <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: l.dot }} />
                    {l.label}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Default schedule */}
          <Card>
            <CardContent>
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-semibold text-text-primary">Default Schedule</p>
                <button className="text-xs text-primary hover:text-primary-400 transition-colors">Edit</button>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-text-secondary">
                  <Clock className="w-4 h-4 text-text-tertiary shrink-0" />
                  <span>{schedule.openTime} – {schedule.closeTime}</span>
                </div>
                <div className="flex items-center gap-2 text-text-secondary">
                  <Coffee className="w-4 h-4 text-text-tertiary shrink-0" />
                  <span>Lunch {schedule.lunchStart} – {schedule.lunchEnd}</span>
                </div>
                <div className="flex items-center gap-2 text-text-secondary">
                  <CalendarOff className="w-4 h-4 text-text-tertiary shrink-0" />
                  <span>Off: {schedule.weeklyOff.join(', ')}</span>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-border-light">
                <p className="text-xs text-text-tertiary mb-2">Working Days</p>
                <div className="flex gap-1 flex-wrap">
                  {DAYS.map((d) => (
                    <span key={d} className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-colors ${
                      schedule.weeklyOff.includes(d)
                        ? 'bg-surface text-text-tertiary'
                        : 'bg-primary/10 text-primary'
                    }`}>{d[0]}</span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Upcoming events */}
          <Card>
            <CardContent>
              <p className="text-sm font-semibold text-text-primary mb-3">Upcoming Events</p>
              <div className="space-y-2">
                {calendarEvents.slice(0, 4).map((ev, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                    className="flex items-start gap-2.5 p-2.5 rounded-lg bg-surface border border-border-light">
                    <span className="w-2.5 h-2.5 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: ev.color }} />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-text-primary">{ev.label}</p>
                      <p className="text-2xs text-text-tertiary">{ev.date}</p>
                      <p className="text-2xs text-text-secondary truncate">{ev.note}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Staff availability */}
          <Card>
            <CardContent>
              <div className="flex items-center gap-2 mb-3">
                <Users className="w-4 h-4 text-text-tertiary" />
                <p className="text-sm font-semibold text-text-primary">Staff Availability</p>
              </div>
              <div className="space-y-3">
                {staffAvailability.map((staff, i) => (
                  <div key={i}>
                    <div className="flex items-center gap-2 mb-1">
                      <Avatar name={staff.name} size="xs" color="primary" />
                      <div>
                        <p className="text-xs font-medium text-text-primary">{staff.name}</p>
                        <p className="text-2xs text-text-tertiary">{staff.role}</p>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      {DAYS.slice(0,7).map((d) => (
                        <span key={d} className={`w-7 h-5 rounded text-2xs flex items-center justify-center font-medium transition-colors ${
                          staff.available.includes(d) ? 'bg-success/15 text-success' : 'bg-danger/10 text-danger'
                        }`}>{d[0]}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Day editor modal */}
      <AnimatePresence>
        {editorOpen && (
          <DayEditorModal
            date={selectedKey || toDateKey(year, month, today.getDate())}
            event={selectedEvent}
            schedule={schedule}
            onSave={handleSave}
            onClose={() => setEditorOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default BusinessCalendar;
