import { PostProvider } from "../context/PostContext";
import { Stack } from "expo-router";
import { AuthProvider, useAuth } from "../context/AuthContext";
import { Theme } from "../constants/theme";
import { Loading } from "../components/shared/Loading";

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
        <Stack screenOptions={{ headerTintColor: Theme.primary }}>
            <Stack.Protected guard={!validUser}>
                <Stack.Screen name="login" options={{ title: "Logg inn" }} />
                <Stack.Screen name="register" options={{ title: "Registrer deg" }} />
            </Stack.Protected>

            <Stack.Protected guard={validUser}>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen
                    name="new-post"
                    options={{ presentation: "modal", title: "Nytt innlegg" }}
                />
                <Stack.Screen name="post/[id]/index" options={{ title: "Innlegg" }} />
                <Stack.Screen
                    name="post/[id]/update-post"
                    options={{ presentation: "modal", title: "Rediger innlegg" }}
                />
            </Stack.Protected>
        </Stack>
    );
}

export default function RootLayout() {
    return (
        <AuthProvider>
            <PostProvider>
                <RootNavigator />
            </PostProvider>
        </AuthProvider>
    );
}
