import * as WebBrowser from "expo-web-browser";
import { ScrollView, StyleSheet, Text, View, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { BrandTitle } from "@/components/BrandTitle";
import Colors from "@/constants/Colors";
import { WEB_BASE_URL } from "@/constants/config";
import { contractCategories } from "@/constants/contracts";
import { useColorScheme } from "@/components/useColorScheme";

export default function HomeScreen() {
  const colorScheme = useColorScheme() ?? "light";
  const colors = Colors[colorScheme];
  const totalContracts = contractCategories.reduce(
    (sum, category) => sum + category.contracts.length,
    0
  );

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
            con plantillas legales actualizadas y descarga en PDF.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            ¿Cómo funciona?
          </Text>
          {[
            "Elige el tipo de contrato que necesitas",
            "Completa el formulario paso a paso",
            "Descarga tu documento en PDF al instante",
          ].map((step, index) => (
            <View
              key={step}
              style={[
                styles.stepCard,
                {
                  backgroundColor: colors.card,
                  borderColor: colors.border,
                },
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

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Disponible ahora
          </Text>
          <Text style={[styles.sectionSubtitle, { color: colors.textMuted }]}>
            {totalContracts} tipos de documento en la pestaña Contratos.
          </Text>
        </View>

        <Pressable
          style={({ pressed }) => [
            styles.cta,
            { backgroundColor: Colors.brand.blue, opacity: pressed ? 0.9 : 1 },
          ]}
          onPress={() => WebBrowser.openBrowserAsync(WEB_BASE_URL)}
        >
          <Text style={styles.ctaText}>Abrir versión web</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  scroll: {
    paddingBottom: 32,
  },
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
  iconGlyph: {
    fontSize: 22,
  },
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
    maxWidth: 340,
  },
  section: {
    paddingHorizontal: 20,
    paddingTop: 24,
    gap: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
  },
  sectionSubtitle: {
    fontSize: 14,
    lineHeight: 20,
  },
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
  stepNumberText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
  },
  stepText: {
    flex: 1,
    fontSize: 15,
    lineHeight: 21,
  },
  cta: {
    marginHorizontal: 20,
    marginTop: 28,
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
  },
  ctaText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
