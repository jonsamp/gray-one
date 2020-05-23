import React from "react";
import { View, StyleSheet } from "react-native";
import { Path, Svg } from "react-native-svg";
import { colors } from "../styleguide";

export function AddIcon() {
  return (
    <Svg width={28} height={27} viewBox="0 0 28 27" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M26.84 12.343H16.424a.772.772 0 01-.772-.772V.771A.772.772 0 0014.882 0h-1.543a.772.772 0 00-.771.771v10.8a.772.772 0 01-.772.772H1.382a.772.772 0 00-.771.771v1.543c0 .426.345.772.771.772h10.414c.426 0 .772.345.772.771v10.029c0 .425.345.771.771.771h1.543a.772.772 0 00.771-.771V16.2c0-.426.346-.771.772-.771h10.414a.772.772 0 00.772-.772v-1.543a.772.772 0 00-.772-.771z"
        fill={colors.white}
      />
    </Svg>
  );
}
