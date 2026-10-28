import { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { usePosts } from "../../../context/PostContext";

export default function PostDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { posts, removeToApi } = usePosts();
  const [error, setError] = useState<string | null>(null);

  const post = posts.find((p) => p.id === Number(id));

  if (!post) {
  return <Text>Fant ikke innlegget</Text>;
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
    <View>
      <Text>{post.title}</Text>
      <Text>{post.text}</Text>

      <Pressable onPress={() => router.push(`/post/${post.id}/update-post`)}>
         <Text>Rediger</Text>
         </Pressable>

      <Pressable onPress={handleRemove}>
        <Text>Slett</Text>
      </Pressable>

      {error ? <Text>{error}</Text> : null}
    </View>
  );
}