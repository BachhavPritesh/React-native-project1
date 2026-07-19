import React, { useContext, useEffect, useState } from "react";
import { View, Text, Image, ScrollView, StyleSheet, Alert } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { SurveyContext } from "../constants/SurveyContext";
import { COLORS } from "../constants/theme";
import AppHeader from "../components/AppHeader";
import PrimaryButton from "../components/PrimaryButton";
import SafeView from "../components/SafeView";

export default function SurveyPreview() {
  const {
    surveys,
    editingSurvey,
    setEditingSurvey,
    draftPhoto,
    draftLocation,
    draftContact,
    draftNotes,
    addSurvey,
    updateSurvey,
    clearDraft,
  } = useContext(SurveyContext);

  const params = useLocalSearchParams();
  const readOnly = params.readonly === "1";
  const historyId = params.id ? Number(params.id) : null;

  const [data, setData] = useState(null);

  useEffect(() => {
    if (readOnly && historyId) {
      const found = surveys.find((s) => s.id === historyId);
      setData(found || null);
    } else if (editingSurvey) {
      setData(editingSurvey);
    } else {
      setData({
        siteName: "",
        clientName: "",
        description: "",
        priority: "Low",
        date: new Date().toLocaleDateString(),
        photo: draftPhoto,
        location: draftLocation,
        contact: draftContact,
        notes: draftNotes,
      });
    }
  }, [readOnly, historyId, editingSurvey, surveys, draftPhoto, draftLocation, draftContact, draftNotes]);

  if (!data) {
    return (
      <SafeView>
        <View style={styles.screen}>
          <AppHeader title="Survey Preview" subtitle="Loading..." icon="document-text-outline" />
          <View style={styles.center}><Text style={styles.empty}>Survey not found.</Text></View>
        </View>
      </SafeView>
    );
  }

  function editSurvey() {
    if (readOnly) {
      setEditingSurvey(data);
    }
    router.push("/new-survey");
  }

  function submitSurvey() {
    if (data.id) {
      updateSurvey(data);
      Alert.alert("Updated", "Survey updated successfully.");
    } else {
      addSurvey(data);
      Alert.alert("Submitted", "Survey submitted successfully.");
    }
    clearDraft();
    router.push("/(tabs)/history");
  }

  const contactName = data.contact ? data.contact.name : "Not selected";
  const locationText = data.location
    ? `Lat: ${data.location.latitude}, Lng: ${data.location.longitude}`
    : "Not captured";

  return (
    <SafeView>
      <ScrollView style={styles.screen}>
        <AppHeader title="Survey Preview" subtitle={readOnly ? "Read only" : "Review your survey"} icon="document-text-outline" />

      <View style={styles.body}>
        <View style={styles.field}>
          <Text style={styles.label}>Site Name</Text>
          <Text style={styles.value}>{data.siteName || "-"}</Text>
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Client Name</Text>
          <Text style={styles.value}>{data.clientName || "-"}</Text>
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Description</Text>
          <Text style={styles.value}>{data.description || "-"}</Text>
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Priority</Text>
          <Text style={styles.value}>{data.priority || "-"}</Text>
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Date</Text>
          <Text style={styles.value}>{data.date || "-"}</Text>
        </View>

        <Text style={styles.label}>Photo</Text>
        {data.photo ? (
          <View>
            <Image source={{ uri: data.photo }} style={styles.image} />
            <View style={styles.urlRow}>
              <Ionicons name="link-outline" size={14} color={COLORS.subtext} />
              <Text style={styles.urlText} numberOfLines={1} ellipsizeMode="middle">{data.photo}</Text>
            </View>
          </View>
        ) : (
          <Text style={styles.value}>No photo captured</Text>
        )}

        <View style={styles.field}>
          <Text style={styles.label}>Contact</Text>
          <Text style={styles.value}>{contactName}</Text>
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Location</Text>
          <Text style={styles.value}>{locationText}</Text>
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Notes</Text>
          <Text style={styles.value}>{data.notes || "No notes"}</Text>
        </View>

        {!readOnly ? (
          <View>
            <PrimaryButton label="Edit Survey" onPress={editSurvey} color={COLORS.medium} icon="create-outline" />
            <PrimaryButton label="Submit Survey" onPress={submitSurvey} icon="checkmark-done-outline" />
          </View>
        ) : (
          <PrimaryButton label="Edit Survey" onPress={editSurvey} color={COLORS.medium} icon="create-outline" />
        )}
      </View>
      </ScrollView>
    </SafeView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.background },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  empty: { fontSize: 15, color: COLORS.subtext },
  body: { padding: 16 },
  field: { marginBottom: 14 },
  label: { fontSize: 13, fontWeight: "600", color: COLORS.subtext, marginBottom: 4 },
  value: { fontSize: 15, color: COLORS.text },
  image: { width: "100%", height: 220, borderRadius: 12, marginBottom: 8 },
  urlRow: { flexDirection: "row", alignItems: "center", marginBottom: 14 },
  urlText: { fontSize: 12, color: COLORS.subtext, marginLeft: 6, flex: 1 },
});
