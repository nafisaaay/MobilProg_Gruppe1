import { Pressable, View, Text, StyleSheet } from "react-native";
import { router } from "expo-router";
import { colors, spacing, fontSize, radius } from "../../constants/theme";

export default function PostComposer() {
  return (
    <Pressable 
      onPress={() => router.push("/new-post")} 
      style={ ({ pressed }) => [styles.box, pressed && styles.boxPressed]}>
      
      <View style={styles.fakeInput}>
        <Text style={styles.title}>Post innlegg</Text>
        <Text style={styles.textHint}>Hva har du i dine tanker?</Text>
      </View>

    </Pressable>
  );
}

const styles = StyleSheet.create({
  fakeInput: {
    backgroundColor: colors.surface,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    minHeight: 96,
  },
  box: {
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
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
  },
  textHint: {
    fontSize: fontSize.md,
    color: colors.textSubtle,
    marginTop: spacing.md,
    fontStyle: "italic",
  },
});