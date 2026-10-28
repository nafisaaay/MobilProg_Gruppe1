import { View, Text, ActivityIndicator } from "react-native";


type LoadingProps = {
  label?: string;
};

export function Loading({ label = "Laster..." }: LoadingProps) {
  return (
    <View>
      <ActivityIndicator/>
      <Text>{label}</Text>
    </View>
  );
}