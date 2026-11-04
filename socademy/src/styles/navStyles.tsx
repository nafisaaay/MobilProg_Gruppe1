import { ComponentProps } from "react";
import { Stack } from "expo-router";
import { colors, fontSize } from "../constants/theme";

// Henter typene fra Stack:
type StackScreenOptions = ComponentProps<typeof Stack>["screenOptions"];
type ScreenOptions = ComponentProps<typeof Stack.Screen>["options"];

// FELLES styling og konstanter for ALLE skjermer i stacken:
export const stackScreenOptions: StackScreenOptions = {
    // Fargestil
    headerTintColor: colors.primary,
    headerStyle: { backgroundColor: colors.background },
    contentStyle: { backgroundColor: colors.background },
    headerShadowVisible: false,

    // Tittel
    headerTitleStyle: {
        fontSize: fontSize.lg,
        fontWeight: "600",
        color: colors.text,
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

/*
/** Modal med Avbryt-knapp. Tittelen settes per skjerm. 
export function modalOptions(title: string): ScreenOptions {
    return {
        presentation: "modal",
        title,
        headerLeft: () => <CancelButton />,
    };
}
*/

