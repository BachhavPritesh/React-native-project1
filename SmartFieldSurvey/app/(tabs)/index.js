import React, { useContext, useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, ScrollView } from "react-native";
import { router } from "expo-router";
import { SurveyContext } from "../../constants/SurveyContext";
import { COLORS, STUDENT } from "../../constants/theme";
import AppHeader from "../../components/AppHeader";
import QuickActionCard from "../../components/QuickActionCard";
import SurveyCard from "../../components/SurveyCard";
import SafeView from "../../components/SafeView";

export default function Dashboard() {
  const { surveys } = useContext(SurveyContext);
  const [recent, setRecent] = useState([]);

  useEffect(() => {
    setRecent(surveys.slice(0, 3));
  }, [surveys]);

  return (
    <SafeView>
      <ScrollView style={styles.screen}>
        <AppHeader title="Smart Field Survey" subtitle={STUDENT.name} />

      <View style={styles.body}>
        <View style={styles.welcomeCard}>
          <Text style={styles.welcomeTitle}>Welcome, {STUDENT.name}</Text>
          <Text style={styles.welcomeText}>{STUDENT.university}</Text>
          <Text style={styles.welcomeText}>{STUDENT.semester}</Text>
        </View>

        <View style={styles.countCard}>
          <Text style={styles.countNumber}>{surveys.length}</Text>
          <Text style={styles.countLabel}>Today's Survey Count</Text>
        </View>

        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionsRow}>
          <QuickActionCard label="New Survey" icon="add-circle-outline" color="#2563EB" onPress={() => router.push("/new-survey")} />
          <QuickActionCard label="Camera" icon="camera-outline" color="#7C3AED" onPress={() => router.push("/camera")} />
          <QuickActionCard label="Location" icon="location-outline" color="#059669" onPress={() => router.push("/location")} />
          <QuickActionCard label="Contacts" icon="people-outline" color="#EA580C" onPress={() => router.push("/contacts")} />
        </View>

        <Text style={styles.sectionTitle}>Recent Survey Summary</Text>
        {recent.length === 0 ? (
          <Text style={styles.emptyText}>No surveys yet. Create your first survey!</Text>
        ) : (
          <FlatList
            data={recent}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <SurveyCard survey={item} onPress={() => router.push("/history")} />}
            scrollEnabled={false}
          />
        )}
      </View>
      </ScrollView>
    </SafeView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.background },
  body: { padding: 16 },
  welcomeCard: {
    backgroundColor: COLORS.card,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  welcomeTitle: { fontSize: 18, fontWeight: "bold", color: COLORS.text },
  welcomeText: { fontSize: 14, color: COLORS.subtext, marginTop: 4 },
  countCard: {
    backgroundColor: COLORS.primary,
    borderRadius: 14,
    padding: 20,
    marginTop: 14,
    alignItems: "center",
  },
  countNumber: { fontSize: 40, fontWeight: "bold", color: "#FFFFFF" },
  countLabel: { fontSize: 14, color: "#E0E7FF", marginTop: 4 },
  sectionTitle: { fontSize: 16, fontWeight: "bold", color: COLORS.text, marginTop: 20, marginBottom: 10 },
  actionsRow: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
  emptyText: { color: COLORS.subtext, fontSize: 14, textAlign: "center", marginTop: 10 },
});
