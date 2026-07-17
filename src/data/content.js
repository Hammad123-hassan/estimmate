export const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Why', href: '#why' },
  { label: 'Built for', href: '#built-for' },
  { label: 'Features', href: '#features' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Cases', href: '#cases' },
  { label: 'Guides', href: '#guides' },
]

export const HOW_IT_WORKS_STEPS = [
  {
    id: 'create',
    title: 'Create',
    description: 'Just share your requirements and we will do all the work for you.',
    demo: 'create',
  },
  {
    id: 'refine',
    title: 'Refine and adjust',
    description: 'Tune scope, roles, costs, and risks with AI chat in one structured flow.',
    demo: 'refine',
  },
  {
    id: 'publish',
    title: 'Publish',
    description: 'Get a ready-to-go business offer with transparent budget breakdown.',
    demo: 'publish',
  },
]

export const COMPARISON = [
  {
    id: 'spreadsheet',
    title: 'Spreadsheet',
    variant: 'neutral',
    items: [
      { title: 'Slow to build', text: 'Every estimate starts from formulas, tabs, and manual setup.' },
      { title: 'Hard to explain', text: 'Clients see numbers, but not the logic behind them.' },
      { title: 'Manual updates', text: 'Every scope change means updating formulas and totals.' },
      { title: 'Hidden risks', text: 'Risks and assumptions often live outside the spreadsheet.' },
      { title: 'Messy presentation', text: 'Spreadsheets need extra work before sending to clients.' },
    ],
  },
  {
    id: 'ai',
    title: 'General AI Tools',
    variant: 'soft',
    items: [
      { title: 'Fast but not structured', text: 'Outputs vary by prompt and often need heavy cleanup.' },
      { title: 'Hard to trust', text: 'AI can sound confident without showing estimation logic.' },
      { title: 'Manual refinement', text: 'You still need to turn text into usable estimates manually.' },
      { title: 'Missing assumptions', text: 'Generic AI may skip dependencies, unknowns, or client responsibilities.' },
      { title: 'Needs formatting', text: 'AI text still needs formatting, structure, and review.' },
    ],
  },
  {
    id: 'estimmate',
    title: 'EstimMate',
    variant: 'brand',
    items: [
      { title: 'Fast and structured', text: 'Work, costs, risks, and assumptions are organized from the start.' },
      { title: 'Client-ready clarity', text: 'Budgets, timelines, roles, and trade-offs are easier to understand.' },
      { title: 'Quick updates', text: 'Adjust scope, ranges, costs, and assumptions in one flow.' },
      { title: 'Risks included', text: 'Risks, assumptions, and confidence are part of the estimate.' },
      { title: 'Ready-to-share proposal', text: 'Generate a polished estimate your client can review and understand.' },
    ],
  },
]

export const BUILT_FOR = [
  {
    title: 'Pre-sales Managers',
    description: 'Win more deals with faster, client-ready estimates and proposals.',
    icon: 'briefcase',
  },
  {
    title: 'Project Managers',
    description: 'Build more accurate project plans with less manual effort.',
    icon: 'clock',
  },
  {
    title: 'Business Analysts',
    description: 'Turn requirements into structured scope and uncover gaps early.',
    icon: 'chart',
  },
  {
    title: 'Tech Leads & Architects',
    description: 'Validate complexity and technical risks without starting from scratch.',
    icon: 'code',
  },
  {
    title: 'Delivery Managers',
    description: 'Improve resource planning, reduce delivery risk, and protect margins.',
    icon: 'package',
  },
  {
    title: 'Agency Founders / Owners',
    description: 'Scale estimation, standardize processes, and increase profitability.',
    icon: 'star',
  },
]

export const FEATURE_SLIDES = [
  {
    id: 'scope',
    label: 'Project Scope',
    title: 'Interactive client proposals',
    description:
      'Decompose your project into structured work packages with estimated hours, costs, and delivery effort, creating a transparent client-ready proposal.',
  },
  {
    id: 'dashboard',
    label: 'Dashboard',
    title: 'Live budget visibility',
    description:
      'See work and role breakdowns side by side so stakeholders understand where the budget goes before you send the offer.',
  },
  {
    id: 'team',
    label: 'Team',
    title: 'Role-based planning',
    description:
      'Map effort to roles, rates, and capacity so delivery teams know exactly what to staff and when.',
  },
]

export const PRICING_PLANS = [
  {
    id: 'free',
    name: 'Free',
    subtitle: 'For trying the product',
    monthlyPrice: 0,
    yearlyPrice: 0,
    cta: 'Start with Free',
    featured: false,
    hasToggle: false,
    features: [
      'Range-based estimation',
      '1-2 level breakdown',
      '1 user',
      '1000 AI credits',
      '1 project',
      '2 public link',
      '100 max project size',
    ],
    addons: null,
  },
  {
    id: 'pro',
    name: 'Pro',
    subtitle: 'For freelancers and consultants',
    monthlyPrice: 19,
    yearlyPrice: 15,
    cta: 'Start with Pro',
    featured: false,
    hasToggle: true,
    defaultMode: 'solo',
    features: [
      'Range-based estimation',
      '1-2 level breakdown',
      '1 user',
      '3000 AI credits',
      '∞ project',
      '∞ public link',
      '∞ max project size',
    ],
    addons: [
      { label: '1,000 credits', price: 10 },
      { label: '3,000 credits', price: 25 },
      { label: '15,000 credits', price: 99 },
    ],
  },
  {
    id: 'business',
    name: 'Business',
    subtitle: 'For teams and agencies',
    monthlyPrice: 29,
    yearlyPrice: 23,
    cta: 'Start with Business',
    featured: true,
    hasToggle: true,
    defaultMode: 'team',
    features: [
      'PERT estimation',
      '1-3 level breakdown',
      '1 user',
      '5000 AI credits',
      '∞ project',
      '∞ public link',
      '∞ max project size',
    ],
    addons: [
      { label: '1,000 credits', price: 10 },
      { label: '3,000 credits', price: 24 },
      { label: '15,000 credits', price: 95 },
    ],
  },
]

export const TESTIMONIALS = [
  {
    name: 'Olivia Haines',
    role: 'Client Solutions Lead',
    quote:
      'I can turn a messy brief into a clear, client-ready proposal in under an hour. We respond faster and win more deals because of it.',
  },
  {
    name: 'Matthew Kowalewski',
    role: 'Project Delivery Lead',
    quote:
      'Estimating used to take me days of back-and-forth. Now I get a realistic plan with effort, timeline, and resources in minutes. My projects start smoother and stay on track.',
  },
  {
    name: 'Mary Santander',
    role: 'Requirements Specialist',
    quote:
      'It helps me turn rough notes and requirements into structured scope fast. I catch gaps early and define assumptions clearly—way fewer surprises later.',
  },
  {
    name: 'James Chen',
    role: 'Agency Founder',
    quote:
      'We standardized estimation across the team. Proposals look consistent, margins are clearer, and clients trust the numbers.',
  },
  {
    highlight: true,
    quote: 'Real teams are saving hours and winning more projects',
    cta: 'View case study',
  },
  {
    name: 'Sofia Reyes',
    role: 'Tech Lead',
    quote:
      'I can challenge scope with real effort ranges instead of gut feel. It makes planning conversations with stakeholders much easier.',
  },
]

export const GUIDES = [
  {
    id: 'scope',
    tag: 'Estimation',
    title: 'How to break down scope without losing the big picture',
    description: 'A practical framework for turning messy briefs into structured work packages clients can trust.',
    readTime: '6 min',
  },
  {
    id: 'risk',
    tag: 'Delivery',
    title: 'Risk buffers that protect margins without scaring buyers',
    description: 'Use confidence ranges and assumptions so stakeholders see realism, not padding.',
    readTime: '5 min',
  },
  {
    id: 'proposal',
    tag: 'Sales',
    title: 'Client-ready proposals that win faster reviews',
    description: 'Share interactive budgets, timelines, and trade-offs that reduce back-and-forth.',
    readTime: '7 min',
  },
]

export const FOOTER_COLUMNS = [
  {
    title: 'Product',
    links: [
      { label: 'How it works', href: '#how-it-works' },
      { label: 'Features', href: '#features' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'Guides', href: '#guides' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'Why EstimMate', href: '#why' },
      { label: 'Built for', href: '#built-for' },
      { label: 'Cases', href: '#cases' },
      { label: 'Partners', href: '#pricing' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Contact', href: '/contact' },
      { label: 'FAQ', href: '#guides' },
      { label: 'Status', href: '#home' },
      { label: 'Security', href: '#why' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy', href: '#' },
      { label: 'Terms', href: '#' },
      { label: 'Cookies', href: '#' },
    ],
  },
]

export const SCOPE_ROWS = [
  {
    id: '1',
    name: 'User Accounts, Profiles, and Access Control',
    role: 'BE+4',
    optimistic: 120,
    pessimistic: 180,
    sum: 28400,
    children: [
      { id: '1.1', name: 'Account Architecture', role: 'BE', optimistic: 40, pessimistic: 60, sum: 9200 },
      { id: '1.2', name: 'Authentication Services', role: 'BE+SE', optimistic: 50, pessimistic: 80, sum: 12400 },
      { id: '1.3', name: 'Profile & Permissions UI', role: 'FE', optimistic: 30, pessimistic: 40, sum: 6800 },
    ],
  },
  {
    id: '2',
    name: 'Marketplace Matching & Booking Flow',
    role: 'FE+BE',
    optimistic: 160,
    pessimistic: 240,
    sum: 35200,
    children: [
      { id: '2.1', name: 'Search & Filters', role: 'FE', optimistic: 45, pessimistic: 70, sum: 9800 },
      { id: '2.2', name: 'Booking Engine', role: 'BE', optimistic: 70, pessimistic: 100, sum: 15200 },
      { id: '2.3', name: 'Notifications', role: 'FE+BE', optimistic: 45, pessimistic: 70, sum: 10200 },
    ],
  },
]

export const DEMO_ESTIMATES = [
  { updated: '15/06/2026', updatedBy: 'Maria Drozhak', totalCost: '$0' },
  { updated: '12/06/2026', updatedBy: 'Alex Rivera', totalCost: '$71,638' },
  { updated: '08/06/2026', updatedBy: 'Sam Patel', totalCost: '$107,300' },
]

export const REFINE_ROWS = [
  { name: 'User Management & Authentication', role: 'FE - BE', hours: '220h', cost: '$18,700' },
  { name: 'Marketplace Matching', role: 'FE+BE', hours: '180h', cost: '$15,300' },
  { name: 'Payments & Payouts', role: 'BE', hours: '140h', cost: '$13,300' },
]
