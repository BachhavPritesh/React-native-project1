# React Native Project 1

A collection of React Native / Expo learning projects.

## Projects

### Smart Field Survey & Inspection App

A complete field-survey and inspection mobile app built with **Expo** and **Expo Router**.

- **Stack**: Expo SDK 54, Expo Router (file-based routing), Drawer + Bottom Tabs navigation
- **Expo APIs**: `expo-camera`, `expo-contacts`, `expo-location`, `expo-clipboard`
- **Features**: Dashboard, Create Survey, Camera capture, GPS Location, Contacts, Clipboard helpers, Survey Preview, Survey History, Profile, Settings
- **Language**: JavaScript

📁 Source: [`SmartFieldSurvey/`](./SmartFieldSurvey)
📄 App README: [`SmartFieldSurvey/README.md`](./SmartFieldSurvey/README.md)

## Getting Started

Each sub-project is a standalone Expo app. To run the Smart Field Survey app:

```bash
cd SmartFieldSurvey
npm install
npx expo start
```

Open it with Expo Go on a physical device or with an Android/iOS emulator. For full camera, contacts, and location support, use a development build or a real device.

## Tech Highlights

- Expo Router file-based navigation (Drawer wrapping nested Bottom Tabs)
- React Context for shared survey state (no external state libraries)
- `@expo/vector-icons` (Ionicons) for SVG icons
- `react-native-safe-area-context` for safe layouts
- Core components only: `View`, `Text`, `Image`, `Pressable`, `FlatList`, `ScrollView`, `TextInput`, `Alert`, `ActivityIndicator`, `RefreshControl`, `StyleSheet`
