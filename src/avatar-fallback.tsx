import {
  View,
  Text,
  type StyleProp,
  type ViewStyle,
  type ViewProps,
} from "react-native";
import { useAvatarContext } from "./avatar";
import { Facehash, type FacehashProps } from "./facehash";
import { useEffect, useMemo, useState } from "react";

const WHITESPACE_REGEX = /\s+/;

export type AvatarFallbackProps = Omit<ViewProps, "children"> & {
  /**
   * The name to derive initials and Facehash from.
   */
  name?: string;

  /**
   * Delay in milliseconds before showing the fallback.
   * Useful to prevent flashing when images load quickly.
   * @default 0
   */
  delayMs?: number;

  /**
   * Custom children to render instead of initials or Facehash.
   */
  children?: React.ReactNode;

  /**
   * Use the Facehash component as fallback instead of initials.
   * @default true
   */
  facehash?: boolean;

  /**
   * Props to pass to the Facehash component.
   */
  facehashProps?: Omit<FacehashProps, "name">;

  /**
   * Additional styles for the fallback container.
   */
  style?: StyleProp<ViewStyle>;
};

/**
 * Extracts initials from a name string.
 */
function getInitials(name: string): string {
  const parts = name.trim().split(WHITESPACE_REGEX);
  if (parts.length === 0) return "";
  if (parts.length === 1) return parts[0]?.charAt(0).toUpperCase() || "";
  const firstInitial = parts[0]?.charAt(0) || "";
  const lastInitial = parts.at(-1)?.charAt(0) || "";
  return (firstInitial + lastInitial).toUpperCase();
}

/**
 * Fallback component that displays when the image fails to load.
 * Uses Facehash by default, can show initials or custom content.
 *
 * @example
 * ```tsx
 * // With Facehash (default)
 * <AvatarFallback name="John Doe" />
 *
 * // With initials
 * <AvatarFallback name="John Doe" facehash={false} />
 *
 * // With custom content
 * <AvatarFallback>
 *   <UserIcon />
 * </AvatarFallback>
 * ```
 */
export function AvatarFallback({
  name = "",
  delayMs = 0,
  children,
  facehash = true,
  facehashProps,
  style,
  ...props
}: AvatarFallbackProps) {
  const { imageLoadingStatus } = useAvatarContext();
  const [canRender, setCanRender] = useState(delayMs === 0);

  useEffect(() => {
    if (delayMs > 0) {
      const timerId = setTimeout(() => setCanRender(true), delayMs);
      return () => clearTimeout(timerId);
    }
    return undefined;
  }, [delayMs]);

  const initials = useMemo(() => getInitials(name), [name]);

  const shouldRender =
    canRender &&
    imageLoadingStatus !== "loaded" &&
    imageLoadingStatus !== "loading";

  if (!shouldRender) {
    return null;
  }

  // Custom children take precedence
  if (children) {
    return (
      <View
        style={[
          {
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
          },
          style,
        ]}
        {...props}
      >
        {children}
      </View>
    );
  }

  // Facehash mode (default)
  if (facehash) {
    return (
      <Facehash
        name={name}
        size="100%"
        {...facehashProps}
        style={[style, facehashProps?.style]}
      />
    );
  }

  // Initials mode
  return (
    <View
      style={[
        {
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
        },
        style,
      ]}
      {...props}
    >
      <Text>{initials}</Text>
    </View>
  );
}
