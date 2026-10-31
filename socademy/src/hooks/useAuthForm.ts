import { useState } from "react";
import { z } from "zod";

// Felles logikk for login og register:
// Validerer med Zod -> vis feil per felt -> send -> vis serverfeil.
// Skjemaet (shcema) og hva som skjer ved innsending (onSubmit) kommer utenfra.
export function useAuthForm<T extends z.ZodObject>(
    schema: T,
    onSubmit: (data: z.infer<T>) => Promise<void>,
) {

    type Data = z.infer<T>;
    type FieldErrors = Partial<Record<keyof Data, string[]>>;

    const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function submit(values: unknown) {
        setError("");

        const result = schema.safeParse(values);
        if (!result.success) {
            setFieldErrors(z.flattenError(result.error).fieldErrors);
            return;
        }
        setFieldErrors({});

        try {
            setIsSubmitting(true);
            await onSubmit(result.data);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Noe gikk galt");
        } finally {
            setIsSubmitting(false);
        }
    }

    function errorFor(field: keyof z.infer<T>) {
        return fieldErrors[field]?.[0];
    }

    return { submit, errorFor, error, isSubmitting };
}