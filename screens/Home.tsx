import React, { useState, useEffect } from "react";
import { ScrollView, Text, StyleSheet, TouchableOpacity } from "react-native";
import { format } from "date-fns";
import AsyncStorage from "@react-native-community/async-storage";
import { useTheme, NavigationProp } from "@react-navigation/native";

type Props = {
  navigation: NavigationProp<any>;
};

export function Home(props: Props) {
  const { navigation } = props;
  const { colors } = useTheme();
  const [entries, setEntries] = useState();

  useEffect(function didUpdate() {
    const getAllEntries = async () => {
      let keys: string[] = [];
      try {
        const foundKeys = await AsyncStorage.getAllKeys();

        foundKeys.forEach((foundKey) => {
          if (foundKey.match("@grayOne/entries")) {
            keys.push(foundKey);
          }
        });
      } catch (e) {
        console.log("error!", e);
      }

      let entries;

      try {
        entries = await AsyncStorage.multiGet(keys);
        const formattedEntries = entries
          .map((entry) => {
            try {
              return JSON.parse(entry[1]);
            } catch (e) {
              return null;
            }
          })
          .filter(Boolean);

        setEntries(formattedEntries);
      } catch (e) {
        console.log("error!", e);
      }
    };

    getAllEntries();
  });

  // AsyncStorage.clear();

  return (
    <ScrollView
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
        },
      ]}
    >
      {entries
        ? entries
            .sort((a, b) => b.createdAt - a.createdAt)
            .map((entry) => (
              <TouchableOpacity
                key={entry.createdAt}
                onPress={() => navigation.navigate("Entry", entry)}
                style={{ padding: 16 }}
              >
                <Text>{format(entry.createdAt, "MMM dd yyyy @ hh:mma")}</Text>
                <Text>{entry.title}</Text>
              </TouchableOpacity>
            ))
        : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    // justifyContent: "center",
    // alignItems: "center",
    flex: 1,
  },
});
