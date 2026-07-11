import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Bot, Inbox, CalendarCheck, Users, BarChart3,
  BookOpen, Plug, CreditCard, Settings, ChevronLeft, ChevronRight,
  HelpCircle, LogOut, Menu, X, Calendar, AlertTriangle, Radio,
  Store,
} from 'lucide-react';
import Logo from '../ui/Logo';
import Badge from '../ui/Badge';
import Toggle from '../ui/Toggle';
import { useBusiness } from '../../context/BusinessContext';

const navGroups = [
  {
    label: 'Main',
    items: [
      { path: '/dashboard/overview', label: 'Overview', icon: LayoutDashboard },
      { path: '/dashboard/inbox', label: 'Inbox', icon: Inbox, badge: 3 },
      { path: '/dashboard/bookings', label: 'Bookings', icon: CalendarCheck },
      { path: '/dashboard/customers', label: 'Customers', icon: Users },
      { path: '/dashboard/analytics', label: 'Analytics', icon: BarChart3 },
    ],
  },
  {
    label: 'Business',
    items: [
      { path: '/dashboard/business-profile', label: 'Business Profile', icon: Store },
      { path: '/dashboard/calendar', label: 'Calendar', icon: Calendar },
      { path: '/dashboard/emergency', label: 'Emergency Mode', icon: AlertTriangle },
      { path: '/dashboard/broadcast', label: 'Broadcast', icon: Radio },
    ],
  },
  {
    label: 'AI',
    items: [
      { path: '/dashboard/ai-employee', label: 'AI Employee', icon: Bot },
      { path: '/dashboard/knowledge-base', label: 'Knowledge Base', icon: BookOpen },
    ],
  },
  {
    label: 'Account',
    items: [
      { path: '/dashboard/integrations', label: 'Integrations', icon: Plug },
      { path: '/dashboard/billing', label: 'Billing', icon: CreditCard },
      { path: '/dashboard/settings', label: 'Settings', icon: Settings },
    ],
  },
];

const Sidebar = ({ collapsed, setCollapsed, mobileOpen, setMobileOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
    const { business } = useBusiness();
  const [aiOnline, setAiOnline] = useState(true);

  const NavLink = ({ item }) => {
    const isActive = location.pathname === item.path;
    return (
      <Link
        to={item.path}
        onClick={() => setMobileOpen(false)}
        title={collapsed ? item.label : undefined}
        className={`
          relative flex items-center rounded-lg text-sm font-medium transition-colors
          ${collapsed ? 'justify-center px-0 py-2.5 mx-auto w-10 h-10' : 'gap-3 px-3 py-2.5'}
          ${isActive ? 'bg-primary/10 text-primary' : 'text-text-secondary hover:text-text-primary hover:bg-card-hover'}
        `}
      >
        {isActive && (
          <motion.div
            layoutId="sidebar-active"
            className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-r-full"
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          />
        )}
        <item.icon className="w-5 h-5 shrink-0" />
        {!collapsed && <span className="flex-1 truncate">{item.label}</span>}
        {!collapsed && item.badge && (
          <Badge variant="danger" size="sm">{item.badge}</Badge>
        )}
      </Link>
    );
  };

  const sidebarContent = (
    <>
      {/* Logo */}
      <div className={`p-4 border-b border-border-light ${collapsed ? 'px-3' : ''}`}>
        {collapsed ? <Logo showText={false} /> : <Logo />}
      </div>

      {/* Business info */}
      {!collapsed && (
        <div className="px-4 py-3 border-b border-border-light">
          <div className="flex items-center justify-between mb-2">
            <div className="min-w-0">
              <p className="text-sm font-semibold text-text-primary truncate">{business?.name || "Loading..."}</p>
              <p className="text-xs text-text-tertiary">{business?.city || ""}</p>
            </div>
            <Badge variant="info" size="sm" className="shrink-0 ml-1">
  Starter
</Badge>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full shrink-0 ${aiOnline ? 'bg-success animate-pulse' : 'bg-danger'}`} />
              <span className="text-xs text-text-secondary">AI {aiOnline ? 'Online' : 'Offline'}</span>
            </div>
            <Toggle checked={aiOnline} onChange={setAiOnline} size="sm" />
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-3 no-scrollbar" style={{ padding: collapsed ? '12px 8px' : '12px 8px' }}>
        {navGroups.map((group) => (
          <div key={group.label} className={collapsed ? 'mb-1' : 'mb-3'}>
            {!collapsed && (
              <p className="px-3 pb-1 text-2xs font-semibold text-text-tertiary uppercase tracking-widest">
                {group.label}
              </p>
            )}
            {collapsed && <div className="my-1 mx-2 h-px bg-border-light/50" />}
            <div className="space-y-0.5">
              {group.items.map((item) => (
                <NavLink key={item.path} item={item} />
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* Bottom */}
      <div className="p-2 border-t border-border-light space-y-0.5">
        <button
          title={collapsed ? 'Help & Support' : undefined}
          className={`w-full flex items-center rounded-lg text-sm text-text-secondary hover:text-text-primary hover:bg-card-hover transition-colors ${collapsed ? 'justify-center px-0 py-2.5 w-10 h-10 mx-auto' : 'gap-3 px-3 py-2.5'}`}
        >
          <HelpCircle className="w-5 h-5 shrink-0" />
          {!collapsed && 'Help & Support'}
        </button>
        <button
          onClick={() => navigate('/login')}
          title={collapsed ? 'Logout' : undefined}
          className={`w-full flex items-center rounded-lg text-sm text-text-secondary hover:text-danger hover:bg-danger/10 transition-colors ${collapsed ? 'justify-center px-0 py-2.5 w-10 h-10 mx-auto' : 'gap-3 px-3 py-2.5'}`}
        >
          <LogOut className="w-5 h-5 shrink-0" />
          {!collapsed && 'Logout'}
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <motion.aside
        animate={{ width: collapsed ? 72 : 256 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="hidden lg:flex flex-col bg-card border-r border-border-light fixed left-0 top-0 bottom-0 z-30"
      >
        {/* Overflow wrapper so nav scrolls but toggle button isn't clipped */}
        <div className="flex flex-col flex-1 overflow-hidden">{sidebarContent}</div>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center shadow-glow hover:scale-110 transition-transform z-50"
        >
          {collapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
        </button>
      </motion.aside>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
            />
            <motion.aside
              initial={{ x: -300 }} animate={{ x: 0 }} exit={{ x: -300 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed left-0 top-0 bottom-0 w-64 bg-card border-r border-border-light z-50 lg:hidden flex flex-col overflow-hidden"
            >
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
