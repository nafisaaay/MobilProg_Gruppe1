import { View, Text, FlatList, ActivityIndicator, Pressable, StyleSheet} from "react-native";
import { router } from "expo-router";
import { usePosts } from "../../../context/PostContext";
import PostCard from "../../../components/posts/post-card";
import { Theme } from "../../../constants/theme";
import PostComposer from "../../../components/posts/post-composer";

export default function ListPostScreen() {
  const { posts, isLoading, error } = usePosts();

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  return (
  <View style={styles.screen}>
    <FlatList
      data={posts}
      keyExtractor={(post) => String(post.id)}
      contentContainerStyle={styles.list}
      ListHeaderComponent={<View style={styles.header}><PostComposer /></View>}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      renderItem={({ item }) => (
        <Pressable onPress={() => router.push(`/post/${item.id}`)}>
          <PostCard post={item} />
        </Pressable>
      )}
      ListEmptyComponent={<Text style={styles.empty}>Ingen innlegg ennå</Text>}
    />
  </View>
);
}
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Theme.background,
  },
  list: {
    padding: Theme.spacing.lg,
  },
  header: {
    marginBottom: Theme.spacing.xl,
  },
  separator: {
    height: Theme.spacing.xl,
  },
  empty: {
    color: Theme.textMuted,
  },
});