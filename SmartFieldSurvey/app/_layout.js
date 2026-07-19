import React from "react";
import { Drawer } from "expo-router/drawer";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { SurveyProvider } from "../constants/SurveyContext";
import { COLORS } from "../constants/theme";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <SurveyProvider>
        <Drawer
          screenOptions={{
            headerShown: false,
            drawerActiveTintColor: COLORS.primary,
            drawerStyle: { backgroundColor: "#FFFFFF" },
          }}
        >
          <Drawer.Screen name="(tabs)" options={{ title: "Dashboard" }} />
          <Drawer.Screen name="survey-preview" options={{ title: "Survey" }} />
          <Drawer.Screen name="camera" options={{ title: "Camera" }} />
          <Drawer.Screen name="contacts" options={{ title: "Contacts" }} />
          <Drawer.Screen name="location" options={{ title: "Location" }} />
          <Drawer.Screen name="clipboard" options={{ title: "Clipboard" }} />
          <Drawer.Screen name="settings" options={{ title: "Settings" }} />
        </Drawer>
      </SurveyProvider>
    </SafeAreaProvider>
  );
}
