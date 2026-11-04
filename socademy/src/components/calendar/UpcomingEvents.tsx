import { StyleSheet, Text, View } from "react-native";
import { toDateKey } from "../../utils/calendarUtils";

type Event = {
    id: number;
    title: string;
    description: string | null;
    location: string | null;
    startsAt: string;
    endsAt: string | null;
    createdBy: string;
    createdAt: string;
};

// Viser enten eventene på valgt dag, eller de 3 neste kommende
export function UpcomingEvents({ events, selectedDate }: { events: Event[]; selectedDate: string | null }) {
    const now = new Date();

    // MOBIL: startsAt kommer som tekst fra API-et, så den gjøres om til Date
    const upcomingEvents = selectedDate
        ? events.filter((event) => toDateKey(new Date(event.startsAt)) === selectedDate)   // valgt dag
        : events
            .filter((event) => new Date(event.startsAt) >= now)                            // ingen dag valgt
            .sort((a, b) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime())
            .slice(0, 3);

    if (upcomingEvents.length === 0) {
        return <Text>{selectedDate ? "Ingen hendelser denne dagen" : "Ingen kommende hendelser"}</Text>;
    }

    // Viser tittelen på hver hendelse, id brukes som key
    return (
        <View style={styles.list}>
            {upcomingEvents.map((event) => (
                <View key={event.id} style={styles.item}>
                    <Text numberOfLines={1} style={styles.title}>
                        {event.title}
                    </Text>
                    <Text style={styles.time}>
                        {new Date(event.startsAt).toLocaleString("nb-NO", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}
                    </Text>
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    list: { gap: 12 },
    item: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12,
        borderRadius: 12,
        backgroundColor: "#dbeafe",   // lys blå
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    title: { flex: 1, fontSize: 14, fontWeight: "500", color: "#2563eb" },  // flex: 1 = tar plassen som er igjen
    time: { fontSize: 14, color: "#2563eb" },
});