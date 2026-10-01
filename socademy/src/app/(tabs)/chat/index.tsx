import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function ChatListScreen() {
    return (

        <View>
            {/* Test av NativeWind, kan slettes */}
            <Text className="text-3xl font-bold text-blue-500">Chat List</Text>
            <Link href="/chat/1">Samtale med Nafisa</Link>
        </View>
    )
}