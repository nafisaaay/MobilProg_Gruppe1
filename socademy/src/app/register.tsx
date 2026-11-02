import { Link } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SubmitButton } from "../components/forms/SubmitButton";
import { FormField } from "../components/forms/FormField";
import { Theme } from "../constants/theme";
import { useAuth } from "../context/AuthContext";
import { useAuthForm } from "../hooks/useAuthForm";
import { registerSchema, SCHOOL_DOMAIN } from "../utils/AuthSchema";


export default function RegisterScreen() {  
    const { register } = useAuth();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const form = useAuthForm(registerSchema, (data) => 
        register(data.name, data.email, data.password),
    );

    return (
    <View style={styles.container}>
        <FormField
            label="Navn"
            value={name}
            onChangeText={setName}
            placeholder="Fornavn Etternavn"
            autoComplete="name"
            error={form.errorFor("name")}
        />
        <FormField
            label="E-post"
            value={email}
            onChangeText={setEmail}
            placeholder={`navn@${SCHOOL_DOMAIN}`}
            autoCapitalize="none"
            autoComplete="email"
            keyboardType="email-address"
            error={form.errorFor("email")}
        />
        <FormField
            label="Passord"
            value={password}
            onChangeText={setPassword}
            placeholder="Minst 8 tegn"
            secureTextEntry
            autoComplete="new-password"
            error={form.errorFor("password")}
        />

        {form.error ? <Text style={styles.error}>{form.error}</Text> : null}

        <SubmitButton
            title="Registrer"
            loadingTitle="Registrerer..."
            isLoading={form.isSubmitting}
            onPress={() => form.submit({ name, email, password })}
        />

        <Link href="/login" style={styles.link}>
            Har du allerede bruker? Logg inn
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

