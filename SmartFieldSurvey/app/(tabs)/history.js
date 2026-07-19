import React, { useContext, useState } from "react";
import { View, Text, TextInput, FlatList, StyleSheet, ScrollView, Alert } from "react-native";
import { router } from "expo-router";
import { SurveyContext } from "../../constants/SurveyContext";
import { COLORS } from "../../constants/theme";
import AppHeader from "../../components/AppHeader";
import SurveyCard from "../../components/SurveyCard";
import EmptyState from "../../components/EmptyState";
import SafeView from "../../components/SafeView";

const FILTERS = ["All", "Low", "Medium", "High"];

export default function History() {
  const { surveys, deleteSurvey } = useContext(SurveyContext);
  const [search, setSearch] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("All");

  const filtered = surveys.filter((s) => {
    const matchSearch =
      s.siteName.toLowerCase().includes(search.toLowerCase()) ||
      s.clientName.toLowerCase().includes(search.toLowerCase());
    const matchPriority = priorityFilter === "All" || s.priority === priorityFilter;
    return matchSearch && matchPriority;
  });

  function handleDelete(item) {
    Alert.alert("Delete Survey", "Are you sure you want to delete this survey?", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", style: "destructive", onPress: () => deleteSurvey(item.id) },
    ]);
  }

  return (
    <SafeView>
        <AppHeader title="Survey History" subtitle={`${surveys.length} surveys stored`} icon="time-outline" />

      <View style={styles.body}>
        <TextInput style={styles.search} value={search} onChangeText={setSearch} placeholder="Search by site or client" />

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterRow}>
          {FILTERS.map((f) => (
            <View key={f} style={[styles.chip, priorityFilter === f ? styles.chipActive : {}]}>
              <Text style={priorityFilter === f ? styles.chipTextActive : styles.chipText} onPress={() => setPriorityFilter(f)}>{f}</Text>
            </View>
          ))}
        </ScrollView>

        {filtered.length === 0 ? (
          <EmptyState message="No surveys found. Start by creating a new survey." icon="📋" />
        ) : (
          <FlatList
            data={filtered}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <SurveyCard
                survey={item}
                onPress={() => router.push({ pathname: "/survey-preview", params: { id: item.id, readonly: "1" } })}
                onDelete={() => handleDelete(item)}
              />
            )}
          />
        )}
      </View>
    </SafeView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.background },
  body: { flex: 1, padding: 16 },
  search: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    padding: 12,
    fontSize: 15,
    color: COLORS.text,
  },
  filterRow: { marginTop: 12, marginBottom: 8 },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.card,
    marginRight: 8,
  },
  chipActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  chipText: { color: COLORS.subtext, fontWeight: "600" },
  chipTextActive: { color: "#FFFFFF", fontWeight: "bold" },
});
