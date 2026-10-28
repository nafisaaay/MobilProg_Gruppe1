import { View, Text, FlatList, ActivityIndicator, Pressable } from "react-native";
import { router } from "expo-router";
import { usePosts } from "../../../context/PostContext";
import PostCard from "../../../components/posts/post-card";

export default function ListPostScreen() {
  const { posts, isLoading, error } = usePosts();

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  return (
    <View>
        <Pressable onPress={() => router.push("/new-post")}>
             <Text>Nytt innlegg</Text>
             </Pressable>
                <FlatList
                data={posts} keyExtractor={(post) => String(post.id)} renderItem={({ item }) => (
            <Pressable onPress={() => router.push(`/post/${item.id}`)}>
            <PostCard post={item} />
    </Pressable>
  )}
  ListEmptyComponent={<Text>Ingen innlegg ennå</Text>}
/>
    </View>
  );
}