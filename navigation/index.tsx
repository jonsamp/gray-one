import React from "react";
import { TouchableOpacity, View, Platform } from "react-native";
import { useColorScheme } from "react-native-appearance";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "react-native-screens/native-stack";
import { useSafeArea } from "react-native-safe-area-context";

import { Home } from "../screens/Home";
import { Entry } from "../screens/Entry";
import { Photos } from "../screens/Photos";
import { darkTheme, defaultTheme } from "../styleguide";

import { HomeIcon } from "./HomeIcon";
import { AddIcon } from "./AddIcon";
import { PhotoIcon } from "./PhotoIcon";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const NewEntry = () => null;

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Entries"
        component={Home}
        options={{ headerLargeTitle: true }}
      />
    </Stack.Navigator>
  );
}

function PhotosStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Photos"
        component={Photos}
        options={{ headerLargeTitle: true }}
      />
    </Stack.Navigator>
  );
}

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
        component={HomeStack}
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
                  alignItems: "center",
                  flex: 1,
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
        component={PhotosStack}
        options={{
          tabBarIcon: (props) => <PhotoIcon {...props} />,
        }}
      />
    </Tab.Navigator>
  );
}

function MainStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={TabNavigator} />
      <Stack.Screen
        component={Entry}
        name="Entry"
        options={{ stackPresentation: "modal" }}
      />
    </Stack.Navigator>
  );
}

export function Navigation() {
  const scheme = useColorScheme();
  const insets = useSafeArea();
  const theme = scheme === "dark" ? darkTheme : defaultTheme;
  return (
    <View
      style={{
        ...Platform.select({
          android: {
            paddingTop: insets.top,
            backgroundColor: theme.colors.card,
          },
        }),
        flex: 1,
      }}
    >
      <NavigationContainer theme={theme}>
        <MainStackNavigator />
      </NavigationContainer>
    </View>
  );
}
