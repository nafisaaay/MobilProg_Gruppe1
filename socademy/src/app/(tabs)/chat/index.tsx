import { Link } from "expo-router";
import { View, Text, StyleSheet } from "react-native";
import { colors, fontSize, spacing } from "../../../constants/theme";
import { showComingSoon } from "../../../utils/ComingSoon";

export default function ChatListScreen() {
  return (
    <View style={styles.view}>
      <Text style={styles.title}>Side under utvikling...</Text>
      <Link href="" onPress={() => showComingSoon("Chat")} style={styles.link}>
        Se din samtale med Nafisa
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.accent,
  },
  title: {
    fontSize: fontSize.xl,
    fontWeight: 800,
    padding: spacing.lg,
    color: colors.danger,
  },
  link: {
    color: colors.danger,
  },
});
