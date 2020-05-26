import React, { useState, useEffect } from "react";
import { ScrollView, View, StyleSheet, TouchableOpacity } from "react-native";
import { format } from "date-fns";
import { useTheme, useNavigation } from "@react-navigation/native";
import { Entry } from "../common/types";
import { getAllEntries } from "../common/storage";
import { Text, sg } from "../styleguide";
import { PhotoIcon, PencilIcon } from "../components/Icons";
import { EmptyMessage } from "../components/EmptyMessage";

export function Entries() {
  const navigation = useNavigation();
  const { colors }: any = useTheme();
  const [entries, setEntries] = useState<Entry[]>();

  useEffect(function didUpdate() {
    getAllEntries().then((entries) => setEntries(entries));
  });

  function byCreatedAt(a: Entry, b: Entry) {
    return b.createdAt - a.createdAt;
  }

  return entries && entries.length ? (
    <ScrollView
      style={[
        styles.container,
        {
          backgroundColor: colors.backgroundSecondary,
        },
      ]}
    >
      {entries.sort(byCreatedAt).map((entry) => (
        <TouchableOpacity
          key={entry.createdAt}
          onPress={() => navigation.navigate("Entry", entry)}
          style={[styles.listItem, { backgroundColor: colors.background }]}
        >
          <Text fontFamily="SansLight" fontSize={12} style={styles.dateLabel}>
            {format(entry.createdAt, "MMM dd yyyy @ hh:mma")}
          </Text>
          {entry.title !== undefined && (
            <Text fontFamily="SerifBold" numberOfLines={1}>
              {entry.title}
            </Text>
          )}
          {entry.body !== undefined && (
            <Text fontFamily="SerifBook" numberOfLines={2}>
              {entry.body}
            </Text>
          )}
          {entry.images?.length ? (
            <View style={[sg.displayHorizontal, { marginTop: 4, left: -2 }]}>
              {entry.images.map((image) => (
                <PhotoIcon size={24} key={image.uri} />
              ))}
            </View>
          ) : null}
        </TouchableOpacity>
      ))}
    </ScrollView>
  ) : (
    <EmptyMessage
      icon={<PencilIcon />}
      title="Create your first entry"
      description="Start your first entry by tapping the plus icon."
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listItem: {
    padding: 16,
    marginTop: 8,
    shadowOffset: { height: 2, width: 0 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  dateLabel: {
    marginBottom: 8,
  },
});
