import React, { useContext, useState } from "react";
import { View, Text, TextInput, ScrollView, StyleSheet } from "react-native";
import { router } from "expo-router";
import { Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SurveyContext } from "../../constants/SurveyContext";
import { COLORS } from "../../constants/theme";
import AppHeader from "../../components/AppHeader";
import PrimaryButton from "../../components/PrimaryButton";
import SafeView from "../../components/SafeView";

const PRIORITIES = [
  { label: "Low", icon: "flag-outline" },
  { label: "Medium", icon: "flag" },
  { label: "High", icon: "alert-circle-outline" },
];

export default function NewSurvey() {
  const { editingSurvey, setEditingSurvey, draftPhoto, draftLocation, draftContact, draftNotes } = useContext(SurveyContext);
  const [siteName, setSiteName] = useState(editingSurvey ? editingSurvey.siteName : "");
  const [clientName, setClientName] = useState(editingSurvey ? editingSurvey.clientName : "");
  const [description, setDescription] = useState(editingSurvey ? editingSurvey.description : "");
  const [priority, setPriority] = useState(editingSurvey ? editingSurvey.priority : "Low");
  const today = new Date().toLocaleDateString();

  function handleSubmit() {
    if (!siteName.trim() || !clientName.trim() || !description.trim()) {
      Alert.alert("Missing Fields", "Please fill in Site Name, Client Name and Description.");
      return;
    }

    const surveyData = {
      id: editingSurvey ? editingSurvey.id : null,
      siteName,
      clientName,
      description,
      priority,
      date: editingSurvey ? editingSurvey.date : today,
      photo: editingSurvey && editingSurvey.photo ? editingSurvey.photo : draftPhoto,
      location: editingSurvey && editingSurvey.location ? editingSurvey.location : draftLocation,
      contact: editingSurvey && editingSurvey.contact ? editingSurvey.contact : draftContact,
      notes: editingSurvey && editingSurvey.notes ? editingSurvey.notes : draftNotes,
    };

    setEditingSurvey(surveyData);
    router.push("/survey-preview");
  }

  return (
    <SafeView>
      <ScrollView style={styles.screen}>
        <AppHeader title="New Survey" subtitle="Fill the details below" icon="add-circle-outline" />

        <View style={styles.body}>
          <View style={styles.labelRow}>
            <Ionicons name="business-outline" size={16} color={COLORS.subtext} />
            <Text style={styles.label}>Site Name</Text>
          </View>
          <TextInput style={styles.input} value={siteName} onChangeText={setSiteName} placeholder="Enter site name" />

          <View style={styles.labelRow}>
            <Ionicons name="person-outline" size={16} color={COLORS.subtext} />
            <Text style={styles.label}>Client Name</Text>
          </View>
          <TextInput style={styles.input} value={clientName} onChangeText={setClientName} placeholder="Enter client name" />

          <View style={styles.labelRow}>
            <Ionicons name="document-text-outline" size={16} color={COLORS.subtext} />
            <Text style={styles.label}>Description</Text>
          </View>
          <TextInput style={[styles.input, styles.textArea]} value={description} onChangeText={setDescription} placeholder="Enter description" multiline numberOfLines={4} />

          <View style={styles.labelRow}>
            <Ionicons name="flag-outline" size={16} color={COLORS.subtext} />
            <Text style={styles.label}>Priority</Text>
          </View>
          <View style={styles.priorityRow}>
            {PRIORITIES.map((p) => (
              <View key={p.label} style={[styles.priorityBtn, priority === p.label ? styles.priorityActive : {}]}>
                <Text style={priority === p.label ? styles.priorityTextActive : styles.priorityText} onPress={() => setPriority(p.label)}>
                  <Ionicons name={p.icon} size={16} color={priority === p.label ? "#FFFFFF" : COLORS.subtext} /> {p.label}
                </Text>
              </View>
            ))}
          </View>

          <View style={styles.labelRow}>
            <Ionicons name="calendar-outline" size={16} color={COLORS.subtext} />
            <Text style={styles.label}>Date</Text>
          </View>
          <View style={styles.dateBox}>
            <Ionicons name="calendar-outline" size={18} color={COLORS.text} />
            <Text style={styles.dateText}>{today}</Text>
          </View>

          <PrimaryButton label="Submit Survey" onPress={handleSubmit} />
        </View>
      </ScrollView>
    </SafeView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.background },
  body: { padding: 16 },
  labelRow: { flexDirection: "row", alignItems: "center", marginTop: 14, marginBottom: 6 },
  label: { fontSize: 14, fontWeight: "600", color: COLORS.text, marginLeft: 6 },
  input: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    padding: 12,
    fontSize: 15,
    color: COLORS.text,
  },
  textArea: { height: 90, textAlignVertical: "top" },
  priorityRow: { flexDirection: "row", justifyContent: "space-between" },
  priorityBtn: {
    flex: 1,
    marginHorizontal: 4,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: "center",
    backgroundColor: COLORS.card,
  },
  priorityActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  priorityText: { color: COLORS.subtext, fontWeight: "600" },
  priorityTextActive: { color: "#FFFFFF", fontWeight: "bold" },
  dateBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    padding: 12,
  },
  dateText: { fontSize: 15, color: COLORS.text, marginLeft: 8 },
});
