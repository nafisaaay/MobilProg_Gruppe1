import { useEffect, useState } from "react";
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { Calendar } from "../../components/calendar/Calendar";

import { CreateEvent } from "../../components/CreateEvent";

import { UpcomingEvents } from "../../components/calendar/UpcomingEvents";
import { Theme } from "../../constants/theme";
import type { YearMonth } from "../../utils/calendarUtils";

const API_URL = "http://10.0.2.2:5173";

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

export default function CalendarScreen() {

    const now = new Date();
    const [yearMonth, setYearMonth] = useState<YearMonth>({ year: now.getFullYear(), month: now.getMonth() });
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [events, setEvents] = useState<Event[]>([]);

    useEffect(() => {
        async function loadEvents() {
            try {
                const res = await fetch(`${API_URL}/api/v1/events`);
                const json = await res.json();
                if (json.ok) setEvents(json.data);
            } catch (error) {
                console.log("Klarte ikke hente events", error);
            }
        }
        loadEvents();
    }, []);

    function changeMonth(ym: YearMonth) {
        setYearMonth(ym);
        setSelectedDate(null);
    }



    const [isOpen, setIsOpen] = useState(false);

    return (
        <View style={styles.container}>

            <Calendar
                year={yearMonth.year}
                month={yearMonth.month}
                events={events}
                selectedDate={selectedDate}
                onChangeMonth={changeMonth}
                onSelectDate={setSelectedDate}
            />
            <UpcomingEvents events={events} selectedDate={selectedDate} />



 {/* Plussknappen */}
            <Pressable
                onPress={() => setIsOpen(true)}
                accessibilityRole="button"
                accessibilityLabel="Ny hendelse"
                style={styles.fab}
            >
                <Text style={styles.fabText}>+</Text>
            </Pressable>

            <Modal
                visible={isOpen}
                animationType="slide"
                presentationStyle="pageSheet"
                onRequestClose={() => setIsOpen(false)}
            >
                <View style={styles.modalHeader}>
                    <Pressable onPress={() => setIsOpen(false)} accessibilityRole="button">
                        <Text style={styles.closeText}>Lukk</Text>
                    </Pressable>
                </View>

                <ScrollView>
                    <CreateEvent />
                </ScrollView>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },

    // + knappen nede i hjørnet
    fab: {
        position: "absolute",
        bottom: 24,
        right: 24,
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: Theme.primary,
        alignItems: "center",
        justifyContent: "center",
    },
    fabText: { color: "#fff", fontSize: 30 },

    modalHeader: { flexDirection: "row", justifyContent: "flex-end", padding: 16 },
    closeText: { color: Theme.primary },
});