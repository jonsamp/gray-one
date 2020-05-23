import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "@react-navigation/native";
// import HeaderScrollView from "react-native-header-scroll-view";
import LargeHeader from "../components/LargeHeader";

type Props = {};

export function Home(props: Props) {
  const { colors } = useTheme();
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
        },
      ]}
    >
      <LargeHeader title="Entries" titleStyle={{ color: colors.text }}>
        <Text style={{ color: colors.text }}>Home Screen</Text>
      </LargeHeader>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // justifyContent: "center",
    // alignItems: "center",
    flex: 1,
  },
});
