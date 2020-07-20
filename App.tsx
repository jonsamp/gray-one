import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "@use-expo/font";
import { AppearanceProvider, useColorScheme } from "react-native-appearance";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { enableScreens } from "react-native-screens";
import { Navigation } from "./navigation";

import SansBold from "./assets/Inter-Bold.otf";
import SansLight from "./assets/Inter-Light-BETA.otf";
import SerifBold from "./assets/sentinel-bold.otf";
import SerifBook from "./assets/sentinel-book.otf";

enableScreens();

export default function App() {
  const scheme = useColorScheme();
  const [isLoaded] = useFonts({
    SansBold,
    SansLight,
    SerifBold,
    SerifBook,
  });

  if (!isLoaded) return null;

  return (
    <AppearanceProvider>
      <SafeAreaProvider>
        <ActionSheetProvider>
          <>
            <StatusBar style={scheme === "dark" ? "light" : "dark"} animated />
            <Navigation />
          </>
        </ActionSheetProvider>
      </SafeAreaProvider>
    </AppearanceProvider>
  );
}
