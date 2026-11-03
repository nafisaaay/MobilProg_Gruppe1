import { useState } from "react";
import { router } from "expo-router";
import { usePosts } from "../context/PostContext";
import { Theme } from "../constants/theme";
import { createEvent } from "../api/events";
import { View, Text, TextInput, Pressable, StyleSheet, Switch } from "react-native";

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
      <View style={styles.card}>
        <Text style={styles.heading}>Si hva du tenker!</Text>

        <Text style={styles.label}>Tittel</Text>
        <TextInput
          style={styles.input}
          placeholder="Gi innlegget en tittel"
          placeholderTextColor={Theme.textSubtle}
          value={title}
          onChangeText={setTitle}
          editable={!isSaving}
        />

        <Text style={styles.label}>Tekst</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Hva har du i dine tanker?"
          placeholderTextColor={Theme.textSubtle}
          value={text}
          onChangeText={setText}
          multiline
          textAlignVertical="top"
          editable={!isSaving}

        />


                <View style={styles.switchRow}>
          <Text style={styles.label}>Dette er et event</Text>
          <Switch value={isEvent} onValueChange={setIsEvent} disabled={isSaving} />
        </View>

        {/* Vises bare når bryteren er på */}
        {isEvent ? (
          <>
            <Text style={styles.label}>Dato</Text>
            <TextInput
              style={styles.input}
              placeholder="AAAA-MM-DD"
              placeholderTextColor={Theme.textSubtle}
              value={eventDate}
              onChangeText={setEventDate}
              editable={!isSaving}
            />

            <Text style={styles.label}>Tid</Text>
            <TextInput
              style={styles.input}
              placeholder="TT:MM"
              placeholderTextColor={Theme.textSubtle}
              value={eventTime}
              onChangeText={setEventTime}
              editable={!isSaving}
            />

            <Text style={styles.label}>Sted</Text>
            <TextInput
              style={styles.input}
              placeholder="Hvor skjer det?"
              placeholderTextColor={Theme.textSubtle}
              value={location}
              onChangeText={setLocation}
              editable={!isSaving}
            />
          </>
        ) : null}

        {error ? <Text style={styles.error}>{error}</Text> : null}
      </View>

      <View style={styles.actions}>
        <Pressable onPress={() => router.back()} style={styles.cancelButton}>
          <Text style={styles.cancelText}>Avbryt</Text>
        </Pressable>

        <Pressable
          onPress={handleCreatePost}
          disabled={isSaving}
          style={[styles.submitButton, isSaving && styles.submitButtonDimmed]}
        >
          <Text style={styles.submitText}>{isSaving ? "Publiserer..." : "Publiser"}</Text>
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

    switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Theme.spacing.lg,
  },


});