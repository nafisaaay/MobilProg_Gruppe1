import { Link } from "expo-router";
import { View, Text, StyleSheet } from "react-native";
import { Theme } from "../../../constants/theme";

export default function ChatListScreen() {
    return (

        <View>
            <Text style={styles.title}>Chat List</Text>
            <Link href="/chat/1">Samtale med Nafisa</Link>
        </View>
    )
}

const styles = StyleSheet.create({
    title: { 
        fontSize: Theme.fontSize.lg, 
        fontWeight: "bold", 
        color: "#bb1616",
    },
});