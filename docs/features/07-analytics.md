# 07 - Analytics & Insights

## Overview
Spending analytics and insights - the "Mint for bar spending" angle.

## Features

### Summary Cards
- Total spent this month
- Average tab amount
- Number of tabs this month
- Favorite venue

### Charts
- Weekly/monthly spending trend (bar chart)
- Spending by venue (pie chart)
- Spending by day of week
- Time of day patterns

### Insights (AI-powered, optional)
- "You spend most on Saturdays"
- "Your average tab is $45"
- "You've visited O'Malley's 8 times this month"
- Fun/witty commentary

### Budget Tracking
- Set monthly budget
- Progress bar
- Alerts at 80%, 100%
- Streak tracking

---

## Data Sources
- Tab history (local)
- Plaid transactions (Phase 4, optional)

## Components Needed
- [ ] `AnalyticsScreen` - Main container
- [ ] `SummaryCard` - Stat display
- [ ] `SpendingChart` - Trend visualization
- [ ] `VenueBreakdown` - By venue
- [ ] `InsightsCard` - AI-generated insights
- [ ] `BudgetProgress` - Budget bar

## Libraries
- `react-native-chart-kit` or `victory-native` for charts
- Optional: Gemini API for insights (like examples)

## Status
- [ ] Not started (Phase 3 feature)

## Notes
- Keep it simple initially - just summary cards
- Charts can come later
- AI insights are nice-to-have
