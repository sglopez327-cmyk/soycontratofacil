"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronLeft, ChevronRight, FileCheck2, Loader2 } from "lucide-react";

import { ContractField } from "@/components/generar/contract-field";
import { PartesForm } from "@/components/generar/partes-form";
import { Button } from "@/components/ui/button";
import type {
  ContractConfig,
  ContractStepDefinition,
} from "@/lib/contract-config";
import {
  createEmptyFormValues,
  getConfigFields,
  validateStep,
} from "@/lib/contract-config";
import { formatContractFieldValue } from "@/lib/format-contract-value";
import {
  buildContractDocumentData,
  generateContractPdf,
} from "@/lib/generate-contract-pdf";
import { cn } from "@/lib/utils";

type ContractWizardProps = {
  config: ContractConfig;
  contractTitle: string;
};

const stepMotion = {
  initial: { opacity: 0, x: 16 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -16 },
};

export function ContractWizard({ config, contractTitle }: ContractWizardProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [values, setValues] = useState(() => createEmptyFormValues(config));
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isComplete, setIsComplete] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const steps = config.steps;
  const currentStep = steps[currentStepIndex];
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === steps.length - 1;
  const allFields = useMemo(() => getConfigFields(config), [config]);

  function updateValue(fieldId: string, value: string) {
    setValues((previous) => ({ ...previous, [fieldId]: value }));
    setErrors((previous) => {
      if (!previous[fieldId]) {
        return previous;
      }
      const next = { ...previous };
      delete next[fieldId];
      return next;
    });
  }

  function goToStep(index: number) {
    if (index < 0 || index >= steps.length || index > currentStepIndex) {
      return;
    }
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
    setCurrentStepIndex((index) => index + 1);
  }

  function handleBack() {
    setErrors({});
    setIsComplete(false);
    setCurrentStepIndex((index) => Math.max(0, index - 1));
  }

  async function handleGenerateDocument() {
    if (isGenerating) {
      return;
    }

    const documentData = buildContractDocumentData({
      config,
      contractTitle,
      values,
    });

    console.log("Generando contrato:", documentData);

    setIsGenerating(true);

    try {
      await new Promise<void>((resolve) => {
        window.setTimeout(resolve, 200);
      });

      await generateContractPdf({
        config,
        contractTitle,
        values,
      });
    } catch (error) {
      console.error("Error al generar el PDF:", error);
      window.alert("No se pudo generar el documento. Inténtalo de nuevo.");
    } finally {
      setIsGenerating(false);
    }
  }

  return (
    <div className="mt-8 space-y-8">
      <nav aria-label="Progreso del formulario">
        <ol className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {steps.map((step, index) => (
            <li key={step.id} className="flex flex-1 items-center gap-3">
              <StepIndicator
                step={step}
                index={index}
                currentStepIndex={currentStepIndex}
                isComplete={isComplete}
                onSelect={() => goToStep(index)}
              />
              {index < steps.length - 1 ? (
                <span
                  className="hidden h-px flex-1 bg-slate-700 sm:block"
                  aria-hidden
                />
              ) : null}
            </li>
          ))}
        </ol>
      </nav>

      <div className="rounded-xl border border-slate-700/80 bg-slate-900/40 p-5 sm:p-6">
        <AnimatePresence mode="wait">
          {isComplete ? (
            <motion.div
              key="summary"
              {...stepMotion}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-6"
            >
              <div className="flex items-start gap-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-500/25">
                  <FileCheck2 className="size-5" aria-hidden />
                </span>
                <div>
                  <h2 className="text-lg font-semibold text-white">
                    Datos listos para generar
                  </h2>
                  <p className="text-card-body mt-1 text-sm text-slate-400">
                    Revisa el resumen de tu contrato de{" "}
                    <span className="text-slate-200">{contractTitle}</span> antes
                    de continuar.
                  </p>
                </div>
              </div>

              <dl className="divide-y divide-slate-700/80 rounded-lg border border-slate-700/80">
                {allFields
                  .filter((field) => values[field.id]?.trim())
                  .map((field) => (
                    <div
                      key={field.id}
                      className="grid gap-1 px-4 py-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] sm:gap-4"
                    >
                      <dt className="text-sm text-slate-500">{field.label}</dt>
                      <dd className="text-sm font-medium text-slate-200">
                        {formatContractFieldValue(field, values[field.id])}
                      </dd>
                    </div>
                  ))}
              </dl>

              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  className="border-slate-600 bg-transparent text-slate-200 hover:bg-slate-800/60"
                  disabled={isGenerating}
                  onClick={() => setIsComplete(false)}
                >
                  Editar datos
                </Button>
                <Button
                  type="button"
                  size="lg"
                  className="bg-brand-blue hover:bg-brand-blue/90"
                  disabled={isGenerating}
                  onClick={handleGenerateDocument}
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="size-4 animate-spin" data-icon="inline-start" />
                      Generando...
                    </>
                  ) : (
                    "Generar documento"
                  )}
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={currentStep.id}
              {...stepMotion}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-6"
            >
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-blue">
                  Paso {currentStepIndex + 1} de {steps.length}
                </p>
                <h2 className="mt-2 text-lg font-semibold text-white">
                  {currentStep.title}
                </h2>
                {currentStep.description ? (
                  <p className="text-card-body mt-1 text-sm text-slate-400">
                    {currentStep.description}
                  </p>
                ) : null}
              </div>

              <div className="grid gap-5">
                {currentStep.partyForm ? (
                  <PartesForm
                    variant={currentStep.partyForm}
                    values={values}
                    errors={errors}
                    onChange={updateValue}
                  />
                ) : null}
                {currentStep.fields.map((field) => (
                  <ContractField
                    key={field.id}
                    field={field}
                    value={values[field.id] ?? ""}
                    error={errors[field.id]}
                    onChange={(value) => updateValue(field.id, value)}
                  />
                ))}
              </div>

              <div className="flex flex-col-reverse gap-3 border-t border-slate-700/80 pt-5 sm:flex-row sm:justify-between">
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  className="border-slate-600 bg-transparent text-slate-200 hover:bg-slate-800/60"
                  disabled={isFirstStep}
                  onClick={handleBack}
                >
                  <ChevronLeft data-icon="inline-start" />
                  Anterior
                </Button>
                <Button
                  type="button"
                  size="lg"
                  className="bg-brand-blue hover:bg-brand-blue/90"
                  onClick={handleNext}
                >
                  {isLastStep ? "Revisar y finalizar" : "Siguiente"}
                  {!isLastStep ? <ChevronRight data-icon="inline-end" /> : null}
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

type StepIndicatorProps = {
  step: ContractStepDefinition;
  index: number;
  currentStepIndex: number;
  isComplete: boolean;
  onSelect: () => void;
};

function StepIndicator({
  step,
  index,
  currentStepIndex,
  isComplete,
  onSelect,
}: StepIndicatorProps) {
  const isActive = index === currentStepIndex && !isComplete;
  const isDone = index < currentStepIndex || isComplete;
  const canNavigate = index < currentStepIndex;

  return (
    <button
      type="button"
      onClick={canNavigate ? onSelect : undefined}
      disabled={!canNavigate}
      className={cn(
        "flex min-w-0 items-center gap-3 text-left transition-opacity",
        canNavigate ? "cursor-pointer hover:opacity-90" : "cursor-default"
      )}
      aria-current={isActive ? "step" : undefined}
    >
      <span
        className={cn(
          "flex size-8 shrink-0 items-center justify-center rounded-full border text-xs font-semibold transition-colors",
          isActive && "border-brand-blue bg-brand-blue text-white",
          isDone && !isActive && "border-emerald-500/40 bg-emerald-500/15 text-emerald-400",
          !isActive && !isDone && "border-slate-600 bg-slate-800/60 text-slate-400"
        )}
      >
        {isDone && !isActive ? <Check className="size-4" aria-hidden /> : index + 1}
      </span>
      <span className="min-w-0">
        <span
          className={cn(
            "block truncate text-sm font-medium",
            isActive ? "text-white" : "text-slate-400"
          )}
        >
          {step.title}
        </span>
      </span>
    </button>
  );
}
