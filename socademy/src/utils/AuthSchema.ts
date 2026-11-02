import { z } from "zod";

export const SCHOOL_DOMAIN = "hiof.no";
export const PASSWORD_MIN   = 8;
export const PASSWORD_MAX = 128;

export const loginSchema = z.object({
    email: z.string().trim().min(1, "Skriv inn e-post").pipe(z.email("Ugyldig e-postadresse")),
    password: z.string().min(1, "Skriv inn passord"),
});

export const registerSchema = z.object({
    name: z.string().trim().min(1, "Skriv inn navn").max(50, "Navnet kan være maks 50 tegn"),
    email: z
        .string()
        .trim()
        .min(1, "Skriv inn e-post")
        .pipe(z.email("Ugyldig e-postadresse"))
        .refine(
            (email) => email.toLowerCase().endsWith(`@${SCHOOL_DOMAIN}`),
            `E-posten må være en @${SCHOOL_DOMAIN}-adresse`,
        ),
    password: z
        .string()
        .min(PASSWORD_MIN, `Passordet må være min ${PASSWORD_MIN} tegn`)
        .max(PASSWORD_MAX, `Passordet må være max ${PASSWORD_MAX} tegn`),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;