import { createAuthClient } from "better-auth/react";
import { expoClient } from "@better-auth/expo/client";
import * as SecureStore from "expo-secure-store";

export const SERVER_URL = "https://socademy.socademy-hiof.workers.dev";

export const authClient = createAuthClient({
    baseURL: SERVER_URL,
    plugins: [
        expoClient({
            scheme: "socademy",
            storagePrefix: "socademy",
            storage: SecureStore,
        }),
    ],
});