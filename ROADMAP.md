# Close Your Tab - Product Roadmap

## Vision
A personal tab tracking app that helps you never forget your bar tab - works at ANY venue without merchant integration. Secondary value: track your bar/drink spending over time.

## Differentiator
Unlike Rooam (acquired by Amex) which requires venue partnerships, Close Your Tab is **personal tracking** that works anywhere in the world.

---

## Phase 1: Core MVP (Current)
*Foundation - Get the basics working reliably*

### Done
- [x] Location permission handling
- [x] Background location tracking
- [x] Google Places API integration (nearby venue detection)
- [x] Basic tab state management (Zustand store)
- [x] Departure detection with geofencing
- [x] Push notification on departure reminder
- [x] Basic UI scaffolding (Home, History, Settings tabs)

### To Do
- [ ] **UI Polish** - Rebuild screens with RNR components
- [ ] **Open Tab Flow** - Clean UX for opening a tab (detected venue vs manual)
- [ ] **Close Tab Flow** - Enter final amount, add tip, confirm
- [ ] **Active Tab Display** - Show current tab with venue name, time elapsed
- [ ] **History Screen** - List of past tabs with date, venue, amount
- [ ] **Settings Screen** - Notification preferences, location settings

---

## Phase 2: Enhanced UX
*Make it delightful and useful*

### Map & Search
- [ ] **Map View** - Show your location and nearby bars/restaurants
- [ ] **Search Places** - Find venues by name (Google Places Autocomplete)
- [ ] **Recent Venues** - Quick access to frequently visited spots
- [ ] **Tap to Open Tab** - Select venue on map → open tab

### Tab Tracking
- [ ] **Time Tracker** - "You've been here for 2h 15m"
- [ ] **Drink Counter** - Tap to add drinks (simple +/- counter)
- [ ] **Running Estimate** - Rough estimate based on avg drink price ($8-15)
- [ ] **Notes** - "Meeting friends", "Work happy hour", etc.

### Notifications
- [ ] **Smart Reminders** - "You've been at O'Malley's for 3 hours"
- [ ] **Time-based alerts** - Optional hourly check-ins
- [ ] **Customizable departure radius** - 50m, 100m, 200m

---

## Phase 3: Insights & Stats
*The "Mint for bar spending" angle*

### Spending Analytics
- [ ] **Monthly Summary** - Total spent at bars this month
- [ ] **Weekly/Monthly trends** - Spending over time chart
- [ ] **Average tab** - Your typical tab amount
- [ ] **Favorite venues** - Most visited spots
- [ ] **Day/Time patterns** - "You spend most on Saturdays"

### Budgeting (Optional)
- [ ] **Monthly budget** - Set a bar spending limit
- [ ] **Budget alerts** - "You've spent 80% of your bar budget"
- [ ] **Streak tracking** - "3 weeks under budget!"

---

## Phase 4: Plaid Integration
*Real transaction matching*

### Bank Connection
- [ ] **Plaid Link** - Connect bank accounts securely
- [ ] **Transaction sync** - Pull pending and posted transactions
- [ ] **Merchant matching** - Match transactions to tracked tabs

### Smart Features
- [ ] **Auto-detect tabs** - See bar charge → prompt to log it
- [ ] **Estimate vs Actual** - "Your estimate: $55, Actual: $67"
- [ ] **Tip tracking** - Calculate actual tip percentage
- [ ] **Pending alerts** - "Pending charge at O'Malley's: $73"

### Privacy
- [ ] **Read-only access** - Only transaction data, no transfers
- [ ] **Filter by category** - Only show bar/restaurant transactions
- [ ] **Local storage option** - Don't sync to cloud

---

## Phase 5: Advanced Features
*Nice-to-haves and future ideas*

### BAC Tracker (Research Needed)
- [ ] **Drink logging** - Log specific drinks with ABV
- [ ] **BAC estimation** - Based on drinks, weight, time, gender
- [ ] **"Safe to drive" indicator** - Rough estimate (with disclaimers)
- [ ] **Drink database** - Use TheCocktailDB or WineVybe API

**APIs to explore:**
- [TheCocktailDB](https://www.thecocktaildb.com/api.php) - Free cocktail database
- [WineVybe](https://winevybe.com/) - Wine, beer, liquor database
- [api4ai Alcohol Recognition](https://api4.ai/apis/alco-rec) - Scan labels for ABV

### Social (Maybe)
- [ ] **Split tabs** - Share with friends
- [ ] **Group tabs** - Track a group outing
- [ ] **Venmo/Apple Pay integration** - Settle up

### Widgets
- [ ] **iOS Widget** - Quick view of current tab
- [ ] **Apple Watch** - Glanceable tab status
- [ ] **Lock screen widget** - Time at venue

---

## Technical Debt & Polish
*Ongoing improvements*

- [ ] Error handling improvements
- [ ] Offline support (queue actions when offline)
- [ ] App icon and splash screen design
- [ ] Onboarding flow for new users
- [ ] Analytics (PostHog/Amplitude)
- [ ] Crash reporting (Sentry)
- [ ] App Store assets and submission

---

## API Keys & Services Needed

| Service | Purpose | Status |
|---------|---------|--------|
| Google Places API | Venue detection & search | ✅ Active |
| Plaid | Bank transaction sync | ⏳ Phase 4 |
| TheCocktailDB | Drink database | ⏳ Phase 5 |
| PostHog/Amplitude | Analytics | ⏳ Future |
| Sentry | Crash reporting | ⏳ Future |

---

## Notes

### Plaid Pending Transactions
Per [Plaid docs](https://plaid.com/docs/transactions/transactions-data/), pending transactions have `pending: true` field. Note: not all banks support pending transactions (e.g., Capital One only shows 90 days history, no pending).

### Competition
- **Rooam** - Acquired by Amex (June 2024), requires venue integration
- **Tally** - Acquired by Rooam (2018)
- **TabX** - Similar concept, venue-dependent

Our angle: **Personal tracking, works anywhere, no merchant needed.**
