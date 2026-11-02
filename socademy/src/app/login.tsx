import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { loginSchema} from "../utils/AuthSchema";
import { Theme } from "../constants/theme";
import { StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";
import { FormField } from "../components/forms/FormField";
import { SubmitButton } from "../components/forms/SubmitButton";
import { useAuthForm } from "../hooks/useAuthForm";

export default function LoginScreen() {
    const { login } = useAuth();

    // Controlled inputs: skjermen eier verdiene
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // validering, feil og "sender" bor i hooken
    const form = useAuthForm(loginSchema, (data) => login(data.email, data.password));

    return (
        <View style={styles.container}>
            <FormField
                label="E-post"
                value={email}
                onChangeText={setEmail}
                placeholder={"navn@hiof.no"}
                autoCapitalize="none"
                autoComplete="email"
                keyboardType="email-address"
                error={form.errorFor("email")}
            />
            <FormField
                label="Passord"
                value={password}
                onChangeText={setPassword}
                placeholder="Passord"
                secureTextEntry
                autoComplete="password"
                error={form.errorFor("password")}
            />
            {form.error ? <Text style={styles.error}>{form.error}</Text> : null}

            <SubmitButton
                title="Logg inn"
                loadingTitle="Logger inn..."
                isLoading={form.isSubmitting}
                onPress={() => form.submit({ email, password })}
            />

            <Link href="/register" style={styles.link}>
                Har du ikke bruker? Registrer deg
            </Link>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: Theme.spacing.sm,
        padding: Theme.spacing.lg,
        backgroundColor: Theme.background,
    },
    error: {
        color: Theme.danger,
        fontSize: Theme.fontSize.md,
        marginTop: Theme.spacing.sm,
    },
    link: {
        marginTop: Theme.spacing.md,
        color: Theme.primary,
        fontSize: Theme.fontSize.md,
        textAlign: "center",
    },
});
