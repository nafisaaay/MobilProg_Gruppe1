import { Stack } from "expo-router";

export default function RootLayout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ title: "Kalender" }} />
            <Stack.Screen name="student" options={{ title: "Profil" }} />
            
        </Stack>
    )
}