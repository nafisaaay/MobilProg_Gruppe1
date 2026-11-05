import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  Switch,
  ScrollView,
  StyleSheet,
} from "react-native";
import { createEvent } from "../../api/events";
import { commonStyles } from "../../styles/commonStyles";
import { colors, radius, spacing } from "../../constants/theme";

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
        category,
        isOutdoor,
      });
      onCreated();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Kunne ikke lagre");
    }
  }

  return (
    <ScrollView
      contentContainerStyle={commonStyles.content}
      keyboardShouldPersistTaps="handled"
      style={styles.screen}
    >
      <View>
        <Text style={[commonStyles.title, styles.title]}>Opprett ny event</Text>

        <Text style={commonStyles.formLabel}>Tittel</Text>
        <TextInput
          style={commonStyles.formInput}
          accessibilityLabel="Tittel"
          placeholder="Skriv en tittel"
          value={title}
          onChangeText={setTitle}
        />

        <Text style={commonStyles.formLabel}>Beskrivelse</Text>
        <TextInput
          style={commonStyles.formInput}
          accessibilityLabel="description"
          placeholder="Skriv en beskrivelse"
          value={description}
          onChangeText={setDescription}
        />
        <View style={styles.row}>
          <View style={styles.rowItem}>
            <Text style={commonStyles.formLabel}>Dato</Text>
            <TextInput
              style={commonStyles.formInput}
              keyboardType="numbers-and-punctuation"
              accessibilityLabel="Dato"
              placeholder="AAAA-MM-DD"
              value={date}
              onChangeText={setDate}
            />
          </View>
          <View style={styles.rowItem}>
            <Text style={commonStyles.formLabel}>Tid</Text>
            <TextInput
              style={commonStyles.formInput}
              keyboardType="numbers-and-punctuation"
              accessibilityLabel="time"
              placeholder="TT:MM"
              value={time}
              onChangeText={setTime}
            />
          </View>
        </View>
        <Text style={commonStyles.formLabel}>Sted</Text>
        <TextInput
          style={commonStyles.formInput}
          accessibilityLabel="location"
          placeholder="Skriv et sted"
          value={location}
          onChangeText={setLocation}
        />

        <Text style={commonStyles.formLabel}>Kategori</Text>

        <View style={styles.dropList}>
          <Pressable
            onPress={() => setCategory("social")}
            style={[
              styles.dropItem,
              category === "social" && styles.dropItemSelected,
            ]}
          >
            <Text style={[category === "social" && commonStyles.btnText]}>
              Sosialt
            </Text>
          </Pressable>

          <Pressable
            onPress={() => setCategory("study")}
            style={[
              styles.dropItem,
              category === "study" && styles.dropItemSelected,
            ]}
          >
            <Text style={[category === "study" && commonStyles.btnText]}>
              Akademisk
            </Text>
          </Pressable>

          <Pressable
            onPress={() => setCategory("sports")}
            style={[
              styles.dropItem,
              category === "sports" && styles.dropItemSelected,
            ]}
          >
            <Text style={[category === "sports" && commonStyles.btnText]}>
              Sport
            </Text>
          </Pressable>

          <Pressable
            onPress={() => setCategory("other")}
            style={[
              styles.dropItem,
              category === "other" && styles.dropItemSelected,
            ]}
          >
            <Text style={[category === "other" && commonStyles.btnText]}>
              Annet
            </Text>
          </Pressable>
        </View>
        <View style={styles.saveField}>
          <View>
            <Text style={commonStyles.formLabel}>Utendørs</Text>
            <Switch
              accessibilityLabel="isOutdoor"
              value={isOutdoor}
              onValueChange={setIsOutdoor}
              //trackColor={{ false: colors.accent, true: colors.danger }}
              //thumbColor={isOutdoor ? "#2563eb" : "#f9fafb"}
            />
          </View>

          <Pressable
            disabled={isDisabled}
            onPress={onSubmit}
            style={({ pressed }) => [
              styles.saveBtn,
              isDisabled ? styles.btnDisabled : styles.btnActive,
              pressed && !isDisabled && styles.btnPressed,
            ]}
          >
            <Text style={commonStyles.btnText}>
              {isDisabled ? "Lagre" : "Lagre"}
            </Text>
          </Pressable>
          {error ? (
            <Text style={commonStyles.error} accessibilityRole="alert">
              {error}
            </Text>
          ) : null}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.background,
  },
  title: {
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    gap: 12,
  },
  rowItem: {
    flex: 1,
  },
  dropList: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  dropItem: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: radius.sm,
    backgroundColor: colors.card,
    boxShadow: "0 1px 6px #cfcfcf46",
  },
  dropItemSelected: {
    backgroundColor: colors.primary,
  },
  saveField: {
    marginTop: spacing.xl,
    flexDirection: "row",
    gap: spacing.xl,
  },
  saveBtn: {
    flex: 1,
    marginTop: spacing.lg,
    borderRadius: radius.full,
    paddingVertical: spacing.lg,
    alignItems: "center",
  },
  btnDisabled: {
    backgroundColor: colors.textSubtle,
  },
  btnActive: {
    backgroundColor: colors.primary,
  },
  btnPressed: {
    backgroundColor: "#4594d1",
  },
});
