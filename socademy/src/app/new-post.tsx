import { useState } from "react";
import { router } from "expo-router";
import { usePosts } from "../context/PostContext";
import { colors, spacing, radius, fontSize } from "../constants/theme";
import { createEvent } from "../api/events";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Switch,
} from "react-native";

export default function CreatePostScreen() {
  const { addToApi } = usePosts();
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const [isEvent, setIsEvent] = useState(false);
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [location, setLocation] = useState("");

  async function handleCreatePost() {
    setError(null);
    setIsSaving(true);
    try {
      await addToApi({ title, text });
      // Er bryteren på, lagres innlegget også som et event i kalenderen
      if (isEvent) {
        await createEvent({
          title,
          description: text,
          location,
          startsAt: `${eventDate}T${eventTime}`,
        });
      }

      router.back();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not create post");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <View style={styles.screen}>
      <Text style={styles.heading}>Publiser nytt innlegg!</Text>

      <Text style={styles.label}>Tittel</Text>
      <TextInput
        style={styles.input}
        placeholder="Gi innlegget en tittel"
        placeholderTextColor={colors.textSubtle}
        value={title}
        onChangeText={setTitle}
        editable={!isSaving}
      />

      <Text style={styles.label}>Tekst</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Hva har du i dine tanker?"
        placeholderTextColor={colors.textSubtle}
        value={text}
        onChangeText={setText}
        multiline
        textAlignVertical="top"
        editable={!isSaving}
      />

      <View style={styles.switchRow}>
        <Text style={styles.label}>Dette er et event</Text>
        <Switch
          value={isEvent}
          onValueChange={setIsEvent}
          disabled={isSaving}
        />
      </View>

      {/* Vises bare når bryteren er på */}
      {isEvent ? (
        <>
          <Text style={styles.label}>Dato</Text>
          <TextInput
            style={styles.input}
            placeholder="AAAA-MM-DD"
            placeholderTextColor={colors.textSubtle}
            value={eventDate}
            onChangeText={setEventDate}
            editable={!isSaving}
          />

          <Text style={styles.label}>Tid</Text>
          <TextInput
            style={styles.input}
            placeholder="TT:MM"
            placeholderTextColor={colors.textSubtle}
            value={eventTime}
            onChangeText={setEventTime}
            editable={!isSaving}
          />

          <Text style={styles.label}>Sted</Text>
          <TextInput
            style={styles.input}
            placeholder="Hvor skjer det?"
            placeholderTextColor={colors.textSubtle}
            value={location}
            onChangeText={setLocation}
            editable={!isSaving}
          />
        </>
      ) : null}

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <View style={styles.actions}>
        <Pressable onPress={() => router.back()} style={styles.cancelButton}>
          <Text style={styles.cancelText}>Avbryt</Text>
        </Pressable>

        <Pressable
          onPress={handleCreatePost}
          disabled={isSaving}
          style={[styles.submitButton, isSaving && styles.submitButtonDimmed]}
        >
          <Text style={styles.submitText}>
            {isSaving ? "Publiserer..." : "Publiser"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

// FORUM: LAG NY INNLEGG.
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.xl,
    marginTop: spacing.xl,
  },

  heading: {
    fontSize: fontSize.lg,
    alignSelf: "center",
    fontWeight: "700",
    color: colors.text,
    marginBottom: spacing.xl,
  },
  label: {
    fontSize: fontSize.md,
    fontWeight: "600",
    color: colors.text,
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  input: {
    backgroundColor: colors.inputBg,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    fontSize: fontSize.md,
    color: colors.text,
    marginBottom: spacing.lg,
    boxShadow: "0 1px 6px #cfcfcf46",
  },
  textArea: {
    minHeight: 200,
  },
  error: {
    color: colors.danger,
    fontSize: fontSize.md,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: spacing.md,
    marginTop: spacing.xl,
  },
  cancelButton: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  cancelText: {
    fontSize: fontSize.md,
    fontWeight: "600",
    color: colors.textMuted,
  },
  submitButton: {
    backgroundColor: colors.primary,
    borderRadius: radius.full,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
  },
  submitButtonDimmed: {
    opacity: 0.6,
  },
  submitText: {
    fontSize: fontSize.md,
    fontWeight: "600",
    color: colors.inputBg,
  },

  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.lg,
  },
});
