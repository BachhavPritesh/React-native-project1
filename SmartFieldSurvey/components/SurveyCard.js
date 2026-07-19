import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { COLORS } from "../constants/theme";

const priorityColor = {
  Low: COLORS.low,
  Medium: COLORS.medium,
  High: COLORS.high,
};

export default function SurveyCard({ survey, onPress, onDelete }) {
  return (
    <Pressable style={({ pressed }) => [styles.card, pressed ? styles.pressed : {}]} onPress={onPress}>
      <View style={styles.row}>
        <Text style={styles.site}>{survey.siteName}</Text>
        <View style={[styles.badge, { backgroundColor: priorityColor[survey.priority] || COLORS.subtext }]}>
          <Text style={styles.badgeText}>{survey.priority}</Text>
        </View>
      </View>
      <Text style={styles.client}>Client: {survey.clientName}</Text>
      <Text style={styles.date}>{survey.date}</Text>
      {onDelete ? (
        <Pressable style={styles.deleteBtn} onPress={onDelete}>
          <Text style={styles.deleteText}>Delete</Text>
        </Pressable>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  pressed: {
    opacity: 0.85,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  site: {
    fontSize: 17,
    fontWeight: "bold",
    color: COLORS.text,
    flex: 1,
  },
  badge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  badgeText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
  },
  client: {
    color: COLORS.subtext,
    fontSize: 14,
    marginTop: 6,
  },
  date: {
    color: COLORS.subtext,
    fontSize: 12,
    marginTop: 4,
  },
  deleteBtn: {
    marginTop: 10,
    alignSelf: "flex-end",
    backgroundColor: "#FEE2E2",
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  deleteText: {
    color: COLORS.danger,
    fontWeight: "bold",
  },
});
