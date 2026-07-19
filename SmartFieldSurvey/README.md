# Smart Field Survey & Inspection App

A complete React Native application built with **Expo** and **Expo Router**, designed for field survey and inspection workflows. The app lets users create surveys, capture photos, record GPS locations, manage contacts, and copy/paste survey data — all from a clean mobile UI.

> Student Project · Developer: **PRITESH**

---

## Tech Stack

- **Expo SDK 54** with **Expo Router** (file-based routing)
- **Navigation**: `expo-router/drawer` (outer Drawer) wrapping a `@react-navigation/bottom-tabs` navigator (nested Tabs)
- **Expo APIs**: `expo-camera`, `expo-contacts`, `expo-location`, `expo-clipboard`
- **Icons**: `@expo/vector-icons` (Ionicons — SVG-based)
- **Safe Areas**: `react-native-safe-area-context`
- **State**: React Context only (no Redux / Zustand)
- **Language**: JavaScript

---

## Features (Modules)

| Module | Screen | Highlights |
|--------|--------|------------|
| 1 | Dashboard | Custom header, student details, today's survey count, quick-action cards, recent survey summary |
| 2 | New Survey | Site/Client/Description inputs, priority selector, date, required-field validation |
| 3 | Camera | Permission request, capture, preview, capture time, retake, delete with confirmation |
| 4 | Location | Permission request, latitude/longitude/accuracy, refresh, copy to clipboard |
| 5 | Contacts | Permission request, fetch + search, counter, pull-to-refresh, avatar initials, copy number, "No Number" state |
| 6 | Clipboard | Copy Survey ID / Contact Number / Location, paste notes, clear clipboard |
| 7 | Survey Preview | Full survey detail (photo + URL, contact, location, notes), edit, submit |
| 8 | History | FlatList of surveys, search, priority filter, delete with confirmation, read-only detail view |

Plus a **Profile** tab (student details + skills) and a **Settings** drawer screen (version, developer, permissions used).

---

## Navigation

**Bottom Tabs** (always visible): Dashboard · New Survey · History · Profile

**Drawer menu**: Dashboard · Survey · Camera · Contacts · Location · Clipboard · Settings

```
app/
  _layout.js              # Root Drawer
  (tabs)/
    _layout.js            # Bottom Tabs
    index.js              # Dashboard (Module 1)
    new-survey.js         # Create Survey (Module 2)
    history.js            # Survey History (Module 8)
    profile.js            # Profile
  camera.js               # Module 3
  contacts.js             # Module 5
  location.js             # Module 4
  clipboard.js            # Module 6
  settings.js             # Settings
  survey-preview.js       # Module 7
```

---

## Project Structure

```
app/                 # Screens (file-based routing)
components/          # Reusable UI
  AppHeader.js         # Header with dynamic SVG icon
  SurveyCard.js        # Survey summary card
  QuickActionCard.js   # Colored quick-action tile
  ContactItem.js       # Contact row with avatar
  EmptyState.js        # Empty-state placeholder
  PrimaryButton.js     # Button with optional SVG icon
  SafeView.js          # Safe-area wrapper
constants/
  theme.js            # Student info + color palette
  SurveyContext.js    # Shared survey state (Context)
assets/               # Icons & splash
```

---

## Getting Started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the development server

   ```bash
   npx expo start
   ```

3. Open the app using:
   - **Expo Go** on a physical device (camera/contacts/location need a real device)
   - **Android emulator** or **iOS simulator**

> For full native functionality (camera, contacts, GPS), use a development build or a physical device rather than Expo Go.

---

## Permissions Used

The app requests the following at runtime:

- **Camera** — capture survey photos
- **Location** — record GPS coordinates
- **Contacts** — select client contacts
- **Clipboard** — copy and paste survey data

---

## Build Notes

- Written in **JavaScript** with beginner-friendly patterns (`useState`, `useEffect`, `StyleSheet`).
- Survey data is held in a React Context (`constants/SurveyContext.js`) and stored in-memory during the session.
- The Drawer is the outer layout; the Bottom Tabs navigator is nested inside the Dashboard drawer screen, following the `expo-router/drawer` pattern.

---

## Learn More

- [Expo Documentation](https://docs.expo.dev/)
- [Expo Router Guide](https://docs.expo.dev/router/introduction/)
- [Expo Router Drawer](https://docs.expo.dev/router/advanced/drawer/)
