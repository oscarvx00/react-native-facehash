import { createContext, useContext, useMemo, useState } from "react";
import {
  View,
  type StyleProp,
  type ViewStyle,
  type ViewProps,
  StyleSheet,
} from "react-native";
import type { Shape } from "./core";

export type ImageLoadingStatus = "idle" | "loading" | "loaded" | "error";

export type AvatarContextValue = {
  imageLoadingStatus: ImageLoadingStatus;
  onImageLoadingStatusChange: (status: ImageLoadingStatus) => void;
};

const AvatarContext = createContext<AvatarContextValue | null>(null);

/**
 * Hook to access the Avatar context.
 * Throws an error if used outside of Avatar.
 */
export const useAvatarContext = () => {
  const context = useContext(AvatarContext);
  if (!context) {
    throw new Error(
      "Avatar compound components must be rendered within an Avatar component"
    );
  }
  return context;
};

export type AvatarProps = ViewProps & {
  shape?: Shape;
  style?: StyleProp<ViewStyle>;
};

/**
 * Root avatar component that provides context for image loading state.
 *
 * @example
 * ```tsx
 * <Avatar style={{ width: 40, height: 40, borderRadius: 20, overflow: "hidden" }}>
 *   <AvatarImage source="/photo.jpg" />
 *   <AvatarFallback name="John Doe" />
 * </Avatar>
 * ```
 */
export function Avatar({
  children,
  style,
  shape = "circle",
  ...props
}: AvatarProps) {
  const [imageLoadingStatus, setImageLoadingStatus] =
    useState<ImageLoadingStatus>("idle");

  const contextValue: AvatarContextValue = useMemo(
    () => ({
      imageLoadingStatus,
      onImageLoadingStatusChange: setImageLoadingStatus,
    }),
    [imageLoadingStatus]
  );

  return (
    <AvatarContext.Provider value={contextValue}>
      <View
        style={[
          styles.avatar,
          {
            borderRadius: shape === "circle" ? 9999 : 4,
          },
          style,
        ]}
        {...props}
      >
        {children}
      </View>
    </AvatarContext.Provider>
  );
}

const styles = StyleSheet.create({
  avatar: {
    flexShrink: 0,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
});
