import { useEffect, useMemo, useState } from "react";
import { ActivityIndicator, Alert, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { FormField } from "@/components/forms/FormField";
import { PartesForm } from "@/components/forms/PartesForm";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import type { ContractConfig } from "@/lib/contract-config";
import { createEmptyFormValues, getConfigFields, validateStep } from "@/lib/contract-config";
import { formatContractFieldValue } from "@/lib/format-contract-value";
import { generateContractPdf } from "@/lib/generate-contract-pdf";

type ContractWizardProps = {
  config: ContractConfig;
  contractTitle: string;
  scrollRef?: React.RefObject<ScrollView | null>;
};

export function ContractWizard({ config, contractTitle, scrollRef }: ContractWizardProps) {
  const colorScheme = useColorScheme() ?? "light";
  const colors = Colors[colorScheme];
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [values, setValues] = useState(() => createEmptyFormValues(config));
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isComplete, setIsComplete] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  const steps = config.steps;
  const currentStep = steps[currentStepIndex];
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === steps.length - 1;
  const allFields = useMemo(() => getConfigFields(config), [config]);

  useEffect(() => {
    scrollRef?.current?.scrollTo({ y: 0, animated: true });
  }, [currentStepIndex, isComplete, scrollRef]);

  function updateValue(fieldId: string, value: string) {
    setValues((prev) => ({ ...prev, [fieldId]: value }));
    setErrors((prev) => {
      if (!prev[fieldId]) return prev;
      const next = { ...prev };
      delete next[fieldId];
      return next;
    });
  }

  function goToStep(index: number) {
    if (index < 0 || index >= steps.length || index > currentStepIndex) return;
    setErrors({});
    setCurrentStepIndex(index);
    setIsComplete(false);
  }

  function handleNext() {
    const stepErrors = validateStep(currentStep, values, config);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }
    setErrors({});
    if (isLastStep) {
      setIsComplete(true);
      return;
    }
    setCurrentStepIndex((i) => i + 1);
  }

  async function handleGeneratePdf() {
    setIsGeneratingPdf(true);
    try {
      await generateContractPdf({ config, contractTitle, values });
    } catch {
      Alert.alert("Error", "No se pudo generar el PDF. Inténtalo de nuevo.");
    } finally {
      setIsGeneratingPdf(false);
    }
  }

  return (
    <View style={styles.wrapper}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.stepsRow}>
        {steps.map((step, index) => {
          const isActive = index === currentStepIndex && !isComplete;
          const isDone = index < currentStepIndex || isComplete;
          return (
            <Pressable
              key={step.id}
              disabled={index >= currentStepIndex}
              onPress={() => goToStep(index)}
              style={[
                styles.stepChip,
                {
                  backgroundColor: isActive ? Colors.brand.blue : isDone ? "rgba(16,185,129,0.15)" : colors.card,
                  borderColor: isActive ? Colors.brand.blue : isDone ? Colors.brand.emerald : colors.border,
                },
              ]}
            >
              <Text
                style={[
                  styles.stepChipText,
                  { color: isActive ? "#fff" : isDone ? Colors.brand.emerald : colors.textMuted },
                ]}
              >
                {index + 1}. {step.title}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      <View style={[styles.panel, { backgroundColor: colors.card, borderColor: colors.border }]}>
        {isComplete ? (
          <View style={styles.content}>
            <Text style={[styles.heading, { color: colors.text }]}>Datos listos para generar</Text>
            <Text style={[styles.description, { color: colors.textMuted }]}>
              Revisa el resumen de tu contrato de {contractTitle}. Pulsa «Generar PDF» para
              guardarlo o compartirlo desde tu dispositivo.
            </Text>
            <View style={[styles.summaryList, { borderColor: colors.border }]}>
              {allFields
                .filter((field) => values[field.id]?.trim())
                .map((field) => (
                  <View key={field.id} style={[styles.summaryRow, { borderColor: colors.border }]}>
                    <Text style={[styles.summaryLabel, { color: colors.textMuted }]}>{field.label}</Text>
                    <Text style={[styles.summaryValue, { color: colors.text }]}>
                      {formatContractFieldValue(field, values[field.id])}
                    </Text>
                  </View>
                ))}
            </View>
            <View style={styles.actions}>
              <Pressable
                style={[styles.secondaryButton, { borderColor: colors.border }]}
                disabled={isGeneratingPdf}
                onPress={() => setIsComplete(false)}
              >
                <Text style={[styles.secondaryButtonText, { color: colors.text }]}>Editar datos</Text>
              </Pressable>
              <Pressable
                style={[styles.primaryButton, isGeneratingPdf && styles.primaryButtonDisabled]}
                disabled={isGeneratingPdf}
                onPress={handleGeneratePdf}
              >
                {isGeneratingPdf ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.primaryButtonText}>Generar PDF</Text>
                )}
              </Pressable>
            </View>
          </View>
        ) : (
          <View style={styles.content}>
            <Text style={[styles.stepLabel, { color: Colors.brand.blue }]}>
              Paso {currentStepIndex + 1} de {steps.length}
            </Text>
            <Text style={[styles.heading, { color: colors.text }]}>{currentStep.title}</Text>
            {currentStep.description ? (
              <Text style={[styles.description, { color: colors.textMuted }]}>{currentStep.description}</Text>
            ) : null}
            <View style={styles.fields}>
              {currentStep.partyForm ? (
                <PartesForm variant={currentStep.partyForm} values={values} errors={errors} onChange={updateValue} />
              ) : null}
              {currentStep.fields.map((field) => (
                <FormField
                  key={field.id}
                  field={field}
                  value={values[field.id] ?? ""}
                  error={errors[field.id]}
                  onChange={(value) => updateValue(field.id, value)}
                />
              ))}
            </View>
            <View style={styles.actions}>
              <Pressable
                style={[styles.secondaryButton, { borderColor: colors.border, opacity: isFirstStep ? 0.5 : 1 }]}
                disabled={isFirstStep}
                onPress={() => {
                  setIsComplete(false);
                  setCurrentStepIndex((i) => Math.max(0, i - 1));
                  setErrors({});
                }}
              >
                <Text style={[styles.secondaryButtonText, { color: colors.text }]}>Anterior</Text>
              </Pressable>
              <Pressable style={styles.primaryButton} onPress={handleNext}>
                <Text style={styles.primaryButtonText}>
                  {isLastStep ? "Revisar y finalizar" : "Siguiente"}
                </Text>
              </Pressable>
            </View>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { gap: 16 },
  stepsRow: { gap: 8, paddingVertical: 4 },
  stepChip: { borderWidth: 1, borderRadius: 999, paddingHorizontal: 14, paddingVertical: 8 },
  stepChipText: { fontSize: 13, fontWeight: "600" },
  panel: { borderWidth: 1, borderRadius: 16, padding: 16 },
  content: { gap: 14 },
  stepLabel: { fontSize: 12, fontWeight: "700", textTransform: "uppercase", letterSpacing: 0.8 },
  heading: { fontSize: 20, fontWeight: "700" },
  description: { fontSize: 14, lineHeight: 21 },
  fields: { gap: 16, marginTop: 4 },
  summaryList: { borderWidth: 1, borderRadius: 12, overflow: "hidden" },
  summaryRow: { gap: 4, paddingHorizontal: 14, paddingVertical: 12, borderBottomWidth: 1 },
  summaryLabel: { fontSize: 13 },
  summaryValue: { fontSize: 15, fontWeight: "600" },
  actions: { flexDirection: "row", gap: 10, marginTop: 8 },
  primaryButton: {
    flex: 1,
    backgroundColor: Colors.brand.blue,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    minHeight: 48,
    justifyContent: "center",
  },
  primaryButtonText: { color: "#fff", fontSize: 15, fontWeight: "600", textAlign: "center" },
  primaryButtonDisabled: { opacity: 0.7 },
  secondaryButton: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    minHeight: 48,
    justifyContent: "center",
  },
  secondaryButtonText: { fontSize: 15, fontWeight: "600" },
});
