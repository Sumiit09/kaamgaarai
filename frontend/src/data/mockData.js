// ═══════════════════════════════════════════════════════════
// KaamgaarAI — Mock Data (Realistic Indian Business Data)
// ═══════════════════════════════════════════════════════════

export const businessInfo = {
  name: 'Dream Salon',
  owner: 'Priya Sharma',
  plan: 'Growth',
  city: 'Pune',
  phone: '+91 98765 43210',
  email: 'priya@dreamsalon.in',
  aiStatus: 'online',
};

// ── Dashboard Stats ──────────────────────────────────────────
export const dashboardStats = {
  row1: [
    { label: "Today's Conversations", value: 47, trend: 12.5, icon: 'MessageSquare', color: 'primary' },
    { label: "Today's Bookings", value: 14, trend: 8.2, icon: 'CalendarCheck', color: 'accent' },
    { label: 'This Month Revenue', value: '₹45,230', trend: 23.1, icon: 'IndianRupee', color: 'success' },
    { label: 'Active Customers', value: 312, trend: 5.4, icon: 'Users', color: 'warning' },
  ],
  row2: [
    { label: 'AI Accuracy', value: '96.8%', trend: 2.1, icon: 'Target', color: 'success' },
    { label: 'Avg Response Time', value: '1.2s', trend: -15.3, icon: 'Zap', color: 'accent' },
    { label: 'Conversion Rate', value: '34.2%', trend: 4.7, icon: 'TrendingUp', color: 'primary' },
    { label: 'Unread Messages', value: 3, trend: 0, icon: 'Bell', color: 'danger' },
  ],
};

// ── Chart Data ───────────────────────────────────────────────
export const conversationTrend = [
  { day: 'Mon', conversations: 32, bookings: 8 },
  { day: 'Tue', conversations: 45, bookings: 12 },
  { day: 'Wed', conversations: 38, bookings: 10 },
  { day: 'Thu', conversations: 52, bookings: 15 },
  { day: 'Fri', conversations: 61, bookings: 18 },
  { day: 'Sat', conversations: 73, bookings: 22 },
  { day: 'Sun', conversations: 47, bookings: 14 },
];

export const bookingTrend = [
  { day: 'Mon', bookings: 8 },
  { day: 'Tue', bookings: 12 },
  { day: 'Wed', bookings: 10 },
  { day: 'Thu', bookings: 15 },
  { day: 'Fri', bookings: 18 },
  { day: 'Sat', bookings: 22 },
  { day: 'Sun', bookings: 14 },
];

export const leadSources = [
  { name: 'WhatsApp', value: 58, color: '#22C55E' },
  { name: 'Instagram', value: 22, color: '#EC4899' },
  { name: 'Website', value: 12, color: '#2563EB' },
  { name: 'Facebook', value: 8, color: '#06B6D4' },
];

export const revenueTrend = [
  { month: 'Jan', revenue: 28400 },
  { month: 'Feb', revenue: 32100 },
  { month: 'Mar', revenue: 38900 },
  { month: 'Apr', revenue: 35200 },
  { month: 'May', revenue: 41800 },
  { month: 'Jun', revenue: 45230 },
  { month: 'Jul', revenue: 48900 },
];

export const responseTimeDist = [
  { range: '<1s', count: 145 },
  { range: '1-2s', count: 198 },
  { range: '2-3s', count: 89 },
  { range: '3-5s', count: 34 },
  { range: '5s+', count: 12 },
];

export const peakHours = [
  { hour: '6 AM', value: 2 },
  { hour: '8 AM', value: 8 },
  { hour: '10 AM', value: 24 },
  { hour: '12 PM', value: 38 },
  { hour: '2 PM', value: 45 },
  { hour: '4 PM', value: 52 },
  { hour: '6 PM', value: 67 },
  { hour: '8 PM', value: 48 },
  { hour: '10 PM', value: 19 },
];

// ── Recent Conversations ─────────────────────────────────────
export const recentConversations = [
  {
    id: 1,
    name: 'Priya Sharma',
    phone: '+91 98765 43210',
    channel: 'whatsapp',
    preview: 'Perfect! Aapki booking confirm ho gayi 🎉 Kal 3 baje...',
    time: '2 min ago',
    unread: 0,
    status: 'ai',
    avatar: 'PS',
  },
  {
    id: 2,
    name: 'Rahul Mehta',
    phone: '+91 98123 45678',
    channel: 'whatsapp',
    preview: 'Bhaiya, admission form ka link bhej diya hai',
    time: '8 min ago',
    unread: 2,
    status: 'ai',
    avatar: 'RM',
  },
  {
    id: 3,
    name: 'Anjali Singh',
    phone: '+91 99876 54321',
    channel: 'instagram',
    preview: 'Spa package ke liye 15% discount hai is month',
    time: '15 min ago',
    unread: 1,
    status: 'ai',
    avatar: 'AS',
  },
  {
    id: 4,
    name: 'Vikram Patel',
    phone: '+91 90123 45678',
    channel: 'whatsapp',
    preview: 'Hair color booking tomorrow 11 AM — confirmed',
    time: '32 min ago',
    unread: 0,
    status: 'human',
    avatar: 'VP',
  },
  {
    id: 5,
    name: 'Sunita Devi',
    phone: '+91 91234 56789',
    channel: 'whatsapp',
    preview: 'Aaj sham 6 baje slot available hai',
    time: '1 hr ago',
    unread: 0,
    status: 'ai',
    avatar: 'SD',
  },
  {
    id: 6,
    name: 'Rohan Kulkarni',
    phone: '+91 93456 78901',
    channel: 'facebook',
    preview: 'Gym membership plans bhej diye, koi query?',
    time: '2 hr ago',
    unread: 0,
    status: 'ai',
    avatar: 'RK',
  },
  {
    id: 7,
    name: 'Meena Joshi',
    phone: '+91 94567 89012',
    channel: 'whatsapp',
    preview: 'Bakery order for 20 people — quote bhej diya',
    time: '3 hr ago',
    unread: 0,
    status: 'ai',
    avatar: 'MJ',
  },
  {
    id: 8,
    name: 'Arjun Yadav',
    phone: '+91 95678 90123',
    channel: 'website',
    preview: 'Car service booking confirmed for Saturday',
    time: '4 hr ago',
    unread: 0,
    status: 'ai',
    avatar: 'AY',
  },
];

// ── Conversation Messages (Inbox) ────────────────────────────
export const conversationMessages = {
  1: [
    { id: 1, sender: 'customer', text: 'Kal 3 baje facial ke liye slot hai kya?', time: '2:30 PM' },
    { id: 2, sender: 'ai', text: 'Haan Priya ji! Kal 3 baje available hai. Kaunsa facial chahiye? Basic (₹500) ya Premium (₹900)?', time: '2:30 PM' },
    { id: 3, sender: 'customer', text: 'Basic wala', time: '2:31 PM' },
    { id: 4, sender: 'ai', text: 'Perfect! Aapki booking confirm ho gayi 🎉 Kal 3 baje Dream Salon mein milte hain!', time: '2:31 PM' },
    { id: 5, sender: 'customer', text: 'Thank you! Kuch leke jana hai?', time: '2:32 PM' },
    { id: 6, sender: 'ai', text: 'Bas aana hai, baaki sab hum sambhal lenge 😊 Aapka appointment add ho gaya system mein.', time: '2:32 PM' },
  ],
  2: [
    { id: 1, sender: 'customer', text: 'Hello, coaching classes ke baare mein jaanna tha', time: '1:45 PM' },
    { id: 2, sender: 'ai', text: 'Namaste Rahul! Mehta Coaching mein aapka swagat hai. Hum 8th-12th standard ke liye coaching provide karte hain. Konsa class chahiye?', time: '1:45 PM' },
    { id: 3, sender: 'customer', text: '10th standard, CBSE board', time: '1:46 PM' },
    { id: 4, sender: 'ai', text: 'Great! 10th CBSE ka batch hai. Fees ₹2,500/month hai. Demo class book karne chahte ho?', time: '1:46 PM' },
    { id: 5, sender: 'customer', text: 'Haan, demo class chahiye', time: '1:47 PM' },
    { id: 6, sender: 'ai', text: 'Bhaiya, admission form ka link bhej diya hai. Demo class Saturday 10 AM pe scheduled hai.', time: '1:47 PM' },
  ],
  3: [
    { id: 1, sender: 'customer', text: 'Spa ke packages kya kya hai?', time: '1:15 PM' },
    { id: 2, sender: 'ai', text: 'Namaste Anjali! Wellness Spa mein 3 packages hain: Relaxation (₹1,200), Premium (₹2,500), Luxury (₹4,000). Is month 15% discount bhi hai!', time: '1:15 PM' },
    { id: 3, sender: 'customer', text: 'Premium wala with discount?', time: '1:16 PM' },
    { id: 4, sender: 'ai', text: 'Premium package ₹2,125 mein (15% off lagu). 90 minute ka session hai. Booking karu?', time: '1:16 PM' },
  ],
  4: [
    { id: 1, sender: 'customer', text: 'Hair color karwana hai, kitna time lagega?', time: '12:30 PM' },
    { id: 2, sender: 'ai', text: 'Vikram ji, hair color ke liye 2-3 hours lagte hain. Global color ₹800, highlights ₹1,500. Kal 11 AM slot available hai.', time: '12:30 PM' },
    { id: 3, sender: 'customer', text: 'Global color, kal 11 baje', time: '12:31 PM' },
    { id: 4, sender: 'ai', text: 'Hair color booking tomorrow 11 AM — confirmed. ₹800 final amount. Thank you!', time: '12:31 PM' },
  ],
};

// ── Today's Bookings ─────────────────────────────────────────
export const todayBookings = [
  { id: 1, customer: 'Rahul Mehta', service: 'Haircut', time: '2:00 PM', price: '₹250', status: 'confirmed', avatar: 'RM', phone: '+91 98123 45678' },
  { id: 2, customer: 'Anjali Singh', service: 'Facial', time: '4:00 PM', price: '₹500', status: 'confirmed', avatar: 'AS', phone: '+91 99876 54321' },
  { id: 3, customer: 'Vikram Patel', service: 'Hair Color', time: '11:00 AM', price: '₹800', status: 'completed', avatar: 'VP', phone: '+91 90123 45678' },
  { id: 4, customer: 'Sunita Devi', service: 'Manicure', time: '6:00 PM', price: '₹300', status: 'confirmed', avatar: 'SD', phone: '+91 91234 56789' },
  { id: 5, customer: 'Rohan Kulkarni', service: 'Beard Trim', time: '5:30 PM', price: '₹150', status: 'pending', avatar: 'RK', phone: '+91 93456 78901' },
  { id: 6, customer: 'Meena Joshi', service: 'Threading', time: '3:30 PM', price: '₹80', status: 'confirmed', avatar: 'MJ', phone: '+91 94567 89012' },
];

// ── Customers ────────────────────────────────────────────────
export const customers = [
  { id: 1, name: 'Priya Sharma', phone: '+91 98765 43210', lastVisit: 'Today', totalBookings: 24, lifetimeValue: '₹12,400', tags: ['VIP', 'Regular'], avatar: 'PS', city: 'Pune' },
  { id: 2, name: 'Rahul Mehta', phone: '+91 98123 45678', lastVisit: 'Yesterday', totalBookings: 18, lifetimeValue: '₹8,900', tags: ['Regular'], avatar: 'RM', city: 'Nagpur' },
  { id: 3, name: 'Anjali Singh', phone: '+91 99876 54321', lastVisit: '3 days ago', totalBookings: 12, lifetimeValue: '₹6,200', tags: ['New'], avatar: 'AS', city: 'Mumbai' },
  { id: 4, name: 'Vikram Patel', phone: '+91 90123 45678', lastVisit: '1 week ago', totalBookings: 31, lifetimeValue: '₹18,500', tags: ['VIP'], avatar: 'VP', city: 'Nashik' },
  { id: 5, name: 'Sunita Devi', phone: '+91 91234 56789', lastVisit: 'Today', totalBookings: 8, lifetimeValue: '₹3,400', tags: ['Regular'], avatar: 'SD', city: 'Aurangabad' },
  { id: 6, name: 'Rohan Kulkarni', phone: '+91 93456 78901', lastVisit: '2 days ago', totalBookings: 15, lifetimeValue: '₹7,100', tags: ['Regular'], avatar: 'RK', city: 'Kolhapur' },
  { id: 7, name: 'Meena Joshi', phone: '+91 94567 89012', lastVisit: '5 days ago', totalBookings: 6, lifetimeValue: '₹2,800', tags: ['New'], avatar: 'MJ', city: 'Ratnagiri' },
  { id: 8, name: 'Arjun Yadav', phone: '+91 95678 90123', lastVisit: '1 week ago', totalBookings: 22, lifetimeValue: '₹11,200', tags: ['VIP', 'Regular'], avatar: 'AY', city: 'Solapur' },
];

// ── Features ─────────────────────────────────────────────────
export const features = [
  { icon: 'Bot', title: 'AI Employee', desc: '24/7 availability — answers every customer query instantly, even at 2 AM.' },
  { icon: 'CalendarCheck', title: 'Appointment Booking', desc: 'Books appointments automatically with smart calendar management.' },
  { icon: 'UserPlus', title: 'Lead Capture', desc: 'Captures every lead automatically and follows up — never miss a sale.' },
  { icon: 'Send', title: 'Smart Follow-ups', desc: 'Sends timely follow-ups to customers who showed interest but did not book.' },
  { icon: 'Brain', title: 'Customer Memory', desc: 'Remembers every customer — their preferences, history, and past visits.' },
  { icon: 'BookOpen', title: 'Knowledge Base', desc: 'Train your AI with your business info, services, pricing, and FAQs.' },
  { icon: 'BarChart3', title: 'Analytics Dashboard', desc: 'Real-time insights into conversations, bookings, and revenue.' },
  { icon: 'Inbox', title: 'Unified Inbox', desc: 'All channels in one place — WhatsApp, Instagram, Facebook, and more.' },
  { icon: 'Shield', title: 'Business Rules', desc: 'Define what your AI should and should not do — full control always.' },
  { icon: 'Sparkles', title: 'AI Playground', desc: 'Test and refine your AI responses before going live with customers.' },
  { icon: 'FileText', title: 'Reports', desc: 'Daily, weekly, and monthly reports delivered to your WhatsApp.' },
  { icon: 'Languages', title: 'Multi-language', desc: 'Speaks Hindi, English, and Marathi — Hinglish support built in.' },
  { icon: 'UserCheck', title: 'Human Handoff', desc: 'Take over any conversation instantly when human touch is needed.' },
];

// ── How It Works ──────────────────────────────────────────────
export const howItWorks = [
  { step: 1, title: 'Create Account', desc: 'Sign up in 30 seconds with your email', icon: 'UserPlus' },
  { step: 2, title: 'Register Business', desc: 'Add your business name, category, and details', icon: 'Store' },
  { step: 3, title: 'Choose Plan', desc: 'Pick a plan that fits your business size', icon: 'CreditCard' },
  { step: 4, title: 'Connect WhatsApp', desc: 'Link your WhatsApp Business number securely', icon: 'MessageCircle' },
  { step: 5, title: 'Train AI', desc: 'Add FAQs, services, and business knowledge', icon: 'Brain' },
  { step: 6, title: 'Go Live', desc: 'Your AI Employee starts working in 10 minutes', icon: 'Rocket' },
];

// ── Platforms ─────────────────────────────────────────────────
export const platforms = [
  { name: 'WhatsApp', icon: 'MessageCircle', desc: 'Primary channel', status: 'available', highlight: true },
  { name: 'Instagram', icon: 'Instagram', desc: 'DM automation', status: 'available' },
  { name: 'Facebook Messenger', icon: 'Facebook', desc: 'Messenger chat', status: 'available' },
  { name: 'Website Chat', icon: 'Globe', desc: 'Embeddable widget', status: 'available' },
  { name: 'Email', icon: 'Mail', desc: 'Email automation', status: 'available' },
  { name: 'Voice AI', icon: 'Phone', desc: 'Voice calls', status: 'coming-soon' },
  { name: 'Google Business', icon: 'MapPin', desc: 'Google Messages', status: 'coming-soon' },
];

// ── Business Categories ───────────────────────────────────────
export const businessCategories = [
  { emoji: '✂️', name: 'Salon' },
  { emoji: '🍽️', name: 'Restaurant' },
  { emoji: '🏥', name: 'Clinic' },
  { emoji: '☕', name: 'Cafe' },
  { emoji: '💪', name: 'Gym' },
  { emoji: '🛒', name: 'Retail' },
  { emoji: '📚', name: 'Coaching' },
  { emoji: '🔧', name: 'Garage' },
  { emoji: '🏠', name: 'Real Estate' },
  { emoji: '🏨', name: 'Hotel' },
];

// ── Comparison Table ──────────────────────────────────────────
export const comparisonData = [
  { feature: 'Works 24/7', kaamgaar: true, staff: false, chatbot: false },
  { feature: 'Never misses a message', kaamgaar: true, staff: false, chatbot: true },
  { feature: 'Books appointments automatically', kaamgaar: true, staff: false, chatbot: false },
  { feature: 'Remembers every customer', kaamgaar: true, staff: true, chatbot: false },
  { feature: 'Speaks Hindi + English', kaamgaar: true, staff: true, chatbot: false },
  { feature: 'Costs ₹999/month vs ₹15,000/month', kaamgaar: true, staff: false, chatbot: true },
  { feature: 'Human handoff anytime', kaamgaar: true, staff: true, chatbot: false },
  { feature: 'Analytics & reports', kaamgaar: true, staff: false, chatbot: false },
];

// ── Testimonials ──────────────────────────────────────────────
export const testimonials = [
  {
    name: 'Priya Sharma',
    business: 'Dream Salon',
    city: 'Pune',
    rating: 5,
    text: 'Mere salon ke WhatsApp pe ab main khud reply nahi karta — KaamgaarAI sab handle karta hai! Bookings 2x badh gayi.',
    avatar: 'PS',
  },
  {
    name: 'Rahul Mehta',
    business: 'Mehta Coaching',
    city: 'Nagpur',
    rating: 5,
    text: 'Admissions 40% badh gayi kyunki koi bhi query miss nahi hoti. AI raat ko bhi reply karta hai — amazing!',
    avatar: 'RM',
  },
  {
    name: 'Anjali Singh',
    business: 'Wellness Spa',
    city: 'Mumbai',
    rating: 5,
    text: 'Best investment for my business. Customers ko laga hi nahi ki AI se baat ho rahi hai. Hinglish mein perfect replies.',
    avatar: 'AS',
  },
];

// ── Pricing ───────────────────────────────────────────────────
export const pricingPlans = [
  {
    name: 'Free Trial',
    badge: '14 days',
    price: '₹0',
    period: '',
    desc: 'Try before you buy',
    features: [
      '1 WhatsApp number',
      '500 messages',
      'Basic AI',
      'Email support',
    ],
    cta: 'Start Free Trial',
    popular: false,
  },
  {
    name: 'Starter',
    badge: '⭐',
    price: '₹999',
    period: '/month',
    desc: 'For small businesses',
    features: [
      '1 channel',
      '2,000 messages',
      'Appointment booking',
      'Lead capture',
      'WhatsApp support',
    ],
    cta: 'Get Started',
    popular: false,
  },
  {
    name: 'Growth',
    badge: '🔥',
    price: '₹1,999',
    period: '/month',
    desc: 'Most popular choice',
    features: [
      '3 channels',
      '10,000 messages',
      'All features',
      'Analytics dashboard',
      'Priority support',
    ],
    cta: 'Start Free Trial',
    popular: true,
  },
  {
    name: 'Business',
    badge: '💼',
    price: '₹3,499',
    period: '/month',
    desc: 'For growing businesses',
    features: [
      'All channels',
      'Unlimited messages',
      'Custom AI training',
      'Dedicated support',
      'API access',
    ],
    cta: 'Contact Sales',
    popular: false,
  },
];

// ── FAQ ───────────────────────────────────────────────────────
export const faqs = [
  { q: 'Kya mujhe coding aani chahiye?', a: 'Bilkul nahi! KaamgaarAI completely no-code hai. Aap bas apna business info add karein, WhatsApp connect karein, aur AI live ho jayega. 10 minute mein setup ho jata hai.' },
  { q: 'Kitne time mein setup ho jaata hai?', a: 'Average setup time 10 minute hai. Business info add karein, FAQs daalein, WhatsApp connect karein — bas! Aapka AI Employee live ho jata hai.' },
  { q: 'Kya WhatsApp number safe rahega?', a: 'Bilkul safe. Hum Meta ke official WhatsApp Business API partners hain. Aapka number end-to-end encrypted hai aur kabhi share nahi hota.' },
  { q: 'Kya AI Hindi mein baat kar sakta hai?', a: 'Haan! Hamara AI Hindi, English, Marathi, aur Hinglish — sab mein fluent hai. Customer jo bhi language mein message karega, AI wahi mein reply karega.' },
  { q: 'Agar AI galat reply kare toh?', a: 'Aap kabhi bhi conversation take over kar sakte hain. Plus, AI har reply mein confidence score dikhata hai. Low confidence wale messages automatically aapko notify hote hain.' },
  { q: 'Kya main khud bhi reply kar sakta hun?', a: 'Of course! Unified Inbox mein aap kabhi bhi AI se conversation take over kar sakte hain. AI background mein rehta hai, aap jab chahe join kar lein.' },
  { q: 'Refund policy kya hai?', a: '7-day money-back guarantee hai. Agar aap satisfied nahi hain, full refund milega — no questions asked. Free trial ke baad bhi cancel kar sakte hain.' },
  { q: 'Enterprise plan kaise milega?', a: 'Enterprise plan custom hai — unlimited channels, dedicated AI training, on-premise option, aur 24/7 phone support. Sales team se baat karein: sales@kaamgaarai.in' },
];

// ── Integrations ──────────────────────────────────────────────
export const integrations = [
  { name: 'WhatsApp Business API', icon: 'MessageCircle', desc: 'Connect your WhatsApp Business number', status: 'connected', color: 'success' },
  { name: 'Instagram DM', icon: 'Instagram', desc: 'Automate Instagram direct messages', status: 'connected', color: 'success' },
  { name: 'Facebook Messenger', icon: 'Facebook', desc: 'Handle Facebook page messages', status: 'available', color: 'primary' },
  { name: 'Website Chat Widget', icon: 'Globe', desc: 'Embed chat on your website', status: 'available', color: 'accent' },
  { name: 'Google Calendar', icon: 'Calendar', desc: 'Sync bookings with Google Calendar', status: 'connected', color: 'success' },
  { name: 'Razorpay', icon: 'CreditCard', desc: 'Accept payments via Razorpay', status: 'available', color: 'primary' },
  { name: 'Stripe', icon: 'CreditCard', desc: 'International payments via Stripe', status: 'available', color: 'accent' },
  { name: 'Webhook', icon: 'Webhook', desc: 'Custom webhook integrations', status: 'available', color: 'warning' },
  { name: 'API Keys', icon: 'Key', desc: 'Generate API keys for custom apps', status: 'available', color: 'primary' },
];

// ── Invoices ──────────────────────────────────────────────────
export const invoices = [
  { id: 'INV-2024-007', date: 'Jul 01, 2024', amount: '₹1,999', status: 'paid', plan: 'Growth Monthly' },
  { id: 'INV-2024-006', date: 'Jun 01, 2024', amount: '₹1,999', status: 'paid', plan: 'Growth Monthly' },
  { id: 'INV-2024-005', date: 'May 01, 2024', amount: '₹1,999', status: 'paid', plan: 'Growth Monthly' },
  { id: 'INV-2024-004', date: 'Apr 01, 2024', amount: '₹999', status: 'paid', plan: 'Starter Monthly' },
  { id: 'INV-2024-003', date: 'Mar 01, 2024', amount: '₹999', status: 'paid', plan: 'Starter Monthly' },
];

// ── Business Health Score ─────────────────────────────────────
export const healthScore = {
  overall: 87,
  metrics: [
    { label: 'Response Rate', value: 98, color: 'success' },
    { label: 'Booking Rate', value: 34, color: 'primary' },
    { label: 'Customer Satisfaction', value: 96, color: 'accent' },
    { label: 'AI Accuracy', value: 97, color: 'success' },
  ],
};

// ── Usage Meters ──────────────────────────────────────────────
export const usageMeters = [
  { label: 'Messages', used: 6420, total: 10000, unit: 'msgs' },
  { label: 'Bookings', used: 89, total: 200, unit: 'bookings' },
  { label: 'AI Training', used: 3, total: 5, unit: 'sessions' },
  { label: 'API Calls', used: 1240, total: 5000, unit: 'calls' },
];

// ── Notifications ─────────────────────────────────────────────
export const notifications = [
  { id: 1, title: 'New booking confirmed', desc: 'Rahul Mehta booked Haircut at 2:00 PM', time: '5 min ago', type: 'success', unread: true },
  { id: 2, title: 'AI took over conversation', desc: 'Priya Sharma conversation handled by AI', time: '12 min ago', type: 'info', unread: true },
  { id: 3, title: 'Low confidence reply', desc: 'AI flagged a reply for your review', time: '1 hr ago', type: 'warning', unread: true },
  { id: 4, title: 'Weekly report ready', desc: 'Your weekly analytics report is available', time: '3 hr ago', type: 'info', unread: false },
];

// ── AI Employee Settings ──────────────────────────────────────
export const aiSettings = {
  status: 'online',
  greeting: 'Namaste! Dream Salon mein aapka swagat hai. Main aapki kaise madad kar sakti hun?',
  language: 'hinglish',
  tone: 'friendly',
  languages: [
    { value: 'hindi', label: 'Hindi' },
    { value: 'english', label: 'English' },
    { value: 'marathi', label: 'Marathi' },
    { value: 'hinglish', label: 'Hinglish' },
  ],
  tones: [
    { value: 'professional', label: 'Professional' },
    { value: 'friendly', label: 'Friendly' },
    { value: 'casual', label: 'Casual' },
  ],
  businessRules: [
    'Always greet customers with Namaste',
    'Confirm booking before finalizing',
    'Offer premium services when relevant',
    'Never share pricing of competitors',
  ],
  escalationRules: [
    'Escalate if customer is unhappy',
    'Escalate refund requests immediately',
    'Escalate after 3 unanswered questions',
  ],
};

// ── Knowledge Base Items ──────────────────────────────────────
export const knowledgeBase = {
  faqs: [
    { q: 'What are your timings?', a: 'We are open Monday to Sunday, 9 AM to 9 PM.' },
    { q: 'Do you offer home service?', a: 'No, we only provide in-salon services.' },
    { q: 'What payment methods do you accept?', a: 'We accept cash, UPI, and all major cards.' },
  ],
  services: [
    { name: 'Haircut', price: '₹250', duration: '30 min' },
    { name: 'Facial - Basic', price: '₹500', duration: '45 min' },
    { name: 'Facial - Premium', price: '₹900', duration: '60 min' },
    { name: 'Hair Color - Global', price: '₹800', duration: '2 hr' },
    { name: 'Manicure', price: '₹300', duration: '30 min' },
    { name: 'Beard Trim', price: '₹150', duration: '15 min' },
  ],
  businessInfo: {
    name: 'Dream Salon',
    address: 'FC Road, Shivajinagar, Pune, Maharashtra 411005',
    hours: 'Mon-Sun: 9 AM - 9 PM',
    phone: '+91 98765 43210',
  },
};

// ── Onboarding Steps ──────────────────────────────────────────
export const onboardingSteps = [
  { step: 1, title: 'Business Name & Category', icon: 'Store' },
  { step: 2, title: 'Address & Location', icon: 'MapPin' },
  { step: 3, title: 'Working Hours', icon: 'Clock' },
  { step: 4, title: 'Services & Pricing', icon: 'Tag' },
  { step: 5, title: 'Common FAQs', icon: 'HelpCircle' },
  { step: 6, title: 'AI Language & Tone', icon: 'Languages' },
  { step: 7, title: 'Business Rules', icon: 'Shield' },
  { step: 8, title: 'Connect WhatsApp', icon: 'MessageCircle' },
];

// ── Business Types for Onboarding ─────────────────────────────
export const businessTypes = [
  'Salon', 'Restaurant', 'Clinic', 'Cafe', 'Gym', 'Retail Store',
  'Coaching Institute', 'Garage', 'Real Estate', 'Hotel', 'Bakery',
  'Pharmacy', 'Spa', 'Dental Clinic', 'Electronics Store', 'Other',
];

export const indianCities = [
  'Mumbai', 'Pune', 'Nagpur', 'Nashik', 'Aurangabad', 'Kolhapur',
  'Ratnagiri', 'Jalgaon', 'Solapur', 'Akola', 'Delhi', 'Bangalore',
  'Hyderabad', 'Chennai', 'Kolkata', 'Ahmedabad', 'Jaipur', 'Lucknow',
];

export const indianStates = [
  'Maharashtra', 'Delhi', 'Karnataka', 'Telangana', 'Tamil Nadu',
  'West Bengal', 'Gujarat', 'Rajasthan', 'Uttar Pradesh', 'Madhya Pradesh',
];

// ══════════════════════════════════════════════════════════════
// NEW MODULES — Business Calendar, Emergency, Broadcast, Profile
// ══════════════════════════════════════════════════════════════

// ── Business Calendar ────────────────────────────────────────
export const defaultSchedule = {
  workingDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  openTime: '09:00',
  closeTime: '21:00',
  lunchStart: '13:00',
  lunchEnd: '14:00',
  weeklyOff: ['Sun'],
};

export const calendarEvents = [
  { date: '2024-07-04', type: 'holiday', label: 'Public Holiday', color: '#EF4444', note: 'Independence Day – Business Closed' },
  { date: '2024-07-10', type: 'special', label: 'Special Hours', color: '#F59E0B', open: '11:00', close: '18:00', note: 'Staff training morning session' },
  { date: '2024-07-14', type: 'vacation', label: 'Vacation', color: '#6366F1', note: 'Owner out of city — 2 staff working' },
  { date: '2024-07-15', type: 'vacation', label: 'Vacation', color: '#6366F1', note: 'Owner out of city — 2 staff working' },
  { date: '2024-07-17', type: 'emergency', label: 'Emergency Closure', color: '#EF4444', note: 'Water supply issue — closed for the day' },
  { date: '2024-07-21', type: 'festival', label: 'Festival', color: '#F59E0B', note: 'Ashadhi Ekadashi — Half day till 3 PM' },
  { date: '2024-07-26', type: 'holiday', label: 'Public Holiday', color: '#EF4444', note: 'Kargil Vijay Diwas' },
];

export const staffAvailability = [
  { name: 'Kavita Patil', role: 'Senior Stylist', available: ['Mon','Tue','Wed','Thu','Fri'], off: ['Sat','Sun'] },
  { name: 'Deepak Rane', role: 'Hair Expert', available: ['Tue','Wed','Thu','Fri','Sat'], off: ['Mon','Sun'] },
  { name: 'Sneha More', role: 'Beautician', available: ['Mon','Wed','Thu','Fri','Sat'], off: ['Tue','Sun'] },
];

// ── Emergency Mode ────────────────────────────────────────────
export const emergencyTypes = [
  { id: 'closed', label: 'Business Closed', icon: 'XCircle', color: '#EF4444', msg: 'We are closed today. Sorry for the inconvenience. Will reopen tomorrow at 9 AM.' },
  { id: 'late', label: 'Opening Late', icon: 'Clock', color: '#F59E0B', msg: 'We are opening late today. Will open by 12 PM. Thank you for your patience.' },
  { id: 'early', label: 'Closing Early', icon: 'LogOut', color: '#F59E0B', msg: 'We will close early today at 5 PM. Please plan your visit accordingly.' },
  { id: 'rain', label: 'Heavy Rain', icon: 'CloudRain', color: '#06B6D4', msg: 'Due to heavy rain, we are temporarily closed. Will update once it is safe to open.' },
  { id: 'power', label: 'Power Cut', icon: 'Zap', color: '#F59E0B', msg: 'Experiencing a power outage. Services temporarily unavailable. Apologies for the inconvenience.' },
  { id: 'maintenance', label: 'Maintenance', icon: 'Wrench', color: '#6366F1', msg: 'We are closed for maintenance. Will reopen shortly with improved services!' },
  { id: 'festival', label: 'Festival', icon: 'PartyPopper', color: '#22C55E', msg: 'Closed today for festival celebrations. Wishing you a very happy festival from the Dream Salon team!' },
  { id: 'vacation', label: 'Vacation', icon: 'Palmtree', color: '#06B6D4', msg: 'We are on a short vacation. Will be back on Monday. Bookings can be made for next week.' },
  { id: 'staff', label: 'Staff Shortage', icon: 'UserMinus', color: '#F59E0B', msg: 'Due to staff shortage today, we have limited availability. Please call before visiting.' },
  { id: 'custom', label: 'Custom Reason', icon: 'Edit3', color: '#94A3B8', msg: '' },
];

export const activeEmergency = null; // or an emergencyTypes entry

// ── Broadcast Center ──────────────────────────────────────────
export const broadcastTemplates = [
  {
    id: 'holiday',
    name: 'Holiday Closure',
    icon: 'Calendar',
    preview: 'Namaste! Dream Salon kal {date} ko band rahega {reason} ki wajah se. Agle din 9 baje se khulenge. Sorry for the inconvenience! 🙏',
    tags: ['holiday', 'closure'],
  },
  {
    id: 'emergency',
    name: 'Emergency Alert',
    icon: 'AlertTriangle',
    preview: 'URGENT: Dream Salon aaj {time} ke baad band ho raha hai — {reason}. Appointments reschedule karenge. Jaldi contact karein: +91 98765 43210',
    tags: ['emergency'],
  },
  {
    id: 'offer',
    name: 'Special Offer',
    icon: 'Tag',
    preview: '🎉 Special Offer! Aaj {discount}% off on all {service}. Sirf aaj tak valid. Book karo abhi: {link}',
    tags: ['offer', 'promo'],
  },
  {
    id: 'festival',
    name: 'Festival Greetings',
    icon: 'Sparkles',
    preview: 'Aapko aur aapke poore parivaar ko {festival} ki hardik shubhkamnaayen! 🎊 Is avasar par aapke liye special {discount}% off.',
    tags: ['festival', 'greetings'],
  },
  {
    id: 'maintenance',
    name: 'Maintenance Notice',
    icon: 'Wrench',
    preview: 'Dear customers, Dream Salon {date} ko maintenance ke liye band rahega. Hum better services ke saath waapas aayenge! 🔧',
    tags: ['maintenance'],
  },
  {
    id: 'opening_late',
    name: 'Opening Late',
    icon: 'Clock',
    preview: 'Aaj hum thoda late khul rahe hain — {time} baje se. Inconvenience ke liye maafi chahte hain. Aapka swagat hai! 🙏',
    tags: ['hours'],
  },
];

export const broadcastHistory = [
  { id: 1, name: 'Eid Mubarak Wishes', template: 'festival', audience: 'All Customers', sent: 312, delivered: 298, read: 241, date: 'Jul 5, 2024 · 9:00 AM', status: 'delivered' },
  { id: 2, name: 'Weekend Special Offer', template: 'offer', audience: 'VIP Customers', sent: 48, delivered: 46, read: 39, date: 'Jul 3, 2024 · 10:30 AM', status: 'delivered' },
  { id: 3, name: 'Monsoon Closure Alert', template: 'emergency', audience: "Today's Customers", sent: 18, delivered: 17, read: 15, date: 'Jul 1, 2024 · 3:00 PM', status: 'delivered' },
  { id: 4, name: 'July Month Offers', template: 'offer', audience: 'Upcoming Bookings', sent: 67, delivered: 65, read: 51, date: 'Jul 1, 2024 · 10:00 AM', status: 'delivered' },
  { id: 5, name: 'Summer Vacation Notice', template: 'holiday', audience: 'All Customers', sent: 312, delivered: 289, read: 198, date: 'Jun 25, 2024 · 5:00 PM', status: 'delivered' },
];

export const broadcastAudiences = [
  { id: 'all', label: 'All Customers', count: 312, icon: 'Users' },
  { id: 'today', label: "Today's Customers", count: 18, icon: 'CalendarCheck' },
  { id: 'upcoming', label: 'Upcoming Bookings', count: 67, icon: 'Calendar' },
  { id: 'vip', label: 'VIP Customers', count: 48, icon: 'Star' },
];

// ── Enhanced AI Employee Settings ────────────────────────────
export const aiMemory = [
  { key: 'customer_preferences', label: 'Customer Preferences', enabled: true, desc: 'Remember each customer\'s preferred services and timings' },
  { key: 'last_visit', label: 'Last Visit Details', enabled: true, desc: 'Recall what was done on the customer\'s last visit' },
  { key: 'birthday', label: 'Birthday Greetings', enabled: true, desc: 'Auto-wish customers on their birthday' },
  { key: 'feedback', label: 'Past Feedback', enabled: false, desc: 'Remember complaints or compliments from previous chats' },
  { key: 'spending', label: 'Spending History', enabled: true, desc: 'Know customer\'s lifetime value for upselling' },
];

export const aiConfidenceThresholds = [
  { level: 'High', above: 90, action: 'Auto-reply', color: 'success' },
  { level: 'Medium', above: 70, action: 'Reply + flag for review', color: 'warning' },
  { level: 'Low', below: 70, action: 'Escalate to human', color: 'danger' },
];

export const businessPromptTemplate = `You are the AI Employee of {businessName}, a {businessType} in {city}.

BUSINESS RULES:
- Always greet customers with "Namaste" or "Hello"
- Respond in {language} unless customer speaks something else
- Tone: {tone}
- Working Hours: {hours}
- Never share competitor pricing
- Always confirm booking before finalizing

SERVICES:
{services}

If you don't know the answer, say: "Main abhi check karke aapko bataati hoon — 1 minute please!"`;

// ── Business Profile ──────────────────────────────────────────
export const businessProfile = {
  name: 'Dream Salon',
  tagline: 'Your beauty, our passion',
  description: 'Dream Salon is Pune\'s premier beauty destination offering world-class hair, skin, and nail services. Established in 2018, we serve 300+ happy customers monthly with a team of 5 certified beauty professionals.',
  category: 'Salon',
  subCategory: 'Beauty & Wellness',
  established: '2018',
  gstin: '27AAACD1234M1Z5',
  owner: 'Priya Sharma',
  phone: '+91 98765 43210',
  whatsapp: '+91 98765 43210',
  email: 'priya@dreamsalon.in',
  website: 'www.dreamsalon.in',
  address: 'Shop 12, Sunshine Plaza, FC Road, Shivajinagar',
  city: 'Pune',
  state: 'Maharashtra',
  pincode: '411005',
  mapUrl: 'https://maps.google.com',
  social: {
    instagram: '@dreamsalonpune',
    facebook: 'dreamsalonpune',
    google: 'Dream Salon Pune',
  },
  photos: [
    { url: 'https://images.pexels.com/photos/3992874/pexels-photo-3992874.jpeg?w=400', label: 'Salon Front' },
    { url: 'https://images.pexels.com/photos/3997384/pexels-photo-3997384.jpeg?w=400', label: 'Interior' },
    { url: 'https://images.pexels.com/photos/3992871/pexels-photo-3992871.jpeg?w=400', label: 'Service Area' },
    { url: 'https://images.pexels.com/photos/1813272/pexels-photo-1813272.jpeg?w=400', label: 'Staff Team' },
  ],
  team: [
    { name: 'Kavita Patil', role: 'Senior Stylist', exp: '8 years', avatar: 'KP' },
    { name: 'Deepak Rane', role: 'Hair Expert', exp: '6 years', avatar: 'DR' },
    { name: 'Sneha More', role: 'Beautician', exp: '4 years', avatar: 'SM' },
  ],
  achievements: ['500+ Happy Customers', 'Google 4.8★ Rating', 'Best Salon Award 2023'],
  hours: {
    Mon: { open: '09:00', close: '21:00', active: true },
    Tue: { open: '09:00', close: '21:00', active: true },
    Wed: { open: '09:00', close: '21:00', active: true },
    Thu: { open: '09:00', close: '21:00', active: true },
    Fri: { open: '09:00', close: '21:00', active: true },
    Sat: { open: '09:00', close: '20:00', active: true },
    Sun: { open: null, close: null, active: false },
  },
};

// ── Enhanced Integrations ─────────────────────────────────────
export const enhancedIntegrations = [
  {
    id: 'whatsapp',
    name: 'WhatsApp Business',
    category: 'Messaging',
    icon: 'MessageCircle',
    desc: 'Primary customer channel — connect your WhatsApp Business number',
    status: 'connected',
    connectedAs: '+91 98765 43210',
    color: '#22C55E',
    badge: 'Primary',
    stats: { label: 'Messages today', value: '47' },
  },
  {
    id: 'instagram',
    name: 'Instagram DM',
    category: 'Messaging',
    icon: 'Instagram',
    desc: 'Auto-respond to Instagram Direct Messages',
    status: 'connected',
    connectedAs: '@dreamsalonpune',
    color: '#EC4899',
    stats: { label: 'Followers', value: '2.4K' },
  },
  {
    id: 'facebook',
    name: 'Facebook Messenger',
    category: 'Messaging',
    icon: 'Facebook',
    desc: 'Handle messages from your Facebook Business page',
    status: 'available',
    color: '#3B82F6',
    stats: null,
  },
  {
    id: 'webchat',
    name: 'Website Chat Widget',
    category: 'Website',
    icon: 'Globe',
    desc: 'Embed AI chat widget on your website in one line of code',
    status: 'connected',
    connectedAs: 'dreamsalon.in',
    color: '#06B6D4',
    stats: { label: 'Visitors today', value: '23' },
  },
  {
    id: 'email',
    name: 'Email Automation',
    category: 'Messaging',
    icon: 'Mail',
    desc: 'Auto-reply and follow-up emails to customers',
    status: 'available',
    color: '#6366F1',
    stats: null,
  },
  {
    id: 'voice',
    name: 'Voice AI',
    category: 'Voice',
    icon: 'Phone',
    desc: 'Handle incoming calls with AI voice assistant',
    status: 'coming_soon',
    color: '#8B5CF6',
    stats: null,
  },
  {
    id: 'gcal',
    name: 'Google Calendar',
    category: 'Calendar',
    icon: 'Calendar',
    desc: 'Sync bookings automatically with Google Calendar',
    status: 'connected',
    connectedAs: 'priya@dreamsalon.in',
    color: '#EF4444',
    stats: { label: 'Events synced', value: '89' },
  },
  {
    id: 'gmaps',
    name: 'Google Maps',
    category: 'Location',
    icon: 'MapPin',
    desc: 'Show location, hours, and reviews from Google Maps',
    status: 'available',
    color: '#10B981',
    stats: null,
  },
  {
    id: 'razorpay',
    name: 'Razorpay',
    category: 'Payments',
    icon: 'CreditCard',
    desc: 'Accept UPI, card, and net banking payments',
    status: 'available',
    color: '#2563EB',
    stats: null,
  },
  {
    id: 'stripe',
    name: 'Stripe',
    category: 'Payments',
    icon: 'CreditCard',
    desc: 'International payments via Stripe',
    status: 'available',
    color: '#6366F1',
    stats: null,
  },
];
