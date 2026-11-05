import * as postsApi from "../../src/api/posts";
import {
  render,
  screen,
  userEvent,
  waitFor,
} from "@testing-library/react-native";
import ListPostScreen from "../../src/app/(tabs)/forum/index";
import CreatePostScreen from "../../src/app/new-post";
import { PostProvider } from "../../src/context/PostContext";

// API-et: ingen ekte nettverkskall. Vi bestemmer hva serveren svarer.
jest.mock("../../src/api/posts");
const api = jest.mocked(postsApi);

// Navigasjon: vi har ingen ekte router i testen
jest.mock("expo-router", () => ({
  router: { push: jest.fn(), back: jest.fn() },
}));

const existingPost = {
  id: 1,
  title: "Fæst på Bjølstad imårrå",
  text: "Ikke drikkepress, drikkeplikt.",
  userId: "user-3",
  userName: "Ola2",
  createdAt: "2026-11-04T10:00:00.000Z",
  updatedAt: "2026-11-04T10:00:00.000Z",
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Hovedflyt: lag et innlegg og se det i lista", () => {
  it("nytt innlegg dukker opp i lista etter publisering", async () => {
    // Serveren har ett innlegg, og svarer med det nye når vi lager det
    const user = userEvent.setup();
    api.getAllPosts.mockResolvedValue([existingPost]);
    api.createPost.mockResolvedValue({
      id: 2,
      title: "Quiz fredag",
      text: "Kæm e med??",
      userId: "user-4",
      userName: "Kari2",
      createdAt: "2026-11-04T10:00:00.000Z",
      updatedAt: "2026-11-04T10:00:00.000Z",
    });

    // Skjema og liste i SAMME PostProvider, slik de deler state i appen
    await render(
      <PostProvider>
        <CreatePostScreen />
        <ListPostScreen />
      </PostProvider>,
    );
    // Vent til lista er hentet
    await screen.findByText("Fæst på Bjølstad imårrå");

    // Brukeren fyller ut og publiserer
    await user.type(
      screen.getByPlaceholderText("Gi innlegget en tittel"),
      "Quiz fredag",
    );
    await user.type(
      screen.getByPlaceholderText("Hva har du i dine tanker?"),
      "Kæm e med??",
    );
    await user.press(screen.getByText("Publiser"));

    // API-et fikk det brukeren skrev
    await waitFor(() =>
      expect(api.createPost).toHaveBeenCalledWith({
        title: "Quiz fredag",
        text: "Kæm e med??",
      }),
    );

    // Det nye innlegget vises
    expect(await screen.findByText("Quiz fredag")).toBeOnTheScreen();

    // Begge innleggene vises, og det nye ligger øverst
    const titles = screen.getAllByText(/Quiz fredag|Fæst på Bjølstad imårrå/); // regex ;)))
    expect(titles).toHaveLength(2);
    expect(titles[0]).toHaveTextContent("Quiz fredag");
    expect(titles[1]).toHaveTextContent("Fæst på Bjølstad imårrå");
  });
});
