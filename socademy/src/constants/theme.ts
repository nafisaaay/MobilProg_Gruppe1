/**
 * Ett sted for alle designverdier.
 * Alle StyleSheet-objekter i appen leser fra dette objektet.
 */
export const Theme = {
  // Farger
  background: "#F3FCF8", // lys mintgrønn bakgrunn
  surface: "#ECF0EE",    // innleggskort
  surfaceAlt: "#E8EBE9", // "Post innlegg"-boksen
  placeholder: "#E2E6E4", // avatar-sirkler
  accent: "#FDEFAA",     // gul, for valgte filtre senere
  primary: "#4A9FE0",    // blå fra logoen
  danger: "#d32f2f",
  text: "#111827",
  textMuted: "#6B7280",
  textSubtle: "#9CA3AF",
  icon: "#6B7280",
  border: "#d1d5db",

  // Avstander
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
  },

  // Hjørneradius
  radius: {
    sm: 6,
    md: 10,
    lg: 16,
    full: 999,
  },

  // Skriftstørrelser
  fontSize: {
    sm: 12,
    md: 14,
    lg: 18,
    xl: 24,
  },
  textInverted: "#ffffff",
} as const;