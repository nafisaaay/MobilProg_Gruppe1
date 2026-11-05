import { useState } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import Ionicons from "@react-native-vector-icons/ionicons";
import { usePosts } from "../../../context/PostContext";
import {
  colors,
  radius,
  spacing,
  fontSize,
  common,
} from "../../../constants/theme";
import { showComingSoon } from "../../../utils/ComingSoon";
import { commonStyles } from "../../../styles/commonStyles";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../../context/AuthContext";

export default function PostDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { user } = useAuth();
  const { posts, removeToApi } = usePosts();
  const [error, setError] = useState<string | null>(null);

  const post = posts.find((p) => p.id === Number(id));

  if (!post) {
    return (
      <View style={commonStyles.flex}>
        <Text style={commonStyles.notFound}>Fant ikke innlegget</Text>
      </View>
    );
  }

  const isOwner = user?.id === post.userId; // Sjekke forfatter/admin ift. redigering/sletting
  const userInitial = post.userName.charAt(0).toUpperCase(); // Bruker initialer til avatar

  const handleRemove = async () => {
    setError(null);
    try {
      await removeToApi(post.id);
      router.back();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not delete post");
    }
  };

  // Bekreftelse av sletting
  const confirmRemoval = () => {
    Alert.alert("Slette innlegget?", "Dette kan ikke angres.", [
      { text: "Avbryt", style: "cancel" },
      { text: "Slett", style: "destructive", onPress: handleRemove },
    ]);
  };

  return (
    <SafeAreaView style={commonStyles.flex} edges={["left", "right", "bottom"]}>
      <ScrollView contentContainerStyle={commonStyles.content}>
        <View style={commonStyles.card}>
          <View style={commonStyles.authorRow}>
            <View style={commonStyles.avatar}>
              <Text style={commonStyles.avatarTxt}>{userInitial}</Text>
            </View>
            <Text style={commonStyles.authorName} numberOfLines={1}>
              {post.userName.toUpperCase()}
            </Text>
          </View>

          <View style={styles.content}>
            <Text style={styles.title}>{post.title}</Text>
            <Text style={commonStyles.text}>{post.text}</Text>
          </View>

          <View style={commonStyles.icons}>
            <Pressable
              onPress={() => showComingSoon("Kommentarer")}
              style={({ pressed }) => pressed && common.pressed}
              hitSlop={12}
            >
              <Ionicons
                name="chatbubble-outline"
                size={26}
                color={colors.icon}
              />
            </Pressable>

            <Pressable
              onPress={() => showComingSoon("Liker")}
              style={({ pressed }) => pressed && common.pressed}
              hitSlop={12}
            >
              <Ionicons name="heart-outline" size={26} color={colors.icon} />
            </Pressable>
          </View>
        </View>

        {error ? <Text style={commonStyles.error}>{error}</Text> : null}

        {isOwner && (
          <View style={commonStyles.actions}>
            <Pressable
              onPress={confirmRemoval}
              style={({ pressed }) => [
                commonStyles.filledBtn,
                styles.deleteBtn,
                pressed && common.pressed,
              ]}
            >
              <Text style={commonStyles.btnText}>Slett</Text>
            </Pressable>

            <Pressable
              onPress={() => router.push(`/post/${post.id}/update-post`)}
              style={({ pressed }) => [
                commonStyles.filledBtn,
                styles.editBtn,
                pressed && common.pressed,
              ]}
            >
              <Text style={commonStyles.btnText}>Rediger</Text>
            </Pressable>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

// FORUM: NÅR ET INNLEGG ER ÅPENT/TRYKKET PÅ.
const styles = StyleSheet.create({
  content: {
    borderTopColor: "#00000021",
    borderTopWidth: 0.5,
    paddingTop: spacing.md,
  },
  title: {
    fontSize: fontSize.lg,
    fontWeight: 600,
    marginBottom: spacing.sm,
  },
  deleteBtn: {
    backgroundColor: colors.danger,
  },
  editBtn: {
    backgroundColor: colors.primary,
  },
});
