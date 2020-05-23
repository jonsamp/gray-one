import React from "react";
import { View, Text, StyleSheet } from "react-native";

type Props = {};

export function Photos(props: Props) {
  return (
    <View style={styles.container}>
      <Text>Photos Screen</Text>
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
