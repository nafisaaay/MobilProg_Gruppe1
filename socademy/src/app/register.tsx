import { Link } from "expo-router";
import { useState } from "react";
import {
  Text,
  View,
  Pressable,
  KeyboardAvoidingView,
  ScrollView,
  Image,
} from "react-native";
import { SubmitButton } from "../components/forms/SubmitButton";
import { FormField } from "../components/forms/FormField";
import { useAuth } from "../context/AuthContext";
import { useAuthForm } from "../hooks/useAuthForm";
import { registerSchema, SCHOOL_DOMAIN } from "../utils/AuthSchema";
import { SafeAreaView } from "react-native-safe-area-context";
import { commonStyles } from "../styles/commonStyles";
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
    <SafeAreaView style={commonStyles.screen}>
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

            {form.error ? (
              <Text style={commonStyles.error}>{form.error}</Text>
            ) : null}

            <View style={commonStyles.buttonWrapper}>
              <SubmitButton
                title="Registrer deg"
                loadingTitle="Registrerer..."
                isLoading={form.isSubmitting}
                onPress={handleSubmit}
              />
            </View>
          </View>

          <Link href="/login" asChild>
            <Pressable
              style={commonStyles.linkPressable}
              accessibilityRole="link"
            >
              <Text style={commonStyles.link}>
                Har du allerede bruker?{" "}
                <Text style={commonStyles.linkAccent}> Logg inn!</Text>
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
