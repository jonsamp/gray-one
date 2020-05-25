import React, { useEffect } from "react";
import { StatusBar } from "react-native";
import { AppearanceProvider, useColorScheme } from "react-native-appearance";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { enableScreens } from "react-native-screens";
import { Navigation } from "./navigation";

enableScreens();

export default function App() {
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
      <SafeAreaProvider>
        <Navigation />
      </SafeAreaProvider>
    </AppearanceProvider>
  );
}
