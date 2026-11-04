import { StyleSheet } from "react-native";
import { colors, spacing, fontSize } from "../constants/theme"; 

// Felles styling for logg inn + registreringssiden:
export const authStyles = StyleSheet.create({
    // SKJERM (rammeverk)
    safeArea: {
        flex: 1,
        backgroundColor: colors.background,
    },
    flex: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        alignItems: "center",
    },
    spacer: {
        flex: 1,
        minHeight: spacing.xl,
    },

    // LOGO
    logo: {
        alignItems: "center",
    },
    logoImage: {
        width: 96,
        height: 96,
    },
    logoSoc: {
        marginTop: spacing.md,
        fontSize: 32,
        fontWeight: "700",
    },
    logoAdemy: {
        color: colors.primary,
    },

    // SKJEMA
    form: {
        width: "100%",
        maxWidth: 360,
        gap: spacing.md,
        marginTop: spacing.xl,
    },
    formLandscape: {
        maxWidth: 550,
    },
    error: {
        color: colors.danger,
        fontSize: fontSize.md,
        textAlign: "center",
    },
    buttonWrapper: {
        marginTop: spacing.xl,
    },

    // LENKE (Eks: "Har du ikke bruker? Registrer deg...")
    linkPressable: {
        marginTop: spacing.sm,
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.sm,
    },

    link: {
        color: colors.textMuted,
        fontSize: fontSize.md,
        textAlign: "center",
    },
    
    linkAccent: {
        color: colors.primary,
        fontWeight: "600",
    },

    // FOOTER
    footer: {
        paddingBottom: spacing.lg,
        fontSize: spacing.md,
        fontWeight: "300",
        color: colors.textMuted,
    },
});