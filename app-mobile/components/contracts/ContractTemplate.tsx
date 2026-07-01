import { Stack } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ContractWizard } from "@/components/forms/ContractWizard";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { findCatalogContract } from "@/lib/contract-catalog";
import { getContractConfig } from "@/lib/contract-config";
import { isNativeContract } from "@/lib/native-contract-registry";

type ContractTemplateProps = {
  slug: string;
};

/**
 * Pantalla reutilizable para cualquier contrato nativo.
 * No crear un archivo por contrato: añade el slug a native-contract-registry.ts
 * y define sus pasos en contract-config.ts (compartido con la web).
 */
export function ContractTemplate({ slug }: ContractTemplateProps) {
  const colorScheme = useColorScheme() ?? "light";
  const colors = Colors[colorScheme];
  const catalogEntry = findCatalogContract(slug);
  const config = getContractConfig(slug);
  const isReady = Boolean(catalogEntry && config && isNativeContract(slug));

  if (!isReady || !catalogEntry || !config) {
    return (
      <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]} edges={["bottom", "left", "right"]}>
        <View style={styles.notFound}>
          <Text style={[styles.notFoundTitle, { color: colors.text }]}>Contrato no disponible</Text>
          <Text style={[styles.notFoundText, { color: colors.textMuted }]}>
            Este documento aún no tiene formulario nativo en la app.
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
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Text style={[styles.category, { color: Colors.brand.blue }]}>{category.title}</Text>
          <Text style={[styles.title, { color: colors.text }]}>{contract.title}</Text>
          <Text style={[styles.description, { color: colors.textMuted }]}>{contract.description}</Text>
          <ContractWizard config={config} contractTitle={contract.title} />
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  scroll: { padding: 20, paddingBottom: 32, gap: 8 },
  category: { fontSize: 12, fontWeight: "700", textTransform: "uppercase", letterSpacing: 0.8 },
  title: { fontSize: 26, fontWeight: "700", letterSpacing: -0.3 },
  description: { fontSize: 15, lineHeight: 22, marginBottom: 8 },
  notFound: { flex: 1, alignItems: "center", justifyContent: "center", padding: 24, gap: 8 },
  notFoundTitle: { fontSize: 20, fontWeight: "700" },
  notFoundText: { fontSize: 15, textAlign: "center" },
});
