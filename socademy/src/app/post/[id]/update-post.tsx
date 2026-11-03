import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { usePosts } from "../../../context/PostContext";
import {
  colors,
  common,
  fontSize,
  radius,
  spacing,
} from "../../../constants/theme";
import useOrientation from "../../../hooks/useOrientation";
import { commonStyles } from "../../../styles/commonStyles";
import { SafeAreaView } from "react-native-safe-area-context";

export default function EditPostScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { posts, updateToApi } = usePosts();
  const post = posts.find((p) => p.id === Number(id));

  const [title, setTitle] = useState(post?.title ?? "");
  const [text, setText] = useState(post?.text ?? "");
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const { isPhoneLandscape } = useOrientation();

  if (!post) {
    return (
      <View>
        <Text style={commonStyles.notFound}>Fant ikke innlegget</Text>
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
    <SafeAreaView style={commonStyles.screen}>
      <KeyboardAvoidingView
        style={commonStyles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined} // bruker padding kun hvis appen er på ios. Android gjør det ut ved krymping av appvindu.
      >
        <ScrollView
          contentContainerStyle={[
            commonStyles.content,
            isPhoneLandscape && commonStyles.contentLandscape,
          ]}
          keyboardShouldPersistTaps="handled"
        >
          <View>
            <Text style={commonStyles.formLabel}>Tittel</Text>
            <TextInput
              style={commonStyles.formInput}
              placeholder="Tittel"
              placeholderTextColor={colors.textSubtle}
              value={title}
              onChangeText={setTitle}
              editable={!isSaving}
            />

            <Text style={commonStyles.formLabel}>Tekst</Text>
            <TextInput
              style={[commonStyles.formInput, commonStyles.inputTxtArea]}
              placeholder="Tekst"
              placeholderTextColor={colors.textSubtle}
              value={text}
              onChangeText={setText}
              multiline
              textAlignVertical="top"
              editable={!isSaving}
            />

            {error ? <Text style={commonStyles.error}>{error}</Text> : null}
          </View>

          <View style={commonStyles.actions}>
            <Pressable
              onPress={() => router.back()}
              style={({ pressed }) => [
                styles.cancelBtn,
                pressed && common.pressed,
              ]}
            >
              <Text style={common.pressed}>Avbryt</Text>
            </Pressable>

            <Pressable
              onPress={handleUpdate}
              disabled={isSaving}
              style={({ pressed }) => [
                commonStyles.filledBtn,
                isSaving && common.pressed,
                pressed && common.pressed,
              ]}
            >
              <Text style={commonStyles.btnText}>
                {isSaving ? "Lagrer..." : "Lagre"}
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// FORUM: Rediger innlegg-siden
const styles = StyleSheet.create({
  cancelBtn: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
  },

  heading: {
    fontSize: fontSize.lg,
    alignSelf: "center",
    fontWeight: "700",
    color: colors.text,
    marginTop: spacing.lg,
    marginBottom: spacing.xl,
  },
});
