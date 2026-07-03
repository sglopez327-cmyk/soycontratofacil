import { Stack } from "expo-router";
import { useRef } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ContractWizard } from "@/components/forms/ContractWizard";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { findCatalogContract } from "@/lib/contract-catalog";
import { getContractConfig } from "@/lib/contract-config";

type ContractTemplateProps = {
  slug: string;
};

/**
 * Pantalla reutilizable para cualquier contrato del catálogo.
 * Los pasos y validaciones viven en contract-config.ts (compartido con la web).
 */
export function ContractTemplate({ slug }: ContractTemplateProps) {
  const colorScheme = useColorScheme() ?? "light";
  const colors = Colors[colorScheme];
  const scrollRef = useRef<ScrollView>(null);
  const catalogEntry = findCatalogContract(slug);
  const config = getContractConfig(slug);

  if (!catalogEntry || !config) {
    return (
      <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]} edges={["bottom", "left", "right"]}>
        <View style={styles.notFound}>
          <Text style={[styles.notFoundTitle, { color: colors.text }]}>Contrato no encontrado</Text>
          <Text style={[styles.notFoundText, { color: colors.textMuted }]}>
            El tipo de documento solicitado no está disponible.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const { contract, category } = catalogEntry;

  return (
    <>
      <Stack.Screen options={{ title: contract.title, headerBackTitle: "Inicio" }} />
      <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]} edges={["bottom", "left", "right"]}>
        <ScrollView
          ref={scrollRef}
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Text style={[styles.category, { color: Colors.brand.blue }]}>{category.title}</Text>
          <Text style={[styles.title, { color: colors.text }]}>{contract.title}</Text>
          <Text style={[styles.description, { color: colors.textMuted }]}>{contract.description}</Text>
          <ContractWizard
            config={config}
            contractTitle={contract.title}
            scrollRef={scrollRef}
          />
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  scroll: { padding: 20, paddingBottom: 40, gap: 12 },
  category: {
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.9,
  },
  title: { fontSize: 26, fontWeight: "700", letterSpacing: -0.4 },
  description: {
    fontSize: 15,
    lineHeight: 24,
    marginBottom: 12,
    letterSpacing: 0.1,
  },
  notFound: { flex: 1, alignItems: "center", justifyContent: "center", padding: 24, gap: 10 },
  notFoundTitle: { fontSize: 20, fontWeight: "700", letterSpacing: -0.2 },
  notFoundText: { fontSize: 15, textAlign: "center", lineHeight: 22 },
});
