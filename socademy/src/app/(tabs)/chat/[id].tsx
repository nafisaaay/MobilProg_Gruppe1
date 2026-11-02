import { View, Text, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function ChatScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();

    return (
        <View>
            <Text style={styles.title}>Chat Screen for ID: {id}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    title: { fontSize: 30, fontWeight: "bold", color: "#3b82f6" },
});