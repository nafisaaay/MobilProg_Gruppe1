import { Pressable, StyleSheet, Text } from "react-native";
import { Theme } from "../../constants/theme";


type SubmitButtonProps = {
    title: string;
    loadingTitle: string;
    isLoading: boolean;
    onPress: () => void;
};

export function SubmitButton({ title, loadingTitle, isLoading, onPress }: SubmitButtonProps) {
    return (
        <Pressable
            onPress={onPress}
            disabled={isLoading}
            role="button"
            style={({ pressed }) => [styles.button, (pressed || isLoading) && styles.pressed]}
        >
            <Text style={styles.text}>{isLoading ? loadingTitle : title}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        marginTop: Theme.spacing.lg,
        padding: Theme.spacing.md,
        borderRadius: Theme.radius.md,
        backgroundColor: Theme.primary,
        alignItems: "center",
    },
    pressed: { opacity: 0.7 },
    text: { color: Theme.textInverted, fontSize: Theme.fontSize.md, fontWeight: "600" },
});