import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Instagram, Facebook, Globe, Search, Phone, Video, MoreVertical, UserCheck, Send, Sparkles } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Avatar from '../../components/ui/Avatar';
import Button from '../../components/ui/Button';
import ConversationBubble, { TypingIndicator } from '../../components/shared/ConversationBubble';
import { recentConversations, conversationMessages } from '../../data/mockData';

const channelIcons = {
  whatsapp: { icon: MessageCircle, color: 'text-success', bg: 'bg-success/10' },
  instagram: { icon: Instagram, color: 'text-pink-500', bg: 'bg-pink-500/10' },
  facebook: { icon: Facebook, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  website: { icon: Globe, color: 'text-accent', bg: 'bg-accent/10' },
};

const Inbox = () => {
  const [activeId, setActiveId] = useState(1);
  const [filter, setFilter] = useState('all');
  const [showTyping, setShowTyping] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState(conversationMessages[1] || []);
  const [takenOver, setTakenOver] = useState(false);

  const filtered = recentConversations.filter((c) => {
    if (filter === 'unread') return c.unread > 0;
    if (filter === 'ai') return c.status === 'ai';
    if (filter === 'human') return c.status === 'human';
    return true;
  });

  const activeConv = recentConversations.find((c) => c.id === activeId) || recentConversations[0];

  const handleSelect = (id) => {
    setActiveId(id);
    setTakenOver(false);
    setMessages(conversationMessages[id] || conversationMessages[1]);
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const newMsg = { id: Date.now(), sender: 'ai', text: input, time: 'Now' };
    setMessages([...messages, newMsg]);
    setInput('');
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex gap-4">
      {/* Left — conversation list */}
      <Card className="w-full sm:w-80 shrink-0 flex flex-col overflow-hidden">
        <div className="p-4 border-b border-border-light">
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
            <input placeholder="Search..." className="w-full bg-surface border border-border-light rounded-lg pl-10 pr-4 py-2 text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-primary" />
          </div>
          <div className="flex gap-1">
            {['all', 'unread', 'ai', 'human'].map((f) => (
              <button key={f} onClick={() => setFilter(f)}
                className={`px-3 py-1 rounded-lg text-xs font-medium capitalize transition-colors ${
                  filter === f ? 'bg-primary text-white' : 'bg-surface text-text-secondary hover:text-text-primary'
                }`}>
                {f === 'ai' ? 'AI' : f}
              </button>
            ))}
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {filtered.map((conv) => {
            const ChannelIcon = channelIcons[conv.channel];
            return (
              <button key={conv.id} onClick={() => handleSelect(conv.id)}
                className={`w-full flex items-center gap-3 p-3 border-b border-border-light/50 hover:bg-card-hover transition-colors text-left ${
                  activeId === conv.id ? 'bg-card-hover' : ''
                }`}>
                <div className="relative">
                  <Avatar name={conv.name} size="md" color="primary" />
                  {ChannelIcon && (
                    <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full ${ChannelIcon.bg} flex items-center justify-center border-2 border-card`}>
                      <ChannelIcon.icon className={`w-3 h-3 ${ChannelIcon.color}`} />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-text-primary truncate">{conv.name}</p>
                    <span className="text-2xs text-text-tertiary shrink-0">{conv.time}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-text-secondary truncate">{conv.preview}</p>
                    {conv.unread > 0 && <Badge variant="danger" size="sm" className="ml-1">{conv.unread}</Badge>}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </Card>

      {/* Right — conversation view */}
      <Card className="flex-1 flex flex-col overflow-hidden hidden sm:flex">
        {/* Header */}
        <div className="p-4 border-b border-border-light flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar name={activeConv.name} size="md" color="primary" />
            <div>
              <p className="text-sm font-semibold text-text-primary">{activeConv.name}</p>
              <p className="text-xs text-text-secondary">{activeConv.phone}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={takenOver ? 'warning' : 'success'} dot>
              {takenOver ? 'Human' : 'AI Handling'}
            </Badge>
            {!takenOver ? (
              <Button variant="secondary" size="sm" onClick={() => setTakenOver(true)}>
                <UserCheck className="w-4 h-4" /> Take Over
              </Button>
            ) : (
              <Button variant="ghost" size="sm" onClick={() => setTakenOver(false)}>
                Hand to AI
              </Button>
            )}
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-surface/30">
          {messages.map((msg, i) => (
            <ConversationBubble key={msg.id} message={msg} index={i} />
          ))}
          {showTyping && <TypingIndicator />}
        </div>

        {/* Quick replies */}
        <div className="px-4 py-2 border-t border-border-light flex gap-2 overflow-x-auto no-scrollbar">
          {['Slot available hai ✅', 'Booking confirm 🎉', 'Pricing bhej diya', 'Kal milte hain'].map((q) => (
            <button key={q} onClick={() => setInput(q)}
              className="px-3 py-1.5 rounded-full bg-surface border border-border-light text-xs text-text-secondary hover:text-text-primary hover:border-primary/30 transition-colors whitespace-nowrap">
              {q}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-border-light flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={takenOver ? "Type as human..." : "Type a message..."}
            className="flex-1 bg-surface border border-border-light rounded-lg px-4 py-2.5 text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-primary"
          />
          <Button variant="primary" onClick={handleSend}>
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </Card>

      {/* Customer details sidebar (desktop) */}
      <Card className="w-72 shrink-0 hidden xl:flex flex-col overflow-hidden">
        <div className="p-4 border-b border-border-light text-center">
          <Avatar name={activeConv.name} size="xl" color="primary" className="mx-auto mb-3" />
          <p className="text-base font-semibold text-text-primary">{activeConv.name}</p>
          <p className="text-xs text-text-secondary">{activeConv.phone}</p>
          <Badge variant="info" size="sm" className="mt-2">VIP Customer</Badge>
        </div>
        <div className="p-4 space-y-3 flex-1 overflow-y-auto">
          <div>
            <p className="text-xs text-text-tertiary uppercase tracking-wider mb-2">Customer Info</p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-text-secondary">Total Bookings</span><span className="text-text-primary font-medium">24</span></div>
              <div className="flex justify-between"><span className="text-text-secondary">Lifetime Value</span><span className="text-text-primary font-medium">₹12,400</span></div>
              <div className="flex justify-between"><span className="text-text-secondary">Last Visit</span><span className="text-text-primary font-medium">Today</span></div>
              <div className="flex justify-between"><span className="text-text-secondary">City</span><span className="text-text-primary font-medium">Pune</span></div>
            </div>
          </div>
          <div>
            <p className="text-xs text-text-tertiary uppercase tracking-wider mb-2">AI Summary</p>
            <div className="p-3 bg-primary/5 border border-primary/20 rounded-lg">
              <div className="flex items-center gap-1.5 mb-2">
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                <span className="text-xs font-medium text-primary">AI Generated</span>
              </div>
              <p className="text-xs text-text-secondary leading-relaxed">
                Priya is a regular customer interested in facial services. She booked a Basic Facial for tomorrow 3 PM. Prefers afternoon slots.
              </p>
            </div>
          </div>
          <div>
            <p className="text-xs text-text-tertiary uppercase tracking-wider mb-2">Tags</p>
            <div className="flex flex-wrap gap-1.5">
              <Badge variant="success" size="sm">VIP</Badge>
              <Badge variant="info" size="sm">Regular</Badge>
              <Badge variant="accent" size="sm">Facial</Badge>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Inbox;
