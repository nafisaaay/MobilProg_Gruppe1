import { View, Text } from "react-native";
import type { ApiPost } from "../../api/posts";

export default function PostCard({ post }: { post: ApiPost }) {

  return (
    <View>
      <Text>{post.title}</Text>
      <Text>{post.text}</Text>
    </View>
  );
}