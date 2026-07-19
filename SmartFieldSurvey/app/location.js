import React, { useContext, useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet, Alert } from "react-native";
import * as Location from "expo-location";
import * as Clipboard from "expo-clipboard";
import { Ionicons } from "@expo/vector-icons";
import { SurveyContext } from "../constants/SurveyContext";
import { COLORS } from "../constants/theme";
import AppHeader from "../components/AppHeader";
import PrimaryButton from "../components/PrimaryButton";
import SafeView from "../components/SafeView";

export default function LocationScreen() {
  const { draftLocation, setDraftLocation } = useContext(SurveyContext);
  const [loading, setLoading] = useState(false);
  const [permissionDenied, setPermissionDenied] = useState(false);

  async function getLocation() {
    setLoading(true);
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setPermissionDenied(true);
      setLoading(false);
      return;
    }
    const loc = await Location.getCurrentPositionAsync({});
    const data = {
      latitude: loc.coords.latitude.toFixed(6),
      longitude: loc.coords.longitude.toFixed(6),
      accuracy: loc.coords.accuracy ? loc.coords.accuracy.toFixed(1) : "N/A",
    };
    setDraftLocation(data);
    setLoading(false);
  }

  async function copyLocation() {
    if (!draftLocation) {
      Alert.alert("No Location", "Please fetch your location first.");
      return;
    }
    const text = `Lat: ${draftLocation.latitude}, Lng: ${draftLocation.longitude}`;
    await Clipboard.setStringAsync(text);
    Alert.alert("Copied", "Current location copied to clipboard.");
  }

  return (
    <SafeView>
      <AppHeader title="Location" subtitle="GPS coordinates" icon="location-outline" />

      <View style={styles.body}>
        {permissionDenied ? (
          <View style={styles.card}>
            <Ionicons name="location-outline" size={40} color={COLORS.danger} style={{ marginBottom: 10 }} />
            <Text style={styles.denied}>Location permission was denied. Please enable it in settings.</Text>
            <PrimaryButton label="Retry Permission" onPress={getLocation} icon="refresh-outline" />
          </View>
        ) : (
          <View style={styles.card}>
            {loading ? (
              <ActivityIndicator size="large" color={COLORS.primary} />
            ) : draftLocation ? (
              <View style={styles.dataBox}>
                <View style={styles.dataRow}>
                  <Ionicons name="location-outline" size={18} color={COLORS.primary} />
                  <Text style={styles.row}>Latitude: {draftLocation.latitude}</Text>
                </View>
                <View style={styles.dataRow}>
                  <Ionicons name="compass-outline" size={18} color={COLORS.primary} />
                  <Text style={styles.row}>Longitude: {draftLocation.longitude}</Text>
                </View>
                <View style={styles.dataRow}>
                  <Ionicons name="radio-outline" size={18} color={COLORS.primary} />
                  <Text style={styles.row}>Accuracy: {draftLocation.accuracy} m</Text>
                </View>
              </View>
            ) : (
              <View style={styles.hintBox}>
                <Ionicons name="navigate-outline" size={40} color={COLORS.subtext} style={{ marginBottom: 8 }} />
                <Text style={styles.hint}>Tap below to fetch your current location.</Text>
              </View>
            )}
          </View>
        )}

        <PrimaryButton label={loading ? "Loading..." : "Refresh Location"} onPress={getLocation} disabled={loading} icon="locate-outline" />
        <PrimaryButton label="Copy Current Location" onPress={copyLocation} color={COLORS.medium} icon="copy-outline" />
      </View>
    </SafeView>
  );
}

const styles = StyleSheet.create({
  body: { padding: 16 },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 14,
    padding: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 14,
    alignItems: "center",
  },
  dataBox: { width: "100%" },
  dataRow: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  row: { fontSize: 16, color: COLORS.text, marginLeft: 10 },
  hintBox: { alignItems: "center", paddingVertical: 10 },
  hint: { fontSize: 14, color: COLORS.subtext, textAlign: "center" },
  denied: { fontSize: 14, color: COLORS.danger, textAlign: "center", marginBottom: 12 },
});
