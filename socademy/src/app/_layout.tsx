import { PostProvider } from "../context/PostContext";
import { DefaultTheme, Stack, ThemeProvider } from "expo-router";
import { AuthProvider, useAuth } from "../context/AuthContext";
import { Loading } from "../components/shared/Loading";
import {
  stackScreenOptions,
  noHeaderOptions,
  modalOptions,
} from "../styles/navStyles";
import { colors } from "../constants/theme";

// Egen komponent fordi useAuth() må kalles UNDER AuthProvider.
// Kaller vi den i RootLayout, som selv rendrer provideren, finnes ingen
// provider over oss, og useAuth() kaster en feil.
function RootNavigator() {
  const { user, isLoading } = useAuth();

  // Mens sesjonen leses fra SecureStore er user null et øyeblikk.
  // Uten denne sjekken blinker innlogginsskjermen opp ved hver oppstart!
  if (isLoading) {
    return <Loading label="Sjekker innlogging..." />;
  }

  // Når user settes eller fjernes, bytter Stack.Protected skjerm selv.
  const validUser = user !== null;

  return (
    <Stack screenOptions={stackScreenOptions}>
      <Stack.Protected guard={!validUser}>
        <Stack.Screen name="login" options={noHeaderOptions} />
        <Stack.Screen
          name="register"
          options={{ title: "Registrer ny bruker" }}
        />
      </Stack.Protected>

      <Stack.Protected guard={validUser}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="post/[id]/index" options={modalOptions("")} />
        <Stack.Screen
          name="post/[id]/update-post"
          options={modalOptions("Rediger innlegg")}
        />
        <Stack.Screen
          name="new-post"
          options={modalOptions("Publiser nytt innlegg")}
        />
      </Stack.Protected>
    </Stack>
  );
}

const AppTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.background,
    card: "#e2f3eb",
    primary: colors.primary,
    text: colors.text,
    border: colors.border,
  },
};

export default function RootLayout() {
  return (
    <ThemeProvider value={AppTheme}>
      <AuthProvider>
        <PostProvider>
          <RootNavigator />
        </PostProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
