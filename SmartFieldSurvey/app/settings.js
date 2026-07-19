import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { COLORS, STUDENT } from "../constants/theme";
import AppHeader from "../components/AppHeader";
import SafeView from "../components/SafeView";

export default function Settings() {
  return (
    <SafeView>
      <ScrollView style={styles.screen}>
        <AppHeader title="Settings" subtitle="App information" icon="settings-outline" />

      <View style={styles.body}>
        <View style={styles.card}>
          <Text style={styles.row}>App Version: {STUDENT.appVersion}</Text>
          <Text style={styles.row}>Developer: {STUDENT.developer}</Text>
        </View>

        <Text style={styles.sectionTitle}>Permissions Used</Text>
        <View style={styles.card}>
          <Text style={styles.row}>Camera - to capture survey photos</Text>
          <Text style={styles.row}>Location - to record GPS coordinates</Text>
          <Text style={styles.row}>Contacts - to select client contacts</Text>
          <Text style={styles.row}>Clipboard - to copy and paste survey data</Text>
        </View>
      </View>
      </ScrollView>
    </SafeView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.background },
  body: { padding: 16 },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 14,
  },
  row: { fontSize: 14, color: COLORS.text, marginBottom: 8 },
  sectionTitle: { fontSize: 16, fontWeight: "bold", color: COLORS.text, marginBottom: 10 },
});
