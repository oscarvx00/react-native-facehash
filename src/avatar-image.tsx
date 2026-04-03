import {
  Image,
  type StyleProp,
  type ImageStyle,
  type ImageProps,
} from "react-native";
import { useAvatarContext, type ImageLoadingStatus } from "./avatar";
import { useCallback, useEffect } from "react";

export type AvatarImageProps = Omit<ImageProps, "source"> & {
  /**
   * The image source URL. If empty or undefined, triggers error state.
   */
  source?: string | null;

  /**
   * Callback when the image loading status changes.
   */
  onLoadingStatusChange?: (status: ImageLoadingStatus) => void;

  style?: StyleProp<ImageStyle>;
};

/**
 * Image component that syncs its loading state with the Avatar context.
 * Automatically hides when loading fails, allowing fallback to show.
 *
 * @example
 * ```tsx
 * <Avatar>
 *   <AvatarImage source="/photo.jpg" />
 *   <AvatarFallback name="John Doe" />
 * </Avatar>
 * ```
 */
export function AvatarImage({
  source,
  style,
  onLoadingStatusChange,
  resizeMode = "cover",
}: AvatarImageProps) {
  const { imageLoadingStatus, onImageLoadingStatusChange } = useAvatarContext();

  const updateStatus = useCallback(
    (status: ImageLoadingStatus) => {
      onImageLoadingStatusChange(status);
      onLoadingStatusChange?.(status);
    },
    [onImageLoadingStatusChange, onLoadingStatusChange]
  );

  useEffect(() => {
    if (!source) {
      updateStatus("error");
      return;
    }

    let isMounted = true;

    const updateIfMounted = (status: ImageLoadingStatus) => {
      if (isMounted) updateStatus(status);
    };

    updateIfMounted("loading");

    Image.prefetch(source)
      .then(() => updateIfMounted("loaded"))
      .catch(() => updateIfMounted("error"));

    return () => {
      isMounted = false;
    };
  }, [source, updateStatus]);

  if (imageLoadingStatus !== "loaded") {
    return null;
  }

  return (
    <Image
      source={{ uri: source ?? undefined }}
      resizeMode={resizeMode}
      style={[
        {
          aspectRatio: 1,
          width: "100%",
          height: "100%",
        },
        style,
      ]}
    />
  );
}
