import { ScrollView, StyleSheet, Text, View, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Colors from "@/constants/Colors";
import { openContract } from "@/constants/contract-navigation";
import { contractCategories } from "@/constants/contracts";
import { useColorScheme } from "@/components/useColorScheme";

export default function ContratosScreen() {
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
        <Text style={[styles.intro, { color: colors.textMuted }]}>
          Toca un contrato para completarlo paso a paso en la app.
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
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  scroll: {
    padding: 20,
    paddingBottom: 32,
    gap: 8,
  },
  intro: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
  category: {
    marginTop: 20,
    gap: 10,
  },
  categoryTitle: {
    fontSize: 17,
    fontWeight: "700",
  },
  categoryDescription: {
    fontSize: 13,
    marginBottom: 4,
  },
  card: {
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    gap: 6,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  cardDescription: {
    fontSize: 13,
    lineHeight: 18,
  },
});
