import { ScrollView, StyleSheet, Text, View, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { BrandMark } from "@/components/BrandMark";
import { BrandTitle } from "@/components/BrandTitle";
import Colors from "@/constants/Colors";
import { cardShadow } from "@/constants/theme";
import { openContract } from "@/constants/contract-navigation";
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
          <BrandMark size={48} style={styles.heroLogo} />
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
                cardShadow,
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
            Elige un documento y complétalo paso a paso con validaciones legales
            integradas.
          </Text>

          {contractCategories.map((category) => (
            <View key={category.id} style={styles.category}>
              <Text style={[styles.categoryTitle, { color: colors.text }]}>
                {category.title}
              </Text>
              <Text style={[styles.categoryDescription, { color: colors.textSubtle }]}>
                {category.description}
              </Text>

              {category.contracts.map((contract) => (
                <Pressable
                  key={contract.slug}
                  style={({ pressed }) => [
                    styles.card,
                    cardShadow,
                    {
                      backgroundColor: colors.card,
                      borderColor: colors.border,
                      opacity: pressed ? 0.92 : 1,
                      transform: [{ scale: pressed ? 0.98 : 1 }],
                    },
                  ]}
                  onPress={() => openContract(contract.slug)}
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
  scroll: { paddingBottom: 40 },
  hero: {
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 36,
    gap: 14,
  },
  heroLogo: {
    marginBottom: 6,
  },
  heroTagline: {
    color: "#cbd5e1",
    fontSize: 13,
    fontWeight: "600",
    letterSpacing: 0.3,
    marginTop: 4,
  },
  heroDescription: {
    color: "#94a3b8",
    fontSize: 15,
    lineHeight: 24,
    marginTop: 4,
    letterSpacing: 0.1,
  },
  section: {
    paddingHorizontal: 20,
    paddingTop: 32,
    gap: 14,
    marginBottom: 8,
  },
  contractsSection: {
    paddingHorizontal: 20,
    paddingTop: 36,
    gap: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    letterSpacing: -0.3,
    marginBottom: 4,
  },
  sectionIntro: {
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 12,
    letterSpacing: 0.1,
  },
  stepCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    paddingVertical: 18,
    paddingHorizontal: 18,
    borderRadius: 16,
    borderWidth: 1,
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  stepNumberText: { color: "#fff", fontWeight: "700", fontSize: 14 },
  stepText: { flex: 1, fontSize: 15, lineHeight: 23, fontWeight: "500" },
  category: { marginTop: 28, gap: 12, marginBottom: 4 },
  categoryTitle: {
    fontSize: 17,
    fontWeight: "700",
    letterSpacing: -0.2,
  },
  categoryDescription: { fontSize: 13, lineHeight: 20, marginBottom: 6 },
  card: {
    paddingVertical: 18,
    paddingHorizontal: 18,
    borderRadius: 16,
    borderWidth: 1,
    gap: 8,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: -0.15,
  },
  cardDescription: { fontSize: 13, lineHeight: 21, letterSpacing: 0.1 },
});
