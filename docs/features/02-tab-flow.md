# 02 - Open/Close Tab Flow

## Overview
The core flows for starting and ending a tab session.

---

## Open Tab Flow

### Entry Points
1. **Auto-detected venue** - App detects you're at a bar → prompt
2. **Manual from home** - Tap FAB → search/select venue
3. **From map** - Tap venue marker → "Open Tab" button
4. **Recent venues** - Tap recent venue → confirm

### Flow
```
[Entry Point] → [Venue Confirmation] → [Tab Started]
```

### Venue Confirmation Screen/Modal
- Venue name + address
- Venue type (bar, restaurant, etc.)
- "Open Tab" button
- Cancel option

### On Tab Start
- Store: venue, startTime, empty drinks array
- Start live timer
- Navigate to home (active tab state)
- Optionally start background departure monitoring

---

## Close Tab Flow

### Entry Points
1. **Manual** - Tap "Close Tab" button on active tab card
2. **Departure reminder** - Notification → tap → close tab prompt

### Flow
```
[Close Tab] → [Enter Amount] → [Add Tip] → [Confirm] → [Saved to History]
```

### Close Tab Screen/Modal
- **Final Amount** - Input field, numeric keyboard
- **Tip Section**
  - Quick buttons: 15%, 18%, 20%, 25%
  - Custom tip input
  - Shows calculated tip amount
- **Summary**
  - Subtotal
  - Tip
  - Total
- **Confirm** button
- **Cancel** option (keep tab open)

### On Tab Close
- Calculate final total (amount + tip)
- Record endTime, duration
- Save to history
- Clear active tab
- Show confirmation/summary

---

## Components Needed
- [ ] `OpenTabModal` - Venue confirmation
- [ ] `CloseTabModal` - Amount + tip entry (exists, needs polish)
- [ ] `TipCalculator` - Percentage buttons + custom
- [ ] `AmountInput` - Currency input component

## Data Model

```typescript
interface Tab {
  id: string;
  venue: Venue;
  startTime: string; // ISO
  endTime?: string;
  drinks: Drink[];
  finalAmount?: number;
  tipAmount?: number;
  tipPercentage?: number;
  notes?: string;
  status: 'active' | 'closed';
}
```

## Status
- [ ] Not started

## Notes
- Keep it fast - minimum taps to close
- Tip calculator should remember last used percentage
