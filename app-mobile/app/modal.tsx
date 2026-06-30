import { StatusBar } from "expo-status-bar";
import { Platform, ScrollView, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { BrandTitle } from "@/components/BrandTitle";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";

export default function ModalScreen() {
  const colorScheme = useColorScheme() ?? "light";
  const colors = Colors[colorScheme];

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]} edges={["bottom", "left", "right"]}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <BrandTitle />
        <Text style={[styles.subtitle, { color: colors.textMuted }]}>App móvil de SoyContratoFacil.es</Text>
        <Text style={[styles.heading, { color: colors.text }]}>Guía de uso</Text>
        <Text style={[styles.body, { color: colors.textMuted }]}>
          1. Ve a Contratos y elige el documento.{"\n\n"}
          2. Completa el formulario nativo (mismas validaciones que la web).{"\n\n"}
          3. Revisa el resumen y genera el PDF (por ahora en la web).
        </Text>
      </ScrollView>
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  scroll: { padding: 24, gap: 8 },
  subtitle: { fontSize: 15, marginTop: 4, marginBottom: 16 },
  heading: { fontSize: 17, fontWeight: "700", marginTop: 12 },
  body: { fontSize: 15, lineHeight: 22, marginTop: 8 },
});
