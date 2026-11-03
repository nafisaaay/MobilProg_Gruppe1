import { StyleSheet } from "react-native";
import { colors, spacing, fontSize, radius } from "../constants/theme";

// Felles styling for logg inn + registreringssiden:
export const commonStyles = StyleSheet.create({
  // SKJERM (rammeverk)
  screen: {
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
  content: {
    width: "100%",
    maxWidth: 720,
    alignSelf: "center",
    padding: spacing.lg,
  },
  contentLandscape: {
    maxWidth: 900,
    paddingTop: spacing.md,
  },
  card: {
    backgroundColor: colors.card,
    minHeight: 300,
    borderRadius: radius.xl,
    padding: spacing.xl,
    gap: spacing.lg,
    boxShadow: "0 1px 6px #cfcfcf46",
  },

  avatar: {
    width: 64,
    height: 64,
    borderRadius: radius.full,
    backgroundColor: colors.placeholder, // fordi det mangles bilde.
  },

  // ERRORS:
  error: {
    color: colors.danger,
    fontSize: fontSize.md,
    textAlign: "center",
  },
  notFound: {
    color: colors.textMuted,
    fontSize: fontSize.md,
    padding: spacing.lg,
  },

  // Header + text
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.lg,
  },
  title: {
    flex: 1,
    fontSize: fontSize.xl,
    fontWeight: "700",
    color: colors.text,
  },
  text: {
    fontSize: fontSize.md,
    lineHeight: 22,
    color: colors.text,
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
    color: colors.text,
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

  buttonWrapper: {
    marginTop: spacing.xl,
  },

  formLabel: {
    fontSize: fontSize.md,
    fontWeight: "600",
    color: colors.text,
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },

  formInput: {
    backgroundColor: colors.inputBg,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    fontSize: fontSize.md,
    color: colors.text,
    marginBottom: spacing.lg,
    boxShadow: "0 1px 6px #cfcfcf46",
  },

  inputTxtArea: {
    minHeight: 200,
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

  // ACTIONS-områder (knapper, ikoner o.l.)
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: spacing.md,
    marginTop: spacing.xl,
  },
  icons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: spacing.lg,
    marginTop: "auto",
  },
  filledBtn: {
    backgroundColor: colors.primary,
    borderRadius: radius.full,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
  },
  btnText: {
    fontSize: fontSize.md,
    fontWeight: "600",
    color: colors.inputBg,
  },

  // FOOTER
  footer: {
    paddingBottom: spacing.lg,
    fontSize: spacing.md,
    fontWeight: "300",
    color: colors.textMuted,
  },
});
