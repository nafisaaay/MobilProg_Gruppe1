
import { createContext, use, type ReactNode } from "react";
import { 
    login as loginApi, 
    logout as logoutApi, 
    parseSessionUser, 
    register as registerApi, 
    type ApiUser,
} from "../api/auth";
import { authClient } from "../lib/auth-client"; 

export type Role = ApiUser["role"];

export type User = ApiUser;

type AuthContextData = {
    user: User | null;
    role?: Role;
    isAdmin: boolean;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (name: string, email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
};

const AuthContext = createContext<null | AuthContextData>(null);

type AuthProviderProps = {
    children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
    const { data, isPending } = authClient.useSession();
    
    const user = parseSessionUser(data?.user);
    const isAdmin = user?.role === "admin";

    async function login(email: string, password: string) {
        await loginApi(email, password);
    }

    async function register(name: string, email: string, password: string) {
        await registerApi(name, email, password);
    }

    async function logout() {
        await logoutApi();
    }

    const value = {
        user,
        role: user?.role,
        isAdmin,
        isLoading: isPending,
        login,
        register,
        logout,
    };

    return <AuthContext value={value}>{children}</AuthContext>
};

export function useAuth() {
    const context = use(AuthContext);

    if (!context) {
        throw new Error("useAuth må brukes inne i en AuthProvider");
    }
    return context;
}