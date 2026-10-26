import { createContext } from "react";
import { createPost, getAllPosts, getPost, updatePost, removePost, ApiPost } from "../api/posts";
import type { CreatePostInput, UpdatePostInput } from "../utils/PostSchema";
import type { ApiPost as Post } from "../api/posts";

type PostContextData = {
    Posts: Post[];
    isLoading: boolean;
    error: string;
    addToApi: (post: Omit<Post, "id">) => Promise<void>;
    updateToApi: (post: Omit<Post, "id">) => Promise<void>;
    removeToApi: (post: Omit<Post, "id">) => Promise<void>;
}

const PostContext = createContext<PostContextData | null>(null);

function toPost(apiPost: ApiPost) : Post {
    return {title: apiPost.title, text: apiPost.text, id: apiPost.id};
}