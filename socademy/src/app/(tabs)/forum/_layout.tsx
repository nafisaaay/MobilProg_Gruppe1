import { Stack } from "expo-router";

export default function ForumLayOut() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false, title: "Forum" }} />
        </Stack>
    );
}