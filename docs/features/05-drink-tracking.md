# 05 - Drink Tracking

## Overview
Track individual drinks during a tab session with optional price tracking and venue price memory.

## Core Concept
- Add drinks with **optional** price
- If price is manually entered, save it for that venue
- On future visits, suggest saved prices
- Receipt scanner can fill in missing prices

---

## Features

### Add Drink
- **Quick add buttons**: Beer, Wine, Cocktail, Shot, Food, Other
- **Custom drink**: Text input for name
- **Price field**: Empty by default, optional to fill
- **Quantity**: Default 1, can increment

### Drink List
- Shows all drinks on current tab
- Each row: Name, quantity, price (or "—" if unknown)
- Running total of known prices
- Indicator for drinks without prices

### Venue Price Memory
- **Storage**: Per-venue price history
- **Data**: `{ venueName: { drinkName: { price, count, lastUsed } } }`
- **Lookup**: When adding drink, check if price exists for this venue
- **Display**: "Previously $8 here" suggestion
- **Update**: When price manually entered or from receipt

### Price Suggestions
On return visit to venue:
- Show "Previously at [Venue]" section
- List drinks with saved prices
- Tap to quick-add with known price

---

## User Flow

### Adding a Drink
```
[Tap Add] → [Select Type/Custom] → [Optional: Enter Price] → [Added to Tab]
                                            ↓
                                   [If price entered]
                                            ↓
                                   [Save to venue memory]
```

### With Price Memory
```
[At known venue] → [See "Previously here" suggestions]
                           ↓
                   [Tap suggestion] → [Added with saved price]
```

### Receipt Reconciliation
```
[Scan Receipt] → [Extract items + prices]
                         ↓
                 [Match to drinks on tab]
                         ↓
                 [Fill in missing prices]
                         ↓
                 [Save all to venue memory]
```

---

## Data Model

```typescript
interface Drink {
  id: string;
  name: string;
  category: 'beer' | 'wine' | 'cocktail' | 'shot' | 'food' | 'other';
  price?: number; // Optional - may be unknown
  quantity: number;
  addedAt: string; // ISO timestamp
}

interface VenuePriceMemory {
  [venuePlaceId: string]: {
    [drinkName: string]: {
      price: number;
      count: number; // Times purchased
      lastUsed: string; // ISO timestamp
    };
  };
}
```

---

## Components Needed
- [ ] `DrinkList` - List of drinks on tab
- [ ] `DrinkItem` - Individual drink row
- [ ] `AddDrinkSheet` - Bottom sheet for adding
- [ ] `QuickAddButtons` - Category buttons
- [ ] `PriceInput` - Currency input (optional)
- [ ] `PriceSuggestions` - "Previously at X" list
- [ ] `RunningTotal` - Sum display

## Storage
- Active tab drinks: Zustand store (already exists)
- Price memory: AsyncStorage with key `price-memory`

## Status
- [ ] Not started

## Notes
- Price memory is local-only (no sync needed)
- Consider fuzzy matching for drink names (e.g., "IPA" vs "House IPA")
- Running total should clearly indicate "X drinks without prices"
