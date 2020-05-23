import React from "react";
import { AppearanceProvider } from "react-native-appearance";
import { enableScreens } from "react-native-screens";
import { Navigation } from "./navigation";

enableScreens();

export default function App() {
  return <Navigation />;
  return (
    <AppearanceProvider>
      <Navigation />
    </AppearanceProvider>
  );
}
