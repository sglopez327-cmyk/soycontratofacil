import { router } from "expo-router";
import { ScrollView, StyleSheet, Text, View, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { BrandTitle } from "@/components/BrandTitle";
import Colors from "@/constants/Colors";
import { contractCategories } from "@/constants/contracts";
import { useColorScheme } from "@/components/useColorScheme";

const STEPS = [
  "Elige el tipo de contrato que necesitas",
  "Completa el formulario paso a paso",
  "Descarga tu documento en PDF",
] as const;

export default function HomeScreen() {
  const colorScheme = useColorScheme() ?? "light";
  const colors = Colors[colorScheme];

  return (
    <SafeAreaView
      style={[styles.safe, { backgroundColor: colors.background }]}
      edges={["left", "right"]}
    >
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.hero, { backgroundColor: Colors.brand.navy }]}>
          <View style={styles.iconBadge}>
            <Text style={styles.iconGlyph}>📄</Text>
          </View>
          <BrandTitle size="lg" onDark />
          <Text style={styles.heroTagline}>
            Contratos legales · Sin registro · Gratis
          </Text>
          <Text style={styles.heroDescription}>
            Genera contratos de arrendamiento, compraventa y gestión en minutos,
            con plantillas legales actualizadas.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            ¿Cómo funciona?
          </Text>
          {STEPS.map((step, index) => (
            <View
              key={step}
              style={[
                styles.stepCard,
                { backgroundColor: colors.card, borderColor: colors.border },
              ]}
            >
              <View
                style={[styles.stepNumber, { backgroundColor: Colors.brand.blue }]}
              >
                <Text style={styles.stepNumberText}>{index + 1}</Text>
              </View>
              <Text style={[styles.stepText, { color: colors.text }]}>
                {step}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.contractsSection}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Contratos disponibles
          </Text>
          <Text style={[styles.sectionIntro, { color: colors.textMuted }]}>
            Elige un documento y complétalo paso a paso con las mismas
            validaciones que la web.
          </Text>

          {contractCategories.map((category) => (
            <View key={category.id} style={styles.category}>
              <Text style={[styles.categoryTitle, { color: colors.text }]}>
                {category.title}
              </Text>
              <Text style={[styles.categoryDescription, { color: colors.textMuted }]}>
                {category.description}
              </Text>

              {category.contracts.map((contract) => (
                <Pressable
                  key={contract.slug}
                  style={({ pressed }) => [
                    styles.card,
                    {
                      backgroundColor: colors.card,
                      borderColor: colors.border,
                      opacity: pressed ? 0.85 : 1,
                    },
                  ]}
                  onPress={() => router.push(`/generar/${contract.slug}`)}
                >
                  <Text style={[styles.cardTitle, { color: colors.text }]}>
                    {contract.title}
                  </Text>
                  <Text style={[styles.cardDescription, { color: colors.textMuted }]}>
                    {contract.description}
                  </Text>
                </Pressable>
              ))}
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  scroll: { paddingBottom: 32 },
  hero: {
    paddingHorizontal: 24,
    paddingTop: 28,
    paddingBottom: 32,
    gap: 12,
  },
  iconBadge: {
    width: 48,
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(148, 163, 184, 0.4)",
    backgroundColor: "rgba(30, 41, 59, 0.6)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  iconGlyph: { fontSize: 22 },
  heroTagline: {
    color: "#cbd5e1",
    fontSize: 13,
    fontWeight: "500",
    marginTop: 4,
  },
  heroDescription: {
    color: "#94a3b8",
    fontSize: 15,
    lineHeight: 22,
    marginTop: 8,
  },
  section: {
    paddingHorizontal: 20,
    paddingTop: 24,
    gap: 12,
  },
  contractsSection: {
    paddingHorizontal: 20,
    paddingTop: 32,
    gap: 8,
  },
  sectionTitle: { fontSize: 18, fontWeight: "700" },
  sectionIntro: { fontSize: 14, lineHeight: 20, marginBottom: 8 },
  stepCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
  },
  stepNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  stepNumberText: { color: "#fff", fontWeight: "700", fontSize: 14 },
  stepText: { flex: 1, fontSize: 15, lineHeight: 21 },
  category: { marginTop: 16, gap: 10 },
  categoryTitle: { fontSize: 17, fontWeight: "700" },
  categoryDescription: { fontSize: 13, marginBottom: 4 },
  card: {
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    gap: 6,
  },
  cardTitle: { fontSize: 16, fontWeight: "600" },
  cardDescription: { fontSize: 13, lineHeight: 18 },
});
