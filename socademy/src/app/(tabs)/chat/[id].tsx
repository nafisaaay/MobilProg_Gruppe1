import { View, Text, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { fontSize } from "../../../constants/theme";

export default function ChatScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <View>
      <Text style={styles.title}>Chat Screen for ID: {id}</Text>
    </View>
  );
}

// CHAT SCREEN: Viser spesifikke chat-samtaler basert på ID
const styles = StyleSheet.create({
  title: {
    fontSize: fontSize.lg,
    fontWeight: "bold",
    color: "#bb1616",
  },
});
