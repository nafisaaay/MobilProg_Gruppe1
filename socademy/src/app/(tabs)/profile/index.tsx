import { View, Text, Pressable, Image, StyleSheet } from "react-native";
import { useAuth } from "../../../context/AuthContext";
import { Theme } from "../../../constants/theme";
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
                style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
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
        gap: Theme.spacing.sm,
        padding: Theme.spacing.lg,
        backgroundColor: Theme.background,
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: Theme.radius.full,
        marginBottom: Theme.spacing.md
    },
    name: {
        fontSize: Theme.fontSize.xl,
        fontWeight: "600",
        color: Theme.text
    },
    email: {
        fontSize: Theme.fontSize.md, 
        color: Theme.textMuted
    },
    error: { color: Theme.danger },
    button: {
        marginTop: Theme.spacing.xl,
        paddingVertical: Theme.spacing.md,
        paddingHorizontal: Theme.spacing.xl,
        borderRadius: Theme.radius.md,
        backgroundColor: Theme.danger,
    },
    buttonPressed: { opacity: 0.7 },
    buttonText: { color: Theme.textInverted, fontSize: Theme.fontSize.md, fontWeight: "600"},
});