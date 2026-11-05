import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { loginSchema } from "../utils/AuthSchema";
import { commonStyles } from "../styles/commonStyles";
import {
  KeyboardAvoidingView,
  ScrollView,
  Text,
  View,
  Pressable,
  Image,
} from "react-native";
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
  const form = useAuthForm(loginSchema, (data) =>
    login(data.email, data.password),
  );
  const handleSubmit = () => form.submit({ email, password });

  const { isLandscape } = useOrientation();

  return (
    <SafeAreaView style={commonStyles.flex}>
      <KeyboardAvoidingView style={commonStyles.flex} behavior="padding">
        <ScrollView
          contentContainerStyle={commonStyles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={commonStyles.spacer} />

          <View style={commonStyles.logo}>
            <Image
              source={require("socademy/assets/socad-blomst.png")}
              style={commonStyles.logoImage}
              resizeMode="contain"
            />
            <Text style={commonStyles.logoSoc}>
              Soc
              <Text style={commonStyles.logoAdemy}>Ademy</Text>
            </Text>
          </View>

          <View
            style={[
              commonStyles.form,
              isLandscape && commonStyles.formLandscape,
            ]}
          >
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

            {form.error ? (
              <Text style={commonStyles.error}>{form.error}</Text>
            ) : null}

            <View style={commonStyles.buttonWrapper}>
              <SubmitButton
                title="Logg inn"
                loadingTitle="Logger inn..."
                isLoading={form.isSubmitting}
                onPress={handleSubmit}
              />
            </View>
          </View>

          <Link href="/register" asChild>
            <Pressable
              style={commonStyles.linkPressable}
              accessibilityRole="link"
            >
              <Text style={commonStyles.link}>
                Har du ikke bruker?{" "}
                <Text style={commonStyles.linkAccent}>Registrer deg her!</Text>
              </Text>
            </Pressable>
          </Link>

          <View style={commonStyles.spacer} />
          <Text style={commonStyles.footer}>2026 SocAdemy</Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
