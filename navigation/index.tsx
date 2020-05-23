import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "react-native-screens/native-stack";

import { Home } from "../screens/Home";
import { Entry } from "../screens/Entry";
import { Photos } from "../screens/Photos";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const NewEntry = () => null;

function TabNavigator(props: any) {
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        style: {
          backgroundColor: "black",
        },
      }}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen
        name="NewEntry"
        component={NewEntry}
        options={{
          tabBarButton: (innerProps: any) => {
            return (
              <TouchableOpacity
                {...innerProps}
                onPress={() => props.navigation.navigate("Entry")}
              >
                <Text>NEW</Text>
              </TouchableOpacity>
            );
          },
        }}
      />
      <Tab.Screen name="Photos" component={Photos} />
    </Tab.Navigator>
  );
}

export function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={TabNavigator} />
        <Stack.Screen
          component={Entry}
          name="Entry"
          options={{ stackPresentation: "modal" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
