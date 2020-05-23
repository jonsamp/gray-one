import React, { useEffect } from "react";
import { TouchableOpacity, StatusBar } from "react-native";
import { AppearanceProvider, useColorScheme } from "react-native-appearance";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "react-native-screens/native-stack";

import { Home } from "../screens/Home";
import { Entry } from "../screens/Entry";
import { Photos } from "../screens/Photos";
import { colors, darkTheme, defaultTheme } from "../styleguide";

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
          backgroundColor: "black",
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
  const scheme = useColorScheme();

  useEffect(
    function handleUpdateScheme() {
      StatusBar.setBarStyle(
        scheme === "dark" ? "light-content" : "dark-content",
        true
      );
    },
    [scheme]
  );

  return (
    <AppearanceProvider>
      <NavigationContainer theme={scheme === "dark" ? darkTheme : defaultTheme}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={TabNavigator} />
          <Stack.Screen
            component={Entry}
            name="Entry"
            options={{ stackPresentation: "modal" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AppearanceProvider>
  );
}
