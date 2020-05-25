import React, { useEffect } from "react";
import { View, Text, StyleSheet, StatusBar, Platform } from "react-native";
import { useTheme } from "@react-navigation/native";

type Props = {};

export function Entry(props: Props) {
  const theme = useTheme();
  useEffect(function updateStatusBar() {
    if (Platform.OS === "ios") {
      StatusBar.setBarStyle("light-content", true);
      return () =>
        StatusBar.setBarStyle(
          theme.dark ? "light-content" : "dark-content",
          true
        );
    }
  });
  return (
    <View style={styles.container}>
      <Text>Entry Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});
