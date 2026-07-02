import { StatusBar } from "expo-status-bar";
import { Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { BrandTitle } from "@/components/BrandTitle";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";

export default function ModalScreen() {
  const colorScheme = useColorScheme() ?? "light";
  const colors = Colors[colorScheme];

  return (
    <SafeAreaView
      style={[styles.safe, { backgroundColor: colors.background }]}
      edges={["bottom", "left", "right"]}
    >
      <ScrollView contentContainerStyle={styles.scroll}>
        <BrandTitle />
        <Text style={[styles.subtitle, { color: colors.textMuted }]}>
          App móvil de SoyContratoFacil.es
        </Text>

        <View style={styles.section}>
          <Text style={[styles.heading, { color: colors.text }]}>
            Guía de uso
          </Text>
          <Text style={[styles.body, { color: colors.textMuted }]}>
            1. En Inicio, elige el documento que necesitas en Contratos disponibles.
            {"\n\n"}
            2. Completa el formulario paso a paso con los datos de las partes y del
            inmueble.
            {"\n\n"}
            3. Revisa el resumen y, en próximas versiones, descarga el PDF desde la
            app.
            {"\n\n"}
            Los contratos son gratuitos y no requieren registro.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.heading, { color: colors.text }]}>
            Formularios nativos
          </Text>
          <Text style={[styles.body, { color: colors.textMuted }]}>
            Todos los contratos del catálogo se completan dentro de la app, con las
            mismas validaciones que soycontratofacil.es. La generación de PDF en el
            dispositivo se integrará en una actualización posterior.
          </Text>
        </View>
      </ScrollView>

      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  scroll: {
    padding: 24,
    gap: 8,
  },
  subtitle: {
    fontSize: 15,
    marginTop: 4,
    marginBottom: 16,
  },
  section: {
    marginTop: 20,
    gap: 8,
  },
  heading: {
    fontSize: 17,
    fontWeight: "700",
  },
  body: {
    fontSize: 15,
    lineHeight: 22,
  },
});
