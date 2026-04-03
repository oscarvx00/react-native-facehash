import Svg, {
  Defs,
  G,
  Path,
  RadialGradient,
  Rect,
  Stop,
  Text,
} from "react-native-svg";
import type { FacehashScene, Variant } from "./core";
import { StyleSheet, type StyleProp, type ViewStyle } from "react-native";

type FacehashSceneSvgProps = {
  backgroundColor: string;
  height?: number | string;
  idPrefix: string;
  scene: FacehashScene;
  showInitial: boolean;
  style?: StyleProp<ViewStyle>;
  variant: Variant;
  width?: number | string;
};

function sanitizeId(value: string): string {
  return value.replace(/[^a-zA-Z0-9_-]/g, "-");
}

export function FacehashSceneSvg({
  backgroundColor,
  height = "100%",
  idPrefix,
  scene,
  showInitial,
  style = {},
  variant,
  width = "100%",
}: FacehashSceneSvgProps) {
  const gradientId = `${sanitizeId(idPrefix)}-gradient`;

  return (
    <Svg
      aria-hidden={true}
      style={[styles.svg, style]}
      viewBox="0 0 100 100"
      height={height}
      width={width}
    >
      <Defs>
        <RadialGradient
          cx={`${scene.gradientCenter.x}%`}
          cy={`${scene.gradientCenter.y}%`}
          id={gradientId}
          r="70%"
        >
          <Stop offset="0%" stopColor="#ffffff" stopOpacity="0.15" />
          <Stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </RadialGradient>
      </Defs>

      <Rect fill={backgroundColor} height="100" width="100" x="0" y="0" />
      {variant === "gradient" && (
        <Rect
          fill={`url(#${gradientId})`}
          height="100"
          width="100"
          x="0"
          y="0"
        />
      )}

      <G transform={scene.projection.svgTransform}>
        <G
          transform={`translate(${scene.faceBox.x} ${scene.faceBox.y}) scale(${
            scene.faceBox.width / scene.faceGeometry.viewBox.width
          } ${scene.faceBox.height / scene.faceGeometry.viewBox.height})`}
        >
          <G>
            {scene.faceGeometry.leftEyePaths.map((path) => (
              <Path d={path} fill="currentColor" key={path} />
            ))}
          </G>

          <G>
            {scene.faceGeometry.rightEyePaths.map((path) => (
              <Path d={path} fill="currentColor" key={path} />
            ))}
          </G>
        </G>
      </G>

      {showInitial && (
        <Text
          fill="currentColor"
          fontFamily="monospace"
          fontSize={scene.initialLayout.fontSize}
          fontWeight="700"
          textAnchor="middle"
          x={scene.initialLayout.x}
          y={scene.initialLayout.y}
        >
          {scene.data.initial}
        </Text>
      )}
    </Svg>
  );
}

const styles = StyleSheet.create({
  svg: {
    overflow: "visible",
  },
});
