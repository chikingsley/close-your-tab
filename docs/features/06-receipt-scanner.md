# 06 - Receipt Scanner

## Overview
OCR-based receipt scanning to extract items and prices, then match to drinks on tab.

## Features

### Scan Flow
1. Tap "Scan Receipt" button
2. Camera opens / select from gallery
3. Processing animation
4. Show extracted items
5. Match to existing drinks or add new
6. Confirm and save prices

### Extraction
- Item names
- Prices
- Quantities (if listed)
- Tax (separate)
- Total (for verification)

### Matching
- Auto-match by name similarity
- Manual match for ambiguous items
- Option to add as new drinks
- Skip items that don't match

### Price Memory Update
- All matched prices saved to venue memory
- New items added to memory too

---

## Technical Options

### Option 1: expo-camera + Cloud OCR
```typescript
import { Camera } from 'expo-camera';
// Capture image → send to Google Cloud Vision or AWS Textract
```

### Option 2: react-native-vision-camera + ML Kit
```typescript
import { Camera, useCameraDevice } from 'react-native-vision-camera';
import { useTextRecognition } from '@react-native-ml-kit/text-recognition';
```

### Option 3: Third-party Receipt API
- Veryfi
- Taggun
- Mindee
- Higher accuracy, costs per scan

### Recommendation
Start with mock implementation (like examples), then:
1. Phase 1: Manual entry (no OCR)
2. Phase 2: expo-camera + Google Cloud Vision
3. Phase 3: On-device ML Kit (if needed)

---

## User Flow

```
[Scan Receipt] → [Camera/Gallery] → [Processing...]
                                          ↓
                                 [Show Extracted Items]
                                          ↓
                          [Match to Tab] ←→ [Add New]
                                          ↓
                                    [Confirm]
                                          ↓
                               [Update Price Memory]
```

---

## Components Needed
- [ ] `ReceiptScanner` - Camera capture
- [ ] `ReceiptProcessing` - Loading state
- [ ] `ExtractedItemsList` - Show OCR results
- [ ] `MatchingInterface` - Match to drinks
- [ ] `ReceiptConfirmation` - Final review

## Mock Implementation (Phase 1)
```typescript
const mockScanReceipt = async () => {
  await delay(2000); // Simulate processing
  return [
    { name: 'House IPA', price: 8.00 },
    { name: 'Margarita', price: 14.00 },
    { name: 'Nachos', price: 12.50 },
  ];
};
```

## Status
- [ ] Not started (Phase 2 feature)

## Notes
- Receipt formats vary wildly
- May need manual correction UI
- Consider "Quick add from receipt" without full OCR
