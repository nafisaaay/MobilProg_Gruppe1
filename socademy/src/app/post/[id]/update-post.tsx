import { useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { usePosts } from "../../../context/PostContext";

export default function EditPostScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { posts, updateToApi } = usePosts();
  const post = posts.find((p) => p.id === Number(id));

  const [title, setTitle] = useState(post?.title ?? "");
  const [text, setText] = useState(post?.text ?? "");
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  if (!post) {
    return <Text>Fant ikke innlegget</Text>;
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
    <View>
      <TextInput value={title} onChangeText={setTitle} placeholder="Tittel" />
      <TextInput value={text} onChangeText={setText} placeholder="Tekst" multiline />

      {error ? <Text>{error}</Text> : null}

      <Pressable onPress={handleUpdate} disabled={isSaving}>
        <Text>{isSaving ? "Lagrer..." : "Lagre"}</Text>
      </Pressable>

      <Pressable onPress={() => router.back()}>
        <Text>Avbryt</Text>
      </Pressable>
    </View>
  );
}