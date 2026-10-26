import { View, Text, Pressable } from "react-native";

interface EmptyProps {
  title: string;
  hint?: string;
  onPress: ({ message, id }: { message: string; id: number }) => void;
}

export function Empty({ title, hint, onPress }: EmptyProps) {
  function whenPressed() {
    console.log("Pressed");
    onPress({
      message: "Hello from Empty.tsx",
      id: 123,
    });
  }

  return (
    <View>
      <Text>{title}</Text>
      <Pressable onPress={whenPressed}>
        <Text>Trykk her</Text>
      </Pressable>
      {hint ? <Text>{hint}</Text> : null}
    </View>
  );
}