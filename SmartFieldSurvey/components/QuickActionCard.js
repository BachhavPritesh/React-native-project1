import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants/theme";

export default function QuickActionCard({ label, icon, color, onPress }) {
  return (
    <Pressable style={({ pressed }) => [styles.card, pressed ? styles.pressed : {}]} onPress={onPress}>
      <View style={[styles.iconBox, { backgroundColor: color + "1A" }]}>
        <Ionicons name={icon} size={24} color={color} />
      </View>
      <Text style={[styles.label, { color: COLORS.text }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 20,
    padding: 16,
    alignItems: "center",
    width: "47%",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
  },
  pressed: {
    opacity: 0.8,
  },
  iconBox: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
});
