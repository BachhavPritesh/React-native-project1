import React, { useContext, useState } from "react";
import { View, Text, TextInput, FlatList, RefreshControl, ActivityIndicator, StyleSheet, Alert } from "react-native";
import * as Contacts from "expo-contacts";
import * as Clipboard from "expo-clipboard";
import { Ionicons } from "@expo/vector-icons";
import { SurveyContext } from "../constants/SurveyContext";
import { COLORS } from "../constants/theme";
import AppHeader from "../components/AppHeader";
import ContactItem from "../components/ContactItem";
import EmptyState from "../components/EmptyState";
import PrimaryButton from "../components/PrimaryButton";
import SafeView from "../components/SafeView";

export default function ContactsScreen() {
  const { setDraftContact } = useContext(SurveyContext);
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [permissionDenied, setPermissionDenied] = useState(false);

  async function loadContacts() {
    setLoading(true);
    const { status } = await Contacts.requestPermissionsAsync();
    if (status !== "granted") {
      setPermissionDenied(true);
      setLoading(false);
      return;
    }
    const result = await Contacts.getContactsAsync({
      fields: [Contacts.Fields.PhoneNumbers],
    });
    setContacts(result.data || []);
    setPermissionDenied(false);
    setLoading(false);
  }

  const filtered = contacts.filter((c) =>
    (c.name || "").toLowerCase().includes(search.toLowerCase())
  );

  async function copyNumber(contact) {
    const phone = contact.phoneNumbers && contact.phoneNumbers.length > 0
      ? contact.phoneNumbers[0].number
      : null;
    if (phone) {
      await Clipboard.setStringAsync(phone);
      Alert.alert("Copied", "Contact number copied to clipboard.");
    }
  }

  function selectContact(contact) {
    setDraftContact(contact);
    Alert.alert("Selected", `${contact.name} set as survey contact.`);
  }

  if (permissionDenied) {
    return (
      <SafeView>
        <AppHeader title="Contacts" subtitle="Device contacts" icon="people-outline" />
        <View style={styles.body}>
          <EmptyState message="Contacts permission denied. Please enable it to read contacts." icon="🚫" />
          <PrimaryButton label="Retry Permission" onPress={loadContacts} icon="refresh-outline" />
        </View>
      </SafeView>
    );
  }

  return (
    <SafeView>
      <AppHeader title="Contacts" subtitle="Select a client" icon="people-outline" />

      <View style={styles.body}>
        <View style={styles.searchBox}>
          <Ionicons name="search-outline" size={18} color={COLORS.subtext} />
          <TextInput style={styles.search} value={search} onChangeText={setSearch} placeholder="Search contacts by name" />
        </View>
        <View style={styles.counterRow}>
          <Ionicons name="people-outline" size={16} color={COLORS.subtext} />
          <Text style={styles.counter}>Total contacts: {contacts.length}</Text>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color={COLORS.primary} style={{ marginTop: 30 }} />
        ) : contacts.length === 0 ? (
          <View>
            <EmptyState message="No contacts found. Tap below to load contacts." icon="👤" />
            <PrimaryButton label="Load Contacts" onPress={loadContacts} icon="download-outline" />
          </View>
        ) : (
          <FlatList
            data={filtered}
            keyExtractor={(item, i) => i.toString()}
            renderItem={({ item }) => (
              <View>
                <ContactItem contact={item} onCopy={() => copyNumber(item)} />
                <View style={styles.selectRow}>
                  <Ionicons name="checkmark-circle-outline" size={16} color={COLORS.primary} />
                  <Text style={styles.selectText} onPress={() => selectContact(item)}>Select as contact</Text>
                </View>
              </View>
            )}
            refreshControl={<RefreshControl refreshing={loading} onRefresh={loadContacts} />}
          />
        )}
      </View>
    </SafeView>
  );
}

const styles = StyleSheet.create({
  body: { flex: 1, padding: 16 },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    paddingHorizontal: 12,
  },
  search: {
    flex: 1,
    padding: 12,
    fontSize: 15,
    color: COLORS.text,
  },
  counterRow: { flexDirection: "row", alignItems: "center", marginTop: 8, marginBottom: 8 },
  counter: { fontSize: 13, color: COLORS.subtext, marginLeft: 6 },
  selectRow: { flexDirection: "row", alignItems: "center", justifyContent: "flex-end", marginBottom: 12 },
  selectText: { color: COLORS.primary, fontSize: 13, marginLeft: 6, fontWeight: "600" },
});
