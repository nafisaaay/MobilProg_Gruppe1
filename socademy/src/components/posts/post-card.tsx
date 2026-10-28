import { View, Text, StyleSheet } from "react-native";
import type { ApiPost } from "../../api/posts";
import { Theme } from "../../constants/theme";
import Ionicons from "@react-native-vector-icons/ionicons";

export default function PostCard({ post }: { post: ApiPost }) {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <View style={styles.avatar} />
        <View style={styles.content}>
          <Text style={styles.title} numberOfLines={1}>{post.title}</Text>
          <Text style={styles.text} numberOfLines={3}>{post.text}</Text>
        </View>
      </View>

      <View style={styles.actions}>
        <Ionicons name="chatbubble-outline" size={26} color={Theme.icon} />
        <Ionicons name="heart-outline" size={26} color={Theme.icon} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Theme.surface,
    borderRadius: Theme.radius.sm,
    padding: Theme.spacing.lg,
    minHeight: 200,
  },
  row: {
    flexDirection: "row",
    gap: Theme.spacing.lg,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: Theme.radius.full,
    backgroundColor: Theme.placeholder,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: Theme.fontSize.lg,
    fontWeight: "600",
    color: Theme.text,
  },
  text: {
    fontSize: Theme.fontSize.md,
    color: Theme.textMuted,
    marginTop: Theme.spacing.xs,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: Theme.spacing.lg,
    marginTop: "auto",
    paddingTop: Theme.spacing.lg,
  },
});