import { View, Text, Pressable, Image, StyleSheet } from "react-native";
import { useAuth } from "../../../context/AuthContext";
import { colors, common, fontSize, radius, spacing } from "../../../constants/theme";
import { useState } from "react";


export default function ProfileScreen() {
    const { user, logout } = useAuth();
    const [error, setError] = useState("");

    async function handleLogout() {
        try {
            setError("");
            await logout();
        } catch (error) {
            setError(error instanceof Error ? error.message : "Kunne ikke logge ut");
        }
    }

    return (
        <View style={styles.container}>
            <Image source={{ uri: "https://picsum.photos/150" }} style={styles.avatar} />
            <Text style={styles.name}>{user?.name}</Text>
            <Text style={styles.email}>{user?.email}</Text>

            {error ? <Text style={styles.error}>{error}</Text> : null}

            <Pressable
                onPress={handleLogout}
                style={({ pressed }) => [styles.button, pressed && common.pressed]}
            >
                <Text style={styles.buttonText}>Logg ut</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        gap: spacing.sm,
        padding: spacing.lg,
        backgroundColor: colors.background,
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: radius.full,
        marginBottom: spacing.md
    },
    name: {
        fontSize: fontSize.xl,
        fontWeight: "600",
        color: colors.text
    },
    email: {
        fontSize: fontSize.md, 
        color: colors.textMuted
    },
    error: { color: colors.danger },
    button: {
        marginTop: spacing.xl,
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.xl,
        borderRadius: radius.md,
        backgroundColor: colors.danger,
    },

    buttonText: { 
        color: colors.inputBg, 
        fontSize: fontSize.md, 
        fontWeight: "600"},
});