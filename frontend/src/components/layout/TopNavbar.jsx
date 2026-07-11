import { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Bell, ChevronDown, Menu, Command, User, Settings, LogOut } from 'lucide-react';
import Avatar from '../ui/Avatar';
import Badge from '../ui/Badge';
import { notifications } from '../../data/mockData';
import { useBusiness } from '../../context/BusinessContext';

const TopNavbar = ({ collapsed, onMenuClick }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { business } = useBusiness();
  const [showNotif, setShowNotif] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const notifRef = useRef(null);
  const profileRef = useRef(null);

  const pageNames = {
    '/dashboard/overview': 'Overview',
    '/dashboard/ai-employee': 'AI Employee',
    '/dashboard/inbox': 'Inbox',
    '/dashboard/bookings': 'Bookings',
    '/dashboard/customers': 'Customers',
    '/dashboard/analytics': 'Analytics',
    '/dashboard/knowledge-base': 'Knowledge Base',
    '/dashboard/integrations': 'Integrations',
    '/dashboard/billing': 'Billing',
    '/dashboard/settings': 'Settings',
    '/dashboard/calendar': 'Business Calendar',
    '/dashboard/emergency': 'Emergency Mode',
    '/dashboard/broadcast': 'Broadcast Center',
    '/dashboard/business-profile': 'Business Profile',
  };

  const currentPage = pageNames[location.pathname] || 'Dashboard';
  const unreadCount = notifications.filter((n) => n.unread).length;

  useEffect(() => {
    const handler = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) setShowNotif(false);
      if (profileRef.current && !profileRef.current.contains(e.target)) setShowProfile(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
      if (e.key === 'Escape') setSearchOpen(false);
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  return (
    <>
      <header className={`sticky top-0 z-20 h-16 bg-card/80 backdrop-blur-xl border-b border-border-light flex items-center px-4 lg:px-6 transition-all duration-300 ${collapsed ? 'lg:ml-[72px]' : 'lg:ml-[256px]'}`}>
        {/* Mobile menu */}
        <button onClick={onMenuClick} className="lg:hidden p-2 text-text-secondary hover:text-text-primary mr-2">
          <Menu className="w-5 h-5" />
        </button>

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm">
          <span className="text-text-tertiary">Dashboard</span>
          <span className="text-text-tertiary">/</span>
          <span className="text-text-primary font-medium">{currentPage}</span>
        </div>

        {/* Search */}
        <button
          onClick={() => setSearchOpen(true)}
          className="hidden md:flex items-center gap-2 ml-6 px-3 py-1.5 rounded-lg bg-surface border border-border-light text-sm text-text-tertiary hover:border-primary/30 transition-colors w-64"
        >
          <Search className="w-4 h-4" />
          <span>Search...</span>
          <kbd className="ml-auto flex items-center gap-0.5 text-2xs bg-card px-1.5 py-0.5 rounded border border-border-light">
            <Command className="w-3 h-3" />K
          </kbd>
        </button>

        {/* Right */}
        <div className="ml-auto flex items-center gap-2">
          {/* Notifications */}
          <div ref={notifRef} className="relative">
            <button
              onClick={() => setShowNotif(!showNotif)}
              className="relative p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-card-hover transition-colors"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-danger text-white text-2xs font-bold flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>
            <AnimatePresence>
              {showNotif && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-2 w-80 bg-card border border-border-light rounded-xl shadow-float overflow-hidden z-50"
                >
                  <div className="p-3 border-b border-border-light flex items-center justify-between">
                    <p className="text-sm font-semibold text-text-primary">Notifications</p>
                    <Badge variant="danger" size="sm">{unreadCount} new</Badge>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.map((n) => (
                      <div key={n.id} className={`p-3 border-b border-border-light/50 hover:bg-card-hover transition-colors cursor-pointer ${n.unread ? 'bg-primary/5' : ''}`}>
                        <div className="flex items-start gap-2">
                          <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${n.type === 'success' ? 'bg-success' : n.type === 'warning' ? 'bg-warning' : 'bg-primary'}`} />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-text-primary">{n.title}</p>
                            <p className="text-xs text-text-secondary">{n.desc}</p>
                            <p className="text-2xs text-text-tertiary mt-1">{n.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Profile */}
          <div ref={profileRef} className="relative">
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center gap-2 p-1 rounded-lg hover:bg-card-hover transition-colors"
            >
              <Avatar name={business?.owner_name || "Owner"} size="sm" color="primary" />
              <div className="hidden sm:block text-left">
                <p className="text-sm font-medium text-text-primary">{business?.owner_name || "Owner"}</p>
                <p className="text-xs text-text-tertiary">{business?.name || "Business"}</p>
              </div>
              <ChevronDown className="w-4 h-4 text-text-tertiary hidden sm:block" />
            </button>
            <AnimatePresence>
              {showProfile && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-2 w-56 bg-card border border-border-light rounded-xl shadow-float overflow-hidden z-50"
                >
                  <div className="p-3 border-b border-border-light">
                    <p className="text-sm font-semibold text-text-primary">{business?.owner_name || "Owner"}</p>
                    <p className="text-xs text-text-tertiary">{"Email not available"}</p>
                  </div>
                  <div className="p-1">
                    <button onClick={() => navigate('/dashboard/settings')} className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-text-secondary hover:text-text-primary hover:bg-card-hover transition-colors">
                      <User className="w-4 h-4" /> Profile
                    </button>
                    <button onClick={() => navigate('/dashboard/settings')} className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-text-secondary hover:text-text-primary hover:bg-card-hover transition-colors">
                      <Settings className="w-4 h-4" /> Settings
                    </button>
                    <button onClick={() => navigate('/login')} className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-text-secondary hover:text-danger hover:bg-danger/10 transition-colors">
                      <LogOut className="w-4 h-4" /> Logout
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>

      {/* Command palette */}
      <AnimatePresence>
        {searchOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSearchOpen(false)}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed top-1/4 left-1/2 -translate-x-1/2 w-full max-w-lg bg-card border border-border-light rounded-2xl shadow-float z-50 overflow-hidden"
            >
              <div className="flex items-center gap-3 p-4 border-b border-border-light">
                <Search className="w-5 h-5 text-text-tertiary" />
                <input
                  autoFocus
                  placeholder="Search conversations, customers, bookings..."
                  className="flex-1 bg-transparent text-text-primary placeholder:text-text-tertiary focus:outline-none text-sm"
                />
                <kbd className="text-2xs bg-surface px-1.5 py-0.5 rounded border border-border-light text-text-tertiary">ESC</kbd>
              </div>
              <div className="p-2 max-h-80 overflow-y-auto">
                <p className="text-xs text-text-tertiary px-3 py-2 uppercase tracking-wider">Pages</p>
                {Object.entries(pageNames).map(([path, name]) => (
                  <button
                    key={path}
                    onClick={() => { navigate(path); setSearchOpen(false); }}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-text-secondary hover:text-text-primary hover:bg-card-hover transition-colors"
                  >
                    <Search className="w-4 h-4" /> {name}
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default TopNavbar;
