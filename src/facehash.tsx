import { StyleSheet, type StyleProp, type ViewStyle } from "react-native";
import { View } from "react-native";
import {
  createFacehashScene,
  type Intensity3D,
  type Variant,
  type Shape,
} from "./core";
import { useId, useMemo } from "react";
import { FacehashSceneSvg } from "./facehash-scene-svg";

export type { Intensity3D, Variant, Shape } from "./core";

export interface FacehashProps {
  /**
   * String to generate a deterministic face from.
   * Same string always produces the same face.
   */
  name: string;

  /**
   * Size in pixels or CSS units.
   * @default 40
   */
  size?: number | string;

  /**
   * Background style.
   * - "gradient": Adds gradient overlay (default)
   * - "solid": Plain background color
   * @default "gradient"
   */
  variant?: Variant;

  /**
   * 3D effect intensity.
   * @default "dramatic"
   */
  intensity3d?: Intensity3D;

  /**
   * Shape of the face container.
   * @default "circle"
   */
  shape?: Shape;

  /**
   * Show first letter of name below the face.
   * @default true
   */
  showInitial?: boolean;

  /**
   * Hex color array for inline styles.
   * Use this OR colorClasses, not both.
   */
  colors?: string[];

  /**
   * Custom gradient overlay class (Tailwind).
   * When provided, replaces the default pure CSS gradient.
   * Only used when variant="gradient".
   */
  gradientOverlayClass?: string;

  /**
   * Custom mouth renderer. When provided, replaces the initial letter.
   * Useful for showing loading spinners, custom icons, etc.
   */
  onRenderMouth?: () => React.ReactNode;

  /**
   * Enable random eye blinking animation.
   * Pure CSS animation with deterministic timing per eye.
   * @default false
   */
  enableBlink?: boolean;

  /**
   * Additional styles for the face container.
   */
  style?: StyleProp<ViewStyle>;
}

function sanitizeId(value: string): string {
  return value.replace(/[^a-zA-Z0-9_-]/g, "-");
}

export function Facehash({
  name,
  size = 40,
  variant = "gradient",
  intensity3d = "dramatic",
  shape = "circle",
  showInitial = true,
  colors,
  gradientOverlayClass,
  onRenderMouth,
  enableBlink: _enableBlink = false,
  style,
}: Readonly<FacehashProps>) {
  const reactId = useId();
  const colorsLength = colors?.length;
  const scene = useMemo(
    () =>
      createFacehashScene({
        name,
        colorsLength,
        intensity3d,
        pose: "seed",
      }),
    [name, colorsLength, intensity3d]
  );

  const colorIndex = scene.data.colorIndex;
  const backgroundColor = colors?.[colorIndex] ?? scene.data.backgroundColor;
  const svgIdPrefix = useMemo(
    () => sanitizeId(`facehash-${reactId}-${name}`),
    [reactId, name]
  );

  return (
    <View
      style={[
        styles.container,
        {
          height: size,
          width: size,
          borderRadius: shape === "circle" ? "50%" : 0,
        },
        style,
      ]}
    >
      <FacehashSceneSvg
        backgroundColor={backgroundColor ?? "transparent"}
        height="100%"
        width="100%"
        idPrefix={svgIdPrefix}
        scene={scene}
        showInitial={showInitial && !onRenderMouth}
        // TODO Mising color
        variant={gradientOverlayClass ? "solid" : variant}
      />

      {/* {
				variant === "gradient" && gradientOverlayClass && (

				)
			} */}

      {onRenderMouth && <View style={styles.mouth}>{onRenderMouth()}</View>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  mouth: {
    position: "absolute",
    left: "50%",
    top: "70%",
    zIndex: 2,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transform: "translate(-50%, -50%)",
  },
});
