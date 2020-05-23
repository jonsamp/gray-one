import React from "react";
import { Path, Rect, Svg } from "react-native-svg";
import { colors } from "../styleguide";

type Props = {
  focused: boolean;
};

export function PhotoIcon(props: Props) {
  const { focused } = props;
  return (
    <Svg width={40} height={30} viewBox="0 0 40 30" fill="none">
      <Rect
        width="40"
        height="30"
        rx="4"
        fill={focused ? colors.white : colors.black}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M32.353 25.412c.91 0 1.647-.737 1.647-1.647V5.647C34 4.737 33.263 4 32.353 4H7.647C6.737 4 6 4.737 6 5.647v18.118c0 .91.738 1.647 1.647 1.647h24.706zm-2.47-18.118c.454 0 .823.37.823.824v13.176a.824.824 0 01-.824.824H10.118a.824.824 0 01-.824-.824V8.118c0-.455.369-.824.824-.824h19.764zM18.67 11.673l-3.875 5.163c-.349.465-.046 1.164.506 1.164h7.75c.551 0 .854-.7.505-1.164l-3.875-5.163a.62.62 0 00-1.011 0zm6.27 2.21a1.647 1.647 0 10.001-3.294 1.647 1.647 0 000 3.293z"
        fill={focused ? colors.black : colors.white}
      />
    </Svg>
  );
}
