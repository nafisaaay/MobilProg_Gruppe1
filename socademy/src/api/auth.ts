import { z } from "zod";
import { authClient } from "../lib/auth-client";

export const ApiUserSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    role: z.enum(["admin", "user"]).catch("user"),
});

export type ApiUser = z.infer<typeof ApiUserSchema>;

// Her gjør vi om sesjonsdata fra BetterAuth til en ApiUser, eller null.
export function parseSessionUser(sessionUser: unknown): ApiUser | null {
    const result = ApiUserSchema.safeParse(sessionUser);
    return result.success ? result.data : null;
}

// Ved suksess lagrer expoClient sesjonen i
// SecureStore, og useSession() oppdaterer seg selv.
export async function login(email: string, password: string): Promise<void> {
    const { error } = await authClient.signIn.email({ email, password });
    if (error) {
        throw new Error(error.message ?? "Kunne ikke logge inn");
    }
}

// Serveren har autoSignIn: true, så brukeren er innlogget rett
// etter registrering.
export async function register(
    name: string,
    email: string,
    password: string,
): Promise<void> {
    const { error } = await authClient.signUp.email({ name, email, password });
    if (error) {
        throw new Error(error.message ?? "Kunne ikke registrere bruker");
    }
}

// Serveren sletter sesjonen i databasen, og expoClient
// fjerner den fra SecureStore.
export async function logout(): Promise<void> {
    await authClient.signOut();
}

