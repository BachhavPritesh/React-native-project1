import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "../constants/theme";

export default function EmptyState({ message, icon }) {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>{icon || "📭"}</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  icon: {
    fontSize: 48,
    marginBottom: 12,
  },
  message: {
    color: COLORS.subtext,
    fontSize: 15,
    textAlign: "center",
  },
});
