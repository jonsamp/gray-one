import React from "react";
import { StyleSheet, TextStyle } from "react-native";
import { Text as RNText } from "react-native";
import { useTheme } from "@react-navigation/native";

export const colors = {
  white: "#FAFAFA",
  gray1: "#EDEDED",
  gray2: "#A1A1A1",
  gray3: "#4A4744",
  black: "#1D1D1B",
};

export const darkTheme = {
  dark: true,
  colors: {
    background: colors.black,
    backgroundSecondary: "rgb(18, 18, 18)",
    shadow: colors.black,
    border: "rgb(39, 39, 41)",
    card: "rgb(18, 18, 18)",
    primary: "rgb(10, 132, 255)",
    text: colors.white,
  },
};

export const defaultTheme = {
  dark: false,
  colors: {
    background: colors.white,
    backgroundSecondary: colors.gray1,
    shadow: colors.gray2,
    border: "rgb(224, 224, 224)",
    card: "rgb(255, 255, 255)",
    primary: "rgb(0, 122, 255)",
    text: colors.black,
  },
};

export type Theme = {
  dark: boolean;
  colors: {
    background: string;
    backgroundSecondary: string;
    border: string;
    card: string;
    primary: string;
    text: string;
  };
};

export const sg = StyleSheet.create({
  displayHorizontal: {
    flexDirection: "row",
    alignItems: "center",
  },
});

type TextProps = {
  children?: string;
  fontFamily?: "SerifBold" | "SerifBook" | "SansBold" | "SansLight";
  fontSize?: number;
  style?: TextStyle;
};

export function Text(props: TextProps) {
  const { children, fontFamily = "SerifBook", fontSize = 18, style } = props;
  const { colors } = useTheme();
  return (
    <RNText style={{ color: colors.text, fontFamily, fontSize, ...style }}>
      {children}
    </RNText>
  );
}
