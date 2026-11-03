import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Pressable,
  StyleSheet,
} from "react-native";
import { router } from "expo-router";
import { usePosts } from "../../../context/PostContext";
import PostCard from "../../../components/posts/post-card";
import { colors, fontSize, spacing } from "../../../constants/theme";
import PostComposer from "../../../components/posts/post-composer";
import { commonStyles } from "../../../styles/commonStyles";
import { useState } from "react";
import { ApiPost } from "../../../api/posts";

export default function ListPostScreen() {
  const { posts, isLoading, error } = usePosts();
  const [selectedPost, setSelectedPost] = useState<ApiPost | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const openPost = (post: ApiPost) => {
    setSelectedPost(post);
    setModalVisible(true);
  };

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return (
      <View>
        <Text style={commonStyles.error}>{error}</Text>;
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <FlatList
        data={posts}
        keyExtractor={(post) => String(post.id)}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <View style={styles.header}>
            <PostComposer />
          </View>
        }
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => router.push(`/post/${item.id}`)}
            style={({ pressed }) => pressed && styles.postPressed}
          >
            <PostCard post={item} />
          </Pressable>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>Ingen innlegg ennå</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  list: {
    width: "100%",
    maxWidth: 720,
    alignSelf: "center",
    padding: spacing.lg,
  },
  header: {
    gap: spacing.lg,
    marginBottom: spacing.xl,
  },
  separator: {
    height: spacing.lg,
  },
  postPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.99 }],
  },
  empty: {
    marginTop: spacing.xl,
    color: colors.textMuted,
    fontSize: fontSize.md,
    textAlign: "center",
  },
});
