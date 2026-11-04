import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { loginSchema} from "../utils/AuthSchema";
import { authStyles } from "../styles/authStyles";
import { KeyboardAvoidingView, ScrollView, Text, View, Pressable, Image} from "react-native";
import { Link } from "expo-router";
import { FormField } from "../components/forms/FormField";
import useOrientation from "../hooks/useOrientation";
import { SubmitButton } from "../components/forms/SubmitButton";
import { useAuthForm } from "../hooks/useAuthForm";
import { SafeAreaView } from "react-native-safe-area-context";

/* Vurderer å legge til tilgjengelighetsfuknsjoner (tenk Aria i HTML) - kan testes ved å slå på VoiceOver:
accessibilityLabel - for å gi navn på noe, evt si 2 tekstfelter som 1 ord, eks. "soc"+"ademy" til "socademy".
accessibilityRole - header, alers, link, osv
accessibilityState - tilstanden.
accessible (enten true eller false) - ift om dekorative elm skal skjules eller ikke (eks. en illustrajson), skjermleseren hopper over den.
*/

export default function LoginScreen() {
    const { login } = useAuth();

    // Controlled inputs: skjermen eier verdiene
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Validering, feil og "sender" bor i hooken
    const form = useAuthForm(loginSchema, (data) => login(data.email, data.password));
    const handleSubmit = () => form.submit({ email, password });

    const { isLandscape } = useOrientation();

    return (
        <SafeAreaView style={authStyles.safeArea}>
            <KeyboardAvoidingView style={authStyles.flex} behavior="padding">
                <ScrollView contentContainerStyle={authStyles.scrollContent} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
                    
                    <View style={authStyles.spacer} />

                    <View style={authStyles.logo}>
                        <Image source={require("socademy/assets/socademy-blomst.png")} style={authStyles.logoImage} resizeMode="contain" />
                        <Text style={authStyles.logoSoc}>Soc 
                            <Text style={authStyles.logoAdemy}>Ademy</Text>
                        </Text>
                    </View>

                    <View style={[authStyles.form, isLandscape && authStyles.formLandscape]}>
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

                        {form.error ? <Text style={authStyles.error}>{form.error}</Text> : null}

                        <View style={authStyles.buttonWrapper}>
                            <SubmitButton
                                title="Logg inn"
                                loadingTitle="Logger inn..."
                                isLoading={form.isSubmitting}
                                onPress={handleSubmit}
                            />
                        </View>
                    </View>

                    <Link href="/register" asChild>
                        <Pressable style={authStyles.linkPressable} accessibilityRole="link">
                            <Text style={authStyles.link}>Har du ikke bruker? <Text style={authStyles.linkAccent}>Registrer deg her!</Text>
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