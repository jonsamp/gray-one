import React from "react";
import { Path, Rect, Svg } from "react-native-svg";
import { colors } from "../styleguide";

type Props = {
  focused: boolean;
};

export function HomeIcon(props: Props) {
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
        d="M34.09 7.846l-1.51-1.51a3.589 3.589 0 00-2.882-1.04c-.879.078-1.687.513-2.31 1.137L17.103 16.716c-.14.14-.24.313-.29.503l-1.832 6.854a1.12 1.12 0 001.371 1.37l6.853-1.83c.19-.051.364-.151.503-.29l10.382-10.381a3.604 3.604 0 000-5.096zm-13.608 8.66l6.321-6.321 3.438 3.438-6.32 6.32-3.438-3.437zM18.9 18.09l3.436 3.437-4.688 1.252 1.252-4.689zm13.607-6.732l-.68.68L28.386 8.6l.681-.68c.515-.514 1.412-.516 1.928 0l1.51 1.51c.531.532.531 1.396 0 1.928zM4 6.5C4 5.672 4.63 5 5.406 5h15.188C21.37 5 22 5.672 22 6.5S21.37 8 20.594 8H5.406C4.63 8 4 7.328 4 6.5zM4 11.5c0-.828.606-1.5 1.354-1.5h10.292c.748 0 1.354.672 1.354 1.5s-.606 1.5-1.354 1.5H5.354C4.606 13 4 12.328 4 11.5zM4 16.5c0-.828.603-1.5 1.346-1.5h4.308c.743 0 1.346.672 1.346 1.5S10.397 18 9.654 18H5.346C4.603 18 4 17.328 4 16.5z"
        fill={focused ? colors.black : colors.white}
      />
    </Svg>
  );
}
