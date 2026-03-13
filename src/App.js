import React, { useState, useEffect, useRef } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, Area, AreaChart } from 'recharts';

// ============================================================================
// ICON COMPONENTS (replacing lucide-react to avoid version conflicts)
// ============================================================================
// Inline SVG icons are used to keep the build self-contained for competition
// judging (no external icon package dependency) and to reduce deployment risk.

const Heart = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
  </svg>
);

const Zap = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
  </svg>
);

const Brain = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"></path>
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"></path>
  </svg>
);

const DollarSign = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="12" y1="1" x2="12" y2="23"></line>
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
  </svg>
);

const TrendingUp = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
    <polyline points="17 6 23 6 23 12"></polyline>
  </svg>
);

const TrendingDown = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="23 18 13.5 8.5 8.5 13.5 1 6"></polyline>
    <polyline points="17 18 23 18 23 12"></polyline>
  </svg>
);

const Clock = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);

const AlertTriangle = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
    <line x1="12" y1="9" x2="12" y2="13"></line>
    <line x1="12" y1="17" x2="12.01" y2="17"></line>
  </svg>
);

const RotateCcw = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="1 4 1 10 7 10"></polyline>
    <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path>
  </svg>
);

const Save = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
    <polyline points="17 21 17 13 7 13 7 21"></polyline>
    <polyline points="7 3 7 8 15 8"></polyline>
  </svg>
);

const Play = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polygon points="5 3 19 12 5 21 5 3"></polygon>
  </svg>
);

const Briefcase = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
  </svg>
);

const ChevronRight = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="9 18 15 12 9 6"></polyline>
  </svg>
);

const BarChartIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="4" y1="20" x2="20" y2="20"></line>
    <rect x="6" y="11" width="3" height="9" rx="0.5"></rect>
    <rect x="11" y="7" width="3" height="13" rx="0.5"></rect>
    <rect x="16" y="4" width="3" height="16" rx="0.5"></rect>
  </svg>
);

const BadgeIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="8" r="4"></circle>
    <path d="M8.5 12.5 7 21l5-3 5 3-1.5-8.5"></path>
  </svg>
);

const Menu = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <line x1="3" y1="12" x2="21" y2="12"></line>
    <line x1="3" y1="18" x2="21" y2="18"></line>
  </svg>
);

// ============================================================================
// SICKNESS SYSTEM
// ============================================================================
// Defines illnesses that can affect the pet. These settings balance difficulty
// by controlling how quickly health drains and how expensive cures are.

const SICKNESS_TYPES = {
  cold: {
    name: "Common Cold",
    healthDrain: 2,       // Gentle drain for early-game forgiveness
    stressIncrease: 5,    // Small stress bump to encourage quick care
    cureChance: 0.9,      // High success so first-time players recover
    cureCost: 150,        // Affordable entry-level vet cost
    symptoms: "🤧 Sneezing and low energy"
  },
  flu: {
    name: "Pet Flu",
    healthDrain: 5,       // Medium drain creates urgency
    stressIncrease: 10,   // Noticeable stress impact to change behavior
    cureChance: 0.75,     // Slight risk keeps decisions meaningful
    cureCost: 300,        // Mid-tier cost aligned with early portfolio value
    symptoms: "🤒 High fever and weakness"
  },
  parasite: {
    name: "Parasites",
    healthDrain: 3,       // Moderate drain but higher stress tradeoff
    stressIncrease: 15,   // Stress-heavy to impact market via pet mood
    cureChance: 0.85,     // Reliable but not guaranteed
    cureCost: 250,        // Lower cost balances higher stress
    symptoms: "🐛 Digestive issues"
  },
  infection: {
    name: "Infection",
    healthDrain: 7,       // High drain to create a danger spike
    stressIncrease: 20,   // Strong stress to impact market performance
    cureChance: 0.65,     // Lower success for higher-stakes choice
    cureCost: 450,        // Expensive to reinforce risk/reward
    symptoms: "🦠 Severe inflammation"
  },
  chronic: {
    name: "Chronic Condition",
    healthDrain: 4,       // Ongoing drain mimics long-term care
    stressIncrease: 12,   // Medium stress to affect daily decisions
    cureChance: 0.5,      // Coin-flip creates tension
    cureCost: 600,        // High cost forces financial planning
    symptoms: "💊 Long-term ailment"
  }
};

/**
 * Randomly selects a sickness type and severity for the pet.
 * This injects uncertainty into the care loop so players cannot
 * fully optimize; it keeps the game engaging over long sessions.
 *
 * @returns {{type: string, severity: number, daysSick: number}} New sickness data
 */
const generateSickness = () => {
  const types = Object.keys(SICKNESS_TYPES);
  const randomType = types[Math.floor(Math.random() * types.length)];
  return {
    type: randomType,
    severity: Math.floor(Math.random() * 3) + 1, // Severity 1-3 keeps scale simple for judging
    daysSick: 0
  };
};

// ============================================================================
// WHEEL OF FORTUNE EVENT SYSTEM
// ============================================================================
// Weekly random events add volatility and give players occasional boosts
// to keep motivation high even after a bad market run.

const WHEEL_EVENTS = [
  {
    name: "💰 Market Windfall",
    effect: "cash",   // Adds or subtracts direct cash
    value: 500,       // 500 = meaningful but not game-breaking at start
    message: "Lucky investment pays off! +$500",
    color: "green"
  },
  {
    name: "📈 Bull Market Rally",
    effect: "market_boost", // Multiplies stock prices upward
    value: 0.15,            // 15% bump is noticeable without trivializing choices
    message: "All stocks surge 15%!",
    color: "green"
  },
  {
    name: "💸 Unexpected Expense",
    effect: "cash",
    value: -300,     // -300 punishes overspending but is recoverable
    message: "Emergency repairs needed. -$300",
    color: "red"
  },
  {
    name: "📉 Market Correction",
    effect: "market_crash", // Multiplies stock prices downward
    value: -0.10,           // 10% drop preserves challenge without total wipeout
    message: "Market drops 10% across the board",
    color: "red"
  },
  {
    name: "🎁 Bonus Income",
    effect: "cash",
    value: 300,      // Smaller reward to encourage steady play
    message: "Side income arrives! +$300",
    color: "green"
  },
  {
    name: "🏥 Free Health Checkup",
    effect: "free_vet", // Heals pet without cost
    value: 1,           // Value unused but kept for consistency
    message: "Free veterinary care this week!",
    color: "blue"
  },
  {
    name: "🍀 Lucky Break",
    effect: "cash",
    value: 200,      // Minor bonus keeps events frequent but balanced
    message: "Found money! +$200",
    color: "green"
  },
  {
    name: "⚡ Volatile Trading",
    effect: "volatility", // Multiplies market volatility
    value: 2.0,           // Double volatility increases risk/reward temporarily
    message: "Market volatility doubles!",
    color: "orange"
  },
  {
    name: "🎊 Trust Boost",
    effect: "trust", // Improves pet relationship directly
    value: 10,       // 10 points is a visible but not maxing gain
    message: "Your pet trusts you more! +10 trust",
    color: "blue"
  },
  {
    name: "😰 Stress Event",
    effect: "stress",
    value: 15,
    message: "Stressful week ahead! +15 stress",
    color: "red"
  },
  {
    name: "🌟 Nothing Happens",
    effect: "none",
    value: 0,
    message: "Quiet week, no events",
    color: "gray"
  },
  {
    name: "💎 Stock Dividend",
    effect: "dividend",
    value: 0.05,
    message: "All owned stocks pay 5% dividend!",
    color: "green"
  }
];

const spinWheel = () => {
  return WHEEL_EVENTS[Math.floor(Math.random() * WHEEL_EVENTS.length)];
};

// ============================================================================
// STOCK NEWS GENERATION SYSTEM
// ============================================================================
// Creates narrative feedback tied to price movement and pet stats.
// News items are lightweight but help judges see cause-and-effect.

/**
 * Generates flavor news based on price moves, pet stats, and ethics signals.
 * This helps players understand why prices shift (story + feedback).
 *
 * @param {Object} stock - Stock being updated
 * @param {Object} pet - Current pet state
 * @param {Object} market - Market state (trend, volatility)
 * @param {number} day - Current game day
 * @returns {Array} Array of news items to prepend to stock feed
 */
const generateStockNews = (stock, pet, market, day) => {
  const newsTemplates = {
    price_surge: [
      `${stock.name} shares rally on strong investor confidence`,
      `${stock.name} sees significant gains in trading`,
      `Analysts upgrade ${stock.name} outlook`,
      `${stock.name} breaks resistance levels`
    ],
    price_drop: [
      `${stock.name} faces selling pressure`,
      `${stock.name} shares decline amid market concerns`,
      `Investors take profits from ${stock.name}`,
      `${stock.name} struggles in volatile trading`
    ],
    pet_health_boost: [
      `Rising pet health concerns drive ${stock.name} demand`,
      `Veterinary sector sees increased activity, ${stock.name} benefits`,
      `Pet wellness trends support ${stock.name} growth`
    ],
    pet_happiness: [
      `Consumer confidence in pet entertainment lifts ${stock.name}`,
      `${stock.name} launches new engagement products`,
      `Happy pet owners increase spending on ${stock.name} services`
    ],
    ethical_focus: [
      `ESG investors flock to ${stock.name}`,
      `${stock.name} recognized for sustainability leadership`,
      `Ethical investing trends favor ${stock.name}`
    ],
    market_trend: [
      `${stock.name} follows broader market momentum`,
      `Sector rotation benefits ${stock.name}`,
      `${stock.name} trades with market sentiment`
    ],
    company_update: [
      `${stock.name} announces expansion plans`,
      `${stock.name} reports operational improvements`,
      `${stock.name} focuses on innovation`,
      `Management remains optimistic on ${stock.name} outlook`
    ]
  };

  const news = [];
  
  // Generate news based on price change
  if (stock.change > 3) {
    // Threshold of 3% marks a meaningful move worth reporting
    news.push({
      headline: newsTemplates.price_surge[Math.floor(Math.random() * newsTemplates.price_surge.length)],
      type: 'positive',
      timestamp: day
    });
  } else if (stock.change < -3) {
    // Symmetric -3% threshold keeps sentiment balanced
    news.push({
      headline: newsTemplates.price_drop[Math.floor(Math.random() * newsTemplates.price_drop.length)],
      type: 'negative',
      timestamp: day
    });
  }
  
  // Generate news based on pet influence
  if (stock.id === 'VCS' && pet.health < 60) {
    // Health below 60 signals higher demand for vet services
    news.push({
      headline: newsTemplates.pet_health_boost[Math.floor(Math.random() * newsTemplates.pet_health_boost.length)],
      type: 'positive',
      timestamp: day
    });
  }
  
  if ((stock.id === 'TTI' || stock.id === 'BRN') && pet.happiness > 70) {
    // Happiness over 70 boosts entertainment and cognitive product demand
    news.push({
      headline: newsTemplates.pet_happiness[Math.floor(Math.random() * newsTemplates.pet_happiness.length)],
      type: 'positive',
      timestamp: day
    });
  }
  
  if ((stock.id === 'EPL' || stock.id === 'INS') && stock.ethicalRating > 70) {
    // Ethics news reinforces the game's ethical-investing pillar
    news.push({
      headline: newsTemplates.ethical_focus[Math.floor(Math.random() * newsTemplates.ethical_focus.length)],
      type: 'neutral',
      timestamp: day
    });
  }
  
  // Market trend news
  if (market.trend !== 'neutral' && Math.random() < 0.3) {
    // 30% chance keeps broad market headlines occasional, not noisy
    news.push({
      headline: newsTemplates.market_trend[Math.floor(Math.random() * newsTemplates.market_trend.length)],
      type: 'neutral',
      timestamp: day
    });
  }
  
  // Random company updates
  if (Math.random() < 0.15) {
    // 15% chance provides flavor without spamming the feed
    news.push({
      headline: newsTemplates.company_update[Math.floor(Math.random() * newsTemplates.company_update.length)],
      type: 'neutral',
      timestamp: day
    });
  }
  
  return news;
};

// ============================================================================
// PET PERSONALITY TYPES (Feature #3)
// ============================================================================
// Personalities modify how the pet reacts to market outcomes. This creates
// replay value because the same market path feels different per personality.

// Structure notes:
// - stressMultiplier affects how quickly stress rises overall
// - traits define situational bonuses/penalties used in the decision engine
const PET_PERSONALITIES = {
  cautious: {
    name: "Cautious",
    emoji: "🛡️",
    description: "Prefers safe investments, gets stressed by volatility",
    stressMultiplier: 1.5, // Higher multiplier makes market swings feel riskier
    traits: {
      lowVolatilityBonus: 10,     // Reward stable markets with mood boost
      highVolatilityPenalty: -15, // Penalize risky markets to encourage balance
      marketCrashStress: 25       // Extra stress on crashes to feel "cautious"
    }
  },
  adventurous: {
    name: "Adventurous",
    emoji: "🚀",
    description: "Loves high-risk stocks, gets bored with stability",
    stressMultiplier: 0.7, // Lower multiplier makes this pet resilient
    traits: {
      highVolatilityBonus: 15,    // Excitement from risk-seeking behavior
      lowVolatilityPenalty: -10,  // Boredom penalty in calm markets
      marketCrashExcitement: -10  // Crashes feel thrilling, reduce stress
    }
  },
  ethical: {
    name: "Ethical",
    emoji: "🌱",
    description: "Only happy with sustainable investments",
    stressMultiplier: 1.0,
    traits: {
      ethicalStockBonus: 20,
      unethicalStockPenalty: -25
    }
  },
  greedy: {
    name: "Greedy",
    emoji: "💰",
    description: "Wants maximum profits above all",
    stressMultiplier: 1.2,
    traits: {
      profitBonus: 20,
      lossPenalty: -20
    }
  },
  balanced: {
    name: "Balanced",
    emoji: "⚖️",
    description: "Adapts to any strategy",
    stressMultiplier: 1.0,
    traits: {}
  }
};

// ============================================================================
// PET REQUESTS SYSTEM (Feature #2)
// ============================================================================
// Random requests create light narrative moments and force choice tradeoffs.
// Structure: { id, message, emoji, cost, effect, declineEffect, requiresMinigame/Time }.

const PET_REQUESTS = [
  { id: "premium_food", message: "wants premium food!", emoji: "🍖", cost: 40, effect: { happiness: 20, trust: 5, hunger: -50 }, declineEffect: { trust: -5, happiness: -10 } },
  { id: "play_now", message: "wants to play right now!", emoji: "🎾", cost: 0, requiresMinigame: true, effect: { happiness: 15, trust: 3, stress: -20 }, declineEffect: { trust: -8, happiness: -15 } },
  { id: "vet_checkup", message: "wants a health checkup", emoji: "🏥", cost: 100, effect: { health: 20, trust: 8, stress: -10 }, declineEffect: { trust: -10, stress: 10 } },
  { id: "new_toy", message: "wants a new toy!", emoji: "🧸", cost: 75, effect: { happiness: 25, energy: 10 }, declineEffect: { happiness: -12 } },
  { id: "comfort", message: "needs comfort and attention", emoji: "💕", cost: 0, requiresTime: true, effect: { trust: 10, stress: -15, happiness: 10 }, declineEffect: { trust: -15, stress: 15 } }
];

// ============================================================================
// PET ROOM ITEMS (Feature #7)
// ============================================================================
// Room items provide passive bonuses and act as rewards for badges.
// Structure: { name, emoji, cost, description, effect } where effect is a small
// stat modifier applied during daily updates.

const ROOM_ITEMS = {
  bed: { name: "Luxury Bed", emoji: "🛏️", cost: 150, description: "Better sleep, +10 energy recovery", effect: { energyRecoveryBonus: 10, stressReduction: 5 } },
  toys: { name: "Toy Collection", emoji: "🧸", cost: 100, description: "Passive +3 happiness/day", effect: { happinessPerDay: 3 } },
  feeder: { name: "Smart Feeder", emoji: "🍽️", cost: 200, description: "Auto-feed option ($10/use)", effect: { autoFeed: true, feedCost: 10 } },
  ticker: { name: "Stock Ticker", emoji: "📊", cost: 180, description: "+5 financial awareness/day", effect: { financialAwarenessBonus: 5 } },
  plant: { name: "Calming Plant", emoji: "🪴", cost: 50, description: "-2 stress/day", effect: { stressPerDay: -2 } },
  mirror: { name: "Fun Mirror", emoji: "🪞", cost: 75, description: "+2 trust/day", effect: { trustPerDay: 2 } }
};

// ============================================================================
// PET COACHING SKILLS (Feature #8)
// ============================================================================
// Skills give long-term progression and small systemic advantages.
// Effects are expressed as percentages so they scale with game state.
// Structure: { name, emoji, maxLevel, costPerLevel, description, effects }.

const COACHING_SKILLS = {
  marketIntuition: {
    name: "Market Intuition",
    emoji: "🔮",
    maxLevel: 5,
    costPerLevel: 200,
    description: "Warn before market crashes",
    effects: { 1: { crashWarning: 0.3 }, 2: { crashWarning: 0.5 }, 3: { crashWarning: 0.7 }, 4: { crashWarning: 0.85 }, 5: { crashWarning: 1.0 } }
  },
  stressManagement: {
    name: "Stress Management",
    emoji: "🧘",
    maxLevel: 5,
    costPerLevel: 150,
    description: "Handle volatility better",
    effects: { 1: { stressReduction: 0.1 }, 2: { stressReduction: 0.2 }, 3: { stressReduction: 0.3 }, 4: { stressReduction: 0.4 }, 5: { stressReduction: 0.5 } }
  },
  negotiation: {
    name: "Negotiation",
    emoji: "💬",
    maxLevel: 3,
    costPerLevel: 180,
    description: "Discount on care items",
    effects: { 1: { careDiscount: 0.1 }, 2: { careDiscount: 0.2 }, 3: { careDiscount: 0.3 } }
  },
  luck: {
    name: "Luck",
    emoji: "🍀",
    maxLevel: 3,
    costPerLevel: 250,
    description: "More lucky events",
    effects: { 1: { luckyEventChance: 0.05 }, 2: { luckyEventChance: 0.10 }, 3: { luckyEventChance: 0.15 } }
  }
};

// ============================================================================
// DAY RESPONSIBILITY ROUTINE
// ============================================================================
// Daily tasks teach real-world pet ownership habits. Completing all tasks
// builds responsibility points and feeds into the end-of-program readiness score.

const DAY_TASKS = [
  {
    id: "feed",
    label: "Meals",
    icon: "🍖",
    target: 3,
    completionBonus: { health: 1, happiness: 1 },
    missedPenalty: { health: -3, stress: 4, happiness: -2 },
    points: 4
  },
  {
    id: "bathroom",
    label: "Bathroom",
    icon: "🚽",
    target: 3,
    completionBonus: { stress: -2 },
    missedPenalty: { stress: 4, happiness: -2 },
    points: 3
  },
  {
    id: "walk",
    label: "Walks",
    icon: "🦮",
    target: 3,
    completionBonus: { happiness: 2, trust: 1 },
    missedPenalty: { stress: 3, happiness: -2 },
    points: 4
  },
  {
    id: "activity",
    label: "Activity",
    icon: "🎾",
    target: 3,
    completionBonus: { happiness: 2, trust: 1 },
    missedPenalty: { happiness: -3, trust: -1 },
    points: 3
  }
];

const DAY_TASK_COOLDOWN_MS = 5000;
const DAY_TASK_OVERUSE_GRACE = 1;

const DAY_TASK_OVERUSE_PENALTIES = {
  feed: { health: -2, happiness: -3, stress: 4 },
  bathroom: { happiness: -2, stress: 3 },
  walk: { health: -1, happiness: -2, stress: 3, energy: -6 },
  activity: { happiness: -3, stress: 4, trust: -1 }
};

const DEFAULT_DAY_OVERUSE_PENALTY = { health: -2, happiness: -3, stress: 4 };

const DAY_TASK_ITEM_MAP = {
  food_cheap: "feed",
  food_regular: "feed",
  food_premium: "feed",
  bathroom: "bathroom",
  walk: "walk",
  play: "activity"
};

// ============================================================================
// PET INSURANCE PLANS
// ============================================================================
// Simple insurance plans teach budgeting and risk management.

const INSURANCE_PLANS = {
  basic: {
    name: "Basic",
    premium: 12,       // Low daily premium so beginners can afford coverage
    vetDiscount: 0.35, // 35% off vet visits
    cureDiscount: 0.25,
    description: "Budget-friendly coverage for routine care"
  },
  premium: {
    name: "Premium",
    premium: 25,       // Higher premium for stronger coverage
    vetDiscount: 0.55, // 55% off vet visits
    cureDiscount: 0.4,
    description: "Best coverage for emergencies and long-term care"
  }
};

// ============================================================================
// RESPONSIBILITY LEVELS & READINESS GOALS
// ============================================================================
// Levels summarize long-term responsibility and are used for parent-facing
// readiness checks at the end of a program.

const RESPONSIBILITY_LEVELS = [
  { level: 1, name: "Learner", minPoints: 0, description: "Building daily habits" },
  { level: 2, name: "Helper", minPoints: 60, description: "Consistent caregiver" },
  { level: 3, name: "Care Partner", minPoints: 140, description: "Reliable routines" },
  { level: 4, name: "Responsible Owner", minPoints: 240, description: "Ready for ownership" },
  { level: 5, name: "Master Caretaker", minPoints: 360, description: "Exceptional stewardship" }
];

const READINESS_REQUIREMENTS = [
  { id: "level", label: "Responsibility Level 4+", check: ({ level }) => level >= 4 },
  { id: "care", label: "80%+ average daily care completion", check: ({ avgCare }) => avgCare >= 0.8 },
  { id: "health", label: "Average health 70+", check: ({ avgHealth }) => avgHealth >= 70 },
  { id: "trust", label: "Trust 70+", check: ({ pet }) => pet.trust >= 70 },
  { id: "finance", label: "Net worth $2,000+", check: ({ netWorth }) => netWorth >= 2000 }
];

// ============================================================================
// BADGES (Boy Scout-style milestones)
// ============================================================================
// Badges replace achievements and emphasize responsibility + partnership.
// Structure: { id, name, description, emoji, checkCondition, reward }.

const BADGES = [
  { id: "routine_streak", name: "Routine Ranger", description: "Complete all daily tasks for 5 days", emoji: "🏅", checkCondition: (gs) => (gs.dailyCareStreak || 0) >= 5, reward: { cash: 200 } },
  { id: "trusted_partner", name: "Trusted Partner", description: "Reach 90 Trust", emoji: "🤝", checkCondition: (gs) => gs.pet.trust >= 90, reward: { cash: 150 } },
  { id: "health_guardian", name: "Health Guardian", description: "Keep health 90+ for 7 days", emoji: "🩺", checkCondition: (gs) => gs.history.slice(-7).every(h => h && h.health >= 90), reward: { item: "bed" } },
  { id: "steady_walker", name: "Trail Scout", description: "Complete 30 walks", emoji: "🥾", checkCondition: (gs) => (gs.dailyTaskTotals?.walk || 0) >= 30, reward: { cash: 120 } },
  { id: "insured", name: "Safety First", description: "Maintain insurance for 14 days", emoji: "🛡️", checkCondition: (gs) => (gs.insurance?.daysCovered || 0) >= 14, reward: { cash: 180 } },
  { id: "ethical_mentor", name: "Ethical Mentor", description: "Reach 80+ ethics score", emoji: "🌱", checkCondition: (gs) => gs.ethicsScore >= 80, reward: { cash: 200 } },
  { id: "financial_planner", name: "Budget Boss", description: "$5,000 net worth", emoji: "💼", checkCondition: (gs) => (gs.stocks.reduce((sum, s) => sum + (s.owned * s.price), 0) + gs.cash) >= 5000, reward: { cash: 300 } }
];

// ============================================================================
// PET BREEDS & EMOJIS
// ============================================================================
// Simple data used for the welcome screen and visual identity.

const PET_BREEDS = {
  cat: { emoji: "🐱", name: "Cat" },
  dog: { emoji: "🐶", name: "Dog" },
  rabbit: { emoji: "🐰", name: "Rabbit" },
  hamster: { emoji: "🐹", name: "Hamster" },
  bird: { emoji: "🐦", name: "Bird" },
  fish: { emoji: "🐠", name: "Fish" },
  turtle: { emoji: "🐢", name: "Turtle" },
  fox: { emoji: "🦊", name: "Fox" }
};

const TUTORIAL_STEPS = [
  {
    id: "care",
    title: "Care for your pet",
    description: "Complete a care action to build trust and keep your pet healthy.",
    action: { label: "Open Pet Care", view: "pet" },
    progress: ({ gameState }) => `Meals today: ${gameState.dailyTasks?.feed || 0}/1`,
    check: ({ gameState }) => (gameState.dailyTasks?.feed || 0) > 0
  },
  {
    id: "trade",
    title: "Make your first trade",
    description: "Buy a stock to start building your portfolio.",
    action: { label: "Open Market", view: "market" },
    progress: ({ gameState }) => `Trades made: ${gameState.transactions?.length || 0}`,
    check: ({ gameState }) => (gameState.transactions?.length || 0) > 0
  },
  {
    id: "advance",
    title: "Advance the day",
    description: "Move to the next day to see how your pet and the market react.",
    action: { label: "Open Pet Actions", view: "pet" },
    progress: ({ gameState }) => `Current day: ${gameState.day}`,
    check: ({ gameState }) => gameState.day > 1
  },
  {
    id: "timeline",
    title: "Save a timeline",
    description: "Capture a checkpoint so you can compare multiple runs later.",
    action: { label: "Open Timelines", view: "timelines" },
    progress: ({ timelines }) => `Timelines saved: ${timelines.length}`,
    check: ({ timelines }) => timelines.length > 0
  }
];

const HELP_QUICK_PROMPTS = [
  "How do I feed my pet?",
  "How do evolutions work?",
  "How do I buy stocks?",
  "What affects my pet's mood?",
  "How do I save a timeline?"
];

const getHelpResponse = (message, gameState) => {
  const text = message.toLowerCase();

  if (text.includes("hello") || text.includes("hi") || text.includes("hey")) {
    return { text: "Hey! Ask me about pet care, trading, evolutions, or timelines. I can also jump you to the right tab." };
  }

  if (text.includes("feed") || text.includes("food") || text.includes("meal")) {
    return {
      text: "Go to the Pet tab, then use the Food section under Care Actions. Regular or premium meals boost health and happiness.",
      viewAction: { label: "Open Pet", view: "pet" }
    };
  }

  if (text.includes("walk") || text.includes("bathroom") || text.includes("activity") || text.includes("play")) {
    return {
      text: "Daily routine actions live in the Pet tab. Walks and play raise happiness and trust, bathroom breaks reduce stress.",
      viewAction: { label: "Open Pet", view: "pet" }
    };
  }

  if (text.includes("evolve") || text.includes("evolution")) {
    return {
      text: "Evolutions unlock after the early days. Your pet's health, trust, stress, ethics score, and finances shape the evolution title you earn.",
      viewAction: { label: "Open Pet", view: "pet" }
    };
  }

  if (text.includes("trade") || text.includes("buy") || text.includes("sell") || text.includes("stock") || text.includes("market")) {
    return {
      text: "Use the Market tab to select a stock, choose an amount, then buy or sell. Your pet's mood can influence price movements.",
      viewAction: { label: "Open Market", view: "market" }
    };
  }

  if (text.includes("portfolio")) {
    return {
      text: "The Portfolio tab shows holdings, cost basis, and recent transactions.",
      viewAction: { label: "Open Portfolio", view: "portfolio" }
    };
  }

  if (text.includes("badge") || text.includes("goal")) {
    return {
      text: "Badges track responsibility milestones. Visit the Badges tab to see progress and rewards.",
      viewAction: { label: "Open Badges", view: "badges" }
    };
  }

  if (text.includes("timeline")) {
    return {
      text: "Save a timeline to compare different runs. Open Timelines and click Save when you're ready.",
      viewAction: { label: "Open Timelines", view: "timelines" }
    };
  }

  if (text.includes("insurance")) {
    return {
      text: "Pet insurance is in the Pet tab. It lowers vet costs but has a daily premium.",
      viewAction: { label: "Open Pet", view: "pet" }
    };
  }

  if (text.includes("stress") || text.includes("happiness") || text.includes("mood")) {
    return {
      text: "Care actions, rest, and market performance all affect mood. High stress reduces performance, while happiness boosts it.",
      viewAction: { label: "Open Pet", view: "pet" }
    };
  }

  if (text.includes("tutorial")) {
    return {
      text: "The Tutorial tab walks you through core actions step by step.",
      viewAction: { label: "Open Tutorial", view: "tutorial" }
    };
  }

  if (text.includes("stats") || text.includes("status") || text.includes("how is my pet")) {
    return {
      text: `Your pet is ${gameState.pet.name}. Health ${Math.round(gameState.pet.health)}, Happiness ${Math.round(gameState.pet.happiness)}, Trust ${Math.round(gameState.pet.trust)}, Stress ${Math.round(gameState.pet.stress)}.`,
      viewAction: { label: "Open Pet", view: "pet" }
    };
  }

  return {
    text: "I can help with pet care, trading, evolutions, badges, insurance, or timelines. Try one of the quick prompts below."
  };
};

const createHelpWelcomeMessages = () => ([
  {
    id: `${Date.now()}-welcome`,
    from: "bot",
    text: "Hi! I'm the PawStreet helper. Ask me about care, trading, evolutions, or timelines."
  }
]);

const createDailyTasksState = () => DAY_TASKS.reduce((acc, task) => {
  acc[task.id] = 0;
  return acc;
}, {});

const createDailyTaskCooldowns = () => DAY_TASKS.reduce((acc, task) => {
  acc[task.id] = 0;
  return acc;
}, {});

const createDailyTaskTotals = () => DAY_TASKS.reduce((acc, task) => {
  acc[task.id] = 0;
  return acc;
}, {});

const calculateDailyCompletion = (dailyTasks) => {
  if (!dailyTasks) return 0;
  const total = DAY_TASKS.reduce((sum, task) => {
    const done = Math.min(dailyTasks[task.id] || 0, task.target);
    return sum + (done / task.target);
  }, 0);
  return total / DAY_TASKS.length;
};

const getResponsibilityLevelInfo = (points) => {
  const level = RESPONSIBILITY_LEVELS
    .slice()
    .reverse()
    .find(tier => points >= tier.minPoints) || RESPONSIBILITY_LEVELS[0];
  const next = RESPONSIBILITY_LEVELS.find(tier => tier.minPoints > level.minPoints);
  return {
    ...level,
    nextLevelPoints: next ? next.minPoints : null
  };
};

const applyStatDelta = (pet, delta) => {
  if (!delta) return;
  const clamp = (value) => Math.max(0, Math.min(100, value));
  if (delta.health) pet.health = clamp(pet.health + delta.health);
  if (delta.happiness) pet.happiness = clamp(pet.happiness + delta.happiness);
  if (delta.trust) pet.trust = clamp(pet.trust + delta.trust);
  if (delta.energy) pet.energy = clamp(pet.energy + delta.energy);
  if (delta.stress !== undefined) pet.stress = clamp(pet.stress + delta.stress);
  if (delta.hunger) pet.hunger = clamp(pet.hunger + delta.hunger);
};

const scaleStatDelta = (delta, multiplier) => {
  if (!delta || multiplier <= 0) return null;
  return Object.entries(delta).reduce((acc, [key, value]) => {
    acc[key] = value * multiplier;
    return acc;
  }, {});
};

const getDailyTaskConfig = (taskId) => DAY_TASKS.find(task => task.id === taskId);

const getDailyTaskIdForItem = (item) => DAY_TASK_ITEM_MAP[item] || null;

const getDailyTaskCooldownRemainingMs = (state, taskId) => {
  if (!state?.dailyTaskCooldowns) return 0;
  const lastAt = state.dailyTaskCooldowns[taskId] || 0;
  const remaining = DAY_TASK_COOLDOWN_MS - (Date.now() - lastAt);
  return remaining > 0 ? remaining : 0;
};

const getDailyTaskOveruseCount = (state, taskId) => {
  const task = getDailyTaskConfig(taskId);
  if (!task) return 0;
  const current = state.dailyTasks?.[taskId] || 0;
  const overuse = current - task.target + 1;
  return Math.max(0, overuse - DAY_TASK_OVERUSE_GRACE);
};

const buildReadinessReport = (state) => {
  if (!state) {
    return { score: 0, verdict: "No Data", checks: [], avgCare: 0, avgHealth: 0, avgHappiness: 0 };
  }

  const portfolioValue = state.stocks.reduce((sum, stock) => sum + (stock.owned * stock.price), 0);
  const netWorth = portfolioValue + state.cash;
  const history = state.history || [];
  const avgHealth = history.length > 0
    ? history.reduce((sum, h) => sum + h.health, 0) / history.length
    : state.pet.health;
  const avgHappiness = history.length > 0
    ? history.reduce((sum, h) => sum + h.happiness, 0) / history.length
    : state.pet.happiness;
  const avgCare = (state.dailyCompletionHistory && state.dailyCompletionHistory.length > 0)
    ? state.dailyCompletionHistory.reduce((sum, v) => sum + v, 0) / state.dailyCompletionHistory.length
    : 0;
  const levelInfo = getResponsibilityLevelInfo(state.responsibilityPoints || 0);
  const insuranceActive = state.insurance?.active;

  const score =
    (avgCare * 40) +
    ((avgHealth / 100) * 20) +
    ((avgHappiness / 100) * 15) +
    ((levelInfo.level / RESPONSIBILITY_LEVELS.length) * 15) +
    (insuranceActive ? 10 : 0);

  const metrics = { level: levelInfo.level, avgCare, avgHealth, pet: state.pet, netWorth, insuranceActive };
  const checks = READINESS_REQUIREMENTS.map(req => ({
    id: req.id,
    label: req.label,
    met: req.check(metrics)
  }));

  const verdict = score >= 80
    ? "Ready for Pet Ownership"
    : score >= 60
    ? "Nearly Ready — Keep Practicing"
    : "Needs More Practice";

  return { score: Math.round(score), verdict, checks, avgCare, avgHealth, avgHappiness, netWorth, levelInfo };
};

// ============================================================================
// CORE DATA STRUCTURES
// ============================================================================
// These helpers build the initial game state and provide baseline data.

/**
 * Generates a synthetic price history for chart previews.
 * This gives immediate visual context before live ticks start.
 *
 * @param {number} basePrice - Starting price for the asset
 * @param {number} volatility - Volatility factor (0-1 range)
 * @param {number} days - Number of days to generate
 * @returns {Array} Array of {day, tick, tickInDay, price}
 */
const generateHistoricalPrices = (basePrice, volatility, days = 30) => {
  const history = [];
  let currentPrice = basePrice;
  
  // Add a small trend component for variety in early-game charts.
  const trendDirection = (Math.random() - 0.5) * 0.3; // -0.15 to +0.15 trend
  
  for (let i = -days; i <= 0; i++) {
    const tick = i + days + 1;
    // Combine random walk with trend for smooth-yet-varied curves.
    const randomChange = (Math.random() - 0.5) * 2 * volatility;
    const trendChange = trendDirection * volatility * 0.3;
    const totalChange = randomChange + trendChange;
    
    currentPrice = currentPrice * (1 + totalChange);
    
    // Keep a floor to avoid negative or zero prices at startup.
    currentPrice = Math.max(basePrice * 0.4, currentPrice);
    
    history.push({
      day: i,
      tick,
      tickInDay: 1,
      price: parseFloat(currentPrice.toFixed(2))
    });
  }
  
  return history;
};

/**
 * Generates initial neutral news items for a stock on game start.
 * This avoids an empty news panel and sets tone for each sector.
 *
 * @param {Object} stock - Stock metadata used for templating
 * @returns {Array} Array of neutral news items
 */
const generateInitialNews = (stock) => {
  const newsTemplates = {
    food: [
      `${stock.name} maintains steady market position in pet nutrition`,
      `Industry analysts highlight ${stock.name}'s consistent performance`,
      `${stock.name} reports stable demand across product lines`
    ],
    healthcare: [
      `${stock.name} expands veterinary service network`,
      `Healthcare innovation drives ${stock.name} growth prospects`,
      `${stock.name} announces partnerships with leading pet hospitals`
    ],
    entertainment: [
      `${stock.name} unveils next-generation pet entertainment tech`,
      `Consumer trends favor ${stock.name}'s innovative approach`,
      `${stock.name} sees strong adoption of new product lineup`
    ],
    ethical: [
      `Sustainability report highlights ${stock.name}'s leadership`,
      `${stock.name} receives top ESG ratings from investors`,
      `Green investing trends support ${stock.name} valuation`
    ],
    luxury: [
      `Premium segment shows resilience, ${stock.name} benefits`,
      `${stock.name} targets high-end market expansion`,
      `Affluent pet owners drive ${stock.name} revenue growth`
    ],
    utilities: [
      `${stock.name} upgrades infrastructure for growing demand`,
      `Essential services positioning strengthens ${stock.name}`,
      `${stock.name} announces efficiency improvements`
    ],
    services: [
      `${stock.name} reports increased service booking rates`,
      `Customer satisfaction scores rise for ${stock.name}`,
      `${stock.name} expands service locations nationwide`
    ],
    wellness: [
      `Wellness trends favor ${stock.name}'s product portfolio`,
      `${stock.name} introduces holistic care solutions`,
      `Pet health awareness drives ${stock.name} sales`
    ],
    fitness: [
      `Active pet lifestyle trends boost ${stock.name}`,
      `${stock.name} launches new fitness tracking platform`,
      `Exercise equipment demand supports ${stock.name} growth`
    ],
    education: [
      `${stock.name} cognitive training programs gain popularity`,
      `Pet enrichment market expands, ${stock.name} leads`,
      `${stock.name} partners with behavioral experts`
    ],
    insurance: [
      `Pet insurance adoption rates climb, ${stock.name} gains`,
      `${stock.name} introduces flexible coverage options`,
      `Risk management focus attracts clients to ${stock.name}`
    ],
    travel: [
      `Pet travel sector shows mixed signals for ${stock.name}`,
      `${stock.name} adapts to changing mobility patterns`,
      `Seasonal demand impacts ${stock.name} bookings`
    ]
  };

  const sectorNews = newsTemplates[stock.sector.toLowerCase()] || [
    `${stock.name} continues operations in competitive market`,
    `Analysts maintain outlook on ${stock.name}`,
    `${stock.name} focuses on core business strategy`
  ];

  // Generate 2-3 initial news items
  const numNews = 2 + Math.floor(Math.random() * 2);
  return Array.from({ length: numNews }, (_, i) => ({
    headline: sectorNews[i % sectorNews.length],
    type: 'neutral',
    timestamp: -Math.floor(Math.random() * 5) // Random past days
  }));
};

/**
 * Builds the initial list of fictional stocks for the market.
 * Each stock represents a themed sector tied to pet care.
 *
 * @returns {Array} Array of stock objects used throughout the game
 */
const createStocks = () => [
  {
    id: 'PFC',
    name: 'PetFood Corp',
    price: 50,
    basePrice: 50,
    volatility: 0.05,
    ethicalRating: 30,
    petImpact: 'stable',
    description: 'Stable, affordable pet nutrition',
    sector: 'Food',
    owned: 0,
    priceHistory: generateHistoricalPrices(50, 0.05),
    news: generateInitialNews({ name: 'PetFood Corp', sector: 'Food' })
  },
  {
    id: 'VCS',
    name: 'VetCare Systems',
    price: 120,
    basePrice: 120,
    volatility: 0.15,
    ethicalRating: 70,
    petImpact: 'health',
    description: 'Healthcare for pets',
    sector: 'Healthcare',
    owned: 0,
    priceHistory: generateHistoricalPrices(120, 0.15),
    news: generateInitialNews({ name: 'VetCare Systems', sector: 'Healthcare' })
  },
  {
    id: 'TTI',
    name: 'ToyTech Industries',
    price: 80,
    basePrice: 80,
    volatility: 0.20,
    ethicalRating: 50,
    petImpact: 'happiness',
    description: 'High-tech entertainment',
    sector: 'Entertainment',
    owned: 0,
    priceHistory: generateHistoricalPrices(80, 0.20),
    news: generateInitialNews({ name: 'ToyTech Industries', sector: 'Entertainment' })
  },
  {
    id: 'EPL',
    name: 'EcoPet Labs',
    price: 60,
    basePrice: 60,
    volatility: 0.08,
    ethicalRating: 95,
    petImpact: 'trust',
    description: 'Sustainable, ethical pet care',
    sector: 'Ethical',
    owned: 0,
    priceHistory: generateHistoricalPrices(60, 0.08),
    news: generateInitialNews({ name: 'EcoPet Labs', sector: 'Ethical' })
  },
  {
    id: 'LXP',
    name: 'LuxPaws Premium',
    price: 200,
    basePrice: 200,
    volatility: 0.25,
    ethicalRating: 40,
    petImpact: 'luxury',
    description: 'High-risk luxury investments',
    sector: 'Luxury',
    owned: 0,
    priceHistory: generateHistoricalPrices(200, 0.25),
    news: generateInitialNews({ name: 'LuxPaws Premium', sector: 'Luxury' })
  },
  {
    id: 'AQT',
    name: 'AquaPet Technologies',
    price: 45,
    basePrice: 45,
    volatility: 0.12,
    ethicalRating: 60,
    petImpact: 'health',
    description: 'Water purification & hydration',
    sector: 'Utilities',
    owned: 0,
    priceHistory: generateHistoricalPrices(45, 0.12),
    news: generateInitialNews({ name: 'AquaPet Technologies', sector: 'Utilities' })
  },
  {
    id: 'GRO',
    name: 'GroomTech Global',
    price: 75,
    basePrice: 75,
    volatility: 0.10,
    ethicalRating: 55,
    petImpact: 'happiness',
    description: 'Pet grooming & hygiene tech',
    sector: 'Services',
    owned: 0,
    priceHistory: generateHistoricalPrices(75, 0.10),
    news: generateInitialNews({ name: 'GroomTech Global', sector: 'Services' })
  },
  {
    id: 'SLP',
    name: 'SleepWell Pet Co',
    price: 55,
    basePrice: 55,
    volatility: 0.07,
    ethicalRating: 65,
    petImpact: 'energy',
    description: 'Rest & recovery products',
    sector: 'Wellness',
    owned: 0,
    priceHistory: generateHistoricalPrices(55, 0.07),
    news: generateInitialNews({ name: 'SleepWell Pet Co', sector: 'Wellness' })
  },
  {
    id: 'FIT',
    name: 'FitPaw Athletics',
    price: 90,
    basePrice: 90,
    volatility: 0.18,
    ethicalRating: 75,
    petImpact: 'energy',
    description: 'Exercise & fitness equipment',
    sector: 'Fitness',
    owned: 0,
    priceHistory: generateHistoricalPrices(90, 0.18),
    news: generateInitialNews({ name: 'FitPaw Athletics', sector: 'Fitness' })
  },
  {
    id: 'BRN',
    name: 'BrainStim Industries',
    price: 110,
    basePrice: 110,
    volatility: 0.22,
    ethicalRating: 80,
    petImpact: 'happiness',
    description: 'Cognitive enrichment & training',
    sector: 'Education',
    owned: 0,
    priceHistory: generateHistoricalPrices(110, 0.22),
    news: generateInitialNews({ name: 'BrainStim Industries', sector: 'Education' })
  },
  {
    id: 'INS',
    name: 'PetShield Insurance',
    price: 65,
    basePrice: 65,
    volatility: 0.06,
    ethicalRating: 85,
    petImpact: 'trust',
    description: 'Pet insurance & protection',
    sector: 'Insurance',
    owned: 0,
    priceHistory: generateHistoricalPrices(65, 0.06),
    news: generateInitialNews({ name: 'PetShield Insurance', sector: 'Insurance' })
  },
  {
    id: 'TRV',
    name: 'TravelPaws Ltd',
    price: 85,
    basePrice: 85,
    volatility: 0.28,
    ethicalRating: 45,
    petImpact: 'stress',
    description: 'Pet travel & relocation services',
    sector: 'Travel',
    owned: 0,
    priceHistory: generateHistoricalPrices(85, 0.28),
    news: generateInitialNews({ name: 'TravelPaws Ltd', sector: 'Travel' })
  }
];

/**
 * Creates a new pet object with baseline stats.
 * This is the player's core companion and the driver of market influence.
 *
 * @param {string} name - Pet name selected by the player
 * @param {string} breed - Breed key from PET_BREEDS
 * @param {string} personality - Personality key from PET_PERSONALITIES
 * @returns {Object} Initialized pet state
 */
const createPet = (name = "Luna", breed = "cat", personality = "balanced") => ({
  name: name,
  breed: breed,
  personality: personality,
  health: 100,
  stress: 20,
  trust: 50,
  energy: 80,
  happiness: 70,
  hunger: 0,
  financialAwareness: 50,
  evolution: "Newborn",
  sickness: null,
  size: 1.0, // Feature #6: Visual growth (0.5 to 1.5)
  roomItems: [], // Feature #7: Owned room items
  skills: { // Feature #8: Training skills
    marketIntuition: 0,
    stressManagement: 0,
    negotiation: 0,
    luck: 0
  },
  currentRequest: null, // Feature #2: Active request
  requestCooldown: 0,
  memory: {
    totalFeedings: 0,
    totalVetVisits: 0,
    marketCrashes: 0,
    marketBooms: 0,
    daysInStress: 0,
    careQualityTrend: [],
    financialStabilityTrend: [],
    lastPortfolioValue: 0
  }
});

/**
 * Initializes the market state for trend and volatility tracking.
 * This allows controlled macro events over time.
 *
 * @returns {Object} Market state object
 */
const createMarket = () => ({
  volatilityIndex: 1.0,
  trend: 'neutral', // bullish, bearish, neutral
  newsEvents: [],
  daysSinceEvent: 0
});

const STARTING_CASH = 1000;

/**
 * Creates the full initial game state.
 * This bundles pet, market, and stock data for a clean restart.
 *
 * @returns {Object} Initial game state
 */
const createGameState = (gameLength = 90) => {
  const initialStocks = createStocks().map(stock => ({
    ...stock,
    change: 0,
    petInfluence: {
      health: 0,
      happiness: 0,
      trust: 0,
      stress: 0,
      energy: 0,
      emotion: 0
    }
  }));
  const initialTickCounter = initialStocks.reduce((max, stock) => Math.max(max, stock.priceHistory.length), 0);

  return {
    day: 1,
    gameLength: gameLength,
    summaryShown: false,
    cash: STARTING_CASH,
    portfolioValue: 0,
    totalNetWorth: STARTING_CASH,
    totalSpent: 0,
    ethicsScore: 50,
    pet: createPet(),
    stocks: initialStocks,
    market: createMarket(),
    history: [],
    events: [],
    transactions: [],
    badges: [], // Badge system replaces achievements
    dailyTasks: createDailyTasksState(),
    dailyTaskCooldowns: createDailyTaskCooldowns(),
    dailyTaskTotals: createDailyTaskTotals(),
    dailyCompletionHistory: [],
    dailyCareStreak: 0,
    responsibilityPoints: 0,
    insurance: {
      active: false,
      plan: "basic",
      daysCovered: 0,
      missedPayments: 0
    },
    minigamesWon: 0,
    tickCounter: initialTickCounter,
    tickInDay: 0
  };
};

// ============================================================================
// STOCK MARKET SIMULATION
// ============================================================================
// This section updates market prices and connects them to pet wellbeing.
// It is the core gameplay loop that ties emotional care to financial outcomes.

// ============================================================================
// STOCK MARKET SIMULATION WITH PET EMOTION INFLUENCE
// ============================================================================
// Prices are a mix of random walk, overall market trend, and pet mood factors.
// This gives a realistic-feeling market while rewarding good pet care.

const PRICE_SWING_MULTIPLIER = 1.6;

/**
 * Calculates a simplified emotional state based on key pet stats.
 * This drives both the on-screen mood feedback and the market influence system.
 *
 * @param {Object} pet - Pet state object containing health, happiness, trust, and stress
 * @returns {{state: string, influence: number, message: string}} Mood tier with market modifier
 */
const getPetEmotionalState = (pet) => {
  // Core stats that represent mood drivers in gameplay
  const happiness = pet.happiness;
  const stress = pet.stress;
  const health = pet.health;
  const trust = pet.trust;
  
  // Equal weight of positive stats; stress is subtracted to penalize anxiety.
  // Divide by 3 to keep the score in a 0-100-ish range for simple thresholds.
  const overallMood = (happiness + health + trust - stress) / 3;
  
  // Tier thresholds are spaced for clear player feedback (70/50/30).
  if (overallMood > 70) return { state: 'euphoric', influence: 0.015, message: '😊 Happy pet' };
  if (overallMood > 50) return { state: 'content', influence: 0.005, message: '😌 Content pet' };
  if (overallMood > 30) return { state: 'anxious', influence: -0.005, message: '😟 Anxious pet' };
  return { state: 'distressed', influence: -0.02, message: '😰 Distressed pet' };
};

/**
 * Updates each stock price using random walk + market trend + pet influence.
 * This is the central mechanic that ties care quality to investment outcomes.
 *
 * @param {Array} stocks - All stock objects to update
 * @param {Object} market - Market state (trend, volatility, events)
 * @param {Object} pet - Pet state for mood influence
 * @param {number} currentDay - Current in-game day
 * @param {number} currentTick - Unique tick counter for chart x-axis
 * @param {number} tickInDay - Tick count within the current day (for labels)
 * @returns {Array} Updated stock list with new prices and histories
 */
const updateStockPricesWithPetEmotion = (stocks, market, pet, currentDay, currentTick, tickInDay) => {
  const petEmotion = getPetEmotionalState(pet);
  
  return stocks.map(stock => {
    // Base random movement with a per-stock seed so each ticker behaves differently.
    // This prevents all stocks from moving in lockstep (more realistic).
    const stockSeed = stock.id.charCodeAt(0) / 100;
    const randomChange = ((Math.random() + stockSeed) % 1 - 0.5) * 2 * stock.volatility;
    
    // Market trend adds a mild directional bias so news/events feel impactful.
    const trendInfluence = market.trend === 'bullish' ? 0.02 : 
                          market.trend === 'bearish' ? -0.02 : 0;
    
    // Pet-specific influences map pet stats to themed stocks (role-played sectors).
    let petHealthInfluence = 0;
    let petHappinessInfluence = 0;
    let petTrustInfluence = 0;
    let petStressInfluence = 0;
    let petEnergyInfluence = 0;
    
    switch(stock.id) {
      case 'VCS': // VetCare - health
        // Below 50 health creates demand for vet care (positive boost).
        petHealthInfluence = pet.health < 50 ? 0.03 : 0;
        break;
      case 'TTI': // ToyTech - happiness
        // Scaled to a +/- 0.05 range to avoid overpowering randomness.
        petHappinessInfluence = (pet.happiness - 50) / 1000;
        break;
      case 'EPL': // EcoPet - trust & ethics
        // Slightly stronger effect to reward ethical play paths.
        petTrustInfluence = (pet.trust - 50) / 800;
        break;
      case 'LXP': // Luxury - inverse stress
        // High stress reduces luxury spending, so invert the influence.
        petStressInfluence = -(pet.stress - 50) / 1000;
        break;
      case 'AQT': // AquaPet - health-related
        // Smaller modifier to keep utilities more stable than vets.
        petHealthInfluence = (pet.health - 50) / 1500;
        break;
      case 'GRO': // GroomTech - happiness & health
        // Shared influence encourages balanced care rather than min-maxing.
        petHappinessInfluence = (pet.happiness - 50) / 1500;
        petHealthInfluence = (pet.health - 50) / 2000;
        break;
      case 'SLP': // SleepWell - energy (inverse - low energy = need sleep products)
        // Lower energy increases demand for sleep products.
        petEnergyInfluence = -(pet.energy - 50) / 1200;
        break;
      case 'FIT': // FitPaw - energy & health
        // Fitness responds to energy first, health second.
        petEnergyInfluence = (pet.energy - 50) / 1000;
        petHealthInfluence = (pet.health - 50) / 1500;
        break;
      case 'BRN': // BrainStim - happiness & low stress
        // Cognitive products sell better when the pet is happy and calm.
        petHappinessInfluence = (pet.happiness - 50) / 1200;
        petStressInfluence = -(pet.stress - 50) / 1500;
        break;
      case 'INS': // Insurance - trust & health concerns
        // Insurance demand spikes when health is uncertain.
        petTrustInfluence = (pet.trust - 50) / 1000;
        petHealthInfluence = pet.health < 60 ? 0.015 : 0;
        break;
      case 'TRV': // Travel - stress (high stress = avoid travel)
        // Stress discourages travel, so invert.
        petStressInfluence = -(pet.stress - 30) / 800;
        break;
      case 'PFC': // PetFood - stable, minimal influence
        // Food demand is steady, so keep influence small.
        petHealthInfluence = (pet.health - 50) / 3000;
        break;
    }
    
    // Overall pet emotion influences all stocks slightly for global mood impact.
    const emotionInfluence = petEmotion.influence;
    
    // Volatility multiplier makes events feel larger without changing base logic.
    const volatilityMult = market.volatilityIndex;
    
    const totalChange = (
      randomChange + 
      trendInfluence + 
      petHealthInfluence + 
      petHappinessInfluence + 
      petTrustInfluence + 
      petStressInfluence +
      petEnergyInfluence +
      emotionInfluence
    ) * volatilityMult * PRICE_SWING_MULTIPLIER;
    
    const newPrice = stock.price * (1 + totalChange);
    
    // Keep a floor to avoid negative or zero prices.
    const clampedPrice = Math.max(stock.basePrice * 0.3, newPrice);
    
    // Add to price history (every tick gets a unique x value for charting).
    const updatedHistory = [
      ...stock.priceHistory,
      { day: currentDay, tick: currentTick, tickInDay, price: clampedPrice }
    ];
    
    // Keep only last 60 days of history
    const trimmedHistory = updatedHistory.slice(-60);
    
    return {
      ...stock,
      price: clampedPrice,
      change: ((clampedPrice - stock.price) / stock.price) * 100,
      priceHistory: trimmedHistory,
      news: [
        ...generateStockNews(
          { ...stock, price: clampedPrice, change: ((clampedPrice - stock.price) / stock.price) * 100 }, 
          pet, 
          market, 
          currentDay
        ),
        ...(stock.news || [])
      ].slice(0, 5), // Keep only latest 5 news items
      petInfluence: {
        health: petHealthInfluence,
        happiness: petHappinessInfluence,
        trust: petTrustInfluence,
        stress: petStressInfluence,
        energy: petEnergyInfluence,
        emotion: emotionInfluence
      }
    };
  });
};

/**
 * Wrapper to update prices; keeps the call site readable.
 * This allows future expansion (e.g., external events) without
 * changing the rest of the game loop.
 *
 * @param {Array} stocks - Current stock list
 * @param {Object} market - Current market state
 * @param {Object} pet - Current pet state
 * @param {number} currentDay - Current in-game day
 * @param {number} currentTick - Global tick counter
 * @param {number} tickInDay - Tick count within the current day
 * @returns {Array} Updated stocks
 */
const updateStockPrices = (stocks, market, pet, currentDay, currentTick, tickInDay) => {
  return updateStockPricesWithPetEmotion(stocks, market, pet, currentDay, currentTick, tickInDay);
};

/**
 * Randomly generates macro market events that shift trend/volatility.
 * These spikes create memorable highs/lows without constant randomness.
 *
 * @param {number} day - Current game day
 * @param {Object} market - Market state
 * @param {Object} pet - Pet state (reserved for future pet-driven events)
 * @returns {Object|null} Event object or null if no event triggers
 */
const generateMarketEvent = (day, market, pet) => {
  const events = [
    {
      type: 'boom',
      message: '📈 Market Rally! All sectors up',
      effect: { trend: 'bullish', volatility: 0.8 },
      probability: 0.1 // ~10% chance keeps booms special
    },
    {
      type: 'crash',
      message: '📉 Market Correction! High volatility',
      effect: { trend: 'bearish', volatility: 1.5 },
      probability: 0.08 // Slightly rarer than booms
    },
    {
      type: 'scandal',
      message: '⚠️ Corporate Scandal: Ethical stocks gain',
      effect: { trend: 'neutral', volatility: 1.2 },
      probability: 0.05 // Low probability to keep ethics swings meaningful
    },
    {
      type: 'innovation',
      message: '💡 Tech Breakthrough: Entertainment sector surges',
      effect: { trend: 'neutral', volatility: 1.1 },
      probability: 0.07 // Mid-tier event frequency
    }
  ];
  
  // Events require a short cooldown (daysSinceEvent > 3) to avoid spam.
  for (const event of events) {
    if (Math.random() < event.probability && market.daysSinceEvent > 3) {
      return event;
    }
  }
  
  return null;
};

// ============================================================================
// AUTONOMOUS PET DECISION ENGINE - RESPONDS TO FINANCIAL STRESS
// ============================================================================
// The pet adapts to the player's financial health to create emotional feedback
// loops that influence the market (and therefore the player's decisions).

/**
 * Determines pet behavioral decisions based on current finances and holdings.
 * This is the heart of the pet decision system and drives emergent gameplay.
 *
 * @param {Object} pet - Pet state
 * @param {number} portfolioValue - Current portfolio valuation
 * @param {number} cash - Current liquid cash
 * @param {Array} stocks - Stock list with holdings and ethics ratings
 * @returns {{decisions: Array, newFinancialAwareness: number}} Decisions and updated awareness
 */
const petDecisionEngine = (pet, portfolioValue, cash, stocks) => {
  const decisions = [];
  const totalWealth = portfolioValue + cash;
  // Normalize to starting wealth so thresholds are stable across runs.
  const financialStability = totalWealth / STARTING_CASH;
  
  // Awareness drives long-term pet evolution and feedback.
  const newFinancialAwareness = Math.min(100, Math.max(0, financialStability * 50));
  
  // Decision 1: Financial stress response (primary survival loop)
  if (financialStability < 0.5) {
    decisions.push({
      action: 'financial_anxiety',
      impact: 'Pet senses financial stress',
      stressIncrease: 15, // Sharp stress to push player to stabilize finances
      healthDecrease: 5   // Small health drop to keep consequences tangible
    });
  } else if (financialStability > 1.5) {
    decisions.push({
      action: 'financial_security',
      impact: 'Pet feels secure and calm',
      stressDecrease: 10, // Reward for solid finances
      trustIncrease: 5    // Trust is slower to build to feel earned
    });
  }
  
  // Decision 2: Portfolio composition awareness (ethics system tie-in)
  const ethicalHoldings = stocks
    .filter(s => s.ethicalRating > 70 && s.owned > 0)
    .reduce((sum, s) => sum + (s.owned * s.price), 0);
  
  const ethicalPercent = portfolioValue > 0 ? ethicalHoldings / portfolioValue : 0;
  
  if (ethicalPercent > 0.5) { // Majority ethical portfolio
    decisions.push({
      action: 'ethical_appreciation',
      impact: 'Pet appreciates ethical investments',
      trustIncrease: 8,     // Ethics directly boosts trust
      happinessIncrease: 10 // Visible reward for ethical choices
    });
  }
  
  // Decision 3: Market volatility response (memory-driven behavior)
  if (pet.memory.marketCrashes > 2) {
    decisions.push({
      action: 'market_trauma',
      impact: 'Past market crashes affect behavior',
      stressIncrease: 5,  // Mild ongoing anxiety
      energyDecrease: 10  // Lower energy encourages rest actions
    });
  }
  
  // Decision 4: Luxury lifestyle response (risk vs. comfort)
  const luxuryHoldings = stocks
    .filter(s => s.id === 'LXP' && s.owned > 0)
    .reduce((sum, s) => sum + (s.owned * s.price), 0);
  
  if (luxuryHoldings > portfolioValue * 0.3 && financialStability > 1.2) {
    decisions.push({
      action: 'luxury_lifestyle',
      impact: 'Living in luxury, but fragile',
      happinessIncrease: 15, // Luxury feels good short-term
      stressIncrease: 10     // But adds pressure to maintain lifestyle
    });
  }
  
  return { decisions, newFinancialAwareness };
};

// ============================================================================
// DYNAMIC CARE COSTS - DRIVEN BY PORTFOLIO
// ============================================================================
// Care becomes cheaper or more expensive depending on investments and stress,
// reinforcing the link between financial choices and pet wellbeing.

/**
 * Calculates the dynamic cost of pet care actions.
 * This ties portfolio ownership to care affordability (economy feedback loop).
 *
 * @param {string} item - Care item key (food_cheap, vet_checkup, etc.)
 * @param {Array} stocks - Current stock list with ownership counts
 * @param {Object} pet - Current pet state
 * @param {number} cash - Current cash on hand
 * @param {Object} insurance - Insurance state for discounts
 * @returns {number} Final rounded cost for the action
 */
const calculateCareCost = (item, stocks, pet, cash, insurance) => {
  const foodStock = stocks.find(s => s.id === 'PFC');
  const vetStock = stocks.find(s => s.id === 'VCS');
  const insurancePlan = insurance?.active ? INSURANCE_PLANS[insurance.plan] : null;
  
  // Base costs are tuned so early game choices feel meaningful but affordable.
  const baseCosts = {
    food_cheap: 10,
    food_regular: 20,
    food_premium: 40,
    vet_checkup: 100,
    vet_emergency: 300,
    play: 15,
    bathroom: 0,
    walk: 5
  };
  
  let cost = baseCosts[item];
  
  // If you own food company stock, food is cheaper
  if (item.includes('food') && foodStock.owned > 0) {
    // 20% discount rewards vertical integration strategy
    cost *= 0.8;
  }
  
  // If you own vet stock, healthcare is cheaper
  if (item.includes('vet') && vetStock.owned > 0) {
    // 15% discount keeps vet care meaningful but incentivizes VCS ownership
    cost *= 0.85;
  }

  // Insurance discounts apply to vet care costs
  if (item.includes('vet') && insurancePlan) {
    cost *= (1 - insurancePlan.vetDiscount);
  }
  
  // Financial stress increases costs (inflation from stress)
  if (cash < 200) {
    // 30% penalty pushes players away from bankruptcy spirals
    cost *= 1.3;
  }
  
  // Poor health increases vet costs
  if (item.includes('vet') && pet.health < 50) {
    // 50% surcharge creates urgency when health is critical
    cost *= 1.5;
  }
  
  return Math.floor(cost);
};

// ============================================================================
// MEMORY & EVOLUTION SYSTEM
// ============================================================================
// Tracks long-term pet history so choices have lasting consequences.
// Evolution names are a visible summary of the player's care style.

/**
 * Updates the pet's memory stats based on a care action and finances.
 * Memory is used later for evolution and decision behavior to create continuity.
 *
 * @param {Object} pet - Current pet state
 * @param {string} action - Action type (feed, vet, play)
 * @param {number} quality - Quality score (0-100) for recent care
 * @param {number} financialStability - Normalized stability (0-2+ range)
 * @returns {Object} Updated memory object
 */
const updatePetMemory = (pet, action, quality, financialStability) => {
  const memory = { ...pet.memory };
  
  if (action === 'feed') memory.totalFeedings++;
  if (action === 'vet') memory.totalVetVisits++;
  if (financialStability < 0.5) memory.daysInStress++;
  
  // Keep a rolling 7-day window for trend lines and evolution decisions.
  memory.careQualityTrend.push(quality);
  memory.financialStabilityTrend.push(financialStability);
  
  if (memory.careQualityTrend.length > 7) {
    memory.careQualityTrend.shift();
    memory.financialStabilityTrend.shift();
  }
  
  return memory;
};

/**
 * Determines the pet's evolution title based on care, ethics, and finances.
 * Evolutions provide a narrative payoff for different play styles.
 *
 * @param {Object} pet - Current pet state
 * @param {number} portfolioValue - Total value of owned stocks
 * @param {number} cash - Cash on hand
 * @param {Array} stocks - Stock list for ethical analysis
 * @param {number} ethicsScore - Current ethics score
 * @param {number} day - Current game day
 * @returns {string} Evolution title (emoji + label)
 */
const determineEvolution = (pet, portfolioValue, cash, stocks, ethicsScore, day) => {
  // Early days use fixed titles so players learn the system first.
  if (day < 7) return "Newborn";
  if (day < 14) return "Young";
  
  const totalWealth = portfolioValue + cash;
  // Normalize stability to keep thresholds readable (1.0 = stable).
  const financialStability = totalWealth / 1000;
  const avgHealth = pet.health;
  
  const ethicalHoldings = stocks
    .filter(s => s.ethicalRating > 70 && s.owned > 0)
    .reduce((sum, s) => sum + (s.owned * s.price), 0);
  const ethicalPercent = portfolioValue > 0 ? ethicalHoldings / portfolioValue : 0;
  
  // Evolution paths
  // Thresholds are tuned for clarity: strong health + trust + ethics yields the top path.
  if (avgHealth > 80 && pet.trust > 70 && ethicalPercent > 0.4) {
    return "🌿 Ethical Guardian";
  } else if (financialStability > 2 && pet.stress < 30) {
    // High wealth + low stress produces independence
    return "🤖 Independent Companion";
  } else if (portfolioValue > 2000 && pet.stress > 60) {
    // Wealth with stress signals luxury-but-pressured lifestyle
    return "💎 Luxury Pet";
  } else if (pet.stress > 70 || pet.memory.daysInStress > 10) {
    // Consistent stress creates the anxious evolution
    return "😰 Anxious Dependent";
  } else if (avgHealth > 70 && financialStability > 1 && financialStability < 2) {
    // Balanced middle path rewards steady play
    return "🦴 Resilient Friend";
  } else {
    return "🐾 Developing";
  }
};

// ============================================================================
// WELCOME SCREEN COMPONENT
// ============================================================================
// Handles the onboarding flow for pet creation before gameplay begins.

function WelcomeScreen({ onStart }) {
  const [petName, setPetName] = useState("");
  const [selectedBreed, setSelectedBreed] = useState("cat");
  const [selectedPersonality, setSelectedPersonality] = useState("balanced");
  const [selectedGameLength, setSelectedGameLength] = useState(90);

  const handleStart = () => {
    const name = petName.trim() || "Luna";
    onStart(name, selectedBreed, selectedPersonality, selectedGameLength);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white flex flex-col items-center justify-center p-8">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent animate-pulse">
            PAWSTREET
          </h1>
          <p className="text-xl text-cyan-300">Virtual Pet Market Simulator</p>
          <p className="text-sm text-slate-400 mt-2">Where your pet's emotions move the markets</p>
        </div>

        <div className="bg-black/40 backdrop-blur border border-purple-500/30 rounded-2xl p-8 shadow-2xl">
          <h2 className="text-2xl font-bold text-purple-300 mb-6 text-center">Create Your Pet</h2>
          
          {/* Pet Name Input */}
          <div className="mb-8">
            <label className="block text-sm font-bold text-purple-300 mb-2">
              Pet Name
            </label>
            <input
              type="text"
              value={petName}
              onChange={(e) => setPetName(e.target.value)}
              placeholder="Enter your pet's name..."
              maxLength={20}
              className="w-full bg-slate-900 border border-purple-500/30 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20"
            />
            <p className="text-xs text-slate-400 mt-1">
              {petName.trim() ? `Name: ${petName}` : "Default name: Luna"}
            </p>
          </div>

          {/* Breed Selection */}
          <div className="mb-8">
            <label className="block text-sm font-bold text-purple-300 mb-3">
              Choose Your Pet
            </label>
            <div className="grid grid-cols-4 gap-3">
              {Object.entries(PET_BREEDS).map(([breedKey, breed]) => (
                <button
                  key={breedKey}
                  onClick={() => setSelectedBreed(breedKey)}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    selectedBreed === breedKey
                      ? 'border-purple-400 bg-purple-500/20 shadow-lg shadow-purple-500/30 scale-105'
                      : 'border-slate-700 bg-slate-900/50 hover:border-purple-500/50 hover:bg-slate-800/50'
                  }`}
                >
                  <div className="text-5xl mb-2 animate-bounce-slow">{breed.emoji}</div>
                  <div className="text-xs font-bold text-purple-200">{breed.name}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Personality Selection */}
          <div className="mb-8">
            <label className="block text-sm font-bold text-purple-300 mb-3">
              Choose Personality
            </label>
            <div className="grid grid-cols-3 gap-3">
              {Object.entries(PET_PERSONALITIES).map(([key, personality]) => (
                <button
                  key={key}
                  onClick={() => setSelectedPersonality(key)}
                  className={`p-3 rounded-xl border-2 transition-all ${
                    selectedPersonality === key
                      ? 'border-cyan-400 bg-cyan-500/20 shadow-lg shadow-cyan-500/30'
                      : 'border-slate-700 bg-slate-900/50 hover:border-cyan-500/50 hover:bg-slate-800/50'
                  }`}
                >
                  <div className="text-3xl mb-1">{personality.emoji}</div>
                  <div className="text-xs font-bold text-cyan-200">{personality.name}</div>
                  <div className="text-[10px] text-slate-400 mt-1">{personality.description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Game Length Selection */}
          <div className="mb-8">
            <label className="block text-sm font-bold text-purple-300 mb-3">
              Program Length (Parent Checklist)
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[30, 60, 90].map(days => (
                <button
                  key={days}
                  onClick={() => setSelectedGameLength(days)}
                  className={`p-3 rounded-xl border-2 transition-all ${
                    selectedGameLength === days
                      ? 'border-emerald-400 bg-emerald-500/20 shadow-lg shadow-emerald-500/30'
                      : 'border-slate-700 bg-slate-900/50 hover:border-emerald-500/50 hover:bg-slate-800/50'
                  }`}
                >
                  <div className="text-lg font-bold text-emerald-200">{days} Days</div>
                  <div className="text-[10px] text-slate-400 mt-1">
                    {days === 30 && "Starter routine"}
                    {days === 60 && "Skill-building"}
                    {days === 90 && "Full readiness check"}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Preview */}
          <div className="mb-8 p-6 bg-gradient-to-br from-purple-900/20 to-cyan-900/20 rounded-xl border border-purple-500/20">
            <p className="text-sm text-purple-300 mb-3 text-center">Preview:</p>
            <div className="flex items-center justify-center gap-4">
              <div className="text-7xl animate-bounce-slow filter drop-shadow-2xl">
                {PET_BREEDS[selectedBreed].emoji}
              </div>
              <div>
                <div className="text-2xl font-bold text-white">
                  {petName.trim() || "Luna"}
                </div>
                <div className="text-sm text-purple-300">
                  {PET_BREEDS[selectedBreed].name}
                </div>
                <div className="text-xs text-cyan-300 mt-1">
                  {PET_PERSONALITIES[selectedPersonality].emoji} {PET_PERSONALITIES[selectedPersonality].name}
                </div>
              </div>
            </div>
          </div>

          {/* Start Button */}
          <button
            onClick={handleStart}
            className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-bold py-4 px-8 rounded-xl shadow-lg shadow-purple-500/30 transition-all transform hover:scale-105"
          >
            🚀 Start Your Journey
          </button>

          {/* Info */}
          <div className="mt-6 text-center text-xs text-slate-400">
            <p>Your pet's emotions will influence stock market prices</p>
            <p className="mt-1">Manage your portfolio and keep your pet happy!</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// CORE COMPONENT
// ============================================================================
// Orchestrates game state, UI routing, and all player interactions.

export default function PawStreet() {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameState, setGameState] = useState(null);
  const [timelines, setTimelines] = useState([]);
  const [selectedTimeline, setSelectedTimeline] = useState(null);
  const [view, setView] = useState("tutorial"); // market, portfolio, pet, tutorial, help, analytics, badges, timelines
  const [actionLog, setActionLog] = useState([]);
  const [selectedAssetId, setSelectedAssetId] = useState(null);
  const [marketCategory, setMarketCategory] = useState("stocks");
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [tradeAmount, setTradeAmount] = useState(1);
  const [autoTick, setAutoTick] = useState(true);
  const [tickInterval, setTickInterval] = useState(25); // Default 25 seconds
  const [autoDay, setAutoDay] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [gameOverReason, setGameOverReason] = useState("");
  const [isResting, setIsResting] = useState(false);
  const [restTicksRemaining, setRestTicksRemaining] = useState(0);
  const [showMinigame, setShowMinigame] = useState(false);
  const [currentMinigame, setCurrentMinigame] = useState(null);
  const [showWheel, setShowWheel] = useState(false);
  const [wheelResult, setWheelResult] = useState(null);
  const [hasSpunThisWeek, setHasSpunThisWeek] = useState(false);
  const [showFinalSummary, setShowFinalSummary] = useState(false);
  const [summarySnapshot, setSummarySnapshot] = useState(null);
  const [tutorialStepIndex, setTutorialStepIndex] = useState(0);
  const [tutorialOverrides, setTutorialOverrides] = useState({});
  const [helpMessages, setHelpMessages] = useState(() => createHelpWelcomeMessages());
  const [analyticsChartMode, setAnalyticsChartMode] = useState("financial");

  // Add log function - must be defined before use
  const addLog = (message, type = "info") => {
    setActionLog(prev => [...prev, { message, type, time: Date.now() }].slice(-20));
  };

  /**
   * Saves the current run as a timeline snapshot for later comparison.
   * This powers the "Parallel Timeline" feature in the competition demo.
   */
  const saveTimeline = () => {
    // Calculate portfolio value locally
    const currentPortfolioValue = gameState.stocks.reduce((sum, stock) => 
      sum + (stock.owned * stock.price), 0
    );
    const currentTotalNetWorth = currentPortfolioValue + gameState.cash;
    
    const timeline = {
      id: Date.now(),
      name: `Timeline ${timelines.length + 1}`,
      finalDay: gameState.day,
      finalCash: gameState.cash,
      finalPortfolio: currentPortfolioValue,
      finalNetWorth: currentTotalNetWorth,
      totalSpent: gameState.totalSpent,
      avgHealth: gameState.history.reduce((sum, h) => sum + h.health, 0) / gameState.history.length,
      avgStress: gameState.history.reduce((sum, h) => sum + h.stress, 0) / gameState.history.length,
      avgHappiness: gameState.history.reduce((sum, h) => sum + h.happiness, 0) / gameState.history.length,
      ethicsScore: gameState.ethicsScore,
      evolution: gameState.pet.evolution,
      history: [...gameState.history],
      snapshot: { ...gameState }
    };
    
    setTimelines([...timelines, timeline]);
    addLog(`Timeline saved: ${timeline.name}`, "system");
  };

  // Auto-tick market updates based on user-configured interval.
  // Dependencies: autoTick (toggle), gameState (need current data),
  // tickInterval (user setting), gameOver/isResting (pause rules).
  useEffect(() => {
    if (!autoTick || !gameState || gameOver) return;
    
    const interval = setInterval(() => {
      if (isResting && restTicksRemaining > 0) {
        setRestTicksRemaining(prev => prev - 1);
        if (restTicksRemaining === 1) {
          setIsResting(false);
          addLog("Pet finished resting!", "system");
        }
      } else if (!isResting) {
        marketTick();
      }
    }, tickInterval * 1000); // Convert seconds to milliseconds
    
    return () => clearInterval(interval);
  }, [autoTick, gameState, tickInterval, gameOver, isResting, restTicksRemaining]);

  // Auto-day progression (3 minutes = 180 seconds).
  // Dependencies: autoDay (toggle), gameState (current state), gameOver/isResting (pause rules).
  useEffect(() => {
    if (!autoDay || !gameState || gameOver) return;
    
    const interval = setInterval(() => {
      if (!isResting) {
        nextDay();
      }
    }, 180000); // 3 minutes
    
    return () => clearInterval(interval);
  }, [autoDay, gameState, gameOver, isResting]);

  // Check for game over conditions whenever the pet state changes.
  // Dependencies: gameState (pet stats), gameOver (avoid repeat triggers).
  useEffect(() => {
    if (!gameState || gameOver) return;
    
    const pet = gameState.pet;
    if (pet.health <= 0) {
      setGameOver(true);
      setGameOverReason("health");
      addLog("💔 Your pet's health reached zero. Game Over.", "emergency");
    } else if (pet.hunger >= 100) {
      setGameOver(true);
      setGameOverReason("hunger");
      addLog("💔 Your pet starved. Game Over.", "emergency");
    }
  }, [gameState, gameOver]);

  // Handle game start with custom pet
  const handleGameStart = (petName, petBreed, petPersonality, gameLength) => {
    const initialState = createGameState(gameLength);
    initialState.pet = createPet(petName, petBreed, petPersonality);
    setGameState(initialState);
    setGameStarted(true);
    addLog(`Welcome ${petName} the ${PET_BREEDS[petBreed].name} (${PET_PERSONALITIES[petPersonality].emoji} ${PET_PERSONALITIES[petPersonality].name})! 🎉`, "system");
    addLog(`Program length set to ${gameLength} days`, "system");
  };

  // Cost basis calculation using FIFO (First In, First Out).
  // This mirrors real-world accounting and makes gains/losses feel authentic.
  const getCostBasis = (stockId) => {
    const transactions = gameState?.transactions || [];
    const lots = [];

    transactions.forEach((tx) => {
      if (tx.stock !== stockId) return;

      if (tx.type === 'BUY') {
        lots.push({ shares: tx.amount, price: tx.price });
        return;
      }

      if (tx.type === 'SELL') {
        let remaining = tx.amount;
        while (remaining > 0 && lots.length > 0) {
          const lot = lots[0];
          const take = Math.min(lot.shares, remaining);
          lot.shares -= take;
          remaining -= take;
          if (lot.shares === 0) {
            lots.shift();
          }
        }
      }
    });

    const totalShares = lots.reduce((sum, lot) => sum + lot.shares, 0);
    const totalCost = lots.reduce((sum, lot) => sum + lot.shares * lot.price, 0);
    const avgCost = totalShares > 0 ? totalCost / totalShares : 0;

    return { avgCost, totalShares };
  };

  const recordDailyTask = (state, taskId) => {
    if (!state.dailyTasks) state.dailyTasks = createDailyTasksState();
    if (!state.dailyTaskTotals) state.dailyTaskTotals = createDailyTaskTotals();
    if (!state.dailyTaskCooldowns) state.dailyTaskCooldowns = createDailyTaskCooldowns();
    const task = DAY_TASKS.find(t => t.id === taskId);
    if (!task) return;

    state.dailyTaskCooldowns[taskId] = Date.now();
    const current = state.dailyTasks[taskId] || 0;
    if (current < task.target) {
      state.dailyTasks[taskId] = current + 1;
      state.responsibilityPoints = (state.responsibilityPoints || 0) + task.points;
    }
    state.dailyTaskTotals[taskId] = (state.dailyTaskTotals[taskId] || 0) + 1;
  };

  const toggleInsurance = (planKey) => {
    if (!gameState) return;
    const plan = INSURANCE_PLANS[planKey];
    if (!plan) return;

    const currentPlan = gameState.insurance?.plan;
    const wasActive = gameState.insurance?.active;
    let newState = { ...gameState };
    newState.insurance = { ...(newState.insurance || {}), plan: planKey };

    if (wasActive && currentPlan === planKey) {
      newState.insurance.active = false;
      addLog(`🛑 Insurance paused (${plan.name})`, "system");
      setGameState(newState);
      return;
    }

    if (newState.cash < plan.premium) {
      addLog(`Not enough cash to activate ${plan.name} insurance`, "error");
      return;
    }

    newState.cash -= plan.premium;
    newState.totalSpent += plan.premium;
    newState.insurance.active = true;
    newState.insurance.daysCovered = (newState.insurance.daysCovered || 0) + 1;
    addLog(`${wasActive ? "🔁 Insurance switched to" : "🛡️ Insurance activated:"} ${plan.name}`, "system");
    setGameState(newState);
  };

  const getConstituents = (ids) => {
    if (!gameState) return [];
    return ids.map(id => gameState.stocks.find(stock => stock.id === id)).filter(Boolean);
  };

  const buildCompositeHistory = (constituents, multiplier = 1) => {
    if (!constituents.length) return [];

    const histories = constituents.map(stock => stock.priceHistory || []);
    const minLength = Math.min(...histories.map(history => history.length));
    if (!Number.isFinite(minLength) || minLength <= 0) return [];

    const startIndexes = histories.map(history => history.length - minLength);
    const history = [];

    for (let i = 0; i < minLength; i += 1) {
      let sum = 0;
      const basePoint = histories[0][startIndexes[0] + i];
      const day = basePoint.day;
      const tick = basePoint.tick ?? i + 1;
      const tickInDay = basePoint.tickInDay ?? 1;

      histories.forEach((series, idx) => {
        sum += series[startIndexes[idx] + i].price;
      });

      const avgPrice = (sum / histories.length) * multiplier;
      history.push({ day, tick, tickInDay, price: parseFloat(avgPrice.toFixed(2)) });
    }

    return history;
  };

  const buildDerivedAsset = (definition, assetType, category) => {
    const constituents = getConstituents(definition.constituents || []);
    const priceHistory = buildCompositeHistory(constituents, definition.multiplier || 1);
    const lastPoint = priceHistory[priceHistory.length - 1];
    const prevPoint = priceHistory[priceHistory.length - 2];
    const price = lastPoint ? lastPoint.price : 0;
    const change = prevPoint && prevPoint.price ? ((price - prevPoint.price) / prevPoint.price) * 100 : 0;
    const basePrice = constituents.length
      ? (constituents.reduce((sum, stock) => sum + stock.basePrice, 0) / constituents.length) * (definition.multiplier || 1)
      : 0;
    const volatility = constituents.length
      ? constituents.reduce((sum, stock) => sum + stock.volatility, 0) / constituents.length
      : 0;

    return {
      id: definition.id,
      name: definition.name,
      description: definition.description,
      assetType,
      category,
      price,
      basePrice,
      volatility,
      priceHistory,
      change,
      owned: 0,
      ethicalRating: null
    };
  };

  const equityAssets = gameState
    ? gameState.stocks.map(stock => ({
        ...stock,
        assetType: 'stock',
        category: 'stocks'
      }))
    : [];

  const ethicsLeaders = gameState
    ? [...gameState.stocks]
        .sort((a, b) => b.ethicalRating - a.ethicalRating)
        .slice(0, 5)
        .map(stock => stock.id)
    : [];

  const indexDefinitions = gameState
    ? [
        {
          id: 'PWS50',
          name: 'PawStreet 50',
          description: 'Broad market index of all listed pet stocks',
          constituents: gameState.stocks.map(stock => stock.id)
        },
        {
          id: 'PET10',
          name: 'PetTech 10',
          description: 'Tech & innovation leaders in the pet economy',
          constituents: ['TTI', 'BRN', 'FIT', 'GRO', 'AQT', 'SLP', 'LXP', 'TRV', 'INS', 'VCS']
        },
        {
          id: 'CARE6',
          name: 'Care & Wellness 6',
          description: 'Health, wellness, and essential services focus',
          constituents: ['VCS', 'AQT', 'SLP', 'FIT', 'GRO', 'PFC']
        },
        {
          id: 'ETHX5',
          name: 'Ethics 5',
          description: 'Top ethical performers across the market',
          constituents: ethicsLeaders
        }
      ]
    : [];

  const cryptoDefinitions = [
    {
      id: 'PAW',
      name: 'PawCoin',
      description: 'Market sentiment crypto index',
      constituents: ['LXP', 'BRN', 'TTI', 'TRV'],
      multiplier: 1.5
    },
    {
      id: 'MEOW',
      name: 'MeowToken',
      description: 'High-volatility meme-driven token',
      constituents: ['LXP', 'BRN', 'TTI'],
      multiplier: 2.2
    },
    {
      id: 'BARK',
      name: 'BarkChain',
      description: 'Utility token tied to service providers',
      constituents: ['VCS', 'AQT', 'GRO', 'FIT'],
      multiplier: 1.25
    }
  ];

  const metalDefinitions = [
    {
      id: 'PAWG',
      name: 'PawGold',
      description: 'Safe-haven precious metal',
      constituents: ['EPL', 'SLP', 'PFC'],
      multiplier: 1.1
    },
    {
      id: 'PAWS',
      name: 'PawSilver',
      description: 'Industrial precious metal',
      constituents: ['AQT', 'GRO', 'PFC'],
      multiplier: 0.9
    }
  ];

  const indexAssets = indexDefinitions.map(definition => buildDerivedAsset(definition, 'index', 'indexes'));
  const cryptoAssets = cryptoDefinitions.map(definition => buildDerivedAsset(definition, 'crypto', 'crypto'));
  const metalAssets = metalDefinitions.map(definition => buildDerivedAsset(definition, 'metal', 'metals'));

  const marketAssetsByCategory = {
    stocks: equityAssets,
    indexes: indexAssets,
    crypto: cryptoAssets,
    metals: metalAssets
  };

  const currentAssets = marketAssetsByCategory[marketCategory] || [];

  const allMarketAssets = [
    ...equityAssets,
    ...indexAssets,
    ...cryptoAssets,
    ...metalAssets
  ];

  const selectedAsset = allMarketAssets.find(asset => asset.id === selectedAssetId) || null;
  const selectedAssetHistory = selectedAsset?.priceHistory || [];
  const chartHistory = selectedAssetHistory.slice(-30);
  const chartDisplayHistory = selectedAssetHistory;
  const chartPixelWidth = Math.max(600, chartDisplayHistory.length * 24);
  const tickLabelLookup = new Map(chartDisplayHistory.map(point => [point.tick, point]));
  const formatXAxisTick = (value) => {
    const point = tickLabelLookup.get(value);
    if (!point) return '';
    return point.tickInDay === 1 ? `D${point.day}` : '';
  };
  const formatTooltipLabel = (value) => {
    const point = tickLabelLookup.get(value);
    if (!point) return `Tick ${value}`;
    const sub = point.tickInDay > 1 ? `.${point.tickInDay}` : '';
    return `Day ${point.day}${sub}`;
  };
  const axisDomain = ['dataMin - 5', 'dataMax + 5'];
  const selectedStock = selectedAsset && selectedAsset.assetType === 'stock' ? selectedAsset : null;

  // Keep a valid selection when switching market sub-tabs.
  // Dependencies: gameState (asset lists), marketCategory (active subtab).
  useEffect(() => {
    if (!gameState) return;
    const assetsForCategory = marketAssetsByCategory[marketCategory] || [];
    if (!assetsForCategory.length) return;
    if (!selectedAssetId || !assetsForCategory.some(asset => asset.id === selectedAssetId)) {
      setSelectedAssetId(assetsForCategory[0].id);
    }
  }, [gameState, marketCategory]);

  // Calculate portfolio value and net worth (must be before early returns but after gameState check)
  const portfolioValue = gameState ? gameState.stocks.reduce((sum, stock) => 
    sum + (stock.owned * stock.price), 0
  ) : 0;
  
  const totalNetWorth = gameState ? portfolioValue + gameState.cash : 0;
  const responsibilityLevelInfo = gameState ? getResponsibilityLevelInfo(gameState.responsibilityPoints || 0) : RESPONSIBILITY_LEVELS[0];
  const dailyCompletionPercent = gameState ? calculateDailyCompletion(gameState.dailyTasks) : 0;
  const readinessReport = gameState ? buildReadinessReport(gameState) : null;
  const responsibilityProgress = gameState && responsibilityLevelInfo.nextLevelPoints
    ? (gameState.responsibilityPoints - responsibilityLevelInfo.minPoints) /
      (responsibilityLevelInfo.nextLevelPoints - responsibilityLevelInfo.minPoints)
    : 1;
  const summaryReport = summarySnapshot ? buildReadinessReport(summarySnapshot) : null;

  // Show welcome screen if game hasn't started
  if (!gameStarted || !gameState) {
    return <WelcomeScreen onStart={handleGameStart} />;
  }

  // Show game over screen if game has ended
  if (gameOver) {
    const finalStats = {
      days: gameState.day,
      finalMoney: gameState.cash,
      portfolioValue: portfolioValue,
      totalNetWorth: totalNetWorth,
      totalSpent: gameState.totalSpent,
      evolution: gameState.pet.evolution,
      avgHealth: gameState.history.length > 0 
        ? (gameState.history.reduce((sum, h) => sum + h.health, 0) / gameState.history.length).toFixed(1)
        : gameState.pet.health,
      ethicsScore: gameState.ethicsScore,
      petName: gameState.pet.name,
      petBreed: PET_BREEDS[gameState.pet.breed]?.name || 'Pet'
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-red-950 to-slate-950 text-white flex items-center justify-center p-8">
        <div className="max-w-3xl w-full">
          <div className="bg-black/60 backdrop-blur-xl border-2 border-red-500/50 rounded-2xl p-12 shadow-2xl shadow-red-500/20">
            {/* Game Over Title */}
            <div className="text-center mb-8">
              <h1 className="text-6xl font-bold mb-4 text-red-400 animate-pulse">
                GAME OVER
              </h1>
              <div className="text-3xl mb-2">💔</div>
              <p className="text-xl text-red-300">
                {gameOverReason === 'health' && `${finalStats.petName}'s health reached zero`}
                {gameOverReason === 'hunger' && `${finalStats.petName} starved to death`}
              </p>
            </div>

            {/* Final Statistics */}
            <div className="bg-slate-900/50 rounded-xl p-6 mb-8 border border-red-500/30">
              <h2 className="text-2xl font-bold text-cyan-300 mb-4 text-center">Final Statistics</h2>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-black/40 rounded-lg p-4">
                  <div className="text-sm text-slate-400">Days Survived</div>
                  <div className="text-3xl font-bold text-cyan-400">{finalStats.days}</div>
                </div>
                <div className="bg-black/40 rounded-lg p-4">
                  <div className="text-sm text-slate-400">Evolution</div>
                  <div className="text-3xl font-bold text-purple-400">{finalStats.evolution}</div>
                </div>
                <div className="bg-black/40 rounded-lg p-4">
                  <div className="text-sm text-slate-400">Final Net Worth</div>
                  <div className="text-3xl font-bold text-green-400">${finalStats.totalNetWorth.toFixed(0)}</div>
                </div>
                <div className="bg-black/40 rounded-lg p-4">
                  <div className="text-sm text-slate-400">Total Spent on Care</div>
                  <div className="text-3xl font-bold text-red-400">${finalStats.totalSpent.toFixed(0)}</div>
                </div>
                <div className="bg-black/40 rounded-lg p-4">
                  <div className="text-sm text-slate-400">Average Health</div>
                  <div className="text-3xl font-bold text-red-400">{finalStats.avgHealth}</div>
                </div>
                <div className="bg-black/40 rounded-lg p-4">
                  <div className="text-sm text-slate-400">Ethics Score</div>
                  <div className="text-3xl font-bold text-green-400">{finalStats.ethicsScore}/100</div>
                </div>
              </div>

              {/* Performance Summary */}
              <div className="text-center text-sm text-slate-300">
                <p className="mb-2">You managed your {finalStats.petBreed} for <span className="font-bold text-cyan-300">{finalStats.days} days</span></p>
                <p>Your portfolio reached <span className="font-bold text-green-300">${finalStats.portfolioValue.toFixed(0)}</span></p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={() => {
                  setGameOver(false);
                  setGameStarted(false);
                  setGameState(null);
                  setActionLog([]);
                  setShowFinalSummary(false);
                  setSummarySnapshot(null);
                }}
                className="flex-1 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold py-4 px-8 rounded-xl shadow-lg transition-all transform hover:scale-105"
              >
                🔄 Start New Game
              </button>
              <button
                onClick={saveTimeline}
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold py-4 px-8 rounded-xl shadow-lg transition-all transform hover:scale-105"
              >
                💾 Save Timeline
              </button>
            </div>

            <div className="text-center mt-6 text-xs text-slate-500">
              Every choice matters. Try again and see if you can do better!
            </div>
          </div>
        </div>
      </div>
    );
  }

  /**
   * Executes a single market "tick" without advancing the day.
   * This creates real-time price motion for active play and demo pacing.
   */
  const marketTick = () => {
    setGameState(prevState => {
      let newState = { ...prevState };
      let newPet = { ...newState.pet };
      
      // Update stock prices with pet emotion influence
      newState.tickCounter = (newState.tickCounter || 0) + 1;
      newState.tickInDay = (newState.tickInDay || 0) + 1;
      
      newState.stocks = updateStockPricesWithPetEmotion(
        newState.stocks, 
        newState.market, 
        newPet, 
        newState.day,
        newState.tickCounter,
        newState.tickInDay
      );
      
      return newState;
    });
    
    addLog("📊 Market tick update", "market");
  };

  // ============================================================================
  // TRADING ACTIONS
  // ============================================================================

  /**
   * Buys shares of a selected stock if the player has enough cash.
   * This updates cash, holdings, transactions, and ethics score.
   *
   * @param {Object} stockParam - Stock object from UI selection
   */
  const buyStock = (stockParam) => {
    // Get the current stock data from gameState
    const currentStock = gameState.stocks.find(s => s.id === stockParam.id);
    
    if (!currentStock) {
      addLog(`Stock ${stockParam.id} not found`, "error");
      return;
    }
    
    const cost = currentStock.price * tradeAmount;
    if (gameState.cash < cost) {
      addLog(`Insufficient funds to buy ${tradeAmount} ${currentStock.id}. Need: $${cost.toFixed(2)}`, "error");
      return;
    }

    let newState = { ...gameState };
    newState.cash -= cost;
    newState.stocks = newState.stocks.map(s => 
      s.id === currentStock.id ? { ...s, owned: s.owned + tradeAmount } : s
    );
    
    newState.transactions.push({
      day: newState.day,
      type: 'BUY',
      stock: currentStock.id,
      amount: tradeAmount,
      price: currentStock.price,
      total: cost
    });
    
    // Ethical score impact
    if (currentStock.ethicalRating > 70) {
      newState.ethicsScore = Math.min(100, newState.ethicsScore + 3);
    } else if (currentStock.ethicalRating < 40) {
      newState.ethicsScore = Math.max(0, newState.ethicsScore - 2);
    }
    
    setGameState(newState);
    addLog(`Bought ${tradeAmount} ${currentStock.name} @ $${currentStock.price.toFixed(2)}`, "trade");
  };

  /**
   * Sells shares of a selected stock if owned.
   * This updates cash, holdings, and transactions for portfolio tracking.
   *
   * @param {Object} stockParam - Stock object from UI selection
   */
  const sellStock = (stockParam) => {
    // Get the current stock data from gameState to ensure we have latest owned count
    const currentStock = gameState.stocks.find(s => s.id === stockParam.id);
    
    if (!currentStock) {
      addLog(`Stock ${stockParam.id} not found`, "error");
      return;
    }
    
    if (currentStock.owned < tradeAmount) {
      addLog(`Insufficient shares to sell ${tradeAmount} ${stockParam.id}. You own: ${currentStock.owned}`, "error");
      return;
    }

    let newState = { ...gameState };
    const proceeds = currentStock.price * tradeAmount;
    newState.cash += proceeds;
    newState.stocks = newState.stocks.map(s => 
      s.id === currentStock.id ? { ...s, owned: s.owned - tradeAmount } : s
    );
    
    newState.transactions.push({
      day: newState.day,
      type: 'SELL',
      stock: currentStock.id,
      amount: tradeAmount,
      price: currentStock.price,
      total: proceeds
    });
    
    setGameState(newState);
    addLog(`Sold ${tradeAmount} ${currentStock.name} @ $${currentStock.price.toFixed(2)}`, "trade");
  };

  // ============================================================================
  // PET CARE ACTIONS
  // ============================================================================
  // These actions are the player's main way to improve pet stats and
  // indirectly influence the market through pet mood.

  /**
   * Performs a care action and applies stat changes + costs.
   * Effects are tuned to encourage tradeoffs between cost and wellbeing.
   *
   * @param {string} action - High-level action category (feed, vet, play)
   * @param {string} item - Specific item choice (food_cheap, vet_checkup, etc.)
   */
  const performCare = (action, item) => {
    const taskId = getDailyTaskIdForItem(item);
    if (taskId) {
      const remainingMs = getDailyTaskCooldownRemainingMs(gameState, taskId);
      if (remainingMs > 0) {
        const label = getDailyTaskConfig(taskId)?.label || taskId;
        addLog(`⏳ ${label} needs a short break. Try again in ${Math.ceil(remainingMs / 1000)}s.`, "error");
        return;
      }
    }

    const cost = calculateCareCost(item, gameState.stocks, gameState.pet, gameState.cash, gameState.insurance);
    
    if (gameState.cash < cost) {
      addLog("Insufficient cash for this action!", "error");
      return;
    }

    let newState = { ...gameState };
    let newPet = { ...newState.pet };
    const overuseCount = taskId ? getDailyTaskOveruseCount(newState, taskId) : 0;
    
    // Calculate portfolio value locally
    const currentPortfolioValue = newState.stocks.reduce((sum, stock) => 
      sum + (stock.owned * stock.price), 0
    );
    const currentNetWorth = currentPortfolioValue + newState.cash;
    
    // Apply care effects (balance: cheap = negative tradeoffs, premium = positive).
    switch(item) {
      case "food_cheap":
        newState.cash -= cost;
        newState.totalSpent += cost;
        newPet.health = Math.max(0, newPet.health - 3);     // Low quality food harms health
        newPet.stress += 8;                                 // Stress rises due to poor care
        newPet.happiness = Math.max(0, newPet.happiness - 5); // Pet is less happy
        newPet.hunger = Math.max(0, newPet.hunger - 20);    // Still reduces hunger somewhat
        newState.ethicsScore -= 3;                          // Ethical penalty for cheap care
        recordDailyTask(newState, "feed");
        break;
      case "food_regular":
        newState.cash -= cost;
        newState.totalSpent += cost;
        newPet.health = Math.min(100, newPet.health + 2);   // Modest health gain
        newPet.happiness = Math.min(100, newPet.happiness + 5); // Small happiness boost
        newPet.hunger = Math.max(0, newPet.hunger - 40);    // Solid hunger reduction
        recordDailyTask(newState, "feed");
        break;
      case "food_premium":
        newState.cash -= cost;
        newState.totalSpent += cost;
        newPet.health = Math.min(100, newPet.health + 8);   // Strong health boost rewards investment
        newPet.stress = Math.max(0, newPet.stress - 10);    // Premium care calms the pet
        newPet.happiness = Math.min(100, newPet.happiness + 15); // Big happiness spike
        newPet.hunger = Math.max(0, newPet.hunger - 60);    // Significant hunger relief
        newState.ethicsScore += 5;                          // Ethical reward for premium care
        recordDailyTask(newState, "feed");
        break;
      case "vet_checkup":
        newState.cash -= cost;
        newState.totalSpent += cost;
        newPet.health = Math.min(100, newPet.health + 30);  // Large boost to encourage vet visits
        newPet.stress = Math.max(0, newPet.stress - 15);    // Vet care reduces anxiety
        newPet.trust = Math.min(100, newPet.trust + 3);     // Trust rises slowly over time
        newState.ethicsScore += 8;                          // Vet care is ethically positive
        
        // Try to cure sickness if present
        if (newPet.sickness) {
          const sickness = SICKNESS_TYPES[newPet.sickness.type];
          const insurancePlan = newState.insurance?.active ? INSURANCE_PLANS[newState.insurance.plan] : null;
          const cureCost = insurancePlan
            ? Math.floor(sickness.cureCost * (1 - insurancePlan.cureDiscount))
            : sickness.cureCost;
          
          if (newState.cash >= cureCost) {
            // Ask if they want to pay for cure attempt
            if (window.confirm(`Attempt to cure ${sickness.name}? Cost: $${cureCost} (${(sickness.cureChance * 100).toFixed(0)}% success rate)`)) {
              newState.cash -= cureCost;
              newState.totalSpent += cureCost;
              
              const cureSuccess = Math.random() < sickness.cureChance;
              if (cureSuccess) {
                newPet.sickness = null;
                addLog(`✅ Successfully cured ${sickness.name}!`, "pet");
              } else {
                addLog(`❌ Treatment failed. ${sickness.name} persists.`, "emergency");
              }
            }
          } else {
            addLog(`⚠️ Not enough cash for cure attempt ($${cureCost} needed)`, "error");
          }
        }
        break;
      case "bathroom":
        newState.cash -= cost;
        newState.totalSpent += cost;
        newPet.stress = Math.max(0, newPet.stress - 6);
        newPet.happiness = Math.min(100, newPet.happiness + 2);
        recordDailyTask(newState, "bathroom");
        break;
      case "walk":
        newState.cash -= cost;
        newState.totalSpent += cost;
        newPet.health = Math.min(100, newPet.health + 2);
        newPet.happiness = Math.min(100, newPet.happiness + 6);
        newPet.energy = Math.max(0, newPet.energy - 8);
        newPet.stress = Math.max(0, newPet.stress - 6);
        newPet.hunger = Math.min(100, newPet.hunger + 5);
        recordDailyTask(newState, "walk");
        break;
      case "play":
        // Launch random minigame
        const minigames = ['catch', 'memory', 'reaction'];
        const randomGame = minigames[Math.floor(Math.random() * minigames.length)];
        setCurrentMinigame(randomGame);
        setShowMinigame(true);
        return; // Don't apply effects yet
    }

    if (taskId && overuseCount > 0) {
      const penalty = DAY_TASK_OVERUSE_PENALTIES[taskId] || DEFAULT_DAY_OVERUSE_PENALTY;
      applyStatDelta(newPet, scaleStatDelta(penalty, overuseCount));
      const label = getDailyTaskConfig(taskId)?.label || taskId;
      addLog(`⚠️ Overdoing ${label.toLowerCase()} is wearing ${newPet.name} out.`, "care");
    }

    const financialStability = currentNetWorth / STARTING_CASH;
    newPet.memory = updatePetMemory(newPet, action, 70, financialStability);
    
    newState.pet = newPet;
    setGameState(newState);
    addLog(`${action} completed. Cost: $${cost}`, "care");
  };

  const completeMinigame = (success) => {
    setShowMinigame(false);
    setCurrentMinigame(null);
    
    let newState = { ...gameState };
    let newPet = { ...newState.pet };
    const cost = calculateCareCost('play', newState.stocks, newPet, newState.cash, newState.insurance);
    
    // Calculate portfolio value locally
    const currentPortfolioValue = newState.stocks.reduce((sum, stock) => 
      sum + (stock.owned * stock.price), 0
    );
    const currentNetWorth = currentPortfolioValue + newState.cash;
    
    newState.cash -= cost;
    newState.totalSpent += cost;
    
    if (success) {
      newState.minigamesWon = (newState.minigamesWon || 0) + 1; // Track wins
      newPet.stress = Math.max(0, newPet.stress - 25);
      newPet.happiness = Math.min(100, newPet.happiness + 25);
      newPet.energy = Math.max(0, newPet.energy - 10);
      newPet.trust = Math.min(100, newPet.trust + 2);
      newPet.hunger = Math.min(100, newPet.hunger + 10);
      addLog("🎉 Great play session! Your pet loved it!", "pet");
    } else {
      newPet.stress = Math.max(0, newPet.stress - 10);
      newPet.happiness = Math.min(100, newPet.happiness + 10);
      newPet.energy = Math.max(0, newPet.energy - 10);
      newPet.trust = Math.min(100, newPet.trust + 1);
      newPet.hunger = Math.min(100, newPet.hunger + 10);
      addLog("Play time was okay, pet seems distracted", "care");
    }

    const activityOveruse = getDailyTaskOveruseCount(newState, "activity");
    if (activityOveruse > 0) {
      const penalty = DAY_TASK_OVERUSE_PENALTIES.activity || DEFAULT_DAY_OVERUSE_PENALTY;
      applyStatDelta(newPet, scaleStatDelta(penalty, activityOveruse));
      addLog(`⚠️ Too much activity is wearing ${newPet.name} out.`, "care");
    }

    recordDailyTask(newState, "activity");
    
    const financialStability = currentNetWorth / STARTING_CASH;
    newPet.memory = updatePetMemory(newPet, 'play', success ? 90 : 60, financialStability);
    
    newState.pet = newPet;
    setGameState(newState);
  };

  const startRest = () => {
    if (isResting) return;
    
    setIsResting(true);
    if (autoTick) {
      setRestTicksRemaining(3); // 3 ticks
      addLog("🛌 Pet is resting for 3 market ticks...", "system");
    } else {
      // If no auto-tick, rest for 1 day when next day is clicked
      addLog("🛌 Pet will rest until next day", "system");
    }
    
    // Apply rest benefits
    let newState = { ...gameState };
    let newPet = { ...newState.pet };
    newPet.energy = Math.min(100, newPet.energy + 40);
    newPet.stress = Math.max(0, newPet.stress - 15);
    newState.pet = newPet;
    setGameState(newState);
  };

  const buyRoomItem = (itemKey) => {
    const item = ROOM_ITEMS[itemKey];
    
    if (gameState.pet.roomItems.includes(itemKey)) {
      addLog(`You already own ${item.name}!`, "error");
      return;
    }
    
    if (gameState.cash < item.cost) {
      addLog(`Not enough cash for ${item.name}! Need $${item.cost}`, "error");
      return;
    }
    
    let newState = { ...gameState };
    newState.cash -= item.cost;
    newState.pet.roomItems.push(itemKey);
    
    setGameState(newState);
    addLog(`${item.emoji} Bought ${item.name} for $${item.cost}!`, "pet");
  };

  const trainSkill = (skillKey) => {
    const skill = COACHING_SKILLS[skillKey];
    const currentLevel = gameState.pet.skills[skillKey];
    
    if (currentLevel >= skill.maxLevel) {
      addLog(`${skill.name} is already at max level!`, "error");
      return;
    }
    
    const cost = skill.costPerLevel * (currentLevel + 1);
    
    if (gameState.cash < cost) {
      addLog(`Not enough cash for training! Need $${cost}`, "error");
      return;
    }
    
    let newState = { ...gameState };
    newState.cash -= cost;
    newState.pet.skills[skillKey]++;
    
    setGameState(newState);
    addLog(`${skill.emoji} Trained ${skill.name} to Level ${newState.pet.skills[skillKey]}!`, "pet");
  };

  const acceptRequest = () => {
    const request = gameState.pet.currentRequest;
    if (!request) return;
    
    // Handle minigame requests
    if (request.requiresMinigame) {
      setShowMinigame(true);
      const minigames = ['catch', 'memory', 'reaction'];
      setCurrentMinigame(minigames[Math.floor(Math.random() * minigames.length)]);
      
      let newState = { ...gameState };
      newState.pet.currentRequest = null;
      setGameState(newState);
      return;
    }
    
    // Handle time-based requests
    if (request.requiresTime) {
      let newState = { ...gameState };
      let newPet = { ...newState.pet };
      
      Object.entries(request.effect).forEach(([stat, value]) => {
        if (stat === 'happiness') newPet.happiness = Math.min(100, newPet.happiness + value);
        if (stat === 'trust') newPet.trust = Math.min(100, newPet.trust + value);
        if (stat === 'stress') newPet.stress = Math.max(0, newPet.stress + value);
        if (stat === 'health') newPet.health = Math.min(100, newPet.health + value);
        if (stat === 'energy') newPet.energy = Math.min(100, newPet.energy + value);
      });
      
      newPet.currentRequest = null;
      newState.pet = newPet;
      setGameState(newState);
      addLog(`💕 You spent quality time with ${newPet.name}!`, "pet");
      return;
    }
    
    // Handle cost-based requests
    if (gameState.cash < request.cost) {
      addLog(`Not enough cash for this request! Need $${request.cost}`, "error");
      return;
    }
    
    let newState = { ...gameState };
    let newPet = { ...newState.pet };
    newState.cash -= request.cost;
    
    Object.entries(request.effect).forEach(([stat, value]) => {
      if (stat === 'happiness') newPet.happiness = Math.min(100, newPet.happiness + value);
      if (stat === 'trust') newPet.trust = Math.min(100, newPet.trust + value);
      if (stat === 'stress') newPet.stress = Math.max(0, newPet.stress + value);
      if (stat === 'health') newPet.health = Math.min(100, newPet.health + value);
      if (stat === 'energy') newPet.energy = Math.min(100, newPet.energy + value);
      if (stat === 'hunger') newPet.hunger = Math.max(0, newPet.hunger + value);
    });
    
    newPet.currentRequest = null;
    newState.pet = newPet;
    setGameState(newState);
    addLog(`${request.emoji} Request fulfilled! ${newPet.name} is happy!`, "pet");
  };

  const declineRequest = () => {
    const request = gameState.pet.currentRequest;
    if (!request) return;
    
    let newState = { ...gameState };
    let newPet = { ...newState.pet };
    
    Object.entries(request.declineEffect).forEach(([stat, value]) => {
      if (stat === 'happiness') newPet.happiness = Math.max(0, newPet.happiness + value);
      if (stat === 'trust') newPet.trust = Math.max(0, newPet.trust + value);
      if (stat === 'stress') newPet.stress = Math.min(100, newPet.stress + value);
    });
    
    newPet.currentRequest = null;
    newState.pet = newPet;
    setGameState(newState);
    addLog(`❌ Request declined. ${newPet.name} looks disappointed...`, "pet");
  };

  const handleWheelSpin = (event) => {
    let newState = { ...gameState };
    let newPet = { ...newState.pet };
    
    switch(event.effect) {
      case 'cash':
        newState.cash += event.value;
        break;
      case 'market_boost':
        newState.stocks = newState.stocks.map(stock => ({
          ...stock,
          price: stock.price * (1 + event.value)
        }));
        break;
      case 'market_crash':
        newState.stocks = newState.stocks.map(stock => ({
          ...stock,
          price: stock.price * (1 + event.value)
        }));
        break;
      case 'volatility':
        newState.market.volatilityIndex *= event.value;
        break;
      case 'trust':
        newPet.trust = Math.min(100, newPet.trust + event.value);
        break;
      case 'stress':
        newPet.stress = Math.min(100, newPet.stress + event.value);
        break;
      case 'free_vet':
        newPet.health = Math.min(100, newPet.health + 30);
        if (newPet.sickness) newPet.sickness = null;
        break;
      case 'dividend':
        const dividend = newState.stocks.reduce((sum, stock) => 
          sum + (stock.owned * stock.price * event.value), 0
        );
        newState.cash += dividend;
        addLog(`💰 Dividend received: $${dividend.toFixed(0)}`, "market");
        break;
    }
    
    newState.pet = newPet;
    setGameState(newState);
    setShowWheel(false);
    setWheelResult(event);
    setHasSpunThisWeek(true);
    
    addLog(event.message, event.color === 'green' ? 'pet' : event.color === 'red' ? 'emergency' : 'system');
  };

  // ============================================================================
  // NEXT DAY - MARKET & PET UPDATE
  // ============================================================================
  // This is the primary daily progression loop: prices move, events trigger,
  // pet stats decay, and new consequences are applied.

  /**
   * Advances the game by one in-game day.
   * This bundles market updates, pet decisions, sickness checks, and history logs.
   * It is the core "turn" in the simulation.
   */
  const nextDay = () => {
    let newState = { ...gameState };
    let newPet = { ...newState.pet };
    let newMarket = { ...newState.market };
    
    // Update stock prices
    newState.tickCounter = (newState.tickCounter || 0) + 1;
    newState.tickInDay = (newState.tickInDay || 0) + 1;
    newState.stocks = updateStockPrices(
      newState.stocks,
      newMarket,
      newPet,
      newState.day,
      newState.tickCounter,
      newState.tickInDay
    );
    
    // Record price history (no longer needed since it's in stock objects now)
    // Remove old priceHistory tracking
    
    // Generate market events (rare, high-impact spikes).
    const marketEvent = generateMarketEvent(newState.day, newMarket, newPet);
    if (marketEvent) {
      newMarket.trend = marketEvent.effect.trend;
      newMarket.volatilityIndex = marketEvent.effect.volatility;
      newMarket.daysSinceEvent = 0;
      newMarket.newsEvents.push(marketEvent);
      addLog(marketEvent.message, "market");
      
      if (marketEvent.type === 'crash') {
        newPet.memory.marketCrashes++;
      } else if (marketEvent.type === 'boom') {
        newPet.memory.marketBooms++;
      }
    } else {
      newMarket.daysSinceEvent++;
      // Gradual return to normal keeps volatility from staying extreme.
      newMarket.volatilityIndex = newMarket.volatilityIndex * 0.95 + 1.0 * 0.05;
    }
    
    // Calculate current portfolio value
    const currentPortfolio = newState.stocks.reduce((sum, stock) => 
      sum + (stock.owned * stock.price), 0
    );
    
    // Pet autonomous decisions based on financial state.
    const { decisions, newFinancialAwareness } = petDecisionEngine(
      newPet, 
      currentPortfolio, 
      newState.cash, 
      newState.stocks
    );
    
    newPet.financialAwareness = newFinancialAwareness;
    
    decisions.forEach(decision => {
      if (decision.stressIncrease) newPet.stress = Math.min(100, newPet.stress + decision.stressIncrease);
      if (decision.stressDecrease) newPet.stress = Math.max(0, newPet.stress - decision.stressDecrease);
      if (decision.healthDecrease) newPet.health = Math.max(0, newPet.health - decision.healthDecrease);
      if (decision.trustIncrease) newPet.trust = Math.min(100, newPet.trust + decision.trustIncrease);
      if (decision.happinessIncrease) newPet.happiness = Math.min(100, newPet.happiness + decision.happinessIncrease);
      if (decision.energyDecrease) newPet.energy = Math.max(0, newPet.energy - decision.energyDecrease);
      
      addLog(`🐾 ${decision.impact}`, "pet");
    });
    
    // Daily pet decay models basic needs; values tuned for ~daily care actions.
    newPet.health = Math.max(0, newPet.health - 2);     // Small health drift
    newPet.energy = Math.max(0, newPet.energy - 5);     // Energy drops faster to encourage rest
    newPet.happiness = Math.max(0, newPet.happiness - 3); // Mood naturally declines without attention
    newPet.hunger = Math.min(100, newPet.hunger + 15);  // Hunger rises quickly to prompt feeding
    
    // Sickness progression
    if (newPet.sickness) {
      const sickness = SICKNESS_TYPES[newPet.sickness.type];
      newPet.health = Math.max(0, newPet.health - sickness.healthDrain * newPet.sickness.severity);
      newPet.stress = Math.min(100, newPet.stress + sickness.stressIncrease);
      newPet.sickness.daysSick++;
      
      if (newPet.sickness.daysSick % 3 === 0) {
        addLog(`⚠️ ${sickness.name} worsening: ${sickness.symptoms}`, "emergency");
      }
    }
    
    // Random sickness chance: 5% per day -> ~1 illness per 20 days on average.
    if (!newPet.sickness && Math.random() < 0.05) {
      newPet.sickness = generateSickness();
      const sickness = SICKNESS_TYPES[newPet.sickness.type];
      addLog(`🦠 ${newPet.name} got sick: ${sickness.name}!`, "emergency");
    }
    
    // Stress increases if financial instability (negative feedback loop).
    const financialStability = (currentPortfolio + newState.cash) / STARTING_CASH;
    if (financialStability < 0.5) {
      newPet.stress = Math.min(100, newPet.stress + 10); // 10 is enough to be felt quickly
    }
    
    // Weekly Wheel of Fortune (every 7 days) adds pacing and surprise.
    if (newState.day % 7 === 0 && !hasSpunThisWeek) {
      setShowWheel(true);
      addLog("🎡 WEEKLY EVENT: Wheel of Fortune is ready to spin!", "system");
    } else if (newState.day % 7 !== 0) {
      setHasSpunThisWeek(false);
    }
    
    // Critical health emergency
    if (newPet.health < 30 && Math.random() < 0.3) {
      newState.events.push({
        day: newState.day,
        type: "emergency",
        message: "⚠️ Health Emergency! Immediate care needed!"
      });
      addLog("⚠️ EMERGENCY: Critical health situation!", "emergency");
    }
    
    // ========================================================================
    // NEW FEATURES: Room Items, Training, Requests, Visual Growth, Badges
    // ========================================================================
    
    // Apply room item passive effects
    if (newPet.roomItems && newPet.roomItems.length > 0) {
      newPet.roomItems.forEach(itemKey => {
        const item = ROOM_ITEMS[itemKey];
        if (!item) return;
        
        if (item.effect.happinessPerDay) {
          newPet.happiness = Math.min(100, newPet.happiness + item.effect.happinessPerDay);
        }
        if (item.effect.stressPerDay) {
          newPet.stress = Math.max(0, newPet.stress + item.effect.stressPerDay);
        }
        if (item.effect.trustPerDay) {
          newPet.trust = Math.min(100, newPet.trust + item.effect.trustPerDay);
        }
        if (item.effect.financialAwarenessBonus) {
          newPet.financialAwareness = Math.min(100, newPet.financialAwareness + (item.effect.financialAwarenessBonus / 7));
        }
      });
    }
    
    // Apply training skill effects
    if (newPet.skills) {
      // Stress Management reduces stress
      if (newPet.skills.stressManagement > 0) {
        const skill = COACHING_SKILLS.stressManagement;
        const reduction = skill.effects[newPet.skills.stressManagement]?.stressReduction || 0;
        newPet.stress = Math.max(0, newPet.stress * (1 - reduction));
      }
      
      // Luck increases chance of positive events
      if (newPet.skills.luck > 0 && Math.random() < 0.1) {
        const skill = COACHING_SKILLS.luck;
        const luckyChance = skill.effects[newPet.skills.luck]?.luckyEventChance || 0;
        
        if (Math.random() < luckyChance) {
          const luckyAmount = 50 + Math.floor(Math.random() * 100);
          newState.cash += luckyAmount;
          addLog(`🍀 Lucky event! Found $${luckyAmount}!`, "pet");
        }
      }
    }
    
    // Apply personality effects to stress
    if (newPet.personality && PET_PERSONALITIES[newPet.personality]) {
      const personality = PET_PERSONALITIES[newPet.personality];
      
      // Personality stress multipliers
      const baseStressGain = 3; // Daily base stress
      const personalityStress = baseStressGain * personality.stressMultiplier;
      newPet.stress = Math.min(100, newPet.stress + (personalityStress - baseStressGain));
      
      // Check portfolio volatility and apply personality bonuses/penalties
      const avgVolatility = newState.stocks.reduce((sum, s) => sum + s.volatility, 0) / newState.stocks.length;
      
      if (personality.traits) {
        // Cautious pet dislikes high volatility
        if (personality.traits.highVolatilityPenalty && avgVolatility > 0.15) {
          newPet.happiness = Math.max(0, newPet.happiness + personality.traits.highVolatilityPenalty);
        }
        if (personality.traits.lowVolatilityBonus && avgVolatility < 0.10) {
          newPet.happiness = Math.min(100, newPet.happiness + personality.traits.lowVolatilityBonus);
        }
        
        // Adventurous pet loves high volatility
        if (personality.traits.highVolatilityBonus && avgVolatility > 0.15) {
          newPet.happiness = Math.min(100, newPet.happiness + personality.traits.highVolatilityBonus);
        }
        if (personality.traits.lowVolatilityPenalty && avgVolatility < 0.10) {
          newPet.happiness = Math.max(0, newPet.happiness + personality.traits.lowVolatilityPenalty);
        }
        
        // Ethical pet cares about ethics score
        if (personality.traits.ethicalStockBonus && newState.ethicsScore > 70) {
          newPet.happiness = Math.min(100, newPet.happiness + personality.traits.ethicalStockBonus);
        }
        if (personality.traits.unethicalStockPenalty && newState.ethicsScore < 40) {
          newPet.happiness = Math.max(0, newPet.happiness + personality.traits.unethicalStockPenalty);
        }
        
        // Greedy pet cares about profit/loss
        if (personality.traits.profitBonus || personality.traits.lossPenalty) {
          const portfolioChange = currentPortfolio - (newPet.memory.lastPortfolioValue || currentPortfolio);
          if (portfolioChange > 0 && personality.traits.profitBonus) {
            newPet.happiness = Math.min(100, newPet.happiness + personality.traits.profitBonus);
          }
          if (portfolioChange < 0 && personality.traits.lossPenalty) {
            newPet.happiness = Math.max(0, newPet.happiness + personality.traits.lossPenalty);
          }
        }
      }
      
      newPet.memory.lastPortfolioValue = currentPortfolio;
    }
    
    // Generate pet requests (every 3-5 days)
    if (newPet.requestCooldown !== undefined) {
      if (newPet.requestCooldown <= 0 && Math.random() < 0.3 && !newPet.currentRequest) {
        const randomRequest = PET_REQUESTS[Math.floor(Math.random() * PET_REQUESTS.length)];
        newPet.currentRequest = randomRequest;
        newPet.requestCooldown = 3 + Math.floor(Math.random() * 3);
        addLog(`🐾 ${newPet.name} ${randomRequest.emoji} ${randomRequest.message}`, "pet");
      } else {
        newPet.requestCooldown = Math.max(0, newPet.requestCooldown - 1);
      }
    }
    
    // Visual growth based on care quality
    if (newPet.memory.careQualityTrend && newPet.memory.careQualityTrend.length > 0) {
      const recentCare = newPet.memory.careQualityTrend.slice(-7);
      const avgCareQuality = recentCare.reduce((a, b) => a + b, 0) / recentCare.length;
      
      if (avgCareQuality > 80) {
        newPet.size = Math.min(1.5, (newPet.size || 1.0) + 0.01); // Grow slowly
      } else if (avgCareQuality < 50) {
        newPet.size = Math.max(0.5, (newPet.size || 1.0) - 0.01); // Shrink slowly
      }
    }

    // Daily routine evaluation (responsibility score driver).
    if (newState.dailyTasks) {
      const dailyCompletion = calculateDailyCompletion(newState.dailyTasks);
      newState.dailyCompletionHistory = [...(newState.dailyCompletionHistory || []), dailyCompletion];

      DAY_TASKS.forEach(task => {
        const done = newState.dailyTasks[task.id] || 0;
        if (done >= task.target) {
          applyStatDelta(newPet, task.completionBonus);
        } else {
          applyStatDelta(newPet, task.missedPenalty);
        }
      });

      if (dailyCompletion >= 0.9) {
        newState.dailyCareStreak = (newState.dailyCareStreak || 0) + 1;
        newState.responsibilityPoints += 8;
        applyStatDelta(newPet, { trust: 2, happiness: 2, stress: -2 });
        addLog("✅ Daily routine completed!", "pet");
      } else {
        newState.dailyCareStreak = 0;
      if (dailyCompletion < 0.5) {
        newState.responsibilityPoints = Math.max(0, (newState.responsibilityPoints || 0) - 4);
        applyStatDelta(newPet, { stress: 4, happiness: -3 });
        addLog("⚠️ Daily routine incomplete. Your pet feels the inconsistency.", "care");
      }
    }

    newState.dailyTasks = createDailyTasksState();
    newState.dailyTaskCooldowns = createDailyTaskCooldowns();
  }

    // Daily insurance premium (teaches recurring budgeting).
    if (newState.insurance?.active) {
      const plan = INSURANCE_PLANS[newState.insurance.plan];
      if (newState.cash >= plan.premium) {
        newState.cash -= plan.premium;
        newState.totalSpent += plan.premium;
        newState.insurance.daysCovered = (newState.insurance.daysCovered || 0) + 1;
      } else {
        newState.insurance.active = false;
        newState.insurance.missedPayments = (newState.insurance.missedPayments || 0) + 1;
        addLog("🛑 Insurance lapsed due to low cash", "emergency");
      }
    }

    // Check badges
    if (BADGES && newState.badges) {
      BADGES.forEach(badge => {
        if (!newState.badges.includes(badge.id)) {
          try {
            if (badge.checkCondition(newState)) {
              newState.badges.push(badge.id);
              addLog(`🏅 Badge Earned: ${badge.emoji} ${badge.name}!`, "pet");
              
              // Apply rewards
              if (badge.reward.cash) {
                newState.cash += badge.reward.cash;
                addLog(`💰 Reward: $${badge.reward.cash}`, "system");
              }
              if (badge.reward.item && !newPet.roomItems.includes(badge.reward.item)) {
                newPet.roomItems.push(badge.reward.item);
                const item = ROOM_ITEMS[badge.reward.item];
                if (item) {
                  addLog(`🎁 Reward: ${item.emoji} ${item.name}`, "system");
                }
              }
            }
          } catch (error) {
            // Silently fail if badge check errors
          }
        }
      });
    }
    
    // ========================================================================
    // END NEW FEATURES
    // ========================================================================
    
    // Update evolution
    newPet.evolution = determineEvolution(
      newPet, 
      currentPortfolio, 
      newState.cash, 
      newState.stocks, 
      newState.ethicsScore, 
      newState.day
    );
    
    // Record history
    newState.history.push({
      day: newState.day,
      health: newPet.health,
      trust: newPet.trust,
      stress: newPet.stress,
      happiness: newPet.happiness,
      cash: newState.cash,
      portfolioValue: currentPortfolio,
      netWorth: currentPortfolio + newState.cash,
      ethics: newState.ethicsScore,
      financialAwareness: newPet.financialAwareness
    });
    
    const programCheckpointReached = !newState.summaryShown && newState.day >= newState.gameLength;

    newState.day++;
    newState.tickInDay = 0;
    newState.pet = newPet;
    newState.market = newMarket;
    newState.portfolioValue = currentPortfolio;
    newState.totalNetWorth = currentPortfolio + newState.cash;

    if (programCheckpointReached) {
      newState.summaryShown = true;
      setSummarySnapshot({ ...newState, summaryDay: newState.day - 1 });
      setShowFinalSummary(true);
      addLog("📋 Program checkpoint reached! Review the life summary.", "system");
    }
    
    setGameState(newState);
    addLog(`=== Day ${newState.day} ===`, "day");
  };

  const loadTimeline = (timeline) => {
    const snapshot = { ...timeline.snapshot };
    snapshot.dailyTasks = snapshot.dailyTasks || createDailyTasksState();
    snapshot.dailyTaskCooldowns = snapshot.dailyTaskCooldowns || createDailyTaskCooldowns();
    snapshot.dailyTaskTotals = snapshot.dailyTaskTotals || createDailyTaskTotals();
    snapshot.dailyCompletionHistory = snapshot.dailyCompletionHistory || [];
    snapshot.badges = snapshot.badges || [];
    snapshot.responsibilityPoints = snapshot.responsibilityPoints || 0;
    snapshot.insurance = snapshot.insurance || { active: false, plan: "basic", daysCovered: 0, missedPayments: 0 };
    snapshot.gameLength = snapshot.gameLength || 90;
    setGameState(snapshot);
    setSelectedTimeline(timeline);
    setView("market");
    addLog(`Loaded: ${timeline.name}`, "system");
  };

  const resetGame = () => {
    // Complete reset of all game state
    setGameStarted(false);
    setGameState(null);
    setActionLog([]);
    setTimelines([]);
    setSelectedTimeline(null);
    setView("market");
    setSelectedAssetId(null);
    setMarketCategory("stocks");
    setTradeAmount(1);
    setAutoTick(true);
    setTickInterval(25);
    setAutoDay(false);
    setGameOver(false);
    setGameOverReason("");
    setIsResting(false);
    setRestTicksRemaining(0);
    setShowMinigame(false);
    setCurrentMinigame(null);
    setShowWheel(false);
    setWheelResult(null);
    setHasSpunThisWeek(false);
    setShowFinalSummary(false);
    setSummarySnapshot(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 text-white" style={{ fontFamily: "'Space Mono', monospace" }}>
      <style>
        {`
          @keyframes float {
            0%, 100% {
              transform: translateY(0px) rotate(0deg);
              opacity: 0.6;
            }
            50% {
              transform: translateY(-20px) rotate(180deg);
              opacity: 1;
            }
          }
          .animate-float {
            animation: float 3s ease-in-out infinite;
          }
          @keyframes bounce-slow {
            0%, 100% {
              transform: translateY(0px) scale(1);
            }
            50% {
              transform: translateY(-10px) scale(1.05);
            }
          }
          .animate-bounce-slow {
            animation: bounce-slow 2s ease-in-out infinite;
          }
        `}
      </style>
      
      {/* Minigame Overlays */}
      {showMinigame && currentMinigame === 'catch' && <CatchMinigame onComplete={completeMinigame} />}
      {showMinigame && currentMinigame === 'memory' && <MemoryMinigame onComplete={completeMinigame} />}
      {showMinigame && currentMinigame === 'reaction' && <ReactionMinigame onComplete={completeMinigame} />}

      {/* End-of-Program Life Summary */}
      {showFinalSummary && summarySnapshot && summaryReport && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="max-w-4xl w-full bg-slate-950/90 border border-emerald-500/40 rounded-2xl p-8 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-3xl font-bold text-emerald-300">Life Summary</h2>
                <p className="text-sm text-slate-400">
                  Day {summarySnapshot.summaryDay || summarySnapshot.day} of {summarySnapshot.gameLength}-day program
                </p>
              </div>
              <div className={`text-lg font-bold px-4 py-2 rounded-full ${
                summaryReport.score >= 80 ? 'bg-green-900/40 text-green-300' :
                summaryReport.score >= 60 ? 'bg-yellow-900/40 text-yellow-300' :
                'bg-red-900/40 text-red-300'
              }`}>
                {summaryReport.verdict}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-slate-900/60 rounded-lg p-4 border border-slate-700/40">
                <div className="text-xs text-slate-400">Readiness Score</div>
                <div className="text-3xl font-bold text-emerald-300">{summaryReport.score}/100</div>
              </div>
              <div className="bg-slate-900/60 rounded-lg p-4 border border-slate-700/40">
                <div className="text-xs text-slate-400">Responsibility Level</div>
                <div className="text-2xl font-bold text-emerald-300">
                  Lv {summaryReport.levelInfo.level} — {summaryReport.levelInfo.name}
                </div>
              </div>
              <div className="bg-slate-900/60 rounded-lg p-4 border border-slate-700/40">
                <div className="text-xs text-slate-400">Daily Care Avg</div>
                <div className="text-2xl font-bold text-cyan-300">
                  {(summaryReport.avgCare * 100).toFixed(0)}%
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-slate-900/60 rounded-lg p-4 border border-slate-700/40">
                <div className="text-xs text-slate-400 mb-2">Parent Readiness Goals</div>
                <div className="space-y-2 text-sm">
                  {summaryReport.checks.map(check => (
                    <div key={check.id} className="flex items-center justify-between">
                      <span>{check.label}</span>
                      <span className={check.met ? 'text-green-400' : 'text-slate-500'}>
                        {check.met ? '✅' : '⏳'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-slate-900/60 rounded-lg p-4 border border-slate-700/40">
                <div className="text-xs text-slate-400 mb-2">Program Highlights</div>
                <div className="space-y-1 text-sm text-slate-300">
                  <div>Average Health: {summaryReport.avgHealth.toFixed(1)}</div>
                  <div>Average Happiness: {summaryReport.avgHappiness.toFixed(1)}</div>
                  <div>Net Worth: ${summaryReport.netWorth.toFixed(0)}</div>
                  <div>Badges Earned: {summarySnapshot.badges?.length || 0}/{BADGES.length}</div>
                  <div>Insurance: {summarySnapshot.insurance?.active ? "Active" : "Inactive"}</div>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowFinalSummary(false)}
                className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-4 rounded-lg transition"
              >
                Continue Playing
              </button>
              <button
                onClick={saveTimeline}
                className="flex-1 bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 px-4 rounded-lg transition"
              >
                Save Timeline
              </button>
              <button
                onClick={() => {
                  setShowFinalSummary(false);
                  resetGame();
                }}
                className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 px-4 rounded-lg transition"
              >
                New Program
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Wheel of Fortune Overlay */}
      {showWheel && <WheelOfFortune onSpin={handleWheelSpin} />}
      
      {/* Pet Request Popup */}
      {gameState && gameState.pet && gameState.pet.currentRequest && (
        <div className="fixed bottom-4 right-4 bg-gradient-to-br from-purple-900 to-pink-900 border-4 border-purple-400 rounded-2xl p-6 shadow-2xl z-50 animate-bounce max-w-sm">
          <div className="text-center mb-4">
            <div className="text-5xl mb-2">{gameState.pet.currentRequest.emoji}</div>
            <h3 className="text-xl font-bold text-purple-200 mb-1">Pet Request!</h3>
            <p className="text-white">
              {gameState.pet.name} <span className="text-yellow-300">{gameState.pet.currentRequest.message}</span>
            </p>
          </div>
          
          <div className="bg-black/30 rounded-lg p-3 mb-4 text-sm">
            {gameState.pet.currentRequest.requiresMinigame && (
              <p className="text-cyan-300">🎮 Will start a minigame!</p>
            )}
            {gameState.pet.currentRequest.requiresTime && (
              <p className="text-blue-300">⏱️ Requires your attention</p>
            )}
            {gameState.pet.currentRequest.cost > 0 && (
              <p className="text-yellow-300">💰 Cost: ${gameState.pet.currentRequest.cost}</p>
            )}
            {gameState.pet.currentRequest.cost === 0 && !gameState.pet.currentRequest.requiresMinigame && (
              <p className="text-green-300">✨ Free!</p>
            )}
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={acceptRequest}
              disabled={gameState.pet.currentRequest.cost > 0 && gameState.cash < gameState.pet.currentRequest.cost}
              className={`flex-1 py-3 px-4 rounded-xl font-bold transition ${
                gameState.pet.currentRequest.cost > 0 && gameState.cash < gameState.pet.currentRequest.cost
                  ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                  : 'bg-green-600 hover:bg-green-500 text-white'
              }`}
            >
              ✅ Accept
            </button>
            <button
              onClick={declineRequest}
              className="flex-1 bg-red-600 hover:bg-red-500 text-white py-3 px-4 rounded-xl font-bold transition"
            >
              ❌ Decline
            </button>
          </div>
          
          <div className="mt-3 text-xs text-center text-slate-300">
            Declining may hurt trust and happiness
          </div>
        </div>
      )}
      
      {/* Header */}
      <div className="bg-black/60 backdrop-blur-md border-b border-cyan-500/30 p-4 sticky top-0 z-50">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsSidebarExpanded(prev => !prev)}
                className="bg-slate-900/70 border border-cyan-500/30 rounded-lg p-2 text-cyan-200 hover:text-cyan-100 hover:border-cyan-400 transition"
                aria-label="Toggle menu"
              >
                <Menu size={18} />
              </button>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  PAWSTREET
                </h1>
                <p className="text-xs text-cyan-300/70 mt-0.5">Virtual Pet Market Simulation</p>
              </div>
              
              <div className="flex items-center gap-6 text-sm border-l border-cyan-500/30 pl-6">
                <div>
                  <div className="text-xs text-cyan-400/60">Day</div>
                  <div className="font-bold text-cyan-300">{gameState.day}</div>
                </div>
                <div>
                  <div className="text-xs text-emerald-400/60">Level</div>
                  <div className="font-bold text-emerald-300">Lv {responsibilityLevelInfo.level}</div>
                </div>
                <div>
                  <div className="text-xs text-slate-400/60">Program</div>
                  <div className="font-bold text-slate-300">{gameState.day}/{gameState.gameLength}</div>
                </div>
                <div>
                  <div className="text-xs text-green-400/60">Cash</div>
                  <div className="font-bold text-green-400">${gameState.cash.toFixed(0)}</div>
                </div>
                <div>
                  <div className="text-xs text-blue-400/60">Portfolio</div>
                  <div className="font-bold text-blue-400">${portfolioValue.toFixed(0)}</div>
                </div>
                <div>
                  <div className="text-xs text-purple-400/60">Net Worth</div>
                  <div className="font-bold text-purple-400">${totalNetWorth.toFixed(0)}</div>
                </div>
                <div>
                  <div className="text-xs text-pink-400/60">Ethics</div>
                  <div className="font-bold text-pink-400">{gameState.ethicsScore}/100</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div 
        className={`max-w-[1600px] mx-auto p-4 transition-all duration-1000 ${
          gameState.pet.happiness > 70 ? '' : 
          gameState.pet.happiness < 30 ? 'grayscale brightness-75' :
          gameState.pet.stress > 70 ? 'hue-rotate-15 saturate-150' :
          ''
        }`}
      >
        <div className="flex gap-4">
          <div
            className={`shrink-0 bg-black/40 backdrop-blur border border-cyan-500/30 rounded-lg p-2 flex flex-col gap-2 transition-all ${
              isSidebarExpanded ? 'w-48' : 'w-16'
            }`}
          >
            {[
              { key: 'market', label: 'Market', icon: <TrendingUp size={18} /> },
              { key: 'portfolio', label: 'Portfolio', icon: <Briefcase size={18} /> },
              { key: 'pet', label: 'Pet', icon: <Heart size={18} /> },
              { key: 'tutorial', label: 'Tutorial', icon: <Play size={18} /> },
              { key: 'help', label: 'Help', icon: <Brain size={18} /> },
              { key: 'badges', label: 'Badges', icon: <BadgeIcon size={18} /> },
              { key: 'analytics', label: 'Analytics', icon: <BarChartIcon size={18} /> },
              { key: 'timelines', label: `Timelines (${timelines.length})`, icon: <Clock size={18} /> }
            ].map(item => (
              <button
                key={item.key}
                onClick={() => setView(item.key)}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-bold transition ${
                  view === item.key
                    ? 'bg-cyan-600 text-white shadow-md shadow-cyan-500/30'
                    : 'bg-slate-900/50 text-slate-300 hover:bg-slate-800/60'
                }`}
                title={!isSidebarExpanded ? item.label : undefined}
              >
                <span className="flex items-center justify-center">{item.icon}</span>
                {isSidebarExpanded && <span className="whitespace-nowrap">{item.label}</span>}
              </button>
            ))}
          </div>
          <div className="flex-1">
        {/* MARKET VIEW */}
        {view === "market" && (
          <div className="grid grid-cols-5 gap-4">
            {/* Market Overview */}
            <div className="col-span-3 space-y-4">
              <div className="bg-black/40 backdrop-blur border border-cyan-500/30 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-cyan-300">Market Overview</h2>
                  <div className="flex items-center gap-4 text-sm">
                    <div className={`px-3 py-1 rounded ${
                      gameState.market.trend === 'bullish' ? 'bg-green-900/50 text-green-300' :
                      gameState.market.trend === 'bearish' ? 'bg-red-900/50 text-red-300' :
                      'bg-slate-700 text-slate-300'
                    }`}>
                      {gameState.market.trend === 'bullish' ? '📈 Bullish' :
                       gameState.market.trend === 'bearish' ? '📉 Bearish' :
                       '➡️ Neutral'}
                    </div>
                    <div className="text-cyan-400">
                      Volatility: {(gameState.market.volatilityIndex * 100).toFixed(0)}%
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {[
                    { key: 'stocks', label: 'Stocks' },
                    { key: 'indexes', label: 'Indexes' },
                    { key: 'crypto', label: 'Crypto' },
                    { key: 'metals', label: 'Metals' }
                  ].map(tab => (
                    <button
                      key={tab.key}
                      onClick={() => setMarketCategory(tab.key)}
                      className={`px-3 py-1.5 rounded-full text-xs font-bold transition ${
                        marketCategory === tab.key
                          ? 'bg-cyan-600 text-white'
                          : 'bg-slate-800/60 text-slate-300 hover:bg-slate-700/60'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Detailed Asset Chart for Selected Asset */}
                {selectedAsset && (
                  <div className="mt-4 bg-slate-900/60 border border-cyan-500/30 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-cyan-300">{selectedAsset.name} ({selectedAsset.id})</h3>
                        <p className="text-xs text-slate-400">{selectedAsset.description}</p>
                      </div>
                      <div className="text-right">
                        <div className={`text-2xl font-bold ${
                          (selectedAsset.change || 0) > 0 ? 'text-green-400' :
                          (selectedAsset.change || 0) < 0 ? 'text-red-400' :
                          'text-slate-400'
                        }`}>
                          ${(selectedAsset.price || 0).toFixed(2)}
                        </div>
                        <div className={`text-sm ${
                          (selectedAsset.change || 0) > 0 ? 'text-green-400' :
                          (selectedAsset.change || 0) < 0 ? 'text-red-400' :
                          'text-slate-400'
                        }`}>
                          {(selectedAsset.change || 0) > 0 ? '+' : ''}{(selectedAsset.change || 0).toFixed(2)}%
                        </div>
                      </div>
                    </div>

                    {/* Full Price History Chart */}
                    <div className="flex gap-3">
                      <div className="w-16 shrink-0 h-[200px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={chartDisplayHistory} margin={{ top: 5, right: 0, left: 0, bottom: 20 }}>
                            <YAxis 
                              stroke="#64748b" 
                              tick={{ fontSize: 12 }}
                              domain={axisDomain}
                              tickFormatter={(value) => Number(value).toFixed(2)}
                              label={{ value: 'Price ($)', angle: -90, position: 'insideLeft', style: { fill: '#64748b' } }}
                            />
                            <Area 
                              type="monotone" 
                              dataKey="price" 
                              stroke="transparent" 
                              fill="transparent"
                              isAnimationActive={false}
                              dot={false}
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="flex-1 overflow-x-auto">
                        <div style={{ minWidth: chartPixelWidth }} className="h-[200px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartDisplayHistory} margin={{ top: 5, right: 20, left: 0, bottom: 20 }}>
                              <defs>
                                <linearGradient id={`full-gradient-${selectedAsset.id}`} x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.4}/>
                                  <stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/>
                                </linearGradient>
                              </defs>
                              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                              <XAxis 
                                dataKey="tick" 
                                stroke="#64748b" 
                                tick={{ fontSize: 12 }}
                                tickFormatter={formatXAxisTick}
                                minTickGap={12}
                                label={{ value: 'Day', position: 'insideBottom', offset: -5, style: { fill: '#64748b' } }}
                              />
                              <YAxis 
                                hide
                                domain={axisDomain}
                              />
                              <Tooltip 
                                contentStyle={{ 
                                  backgroundColor: '#0f172a', 
                                  border: '1px solid #22d3ee',
                                  borderRadius: '4px'
                                }}
                                formatter={(value) => [`${(value || 0).toFixed(2)}`, 'Price']}
                                labelFormatter={formatTooltipLabel}
                              />
                              <Area 
                                type="monotone" 
                                dataKey="price" 
                                stroke="#22d3ee" 
                                strokeWidth={2}
                                fill={`url(#full-gradient-${selectedAsset.id})`}
                                isAnimationActive={false}
                              />
                            </AreaChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    </div>

                    {/* Stock Statistics */}
                    <div className="grid grid-cols-4 gap-4 mt-4 pt-4 border-t border-slate-700">
                      <div>
                        <div className="text-xs text-slate-400">Current Price</div>
                        <div className="text-lg font-bold text-cyan-300">${(selectedAsset.price || 0).toFixed(2)}</div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-400">Base Price</div>
                        <div className="text-lg font-bold text-slate-300">
                          {selectedAsset.basePrice ? `$${selectedAsset.basePrice.toFixed(2)}` : '—'}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-400">Volatility</div>
                        <div className="text-lg font-bold text-orange-400">
                          {selectedAsset.volatility ? `${(selectedAsset.volatility * 100).toFixed(1)}%` : '—'}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-400">Ethical Rating</div>
                        {selectedAsset.assetType === 'stock' ? (
                          <div className={`text-lg font-bold ${
                            (selectedAsset.ethicalRating || 0) > 70 ? 'text-green-400' :
                            (selectedAsset.ethicalRating || 0) > 40 ? 'text-yellow-400' :
                            'text-orange-400'
                          }`}>
                            {selectedAsset.ethicalRating || 0}/100
                          </div>
                        ) : (
                          <div className="text-lg font-bold text-slate-400">N/A</div>
                        )}
                      </div>
                    </div>

                    {/* Price Range Stats */}
                    <div className="grid grid-cols-3 gap-4 mt-3">
                      <div>
                        <div className="text-xs text-slate-400">30-Day High</div>
                        <div className="text-sm font-bold text-green-400">
                          ${(chartHistory.length > 0 
                            ? Math.max(...chartHistory.map(p => p.price)) 
                            : 0).toFixed(2)}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-400">30-Day Low</div>
                        <div className="text-sm font-bold text-red-400">
                          ${(chartHistory.length > 0 
                            ? Math.min(...chartHistory.map(p => p.price)) 
                            : 0).toFixed(2)}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-400">Total Change</div>
                        <div className={`text-sm font-bold ${
                          (chartHistory.length > 0 && 
                           selectedAsset.price > chartHistory[0].price) 
                            ? 'text-green-400' : 'text-red-400'
                        }`}>
                          {(chartHistory.length > 0 
                            ? ((selectedAsset.price - chartHistory[0].price) / chartHistory[0].price * 100) 
                            : 0).toFixed(2)}%
                        </div>
                      </div>
                    </div>

                    {/* Stock News Section */}
                    {selectedStock && (
                      <div className="mt-4 pt-4 border-t border-slate-700">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-sm font-bold text-cyan-300">📰 Latest News</h4>
                          <div className="text-xs text-slate-500">Live Updates</div>
                        </div>
                        
                        {selectedStock.news && selectedStock.news.length > 0 ? (
                          <div className="space-y-2 max-h-48 overflow-y-auto">
                            {selectedStock.news.map((newsItem, idx) => (
                              <div 
                                key={idx}
                                className={`p-3 rounded-lg border-l-4 ${
                                  newsItem.type === 'positive' ? 'bg-green-900/20 border-green-500' :
                                  newsItem.type === 'negative' ? 'bg-red-900/20 border-red-500' :
                                  'bg-blue-900/20 border-blue-500'
                                }`}
                              >
                                <div className="flex items-start justify-between gap-2">
                                  <div className="flex-1">
                                    <p className="text-sm text-white leading-relaxed">
                                      {newsItem.headline}
                                    </p>
                                  </div>
                                  <div className="flex flex-col items-end gap-1">
                                    <div className="text-xs text-slate-400">Day {newsItem.timestamp}</div>
                                    {newsItem.type === 'positive' && <span className="text-green-400">📈</span>}
                                    {newsItem.type === 'negative' && <span className="text-red-400">📉</span>}
                                    {newsItem.type === 'neutral' && <span className="text-blue-400">📊</span>}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-6 text-slate-500 text-sm">
                            <div className="text-2xl mb-2">📰</div>
                            <div>No recent news for {selectedStock.name}</div>
                            <div className="text-xs mt-1">News will appear as market conditions change</div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* Trading Panel */}
                {selectedStock && (
                  <div className="mt-4 bg-black/40 backdrop-blur border border-cyan-500/30 rounded-lg p-4">
                    <h3 className="text-lg font-bold text-cyan-300 mb-3">Trade {selectedStock.name}</h3>
                    
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="text-xs text-slate-400 block mb-1">Shares</label>
                        <input
                          type="number"
                          min="1"
                          value={tradeAmount}
                          onChange={(e) => setTradeAmount(Math.max(1, parseInt(e.target.value) || 1))}
                          className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-sm"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-slate-400 block mb-1">Price per Share</label>
                        <div className="bg-slate-900 border border-slate-700 rounded px-3 py-2 text-sm text-cyan-300">
                          ${selectedStock.price.toFixed(2)}
                        </div>
                      </div>
                      <div>
                        <label className="text-xs text-slate-400 block mb-1">Total</label>
                        <div className="bg-slate-900 border border-slate-700 rounded px-3 py-2 text-sm font-bold text-cyan-300">
                          ${(selectedStock.price * tradeAmount).toFixed(2)}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 mt-4">
                      <button
                        onClick={() => buyStock(selectedStock)}
                        disabled={gameState.cash < selectedStock.price * tradeAmount}
                        className="flex-1 bg-green-600 hover:bg-green-500 disabled:bg-slate-700 disabled:text-slate-500 px-4 py-2 rounded font-bold transition"
                      >
                        Buy
                      </button>
                      <button
                        onClick={() => sellStock(selectedStock)}
                        disabled={selectedStock.owned < tradeAmount}
                        className="flex-1 bg-red-600 hover:bg-red-500 disabled:bg-slate-700 disabled:text-slate-500 px-4 py-2 rounded font-bold transition"
                      >
                        Sell
                      </button>
                    </div>
                  </div>
                )}

                {/* Stock Cards with Charts */}
                <div className="grid grid-cols-3 gap-3 mt-4">
                  {currentAssets.map(asset => (
                    <div
                      key={asset.id}
                      onClick={() => setSelectedAssetId(asset.id)}
                      className={`bg-slate-900/60 border rounded-lg p-3 cursor-pointer transition ${
                        selectedAsset?.id === asset.id ? 
                        'border-cyan-400 shadow-lg shadow-cyan-500/20' : 
                        'border-slate-700 hover:border-slate-600'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="font-bold text-cyan-300 text-sm">{asset.id}</div>
                          <div className="text-[10px] text-slate-400">{asset.name}</div>
                        </div>
                        <div className={`text-base font-bold ${
                          asset.change > 0 ? 'text-green-400' :
                          asset.change < 0 ? 'text-red-400' :
                          'text-slate-400'
                        }`}>
                          ${asset.price.toFixed(2)}
                        </div>
                      </div>
                      
                      {/* Mini Price Chart */}
                      <div className="h-12 mb-2">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={(asset.priceHistory || []).slice(-14)}>
                            <defs>
                              <linearGradient id={`gradient-${asset.id}`} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={
                                  asset.change > 0 ? "#22c55e" :
                                  asset.change < 0 ? "#ef4444" :
                                  "#64748b"
                                } stopOpacity={0.3}/>
                                <stop offset="95%" stopColor={
                                  asset.change > 0 ? "#22c55e" :
                                  asset.change < 0 ? "#ef4444" :
                                  "#64748b"
                                } stopOpacity={0}/>
                              </linearGradient>
                            </defs>
                            <Area 
                              type="monotone" 
                              dataKey="price" 
                              stroke={
                                asset.change > 0 ? "#22c55e" :
                                asset.change < 0 ? "#ef4444" :
                                "#64748b"
                              }
                              strokeWidth={1.5}
                              fill={`url(#gradient-${asset.id})`}
                              dot={false}
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                      
                      <div className="text-[10px] text-slate-400 mb-2 line-clamp-2">{asset.description}</div>
                      
                      <div className="flex items-center justify-between text-[10px]">
                        {asset.assetType === 'stock' ? (
                          <div className="flex items-center gap-2">
                            <div className="text-slate-500">Own: {asset.owned}</div>
                            <div className={`${
                              asset.ethicalRating > 70 ? 'text-green-400' :
                              asset.ethicalRating > 40 ? 'text-yellow-400' :
                              'text-orange-400'
                            }`}>
                              E:{asset.ethicalRating}
                            </div>
                          </div>
                        ) : (
                          <div className="text-slate-500 uppercase">{asset.assetType}</div>
                        )}
                        {asset.change !== undefined && (
                          <div className={`flex items-center gap-1 ${
                            asset.change > 0 ? 'text-green-400' :
                            asset.change < 0 ? 'text-red-400' :
                            'text-slate-400'
                          }`}>
                            {asset.change > 0 ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                            {asset.change.toFixed(1)}%
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Sidebar - Combined */}
            <div className="col-span-2 space-y-4">
              {/* Pet Status Quick View */}
              <div className="bg-black/40 backdrop-blur border border-purple-500/30 rounded-lg p-4">
                <h3 className="text-sm font-bold text-purple-300 mb-3 flex items-center gap-2">
                  <Heart size={16} />
                  {gameState.pet.name}
                </h3>
                
                <div className="mb-3 scale-75 origin-top">
                  <PetVisual pet={gameState.pet} />
                </div>
                
                <div className="text-xs text-purple-200 space-y-1 mt-4">
                  <StatMini label="Health" value={gameState.pet.health} />
                  <StatMini label="Happiness" value={gameState.pet.happiness} />
                  <StatMini label="Trust" value={gameState.pet.trust} />
                  <StatMini label="Stress" value={100 - gameState.pet.stress} />
                </div>
                
                <div className="mt-3 pt-3 border-t border-purple-500/30 text-xs text-center">
                  <div className="text-purple-400">{gameState.pet.evolution}</div>
                </div>
              </div>

              {/* Market News */}
              <div className="bg-black/40 backdrop-blur border border-cyan-500/30 rounded-lg p-4">
                <h3 className="text-sm font-bold text-cyan-300 mb-3">Market News</h3>
                <div className="space-y-2 text-xs">
                  {gameState.market.newsEvents.slice(-3).reverse().map((event, i) => (
                    <div key={i} className="bg-slate-900/50 p-2 rounded text-slate-300">
                      {event.message}
                    </div>
                  ))}
                  {gameState.market.newsEvents.length === 0 && (
                    <div className="text-slate-500 text-center py-4">Markets are calm</div>
                  )}
                </div>
              </div>

              {/* Event Log */}
              <div className="bg-black/40 backdrop-blur border border-slate-600/30 rounded-lg p-4 max-h-64 overflow-hidden flex flex-col">
                <h3 className="text-sm font-bold text-slate-300 mb-2">Activity Log</h3>
                <div className="flex-1 overflow-y-auto space-y-1 text-xs">
                  {actionLog.slice().reverse().map((log, i) => (
                    <div
                      key={log.time}
                      className={`p-1.5 rounded ${
                        log.type === "emergency" ? "bg-red-900/50 text-red-300" :
                        log.type === "pet" ? "bg-purple-900/50 text-purple-300" :
                        log.type === "trade" ? "bg-blue-900/50 text-blue-300" :
                        log.type === "market" ? "bg-cyan-900/50 text-cyan-300" :
                        log.type === "day" ? "bg-slate-700/50 text-slate-300 font-bold" :
                        "bg-slate-800/30 text-slate-400"
                      }`}
                    >
                      {log.message}
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Controls */}
              <div className="bg-black/40 backdrop-blur border border-cyan-500/30 rounded-lg p-3">
                <button
                  onClick={nextDay}
                  disabled={isResting}
                  className={`w-full px-4 py-3 rounded font-bold transition flex items-center justify-center gap-2 mb-2 ${
                    isResting 
                      ? "bg-slate-700 text-slate-500 cursor-not-allowed"
                      : "bg-cyan-600 hover:bg-cyan-500"
                  }`}
                >
                  <Clock size={18} />
                  {isResting ? `Resting (${restTicksRemaining})` : 'Next Day →'}
                </button>
                
                <button
                  onClick={() => setAutoTick(!autoTick)}
                  className={`w-full ${autoTick ? 'bg-green-600 hover:bg-green-500' : 'bg-slate-700 hover:bg-slate-600'} px-4 py-2 rounded font-bold transition flex items-center justify-center gap-2 mb-2 text-sm`}
                >
                  <Play size={16} />
                  {autoTick ? 'Auto-Tick: ON' : 'Auto-Tick: OFF'}
                </button>

                <button
                  onClick={() => setAutoDay(!autoDay)}
                  className={`w-full ${autoDay ? 'bg-green-600 hover:bg-green-500' : 'bg-slate-700 hover:bg-slate-600'} px-4 py-2 rounded font-bold transition flex items-center justify-center gap-2 mb-2 text-sm`}
                >
                  <Clock size={16} />
                  {autoDay ? 'Auto-Day: ON (3min)' : 'Auto-Day: OFF'}
                </button>
                
                {/* Tick Interval Controls */}
                <div className="mb-2 p-3 bg-slate-900/50 rounded border border-slate-700">
                  <div className="text-xs text-slate-400 mb-2 font-bold">Market Update Interval</div>
                  
                  {/* Preset Buttons */}
                  <div className="grid grid-cols-3 gap-1 mb-2">
                    <button
                      onClick={() => setTickInterval(10)}
                      className={`px-2 py-1 text-xs rounded ${tickInterval === 10 ? 'bg-cyan-600' : 'bg-slate-700 hover:bg-slate-600'}`}
                    >
                      10s
                    </button>
                    <button
                      onClick={() => setTickInterval(25)}
                      className={`px-2 py-1 text-xs rounded ${tickInterval === 25 ? 'bg-cyan-600' : 'bg-slate-700 hover:bg-slate-600'}`}
                    >
                      25s
                    </button>
                    <button
                      onClick={() => setTickInterval(60)}
                      className={`px-2 py-1 text-xs rounded ${tickInterval === 60 ? 'bg-cyan-600' : 'bg-slate-700 hover:bg-slate-600'}`}
                    >
                      60s
                    </button>
                  </div>
                  
                  {/* Custom Input */}
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min="5"
                      max="300"
                      value={tickInterval}
                      onChange={(e) => setTickInterval(Math.max(5, Math.min(300, parseInt(e.target.value) || 25)))}
                      className="flex-1 bg-slate-800 border border-slate-600 rounded px-2 py-1 text-xs text-white"
                    />
                    <span className="text-xs text-slate-400">sec</span>
                  </div>
                </div>
                
                {autoTick && (
                  <div className="text-xs text-center text-cyan-300 mb-2 bg-cyan-900/20 rounded py-1">
                    ⏱️ Updates every {tickInterval}s
                  </div>
                )}

                {isResting && (
                  <div className="text-xs text-center text-blue-300 mb-2 bg-blue-900/20 rounded py-1">
                    💤 Pet resting... Market dormant
                  </div>
                )}
                
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    onClick={saveTimeline}
                    className="bg-blue-600 hover:bg-blue-500 px-2 py-2 rounded transition flex items-center justify-center gap-1"
                  >
                    <Save size={14} />
                    Save
                  </button>
                  <button
                    onClick={resetGame}
                    className="bg-red-600/80 hover:bg-red-600 px-2 py-2 rounded transition flex items-center justify-center gap-1"
                  >
                    <RotateCcw size={14} />
                    Reset
                  </button>
                </div>
              </div>

              {/* Pet Emotion Market Influence */}
              <div className="bg-black/40 backdrop-blur border border-purple-500/30 rounded-lg p-4 max-h-96 overflow-y-auto">
                <h3 className="text-sm font-bold text-purple-300 mb-3 flex items-center gap-2">
                  <Brain size={16} />
                  Pet → Market Influence
                </h3>
                <div className="text-xs space-y-1.5">
                  {gameState.stocks.map(stock => {
                    const influence = stock.petInfluence;
                    if (!influence) return null;
                    
                    const totalInfluence = (
                      (influence.health || 0) +
                      (influence.happiness || 0) +
                      (influence.trust || 0) +
                      (influence.stress || 0) +
                      (influence.energy || 0) +
                      (influence.emotion || 0)
                    ) * 100;
                    
                    if (Math.abs(totalInfluence) < 0.05) return null;
                    
                    return (
                      <div key={stock.id} className="flex justify-between items-center bg-slate-900/50 p-1.5 rounded">
                        <span className="text-cyan-300 font-bold text-[10px]">{stock.id}</span>
                        <span className={`text-[10px] font-bold ${totalInfluence > 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {totalInfluence > 0 ? '+' : ''}{totalInfluence.toFixed(2)}%
                        </span>
                      </div>
                    );
                  })}
                  
                  <div className="mt-3 pt-3 border-t border-purple-500/30 text-slate-400">
                    <div className="mb-1 text-[10px] font-bold">Influence Factors:</div>
                    <div className="text-[9px] space-y-0.5">
                      <div>• Health → VCS, AQT, GRO, FIT, INS, PFC</div>
                      <div>• Happiness → TTI, GRO, BRN</div>
                      <div>• Trust → EPL, INS</div>
                      <div>• Energy → SLP, FIT</div>
                      <div>• Stress → LXP, BRN, TRV</div>
                      <div>• Mood → All stocks</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PET VIEW */}
        {view === "pet" && (
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2 space-y-4">
              {/* Pet Status */}
              <div className="bg-black/40 backdrop-blur border border-purple-500/30 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-purple-300">{gameState.pet.name}</h2>
                  <div className="text-sm bg-purple-600 px-3 py-1 rounded">{gameState.pet.evolution}</div>
                </div>
                
                {/* Pet Visual */}
                <div className="mb-6">
                  <PetVisual pet={gameState.pet} />
                </div>
                
                <div className="space-y-3">
                  <StatBar label="Health" value={gameState.pet.health} color="text-red-400" />
                  <StatBar label="Happiness" value={gameState.pet.happiness} color="text-yellow-400" />
                  <StatBar label="Trust" value={gameState.pet.trust} color="text-pink-400" />
                  <StatBar label="Energy" value={gameState.pet.energy} color="text-blue-400" />
                  <StatBar label="Stress" value={100 - gameState.pet.stress} color="text-green-400" />
                  <StatBar label="Hunger" value={100 - gameState.pet.hunger} color="text-orange-400" />
                  <StatBar label="Financial Awareness" value={gameState.pet.financialAwareness} color="text-purple-400" />
                </div>

                {/* Sickness Alert */}
                {gameState.pet.sickness && (
                  <div className="mt-4 p-4 bg-red-900/30 border-2 border-red-500/50 rounded-lg animate-pulse">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-lg font-bold text-red-300 flex items-center gap-2">
                        🦠 {SICKNESS_TYPES[gameState.pet.sickness.type].name}
                      </h4>
                      <div className="text-sm text-red-400">Day {gameState.pet.sickness.daysSick}</div>
                    </div>
                    <p className="text-sm text-red-200 mb-2">{SICKNESS_TYPES[gameState.pet.sickness.type].symptoms}</p>
                    <div className="text-xs text-red-300">
                      Severity: {gameState.pet.sickness.severity}/3 | 
                      Cure Cost: ${SICKNESS_TYPES[gameState.pet.sickness.type].cureCost} | 
                      Success Rate: {(SICKNESS_TYPES[gameState.pet.sickness.type].cureChance * 100).toFixed(0)}%
                    </div>
                    <div className="mt-2 text-xs text-red-200">
                      ⚠️ Visit the vet to attempt a cure
                    </div>
                  </div>
                )}
              </div>

              {/* Memory Bank */}
              <div className="bg-black/40 backdrop-blur border border-purple-500/30 rounded-lg p-6">
                <h3 className="text-lg font-bold text-purple-300 mb-4 flex items-center gap-2">
                  <Brain size={20} />
                  Memory Bank
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-slate-400 mb-1">Total Feedings</div>
                    <div className="text-2xl font-bold text-purple-300">{gameState.pet.memory.totalFeedings}</div>
                  </div>
                  <div>
                    <div className="text-slate-400 mb-1">Vet Visits</div>
                    <div className="text-2xl font-bold text-purple-300">{gameState.pet.memory.totalVetVisits}</div>
                  </div>
                  <div>
                    <div className="text-slate-400 mb-1">Market Crashes Witnessed</div>
                    <div className="text-2xl font-bold text-red-400">{gameState.pet.memory.marketCrashes}</div>
                  </div>
                  <div>
                    <div className="text-slate-400 mb-1">Market Booms Witnessed</div>
                    <div className="text-2xl font-bold text-green-400">{gameState.pet.memory.marketBooms}</div>
                  </div>
                  <div>
                    <div className="text-slate-400 mb-1">Days in Financial Stress</div>
                    <div className="text-2xl font-bold text-orange-400">{gameState.pet.memory.daysInStress}</div>
                  </div>
                  <div>
                    <div className="text-slate-400 mb-1">Care Quality (7-day avg)</div>
                    <div className="text-2xl font-bold text-blue-400">
                      {gameState.pet.memory.careQualityTrend.length > 0 ?
                        (gameState.pet.memory.careQualityTrend.reduce((a,b) => a+b, 0) / 
                         gameState.pet.memory.careQualityTrend.length).toFixed(0) :
                        "N/A"}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Care Actions */}
            <div className="col-span-1 space-y-4">
              <div className="bg-black/40 backdrop-blur border border-emerald-500/30 rounded-lg p-4">
                <h3 className="text-lg font-bold text-emerald-300 mb-3">Daily Routine</h3>
                <div className="space-y-3 text-xs">
                  {DAY_TASKS.map(task => {
                    const done = gameState.dailyTasks?.[task.id] || 0;
                    const progress = (done / task.target) * 100;
                    return (
                      <div key={task.id} className="bg-slate-900/50 p-2 rounded border border-slate-700/40">
                        <div className="flex items-center justify-between mb-1">
                          <div className="text-slate-200 font-bold">{task.icon} {task.label}</div>
                          <div className="text-slate-400">{done}/{task.target}</div>
                        </div>
                        <div className="w-full bg-slate-800 rounded-full h-1.5">
                          <div
                            className="h-1.5 rounded-full bg-emerald-400 transition-all"
                            style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-3 text-[10px] text-slate-400">
                  Completion today: {(dailyCompletionPercent * 100).toFixed(0)}%
                </div>
              </div>

              <div className="bg-black/40 backdrop-blur border border-purple-500/30 rounded-lg p-4">
                <h3 className="text-lg font-bold text-purple-300 mb-4">Care Actions</h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm text-purple-400 mb-2">
                      🍖 Food ({gameState.dailyTasks?.feed || 0}/{DAY_TASKS.find(t => t.id === "feed").target})
                    </h4>
                    <div className="space-y-2">
                      <CareButton
                        label={`Cheap ($${calculateCareCost('food_cheap', gameState.stocks, gameState.pet, gameState.cash, gameState.insurance)})`}
                        onClick={() => performCare('feed', 'food_cheap')}
                        disabled={gameState.cash < calculateCareCost('food_cheap', gameState.stocks, gameState.pet, gameState.cash, gameState.insurance)}
                      />
                      <CareButton
                        label={`Regular ($${calculateCareCost('food_regular', gameState.stocks, gameState.pet, gameState.cash, gameState.insurance)})`}
                        onClick={() => performCare('feed', 'food_regular')}
                        disabled={gameState.cash < calculateCareCost('food_regular', gameState.stocks, gameState.pet, gameState.cash, gameState.insurance)}
                      />
                      <CareButton
                        label={`Premium ($${calculateCareCost('food_premium', gameState.stocks, gameState.pet, gameState.cash, gameState.insurance)})`}
                        onClick={() => performCare('feed', 'food_premium')}
                        disabled={gameState.cash < calculateCareCost('food_premium', gameState.stocks, gameState.pet, gameState.cash, gameState.insurance)}
                      />
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm text-purple-400 mb-2">🏥 Healthcare</h4>
                    <CareButton
                      label={`Vet Visit ($${calculateCareCost('vet_checkup', gameState.stocks, gameState.pet, gameState.cash, gameState.insurance)})`}
                      onClick={() => performCare('vet', 'vet_checkup')}
                      disabled={gameState.cash < calculateCareCost('vet_checkup', gameState.stocks, gameState.pet, gameState.cash, gameState.insurance)}
                    />
                  </div>

                  <div>
                    <h4 className="text-sm text-purple-400 mb-2">
                      🚽 Bathroom ({gameState.dailyTasks?.bathroom || 0}/{DAY_TASKS.find(t => t.id === "bathroom").target})
                    </h4>
                    <CareButton
                      label="Bathroom Break (Free)"
                      onClick={() => performCare('bathroom', 'bathroom')}
                    />
                  </div>

                  <div>
                    <h4 className="text-sm text-purple-400 mb-2">
                      🦮 Walk ({gameState.dailyTasks?.walk || 0}/{DAY_TASKS.find(t => t.id === "walk").target})
                    </h4>
                    <CareButton
                      label={`Walk ($${calculateCareCost('walk', gameState.stocks, gameState.pet, gameState.cash, gameState.insurance)})`}
                      onClick={() => performCare('walk', 'walk')}
                      disabled={gameState.cash < calculateCareCost('walk', gameState.stocks, gameState.pet, gameState.cash, gameState.insurance)}
                    />
                  </div>

                  <div>
                    <h4 className="text-sm text-purple-400 mb-2">
                      🎾 Activity ({gameState.dailyTasks?.activity || 0}/{DAY_TASKS.find(t => t.id === "activity").target})
                    </h4>
                    <CareButton
                      label={`Play ($${calculateCareCost('play', gameState.stocks, gameState.pet, gameState.cash, gameState.insurance)})`}
                      onClick={() => performCare('play', 'play')}
                      disabled={gameState.cash < calculateCareCost('play', gameState.stocks, gameState.pet, gameState.cash, gameState.insurance)}
                    />
                  </div>

                  <div>
                    <h4 className="text-sm text-purple-400 mb-2">💤 Rest & Time</h4>
                    <div className="space-y-2">
                      <button
                        onClick={startRest}
                        disabled={isResting}
                        className={`w-full px-3 py-2 rounded text-sm transition ${
                          isResting 
                            ? "bg-slate-800 text-slate-500 cursor-not-allowed" 
                            : "bg-blue-600 hover:bg-blue-500"
                        }`}
                      >
                        {isResting ? `Resting... (${restTicksRemaining} ticks)` : "Rest (Free)"}
                      </button>
                      
                      <button
                        onClick={nextDay}
                        disabled={isResting}
                        className={`w-full px-3 py-2 rounded text-sm transition ${
                          isResting
                            ? "bg-slate-800 text-slate-500 cursor-not-allowed"
                            : "bg-cyan-600 hover:bg-cyan-500"
                        }`}
                      >
                        ⏭️ Next Day
                      </button>

                      <button
                        onClick={() => setAutoDay(!autoDay)}
                        className={`w-full px-3 py-2 rounded text-sm font-bold transition ${
                          autoDay ? 'bg-green-600 hover:bg-green-500' : 'bg-slate-700 hover:bg-slate-600'
                        }`}
                      >
                        Auto-Day: {autoDay ? 'ON (3min)' : 'OFF'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Insurance */}
              <details className="bg-black/40 backdrop-blur border border-blue-500/30 rounded-lg p-4">
                <summary className="cursor-pointer list-none flex items-center justify-between text-lg font-bold text-blue-300">
                  <span>Pet Insurance</span>
                  <span className="text-xs text-slate-400">
                    {gameState.insurance?.active ? 'Active' : 'Inactive'}
                  </span>
                </summary>
                <div className="mt-3 text-xs text-slate-400 mb-3">
                  {gameState.insurance?.active
                    ? `Active: ${INSURANCE_PLANS[gameState.insurance.plan].name} (${gameState.insurance.daysCovered} days)`
                    : "Inactive — activate to lower vet costs"}
                </div>
                <div className="space-y-2">
                  {Object.entries(INSURANCE_PLANS).map(([key, plan]) => (
                    <button
                      key={key}
                      onClick={() => toggleInsurance(key)}
                      className={`w-full text-left px-3 py-2 rounded text-xs border transition ${
                        gameState.insurance?.active && gameState.insurance?.plan === key
                          ? 'bg-blue-900/40 border-blue-400 text-blue-200'
                          : 'bg-slate-900/40 border-slate-700 text-slate-300 hover:border-blue-400/50'
                      }`}
                    >
                      <div className="font-bold">{plan.name}</div>
                      <div className="text-[10px] text-slate-400">${plan.premium}/day • {plan.description}</div>
                    </button>
                  ))}
                </div>
              </details>

              {/* Room Items Shop */}
              <details className="bg-black/40 backdrop-blur border border-purple-500/30 rounded-lg p-4">
                <summary className="cursor-pointer list-none flex items-center justify-between text-lg font-bold text-purple-300">
                  <span>🏠 Pet's Room</span>
                  <span className="text-xs text-slate-400">{gameState.pet.roomItems?.length || 0} items</span>
                </summary>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  {Object.entries(ROOM_ITEMS).map(([key, item]) => {
                    const owned = gameState.pet.roomItems && gameState.pet.roomItems.includes(key);
                    return (
                      <button
                        key={key}
                        onClick={() => buyRoomItem(key)}
                        disabled={owned || gameState.cash < item.cost}
                        className={`p-2 rounded text-xs transition ${
                          owned 
                            ? 'bg-green-900/30 border-2 border-green-500 cursor-default' 
                            : gameState.cash < item.cost
                            ? 'bg-slate-800 border border-slate-700 text-slate-500 cursor-not-allowed'
                            : 'bg-purple-900/30 border border-purple-500/50 hover:bg-purple-800/30'
                        }`}
                      >
                        <div className="text-2xl mb-1">{item.emoji}</div>
                        <div className="font-bold text-[10px]">{item.name}</div>
                        <div className="text-[9px] text-slate-400">${item.cost}</div>
                        {owned && <div className="text-green-400 text-[10px] mt-1">✅ Owned</div>}
                      </button>
                    );
                  })}
                </div>
                <div className="mt-3 text-[10px] text-slate-400">
                  Room items provide passive bonuses each day!
                </div>
              </details>

              {/* Training Skills */}
              <details className="bg-black/40 backdrop-blur border border-cyan-500/30 rounded-lg p-4">
                <summary className="cursor-pointer list-none flex items-center justify-between text-lg font-bold text-cyan-300">
                  <span>🎓 Training</span>
                  <span className="text-xs text-slate-400">Skills</span>
                </summary>
                <div className="mt-3 space-y-2">
                  {Object.entries(COACHING_SKILLS).map(([key, skill]) => {
                    const currentLevel = gameState.pet.skills ? (gameState.pet.skills[key] || 0) : 0;
                    const maxed = currentLevel >= skill.maxLevel;
                    const cost = skill.costPerLevel * (currentLevel + 1);
                    
                    return (
                      <div key={key} className="bg-slate-900/50 p-2 rounded">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs font-bold">
                            {skill.emoji} {skill.name}
                          </span>
                          <span className="text-xs text-cyan-300">
                            Lv {currentLevel}/{skill.maxLevel}
                          </span>
                        </div>
                        <div className="text-[10px] text-slate-400 mb-2">{skill.description}</div>
                        <button
                          onClick={() => trainSkill(key)}
                          disabled={maxed || gameState.cash < cost}
                          className={`w-full px-2 py-1 rounded text-xs transition ${
                            maxed
                              ? 'bg-green-900/30 text-green-400 cursor-default'
                              : gameState.cash < cost
                              ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                              : 'bg-cyan-600 hover:bg-cyan-500'
                          }`}
                        >
                          {maxed ? '✅ Maxed!' : `Train - $${cost}`}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </details>

              {/* Decision Engine Status */}
              <details className="bg-black/40 backdrop-blur border border-cyan-500/30 rounded-lg p-4">
                <summary className="cursor-pointer list-none flex items-center justify-between text-sm font-bold text-cyan-300">
                  <span className="flex items-center gap-2">
                    <Brain size={16} />
                    Decision Engine
                  </span>
                  <span className="text-xs text-slate-400">Insights</span>
                </summary>
                <div className="mt-3 text-xs space-y-2 text-slate-300">
                  <div className="flex justify-between">
                    <span>Financial Stability:</span>
                    <span className={
                      totalNetWorth / STARTING_CASH > 1.5 ? "text-green-400" :
                      totalNetWorth / STARTING_CASH > 0.8 ? "text-yellow-400" :
                      "text-red-400"
                    }>
                      {(totalNetWorth / STARTING_CASH).toFixed(2)}x
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Behavior State:</span>
                    <span>{gameState.pet.stress > 60 ? "Anxious" : gameState.pet.trust > 60 ? "Cooperative" : "Cautious"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Market Trauma:</span>
                    <span>{gameState.pet.memory.marketCrashes > 2 ? "High" : "Normal"}</span>
                  </div>
                </div>
              </details>
            </div>
          </div>
        )}

        {/* TUTORIAL VIEW */}
        {view === "tutorial" && (
          <TutorialPanel
            gameState={gameState}
            timelines={timelines}
            setView={setView}
            tutorialStepIndex={tutorialStepIndex}
            setTutorialStepIndex={setTutorialStepIndex}
            tutorialOverrides={tutorialOverrides}
            setTutorialOverrides={setTutorialOverrides}
          />
        )}

        {/* HELP VIEW */}
        {view === "help" && (
          <HelpChat
            gameState={gameState}
            setView={setView}
            helpMessages={helpMessages}
            setHelpMessages={setHelpMessages}
          />
        )}

        {/* BADGES & GOALS VIEW */}
        {view === "badges" && (
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2 space-y-4">
              <div className="bg-black/40 backdrop-blur border border-emerald-500/30 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-emerald-300">Responsibility Level</h2>
                  <div className="text-sm bg-emerald-600/30 text-emerald-200 px-3 py-1 rounded-full">
                    Lv {responsibilityLevelInfo.level} — {responsibilityLevelInfo.name}
                  </div>
                </div>
                <div className="text-sm text-slate-300 mb-3">{responsibilityLevelInfo.description}</div>
                <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                  <span>{gameState.responsibilityPoints} points</span>
                  <span>
                    {responsibilityLevelInfo.nextLevelPoints
                      ? `${responsibilityLevelInfo.nextLevelPoints - gameState.responsibilityPoints} pts to next level`
                      : "Max level reached"}
                  </span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2">
                  <div
                    className="h-2 rounded-full bg-emerald-400 transition-all"
                    style={{ width: `${Math.min(100, Math.max(0, responsibilityProgress * 100))}%` }}
                  />
                </div>
              </div>

              <div className="bg-black/40 backdrop-blur border border-cyan-500/30 rounded-lg p-6">
                <h3 className="text-lg font-bold text-cyan-300 mb-3">Daily Responsibility Routine</h3>
                <div className="grid grid-cols-2 gap-4">
                  {DAY_TASKS.map(task => {
                    const done = gameState.dailyTasks?.[task.id] || 0;
                    const progress = (done / task.target) * 100;
                    return (
                      <div key={task.id} className="bg-slate-900/50 p-3 rounded-lg border border-slate-700/40">
                        <div className="flex items-center justify-between mb-2">
                          <div className="text-sm font-bold text-slate-200">{task.icon} {task.label}</div>
                          <div className="text-xs text-slate-400">{done}/{task.target}</div>
                        </div>
                        <div className="w-full bg-slate-800 rounded-full h-2 mb-2">
                          <div
                            className="h-2 rounded-full bg-cyan-400 transition-all"
                            style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
                          />
                        </div>
                        <div className="text-[10px] text-slate-400">
                          Daily completion builds responsibility points.
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-4 text-xs text-slate-400">
                  Daily completion: {(dailyCompletionPercent * 100).toFixed(0)}%
                </div>
              </div>

              <div className="bg-black/40 backdrop-blur border border-purple-500/30 rounded-lg p-6">
                <h3 className="text-lg font-bold text-purple-300 mb-3">Parent Readiness Goals</h3>
                <div className="space-y-2 text-sm">
                  {readinessReport?.checks.map(check => (
                    <div key={check.id} className={`flex items-center justify-between p-2 rounded ${
                      check.met ? 'bg-green-900/30 border border-green-500/30' : 'bg-slate-900/30 border border-slate-700'
                    }`}>
                      <span className="text-slate-200">{check.label}</span>
                      <span className={check.met ? 'text-green-400' : 'text-slate-500'}>
                        {check.met ? '✅ Met' : '⏳ In progress'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="col-span-1 space-y-4">
              <div className="bg-black/40 backdrop-blur border border-yellow-500/30 rounded-lg p-4">
                <h3 className="text-lg font-bold text-yellow-300 mb-3">
                  🏅 Badges ({gameState.badges ? gameState.badges.length : 0}/{BADGES.length})
                </h3>
                <div className="space-y-2 max-h-[460px] overflow-y-auto">
                  {BADGES.map(badge => {
                    const unlocked = gameState.badges && gameState.badges.includes(badge.id);
                    return (
                      <div
                        key={badge.id}
                        className={`p-2 rounded text-xs transition ${
                          unlocked
                            ? 'bg-yellow-900/30 border border-yellow-500/50'
                            : 'bg-slate-900/30 border border-slate-700 opacity-60'
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-bold">
                            {badge.emoji} {badge.name}
                          </span>
                          {unlocked && <span className="text-green-400">✅</span>}
                        </div>
                        <div className="text-[10px] text-slate-400 mt-1">{badge.description}</div>
                        {!unlocked && badge.reward && (
                          <div className="text-[9px] text-yellow-400 mt-1">
                            Reward: {badge.reward.cash ? `$${badge.reward.cash}` : ''} 
                            {badge.reward.item ? ` ${ROOM_ITEMS[badge.reward.item]?.emoji}` : ''}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="bg-black/40 backdrop-blur border border-blue-500/30 rounded-lg p-4">
                <h3 className="text-sm font-bold text-blue-300 mb-2">Insurance Status</h3>
                <div className="text-xs text-slate-300 mb-3">
                  {gameState.insurance?.active
                    ? `Active (${INSURANCE_PLANS[gameState.insurance.plan].name})`
                    : "Inactive"}
                </div>
                <div className="space-y-2">
                  {Object.entries(INSURANCE_PLANS).map(([key, plan]) => (
                    <button
                      key={key}
                      onClick={() => toggleInsurance(key)}
                      className={`w-full text-left px-3 py-2 rounded text-xs border transition ${
                        gameState.insurance?.active && gameState.insurance?.plan === key
                          ? 'bg-blue-900/40 border-blue-400 text-blue-200'
                          : 'bg-slate-900/40 border-slate-700 text-slate-300 hover:border-blue-400/50'
                      }`}
                    >
                      <div className="font-bold">{plan.name}</div>
                      <div className="text-[10px] text-slate-400">${plan.premium}/day • {plan.description}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PORTFOLIO VIEW */}
        {view === "portfolio" && (
          <div className="space-y-4">
            <div className="bg-black/40 backdrop-blur border border-cyan-500/30 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-cyan-300 mb-6">Portfolio Summary</h2>
              
              <div className="grid grid-cols-4 gap-4 mb-6">
                <MetricCard label="Total Net Worth" value={`$${totalNetWorth.toFixed(0)}`} color="text-purple-400" />
                <MetricCard label="Cash" value={`$${gameState.cash.toFixed(0)}`} color="text-green-400" />
                <MetricCard label="Portfolio Value" value={`$${portfolioValue.toFixed(0)}`} color="text-blue-400" />
                <MetricCard label="Total Spent on Care" value={`$${gameState.totalSpent.toFixed(0)}`} color="text-red-400" />
              </div>

              {/* Holdings Table */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-cyan-300 mb-3">Holdings</h3>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-cyan-500/30">
                      <th className="text-left p-2 text-cyan-400">Stock</th>
                      <th className="text-right p-2 text-cyan-400">Shares</th>
                      <th className="text-right p-2 text-cyan-400">Current Price</th>
                      <th className="text-right p-2 text-cyan-400">Price Bought</th>
                      <th className="text-right p-2 text-cyan-400">% Change</th>
                      <th className="text-right p-2 text-cyan-400">Value</th>
                      <th className="text-right p-2 text-cyan-400">Ethics</th>
                    </tr>
                  </thead>
                  <tbody>
                    {gameState.stocks.filter(s => s.owned > 0).map(stock => {
                      const costBasis = getCostBasis(stock.id);
                      const avgCost = costBasis.avgCost;
                      const changePct = avgCost > 0 ? ((stock.price - avgCost) / avgCost) * 100 : null;
                      
                      return (
                        <tr key={stock.id} className="border-b border-slate-700/30">
                        <td className="p-2">
                          <div className="font-bold text-cyan-300">{stock.id}</div>
                          <div className="text-xs text-slate-400">{stock.name}</div>
                        </td>
                        <td className="p-2 text-right">{stock.owned}</td>
                        <td className="p-2 text-right">${stock.price.toFixed(2)}</td>
                        <td className="p-2 text-right">
                          {avgCost > 0 ? `$${avgCost.toFixed(2)}` : '—'}
                        </td>
                        <td className={`p-2 text-right font-bold ${
                          changePct === null ? 'text-slate-500' :
                          changePct > 0 ? 'text-green-400' :
                          changePct < 0 ? 'text-red-400' :
                          'text-slate-400'
                        }`}>
                          {changePct === null ? '—' : `${changePct > 0 ? '+' : ''}${changePct.toFixed(2)}%`}
                        </td>
                        <td className="p-2 text-right font-bold">${(stock.owned * stock.price).toFixed(2)}</td>
                        <td className="p-2 text-right">
                          <span className={
                            stock.ethicalRating > 70 ? "text-green-400" :
                            stock.ethicalRating > 40 ? "text-yellow-400" :
                            "text-orange-400"
                          }>
                            {stock.ethicalRating}
                          </span>
                        </td>
                      </tr>
                      );
                    })}
                    {gameState.stocks.filter(s => s.owned > 0).length === 0 && (
                      <tr>
                        <td colSpan={7} className="p-4 text-center text-slate-500">
                          No holdings yet
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Recent Transactions */}
              <div>
                <h3 className="text-lg font-bold text-cyan-300 mb-3">Recent Transactions</h3>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {gameState.transactions.slice(-10).reverse().map((tx, i) => (
                    <div key={i} className="bg-slate-900/50 p-3 rounded flex items-center justify-between text-sm">
                      <div className="flex items-center gap-3">
                        <span className={tx.type === 'BUY' ? 'text-green-400' : 'text-red-400'}>
                          {tx.type}
                        </span>
                        <span>{tx.amount} {tx.stock}</span>
                        <span className="text-slate-500">@ ${tx.price.toFixed(2)}</span>
                      </div>
                      <div>
                        <span className="text-slate-400">Day {tx.day}</span>
                        <span className="ml-3 font-bold">${tx.total.toFixed(2)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ANALYTICS VIEW */}
        {view === "analytics" && (
          <div className="space-y-4">
            <div className="bg-black/40 backdrop-blur border border-cyan-500/30 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-cyan-300 mb-6">Analytics Dashboard</h2>
              
              {gameState.history.length > 1 ? (
                <div className="space-y-8">
                  <div>
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-4">
                      <h3 className="text-lg font-bold text-cyan-400">
                        {analyticsChartMode === "financial" ? "Financial Performance" : "Pet Wellbeing vs Financial State"}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-slate-300">
                        <span>Chart</span>
                        <select
                          value={analyticsChartMode}
                          onChange={(event) => setAnalyticsChartMode(event.target.value)}
                          className="bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-slate-200 focus:outline-none focus:border-cyan-400"
                        >
                          <option value="financial">Financial Performance</option>
                          <option value="pet">Pet Wellbeing</option>
                        </select>
                      </div>
                    </div>

                    {analyticsChartMode === "financial" ? (
                      <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={gameState.history}>
                          <defs>
                            <linearGradient id="netWorth" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                              <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                          <XAxis dataKey="day" stroke="#64748b" />
                          <YAxis stroke="#64748b" />
                          <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #22d3ee' }} />
                          <Area type="monotone" dataKey="netWorth" stroke="#a855f7" fillOpacity={1} fill="url(#netWorth)" />
                          <Area type="monotone" dataKey="cash" stroke="#22c55e" fillOpacity={0.3} />
                          <Area type="monotone" dataKey="portfolioValue" stroke="#3b82f6" fillOpacity={0.3} />
                        </AreaChart>
                      </ResponsiveContainer>
                    ) : (
                      <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={gameState.history}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                          <XAxis dataKey="day" stroke="#64748b" />
                          <YAxis stroke="#64748b" />
                          <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #22d3ee' }} />
                          <Legend />
                          <Line type="monotone" dataKey="health" stroke="#ef4444" strokeWidth={2} />
                          <Line type="monotone" dataKey="happiness" stroke="#facc15" strokeWidth={2} />
                          <Line type="monotone" dataKey="financialAwareness" stroke="#a855f7" strokeWidth={2} />
                          <Line type="monotone" dataKey="trust" stroke="#ec4899" strokeWidth={2} />
                        </LineChart>
                      </ResponsiveContainer>
                    )}
                  </div>

                  {/* Key Metrics */}
                  <div className="grid grid-cols-5 gap-4">
                    <MetricCard
                      label="Avg Health"
                      value={(gameState.history.reduce((sum, h) => sum + h.health, 0) / gameState.history.length).toFixed(1)}
                      color="text-red-400"
                    />
                    <MetricCard
                      label="Avg Happiness"
                      value={(gameState.history.reduce((sum, h) => sum + h.happiness, 0) / gameState.history.length).toFixed(1)}
                      color="text-yellow-400"
                    />
                    <MetricCard
                      label="Avg Trust"
                      value={(gameState.history.reduce((sum, h) => sum + h.trust, 0) / gameState.history.length).toFixed(1)}
                      color="text-pink-400"
                    />
                    <MetricCard
                      label="Ethics Score"
                      value={gameState.ethicsScore}
                      color="text-green-400"
                    />
                    <MetricCard
                      label="ROI"
                      value={`${((totalNetWorth - STARTING_CASH) / STARTING_CASH * 100).toFixed(1)}%`}
                      color={totalNetWorth > STARTING_CASH ? "text-green-400" : "text-red-400"}
                    />
                  </div>

                  {/* Predictions & Alerts */}
                  <div className="bg-yellow-900/30 border border-yellow-500/30 rounded p-4">
                    <h3 className="text-lg font-bold text-yellow-400 mb-3 flex items-center gap-2">
                      <AlertTriangle size={20} />
                      Predictive Analysis & Alerts
                    </h3>
                    <div className="text-sm space-y-2">
                      {gameState.pet.health < 40 && (
                        <div className="text-red-300">⚠️ Critical health - emergency risk high</div>
                      )}
                      {totalNetWorth < STARTING_CASH * 0.5 && (
                        <div className="text-orange-300">⚠️ Net worth below 50% of starting capital</div>
                      )}
                      {gameState.pet.stress > 70 && (
                        <div className="text-purple-300">⚠️ High stress levels affecting pet decisions</div>
                      )}
                      {gameState.market.volatilityIndex > 1.3 && (
                        <div className="text-cyan-300">⚠️ Extreme market volatility - risks elevated</div>
                      )}
                      {gameState.pet.memory.daysInStress > 5 && (
                        <div className="text-red-300">⚠️ Prolonged financial stress - long-term pet impact</div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center text-cyan-300/50 py-12">
                  Play several days to generate analytics
                </div>
              )}
            </div>
          </div>
        )}

        {/* TIMELINES VIEW */}
        {view === "timelines" && (
          <div className="space-y-4">
            <div className="bg-black/40 backdrop-blur border border-cyan-500/30 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-cyan-300 mb-6">Parallel Timeline Comparison</h2>
              
              {timelines.length === 0 ? (
                <div className="text-center text-cyan-300/50 py-12">
                  No timelines saved. Play and click "Save" to create timeline checkpoints for comparison.
                </div>
              ) : (
                <>
                  {/* Comparison Table */}
                  <div className="overflow-x-auto mb-6">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-cyan-500/30">
                          <th className="text-left p-3 text-cyan-400">Timeline</th>
                          <th className="text-right p-3 text-cyan-400">Days</th>
                          <th className="text-right p-3 text-cyan-400">Net Worth</th>
                          <th className="text-right p-3 text-cyan-400">Portfolio</th>
                          <th className="text-right p-3 text-cyan-400">Spent</th>
                          <th className="text-right p-3 text-cyan-400">Avg Health</th>
                          <th className="text-right p-3 text-cyan-400">Avg Happiness</th>
                          <th className="text-right p-3 text-cyan-400">Ethics</th>
                          <th className="text-left p-3 text-cyan-400">Evolution</th>
                          <th className="text-center p-3 text-cyan-400">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {timelines.map((timeline) => (
                          <tr key={timeline.id} className="border-b border-slate-700/30 hover:bg-cyan-900/10">
                            <td className="p-3 font-bold text-cyan-300">{timeline.name}</td>
                            <td className="p-3 text-right">{timeline.finalDay}</td>
                            <td className="p-3 text-right font-bold text-purple-400">${timeline.finalNetWorth.toFixed(0)}</td>
                            <td className="p-3 text-right text-blue-400">${timeline.finalPortfolio.toFixed(0)}</td>
                            <td className="p-3 text-right text-red-400">${timeline.totalSpent.toFixed(0)}</td>
                            <td className="p-3 text-right">{timeline.avgHealth.toFixed(1)}</td>
                            <td className="p-3 text-right">{timeline.avgHappiness.toFixed(1)}</td>
                            <td className="p-3 text-right text-green-400">{timeline.ethicsScore}</td>
                            <td className="p-3">{timeline.evolution}</td>
                            <td className="p-3 text-center">
                              <button
                                onClick={() => loadTimeline(timeline)}
                                className="bg-cyan-600 hover:bg-cyan-500 px-3 py-1 rounded text-xs transition"
                              >
                                Load
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Visual Comparison */}
                  {timelines.length >= 2 && (
                    <div>
                      <h3 className="text-lg font-bold text-cyan-400 mb-4">Outcome Comparison</h3>
                      <ResponsiveContainer width="100%" height={350}>
                        <BarChart data={timelines.map(t => ({
                          name: t.name,
                          netWorth: t.finalNetWorth,
                          health: t.avgHealth,
                          happiness: t.avgHappiness,
                          ethics: t.ethicsScore
                        }))}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                          <XAxis dataKey="name" stroke="#64748b" />
                          <YAxis stroke="#64748b" />
                          <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #22d3ee' }} />
                          <Legend />
                          <Bar dataKey="health" fill="#ef4444" />
                          <Bar dataKey="happiness" fill="#facc15" />
                          <Bar dataKey="ethics" fill="#22c55e" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-black/60 backdrop-blur border-t border-cyan-500/30 p-4 mt-8">
        <div className="max-w-[1600px] mx-auto text-center text-xs text-cyan-300/60">
          <div className="mb-1 font-bold text-cyan-300">
            PAWSTREET - Virtual Pet Market Simulation
          </div>
          <div>
            Fictional Market | Autonomous Pet Logic | Dynamic Care Costs | Memory System | Ethical Investing | Parallel Timelines
          </div>
          <div className="mt-2 text-cyan-400/40">
            Educational simulation only. Not financial advice. All companies and markets are fictional.
          </div>
        </div>
      </div>

      {/* Disclaimer for game screen */}
      <div className="bg-black/40 backdrop-blur border-t border-cyan-500/20 p-3 text-center text-xs text-slate-500">
        Educational simulation • Not financial advice • All markets are fictional
      </div>
    </div>
  );
}

// ============================================================================
// MINIGAME COMPONENTS
// ============================================================================
// Minigames provide an active break from finance and directly boost pet stats.
// They are quick, skill-based, and designed for easy judge demos.

/**
 * Catch Minigame: click falling treats before time runs out.
 * Rewards quick reaction and provides a fun, low-pressure break.
 *
 * @param {Object} props
 * @param {Function} props.onComplete - Callback called with win/loss outcome
 */
function CatchMinigame({ onComplete }) {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [items, setItems] = useState([]);
  const [gameActive, setGameActive] = useState(true);

  // Timer loop: ends the game at 0 seconds.
  // Dependencies: timeLeft (countdown), score (win condition on end).
  useEffect(() => {
    if (timeLeft <= 0) {
      setGameActive(false);
      onComplete(score >= 5); // Need 5+ catches to win
      return;
    }

    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  // Spawn loop: creates new falling items while game is active.
  // Dependencies: items (cap at 3), gameActive (pause when done).
  useEffect(() => {
    if (!gameActive) return;

    const interval = setInterval(() => {
      if (items.length < 3) {
        const newItem = {
          id: Date.now(),
          x: Math.random() * 80,
          emoji: ['🦴', '🐟', '🥩'][Math.floor(Math.random() * 3)]
        };
        setItems(prev => [...prev, newItem]);
      }
    }, 1500);

    return () => clearInterval(interval);
  }, [items, gameActive]);

  const catchItem = (id) => {
    setScore(score + 1);
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-gradient-to-br from-purple-900 to-blue-900 p-8 rounded-2xl border-2 border-purple-400 max-w-2xl w-full">
        <h2 className="text-3xl font-bold text-center mb-4 text-purple-200">🎾 Catch the Treats!</h2>
        
        <div className="flex justify-between mb-6 text-xl">
          <div className="text-green-400">Score: {score}</div>
          <div className="text-orange-400">Time: {timeLeft}s</div>
        </div>

        <div className="relative h-96 bg-gradient-to-b from-sky-400 to-sky-200 rounded-xl overflow-hidden border-4 border-purple-500">
          {items.map(item => (
            <div
              key={item.id}
              onClick={() => catchItem(item.id)}
              className="absolute text-6xl cursor-pointer hover:scale-125 transition-transform animate-fall"
              style={{ left: `${item.x}%`, top: '0%' }}
            >
              {item.emoji}
            </div>
          ))}
        </div>

        <div className="text-center mt-4 text-purple-200">
          Click the falling treats! Need 5+ to win
        </div>
      </div>

      <style jsx>{`
        @keyframes fall {
          from { transform: translateY(0); }
          to { transform: translateY(400px); }
        }
        .animate-fall {
          animation: fall 3s linear forwards;
        }
      `}</style>
    </div>
  );
}

/**
 * Memory Minigame: match pairs of cards in limited moves.
 * Encourages focus and rewards the player with pet happiness/trust.
 *
 * @param {Object} props
 * @param {Function} props.onComplete - Callback called with win/loss outcome
 */
function MemoryMinigame({ onComplete }) {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);
  const [gameActive, setGameActive] = useState(true);

  // One-time setup: shuffle deck at start.
  useEffect(() => {
    const emojis = ['🐶', '🐱', '🐰', '🐹', '🐠', '🦊'];
    const deck = [...emojis, ...emojis]
      .sort(() => Math.random() - 0.5)
      .map((emoji, idx) => ({ id: idx, emoji, matched: false }));
    setCards(deck);
  }, []);

  // Win condition check: all cards matched within move limit.
  // Dependencies: matched (progress), moves (limit), cards (total count).
  useEffect(() => {
    if (matched.length === cards.length && cards.length > 0) {
      setGameActive(false);
      onComplete(moves <= 15); // 15 moves keeps difficulty fair for demo
    }
  }, [matched, moves, cards]);

  const flipCard = (id) => {
    if (flipped.length === 2 || flipped.includes(id) || matched.includes(id)) return;

    const newFlipped = [...flipped, id];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(moves + 1);
      const [first, second] = newFlipped;
      
      if (cards[first].emoji === cards[second].emoji) {
        setMatched([...matched, first, second]);
        setFlipped([]);
      } else {
        setTimeout(() => setFlipped([]), 1000);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-gradient-to-br from-pink-900 to-purple-900 p-8 rounded-2xl border-2 border-pink-400 max-w-2xl w-full">
        <h2 className="text-3xl font-bold text-center mb-4 text-pink-200">🧠 Memory Match!</h2>
        
        <div className="text-center mb-6 text-xl text-pink-200">
          Moves: {moves} (Win in 15 or less!)
        </div>

        <div className="grid grid-cols-4 gap-3">
          {cards.map((card) => (
            <button
              key={card.id}
              onClick={() => flipCard(card.id)}
              className={`h-24 text-5xl rounded-xl border-4 transition-all transform ${
                flipped.includes(card.id) || matched.includes(card.id)
                  ? 'bg-white border-pink-400'
                  : 'bg-pink-700 border-pink-500 hover:scale-105'
              }`}
            >
              {flipped.includes(card.id) || matched.includes(card.id) ? card.emoji : '?'}
            </button>
          ))}
        </div>

        <div className="text-center mt-4 text-pink-200">
          Match all pairs to win!
        </div>
      </div>
    </div>
  );
}

/**
 * Reaction Minigame: click as soon as the "GO" signal appears.
 * Tests reflexes and adds a fun, fast-paced challenge.
 *
 * @param {Object} props
 * @param {Function} props.onComplete - Callback called with win/loss outcome
 */
function ReactionMinigame({ onComplete }) {
  const [stage, setStage] = useState('waiting'); // waiting, ready, go, clicked
  const [startTime, setStartTime] = useState(0);
  const [reactionTime, setReactionTime] = useState(0);
  const [attempts, setAttempts] = useState(0);

  // Randomized delay keeps players from timing the click.
  useEffect(() => {
    if (stage === 'waiting') {
      const delay = Math.random() * 3000 + 2000; // 2-5 seconds = fair but unpredictable
      const timer = setTimeout(() => {
        setStage('go');
        setStartTime(Date.now());
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [stage]);

  const handleClick = () => {
    if (stage === 'waiting') {
      setStage('too-early');
      setTimeout(() => {
        setAttempts(attempts + 1);
        if (attempts >= 2) {
          onComplete(false);
        } else {
          setStage('waiting');
        }
      }, 1500);
    } else if (stage === 'go') {
      const time = Date.now() - startTime;
      setReactionTime(time);
      setStage('clicked');
      setTimeout(() => {
        onComplete(time < 600); // 600ms is challenging but reachable
      }, 1500);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-gradient-to-br from-orange-900 to-red-900 p-8 rounded-2xl border-2 border-orange-400 max-w-2xl w-full">
        <h2 className="text-3xl font-bold text-center mb-4 text-orange-200">⚡ Quick Paws!</h2>
        
        <button
          onClick={handleClick}
          className={`w-full h-96 rounded-xl text-6xl font-bold transition-all ${
            stage === 'waiting' ? 'bg-red-600 hover:bg-red-500' :
            stage === 'go' ? 'bg-green-500 hover:bg-green-400' :
            stage === 'too-early' ? 'bg-yellow-600' :
            'bg-blue-600'
          }`}
        >
          {stage === 'waiting' && '🔴 Wait...'}
          {stage === 'go' && '🟢 CLICK NOW!'}
          {stage === 'too-early' && '⚠️ Too Early!'}
          {stage === 'clicked' && `⚡ ${reactionTime}ms`}
        </button>

        <div className="text-center mt-4 text-orange-200">
          {stage === 'waiting' && 'Wait for green, then click as fast as you can!'}
          {stage === 'go' && 'GO GO GO!'}
          {stage === 'too-early' && `Attempt ${attempts + 1}/3 - Wait for green!`}
          {stage === 'clicked' && reactionTime < 600 ? '🎉 Amazing reflexes!' : '😅 Not quite fast enough'}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// WHEEL OF FORTUNE COMPONENT
// ============================================================================

function WheelOfFortune({ onSpin }) {
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState(null);
  const [rotation, setRotation] = useState(0);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const spin = () => {
    if (spinning) return;
    
    setSpinning(true);
    setResult(null);
    
    // Pick random event
    const event = spinWheel();
    setSelectedEvent(event);
    
    // Calculate where to stop (which segment)
    const eventIndex = WHEEL_EVENTS.indexOf(event);
    const segmentAngle = 360 / WHEEL_EVENTS.length;
    const targetAngle = eventIndex * segmentAngle;
    
    // Add multiple spins + land on target segment
    const spins = 5 + Math.random() * 3; // 5-8 full rotations
    const finalRotation = (360 * spins) + targetAngle + (segmentAngle / 2);
    
    setRotation(finalRotation);

    setTimeout(() => {
      setResult(event);
      setSpinning(false);
      
      setTimeout(() => {
        onSpin(event);
      }, 3000);
    }, 4000); // Match CSS animation duration
  };

  const segmentAngle = 360 / WHEEL_EVENTS.length;

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-purple-900 to-pink-900 p-8 rounded-2xl border-4 border-yellow-400 max-w-4xl w-full shadow-2xl">
        <h1 className="text-5xl font-bold text-center mb-6 text-yellow-300 animate-pulse">
          🎡 WHEEL OF FORTUNE 🎡
        </h1>
        
        <p className="text-center text-xl text-purple-200 mb-6">
          Weekly event! Spin to see what happens...
        </p>

        <div className="relative flex items-center justify-center mb-8">
          {/* Outer glow ring */}
          <div className="absolute w-[420px] h-[420px] rounded-full bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-400 animate-spin-slow opacity-50 blur-xl"></div>
          
          {/* Wheel container */}
          <div className="relative w-96 h-96">
            {/* Pointer/Arrow at top */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-8 z-20">
              <div className="relative">
                <div className="w-0 h-0 border-l-[25px] border-l-transparent border-r-[25px] border-r-transparent border-t-[50px] border-t-red-600 drop-shadow-2xl"></div>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-yellow-400 rounded-full border-2 border-red-600"></div>
              </div>
            </div>

            {/* Spinning wheel */}
            <div 
              className={`w-full h-full rounded-full border-8 border-yellow-400 shadow-2xl relative overflow-hidden ${
                spinning ? 'spinning-wheel' : ''
              }`}
              style={{
                transform: `rotate(${rotation}deg)`,
                transition: spinning ? 'transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)' : 'none'
              }}
            >
              {/* Wheel segments */}
              {WHEEL_EVENTS.map((event, index) => {
                const startAngle = index * segmentAngle;
                const colors = [
                  '#ef4444', '#f97316', '#eab308', '#22c55e', 
                  '#3b82f6', '#8b5cf6', '#ec4899', '#ef4444',
                  '#f97316', '#eab308', '#22c55e', '#3b82f6'
                ];
                
                // Calculate the two points for the pie slice using actual angles
                const radius = 192; // Half of wheel (384px / 2)
                const angle1 = (startAngle * Math.PI) / 180;
                const angle2 = ((startAngle + segmentAngle) * Math.PI) / 180;
                
                // SVG path for a perfect pie slice
                const x1 = Math.cos(angle1) * radius;
                const y1 = Math.sin(angle1) * radius;
                const x2 = Math.cos(angle2) * radius;
                const y2 = Math.sin(angle2) * radius;
                
                const largeArcFlag = segmentAngle > 180 ? 1 : 0;
                
                const pathData = `
                  M 0,0
                  L ${x1},${y1}
                  A ${radius},${radius} 0 ${largeArcFlag} 1 ${x2},${y2}
                  Z
                `;
                
                return (
                  <div
                    key={index}
                    className="absolute top-1/2 left-1/2 w-full h-full"
                    style={{
                      transform: 'translate(-50%, -50%)'
                    }}
                  >
                    {/* Segment slice using SVG for perfect pie shape */}
                    <svg
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                      width="384"
                      height="384"
                      viewBox="-192 -192 384 384"
                    >
                      <path
                        d={pathData}
                        fill={colors[index]}
                        stroke="#00000020"
                        strokeWidth="1"
                      />
                    </svg>
                    
                    {/* Event text - horizontal, centered in wedge */}
                    <div
                      className="absolute left-1/2 top-1/2 pointer-events-none"
                      style={{
                        transform: `rotate(${startAngle + segmentAngle / 2}deg)`,
                        transformOrigin: '0 0'
                      }}
                    >
                      <div 
                        className="text-white font-bold text-xs drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] whitespace-nowrap"
                        style={{
                          position: 'absolute',
                          left: '70px',
                          top: '-6px',
                          transform: 'translateY(-50%)'
                        }}
                      >
                        {event.name.split(' ').slice(1).join(' ')}
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Center circle */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center z-10">
                <div className="text-2xl">🎰</div>
              </div>
            </div>

            {/* Tick marks around wheel */}
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute top-1/2 left-1/2 w-1 h-8 bg-white origin-bottom"
                style={{
                  transform: `translate(-50%, -100%) rotate(${i * 30}deg) translateY(-200px)`
                }}
              />
            ))}
          </div>
        </div>

        {result ? (
          <div className={`text-center p-6 rounded-xl border-4 mb-4 animate-bounce ${
            result.color === 'green' ? 'bg-green-900/50 border-green-400' :
            result.color === 'red' ? 'bg-red-900/50 border-red-400' :
            result.color === 'blue' ? 'bg-blue-900/50 border-blue-400' :
            result.color === 'orange' ? 'bg-orange-900/50 border-orange-400' :
            'bg-gray-900/50 border-gray-400'
          }`}>
            <h2 className="text-4xl font-bold mb-3 text-white">{result.name}</h2>
            <p className="text-2xl text-white">{result.message}</p>
          </div>
        ) : !spinning && (
          <button
            onClick={spin}
            className="w-full py-6 rounded-xl text-2xl font-bold transition-all bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 transform hover:scale-105 shadow-lg"
          >
            🎰 SPIN THE WHEEL!
          </button>
        )}

        {spinning && (
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-300 animate-pulse">
              🌀 SPINNING... 🌀
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
      `}</style>
    </div>
  );
}

// ============================================================================
// PET VISUAL COMPONENT
// ============================================================================

function PetVisual({ pet }) {
  const getEmotionalState = () => {
    const happiness = pet.happiness;
    const stress = pet.stress;
    const health = pet.health;
    const trust = pet.trust;
    const energy = pet.energy;
    const hunger = 100 - pet.hunger;
    
    // Critical takes priority
    if (health < 30) return 'critical';
    
    // If ANY stat is below 50, pet is not happy
    if (health < 50 || happiness < 50 || trust < 50 || energy < 50 || hunger < 50) {
      if (stress > 60) return 'stressed';
      if (trust < 40) return 'mad';
      return 'sad';
    }
    
    // All stats good
    if (happiness > 70 && health > 70 && stress < 30) return 'happy';
    return 'neutral';
  };

  const state = getEmotionalState();
  
  const petGraphics = {
    happy: {
      bg: 'from-yellow-400/20 to-orange-400/20',
      border: 'border-yellow-400/50',
      glow: 'shadow-yellow-400/30',
      particles: ['✨', '💛', '⭐']
    },
    neutral: {
      bg: 'from-blue-400/20 to-cyan-400/20',
      border: 'border-cyan-400/50',
      glow: 'shadow-cyan-400/30',
      particles: ['·', '·', '·']
    },
    sad: {
      bg: 'from-slate-600/20 to-slate-700/20',
      border: 'border-slate-500/50',
      glow: 'shadow-slate-500/30',
      particles: ['💧', '😢', '💔']
    },
    mad: {
      bg: 'from-red-600/20 to-orange-600/20',
      border: 'border-red-500/50',
      glow: 'shadow-red-500/30',
      particles: ['💢', '😠', '⚡']
    },
    stressed: {
      bg: 'from-orange-600/20 to-red-600/20',
      border: 'border-orange-500/50',
      glow: 'shadow-orange-500/30',
      particles: ['⚡', '💢', '😰']
    },
    critical: {
      bg: 'from-red-600/20 to-red-800/20',
      border: 'border-red-500/50',
      glow: 'shadow-red-500/50',
      particles: ['💔', '⚠️', '🆘']
    }
  };

  const current = petGraphics[state];
  const breedEmoji = PET_BREEDS[pet.breed]?.emoji || '🐾';
  const roomItemPositions = [
    { top: '8%', left: '10%' },
    { top: '12%', right: '12%' },
    { bottom: '18%', left: '12%' },
    { bottom: '20%', right: '12%' },
    { top: '45%', left: '4%' },
    { top: '45%', right: '4%' }
  ];
  const ownedItems = (pet.roomItems || []).slice(0, roomItemPositions.length);

  return (
    <div className={`relative bg-gradient-to-br ${current.bg} border-2 ${current.border} rounded-2xl p-8 shadow-2xl ${current.glow}`}>
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
        {current.particles.map((particle, i) => (
          <div
            key={i}
            className="absolute text-2xl animate-float"
            style={{
              left: `${20 + i * 30}%`,
              top: `${10 + i * 15}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + i}s`
            }}
          >
            {particle}
          </div>
        ))}
      </div>

      {/* Room items (visual reward + interaction cue) */}
      {ownedItems.map((itemKey, index) => {
        const item = ROOM_ITEMS[itemKey];
        const position = roomItemPositions[index];
        if (!item) return null;
        return (
          <div
            key={itemKey}
            className="absolute text-2xl opacity-80 animate-float"
            style={{ ...position, animationDelay: `${index * 0.6}s` }}
            title={item.name}
          >
            {item.emoji}
          </div>
        );
      })}

      {/* Pet body */}
      <div className="relative z-10 flex flex-col items-center gap-4">
        {/* Animated Pet Emoji */}
        <div className="relative">
          <div 
            className="text-8xl animate-bounce-slow filter drop-shadow-2xl transition-transform duration-1000"
            style={{ transform: `scale(${pet.size || 1.0})` }}
          >
            {breedEmoji}
          </div>
        </div>

        {/* Name tag */}
        <div className="mt-2 bg-black/40 backdrop-blur px-4 py-2 rounded-full border border-white/20">
          <span className="text-sm font-bold text-white">{pet.name}</span>
        </div>

        {/* Emotional state badge */}
        <div className={`mt-2 px-3 py-1 rounded-full text-xs font-bold ${
          state === 'happy' ? 'bg-yellow-500/30 text-yellow-200' :
          state === 'neutral' ? 'bg-cyan-500/30 text-cyan-200' :
          state === 'sad' ? 'bg-slate-500/30 text-slate-200' :
          state === 'mad' ? 'bg-red-500/30 text-red-200' :
          state === 'stressed' ? 'bg-orange-500/30 text-orange-200' :
          'bg-red-500/30 text-red-200'
        }`}>
          {state.toUpperCase()}
        </div>

        {/* Market influence indicator */}
        <div className="mt-4 text-center">
          <div className="text-xs text-white/60 mb-1">Market Influence</div>
          <div className={`text-sm font-bold ${
            getPetEmotionalState(pet).influence > 0 ? 'text-green-400' :
            getPetEmotionalState(pet).influence < 0 ? 'text-red-400' :
            'text-slate-400'
          }`}>
            {getPetEmotionalState(pet).influence > 0 ? '📈' : '📉'} {getPetEmotionalState(pet).message}
          </div>
        </div>
      </div>

      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/5 rounded-2xl pointer-events-none"></div>
    </div>
  );
}

// ============================================================================
// TUTORIAL & HELP COMPONENTS
// ============================================================================

function TutorialPanel({
  gameState,
  timelines,
  setView,
  tutorialStepIndex,
  setTutorialStepIndex,
  tutorialOverrides,
  setTutorialOverrides
}) {
  const steps = TUTORIAL_STEPS;
  const isComplete = (step) => {
    const autoComplete = step.check ? step.check({ gameState, timelines }) : false;
    return tutorialOverrides[step.id] || autoComplete;
  };
  const completedCount = steps.filter(isComplete).length;
  const progress = Math.round((completedCount / steps.length) * 100);
  const safeIndex = Math.min(tutorialStepIndex, steps.length - 1);
  const currentStep = steps[safeIndex];
  const currentComplete = isComplete(currentStep);

  const handleMarkComplete = () => {
    setTutorialOverrides(prev => ({ ...prev, [currentStep.id]: true }));
  };

  const handleReset = () => {
    setTutorialOverrides({});
    setTutorialStepIndex(0);
  };

  const handleJumpNext = () => {
    const nextIndex = steps.findIndex(step => !isComplete(step));
    setTutorialStepIndex(nextIndex === -1 ? 0 : nextIndex);
  };

  const progressText = currentStep.progress
    ? currentStep.progress({ gameState, timelines })
    : null;

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="col-span-1 space-y-4">
        <div className="bg-black/40 backdrop-blur border border-cyan-500/30 rounded-lg p-4">
          <h2 className="text-xl font-bold text-cyan-300 mb-2">Interactive Tutorial</h2>
          <div className="text-xs text-slate-400 mb-3">
            Progress: {completedCount}/{steps.length} steps complete
          </div>
          <div className="w-full bg-slate-800 rounded-full h-2 mb-4">
            <div
              className="h-2 rounded-full bg-cyan-500 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="space-y-2">
            {steps.map((step, index) => {
              const done = isComplete(step);
              return (
                <button
                  key={step.id}
                  onClick={() => setTutorialStepIndex(index)}
                  className={`w-full text-left p-2 rounded border transition ${
                    index === safeIndex
                      ? 'bg-cyan-900/40 border-cyan-500/60'
                      : 'bg-slate-900/40 border-slate-700/60 hover:border-cyan-400/40'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-bold text-slate-200">
                    <span>{index + 1}. {step.title}</span>
                    <span>{done ? '✅' : '⏳'}</span>
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1">
                    {done ? "Complete" : "In progress"}
                  </div>
                </button>
              );
            })}
          </div>
          <div className="mt-4 space-y-2">
            <button
              onClick={handleJumpNext}
              className="w-full px-3 py-2 rounded text-xs bg-slate-800 hover:bg-slate-700 transition"
            >
              Jump to next incomplete
            </button>
            <button
              onClick={handleReset}
              className="w-full px-3 py-2 rounded text-xs bg-slate-900 hover:bg-slate-800 transition"
            >
              Reset tutorial
            </button>
          </div>
        </div>
      </div>

      <div className="col-span-2">
        <div className="bg-black/40 backdrop-blur border border-purple-500/30 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-bold text-purple-300">
              Step {safeIndex + 1}: {currentStep.title}
            </h3>
            {currentComplete && (
              <span className="text-xs font-bold text-green-400">Completed</span>
            )}
          </div>
          <p className="text-sm text-slate-200 mb-4">{currentStep.description}</p>
          {progressText && (
            <div className="text-xs text-cyan-200 mb-4">
              Progress: {progressText}
            </div>
          )}
          <div className="flex items-center gap-3">
            {currentStep.action && (
              <button
                onClick={() => setView(currentStep.action.view)}
                className="px-4 py-2 rounded text-sm font-bold bg-cyan-600 hover:bg-cyan-500 transition"
              >
                {currentStep.action.label}
              </button>
            )}
            {!currentComplete && (
              <button
                onClick={handleMarkComplete}
                className="px-4 py-2 rounded text-sm font-bold bg-emerald-600 hover:bg-emerald-500 transition"
              >
                Mark complete
              </button>
            )}
            <button
              onClick={() => setTutorialStepIndex(Math.max(0, safeIndex - 1))}
              className="px-4 py-2 rounded text-sm bg-slate-800 hover:bg-slate-700 transition"
            >
              Back
            </button>
            <button
              onClick={() => setTutorialStepIndex(Math.min(steps.length - 1, safeIndex + 1))}
              className="px-4 py-2 rounded text-sm bg-slate-800 hover:bg-slate-700 transition"
            >
              Next
            </button>
          </div>
          <div className="mt-6 bg-slate-900/50 border border-slate-700/50 rounded-lg p-4 text-xs text-slate-300">
            Tip: Use the Help tab if you want quick answers or shortcuts to specific screens.
          </div>
        </div>
      </div>
    </div>
  );
}

function HelpChat({ gameState, setView, helpMessages, setHelpMessages }) {
  const [draft, setDraft] = useState("");
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [helpMessages]);

  const sendMessage = (text) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const userMessage = {
      id: `${Date.now()}-user-${Math.random()}`,
      from: "user",
      text: trimmed
    };

    const reply = getHelpResponse(trimmed, gameState);
    const botMessage = {
      id: `${Date.now()}-bot-${Math.random()}`,
      from: "bot",
      text: reply.text,
      viewAction: reply.viewAction
    };

    setHelpMessages(prev => [...prev, userMessage, botMessage]);
    setDraft("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendMessage(draft);
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="col-span-2 space-y-4">
        <div className="bg-black/40 backdrop-blur border border-cyan-500/30 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xl font-bold text-cyan-300">Help Chatbot</h2>
            <button
              onClick={() => setHelpMessages(createHelpWelcomeMessages())}
              className="px-3 py-1 rounded text-xs bg-slate-800 hover:bg-slate-700 transition"
            >
              Clear chat
            </button>
          </div>

          <div className="h-[420px] overflow-y-auto space-y-3 pr-2">
            {helpMessages.map(message => (
              <div
                key={message.id}
                className={`flex ${message.from === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${
                    message.from === "user"
                      ? "bg-cyan-600 text-white"
                      : "bg-slate-900/70 text-slate-200 border border-slate-700/60"
                  }`}
                >
                  <div className="whitespace-pre-wrap">{message.text}</div>
                  {message.viewAction && message.from === "bot" && (
                    <button
                      onClick={() => setView(message.viewAction.view)}
                      className="mt-2 inline-flex px-2 py-1 rounded text-[11px] bg-cyan-600 hover:bg-cyan-500 transition"
                    >
                      {message.viewAction.label}
                    </button>
                  )}
                </div>
              </div>
            ))}
            <div ref={endRef} />
          </div>

          <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
            <input
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder="Ask a question about care, trading, or evolution..."
              className="flex-1 bg-slate-900 border border-slate-700 rounded px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded text-sm font-bold bg-cyan-600 hover:bg-cyan-500 transition"
            >
              Send
            </button>
          </form>
        </div>
      </div>

      <div className="col-span-1 space-y-4">
        <div className="bg-black/40 backdrop-blur border border-purple-500/30 rounded-lg p-4">
          <h3 className="text-sm font-bold text-purple-300 mb-3">Quick Prompts</h3>
          <div className="space-y-2">
            {HELP_QUICK_PROMPTS.map(prompt => (
              <button
                key={prompt}
                onClick={() => sendMessage(prompt)}
                className="w-full text-left text-xs px-3 py-2 rounded bg-slate-900/60 border border-slate-700/60 hover:border-purple-400/60 transition"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-black/40 backdrop-blur border border-emerald-500/30 rounded-lg p-4">
          <h3 className="text-sm font-bold text-emerald-300 mb-3">Live Snapshot</h3>
          <div className="text-xs text-slate-300 space-y-2">
            <div className="flex justify-between">
              <span>Day</span>
              <span>{gameState.day}</span>
            </div>
            <div className="flex justify-between">
              <span>Cash</span>
              <span>${gameState.cash.toFixed(0)}</span>
            </div>
            <div className="flex justify-between">
              <span>Pet Mood</span>
              <span>{gameState.pet.evolution}</span>
            </div>
          </div>
          <button
            onClick={() => setView("pet")}
            className="mt-3 w-full px-3 py-2 rounded text-xs bg-emerald-600 hover:bg-emerald-500 transition"
          >
            Open Pet
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// HELPER COMPONENTS
// ============================================================================

function NavButton({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded text-sm transition flex items-center gap-1.5 ${
        active ? 'bg-cyan-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
      }`}
    >
      {children}
    </button>
  );
}

function StatBar({ label, value, color }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm">{label}</span>
        <span className="text-sm font-bold">{Math.round(value)}</span>
      </div>
      <div className="w-full bg-slate-800 rounded-full h-2">
        <div
          className={`h-2 rounded-full transition-all duration-500 ${
            value > 70 ? "bg-green-500" :
            value > 40 ? "bg-yellow-500" :
            "bg-red-500"
          }`}
          style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
        />
      </div>
    </div>
  );
}

function StatMini({ label, value }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-slate-400">{label}:</span>
      <div className="flex-1 mx-2 bg-slate-800 rounded-full h-1.5">
        <div
          className={`h-1.5 rounded-full ${
            value > 70 ? "bg-green-500" :
            value > 40 ? "bg-yellow-500" :
            "bg-red-500"
          }`}
          style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
        />
      </div>
      <span className="font-bold w-8 text-right">{Math.round(value)}</span>
    </div>
  );
}

function CareButton({ label, onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full px-3 py-2 rounded text-sm transition ${
        disabled ? "bg-slate-800 text-slate-500 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-500"
      }`}
    >
      {label}
    </button>
  );
}

function MetricCard({ label, value, color }) {
  return (
    <div className="bg-slate-900/60 rounded p-4 border border-slate-700">
      <div className="text-xs text-slate-400 mb-1">{label}</div>
      <div className={`text-2xl font-bold ${color}`}>{value}</div>
    </div>
  );
}
