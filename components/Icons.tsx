import React from "react";
import { Path, Rect, Svg } from "react-native-svg";
import { useTheme } from "@react-navigation/native";

type Props = {
  size?: number;
  fill?: string;
};

export function PhotoIcon(props: Props) {
  const { size = 40, fill } = props;
  const { colors } = useTheme();
  return (
    <Svg width={size} height={size * 0.75} viewBox="0 0 40 30" fill="none">
      <Rect width="40" height="30" rx="4" fill={fill || colors.background} />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M32.353 25.412c.91 0 1.647-.737 1.647-1.647V5.647C34 4.737 33.263 4 32.353 4H7.647C6.737 4 6 4.737 6 5.647v18.118c0 .91.738 1.647 1.647 1.647h24.706zm-2.47-18.118c.454 0 .823.37.823.824v13.176a.824.824 0 01-.824.824H10.118a.824.824 0 01-.824-.824V8.118c0-.455.369-.824.824-.824h19.764zM18.67 11.673l-3.875 5.163c-.349.465-.046 1.164.506 1.164h7.75c.551 0 .854-.7.505-1.164l-3.875-5.163a.62.62 0 00-1.011 0zm6.27 2.21a1.647 1.647 0 10.001-3.294 1.647 1.647 0 000 3.293z"
        fill={fill || colors.text}
      />
    </Svg>
  );
}

export function PencilIcon(props: Props) {
  const { size = 36 } = props;
  const { colors } = useTheme();
  return (
    <Svg width={size} height={size} viewBox="0 0 36 36" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M34.12 4.572L31.428 1.88A6.395 6.395 0 0026.292.027c-1.565.14-3.006.915-4.117 2.026L3.85 20.378a1.99 1.99 0 00-.517.896L.07 33.487c-.397 1.483.96 2.839 2.443 2.443l12.212-3.263a1.99 1.99 0 00.896-.517L34.12 13.652a6.421 6.421 0 000-9.08zM9.871 20.002L21.134 8.74l6.127 6.127-11.264 11.263-6.126-6.126zM7.05 22.828l6.122 6.123-8.354 2.232 2.232-8.355zM31.297 10.83l-1.214 1.213-6.126-6.127 1.213-1.213c.918-.916 2.517-.918 3.435 0l2.692 2.692a2.434 2.434 0 010 3.435z"
        fill={colors.text}
      />
    </Svg>
  );
}

export function CameraIcon(props: Props) {
  const { size = 34 } = props;
  const { colors } = useTheme();
  return (
    <Svg width={size} height={size * 0.911} viewBox="0 0 34 31" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M32 31H2c-1.105 0-2-.887-2-1.981V8.586c0-1.094.895-1.982 2-1.982h4.532a.999.999 0 00.88-.52l2.745-5.043A2.003 2.003 0 0111.917 0h10.166c.735 0 1.411.4 1.76 1.041l2.745 5.043c.174.321.512.52.88.52H32c1.105 0 2 .888 2 1.982v20.433A1.99 1.99 0 0132 31zM5 27.037h24c.552 0 1-.443 1-.99V11.558a.996.996 0 00-1-.991h-3.322c-.735 0-1.411-.4-1.76-1.041l-2.745-5.043a1.003 1.003 0 00-.88-.52h-6.586c-.367 0-.705.2-.88.52l-2.745 5.043a2.003 2.003 0 01-1.76 1.041H5c-.552 0-1 .444-1 .991v14.489c0 .547.448.99 1 .99zm12-12.08a2.546 2.546 0 00-2.543 2.542A2.546 2.546 0 0017 20.043a2.546 2.546 0 002.543-2.544A2.546 2.546 0 0017 14.957zM17 24a6.508 6.508 0 01-6.5-6.501A6.507 6.507 0 0117 11c3.584 0 6.5 2.915 6.5 6.499A6.508 6.508 0 0117 24z"
        fill={colors.text}
      />
    </Svg>
  );
}

export function MoreIcon(props: Props) {
  const { size = 24 } = props;
  const { colors } = useTheme();
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 13a1 1 0 100-2 1 1 0 000 2zM19 13a1 1 0 100-2 1 1 0 000 2zM5 13a1 1 0 100-2 1 1 0 000 2z"
        stroke={colors.text}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
