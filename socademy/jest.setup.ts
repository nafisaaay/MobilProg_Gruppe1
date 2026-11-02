
// Kjøres før hver testfil
// auth-client bruker BetterAuth og SecureStore, som ikke finnes i testmiljøet.
// Ingen test skal snakke med den ekte innloggingen, så vi bytter den ut overalt.

jest.mock("./src/lib/auth-client", () => ({
    SERVER_URL: "https://test.local",
    authClient: {
        getCookie: jest.fn(() => "better-auth.session_token=abc"),
        useSession: jest.fn(() => ({ data: null, isPending: false })),
        signIn: { email: jest.fn() },
        signUp: { email: jest.fn() },
        signOut: jest.fn(),
    },
}));