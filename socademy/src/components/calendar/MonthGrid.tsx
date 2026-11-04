import { Pressable, StyleSheet, Text, View } from "react-native";
import { getMonthGrid, toDateKey } from "../../utils/calendarUtils";

// MOBIL: Eventet slik det kommer fra API-et. Datoene kommer som tekst (JSON), ikke Date
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

// short vises i tabellen, long leses opp av skjermlesere
// Universell utforming you know
const WEEKDAYS = [
    { short: "MAN", long: "Mandag" },
    { short: "TIR", long: "Tirsdag" },
    { short: "ONS", long: "Onsdag" },
    { short: "TOR", long: "Torsdag" },
    { short: "FRE", long: "Fredag" },
    { short: "LØR", long: "Lørdag" },
    { short: "SØN", long: "Søndag" }
];

interface MonthGridProps {
    year: number;
    month: number; // 0-11
    today?: Date; // kan sendes inn i tester, ellers brukes dagens dato
    events?: Event[];
    selectedDate?: string | null;
    onSelectDate?: (key: string) => void; // MOBIL: erstatter lenken (href) fra web
}

// Tegner rutenettet for en måned.
export function MonthGrid({ year, month, today = new Date(), events = [], selectedDate = null, onSelectDate }: MonthGridProps) {
    const grid = getMonthGrid(year, month);
    const todayKey = toDateKey(today);

    return (
        <View style={styles.grid}>
            {/* Ukedagene øverst */}
            <View style={styles.row}>
                {WEEKDAYS.map((day) => (
                    <View key={day.short} style={styles.cell}>
                        {/* MOBIL: accessibilityLabel erstatter <abbr title>, skjermleseren leser hele navnet */}
                        <Text accessibilityLabel={day.long} style={styles.weekday}>
                            {day.short}
                        </Text>
                    </View>
                ))}
            </View>

            {/* Datoen brukes her som key, fordi den er unik for hver uke og hver dag */}
            {grid.map((week) => (
                <View key={toDateKey(week[0])} style={styles.row}>
                    {week.map((day) => {
                        const key = toDateKey(day);
                        const isToday = key === todayKey;
                        const isSelected = key === selectedDate;
                        const isOtherMonth = day.getMonth() !== month;

                        // MOBIL: startsAt er tekst, så den gjøres om til Date først
                        const dayEvents = events.filter(
                            (event) => toDateKey(new Date(event.startsAt)) === key
                        );

                        return (
                            <View key={key} style={styles.cell}>
                                <Pressable
                                    onPress={() => onSelectDate?.(key)}
                                    accessibilityRole="button"
                                    accessibilityLabel={`${day.getDate()}. ${dayEvents.length} event(er)`}
                                    // Valgt dag får blå bakgrunn, i dag får blå ramme
                                    style={[styles.day, isToday && styles.today, isSelected && styles.selected]}
                                >
                                    {/* MOBIL: tekstfarge må stå på <Text>, ikke på Pressable */}
                                    <Text
                                        style={[
                                            styles.dayText,
                                            isOtherMonth && styles.otherMonthText,
                                            isToday && styles.todayText,
                                            isSelected && styles.selectedText,
                                        ]}
                                    >
                                        {day.getDate()}
                                    </Text>
                                </Pressable>

                                {dayEvents.length > 0 ? <View style={styles.dot} /> : null}
                            </View>
                        );
                    })}
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    grid: { marginTop: 24, width: "100%" },
    row: { flexDirection: "row" },                         // 7 dager ved siden av hverandre
    cell: { width: "14.28%", padding: 4 },                 // 100 % / 7 kolonner
    weekday: { textAlign: "center", fontSize: 12, fontWeight: "500", color: "#6b7280", paddingBottom: 8 },

    day: {
        height: 48,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "transparent",
    },
    today: { borderColor: "#2563eb" },                     // i dag: blå ramme
    selected: { backgroundColor: "#2563eb" },              // valgt dag: blå bakgrunn

    dayText: { fontSize: 16, color: "#000" },
    otherMonthText: { color: "#d1d5db" },                  // dager fra forrige/neste måned i grått
    todayText: { color: "#2563eb", fontWeight: "600" },
    selectedText: { color: "#fff" },                       // sist, så den vinner over todayText

    dot: { marginTop: 4, alignSelf: "center", width: 6, height: 6, borderRadius: 3, backgroundColor: "#2563eb" },
});