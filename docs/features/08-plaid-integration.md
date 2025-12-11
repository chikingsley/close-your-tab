# 08 - Plaid Integration

## Overview
Connect bank accounts to match transactions to tabs - the "Estimate vs Actual" feature.

## Features

### Bank Connection
- Plaid Link integration
- Connect checking/credit cards
- Read-only access

### Transaction Matching
- Pull transactions
- Filter to bar/restaurant category
- Match to open/recent tabs
- Show pending charges

### Estimate vs Actual
- Compare tracked tab to actual charge
- Calculate actual tip percentage
- Identify missed tabs

---

## Technical Implementation

### Plaid Link
```typescript
import { PlaidLink } from 'react-native-plaid-link-sdk';

<PlaidLink
  tokenConfig={{
    token: linkToken,
  }}
  onSuccess={(success) => {
    // Exchange public token for access token
  }}
/>
```

### Transaction Sync
```typescript
// Backend call to Plaid API
const transactions = await plaidClient.transactionsGet({
  access_token: accessToken,
  start_date: '2024-01-01',
  end_date: '2024-12-31',
});
```

### Merchant Categories
Filter by Plaid categories:
- `Food and Drink > Bar`
- `Food and Drink > Restaurants`

---

## Privacy Considerations
- Read-only access only
- Filter to relevant transactions
- Local storage option (no cloud sync)
- Clear disconnect option

## Backend Required
- Token exchange server
- Secure access token storage
- Webhook handling for real-time updates

## Status
- [ ] Not started (Phase 4 feature)

## Notes
- Requires Plaid developer account
- Production access needs Plaid approval
- Some banks don't support pending transactions
- Consider privacy-first messaging
