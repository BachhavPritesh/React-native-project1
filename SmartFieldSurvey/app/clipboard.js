import React, { useContext, useState } from "react";
import { View, Text, TextInput, ScrollView, StyleSheet, Alert } from "react-native";
import * as Clipboard from "expo-clipboard";
import { Ionicons } from "@expo/vector-icons";
import { SurveyContext } from "../constants/SurveyContext";
import { COLORS } from "../constants/theme";
import AppHeader from "../components/AppHeader";
import PrimaryButton from "../components/PrimaryButton";
import SafeView from "../components/SafeView";

export default function ClipboardScreen() {
  const { surveys, draftLocation, draftContact, setDraftNotes } = useContext(SurveyContext);
  const [pasted, setPasted] = useState("");

  const sampleSurveyId = surveys.length > 0 ? `SF-${surveys[0].id}` : "SF-0001";
  const sampleContactNumber =
    draftContact && draftContact.phoneNumbers && draftContact.phoneNumbers.length > 0
      ? draftContact.phoneNumbers[0].number
      : "+10000000000";
  const sampleLocation =
    draftLocation
      ? `Lat: ${draftLocation.latitude}, Lng: ${draftLocation.longitude}`
      : "Lat: 0.000000, Lng: 0.000000";

  async function copySurveyId() {
    await Clipboard.setStringAsync(sampleSurveyId);
    Alert.alert("Copied", "Survey ID copied to clipboard.");
  }

  async function copyContactNumber() {
    await Clipboard.setStringAsync(sampleContactNumber);
    Alert.alert("Copied", "Contact number copied to clipboard.");
  }

  async function copyLocation() {
    await Clipboard.setStringAsync(sampleLocation);
    Alert.alert("Copied", "Location copied to clipboard.");
  }

  async function pasteNotes() {
    const text = await Clipboard.getStringAsync();
    setPasted(text);
    setDraftNotes(text);
  }

  async function clearClipboard() {
    await Clipboard.setStringAsync("");
    setPasted("");
    setDraftNotes("");
    Alert.alert("Cleared", "Clipboard data cleared.");
  }

  return (
    <SafeView>
      <ScrollView style={styles.screen}>
        <AppHeader title="Clipboard" subtitle="Copy and paste helpers" icon="clipboard-outline" />

      <View style={styles.body}>
        <Text style={styles.valueBox}>{sampleSurveyId}</Text>
        <PrimaryButton label="Copy Survey ID" onPress={copySurveyId} icon="copy-outline" />

        <Text style={styles.valueBox}>{sampleContactNumber}</Text>
        <PrimaryButton label="Copy Contact Number" onPress={copyContactNumber} color={COLORS.medium} icon="call-outline" />

        <Text style={styles.valueBox}>{sampleLocation}</Text>
        <PrimaryButton label="Copy Current Location" onPress={copyLocation} color={COLORS.medium} icon="location-outline" />

        <Text style={styles.label}>Paste Notes</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={pasted}
          onChangeText={(t) => { setPasted(t); setDraftNotes(t); }}
          placeholder="Tap 'Paste Notes' to load from clipboard"
          multiline
          numberOfLines={4}
        />
        <PrimaryButton label="Paste Notes" onPress={pasteNotes} color={COLORS.medium} icon="clipboard-outline" />
        <PrimaryButton label="Clear Clipboard Data" onPress={clearClipboard} color={COLORS.danger} icon="trash-outline" />
      </View>
      </ScrollView>
    </SafeView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.background },
  body: { padding: 16 },
  valueBox: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    padding: 12,
    fontSize: 14,
    color: COLORS.text,
    marginBottom: 10,
  },
  label: { fontSize: 14, fontWeight: "600", color: COLORS.text, marginTop: 16, marginBottom: 6 },
  input: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    padding: 12,
    fontSize: 14,
    color: COLORS.text,
  },
  textArea: { height: 90, textAlignVertical: "top" },
});
