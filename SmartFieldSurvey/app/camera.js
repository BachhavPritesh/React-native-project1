import React, { useContext, useRef, useState } from "react";
import { View, Text, Image, ActivityIndicator, StyleSheet, Alert } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";
import { SurveyContext } from "../constants/SurveyContext";
import { COLORS } from "../constants/theme";
import AppHeader from "../components/AppHeader";
import PrimaryButton from "../components/PrimaryButton";
import SafeView from "../components/SafeView";

export default function Camera() {
  const cameraRef = useRef(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [captured, setCaptured] = useState(null);
  const [captureTime, setCaptureTime] = useState("");
  const { setDraftPhoto } = useContext(SurveyContext);

  if (!permission) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <SafeView>
        <AppHeader title="Camera" subtitle="Permission needed" icon="camera-outline" />
        <View style={styles.center}>
          <Ionicons name="camera-outline" size={48} color={COLORS.subtext} style={{ marginBottom: 12 }} />
          <Text style={styles.msg}>We need camera permission to capture survey photos.</Text>
          <PrimaryButton label="Grant Permission" onPress={requestPermission} />
        </View>
      </SafeView>
    );
  }

  async function takePhoto() {
    if (cameraRef.current) {
      const result = await cameraRef.current.takePictureAsync();
      setCaptured(result.uri);
      setCaptureTime(new Date().toLocaleTimeString());
    }
  }

  function retake() {
    setCaptured(null);
    setCaptureTime("");
  }

  function deletePhoto() {
    Alert.alert("Delete Photo", "Are you sure you want to delete this photo?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          setCaptured(null);
          setCaptureTime("");
          setDraftPhoto(null);
        },
      },
    ]);
  }

  function usePhoto() {
    setDraftPhoto(captured);
    Alert.alert("Saved", "Photo added to your survey draft.");
  }

  return (
    <SafeView>
      <AppHeader title="Camera" subtitle="Capture survey photo" icon="camera-outline" />

      <View style={styles.body}>
        {captured ? (
          <View style={styles.previewBox}>
            <Image source={{ uri: captured }} style={styles.image} />
            <View style={styles.timeRow}>
              <Ionicons name="time-outline" size={14} color={COLORS.subtext} />
              <Text style={styles.time}>Captured at: {captureTime}</Text>
            </View>
            <PrimaryButton label="Use This Photo" onPress={usePhoto} icon="checkmark-circle-outline" />
            <PrimaryButton label="Retake Photo" onPress={retake} color={COLORS.medium} icon="refresh-outline" />
            <PrimaryButton label="Delete Photo" onPress={deletePhoto} color={COLORS.danger} icon="trash-outline" />
          </View>
        ) : (
          <View style={styles.cameraBox}>
            <CameraView style={styles.camera} ref={cameraRef} />
            <PrimaryButton label="Capture Photo" onPress={takePhoto} icon="camera-outline" />
          </View>
        )}
      </View>
    </SafeView>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: "center", justifyContent: "center", padding: 30 },
  msg: { fontSize: 15, color: COLORS.subtext, textAlign: "center", marginBottom: 16 },
  body: { padding: 16 },
  cameraBox: { borderRadius: 14, overflow: "hidden" },
  camera: { width: "100%", height: 420, borderRadius: 14, marginBottom: 14 },
  previewBox: { alignItems: "center" },
  image: { width: "100%", height: 360, borderRadius: 14, marginBottom: 10 },
  timeRow: { flexDirection: "row", alignItems: "center", marginBottom: 14 },
  time: { fontSize: 13, color: COLORS.subtext, marginLeft: 6 },
});
