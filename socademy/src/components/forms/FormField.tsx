import { StyleSheet, Text, TextInput, type TextInputProps, View } from "react-native";
import { Theme } from "../../constants/theme";

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
    field: { gap: Theme.spacing.xs, marginTop: Theme.spacing.sm },
    label: { fontSize: Theme.fontSize.md, fontWeight: "600", color: Theme.text },
    input: {
        borderWidth: 1,
        borderColor: Theme.border,
        borderRadius: Theme.radius.md,
        padding: Theme.spacing.md,
        fontSize: Theme.fontSize.md,
        backgroundColor: Theme.textInverted,
        color: Theme.text,
    },
    inputError: { borderColor: Theme.danger },
    error: { color: Theme.danger, fontSize: Theme.fontSize.sm },
});