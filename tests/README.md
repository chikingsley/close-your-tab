# Testing Guide

This project uses a two-tier testing strategy optimized for React Native:

## Unit Tests (Bun)

Fast unit tests for business logic, stores, and utilities.

```bash
# Run all tests
bun test

# Watch mode
bun test --watch
```

### What's Tested
- **Store logic** (`tests/store/`) - Zustand store actions and state
- **Component logic** (`tests/components/`) - Variant classes, calculations
- **Utilities** - Pure functions and helpers

### Adding Tests
```typescript
import { describe, expect, test } from "bun:test";

describe("MyFeature", () => {
  test("does something", () => {
    expect(true).toBe(true);
  });
});
```

## E2E Tests (Maestro)

UI flow tests that run on actual iOS/Android simulators.

### Prerequisites
1. Install Maestro: https://maestro.mobile.dev/getting-started/installing-maestro
2. Have an iOS Simulator or Android Emulator running
3. Build and run the app

### Running E2E Tests
```bash
# Run all E2E tests
bun run e2e

# iOS only
bun run e2e:ios

# Android only
bun run e2e:android

# Run a specific test
maestro test .maestro/01_app_launch.yaml
```

### Test Files
| File | Description |
|------|-------------|
| `01_app_launch.yaml` | Smoke test - app launches correctly |
| `02_navigation.yaml` | Tab navigation between screens |
| `03_tab_flow_open.yaml` | Opening a new tab |
| `04_tab_flow_add_items.yaml` | Adding items to active tab |
| `05_tab_flow_close.yaml` | Closing tab with tip |
| `06_insights_screen.yaml` | Insights screen UI |
| `07_ui_consistency.yaml` | Visual consistency checks |

### Writing Maestro Tests
```yaml
appId: com.peacockerystudio.closeyourtab
name: My Test
---
- launchApp
- tapOn: "Button Text"
- assertVisible: "Expected Text"
- takeScreenshot: screenshot_name
```

## Testing Strategy

| Layer | Tool | Purpose |
|-------|------|---------|
| Unit | Bun | Store logic, utilities, variants |
| E2E | Maestro | UI flows, interactions, visual |

This split ensures fast feedback for logic changes while maintaining real device testing for UI.
