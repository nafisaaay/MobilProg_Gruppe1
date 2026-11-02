import { render, screen, userEvent } from "@testing-library/react-native";
import { FormField } from "../../src/components/forms/FormField";


describe("FormField", () => {

    it("viser labelen og gir feltet samme navn for skjermlesere", async () => {

        // Tegne komponenten
        await render(<FormField label="E-post" value="" onChangeText={() => {}} />);

        // teksten vises, og feltet kan finnes via labelen
        expect(screen.getByText("E-post")).toBeOnTheScreen();
        expect(screen.getByLabelText("E-post")).toBeOnTheScreen();
    });

    it("viser feilmeldingen bare når det finnes en feil", async () => {

        // tegn UTEN error, og pakk ut rerender fra boksen render gir
        const { rerender } = await render(
            <FormField label="E-post" value="" onChangeText={() => {}} />,
        );

        expect(screen.queryByText("Ugyldig e-postadresse")).not.toBeOnTheScreen();

        await rerender(
            <FormField label="E-post" value="" onChangeText={() => {}} error="Ugyldig e-postadresse" />,
        );

        expect(screen.getByText("Ugyldig e-postadresse")).toBeOnTheScreen();
    });

    it("sender det brukeren skriver videre til onChangeText", async () => {
        const onChangeText = jest.fn();
        const user = userEvent.setup();

        await render(<FormField label="E-post" value="" onChangeText={onChangeText} />);

        await user.type(screen.getByLabelText("E-post"), "tina");

        expect(onChangeText).toHaveBeenCalledTimes(4);
    });
})