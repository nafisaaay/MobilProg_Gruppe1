import { Pressable, View, Text, StyleSheet } from "react-native";
import { router } from "expo-router";
import { Theme } from "../../constants/theme";

export default function PostComposer() {
  return (
    <Pressable onPress={() => router.push("/new-post")} style={styles.box}>
      <View style={styles.avatar} />
      <View>
        <Text style={styles.title}>Post innlegg</Text>
        <Text style={styles.hint}>Hva har du i dine tanker?</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  box: {
    flexDirection: "row",
    alignItems: "center",
    gap: Theme.spacing.lg,
    backgroundColor: Theme.surfaceAlt,
    borderRadius: Theme.radius.lg,
    padding: Theme.spacing.lg,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: Theme.radius.full,
    backgroundColor: Theme.placeholder,
  },
  title: {
    fontSize: Theme.fontSize.lg,
    fontWeight: "600",
    color: Theme.text,
  },
  hint: {
    fontSize: Theme.fontSize.md,
    color: Theme.textSubtle,
  },
});