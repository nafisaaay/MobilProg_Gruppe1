import { Tabs } from "expo-router";
import { ComponentProps } from "react";
import Ionicons from "@react-native-vector-icons/ionicons";
import { colors, fontSize } from "../../constants/theme";

type TabStyling = ComponentProps<typeof Tabs>["screenOptions"];

const tabStyling: TabStyling = {
  headerShadowVisible: false,

  tabBarActiveTintColor: colors.primary,
  tabBarInactiveTintColor: colors.icon,
  tabBarStyle: {
    borderTopWidth: 0,
    boxShadow: "0 -1px 6px #cfcfcf46",
  },
  tabBarShowLabel: false,
};

export default function TabsLayout() {
  return (
    <Tabs screenOptions={tabStyling}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Hjem",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="forum"
        options={{
          title: "Forum",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "list" : "list-outline"}
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: "Chat",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "chatbubbles" : "chatbubbles-outline"}
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          title: "Varsler",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name="notifications" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profil",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tabs>
  );
}
