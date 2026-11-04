import { View, Text, StyleSheet } from "react-native";
import type { ApiPost } from "../../api/posts";
import { colors, spacing, fontSize, radius } from "../../constants/theme";
import Ionicons from "@react-native-vector-icons/ionicons";
import { commonStyles } from "../../styles/commonStyles";

export default function PostCard({ post }: { post: ApiPost }) {
  const userInitial = post.userName.charAt(0).toUpperCase();

  return (
    <View style={[commonStyles.card, styles.card]}>
      <View style={[commonStyles.authorRow, styles.authorRow]}>
        <View style={commonStyles.avatar}>
          <Text style={commonStyles.avatarTxt}>{userInitial}</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.title} numberOfLines={1}>
            {post.title}
          </Text>
          <Text style={styles.text} numberOfLines={3}>
            {post.text}
          </Text>
        </View>
      </View>

      <View style={commonStyles.icons}>
        <Ionicons name="chatbubble-outline" size={26} color={colors.icon} />
        <Ionicons name="heart-outline" size={26} color={colors.icon} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { minHeight: 150 },
  authorRow: {
    alignItems: "flex-start",
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
});
