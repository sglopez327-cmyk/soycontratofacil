import { StyleSheet, Text, View } from "react-native";

import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";

type BrandTitleProps = {
  size?: "sm" | "md" | "lg";
  onDark?: boolean;
};

export function BrandTitle({ size = "md", onDark = false }: BrandTitleProps) {
  const colorScheme = useColorScheme() ?? "light";
  const colors = Colors[colorScheme];
  const textColor = onDark ? "#f8fafc" : colors.text;
  const domainColor = onDark ? "#94a3b8" : colors.textMuted;

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
  row: { flexDirection: "row", alignItems: "center" },
  name: { fontSize: 22, fontWeight: "700", letterSpacing: -0.3 },
  nameSm: { fontSize: 18 },
  nameLg: { fontSize: 28 },
  domain: { fontWeight: "600" },
});
