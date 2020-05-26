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
    backgroundTertiary: "#2B2B28",
    shadow: colors.black,
    border: "rgb(39, 39, 41)",
    card: "rgb(18, 18, 18)",
    primary: "rgb(10, 132, 255)",
    text: colors.white,
    placeholderText: "rgba(255, 255, 255, 0.3)",
  },
};

export const defaultTheme = {
  dark: false,
  colors: {
    background: colors.white,
    backgroundSecondary: colors.gray1,
    backgroundTertiary: colors.gray1,
    shadow: colors.gray2,
    border: "rgb(224, 224, 224)",
    card: "rgb(255, 255, 255)",
    primary: "rgb(0, 122, 255)",
    text: colors.black,
    placeholderText: "rgba(0, 0, 0, 0.3)",
  },
};

export type Theme = {
  dark: boolean;
  colors: {
    background: string;
    backgroundSecondary: string;
    backgroundTertiary: string;
    border: string;
    card: string;
    primary: string;
    text: string;
    placeholderText: string;
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
  [i: string]: any;
};

export function Text(props: TextProps) {
  const {
    children,
    fontFamily = "SerifBook",
    fontSize = 18,
    style,
    ...rest
  } = props;
  const { colors } = useTheme();
  return (
    <RNText
      style={{ color: colors.text, fontFamily, fontSize, ...style }}
      {...rest}
    >
      {children}
    </RNText>
  );
}
