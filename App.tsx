import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

function HomeScreen(props: any) {
  const { navigation } = props;

  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Entry"
        onPress={() => navigation.navigate("Entry")}
      />
    </View>
  );
}

function EntryScreen(props: any) {
  const { navigation } = props;
  return (
    <View style={styles.container}>
      <Text>Entry Screen</Text>
      <Button title="Go to Home" onPress={() => navigation.goBack()} />
    </View>
  );
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen component={HomeScreen} name="Home" />
        <Stack.Screen component={EntryScreen} name="Entry" />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
