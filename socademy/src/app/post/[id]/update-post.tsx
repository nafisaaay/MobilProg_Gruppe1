import { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { usePosts } from "../../../context/PostContext";
import { Theme } from "../../../constants/theme";

export default function EditPostScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { posts, updateToApi } = usePosts();
  const post = posts.find((p) => p.id === Number(id));

  const [title, setTitle] = useState(post?.title ?? "");
  const [text, setText] = useState(post?.text ?? "");
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  if (!post) {
    return (
      <View style={styles.screen}>
        <Text style={styles.notFound}>Fant ikke innlegget</Text>
      </View>
    );
  }

  const handleUpdate = async () => {
    setError(null);
    setIsSaving(true);
    try {
      await updateToApi(post.id, { title, text });
      router.back();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not update post");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <View style={styles.screen}>
      <View style={styles.card}>
        <Text style={styles.heading}>Rediger innlegg</Text>

        <Text style={styles.label}>Tittel</Text>
        <TextInput
          style={styles.input}
          placeholder="Tittel"
          placeholderTextColor={Theme.textSubtle}
          value={title}
          onChangeText={setTitle}
          editable={!isSaving}
        />

        <Text style={styles.label}>Tekst</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Tekst"
          placeholderTextColor={Theme.textSubtle}
          value={text}
          onChangeText={setText}
          multiline
          textAlignVertical="top"
          editable={!isSaving}
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}
      </View>

      <View style={styles.actions}>
        <Pressable onPress={() => router.back()} style={styles.cancelButton}>
          <Text style={styles.cancelText}>Avbryt</Text>
        </Pressable>

        <Pressable
          onPress={handleUpdate}
          disabled={isSaving}
          style={[styles.submitButton, isSaving && styles.submitButtonDimmed]}
        >
          <Text style={styles.submitText}>{isSaving ? "Lagrer..." : "Lagre"}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Theme.background,
    padding: Theme.spacing.lg,
  },
  card: {
    backgroundColor: Theme.surface,
    borderRadius: Theme.radius.lg,
    padding: Theme.spacing.lg,
  },
  heading: {
    fontSize: Theme.fontSize.xl,
    fontWeight: "700",
    color: Theme.text,
    marginBottom: Theme.spacing.lg,
  },
  label: {
    fontSize: Theme.fontSize.md,
    fontWeight: "600",
    color: Theme.text,
    marginBottom: Theme.spacing.xs,
  },
  input: {
    backgroundColor: Theme.background,
    borderWidth: 1,
    borderColor: Theme.border,
    borderRadius: Theme.radius.md,
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.sm,
    fontSize: Theme.fontSize.md,
    color: Theme.text,
    marginBottom: Theme.spacing.lg,
  },
  textArea: {
    minHeight: 140,
  },
  error: {
    color: Theme.danger,
    fontSize: Theme.fontSize.md,
  },
  notFound: {
    color: Theme.textMuted,
    fontSize: Theme.fontSize.md,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: Theme.spacing.md,
    marginTop: Theme.spacing.xl,
  },
  cancelButton: {
    paddingVertical: Theme.spacing.md,
    paddingHorizontal: Theme.spacing.lg,
  },
  cancelText: {
    fontSize: Theme.fontSize.md,
    fontWeight: "600",
    color: Theme.textMuted,
  },
  submitButton: {
    backgroundColor: Theme.primary,
    borderRadius: Theme.radius.full,
    paddingVertical: Theme.spacing.md,
    paddingHorizontal: Theme.spacing.xl,
  },
  submitButtonDimmed: {
    opacity: 0.6,
  },
  submitText: {
    fontSize: Theme.fontSize.md,
    fontWeight: "600",
    color: Theme.textInverted,
  },
});