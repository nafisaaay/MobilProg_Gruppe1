import { View, Text, Pressable, Image, StyleSheet } from "react-native";
import { useAuth } from "../../../context/AuthContext";
import {
  colors,
  common,
  fontSize,
  radius,
  spacing,
} from "../../../constants/theme";
import { useState } from "react";
import { commonStyles } from "../../../styles/commonStyles";

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const [error, setError] = useState("");

  async function handleLogout() {
    try {
      setError("");
      await logout();
    } catch (error) {
      setError(error instanceof Error ? error.message : "Kunne ikke logge ut");
    }
  }

  return (
    <View style={commonStyles.centered}>
      <Image
        source={require("socademy/assets/placeholder-img.png")}
        style={[commonStyles.avatar, styles.avatar]}
      />
      <Text style={[commonStyles.title, styles.name]}>
        {user?.name.toUpperCase()}
      </Text>
      <Text style={commonStyles.text}>{user?.email}</Text>

      <View style={styles.spacer}>
        {error ? <Text style={commonStyles.error}>{error}</Text> : null}

        <Pressable
          onPress={handleLogout}
          style={({ pressed }) => [
            commonStyles.filledBtn,
            styles.logOut,
            pressed && common.pressed,
          ]}
        >
          <Text style={commonStyles.btnText}>Logg ut</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    width: 120,
    height: 120,
    marginBottom: spacing.md,
  },
  spacer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  name: { flex: 0 },
  error: { color: colors.danger },
  logOut: { backgroundColor: colors.danger },
});
