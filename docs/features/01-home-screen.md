# 01 - Home Screen

## Overview
The main screen users see when opening the app. Has two states: no active tab, and active tab.

## States

### No Active Tab
- Welcome message or prompt
- Quick action to open a tab
- Recent venues for quick access
- Preview of nearby detected venue (if any)

### Active Tab
- Active tab card prominently displayed
- Live elapsed timer
- Drink count (if tracking)
- Quick actions: Add drink, Close tab
- Venue info

## Components Needed
- [ ] `HomeScreen` - Main container
- [ ] `ActiveTabCard` - Shows current tab (exists, needs polish)
- [ ] `NoTabState` - Empty state with CTA
- [ ] `RecentVenuesList` - Quick access to recent spots
- [ ] `DetectedVenuePrompt` - "Looks like you're at X"

## UI Reference
See Example 1's Home.tsx for map + tab widget pattern
See Example 2's live tab widget (bottom-left floating)

## Status
- [ ] Not started

## Notes
- FAB behavior changes based on state
- Should feel instant and responsive
