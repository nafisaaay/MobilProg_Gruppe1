import { Pressable, View, Text, StyleSheet } from "react-native";
import { router } from "expo-router";
import { colors, spacing, fontSize, radius } from "../../constants/theme";

export default function PostComposer() {
  return (
    <Pressable
      onPress={() => router.push("/new-post")}
      style={({ pressed }) => [styles.box, pressed && styles.boxPressed]}
    >
      <View>
        <Text style={styles.title}>Post innlegg</Text>
        <Text style={styles.textHint}>Hva har du i dine tanker?</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: "#e6e6e66a",
    borderRadius: radius.xl,
    borderWidth: 0.2,
    borderColor: colors.surface,
    padding: spacing.xl,
    boxShadow: "0 1px 6px #bbbbbb88",
  },
  boxPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.99 }],
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: spacing.lg,
  },
  textHint: {
    fontSize: fontSize.md,
    color: colors.textSubtle,
    fontStyle: "italic",
  },
});
