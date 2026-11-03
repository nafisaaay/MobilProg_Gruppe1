import { StyleSheet, Text, TextInput, type TextInputProps, View } from "react-native";
import { spacing, colors, fontSize, radius } from "../../constants/theme";

// Intersection-type
type FormFieldProps = TextInputProps & {
    label: string;
    error?: string;
};

export function FormField({ label, error, style, ...inputProps}: FormFieldProps) {
    return (
        <View style={styles.field}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                style={[styles.input, error ? styles.inputError : null, style]}
                aria-label={label}
                {...inputProps}
            />
            {error ? <Text style={styles.error}>{error}</Text> : null}
        </View>
    );
}

const styles = StyleSheet.create({
    field: { gap: spacing.xs, marginTop: spacing.sm },
    label: { fontSize: fontSize.md, fontWeight: "600", color: colors.text },
    input: {
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: radius.md,
        padding: spacing.md,
        fontSize: fontSize.md,
        backgroundColor: colors.inputBg,
        color: colors.text,
    },
    inputError: { borderColor: colors.danger },
    error: { color: colors.danger, fontSize: fontSize.sm },
});