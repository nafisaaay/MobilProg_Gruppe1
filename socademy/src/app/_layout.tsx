import { PostProvider } from "../context/PostContext";
import "./global.css";

import { Stack } from "expo-router";

export default function RootLayout() {
    return (
        <PostProvider>
        <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="new-page" options={{presentation: "modal", title:"new post"}} />
        </Stack>
        </PostProvider>
    )
}