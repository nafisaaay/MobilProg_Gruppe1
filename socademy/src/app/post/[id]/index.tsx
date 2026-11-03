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

export default function PostDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { posts, removeToApi } = usePosts();
  const [error, setError] = useState<string | null>(null);

  const post = posts.find((p) => p.id === Number(id));

  if (!post) {
    return (
      <View style={commonStyles.screen}>
        <Text style={commonStyles.notFound}>Fant ikke innlegget</Text>
      </View>
    );
  }
  /* Kun forfatter/eier som får se "rediger" og "slett" etter åpning av innlegg
  const isOwner = user?.id === post.userId; 
  */

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
    <SafeAreaView
      style={commonStyles.screen}
      edges={["left", "right", "bottom"]}
    >
      <ScrollView contentContainerStyle={commonStyles.content}>
        <View style={commonStyles.card}>
          <View style={commonStyles.header}>
            <View style={commonStyles.avatar} />
            <Text style={commonStyles.title}>{post.title}</Text>
          </View>

          <Text style={commonStyles.text}>{post.text}</Text>

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
      </ScrollView>
    </SafeAreaView>
  );
}

// FORUM: NÅR ET INNLEGG ER ÅPENT/TRYKKET PÅ.
const styles = StyleSheet.create({
  deleteBtn: {
    backgroundColor: colors.danger,
  },
  editBtn: {
    backgroundColor: colors.primary,
  },
});
