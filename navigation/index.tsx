import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "react-native-screens/native-stack";

import { Home } from "../screens/Home";
import { Entry } from "../screens/Entry";
import { Photos } from "../screens/Photos";
import { colors } from "../styleguide";

import { HomeIcon } from "./HomeIcon";
import { AddIcon } from "./AddIcon";
import { PhotoIcon } from "./PhotoIcon";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const NewEntry = () => null;

function TabNavigator(props: any) {
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        style: {
          backgroundColor: colors.black,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: (props) => <HomeIcon {...props} />,
        }}
      />
      <Tab.Screen
        name="NewEntry"
        component={NewEntry}
        options={{
          tabBarButton: (innerProps: any) => {
            return (
              <TouchableOpacity
                {...innerProps}
                style={{
                  ...innerProps.style,
                  justifyContent: "center",
                  minWidth: 40,

                  alignItems: "center",
                }}
                onPress={() => props.navigation.navigate("Entry")}
              >
                <AddIcon />
              </TouchableOpacity>
            );
          },
        }}
      />
      <Tab.Screen
        name="Photos"
        component={Photos}
        options={{
          tabBarIcon: (props) => <PhotoIcon {...props} />,
        }}
      />
    </Tab.Navigator>
  );
}

export function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
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
