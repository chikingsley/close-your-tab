# Tab Tracker

## Product Concept Document

**Version:** 0.1 (Draft)
**Last Updated:** November 2025

---

## Overview

Tab Tracker is a mobile app that helps people remember to close their bar tabs and gain visibility into their drinking-related spending. The app uses location detection to automatically recognize when users enter and leave bars or restaurants, sending timely reminders to prevent forgotten tabs and walkouts.

---

## Problem Statement

People routinely forget to close bar tabs, especially as the evening progresses. This results in:

- Embarrassing follow-up calls from establishments
- Automatic gratuity charges (often 20%+) applied to forgotten tabs
- Holds on credit cards that take days to clear
- No clear picture of actual spending on alcohol and dining out

---

## Target Users

- Social drinkers who frequent bars and restaurants
- People who have walked out on a tab before (or fear doing so)
- Budget-conscious individuals wanting visibility into discretionary spending
- Groups who frequently split checks and need to track who owes whom

---

## Core Features

### 1. Automatic Venue Detection

The app detects when a user enters a bar, restaurant, or similar establishment using a combination of:

- **Geolocation** paired with venue databases (Google Places, Foursquare, Yelp)
- **Geofencing** to establish a perimeter around the detected venue

**User Flow:**

1. User enters a bar/restaurant
2. App detects venue type via location + places API
3. Push notification: "Looks like you're at [Venue Name]. Opening a tab?"
4. User confirms or dismisses
5. If confirmed, tab is now "active" with timestamp and location recorded

**Configuration Options:**

- Auto-detect venues: On/Off
- Venue types to detect: Bars only, Bars + Restaurants, All food/drink establishments
- Quiet hours: Don't prompt between [time] and [time]

---

### 2. Departure Detection & Reminders

When the user leaves the geofenced area around their active tab location:

**User Flow:**

1. User moves beyond threshold distance from venue (default: 200 feet)
2. App waits brief delay (configurable, default: 2 minutes) to avoid false positives
3. Push notification: "Did you close your tab at [Venue Name]?"
4. User options:
   - "Yes, closed it" → Prompts for amount/receipt (if required)
   - "Still here" → Snoozes detection for 15 minutes
   - "Oops, going back" → Keeps tab active

**Configuration Options:**

- Detection distance threshold: 100ft / 200ft / 300ft / Custom
- Delay before notification: 1 min / 2 min / 5 min
- Require receipt/amount to close: Yes / No

---

### 3. Tab Closure & Receipt Capture

When closing a tab, users can optionally (or mandatorily, if configured) log details:

**Quick Close:**

- One tap to mark closed
- Optional: Enter total amount manually

**Receipt Capture:**

- Camera opens to photograph receipt
- OCR extracts: Total, subtotal, tip, itemized purchases, venue name, date/time
- User confirms or edits extracted data
- Receipt image saved for records

**Configuration Options:**

- Require receipt to close tab: Yes / No
- Require amount to close tab: Yes / No
- Auto-categorize items: On / Off

---

### 4. Spending Analytics

Dashboard providing visibility into bar and restaurant spending:

**Metrics:**

- Total spend: This week / This month / This year / All time
- Average tab size
- Number of tabs opened
- Most visited venues
- Spending by category (if itemized): Beer, Wine, Cocktails, Shots, Food, Other
- Spending trends over time (week-over-week, month-over-month)

**Goals & Budgets:**

- Set monthly spending limit for bars/restaurants
- Progress bar showing spend vs. budget
- Alerts when approaching or exceeding budget

---

### 5. Bill Splitting

For tabs shared with others:

**Features:**

- Add friends/contacts to a tab
- Split evenly or by item (if receipt scanned)
- Generate payment request links (Venmo, Cash App, PayPal, Apple Pay)
- Track pending payments ("Sarah owes you $24")
- Running tally across all shared tabs

---

## Additional Features (Post-MVP)

### Bank/Card Integration

- Connect via Plaid to automatically detect bar/restaurant transactions
- Auto-prompt to close tab when matching transaction posts
- Enhanced spending analytics with transaction data
- Reconcile manual entries with actual charges

### Drink Logging

- Manually log individual drinks throughout the night
- Track consumption over time
- Estimated BAC calculator (with appropriate disclaimers and warnings)
- Hydration reminders

### Safe Ride Integration

- Surface Uber/Lyft booking button when closing late-night tabs
- Optional: Auto-suggest ride if at venue past certain hour

### Social Features

- Shared tabs where all participants get departure reminders
- Venue check-ins visible to friends
- "Who's out tonight" discovery

### Venue Features

- Map of all venues visited
- Favorites and ratings
- Personal notes ("bartender Mike is great," "avoid Fridays")

### Watch App

- Glanceable active tab status
- One-tap to mark closed
- Notification mirroring

### Home Screen Widgets

- Active tab indicator
- Quick-open to close tab
- Monthly spend summary

---

## Technical Architecture

### Platform

React Native (iOS + Android from single codebase)

### Key Technical Components

**Location Services:**

- Background location tracking (battery-optimized)
- Geofencing APIs (iOS: Core Location, Android: Geofencing API)
- Limit: ~20 active geofences per app (OS limitation)—should be sufficient since typically only 1 active tab

**Venue Detection:**

- Google Places API or Foursquare Places API
- Venue categorization to filter for bars/restaurants
- Caching to reduce API calls

**OCR/Receipt Scanning:**

- On-device: iOS Vision framework, Android ML Kit
- Fallback: Cloud OCR (Google Cloud Vision, AWS Textract)
- On-device preferred for privacy and speed

**Data Storage:**

- Local: AsyncStorage or SQLite for offline-first experience
- Cloud sync: Firebase or Supabase for cross-device sync and backup
- Receipt images: Cloud storage with user-controlled retention

**Notifications:**

- Push notifications via Firebase Cloud Messaging (FCM) / APNs
- Local notifications for geofence triggers
- Rich notifications with action buttons

**Payment Integrations (Future):**

- Plaid for bank account linking
- Deep links to Venmo/Cash App/PayPal for split requests

---

## User Experience Considerations

### Permissions

The app requires sensitive permissions. Onboarding must clearly explain value:

- **Location (Always):** Required for venue detection and departure reminders. Explain battery optimization measures.
- **Camera:** Required for receipt scanning. Can be requested just-in-time.
- **Notifications:** Required for reminders. Explain what notifications to expect.

### Battery Impact

Background location is battery-intensive. Mitigations:

- Use geofencing (event-driven) rather than continuous GPS polling
- Significant location change monitoring as fallback
- Clear battery usage reporting in app settings
- Option to disable auto-detection and use manual-only mode

### Privacy

- All data stored locally by default
- Optional cloud sync (explicit opt-in)
- No data sold or shared with third parties
- Receipt images can be auto-deleted after extraction
- Export and delete all data options

### False Positives/Negatives

- Venue detection won't be perfect—make manual open/close always accessible
- "I'm still here" snooze prevents annoyance from stepping outside
- Configurable sensitivity lets users tune to their needs

---

## MVP Scope

For initial release, focus on core loop:

### Included in MVP

1. **Manual tab open/close** with timestamp and venue name
2. **Auto venue detection** on arrival (prompt to open tab)
3. **Departure detection** with reminder notification
4. **Basic amount logging** when closing (optional)
5. **Simple spending history** (list of closed tabs with totals)
6. **Essential settings** (detection distance, require amount, quiet hours)

### Deferred to v1.1+

- Receipt scanning/OCR
- Bill splitting
- Spending analytics dashboard
- Budget/goals
- Bank integration
- Social features
- Watch app/widgets

---

## Success Metrics

### Primary

- **Tabs closed via reminder:** % of departure notifications that result in "closed" action
- **Retention:** D7, D30 retention rates
- **Active tabs logged:** Average tabs per user per week

### Secondary

- Notification opt-in rate
- Location permission grant rate
- Receipt capture rate (when available)
- App store rating

---

## Open Questions

1. **Monetization:** Free with premium tier? Ads? Partnerships with venues?
2. **Venue database:** Google Places vs. Foursquare vs. Yelp—which has best bar/restaurant coverage?
3. **Background location approval:** Apple/Google are increasingly strict. What's the minimum location access needed?
4. **Social proof:** Would users share/recommend this? What's the viral hook?
5. **Edge cases:** What about food halls, hotel bars, airports, stadiums with multiple vendors?

---

## Appendix: User Stories

### Core

- As a bar-goer, I want to be reminded when I leave a bar so I don't forget to close my tab.
- As a user, I want to log how much I spent so I can track my bar spending over time.
- As a forgetful person, I want the app to automatically know when I'm at a bar so I don't have to remember to open it.

### Analytics

- As a budget-conscious user, I want to see how much I've spent on bars this month so I can make better decisions.
- As a user, I want to set a monthly bar budget and be alerted when I'm close to it.

### Splitting

- As someone who goes out with friends, I want to easily split a tab and request payment.
- As a user, I want to track who owes me money from past tabs.

### Receipts

- As a user, I want to photograph my receipt and have the app automatically extract the amount.
- As someone tracking spending, I want itemized records of what I bought, not just totals.

---

## Revision History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 0.1 | Nov 2025 | — | Initial draft |

