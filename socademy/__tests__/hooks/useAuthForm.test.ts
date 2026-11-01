import { act, renderHook } from "@testing-library/react-native";
import { useAuthForm } from "../../src/hooks/useAuthForm";
import { loginSchema } from "../../src/utils/AuthSchema";

describe("useAuthForm", () => {

    it("Viser feil per felt og kaller ikke onSubmit når input er ugyldig", async () => {
        const onSubmit = jest.fn();
        const { result } = await renderHook(() => useAuthForm(loginSchema, onSubmit));

        await act(() => result.current.submit({ email: "", password: "" })),

        expect(result.current.errorFor("email")).toBe("Skriv inn e-post");
        expect(onSubmit).not.toHaveBeenCalled(); // Sjekker at ugyldig input aldri blir sendt til serveren.
    });

    it("kaller onSubmit med gydlige data", async () => {
        // En "stuntmann" som later som innloggingen lyktes
        const onSubmit = jest.fn().mockResolvedValue(undefined); //returnerer promise som lykkes
        const { result } = await renderHook(() => useAuthForm(loginSchema, onSubmit));

        await act(() => result.current.submit({ email: " tina@hiof.no ", password: "hemmelig" }));

        expect(onSubmit).toHaveBeenCalledWith({ email: "tina@hiof.no", password: "hemmelig" });
    });

    it("viser feilmelding fra server og slutter å laste", async () => {
        // stuntmannen later som serveren sa nei
        const onSubmit = jest.fn().mockRejectedValue(new Error("Feil passord"));
        const { result } = await renderHook(() => useAuthForm(loginSchema, onSubmit));

        // gyldige felt, så Zod slipper det gjennom til serveren
        await act(() => result.current.submit({ email: "tina@hiof.no", password: "feilpassord" }));

        // feilen vises, og knappen er ikke lenger i "logger inn.."
        expect(result.current.error).toBe("Feil passord");
        expect(result.current.isSubmitting).toBe(false);
    });
});