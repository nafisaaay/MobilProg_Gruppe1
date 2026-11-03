import { useEffect, useState } from "react";
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { Calendar } from "../../components/calendar/Calendar";

import { CreateEvent } from "../../components/CreateEvent";

import { UpcomingEvents } from "../../components/calendar/UpcomingEvents";
import { Theme } from "../../constants/theme";
import type { YearMonth } from "../../utils/calendarUtils";
import { getAllEvents, type ApiEvent } from "../../api/events";

export default function CalendarScreen() {

    const now = new Date();
    const [yearMonth, setYearMonth] = useState<YearMonth>({ year: now.getFullYear(), month: now.getMonth() });
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [events, setEvents] = useState<ApiEvent[]>([]);

        async function loadEvents() {
        try {
            const data = await getAllEvents();
            setEvents(data);
        } catch (error) {
            console.log("Klarte ikke hente events", error);
        }
    }

    // Henter events én gang når skjermen åpnes
    useEffect(() => {
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
                    <CreateEvent
                        onCreated={() => {
                            setIsOpen(false);   // lukker modalen
                            loadEvents();       // henter events på nytt, så den nye prikken vises
                        }}
                    />
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