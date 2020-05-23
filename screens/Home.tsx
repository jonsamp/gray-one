import React from "react";
import { View, Text, StyleSheet } from "react-native";

type Props = {};

export function Home(props: Props) {
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
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
