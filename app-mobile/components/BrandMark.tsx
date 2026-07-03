import { Image, StyleSheet, type ImageStyle, type StyleProp } from "react-native";

type BrandMarkProps = {
  size?: number;
  style?: StyleProp<ImageStyle>;
};

/** Isotipo oficial SoyContratoFacil (logo-mark-clean). */
export function BrandMark({ size = 48, style }: BrandMarkProps) {
  return (
    <Image
      source={require("@/assets/images/icon.png")}
      style={[styles.mark, { width: size, height: size, borderRadius: size * 0.25 }, style]}
      accessibilityLabel="SoyContratoFacil"
    />
  );
}

const styles = StyleSheet.create({
  mark: {
    resizeMode: "contain",
  },
});
