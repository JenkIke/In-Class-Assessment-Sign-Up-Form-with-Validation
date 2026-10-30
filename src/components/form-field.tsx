// Import Statements
import { ThemedText } from "@/components/themed-text";
import { Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";
import {
  StyleSheet,
  TextInput,
  View,
  type TextInputProps,
} from "react-native";

type FormFieldProps<T extends FieldValues> = Omit<
  TextInputProps,
  "value" | "onChangeText" | "onBlur"
> & {
  control: Control<T>;
  name: Path<T>;
  label: string;
  error?: string;
};

export function FormField<T extends FieldValues>({
  control,
  name,
  label,
  error,
  ...inputProps
}: FormFieldProps<T>) {
  const theme = useTheme();

  return (
    <View style={styles.field}>
      <ThemedText type="smallBold">{label}</ThemedText>
      <Controller
        control={control}
        name={name}
        render={({ field: { ref, onChange, onBlur, value } }) => (
          <TextInput
            {...inputProps}
            ref={ref}
            style={[
              styles.input,
              {
                color: theme.text,
                backgroundColor: theme.backgroundElement,
                borderColor: error ? theme.error : theme.backgroundSelected,
              },
            ]}
            placeholderTextColor={theme.textSecondary}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
          />
        )}
      />
      {error && (
        <ThemedText type="small" themeColor="error">
          {error}
        </ThemedText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  field: {
    gap: Spacing.one,
  },
  input: {
    borderWidth: 1,
    borderRadius: Spacing.two,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two + Spacing.one,
    fontSize: 16,
  },
});
