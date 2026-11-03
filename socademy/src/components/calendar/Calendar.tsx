import { Pressable, StyleSheet, Text, View } from "react-native";
import { addMonths, type YearMonth } from "../../utils/calendarUtils";
import { MonthGrid } from "./MonthGrid";

/**
 * Viser en måned med knapper for å bla frem og tilbake.
 *
 * MOBIL: På web var navigasjonen lenker med måneden i URL-en.
 * En app har ingen URL, så her kaller knappene onChangeMonth i stedet,
 * og skjermen som bruker Calendar tar vare på måneden med useState.
 *
 * Komponenten har ingen state selv, den viser bare det den får som props.
 */

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

type CalendarProps = YearMonth & {
    events: Event[];
    selectedDate: string | null;
    onChangeMonth: (ym: YearMonth) => void; // MOBIL: erstatter monthHref
    onSelectDate: (key: string) => void;    // MOBIL: sendes videre til MonthGrid
};

export function Calendar({ year, month, events, selectedDate, onChangeMonth, onSelectDate }: CalendarProps) {
    const prev = addMonths({ year, month }, -1);
    const next = addMonths({ year, month }, 1);

    // F.eks. "november 2026"
    const monthName = new Date(year, month).toLocaleDateString("nb-NO", {
        month: "long",
        year: "numeric",
    });

    // MOBIL: stor forbokstav (på web gjorde CSS det med first-letter:uppercase)
    const title = monthName.charAt(0).toUpperCase() + monthName.slice(1);

    const now = new Date();

    return (
        <View style={styles.card}>
            <View style={styles.header}>
                <View>
                    <Text style={styles.label}>KALENDER</Text>
                    <Text accessibilityRole="header" style={styles.title}>{title}</Text>
                </View>

                <View style={styles.nav}>
                    <Pressable onPress={() => onChangeMonth(prev)} accessibilityLabel="Forrige måned" style={styles.arrow}>
                        <Text style={styles.arrowText}>‹</Text>
                    </Pressable>
                    <Pressable
                        onPress={() => onChangeMonth({ year: now.getFullYear(), month: now.getMonth() })}
                        style={styles.todayButton}
                    >
                        <Text>I dag</Text>
                    </Pressable>
                    <Pressable onPress={() => onChangeMonth(next)} accessibilityLabel="Neste måned" style={styles.arrow}>
                        <Text style={styles.arrowText}>›</Text>
                    </Pressable>
                </View>
            </View>

            <MonthGrid year={year} month={month} events={events} selectedDate={selectedDate} onSelectDate={onSelectDate} />
        </View>
    );
}

const styles = StyleSheet.create({
    card: { marginTop: 24, borderRadius: 24, backgroundColor: "#fff", padding: 20 },
    header: {
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "space-between",
        borderBottomWidth: 1,
        borderBottomColor: "#e5e7eb",
        paddingBottom: 20,
    },
    label: { fontSize: 12, fontWeight: "600", letterSpacing: 2, color: "#2563eb" },
    title: { marginTop: 4, fontSize: 28, fontWeight: "bold" },

    nav: { flexDirection: "row", alignItems: "center", gap: 8 },
    arrow: { padding: 8 },
    arrowText: { fontSize: 24 },
    todayButton: { borderWidth: 1, borderColor: "#d1d5db", borderRadius: 999, paddingHorizontal: 12, paddingVertical: 4 },
});