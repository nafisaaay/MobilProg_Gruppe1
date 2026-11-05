import { ComponentProps } from "react";
import { router, Stack } from "expo-router";
import { colors, fontSize } from "../constants/theme";
import { Pressable, Text } from "react-native";
import Ionicons from "@react-native-vector-icons/ionicons";

// Henter typene fra Stack:
type StackScreenOptions = ComponentProps<typeof Stack>["screenOptions"];
type ScreenOptions = ComponentProps<typeof Stack.Screen>["options"];

// Lukke knapp for modaler
function CloseBtn() {
  return (
    <Pressable
      onPress={() => router.back()}
      hitSlop={12}
      accessibilityLabel="Lukk"
      accessibilityRole="button"
    >
      <Text
        style={{
          color: colors.primary,
          fontSize: fontSize.md,
          fontWeight: "600",
        }}
      >
        <Ionicons name="close" size={16} color={colors.textSubtle} />
      </Text>
    </Pressable>
  );
}

// FELLES styling og konstanter for ALLE skjermer i stacken:
export const stackScreenOptions: StackScreenOptions = {
  // Fargestil
  headerTintColor: colors.primary,
  headerShadowVisible: false,

  // Tittel
  headerTitleStyle: {
    fontSize: fontSize.lg,
    fontWeight: "600",
  },
  headerTitleAlign: "center", //Denne gjelder mest for Android

  // 'Gå tilbake'-knapp
  headerBackButtonDisplayMode: "generic",
};

// Skjermer UTEN HEADER (eks. login)
export const noHeaderOptions: ScreenOptions = {
  headerShown: false,
  animation: "fade",
};

//
export function modalOptions(title = ""): ScreenOptions {
  return {
    presentation: "modal",
    title,
    headerShown: true,
    headerRight: () => <CloseBtn />,
  };
}
