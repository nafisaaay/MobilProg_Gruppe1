import { Link } from "expo-router";
import { useState } from "react";
import { Text, View, Pressable, KeyboardAvoidingView, ScrollView, Image } from "react-native";
import { SubmitButton } from "../components/forms/SubmitButton";
import { FormField } from "../components/forms/FormField";
import { useAuth } from "../context/AuthContext";
import { useAuthForm } from "../hooks/useAuthForm";
import { registerSchema, SCHOOL_DOMAIN } from "../utils/AuthSchema";
import { SafeAreaView } from "react-native-safe-area-context";
import { authStyles } from "../styles/authStyles";
import useOrientation from "../hooks/useOrientation";

export default function RegisterScreen() {  
    const { register } = useAuth();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const form = useAuthForm(registerSchema, (data) => 
        register(data.name, data.email, data.password),
    );

    const handleSubmit = () => form.submit({ name, email, password });
    const { isLandscape } = useOrientation();

    return (
        <SafeAreaView style={authStyles.safeArea}>
            <KeyboardAvoidingView style={authStyles.flex} behavior="padding">
                <ScrollView contentContainerStyle={authStyles.scrollContent} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
                    <View style={authStyles.spacer}/>

                    <View style={authStyles.logo}>
                        <Image source={require("socademy/assets/socademy-blomst.png")} style={authStyles.logoImage} resizeMode="contain" />
                        <Text style={authStyles.logoSoc}>Soc 
                            <Text style={authStyles.logoAdemy}>Ademy</Text>
                        </Text>
                    </View>

                    <View style={[authStyles.form, isLandscape && authStyles.formLandscape]}>
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

                        {form.error ? <Text style={authStyles.error}>{form.error}</Text> : null}

                        <View style={authStyles.buttonWrapper}>
                            <SubmitButton
                                title="Registrer deg"
                                loadingTitle="Registrerer..."
                                isLoading={form.isSubmitting}
                                onPress={handleSubmit}
                            />
                        </View>
                    </View>

                    <Link href="/login" asChild>
                        <Pressable style={authStyles.linkPressable} accessibilityRole="link">
                            <Text style={authStyles.link}>Har du allerede bruker? <Text style={authStyles.linkAccent}> Logg inn!</Text>
                            </Text>
                        </Pressable>
                    </Link>

                    <View style={authStyles.spacer} />
                    <Text style={authStyles.footer}>2026 SocAdemy</Text>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
