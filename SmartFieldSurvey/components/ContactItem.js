import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "../constants/theme";

export default function ContactItem({ contact, onCopy }) {
  const name = contact.name || "Unknown";
  const initial = name.charAt(0).toUpperCase();
  const phone = contact.phoneNumbers && contact.phoneNumbers.length > 0
    ? contact.phoneNumbers[0].number
    : null;

  return (
    <View style={styles.item}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{initial}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.name}>{name}</Text>
        {phone ? (
          <Text style={styles.phone}>{phone}</Text>
        ) : (
          <Text style={styles.noPhone}>No Number</Text>
        )}
      </View>
      {phone ? (
        <View style={styles.copyBtn}>
          <Text style={styles.copyText} onPress={onCopy}>Copy</Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  info: {
    flex: 1,
    marginLeft: 12,
  },
  name: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.text,
  },
  phone: {
    fontSize: 13,
    color: COLORS.subtext,
    marginTop: 2,
  },
  noPhone: {
    fontSize: 13,
    color: COLORS.danger,
    marginTop: 2,
  },
  copyBtn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: "#EFF4FF",
    borderRadius: 8,
  },
  copyText: {
    color: COLORS.primary,
    fontWeight: "bold",
  },
});
