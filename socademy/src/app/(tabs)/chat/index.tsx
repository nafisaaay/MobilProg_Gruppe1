import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function ChatListScreen() {
    return (

        <View>
            <Text>Chat List</Text>
            <Link href="/chat/1">Samtale med Nafisa</Link>
        </View>
    )
}