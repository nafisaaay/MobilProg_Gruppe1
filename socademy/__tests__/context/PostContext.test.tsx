
// Dette er en .tsx fil, fordi wrapper inneholder JSX (PostProvider)

import { renderHook, waitFor, act } from "@testing-library/react-native";
import { createPost, getAllPosts, removePost } from "../../src/api/posts";
import { PostProvider, usePosts } from "../../src/context/PostContext";

// Mocker hele API-fila.
jest.mock("../../src/api/posts", () => ({
    getAllPosts: jest.fn(),
    createPost: jest.fn(),
    updatePost: jest.fn(),
    removePost: jest.fn(),
}));

// jest.mocked gjør at TS vet at funksjonen er en mock
const mockGetAllPosts = jest.mocked(getAllPosts);
const mockCreatePost = jest.mocked(createPost);
const mockRemovePost = jest.mocked(removePost);

// testdata, to innlegg vi gjenbruker
const post1 = { id: 1, title: "første", text: "yoyo" };
const post2 = { id: 2, title: "andre", text: "gængster" };

function wrapper({children}: { children: React.ReactNode }) {
    return <PostProvider>{children}</PostProvider>;
}

// Tømmer notatblokkene til alle mockene før hver test
// Så en test ikke ser kall fra den forrige ;)
beforeEach(() => {
    jest.clearAllMocks();
});

describe("PostContext", () => {

    it("henter innleggene når den starter", async () => {
        mockGetAllPosts.mockResolvedValue([post1, post2]);

        const { result } = await renderHook(() => usePosts(), { wrapper });
        await waitFor(() => expect(result.current.isLoading).toBe(false));

        // toBe sjekker om to ting er det samme objektet i minnet.
        // toEqual sjekker om de har samme innhold
        expect(result.current.posts).toEqual([post1, post2]);
    });

    it("Legger innlegget tilbake hvis sletting feiler", async () => {
        // Arrange: to innlegg, og serveren kommer til å si nei til sletting
        mockGetAllPosts.mockResolvedValue([post1, post2]);
        mockRemovePost.mockRejectedValue(new Error("Serverfeil"));

        const { result } = await renderHook(() => usePosts(), { wrapper });
        await waitFor(() => expect(result.current.isLoading).toBe(false));

        // Act: prøv å slette post1, og forvent at det kaster
        await act(async () => {
            await expect(result.current.removeToApi(1)).rejects.toThrow("Serverfeil");
        });

        expect(result.current.posts).toEqual([post1, post2]);
    });

    it("viser feil hvis henting feiler", async () => {
        mockGetAllPosts.mockRejectedValue(new Error("Nettverksfeil"));

        const { result } = await renderHook(() => usePosts(), { wrapper });
        await waitFor(() => expect(result.current.isLoading).toBe(false));

        expect(result.current.error).toBe("Nettverksfeil");
        expect(result.current.posts).toEqual([]);
    });

    it("legger nytt innlegg øverst", async () => {
        mockGetAllPosts.mockResolvedValue([post1]);
        mockCreatePost.mockResolvedValue(post2);

        const { result } = await renderHook(() => usePosts(), { wrapper });
        await waitFor(() => expect(result.current.isLoading).toBe(false));

        await act(() => result.current.addToApi({ title: "andre", text: "gængster" }));

        expect(result.current.posts).toEqual([post2, post1]);
    });
})