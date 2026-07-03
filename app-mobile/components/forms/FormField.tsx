import { Platform, Pressable, StyleSheet, Switch, Text, TextInput, View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { useMemo, useState } from "react";

import type { ContractFieldDefinition } from "@/lib/contract-config";
import Colors from "@/constants/Colors";
import { cardShadow } from "@/constants/theme";
import { useColorScheme } from "@/components/useColorScheme";

type FormFieldProps = {
  field: ContractFieldDefinition;
  value: string;
  error?: string;
  onChange: (value: string) => void;
  disabled?: boolean;
};

function parseDateValue(value: string): Date {
  if (!value) return new Date();
  const parsed = new Date(`${value}T12:00:00`);
  return Number.isNaN(parsed.getTime()) ? new Date() : parsed;
}

function formatDateValue(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function FormField({ field, value, error, onChange, disabled = false }: FormFieldProps) {
  const colorScheme = useColorScheme() ?? "light";
  const colors = Colors[colorScheme];
  const [showDatePicker, setShowDatePicker] = useState(false);

  const inputStyle = useMemo(
    () => [
      styles.input,
      { backgroundColor: colors.card, borderColor: error ? "#f87171" : colors.border, color: colors.text },
      disabled && styles.inputDisabled,
    ],
    [colors, error, disabled]
  );

  return (
    <View style={styles.wrapper}>
      {field.type !== "checkbox" ? (
        <Text style={[styles.label, { color: colors.text }]}>
          {field.label}
          {field.required ? <Text style={styles.required}> *</Text> : null}
        </Text>
      ) : null}

      {field.type === "checkbox" ? (
        <View style={[styles.checkboxRow, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Switch
            value={value === "si"}
            onValueChange={(checked) => onChange(checked ? "si" : "")}
            trackColor={{ false: colors.border, true: Colors.brand.blue }}
            thumbColor="#fff"
          />
          <Text style={[styles.checkboxLabel, { color: colors.text }]}>{field.label}</Text>
        </View>
      ) : field.type === "textarea" ? (
        <TextInput
          value={value}
          onChangeText={onChange}
          placeholder={field.placeholder}
          placeholderTextColor={colors.textMuted}
          multiline
          numberOfLines={4}
          textAlignVertical="top"
          editable={!disabled}
          style={[inputStyle, styles.textarea]}
        />
      ) : field.type === "select" ? (
        <View style={[styles.pickerWrapper, { backgroundColor: colors.card, borderColor: error ? "#f87171" : colors.border }, disabled && styles.inputDisabled]}>
          <Picker
            selectedValue={value || ""}
            enabled={!disabled}
            onValueChange={(itemValue) => {
              if (itemValue !== "") onChange(String(itemValue));
            }}
            style={[styles.picker, { color: colors.text }]}
            dropdownIconColor={colors.textMuted}
          >
            <Picker.Item label="Selecciona una opción" value="" enabled={false} />
            {field.options?.map((option) => (
              <Picker.Item key={option.value} label={option.label} value={option.value} />
            ))}
          </Picker>
        </View>
      ) : field.type === "date" ? (
        <View>
          <Pressable onPress={() => !disabled && setShowDatePicker(true)}>
            <TextInput
              value={value}
              editable={false}
              pointerEvents="none"
              placeholder="AAAA-MM-DD"
              placeholderTextColor={colors.textMuted}
              style={inputStyle}
            />
          </Pressable>
          {showDatePicker ? (
            <DateTimePicker
              value={parseDateValue(value)}
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={(_event, selectedDate) => {
                if (Platform.OS === "android") setShowDatePicker(false);
                if (selectedDate) onChange(formatDateValue(selectedDate));
              }}
            />
          ) : null}
          {Platform.OS === "ios" && showDatePicker ? (
            <Text style={[styles.dateDone, { color: Colors.brand.blue }]} onPress={() => setShowDatePicker(false)}>
              Listo
            </Text>
          ) : null}
        </View>
      ) : (
        <TextInput
          value={value}
          onChangeText={onChange}
          placeholder={field.placeholder}
          placeholderTextColor={colors.textMuted}
          editable={!disabled}
          keyboardType={
            field.type === "number"
              ? "numeric"
              : field.type === "email"
                ? "email-address"
                : field.type === "currency"
                  ? "decimal-pad"
                  : "default"
          }
          autoCapitalize={field.type === "email" ? "none" : "sentences"}
          style={inputStyle}
        />
      )}

      {field.helpText ? <Text style={[styles.help, { color: colors.textMuted }]}>{field.helpText}</Text> : null}
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { gap: 8 },
  label: { fontSize: 14, fontWeight: "600", letterSpacing: 0.1 },
  required: { color: Colors.brand.blue },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: Platform.OS === "ios" ? 14 : 12,
    fontSize: 15,
    letterSpacing: 0.1,
  },
  inputDisabled: { opacity: 0.7 },
  textarea: { minHeight: 120, paddingTop: 14 },
  pickerWrapper: { borderWidth: 1, borderRadius: 12, overflow: "hidden" },
  picker: { height: Platform.OS === "ios" ? 150 : 52 },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    ...cardShadow,
  },
  checkboxLabel: { flex: 1, fontSize: 15, fontWeight: "600", letterSpacing: 0.1 },
  help: { fontSize: 12, lineHeight: 18, letterSpacing: 0.1 },
  error: { fontSize: 12, color: "#f87171" },
  dateDone: { marginTop: 8, fontSize: 15, fontWeight: "600", textAlign: "right" },
});
