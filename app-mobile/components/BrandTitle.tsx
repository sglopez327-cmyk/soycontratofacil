import { StyleSheet, Text, View } from "react-native";

import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";

type BrandTitleProps = {
  size?: "sm" | "md" | "lg";
  /** Texto claro sobre fondos oscuros (p. ej. cabecera). */
  onDark?: boolean;
};

export function BrandTitle({ size = "md", onDark = false }: BrandTitleProps) {
  const colorScheme = useColorScheme() ?? "light";
  const colors = Colors[colorScheme];
  const textColor = onDark ? "#f1f5f9" : colors.text;
  const domainColor = onDark ? Colors.brand.blue : colors.textMuted;

  return (
    <View style={styles.row}>
      <Text
        style={[
          styles.name,
          size === "sm" && styles.nameSm,
          size === "lg" && styles.nameLg,
          { color: textColor },
        ]}
      >
        SoyContratoFacil
        <Text style={[styles.domain, { color: domainColor }]}>.es</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  name: {
    fontSize: 22,
    fontWeight: "700",
    letterSpacing: -0.4,
  },
  nameSm: {
    fontSize: 18,
  },
  nameLg: {
    fontSize: 28,
  },
  domain: {
    fontWeight: "600",
  },
});
