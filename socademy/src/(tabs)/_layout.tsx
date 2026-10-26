import { Tabs } from "expo-router";
import { Ionicons } from "@react-native-vector-icons/ionicons";



export default function TabsLayout() {
    return (
        <Tabs>
            <Tabs.Screen
                name="index"
                options={{
                    title: "Kalender",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="calendar" color={color} size={size} />
                    ),
                }}
            />
            <Tabs.Screen
                name="feed"
                options={{
                    title: "Feed",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="list" color={color} size={size} />
                    ),
                }}
            />
            <Tabs.Screen
                name="chat"
                options={{
                    title: "Chat",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="chatbubbles" color={color} size={size} />
                    ),
                }}
            />
            <Tabs.Screen
                name="notifications"
                options={{
                    title: "Varsler",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="notifications" color={color} size={size} />
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profil",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="person" color={color} size={size} />
                    ),
                }}
            />
        </Tabs>
    )
}