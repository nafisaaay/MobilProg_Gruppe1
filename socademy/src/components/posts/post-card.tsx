import { View, Text, StyleSheet } from "react-native";
import type { ApiPost } from "../../api/posts";
import { colors, spacing, fontSize, radius } from "../../constants/theme";
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
        <Ionicons name="chatbubble-outline" size={26} color={colors.icon} />
        <Ionicons name="heart-outline" size={26} color={colors.icon} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: radius.xl,
    padding: spacing.xl,
    gap: spacing.lg,
    boxShadow: "0 1px 6px #cfcfcf46",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: radius.full,
    backgroundColor: colors.avatar,
  },
  content: {
    flex: 1,
    gap: spacing.sm,
  },
  title: {
    fontSize: fontSize.lg,
    fontWeight: "700",
    color: colors.text,
  },
  text: {
    fontSize: 16,
    lineHeight: 22,
    color: colors.text,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: spacing.lg,
  },
});