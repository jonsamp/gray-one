import React, { useEffect } from "react";
import { StatusBar } from "react-native";
import { useFonts } from "@use-expo/font";
import { AppearanceProvider, useColorScheme } from "react-native-appearance";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { enableScreens } from "react-native-screens";
import { Navigation } from "./navigation";

enableScreens();

export default function App() {
  const scheme = useColorScheme();
  const [isLoaded] = useFonts({
    SansBold: require("./assets/Inter-Bold.otf"),
    SansLight: require("./assets/Inter-Light-BETA.otf"),
    SerifBold: require("./assets/sentinel-bold.otf"),
    SerifBook: require("./assets/sentinel-book.otf"),
  });

  useEffect(
    function handleUpdateScheme() {
      StatusBar.setBarStyle(
        scheme === "dark" ? "light-content" : "dark-content",
        true
      );
    },
    [scheme]
  );

  if (!isLoaded) return null;

  return (
    <AppearanceProvider>
      <SafeAreaProvider>
        <ActionSheetProvider>
          <Navigation />
        </ActionSheetProvider>
      </SafeAreaProvider>
    </AppearanceProvider>
  );
}
