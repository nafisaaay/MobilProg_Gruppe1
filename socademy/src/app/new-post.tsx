import { useState } from "react";
import { router } from "expo-router";
import { View, Text, TextInput, Pressable } from "react-native";
import { usePosts } from "../context/PostContext";

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
    <View>
      <Text>Si hva du tenker!</Text>

      <TextInput placeholder="Tittel" value={title} onChangeText={setTitle} />
      <TextInput placeholder="Tekst" value={text} onChangeText={setText} multiline />

      {error ? <Text>{error}</Text> : null}

      <Pressable onPress={handleCreatePost} disabled={isSaving}>
        <Text>{isSaving ? "Publiserer..." : "Publiser"}</Text>
      </Pressable>

      <Pressable onPress={() => router.back()}>
        <Text>Avbryt</Text>
      </Pressable>
    </View>
  );
}