import { createContext, use, useEffect, useState } from "react";
import { createPost, getAllPosts, updatePost, removePost, type ApiPost } from "../api/posts";
import type { CreatePostInput, UpdatePostInput } from "../utils/PostSchema";


type PostContextData = {
    posts: ApiPost[];
    isLoading: boolean;
    error: string | null;
    addToApi: (post: CreatePostInput) => Promise<void>;
    updateToApi: (id: number, input: UpdatePostInput) => Promise<void>;
    removeToApi: (id: number) => Promise<void>;
}

const PostContext = createContext<PostContextData | null>(null);



export function PostProvider({children}: {children: React.ReactNode}){
    const [posts, setPosts] = useState<ApiPost[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);


    useEffect(()=>{
        async function load() {
            try{
                const apiPost = await getAllPosts();
                setPosts(apiPost);
            }
            catch(error){
                setError(error instanceof Error ? error.message : "unknown error");
            }
            finally{
                setIsLoading(false);
            }
            
        }
        load();
    },[]);

   async function addToApi(post: CreatePostInput) {
    const created = await createPost(post);
    setPosts((prev) => [created, ...prev]);
}
    async function removeToApi(id: number) {

        const previous = posts;

        setPosts((prev)=> prev.filter((post) => post.id !== id));
        try{
            await removePost(id);
        }
        catch(error){
            setPosts(previous);
            throw error;
        }
    }
    async function updateToApi(id: number, post: UpdatePostInput) {
        const updated = await updatePost(id, post);
        setPosts((prev) => prev.map((p) => (p.id === id ? updated : p)));
    }
    return (
        <PostContext 
        value={{
            posts,
            isLoading,
            error,
            addToApi,
            updateToApi,
            removeToApi
        }}>{children}</PostContext>
    )
}
export function usePosts(){
  const context = use(PostContext);

  if (!context) {
    throw new Error("usePosts must be used within a PostProvider");
  }

  return context;
}