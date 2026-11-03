import { useState } from "react";
import { View, Text, Pressable, StyleSheet, ScrollView, Alert } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import Ionicons from "@react-native-vector-icons/ionicons";
import { usePosts } from "../../../context/PostContext";
import { Theme, colors, radius, spacing, fontSize } from "../../../constants/theme";

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
  /* Kun forfatter/eier som får se "rediger" og "slett" etter åpning av innlegg
  const isOwner = user?.id === post.userId; 
  */

  const handleRemove = async () => {
    setError(null);
    try {
      await removeToApi(post.id);
      router.back();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not delete post");
    }
  };

  // Bekreftelse av sletting
  const confirmRemoval = () => {
    Alert.alert("Slette innlegget?", "Dette kan ikke angres.", [
      {text: "Avbryt", style: "cancel"},
      {text: "Slett", style:"destructive", onPress: handleRemove},
    ]);
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.spacer}/>
      
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
        <Pressable onPress={confirmRemoval} style={({pressed}) => [styles.deleteButton, pressed && styles.deletePressed]}>
          <Text style={styles.deleteText}>Slett</Text>
        </Pressable>

        <Pressable
          onPress={() => router.push(`/post/${post.id}/update-post`)}
          style={styles.editButton}
        >
          <Text style={styles.editText}>Rediger</Text>
        </Pressable>
      </View>
      <View style={styles.spacer}/>

    </ScrollView>
  );
}

// FORUM: NÅR ET INNLEGG ER ÅPENT/TRYKKET PÅ.
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,

  },
  spacer: {
    minHeight: spacing.xl,

  },
  content: {
    padding: spacing.lg,
    marginTop: spacing.xl,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: radius.xl,
    padding: spacing.xl,
    gap: spacing.lg,
    boxShadow: "0 1px 6px #cfcfcf46",
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
    borderColor: colors.danger,
    borderRadius: radius.full,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
  },
  deletePressed: {
    backgroundColor: "#d55c5c6e"
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
    color: Theme.inputBg,
  },
});