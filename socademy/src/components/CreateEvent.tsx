import { useState } from "react";
import { View, Text, TextInput, Pressable, Switch } from "react-native";
import { createEvent } from "../api/events";

export function CreateEvent({ onCreated }: { onCreated: () => void }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [location, setLocation] = useState("");
    const [category, setCategory] = useState("");
    const [isOutdoor, setIsOutdoor] = useState(false);
    const [error, setError] = useState<string | null>(null);


    // Gjelder kategori dropdown, legg til flere/endre om dere vil
    // const categories = [
    //     { value: "study", label: "Sosialt" },
    //     { value: "social", label: "Akademisk" },
    //     { value: "sports", label: "Sport" },
    //     { value: "other", label: "Annet" }
    // ]

    const isDisabled =
        title.trim() === "" ||
        description.trim() === "" ||
        date.trim() === "" ||
        time.trim() === "" ||
        location.trim() === "" ||
        category === "";

    async function onSubmit() {
        setError(null);
        try {
            await createEvent({
                title,
                description,
                location,
                startsAt: `${date}T${time}`,
            });
            onCreated();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Kunne ikke lagre");
        }
    }

    return (
        <View>
            <Text> Tittel</Text>
            <TextInput
                accessibilityLabel="Tittel"
                placeholder="Skriv en tittel"
                value={title}
                onChangeText={setTitle}
            />

            <Text>Beskrivelse</Text>
            <TextInput
                accessibilityLabel="description"
                placeholder="Skriv en beskrivelse"
                value={description}
                onChangeText={setDescription}
            />

            <Text>Dato</Text>
            <TextInput
                accessibilityLabel="Dato"
                placeholder="AAAA-MM-DD"
                value={date}
                onChangeText={setDate}
            />

            <Text>Tid</Text>
            <TextInput
                accessibilityLabel="time"
                placeholder="TT:MM"
                value={time}
                onChangeText={setTime}
            />

            <Text>Sted</Text>
            <TextInput
                accessibilityLabel="location"
                placeholder="Skriv et sted"
                value={location}
                onChangeText={setLocation}

            />


            <Text>Kategori</Text>

            <Pressable onPress={() => setCategory("social")}>
                <Text>Sosialt</Text>
            </Pressable>

            <Pressable onPress={() => setCategory("study")}>
                <Text>Akademisk</Text>
            </Pressable>

            <Pressable onPress={() => setCategory("sports")}>
                <Text>Sport</Text>
            </Pressable>

            <Pressable onPress={() => setCategory("other")}>
                <Text>Annet</Text>
            </Pressable>

            <Text>Valgt: {category}</Text>


            <Text>Utendørs</Text>
            <Switch
                accessibilityLabel="isOutdoor"
                value={isOutdoor}
                onValueChange={setIsOutdoor}
            />


            <Pressable disabled={isDisabled} onPress={onSubmit}>
                <Text>{isDisabled ? "Lagre (fyll ut alle feltene)" : "Lagre"}</Text>
            </Pressable>
            {error ? <Text accessibilityRole="alert">{error}</Text> : null}

        </View>
    );
}