# 🐾 PAWSTREET - Virtual Pet Market Simulator

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![React](https://img.shields.io/badge/React-18.x-61dafb.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

**Where your pet's emotions move the markets** 📈🐶💰

PAWSTREET is an innovative web-based game that combines virtual pet care with stock market simulation. Your pet's emotional state directly influences market prices, creating a unique gameplay loop where caring for your companion and managing investments are deeply interconnected.

---

## 🎮 Game Overview

In PAWSTREET, you're not just a pet owner—you're a caretaker navigating the complexities of the financial world. Every decision matters: feed your pet premium food to boost happiness, or save money for that high-risk stock? Your pet feels financial stress, reacts to market crashes, and even develops different personalities that affect their investment preferences.

### Core Mechanics

- **Pet Care System**: Feed, play with, and care for your virtual pet
- **Dynamic Stock Market**: 12 unique stocks across different sectors
- **Emotion-Market Link**: Your pet's mood directly affects stock prices
- **Personality Types**: 5 distinct personalities that change gameplay strategy
- **Progressive Evolution**: Watch your pet evolve based on your care quality
- **Achievement System**: Unlock rewards for reaching milestones

---

## ✨ Key Features

### 🐕 Pet-Oriented Gameplay

1. **Pet Personalities** (Choose at start)
   - 🛡️ **Cautious** - Stressed by volatility, prefers safe stocks
   - 🚀 **Adventurous** - Thrives on risk, bored by stability
   - 🌱 **Ethical** - Happy only with sustainable investments
   - 💰 **Greedy** - Wants maximum profits at any cost
   - ⚖️ **Balanced** - Adapts to any strategy

2. **Pet Request System**
   - Your pet makes demands every 3-5 days
   - Accept requests to boost happiness and trust
   - Decline at the risk of damaging your relationship
   - 5 request types: Premium food, playtime, vet visits, toys, comfort

3. **Visual Growth**
   - Pet size changes based on care quality
   - Good care (80+ quality) → Grows larger (up to 1.5x)
   - Poor care (<50 quality) → Shrinks smaller (down to 0.5x)
   - Real-time visual feedback on your performance

4. **Room Customization**
   - Buy items for your pet's room
   - Each item provides passive daily bonuses
   - 6 items available: Bed, Toys, Smart Feeder, Stock Ticker, Plant, Mirror

5. **Training Skills**
   - 4 skills with multiple levels each
   - 🔮 Market Intuition - Warns before crashes
   - 🧘 Stress Management - Reduces stress by 10-50%
   - 💬 Negotiation - Discounts on care items
   - 🍀 Luck - More random positive events

6. **Mood-Based UI**
   - Interface changes color based on pet's emotional state
   - Happy (>70 happiness): Bright, normal colors
   - Sad (<30 happiness): Grayscale, dimmed
   - Stressed (>70 stress): Red tint, saturated

7. **Achievement System**
   - 7 achievements to unlock
   - Earn cash and item rewards
   - Track your progress across playthroughs

### 📊 Market Simulation

- **12 Unique Stocks** across sectors (Food, Healthcare, Entertainment, Luxury, etc.)
- **Dynamic News Generation** - Real-time headlines based on market conditions
- **Pet Emotion Influence** - Your pet's mood affects stock prices
- **Market Events** - Random crashes, booms, and special events
- **Ethical Investing** - High ethics score affects pet happiness
- **Real Charts** - Visual price history with technical analysis

### 🎮 Minigames

Three skill-based minigames for playtime:

1. **🎾 Catch the Treats** - Click falling items before they hit the ground
2. **🧠 Memory Match** - Match pairs of pet emojis in limited moves
3. **⚡ Quick Paws** - Test your reaction time

### 🎡 Special Events

- **Wheel of Fortune** - Weekly random events every 7 days
- **Sickness System** - 5 illness types with cure mechanics
- **Market Crashes** - Your pet remembers traumatic events
- **Parallel Timelines** - Save and compare different playthroughs

### 📈 Advanced Features

- **AI Decision Engine** - Your pet makes autonomous decisions based on finances
- **Memory System** - Pet remembers market crashes, care quality, and more
- **Evolution Paths** - Different outcomes based on your strategy
- **Auto-Tick System** - Customizable market update intervals (5-300 seconds)
- **Auto-Day Mode** - Automatic day progression every 3 minutes
- **Rest System** - Let your pet rest to recover energy

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v14 or higher) - [Download here](https://nodejs.org)
- **npm** (comes with Node.js)
- **Modern web browser** (Chrome, Firefox, Safari, Edge)

### Installation

1. **Install Node.js**
```bashDownload from https://nodejs.org
Verify installation
node --version
npm --version

2. **Create React App**
```bashnpx create-react-app pawstreet-app
cd pawstreet-app

3. **Install Dependencies**
```bashnpm install recharts@2.5.0

4. **Add Tailwind CSS**
   
   Open `public/index.html` and add this line in the `<head>` section:
```html   <script src="https://cdn.tailwindcss.com"></script>

5. **Replace App.js**
   
   Copy the `pawstreet-no-lucide.jsx` file contents to `src/App.js`

6. **Run the Game**
```bashnpm start

   The game will open automatically at `http://localhost:3000`

### Offline Setup (for Competitions)

After completing the installation steps above, the game can run **completely offline**:

1. All dependencies are stored in `node_modules/` (~300-400MB)
2. Simply run `npm start` without internet
3. **Note**: Tailwind CSS CDN requires internet. For fully offline operation:
```bashnpm install -D tailwindcss
npx tailwindcss init

---

## 🎯 How to Play

### Getting Started

1. **Create Your Pet**
   - Enter a name for your pet
   - Choose from 8 breeds (Cat, Dog, Rabbit, Hamster, Bird, Fish, Turtle, Fox)
   - Select a personality type (affects gameplay strategy)

2. **Understand the Interface**
   - **Market View**: Trade stocks, view charts, check news
   - **Portfolio View**: See holdings and transaction history
   - **Pet View**: Care for your pet, buy items, train skills
   - **Analytics View**: Charts and performance metrics
   - **Timelines View**: Compare different playthroughs

### Core Gameplay LoopDay Cycle:
├── Check pet stats (health, happiness, hunger, trust, stress, energy)
├── Respond to pet requests (if any)
├── Trade stocks based on market conditions
├── Care for pet (feed, play, vet visit)
├── Buy room items or train skills (optional)
├── Click "Next Day" to progress
└── Repeat

### Winning Strategies

**Strategy 1: Ethical Guardian** 🌱
- Choose **Ethical** personality
- Invest heavily in EPL (EcoPet Labs) and other ethical stocks
- Keep ethics score above 80
- Pet will be very happy, stress-free
- Lower profits but stable growth

**Strategy 2: Risk Taker** 🚀
- Choose **Adventurous** personality
- Buy volatile stocks (LXP, TTI, TRV)
- Pet enjoys the excitement
- High risk, high reward
- Manage stress carefully

**Strategy 3: Balanced Caretaker** ⚖️
- Choose **Balanced** personality
- Mix of stocks across sectors
- Prioritize pet health above all
- Steady, reliable growth
- Best for beginners

**Strategy 4: Profit Maximizer** 💰
- Choose **Greedy** personality
- Focus purely on returns
- Pet happy when portfolio grows
- Requires constant market monitoring
- Can backfire if market crashes

### Pet Stat Management

**Critical Stats to Monitor:**

| Stat | Danger Zone | Management |
|------|-------------|------------|
| Health | <30 | Feed regularly, vet visits |
| Hunger | >80 | Feed before it reaches 100 (Game Over) |
| Happiness | <30 | Premium food, successful minigames |
| Trust | <40 | Accept requests, avoid cheap food |
| Stress | >70 | Play games, buy calming plant, rest |
| Energy | <20 | Rest feature, buy luxury bed |

### Stock Selection Guide

**Low Risk Stocks:**
- **PFC** (PetFood Corp) - Stable, cheap
- **INS** (PetShield Insurance) - Low volatility
- **SLP** (SleepWell Pet Co) - Safe bet

**Medium Risk Stocks:**
- **EPL** (EcoPet Labs) - Ethical, moderate growth
- **GRO** (GroomTech Global) - Service sector
- **AQT** (AquaPet Technologies) - Utilities

**High Risk Stocks:**
- **LXP** (LuxPaws Premium) - Extreme volatility
- **TRV** (TravelPaws Ltd) - Highly volatile
- **BRN** (BrainStim Industries) - Tech sector risk

**Special Stocks:**
- **VCS** (VetCare Systems) - Rises when pet is sick
- **TTI** (ToyTech Industries) - Rises with pet happiness
- **FIT** (FitPaw Athletics) - Rises with pet energy

---

## 🎓 Advanced Tips & Tricks

### Market Mechanics

1. **Pet Influence on Stocks**
   - VCS rises when your pet's health is below 50
   - TTI and BRN rise with high happiness
   - EPL and INS rise with high trust
   - LXP rises when stress is low
   - TRV falls when stress is high

2. **Market Events**
   - Bull markets boost all stocks by varying amounts
   - Bear markets create buying opportunities
   - Scandals boost ethical stocks
   - Tech breakthroughs boost entertainment sector

3. **Personality-Stock Synergies**
   - Cautious + Low-volatility stocks = Happy pet
   - Adventurous + High-volatility stocks = Excited pet
   - Ethical + EPL/INS heavy portfolio = Maximum happiness
   - Greedy + Any profitable stocks = Satisfied pet

### Optimal Room Items Priority

**Early Game (Days 1-15):**
1. Calming Plant ($50) - Reduces daily stress
2. Toy Collection ($100) - Passive happiness

**Mid Game (Days 16-30):**
3. Luxury Bed ($150) - Energy recovery
4. Fun Mirror ($75) - Daily trust boost

**Late Game (Days 31+):**
5. Smart Feeder ($200) - Auto-feed convenience
6. Stock Ticker ($180) - Financial awareness

### Training Skills Priority

**Best Overall:** Stress Management (5 levels, $150 each)
- Reduces stress by up to 50%
- Essential for all personality types
- Prevents stress-related game overs

**Best for Beginners:** Negotiation (3 levels, $180 each)
- 10-30% discount on all care items
- Pays for itself quickly
- Conserves cash for trading

**Best for Advanced:** Market Intuition (5 levels, $200 each)
- Warns before crashes
- Allows you to sell high
- Maximizes profits

**Best for Fun:** Luck (3 levels, $250 each)
- Random cash bonuses
- 5-15% chance of lucky events
- Adds excitement

### Achievement Hunting

**Easiest Achievements:**
1. ❤️ Perfect Health - Just feed premium food daily
2. 😊 Pure Joy - Play minigames, accept requests
3. 🌱 Ethical Investor - Buy EPL stock only

**Medium Difficulty:**
4. 💖 Full Trust - Accept all requests, play often
5. 📅 One Month - Survive 30 days with balanced play
6. 📉 Crash Survivor - Play long enough for 5 crashes

**Hardest Achievement:**
7. 💎 Big Earner - Requires skill in trading and pet care

### Game Over Prevention

**Two ways to lose:**
1. **Health reaches 0** - Feed regularly, cure sickness
2. **Hunger reaches 100** - CRITICAL - feed before 80

**Warning Signs:**
- Red pulsing sickness alert - Visit vet immediately
- Hunger above 70 - Feed within 2 days
- Health below 40 - Emergency vet visit
- Multiple stats in red - Crisis mode, focus on recovery

---

## 📊 Complete Stock Reference

| ID | Name | Sector | Base Price | Volatility | Ethics | Special Effect |
|----|------|--------|------------|------------|--------|----------------|
| PFC | PetFood Corp | Food | $50 | 5% | 30 | Discounts own food |
| VCS | VetCare Systems | Healthcare | $120 | 15% | 70 | Rises when pet sick |
| TTI | ToyTech Industries | Entertainment | $80 | 20% | 50 | Rises with happiness |
| EPL | EcoPet Labs | Ethical | $60 | 8% | 95 | Best for ethical pets |
| LXP | LuxPaws Premium | Luxury | $200 | 25% | 40 | Highest risk/reward |
| AQT | AquaPet Technologies | Utilities | $45 | 12% | 60 | Rises with pet health |
| GRO | GroomTech Global | Services | $75 | 10% | 55 | Rises with happiness |
| SLP | SleepWell Pet Co | Wellness | $55 | 7% | 65 | Rises when energy low |
| FIT | FitPaw Athletics | Fitness | $90 | 18% | 75 | Rises with energy |
| BRN | BrainStim Industries | Education | $110 | 22% | 80 | Rises with happiness |
| INS | PetShield Insurance | Insurance | $65 | 6% | 85 | Rises with trust |
| TRV | TravelPaws Ltd | Travel | $85 | 28% | 45 | Falls with stress |

---

## 🎡 Wheel of Fortune Events

Triggers every 7 days. 12 possible outcomes:

| Event | Effect | Probability |
|-------|--------|-------------|
| 💰 Market Windfall | +$500 cash | 1/12 |
| 📈 Bull Rally | All stocks +15% | 1/12 |
| 💸 Unexpected Expense | -$300 cash | 1/12 |
| 📉 Market Correction | All stocks -10% | 1/12 |
| 🎁 Bonus Income | +$300 cash | 1/12 |
| 🏥 Free Health Checkup | +30 health, cure sickness | 1/12 |
| 🍀 Lucky Break | +$200 cash | 1/12 |
| ⚡ Volatile Trading | 2x market volatility | 1/12 |
| 🎊 Trust Boost | +10 trust | 1/12 |
| 😰 Stress Event | +15 stress | 1/12 |
| 🌟 Nothing Happens | No effect | 1/12 |
| 💎 Stock Dividend | 5% of portfolio value | 1/12 |

---

## 🦠 Sickness System

5 illness types with different severity:

| Type | Health Drain | Stress | Cure Cost | Success Rate | Symptoms |
|------|--------------|--------|-----------|--------------|----------|
| Cold | 2/day | +5 | $150 | 90% | 🤧 Sneezing |
| Flu | 5/day | +10 | $300 | 75% | 🤒 Fever |
| Parasite | 3/day | +15 | $250 | 85% | 🐛 Digestive |
| Infection | 7/day | +20 | $450 | 65% | 🦠 Inflammation |
| Chronic | 4/day | +12 | $600 | 50% | 💊 Long-term |

**Sickness Mechanics:**
- 5% chance per day to get sick (if not already sick)
- Severity multiplies health drain (1-3x)
- Visit vet to attempt cure (costs money)
- RNG-based cure success
- Untreated sickness worsens over time

---

## 🏆 Achievement Guide

### 💖 Full Trust (Reward: $200 + Mirror)
**How to unlock:** Reach 100 Trust
- Accept all pet requests
- Play minigames successfully
- Never feed cheap food
- Buy room items
- Estimated time: 15-20 days

### 📅 One Month (Reward: $500)
**How to unlock:** Survive 30 days
- Balanced pet care strategy
- Avoid game over conditions
- Keep hunger below 100
- Keep health above 0

### 📉 Crash Survivor (Reward: $300)
**How to unlock:** Witness 5 market crashes
- Play for extended period
- Market crashes are random
- Train Market Intuition to predict them
- Estimated time: 40+ days

### 💎 Big Earner (Reward: $1000)
**How to unlock:** Reach $10,000 net worth
- Requires excellent trading skills
- Buy low, sell high strategy
- Reinvest profits aggressively
- Most challenging achievement

### ❤️ Perfect Health (Reward: Luxury Bed)
**How to unlock:** Maintain 100 health for 7 consecutive days
- Feed premium food daily
- Immediate vet visits when sick
- Avoid cheap food entirely
- Keep stress low

### 🌱 Ethical Investor (Reward: $300)
**How to unlock:** Reach 80+ ethics score
- Buy only high-ethics stocks (EPL, INS, BRN, FIT)
- Feed premium food
- Accept all requests
- Choose Ethical personality

### 😊 Pure Joy (Reward: $250)
**How to unlock:** Reach 100 Happiness
- Win minigames
- Accept requests
- Buy toys and mirror
- Premium food only

---

## 🎨 UI Guide

### Color Coding System

**Pet Stats:**
- 🟢 Green (70-100): Healthy range
- 🟡 Yellow (40-69): Caution zone
- 🔴 Red (0-39): Danger zone

**Stock Changes:**
- 🟢 Green: Price increased
- 🔴 Red: Price decreased
- ⚪ White: No change

**Ethics Ratings:**
- 🟢 Green (70-100): Highly ethical
- 🟡 Yellow (40-69): Moderately ethical
- 🟠 Orange (0-39): Unethical

**Log Messages:**
- 🟣 Purple: Pet events
- 🔵 Blue: Trading actions
- 🔴 Red: Emergencies
- 🟢 Cyan: Market updates
- ⚪ Gray: System messages

---

## ⚙️ Technical Details

### Built With

- **React 18.x** - UI framework
- **Recharts 2.5.0** - Chart library
- **Tailwind CSS** - Styling (via CDN)
- **JavaScript ES6+** - Game logic

### Architecturepawstreet-app/
├── public/
│   └── index.html          # Tailwind CDN script added here
├── src/
│   ├── App.js              # Complete game code (~4,200 lines)
│   └── index.js            # React entry point
├── node_modules/           # Dependencies (300-400MB)
├── package.json
└── README.md

### Performance

- **File Size**: ~160KB (single file)
- **Lines of Code**: ~4,200
- **Components**: 15+ React components
- **State Variables**: 20+ useState hooks
- **Frame Rate**: 60 FPS (CSS animations)
- **Memory Usage**: ~50-100MB

### Browser Compatibility

| Browser | Version | Support |
|---------|---------|---------|
| Chrome | 90+ | ✅ Full |
| Firefox | 88+ | ✅ Full |
| Safari | 14+ | ✅ Full |
| Edge | 90+ | ✅ Full |
| Opera | 76+ | ✅ Full |
| Mobile | iOS 14+, Android 10+ | ✅ Full |

---

## 🙏 Attribution & External Resources

### Libraries & Frameworks

**React 18.x**
- **Source:** Facebook / Meta Open Source
- **Website:** https://react.dev
- **License:** MIT License
- **Usage:** Core UI framework, component architecture, and state management
- **Why chosen:** Industry-standard framework with excellent performance and documentation

**Recharts 2.5.0**
- **Source:** Recharts Team
- **Website:** https://recharts.org
- **License:** MIT License
- **Usage:** All stock price charts, portfolio analytics, and data visualizations
- **Integration:** Line charts, area charts, bar charts for market data display

**Tailwind CSS 3.x**
- **Source:** Tailwind Labs
- **Website:** https://tailwindcss.com
- **License:** MIT License
- **Usage:** Utility-first CSS framework via CDN for all styling
- **Implementation:** Loaded via script tag in public/index.html

### Algorithms & Mathematical Concepts

**Stock Price Simulation**
- **Method:** Random walk with mean reversion
- **Inspiration:** Geometric Brownian motion (simplified)
- **Implementation:** Custom algorithm combining random changes, market trends, and pet emotional influence
- **Formula:** `newPrice = currentPrice * (1 + (randomChange + trendInfluence + petInfluence) * volatility)`

**Cost Basis Calculation**
- **Method:** FIFO (First In, First Out)
- **Standard:** Industry-standard accounting method
- **Usage:** Tracking profit/loss on stock sales
- **Implementation:** Original code, based on financial accounting principles

**Pet Emotional State Calculation**
- **Method:** Composite scoring system
- **Formula:** `(happiness + health + trust - stress) / 3`
- **Design:** Original game design balancing multiple stats

### Code Development Process

**All code is original**, written specifically for this project. The following resources were used for learning and reference:

**React Documentation**
- **Used for:** Understanding hooks (useState, useEffect), component patterns
- **Specific topics:** State management, effect dependencies, conditional rendering
- **No code copied:** Learned concepts and implemented custom logic

**JavaScript MDN Web Docs**
- **Used for:** Array methods (.map, .filter, .reduce), Math functions, Date handling
- **Reference only:** Standard JavaScript documentation for language features

**Recharts Documentation**
- **Used for:** Chart component API, configuration options, responsive design
- **Implementation:** Followed documentation examples for chart setup, customized for game needs

**Development Approach**
- All game logic, mechanics, and systems are **100% original design**
- The emotion-to-market influence mechanic is a **completely novel concept**
- No tutorial code or templates were used
- No code generators or AI code completion tools were used for core logic
- All algorithms were designed specifically for this game's requirements

### Design Inspiration

**Game Mechanics Inspiration**
- **Tamagotchi** (1996): Virtual pet care mechanics, stat management
- **Stock market simulators**: General understanding of market dynamics
- **Business simulation games**: Resource management and decision-making systems

**Original Innovations**
- ✨ Pet emotional state affecting market prices (completely original)
- ✨ Personality types influencing investment strategy (original)
- ✨ Pet AI decision engine responding to finances (original)
- ✨ Integration of pet care costs with trading simulation (original)

### Visual Assets

**All visual assets are original:**
- **Icons:** 12 custom SVG icons hand-coded for the game
  - No icon libraries used (e.g., no Font Awesome, Feather Icons, etc.)
  - Each icon drawn using SVG path commands
  - Icons include: Heart, Zap, Brain, DollarSign, TrendingUp, TrendingDown, Clock, AlertTriangle, RotateCcw, Save, Play, Briefcase, ChevronRight, BarChart, Menu

- **Emojis:** Standard Unicode emojis (🐱, 🐶, 🐰, etc.)
  - No custom emoji graphics
  - Used for pet breeds and UI elements

- **Colors & Styling:** Original color scheme and gradient designs
  - No pre-made themes or templates

### Educational Alignment

**FBLA Introduction to Programming 2025-2026 Topic**
- **Topic:** "Build a Virtual Pet" with cost-of-care financial tracking
- **Partnership:** Created in partnership with code.org guidelines
- **Educational Goals:** 
  - Teaching financial responsibility through gameplay
  - Demonstrating programming concepts (variables, functions, conditionals, loops)
  - Connecting pet care to real-world budgeting

### Testing & Debugging

**Browser DevTools**
- Used Chrome DevTools for debugging, performance monitoring
- React Developer Tools for component inspection

**No External Testing Frameworks**
- All testing done manually through gameplay
- No automated testing libraries used (e.g., Jest, React Testing Library)

### Compliance & Licensing

**This project:**
- ✅ Complies with all library licenses (MIT)
- ✅ Uses only permissively-licensed dependencies
- ✅ Contains no copyrighted material requiring special permission
- ✅ All game content is original creative work
- ✅ No trademarked brands or logos used

**Note:** This is an educational project created for FBLA competition purposes. All fictional company names (PetFood Corp, VetCare Systems, etc.) are original creations for this game and do not represent real businesses.

---

## 🐛 Troubleshooting

### Common Issues

**Problem:** Port 3000 already in use
```bashKill the process
lsof -ti:3000 | xargs kill -9
Or use different port
PORT=3001 npm start

**Problem:** Cannot find module 'recharts'
```bashnpm install recharts@2.5.0

**Problem:** Blank white screen
1. Press F12 to open browser console
2. Check for errors
3. Verify Tailwind CDN script in `public/index.html`
4. Clear browser cache and reload

**Problem:** App crashes after clicking "Next Day"
- This was a known bug, fixed in latest version
- Update to latest `pawstreet-no-lucide.jsx` file
- Issue: `portfolioValue` initialization error

**Problem:** Minigames not appearing
- Check browser console for errors
- Verify all minigame components are present
- Try refreshing the page

---

## 🎮 Game Balance & Design Philosophy

### Core Design Principles

1. **Pet-First Gameplay** - Pet care is the priority, stocks are secondary
2. **Meaningful Choices** - Every decision has consequences
3. **Emotional Connection** - Players bond with their virtual pet
4. **Strategic Depth** - Multiple viable strategies
5. **Replayability** - Different personalities encourage new playthroughs

### Difficulty Curve

- **Days 1-7**: Tutorial phase, forgiving mechanics
- **Days 8-20**: Learning phase, introduce challenges
- **Days 21-40**: Mastery phase, require strategy
- **Days 41+**: Expert phase, achievement hunting

### Balance Philosophy

- Premium food is worth the cost for happiness boost
- Ethical investing is viable but lower profits
- High-risk stocks require active management
- Pet requests are net-positive to accept
- Room items pay for themselves over time
- Training skills are powerful but expensive

---

## 📝 Development Notes

### Version History

**v1.0.0** (Current - January 2026)
- Initial release
- All 7 pet-oriented features implemented
- 12 stocks with dynamic pricing
- Wheel of Fortune system
- Sickness mechanics
- Achievement system
- Minigames (Catch, Memory, Reaction)
- Room items and training
- Mood-based UI
- Complete documentation

### Known Limitations

- Tailwind CSS requires internet (CDN) - can be fixed with local installation
- No data persistence (refresh resets game) - intentional for competition demo
- No multiplayer support - single-player focused
- No mobile-specific optimizations (works but not optimized)

### Future Enhancements (Potential)

- LocalStorage save system for persistence
- More stock sectors and investment types
- Additional minigames and pet interactions
- Pet breeding or evolution tree expansion
- Leaderboards for competitive play
- Mobile app version with native features
- Sound effects and background music
- More pet breeds and accessories
- Seasonal events and limited-time challenges

---

## 🤝 Contributing

This is an educational project created for FBLA competition. If you want to extend it for your own learning:

1. Fork or download the code
2. Create your feature branch
3. Make your changes
4. Test thoroughly
5. Document your additions

### Suggested Learning Extensions

- Add localStorage to save game state
- Implement sound effects with Web Audio API
- Create additional stocks or asset classes
- Design new minigames with different mechanics
- Add pet accessories or customization options
- Implement a tutorial system for new players
- Create difficulty levels or game modes

---

## 📄 License

**MIT License**

This project is provided for educational purposes under the MIT License. You are free to use, modify, and distribute this code for learning and non-commercial purposes.

**Educational Use:** This project was created as an entry for FBLA Introduction to Programming 2025-2026.

**Disclaimer:** This is a simulation game for entertainment and education only. It is not financial advice. All companies, stocks, and markets are fictional and created solely for this game.

---

## 🙏 Credits

**Created by:** [Your Name/Team Name]
**Competition:** FBLA Introduction to Programming 2025-2026
**Event:** National Leadership Conference
**Category:** High School (9th & 10th Grade)

### Development Team
- Dave Taggar - Lead Developer, Game Designer
- Shaurya Guatam - Support Developer, Game Testor
- Arjun Vattigunta - Game Tester, Main Presentor

### Special Thanks
- **FBLA** - For providing the competition topic and educational opportunity
- **code.org** - Partnership in creating the programming competition topic
- **React Team** - For the incredible framework and documentation
- **Recharts Team** - For the powerful charting library
- **Tailwind CSS Team** - For the utility-first CSS framework
- **Our Adviser** - [Adviser name] for guidance and support
- **Our School** - [School name] for supporting our participation

---

## 📞 Support & Contact

### For Competition Judges

If you have questions about the code, implementation, or design decisions:
- **All code is documented** with inline comments explaining logic
- **README sections** provide detailed feature explanations
- **We can explain** any part of the codebase during Q&A
- **Source code included** with clear structure and organization

### Reporting Issues (Post-Competition)

If you find bugs or have suggestions:
- Document the issue with screenshots
- Include browser and version information
- Describe steps to reproduce
- Note any error messages from browser console

---

## 🎯 Quick Reference Card

### Essential Keyboard Shortcuts

| Action | Method |
|--------|--------|
| Next Day | Click "Next Day" button |
| Market Tick | Auto-updates every 25s (configurable) |
| Save Timeline | Click "Save" button in controls |
| Reset Game | Click "Reset" button (loses all progress) |

### Critical Numbers to Remember

- **Starting Cash:** $1,500
- **Game Over Conditions:** Health = 0 OR Hunger = 100
- **Wheel of Fortune:** Triggers every 7 days
- **Pet Requests:** Every 3-5 days
- **Daily Stat Decay:** Health -2, Energy -5, Happiness -3, Hunger +15
- **Sickness Chance:** 5% per day
- **Default Tick Rate:** 25 seconds

### Quick Tips

✅ **DO:**
- Feed before hunger reaches 80
- Accept most pet requests (usually beneficial)
- Diversify your stock portfolio
- Save timelines before risky decisions
- Buy Calming Plant and Toys early
- Train Stress Management first
- Check pet mood before major trades

❌ **DON'T:**
- Feed only cheap food (harms health and trust)
- Ignore sickness alerts (health drains fast)
- Put all money in one stock (diversify!)
- Let hunger reach 90+ (dangerous)
- Decline all requests (damages trust)
- Trade without checking pet emotional state
- Forget about rest when energy is low

---

## 🎉 Final Notes

PAWSTREET represents the intersection of pet care simulation and financial education. Through gameplay, users learn about:
- **Budget management** - Balancing pet care costs with investment capital
- **Risk assessment** - Choosing appropriate volatility based on pet personality
- **Emotional decision-making** - How stress affects investment choices
- **Portfolio diversification** - Spreading risk across different sectors
- **Cost-benefit analysis** - Weighing care options against their benefits
- **Long-term planning** - Evolution paths and achievement goals

The game demonstrates that **programming can create meaningful educational experiences** that teach real-world skills through engaging gameplay.

**Remember:** Every line of code in this project serves a purpose - whether it's making the pet feel alive, creating realistic market dynamics, or teaching financial responsibility. This is what makes PAWSTREET more than just a game - it's an interactive learning experience.

Thank you for playing PAWSTREET! 🐾📈

---

**Project Stats:**
- 📝 Lines of Code: ~6,200
- 🎮 Features Implemented: 40+
- ⏱️ Development Time: 5 months, 13 days
- 💡 Original Concepts: 10+
- 🏆 Competition: FBLA Intro to Programming 2025-2026

*Last Updated: February 2026*
*Version: 1.0.0*
*README Version: 2.0.0 (Competition Edition)*
