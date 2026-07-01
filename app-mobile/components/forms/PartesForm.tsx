import { StyleSheet, Text, View } from "react-native";

import { FormField } from "@/components/forms/FormField";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import {
  PARTY_VARIANTS,
  TIPO_DOCUMENTO_EMPRESA_OPTIONS,
  TIPO_DOCUMENTO_FISICA_OPTIONS,
  TIPO_PERSONA_OPTIONS,
  getPartyTitle,
  type PartyFormVariant,
  type PartyPrefix,
  type TipoPersona,
} from "@/lib/party-fields";

type PartesFormProps = {
  variant: PartyFormVariant;
  values: Record<string, string>;
  errors: Record<string, string>;
  onChange: (fieldId: string, value: string) => void;
};

function PartySection({
  prefix,
  title,
  values,
  errors,
  onChange,
}: {
  prefix: PartyPrefix;
  title: string;
  values: Record<string, string>;
  errors: Record<string, string>;
  onChange: (fieldId: string, value: string) => void;
}) {
  const colorScheme = useColorScheme() ?? "light";
  const colors = Colors[colorScheme];
  const tipoPersona = (values[`${prefix}_tipo_persona`] || "fisica") as TipoPersona;
  const isEmpresa = tipoPersona === "empresa";
  const documentOptions = isEmpresa ? TIPO_DOCUMENTO_EMPRESA_OPTIONS : TIPO_DOCUMENTO_FISICA_OPTIONS;

  function handleTipoPersonaChange(value: string) {
    onChange(`${prefix}_tipo_persona`, value);
    onChange(`${prefix}_tipo_documento`, value === "empresa" ? "cif" : "dni");
  }

  return (
    <View style={[styles.section, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <Text style={[styles.sectionTitle, { color: colors.text }]}>{title}</Text>
      <Text style={[styles.sectionSubtitle, { color: colors.textMuted }]}>
        Datos identificativos y de contacto a efectos contractuales.
      </Text>

      <FormField
        field={{
          id: `${prefix}_tipo_persona`,
          label: "Tipo de persona",
          type: "select",
          required: true,
          options: [...TIPO_PERSONA_OPTIONS],
        }}
        value={values[`${prefix}_tipo_persona`] ?? "fisica"}
        error={errors[`${prefix}_tipo_persona`]}
        onChange={handleTipoPersonaChange}
      />
      <FormField
        field={{
          id: `${prefix}_nombre`,
          label: isEmpresa ? "Razón social" : "Nombre completo",
          type: "text",
          required: true,
          placeholder: isEmpresa ? "Empresa Ejemplo, S.L." : "Nombre y apellidos",
        }}
        value={values[`${prefix}_nombre`] ?? ""}
        error={errors[`${prefix}_nombre`]}
        onChange={(v) => onChange(`${prefix}_nombre`, v)}
      />
      <FormField
        field={{
          id: `${prefix}_tipo_documento`,
          label: "Tipo de documento",
          type: "select",
          required: true,
          options: [...documentOptions],
        }}
        value={values[`${prefix}_tipo_documento`] ?? (isEmpresa ? "cif" : "dni")}
        error={errors[`${prefix}_tipo_documento`]}
        onChange={(v) => onChange(`${prefix}_tipo_documento`, v)}
        disabled={isEmpresa}
      />
      <FormField
        field={{
          id: `${prefix}_numero_documento`,
          label: "Número de identificación",
          type: "text",
          required: true,
          placeholder: isEmpresa ? "B12345678" : "12345678A",
        }}
        value={values[`${prefix}_numero_documento`] ?? ""}
        error={errors[`${prefix}_numero_documento`]}
        onChange={(v) => onChange(`${prefix}_numero_documento`, v)}
      />
      <FormField
        field={{
          id: `${prefix}_direccion`,
          label: "Calle y número",
          type: "text",
          required: true,
          placeholder: "Calle Mayor, 12, 3º B",
        }}
        value={values[`${prefix}_direccion`] ?? ""}
        error={errors[`${prefix}_direccion`]}
        onChange={(v) => onChange(`${prefix}_direccion`, v)}
      />
      <FormField
        field={{
          id: `${prefix}_codigo_postal`,
          label: "Código postal",
          type: "text",
          required: true,
          placeholder: "28001",
        }}
        value={values[`${prefix}_codigo_postal`] ?? ""}
        error={errors[`${prefix}_codigo_postal`]}
        onChange={(v) => onChange(`${prefix}_codigo_postal`, v)}
      />
      <FormField
        field={{
          id: `${prefix}_ciudad`,
          label: "Ciudad",
          type: "text",
          required: true,
          placeholder: "Madrid",
        }}
        value={values[`${prefix}_ciudad`] ?? ""}
        error={errors[`${prefix}_ciudad`]}
        onChange={(v) => onChange(`${prefix}_ciudad`, v)}
      />
      <FormField
        field={{
          id: `${prefix}_provincia`,
          label: "Provincia",
          type: "text",
          required: true,
          placeholder: "Madrid",
        }}
        value={values[`${prefix}_provincia`] ?? ""}
        error={errors[`${prefix}_provincia`]}
        onChange={(v) => onChange(`${prefix}_provincia`, v)}
      />
      <FormField
        field={{
          id: `${prefix}_email`,
          label: "Email",
          type: "email",
          required: true,
          placeholder: "nombre@ejemplo.com",
        }}
        value={values[`${prefix}_email`] ?? ""}
        error={errors[`${prefix}_email`]}
        onChange={(v) => onChange(`${prefix}_email`, v)}
      />
      <FormField
        field={{
          id: `${prefix}_telefono`,
          label: "Teléfono",
          type: "text",
          required: true,
          placeholder: "600 000 000",
        }}
        value={values[`${prefix}_telefono`] ?? ""}
        error={errors[`${prefix}_telefono`]}
        onChange={(v) => onChange(`${prefix}_telefono`, v)}
      />
    </View>
  );
}

export function PartesForm({ variant, values, errors, onChange }: PartesFormProps) {
  const [leftPrefix, rightPrefix] = PARTY_VARIANTS[variant].parties;
  return (
    <View style={styles.container}>
      <PartySection
        prefix={leftPrefix}
        title={getPartyTitle(variant, leftPrefix)}
        values={values}
        errors={errors}
        onChange={onChange}
      />
      <PartySection
        prefix={rightPrefix}
        title={getPartyTitle(variant, rightPrefix)}
        values={values}
        errors={errors}
        onChange={onChange}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: 20 },
  section: { gap: 16, padding: 16, borderRadius: 16, borderWidth: 1 },
  sectionTitle: { fontSize: 17, fontWeight: "700" },
  sectionSubtitle: { fontSize: 12, lineHeight: 17, marginBottom: 4 },
});
