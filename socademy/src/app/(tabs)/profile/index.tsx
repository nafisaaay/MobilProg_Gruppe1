import { View, Text, Image } from "react-native";

export default function ProfileScreen() {
    return (
        <View>
            <Text>Profile Screen</Text>
            <Image
                source={{ uri: "https://picsum.photos/150" }}
                style={{ width: 150, height: 150 }}
            />
        </View>
    )
}