import {useState} from "react";

import { View, Text, Pressable, Modal, ScrollView } from "react-native";


import { CreateEvent } from "../../components/CreateEvent";

export default function CalendarScreen() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <View className="flex-1">

            {/* Midlertidig tekst, til selve kalenderen er laget */}
            <Text>Kalender</Text>

         {/* Plussknappen */}
            <Pressable
                onPress={() => setIsOpen(true)}
                accessibilityRole="button"
                accessibilityLabel="Ny hendelse"
                className="absolute bottom-6 right-6 w-14 h-14 rounded-full bg-primary items-center justify-center"
            >
                <Text className="text-white text-3xl">+</Text>
            </Pressable>

        <Modal
            visible={isOpen}
            animationType="slide"
            presentationStyle="pageSheet"
            onRequestClose={() => setIsOpen(false)}
        >

        <View className="flex-row justify-end p-4">
            <Pressable onPress={() => setIsOpen(false)} accessibilityRole="button">
                <Text className="text-primary">Lukk</Text>
            </Pressable>
        </View>

        <ScrollView>
            <CreateEvent />
        </ScrollView>
        </Modal>
        </View>
    );

}   