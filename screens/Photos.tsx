import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { format } from "date-fns";
import { useTheme, useNavigation } from "@react-navigation/native";
import { Entry } from "../common/types";
import { getAllEntries } from "../common/storage";
import { Text, sg } from "../styleguide";
import { EmptyMessage } from "../components/EmptyMessage";
import { CameraIcon } from "../components/Icons";

export function Photos() {
  const navigation = useNavigation();
  const { colors }: any = useTheme();
  const [entries, setEntries] = useState<Entry[]>();
  const screenWidth = Math.round(Dimensions.get("window").width);

  useEffect(function didUpdate() {
    getAllEntries().then((entries) => setEntries(entries));
  });

  function byCreatedAt(a: Entry, b: Entry) {
    return b.createdAt - a.createdAt;
  }

  return entries && entries.length ? (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        {
          backgroundColor: colors.backgroundSecondary,
        },
      ]}
    >
      {entries
        .filter((entry) => entry.images?.length)
        .sort(byCreatedAt)
        .map((entry) => {
          return (
            <View style={styles.listItemWrapper} key={entry.createdAt}>
              <TouchableOpacity
                onPress={() => navigation.navigate("Entry", entry)}
                style={[
                  styles.listItem,
                  { width: screenWidth / 2 - 32, height: screenWidth / 2 - 32 },
                ]}
              >
                <Image
                  source={{ uri: entry?.images && entry?.images[0].uri }}
                  style={[
                    styles.image,
                    {
                      width: screenWidth / 2 - 32,
                      height: screenWidth / 2 - 32,
                    },
                  ]}
                />
                {entry?.images && entry?.images[1] && (
                  <View>
                    <View
                      style={[
                        styles.stack,
                        {
                          width: screenWidth / 2 - 48,
                          left: 8,
                          backgroundColor: colors.backgroundTertiary,
                        },
                      ]}
                    />
                  </View>
                )}
                <Text fontFamily="SansBold" style={styles.dateLabel}>
                  {format(entry.createdAt, "MMM dd, yyyy")}
                </Text>
              </TouchableOpacity>
            </View>
          );
        })}
    </ScrollView>
  ) : (
    <EmptyMessage
      icon={<CameraIcon />}
      title="Create your first entry"
      description="Start your first entry by tapping the plus icon."
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  listItemWrapper: {
    shadowOffset: { height: 2, width: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    borderRadius: 4,
  },
  listItem: {
    marginRight: 16,
    marginTop: 16,
    borderRadius: 4,
    // overflow: "hidden",
  },
  dateLabel: {
    margin: 8,
    top: -38,
    textShadowColor: "rgba(0,0,0,0.5)",
    textShadowOffset: { height: 2, width: 0 },
    textShadowRadius: 2,
    color: "white",
  },
  image: {
    justifyContent: "center",
    alignItems: "center",
    resizeMode: "cover",
    marginRight: 16,
    borderRadius: 4,
  },
  stack: {
    height: 4,
    backgroundColor: "red",
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
});
