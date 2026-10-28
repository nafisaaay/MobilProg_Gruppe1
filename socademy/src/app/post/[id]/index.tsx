import { useState } from "react";
import { View, Text, Pressable, StyleSheet, ScrollView } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import Ionicons from "@react-native-vector-icons/ionicons";
import { usePosts } from "../../../context/PostContext";
import { Theme } from "../../../constants/theme";

export default function PostDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { posts, removeToApi } = usePosts();
  const [error, setError] = useState<string | null>(null);

  const post = posts.find((p) => p.id === Number(id));

  if (!post) {
    return (
      <View style={styles.screen}>
        <Text style={styles.notFound}>Fant ikke innlegget</Text>
      </View>
    );
  }

  const handleRemove = async () => {
    setError(null);
    try {
      await removeToApi(post.id);
      router.back();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not delete post");
    }
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.card}>
        <View style={styles.header}>
          <View style={styles.avatar} />
          <Text style={styles.title}>{post.title}</Text>
        </View>

        <Text style={styles.text}>{post.text}</Text>

        <View style={styles.icons}>
          <Ionicons name="chatbubble-outline" size={26} color={Theme.icon} />
          <Ionicons name="heart-outline" size={26} color={Theme.icon} />
        </View>
      </View>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <View style={styles.actions}>
        <Pressable onPress={handleRemove} style={styles.deleteButton}>
          <Text style={styles.deleteText}>Slett</Text>
        </Pressable>

        <Pressable
          onPress={() => router.push(`/post/${post.id}/update-post`)}
          style={styles.editButton}
        >
          <Text style={styles.editText}>Rediger</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Theme.background,
  },
  content: {
    padding: Theme.spacing.lg,
  },
  card: {
    backgroundColor: Theme.surface,
    borderRadius: Theme.radius.sm,
    padding: Theme.spacing.lg,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: Theme.spacing.lg,
    marginBottom: Theme.spacing.lg,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: Theme.radius.full,
    backgroundColor: Theme.placeholder,
  },
  title: {
    flex: 1,
    fontSize: Theme.fontSize.xl,
    fontWeight: "700",
    color: Theme.text,
  },
  text: {
    fontSize: Theme.fontSize.md,
    lineHeight: 22,
    color: Theme.text,
  },
  icons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: Theme.spacing.lg,
    marginTop: Theme.spacing.xl,
  },
  error: {
    color: Theme.danger,
    fontSize: Theme.fontSize.md,
    marginTop: Theme.spacing.md,
  },
  notFound: {
    color: Theme.textMuted,
    fontSize: Theme.fontSize.md,
    padding: Theme.spacing.lg,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: Theme.spacing.md,
    marginTop: Theme.spacing.xl,
  },
 deleteButton: {
  borderWidth: 1,
  borderColor: Theme.danger,
  borderRadius: Theme.radius.full,
  paddingVertical: Theme.spacing.md,
  paddingHorizontal: Theme.spacing.xl,
},
  deleteText: {
    fontSize: Theme.fontSize.md,
    fontWeight: "600",
    color: Theme.danger,
  },
  editButton: {
    backgroundColor: Theme.primary,
    borderRadius: Theme.radius.full,
    paddingVertical: Theme.spacing.md,
    paddingHorizontal: Theme.spacing.xl,
  },
  editText: {
    fontSize: Theme.fontSize.md,
    fontWeight: "600",
    color: Theme.textInverted,
  },
});