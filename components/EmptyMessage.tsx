import React, { ReactNode } from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "../styleguide";

type Props = {
  title: string;
  description: string;
  icon: ReactNode;
};

export function EmptyMessage(props: Props) {
  const { title, description, icon } = props;
  return (
    <View style={styles.container}>
      {icon}
      <Text fontFamily="SerifBold" style={{ marginTop: 16 }}>
        {title}
      </Text>
      <Text fontFamily="SerifBook" fontSize={14}>
        {description}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    opacity: 0.75,
    top: "-20%",
  },
});
