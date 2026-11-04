import { createAuthClient } from "better-auth/react";
import { expoClient } from "@better-auth/expo/client";
import * as SecureStore from "expo-secure-store";
import { URL } from "../api/posts";

export const authClient = createAuthClient({
  baseURL: URL,
  plugins: [
    expoClient({
      scheme: "socademy",
      storagePrefix: "socademy",
      storage: SecureStore,
    }),
  ],
});
