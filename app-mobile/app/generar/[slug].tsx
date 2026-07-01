import { Stack, useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ContractWizard } from "@/components/forms/ContractWizard";
import Colors from "@/constants/Colors";
import { contractCategories } from "@/constants/contracts";
import { useColorScheme } from "@/components/useColorScheme";
import { getContractConfig } from "@/lib/contract-config";

function getContractMeta(slug: string) {
  for (const category of contractCategories) {
    const contract = category.contracts.find((item) => item.slug === slug);
    if (contract) return { title: contract.title, description: contract.description, categoryTitle: category.title };
  }
  return null;
}

export default function GenerarContratoScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const colorScheme = useColorScheme() ?? "light";
  const colors = Colors[colorScheme];
  const contractSlug = typeof slug === "string" ? slug : "";
  const config = contractSlug ? getContractConfig(contractSlug) : undefined;
  const meta = contractSlug ? getContractMeta(contractSlug) : null;

  if (!config || !meta) {
    return (
      <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]} edges={["bottom", "left", "right"]}>
        <View style={styles.notFound}>
          <Text style={[styles.notFoundTitle, { color: colors.text }]}>Contrato no encontrado</Text>
          <Text style={[styles.notFoundText, { color: colors.textMuted }]}>El tipo de documento solicitado no está disponible.</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: meta.title, headerBackTitle: "Inicio" }} />
      <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]} edges={["bottom", "left", "right"]}>
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
          <Text style={[styles.category, { color: Colors.brand.blue }]}>{meta.categoryTitle}</Text>
          <Text style={[styles.title, { color: colors.text }]}>{meta.title}</Text>
          <Text style={[styles.description, { color: colors.textMuted }]}>{meta.description}</Text>
          <ContractWizard config={config} contractTitle={meta.title} />
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
