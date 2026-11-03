import { useState } from "react";
import { router } from "expo-router";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { usePosts } from "../context/PostContext";
import { colors, spacing, fontSize, radius, common } from "../constants/theme";
import { commonStyles } from "../styles/commonStyles";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CreatePostScreen() {
  const { addToApi } = usePosts();
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  async function handleCreatePost() {
    setError(null);
    setIsSaving(true);
    try {
      await addToApi({ title, text });
      router.back();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not create post");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <SafeAreaView style={commonStyles.screen}>
      <KeyboardAvoidingView
        style={commonStyles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined} // bruker padding kun hvis appen er på ios. Android gjør det ut ved krymping av appvindu.
      >
        <ScrollView
          contentContainerStyle={commonStyles.content}
          keyboardShouldPersistTaps="handled"
        >
          <View>
            <Text style={commonStyles.formLabel}>Tittel</Text>
            <TextInput
              style={commonStyles.formInput}
              placeholder="Gi innlegget en tittel"
              placeholderTextColor={colors.textSubtle}
              value={title}
              onChangeText={setTitle}
              editable={!isSaving}
            />

            <Text style={commonStyles.formLabel}>Tekst</Text>
            <TextInput
              style={[commonStyles.formInput, commonStyles.inputTxtArea]}
              placeholder="Hva har du i dine tanker?"
              placeholderTextColor={colors.textSubtle}
              value={text}
              onChangeText={setText}
              multiline
              textAlignVertical="top"
              editable={!isSaving}
            />

            {error ? <Text style={commonStyles.error}>{error}</Text> : null}

            <View style={commonStyles.actions}>
              <Pressable onPress={() => router.back()}>
                <Text style={styles.cancelBtn}>Avbryt</Text>
              </Pressable>

              <Pressable
                onPress={handleCreatePost}
                disabled={isSaving}
                style={[commonStyles.filledBtn, isSaving && common.pressed]}
              >
                <Text style={commonStyles.btnText}>
                  {isSaving ? "Publiserer..." : "Publiser"}
                </Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// FORUM: LAG NY INNLEGG.
const styles = StyleSheet.create({
  heading: {
    fontSize: fontSize.lg,
    alignSelf: "center",
    fontWeight: "700",
    color: colors.text,
  },

  cancelBtn: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    color: colors.textMuted,
  },
});
