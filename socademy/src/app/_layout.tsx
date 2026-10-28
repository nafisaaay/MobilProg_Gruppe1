import { PostProvider } from "../context/PostContext";

import { Stack } from "expo-router";

export default function RootLayout() {
    return (
        <PostProvider>
        <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="new-page" options={{presentation: "modal", title:"new post"}} />
            <Stack.Screen name="post/[id]/index" options={{ title: "post" }} />
            <Stack.Screen name="post/[id]/update-post" options={{ presentation: "modal", title: "update post" }} />
        </Stack>
        </PostProvider>
    )
}