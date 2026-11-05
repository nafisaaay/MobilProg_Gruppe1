import { createAuthClient } from "better-auth/react";
import { expoClient } from "@better-auth/expo/client";
import * as SecureStore from "expo-secure-store";
import { SERVER_URL } from "../constants/meta";

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
