import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { COLORS, STUDENT } from "../../constants/theme";
import AppHeader from "../../components/AppHeader";
import SafeView from "../../components/SafeView";

export default function Profile() {
  return (
    <SafeView>
      <ScrollView style={styles.screen}>
        <AppHeader title="Profile" subtitle="Student Details" icon="person-outline" />

      <View style={styles.body}>
        <View style={styles.card}>
          <Text style={styles.name}>{STUDENT.name}</Text>
          <Text style={styles.detail}>{STUDENT.university}</Text>
          <Text style={styles.detail}>{STUDENT.semester}</Text>
        </View>

        <Text style={styles.sectionTitle}>Skills</Text>
        <View style={styles.skillsWrap}>
          {STUDENT.skills.map((skill, i) => (
            <View key={i} style={styles.skillChip}>
              <Text style={styles.skillText}>{skill}</Text>
            </View>
          ))}
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
    padding: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  name: { fontSize: 20, fontWeight: "bold", color: COLORS.text },
  detail: { fontSize: 14, color: COLORS.subtext, marginTop: 4 },
  sectionTitle: { fontSize: 16, fontWeight: "bold", color: COLORS.text, marginTop: 20, marginBottom: 10 },
  skillsWrap: { flexDirection: "row", flexWrap: "wrap" },
  skillChip: {
    backgroundColor: "#EFF4FF",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  skillText: { color: COLORS.primary, fontWeight: "600" },
});
