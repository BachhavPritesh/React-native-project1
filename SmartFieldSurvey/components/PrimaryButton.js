import React from "react";
import { Text, Pressable, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants/theme";

export default function PrimaryButton({ label, onPress, color, disabled, icon }) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        color ? { backgroundColor: color } : {},
        pressed ? styles.pressed : {},
        disabled ? styles.disabled : {},
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <View style={styles.inner}>
        {icon ? <Ionicons name={icon} size={18} color="#FFFFFF" style={{ marginRight: 8 }} /> : null}
        <Text style={styles.text}>{label}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  inner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  pressed: {
    opacity: 0.85,
  },
  disabled: {
    backgroundColor: COLORS.border,
  },
  text: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
